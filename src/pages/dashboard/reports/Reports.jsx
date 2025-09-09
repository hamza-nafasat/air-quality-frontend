import { useEffect, useState } from 'react';
import Button from '../../../components/shared/small/Button';
import SearchIcon from '../../../assets/svgs/reports/SearchIcon';
import ReportsList from './ReportsList';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import fullLogo from '../../../assets/images/full-logo.png';
import Modal from '../../../components/shared/modal/Modal';
import BrowseFile from '../../../components/shared/large/BrowseFile';
import {
  useGetReportsQuery,
  useLazyGetReportsQuery,
  useLazyGetFilteredReportsQuery,
} from '../../../redux/apis/reportsApi';
import Loader from '../../../components/shared/small/Loader';
import { useGetallBuildingsHierarchyQuery } from '../../../redux/apis/buildingApis';
import Dropdown from '../../../components/shared/small/Dropdown';
import TextField from '../../../components/shared/small/TextField';
import FilteredReports from './FilteredReports';

const Reports = () => {
  const [file, setFile] = useState(null);
  const [modal, setModal] = useState(false);
  const { data, isFetching, error } = useGetReportsQuery({ interval: 4 });
  const { data: getHierarchy } = useGetallBuildingsHierarchyQuery();
  const [trigger] = useLazyGetReportsQuery();
  const [triggerFiltered, { isFetching: filterLoading }] = useLazyGetFilteredReportsQuery();
  const [buildingReports, setBuildingReports] = useState({});
  const [filteredView, setFilteredView] = useState(null); // { mode, data, pagination, params }
  const [searchTerm, setSearchTerm] = useState('');
  const filteredReports = Object.values(buildingReports).filter((building) => {
    const query = searchTerm.toLowerCase();
    return building.buildingName?.toLowerCase().includes(query);
  });
  // console.log('searchTerm', filteredReports);
  console.log('dtaaaaa', getHierarchy);

  // On initial load, store all buildings' data
  useEffect(() => {
    if (data?.data) {
      const reports = {};
      data.data.forEach((building) => {
        reports[building.buildingId] = {
          ...building,
          isLoading: false,
          page: building.page || 1,
          limit: building.limit || 5,
        };
      });
      setBuildingReports(reports);
    }
  }, [data]);
  console.log('data', data);

  // Handler for paginating a single building
  const handlePaginate = (buildingId, page, limit) => {
    setBuildingReports((prev) => ({
      ...prev,
      [buildingId]: { ...prev[buildingId], isLoading: true },
    }));

    const current = buildingReports[buildingId];
    const hasFilter = !!current?.filterParams;
    const hasDateRange = !!current?.hasDateRange;

    if (hasFilter && !hasDateRange) {
      const params = { ...current.filterParams, page, perPage: limit };
      triggerFiltered(params)
        .then((res) => {
          const payload = res.data?.data;
          const paginationMeta = res.data?.pagination;
          const updated = transformFilteredResponseToBuilding(
            buildingId,
            payload,
            paginationMeta,
            false
          );
          setBuildingReports((prev) => ({
            ...prev,
            [buildingId]: {
              ...updated,
              filterParams: { ...current.filterParams },
              hasDateRange: false,
            },
          }));
        })
        .catch(() => {
          setBuildingReports((prev) => ({
            ...prev,
            [buildingId]: { ...prev[buildingId], isLoading: false },
          }));
        });
      return;
    }

    // fallback to unfiltered endpoint
    trigger({
      interval: 4,
      buildingId,
      page,
      limit,
    }).then((res) => {
      const building = res.data?.data?.[0];
      if (building) {
        setBuildingReports((prev) => ({
          ...prev,
          [buildingId]: {
            ...prev[buildingId],
            ...building,
            isLoading: false,
            page,
            limit,
          },
        }));
      } else {
        setBuildingReports((prev) => ({
          ...prev,
          [buildingId]: {
            ...prev[buildingId],
            isLoading: false,
          },
        }));
      }
    });
  };

  const openModalHandler = () => setModal('upload-image');
  const closeModalHandler = () => setModal(false);

  const getBase64ImageFromURL = (url) => {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');
      img.src = url;
      img.onload = () => {
        let canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        let dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      };
      img.onerror = (error) => reject(error);
    });
  };

  const generatePDF = async () => {
    try {
      setModal(false);
      const doc = new jsPDF();
      const pageHeight = doc.internal.pageSize.height;
      const pageWidth = doc.internal.pageSize.width;

      let yPos = 10;

      // Header with date/time
      const currentDate = new Date().toLocaleDateString();
      const currentTime = new Date().toLocaleTimeString();
      doc.setFontSize(10);
      doc.text(`Date: ${currentDate} Time: ${currentTime}`, 15, 6);

      // Logo
      try {
        const logoBase64 = await getBase64ImageFromURL(file || fullLogo);
        if (logoBase64) {
          const img = new Image();
          img.src = logoBase64;
          await new Promise((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = (e) => reject(e);
          });

          const desiredWidth = 50;
          const aspectRatio = img.width / img.height;
          const desiredHeight = desiredWidth / aspectRatio;
          const logoX = (pageWidth - desiredWidth) / 2;

          doc.addImage(logoBase64, 'PNG', logoX, yPos, desiredWidth, desiredHeight);
          yPos += desiredHeight + 15;

          doc.setFontSize(10);
          doc.text('Reports: Following are the reports of all sensors on all buildings', 14, yPos);
          yPos += 10;
        }
      } catch (err) {
        console.warn('⚠️ Failed to load logo image:', err);
      }

      // If filtered view is active, export filtered data; otherwise, export all buildings
      if (filteredView && filteredView.data) {
        const { mode, data } = filteredView;

        const drawTable = (rows) => {
          const tableData = (rows || []).map((s, index) => [
            index + 1,
            s.date || 'N/A',
            s.temperature ?? 'N/A',
            s.humidity ?? 'N/A',
            s.co ?? 'N/A',
            s.ch ?? 'N/A',
            s.co2 ?? 'N/A',
            s.tvoc ?? 'N/A',
            s.performance ?? 'N/A',
          ]);

          doc.autoTable({
            head: [
              ['#', 'Date', 'Temperature', 'Humidity', 'CO', 'CH', 'CO2', 'TVOC', 'Performance'],
            ],
            body: tableData,
            startY: yPos,
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 2 },
            headStyles: { fillColor: [41, 128, 185], halign: 'center' },
            columnStyles: {
              0: { halign: 'center', cellWidth: 10 },
              1: { cellWidth: 35 },
              2: { halign: 'center' },
              3: { halign: 'center' },
              4: { halign: 'center' },
              5: { halign: 'center' },
              6: { halign: 'center' },
              7: { halign: 'center' },
              8: { halign: 'center' },
            },
            willDrawCell: (data) => {
              if (data.column.index === 8) {
                const val = data.cell.raw?.toLowerCase();
                if (val === 'excellent') doc.setTextColor(0, 128, 0);
                else if (val === 'good') doc.setTextColor(44, 116, 199);
                else if (val === 'average') doc.setTextColor(255, 165, 0);
                else if (val === 'bad') doc.setTextColor(255, 0, 0);
              }
            },
            didDrawCell: (data) => {
              if (data.column.index === 8) doc.setTextColor(0, 0, 0);
            },
          });
          yPos = doc.lastAutoTable.finalY + 10;
        };

        const drawFloor = async (floor) => {
          // Space for image and meta
          const startY = yPos;
          const leftX = 14;
          const imgWidth = 50;
          let imgHeight = 30;

          // Floor image (if available)
          try {
            const imgSrc = (floor && floor.twoDModel && floor.twoDModel.url) || floor?.twoDModel;
            if (imgSrc) {
              const base64 = await getBase64ImageFromURL(imgSrc);
              if (base64) {
                // try to preserve aspect ratio roughly by assuming 50x30 box
                doc.addImage(base64, 'PNG', leftX, startY, imgWidth, imgHeight);
              }
            }
          } catch (e) {
            // ignore image errors
          }

          // Meta text next to image
          const textX = leftX + imgWidth + 6;
          doc.setFontSize(12);
          doc.text(floor.floorName || 'Floor', textX, startY + 8);
          doc.setFontSize(10);
          const totalSensors = Array.isArray(floor.sensors) ? floor.sensors.length : 0;
          doc.text(`Total No. of Sensors: ${totalSensors}`, textX, startY + 14);

          // Move cursor below header block
          yPos = Math.max(startY + imgHeight + 6, yPos + imgHeight + 6);

          // Table of readings
          drawTable(floor.sensorData || []);
        };

        if (mode === 'building') {
          const floors = Array.isArray(data) ? data : [data];
          for (const f of floors) {
            if (yPos > pageHeight - 40) {
              doc.addPage();
              yPos = 10;
            }
            await drawFloor(f);
          }
        } else if (mode === 'floor') {
          const floor = Array.isArray(data) ? data[0] : data;
          await drawFloor(floor);
        } else if (mode === 'sensor' || mode === 'parameter') {
          const sensors = Array.isArray(data) ? data : [data];
          for (const s of sensors) {
            doc.setFontSize(12);
            doc.text(s.sensorName || 'Sensor', 14, yPos);
            yPos += 6;
            drawTable(s.sensorData || []);
          }
        }
      } else {
        // Loop buildings
        for (const report of Object.values(buildingReports)) {
          try {
            const buildingImgBase64 = await getBase64ImageFromURL(report.thumbnail?.url);
            const imageHeight = 30;
            const imageWidth = 50;
            const imageX = 14;
            const textX = imageX + imageWidth + 5;

            if (yPos + imageHeight > pageHeight - 20) {
              doc.addPage();
              yPos = 10;
            }

            // Building info
            if (buildingImgBase64) {
              doc.addImage(buildingImgBase64, 'PNG', imageX, yPos, imageWidth, imageHeight);
            }
            doc.setFontSize(14);
            doc.text(report.buildingName || 'N/A', textX, yPos + 10);
            doc.setFontSize(10);
            doc.text(`Location: ${report.address || 'N/A'}`, textX, yPos + 15);
            doc.text(`Total Sensors: ${report.totalSensors || 0}`, textX, yPos + 20);

            yPos += imageHeight + 5;

            // 🔹 Sensor Data Table (exclude face, include performance, tvoc, co2)
            if (Array.isArray(report.sensorData) && report.sensorData.length > 0) {
              const tableData = report.sensorData.map((s, index) => [
                index + 1,
                s.date || 'N/A',
                s.temperature ?? 'N/A',
                s.humidity ?? 'N/A',
                s.co ?? 'N/A',
                s.ch ?? 'N/A',
                s.co2 ?? 'N/A',
                s.tvoc ?? 'N/A',
                s.performance ?? 'N/A',
              ]);

              doc.autoTable({
                head: [
                  [
                    '#',
                    'Date',
                    'Temperature',
                    'Humidity',
                    'CO',
                    'CH',
                    'CO2',
                    'TVOC',
                    'Performance',
                  ],
                ],
                body: tableData,
                startY: yPos,
                theme: 'grid',
                styles: { fontSize: 8, cellPadding: 2 },
                headStyles: { fillColor: [41, 128, 185], halign: 'center' },
                columnStyles: {
                  0: { halign: 'center', cellWidth: 10 },
                  1: { cellWidth: 35 },
                  2: { halign: 'center' },
                  3: { halign: 'center' },
                  4: { halign: 'center' },
                  5: { halign: 'center' },
                  6: { halign: 'center' },
                  7: { halign: 'center' },
                  8: { halign: 'center' },
                },
                willDrawCell: (data) => {
                  if (data.column.index === 8) {
                    const val = data.cell.raw?.toLowerCase();
                    if (val === 'excellent') doc.setTextColor(0, 128, 0);
                    else if (val === 'good') doc.setTextColor(44, 116, 199);
                    else if (val === 'average') doc.setTextColor(255, 165, 0);
                    else if (val === 'bad') doc.setTextColor(255, 0, 0);
                  }
                },
                didDrawCell: (data) => {
                  if (data.column.index === 8) doc.setTextColor(0, 0, 0);
                },
              });

              yPos = doc.lastAutoTable.finalY + 10;
            }
          } catch (err) {
            console.warn(
              `⚠️ Failed to load building image for ${report.buildingName || 'Unknown'} (${
                report.thumbnail?.url
              })`,
              err
            );
          }

          // Existing report.listData table (keep as is)
          if (report.listData?.length) {
            const tableColumn = [
              'Date',
              'Temperature',
              'TVOC',
              'CO2',
              'Humidity',
              'CO',
              'CH4',
              'Performance',
            ];
            const tableRows = report.listData.map((item) => [
              item.date,
              `${item.temperature}°F`,
              `${item.tvoc} ppm`,
              `${item.co2} ppm`,
              `${item.humidity} %`,
              `${item.co} ppm`,
              `${item.ch4} ppm`,
              item.performance,
            ]);

            const remainingPageHeight = pageHeight - yPos - 20;
            if (remainingPageHeight < 40) {
              doc.addPage();
              yPos = 10;
            }

            doc.autoTable({
              head: [tableColumn],
              body: tableRows,
              startY: yPos,
              theme: 'grid',
              styles: { cellPadding: 2 },
              headStyles: { fillColor: [52, 152, 219] },
              bodyStyles: { valign: 'middle' },
              columnStyles: { 0: { halign: 'center' } },
              pageBreak: 'auto',
              willDrawCell: (data) => {
                if (data.column.index === 7) {
                  const val = data.cell.raw;
                  if (val === 'excellent') doc.setTextColor(0, 128, 0);
                  else if (val === 'average') doc.setTextColor(255, 215, 0);
                  else if (val === 'bad') doc.setTextColor(255, 0, 0);
                  else if (val === 'good') doc.setTextColor(44, 116, 199);
                }
              },
              didDrawCell: (data) => {
                if (data.column.index === 7) doc.setTextColor(0, 0, 0);
                if (data.row.index === report.listData.length - 1) {
                  yPos = doc.lastAutoTable.finalY + 10;
                }
              },
            });

            yPos = doc.lastAutoTable.finalY + 10;
            doc.setDrawColor(199, 199, 199);
            doc.line(15, yPos, pageWidth - 15, yPos);
            yPos += 15;
          }
        }
      }

      doc.save('reports.pdf');
    } catch (err) {
      console.error('❌ PDF generation failed:', err);
      alert('Failed to generate PDF. Check console for details.');
    }
  };
  const [isFilter, setIsFilter] = useState(false);
  const openFilterHandle = () => {
    setIsFilter(true);
  };
  const closeFilterHandle = () => {
    setIsFilter(false);
  };

  // ---- STATES ----
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [selectedParameter, setSelectedParameter] = useState(null);

  const [buildingOptions, setBuildingOptions] = useState([]);
  const [floorOptions, setFloorOptions] = useState([]);
  const [sensorOptions, setSensorOptions] = useState([]);
  const [parameterOptions, setParameterOptions] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateError, setDateError] = useState(null);

  // ---- EFFECT: BUILDINGS ----
  useEffect(() => {
    if (getHierarchy?.data) {
      const buildings = getHierarchy.data.map((b) => ({
        option: b.name,
        value: b._id,
      }));

      setBuildingOptions([...buildings]);
    }
  }, [getHierarchy]);

  // ---- EFFECT: FLOORS ----
  useEffect(() => {
    if (selectedBuilding && selectedBuilding !== 'all') {
      const building = getHierarchy.data.find((b) => b._id === selectedBuilding);
      if (building) {
        const floors = building.floorsList.map((f) => ({
          option: f.name,
          value: f._id,
        }));

        setFloorOptions([{ option: 'All Floors', value: 'all' }, ...floors]);
      }
    } else {
      setFloorOptions([]);
    }

    setSelectedFloor(null);
    setSelectedSensor(null);
    setSelectedParameter(null);
  }, [selectedBuilding]);

  // ---- EFFECT: SENSORS ----
  useEffect(() => {
    if (selectedFloor && selectedFloor !== 'all') {
      const building = getHierarchy.data.find((b) => b._id === selectedBuilding);
      const floor = building?.floorsList.find((f) => f._id === selectedFloor);

      if (floor) {
        const sensors = floor.sensorsList.map((s) => ({
          option: s.name,
          value: s._id,
        }));

        setSensorOptions([{ option: 'All Sensors', value: 'all' }, ...sensors]);
      }
    } else {
      setSensorOptions([]);
    }

    setSelectedSensor(null);
    setSelectedParameter(null);
  }, [selectedFloor]);

  // ---- EFFECT: PARAMETERS ----
  useEffect(() => {
    if (selectedSensor && selectedSensor !== 'all') {
      const building = getHierarchy.data.find((b) => b._id === selectedBuilding);
      const floor = building?.floorsList.find((f) => f._id === selectedFloor);
      const sensor = floor?.sensorsList.find((s) => s._id === selectedSensor);

      if (sensor) {
        const params = sensor.parameters.map((p) => ({
          option: p,
          value: p,
        }));

        setParameterOptions([{ option: 'All Parameters', value: 'all' }, ...params]);
      }
    } else {
      setParameterOptions([]);
    }

    setSelectedParameter(null);
  }, [selectedSensor]);

  useEffect(() => {
    if (startDate && endDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // reset time for accurate comparison

      const start = new Date(startDate);
      const end = new Date(endDate);

      if (end < start) {
        setDateError('End date must be after Start date');
      } else if (start > today || end > today) {
        setDateError('Dates cannot be in the future');
      } else {
        setDateError(null);
      }
    } else {
      setDateError(null);
    }
  }, [startDate, endDate]);

  const isButtonEnabled = !!selectedBuilding && !dateError; // allow filter with or without dates

  const countBuildingSensors = (buildingId) => {
    const building = getHierarchy?.data?.find((b) => b._id === buildingId);
    if (!building) return 0;
    return (building.floorsList || []).reduce((acc, f) => acc + (f.sensorsList?.length || 0), 0);
  };

  const transformFilteredResponseToBuilding = (
    buildingId,
    apiData,
    paginationMeta,
    hasDateRange
  ) => {
    const bMeta = getHierarchy?.data?.find((b) => b._id === buildingId) || {};

    let mergedSensorData = [];
    if (Array.isArray(apiData)) {
      // Case 1: array per floor or single object wrapped
      apiData.forEach((entry) => {
        if (Array.isArray(entry?.sensorData)) {
          mergedSensorData = mergedSensorData.concat(entry.sensorData);
        }
      });
    } else if (apiData && Array.isArray(apiData.sensorData)) {
      mergedSensorData = apiData.sensorData;
    }

    // Sort by date desc if available
    try {
      mergedSensorData.sort((a, b) => new Date(b.date) - new Date(a.date));
    } catch (_) {}

    const totalRecords = hasDateRange
      ? mergedSensorData.length
      : paginationMeta?.totalRows ?? mergedSensorData.length;

    const page = hasDateRange ? 1 : paginationMeta?.currentPage ?? 1;
    const limit = hasDateRange ? mergedSensorData.length || 10 : paginationMeta?.pageSize ?? 10;

    return {
      buildingId,
      buildingName: bMeta?.name,
      type: bMeta?.type,
      area: bMeta?.area,
      address: bMeta?.address,
      thumbnail: bMeta?.thumbnail,
      position: bMeta?.position,
      totalSensors: countBuildingSensors(buildingId),
      sensors: buildingReports[buildingId]?.sensors || [],
      sensorData: mergedSensorData,
      totalRecords,
      page,
      limit,
      isLoading: false,
    };
  };

  const applyFilter = async () => {
    if (!selectedBuilding || selectedBuilding === 'all') return;

    // determine if date range provided
    const hasDateRange = !!(startDate && endDate);

    const baseParams = {
      interval: 4,
      buildingId: selectedBuilding,
    };
    if (selectedFloor && selectedFloor !== 'all') baseParams.floorId = selectedFloor;
    if (selectedSensor && selectedSensor !== 'all') baseParams.sensorId = selectedSensor;
    if (selectedParameter && selectedParameter !== 'all') baseParams.parameter = selectedParameter;
    if (hasDateRange) {
      baseParams.startDate = startDate;
      baseParams.endDate = endDate;
    } else {
      // initial pagination when no date range
      baseParams.page = 1;
      baseParams.perPage = buildingReports[selectedBuilding]?.limit || 10;
    }

    // show loading state via filteredView stub
    setFilteredView((prev) => (prev ? { ...prev, isLoading: true } : { isLoading: true }));

    try {
      const res = await triggerFiltered(baseParams).unwrap();
      const payload = res?.data;
      const paginationMeta = res?.pagination;

      // determine mode
      let mode = 'building';
      if (baseParams.sensorId) mode = baseParams.parameter ? 'parameter' : 'sensor';
      else if (baseParams.floorId) mode = 'floor';

      setFilteredView({
        mode,
        data: payload,
        pagination: paginationMeta,
        params: { ...baseParams },
        isLoading: false,
        loadingById: {},
      });
      setIsFilter(false);
    } catch (e) {
      setFilteredView(null);
      console.error('Filter apply failed', e);
    } finally {
      console.log('start');

      setSelectedBuilding(null);
      setSelectedFloor(null);
      setSelectedSensor(null);
      setSelectedParameter(null);
      setStartDate(null);
      setEndDate(null);
      console.log('end');
    }
  };
  console.log('isFilter', isFilter);

  const handleFilteredPaginate = (page, perPage, ctx) => {
    if (!filteredView?.params) return;

    // Determine scope by ctx
    const base = { ...filteredView.params };
    if (ctx?.type === 'floor') {
      base.floorId = ctx.id;
      delete base.sensorId;
      delete base.parameter;
    }
    if (ctx?.type === 'sensor') {
      base.sensorId = ctx.id;
    }

    const params = { ...base, page, perPage };

    if (ctx?.id) {
      setFilteredView((prev) => ({
        ...prev,
        loadingById: { ...(prev.loadingById || {}), [ctx.id]: true },
      }));
    } else {
      setFilteredView((prev) => ({ ...prev, isLoading: true }));
    }
    triggerFiltered(params)
      .then((res) => {
        const nextData = res.data?.data;
        const nextPagination = res.data?.pagination;

        // Build per-id pagination map
        const byId = { ...(filteredView.pagination?.byId || {}) };
        if (ctx?.id) {
          byId[ctx.id] = nextPagination;
        }

        // Merge behavior: if we're in building mode and paginating a specific floor,
        // replace only that floor's entry while keeping others intact.
        let mergedData = nextData;
        if (filteredView.mode === 'building' && ctx?.type === 'floor') {
          const current = Array.isArray(filteredView.data) ? filteredView.data : [];
          const updatedFloor = Array.isArray(nextData) ? nextData[0] : nextData; // floor-level returns object
          mergedData = current.map((f) => (f.floorId === ctx.id ? { ...updatedFloor } : f));
        } else if (
          (filteredView.mode === 'sensor' || filteredView.mode === 'parameter') &&
          ctx?.type === 'sensor'
        ) {
          const currentSensors = Array.isArray(filteredView.data) ? filteredView.data : [];
          const updatedSensor = Array.isArray(nextData) ? nextData[0] : nextData;
          mergedData = currentSensors.map((s) =>
            s.sensorId === ctx.id ? { ...updatedSensor } : s
          );
        }

        setFilteredView((prev) => ({
          ...prev,
          data: mergedData,
          pagination: { ...nextPagination, byId },
          isLoading: false,
          loadingById: ctx?.id
            ? { ...(prev.loadingById || {}), [ctx.id]: false }
            : prev.loadingById,
          params: filteredView.params, // keep original building-level params
        }));
      })
      .catch(() =>
        setFilteredView((prev) => ({
          ...prev,
          isLoading: false,
          loadingById: ctx?.id
            ? { ...(prev.loadingById || {}), [ctx.id]: false }
            : prev.loadingById,
        }))
      );
  };

  if (isFetching && Object.keys(buildingReports).length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  console.log('selectedParameter', selectedParameter);

  return (
    <div className="bg-white rounded-[20px] border-[2px] space-y-4 border-[#00000012] p-4 mb-4">
      {isFilter && (
        <Modal width="w-[300px] md:w-[500px]" onClose={closeFilterHandle}>
          <Dropdown
            defaultText="Select Building"
            options={buildingOptions}
            label="Building Name"
            onSelect={(val) => setSelectedBuilding(val.value)}
          />

          <Dropdown
            defaultText="Select Floor"
            options={floorOptions}
            label="Floor Name"
            onSelect={(val) => setSelectedFloor(val.value)}
            disabled={!selectedBuilding}
          />

          <Dropdown
            defaultText="Select Sensor"
            options={sensorOptions}
            label="Sensor Name"
            onSelect={(val) => setSelectedSensor(val.value)}
            disabled={!selectedFloor || selectedFloor === 'all'}
          />

          <Dropdown
            defaultText="Select Parameter"
            options={parameterOptions}
            label="Parameter Name"
            onSelect={(val) => setSelectedParameter(val.value)}
            disabled={!selectedSensor || selectedSensor === 'all'}
          />

          <div className="flex items-end justify-between gap-4">
            <TextField
              type="date"
              label="Start"
              value={startDate || ''}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <TextField
              type="date"
              label="End"
              value={endDate || ''}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          {dateError && <p className="text-red-500 text-sm mt-2">{dateError}</p>}

          <div className="mt-4 flex justify-end">
            <Button
              text={
                filteredView?.isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
                  </div>
                ) : (
                  'Filter'
                )
              }
              onClick={applyFilter}
              disabled={filteredView?.isLoading || !isButtonEnabled}
            />
          </div>
        </Modal>
      )}

      <div className="flex items-center flex-wrap justify-between gap-4">
        <div>
          <h3 className="text-sm md:text-base font-bold text-[#2e2e2e]">
            Access Your Reports Anytime
          </h3>
          <p className="text-xs font-medium text-[#2e2e2e]">
            Quickly view and track your reports here. Stay updated with the latest data and insights
            effortlessly.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* <Button
            text="Refresh Data"
            bg="bg-transparent"
            color="#03a5e0"
            borderColor="#03a5e0"
            height="h-[25px]"
          /> */}
          <Button
            text="Export"
            height="h-[25px]"
            borderColor="#03a5e0"
            onClick={openModalHandler}
          />
          <Button
            text="Add Filter"
            height="h-[25px]"
            borderColor="#03a5e0"
            onClick={openFilterHandle}
          />
        </div>
      </div>
      {/* <div className="my-4">
        <FilterSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div> */}
      {/* Filtered View */}
      {filteredView ? (
        <FilteredReports view={filteredView} onBack={() => setFilteredView(null)} />
      ) : (
        <div>
          <div className="flex flex-col space-y-4">
            {(searchTerm ? filteredReports : Object.values(buildingReports)).map((building) => (
              <ReportsList
                key={building.buildingId}
                building={building}
                onPaginate={handlePaginate}
              />
            ))}
          </div>
        </div>
      )}
      <div>
        {modal === 'upload-image' && (
          <Modal width="w-[300px] md:w-[500px]" onClose={closeModalHandler}>
            <div>
              <h3 className="text-base md:text-lg font-semibold">Upload Your Logo</h3>
              <p className="text-sm">
                If no logo is uploaded, the Air Quality logo will be used by default.
              </p>
              <BrowseFile setFile={setFile} />
              <div className="mt-4">
                <Button text="Generate" onClick={generatePDF} />
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Reports;

// const FilterSection = ({ searchTerm, setSearchTerm }) => {
//   return (
//     <div className="flex items-center flex-wrap gap-4">
//       <div className="flex items-center gap-1 border border-[#e7e7e7] rounded-lg h-[34px] bg-white px-3 basis-[35%] flex-1">
//         <SearchIcon />
//         <input
//           type="search"
//           placeholder="Search"
//           className="focus:outline-none text-sm w-full"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>
//       <div className="flex items-center justify-between gap-1 border border-[#e7e7e7] rounded-lg h-[34px] bg-white px-3 flex-1">
//         <p className="text-sm text-[#7e7e7e]">Buildings:</p>
//         <select className="focus:outline-none text-sm">
//           <option className="w-full">All</option>
//         </select>
//       </div>
//       <div className="flex items-center justify-between gap-1 border border-[#e7e7e7] rounded-lg h-[34px] bg-white px-3 flex-1">
//         <p className="text-sm text-[#7e7e7e]">Date:</p>
//         <input type="date" className="focus:outline-none text-sm" />
//       </div>
//       <div className="flex items-center justify-between gap-1 border border-[#e7e7e7] rounded-lg h-[34px] bg-white px-3 flex-1">
//         <p className="text-sm text-[#7e7e7e]">Date:</p>
//         <input type="date" className="focus:outline-none text-sm" />
//       </div>
//     </div>
//   );
// };
