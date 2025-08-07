import { useEffect, useState } from 'react';
import Button from '../../../components/shared/small/Button';
import SearchIcon from '../../../assets/svgs/reports/SearchIcon';
import ReportsList from './ReportsList';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import fullLogo from '../../../assets/images/full-logo.png';
import Modal from '../../../components/shared/modal/Modal';
import BrowseFile from '../../../components/shared/large/BrowseFile';
import { useGetReportsQuery, useLazyGetReportsQuery } from '../../../redux/apis/reportsApi';
import Loader from '../../../components/shared/small/Loader';

const Reports = () => {
  const [file, setFile] = useState(null);
  const [modal, setModal] = useState(false);
  const { data, isFetching, error } = useGetReportsQuery({ interval: 4 });
  const [trigger] = useLazyGetReportsQuery();
  const [buildingReports, setBuildingReports] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const filteredReports = Object.values(buildingReports).filter((building) => {
    const query = searchTerm.toLowerCase();
    return building.buildingName?.toLowerCase().includes(query);
  });
  // console.log('searchTerm', filteredReports);
  // console.log('dtaaaaa', data);

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

  // Handler for paginating a single building
  const handlePaginate = (buildingId, page, limit) => {
    setBuildingReports((prev) => ({
      ...prev,
      [buildingId]: { ...prev[buildingId], isLoading: true },
    }));
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
    setModal(false);
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;

    let yPos = 10; // Start y-position

    // const currentDate = new Date().toLocaleDateString();
    // doc.setFontSize(10);
    // doc.text(`Date: ${currentDate}`, 15, 6);
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString(); // Get current time
    doc.setFontSize(10);
    doc.text(`Date: ${currentDate} Time: ${currentTime}`, 15, 6);

    const logoBase64 = await getBase64ImageFromURL(file || fullLogo);
    if (logoBase64) {
      const img = new Image();
      img.src = logoBase64;

      await new Promise((resolve) => {
        img.onload = () => resolve();
      });

      const originalWidth = img.width;
      const originalHeight = img.height;

      const desiredWidth = 50;
      const aspectRatio = originalWidth / originalHeight;
      const desiredHeight = desiredWidth / aspectRatio;

      const logoX = (pageWidth - desiredWidth) / 2;

      doc.addImage(logoBase64, 'PNG', logoX, yPos, desiredWidth, desiredHeight);
      yPos += desiredHeight + 15;

      doc.setFontSize(10);
      doc.text('Reports: Following are the reports of all sensors on all buildings', 14, yPos);
      yPos += 10;
    }

    for (const report of Object.values(buildingReports)) {
      const buildingImgBase64 = await getBase64ImageFromURL(report.image);
      const imageHeight = 30;
      const imageWidth = 50;
      const imageX = 14;
      const textX = imageX + imageWidth + 5;

      if (yPos + imageHeight > pageHeight - 20) {
        doc.addPage();
        yPos = 10;
      }

      if (buildingImgBase64) {
        doc.addImage(buildingImgBase64, 'PNG', imageX, yPos, imageWidth, imageHeight);

        doc.setFontSize(14);
        doc.text(report.title, textX, yPos + 10);

        doc.setFontSize(10);
        doc.text(`Location: ${report.location}`, textX, yPos + 15);
        doc.text(`Total Sensors: ${report.totalSensors}`, textX, yPos + 20);

        yPos += imageHeight + 5;
      }

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
        item.performance, // Keep performance value for rendering
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
          // Check if the current column is the "Performance" column (index 7)
          if (data.column.index === 7) {
            const performanceValue = data.cell.raw;

            // Dynamically change text color based on performance value
            if (performanceValue === 'excellent') {
              doc.setTextColor(0, 128, 0); // Green for "Excellent"
            } else if (performanceValue === 'average') {
              doc.setTextColor(255, 215, 0); // Yellow for "Average"
            } else if (performanceValue === 'bad') {
              doc.setTextColor(255, 0, 0); // Red for "Bad"
            } else if (performanceValue === 'good') {
              doc.setTextColor(44, 116, 199); // Blue for "Good"
            }
          }
        },
        didDrawCell: (data) => {
          // Reset text color to default after drawing each cell
          if (data.column.index === 7) {
            doc.setTextColor(0, 0, 0); // Reset to black after performance column
          }
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

    doc.save('reports.pdf');
  };

  if (isFetching && Object.keys(buildingReports).length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div>
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
          <Button
            text="Refresh Data"
            bg="bg-transparent"
            color="#03a5e0"
            borderColor="#03a5e0"
            height="h-[25px]"
          />
          <Button
            text="Export"
            height="h-[25px]"
            borderColor="#03a5e0"
            onClick={openModalHandler}
          />
        </div>
      </div>
      <div className="my-4">
        <FilterSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      {/* Report Lists */}
      <div>
        {/* {error ? (
          <p>Error loading reports.</p>
        ) : 
        // (
        //   Object.values(buildingReports).map((building) => (
        //     <ReportsList
        //       key={building.buildingId}
        //       building={building}
        //       onPaginate={handlePaginate}
        //     />
        //   ))
        // )
        
        } */}
        <div>
          {(searchTerm ? filteredReports : Object.values(buildingReports)).map((building) => (
            <ReportsList
              key={building.buildingId}
              building={building}
              onPaginate={handlePaginate}
            />
          ))}
        </div>
      </div>
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

const FilterSection = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex items-center flex-wrap gap-4">
      <div className="flex items-center gap-1 border border-[#e7e7e7] rounded-lg h-[34px] bg-white px-3 basis-[35%] flex-1">
        <SearchIcon />
        <input
          type="search"
          placeholder="Search"
          className="focus:outline-none text-sm w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between gap-1 border border-[#e7e7e7] rounded-lg h-[34px] bg-white px-3 flex-1">
        <p className="text-sm text-[#7e7e7e]">Buildings:</p>
        <select className="focus:outline-none text-sm">
          <option className="w-full">All</option>
        </select>
      </div>
      <div className="flex items-center justify-between gap-1 border border-[#e7e7e7] rounded-lg h-[34px] bg-white px-3 flex-1">
        <p className="text-sm text-[#7e7e7e]">Date:</p>
        <input type="date" className="focus:outline-none text-sm" />
      </div>
      <div className="flex items-center justify-between gap-1 border border-[#e7e7e7] rounded-lg h-[34px] bg-white px-3 flex-1">
        <p className="text-sm text-[#7e7e7e]">Date:</p>
        <input type="date" className="focus:outline-none text-sm" />
      </div>
    </div>
  );
};
