import PropTypes from 'prop-types';
import DataTable from 'react-data-table-component';
import SensorIcon from '../../../assets/svgs/reports/SensorIcon';
import Skeleton from 'react-loading-skeleton';
import TemperatureIcon from '../../../assets/svgs/reports/TemperatureIcon';
import TvocIcon from '../../../assets/svgs/reports/TvocIcon';
import Co2Icon from '../../../assets/svgs/reports/Co2Icon';
import HumidityIcon from '../../../assets/svgs/reports/HumidityIcon';
import CoIcon from '../../../assets/svgs/reports/CoIcon';
import Ch4Icon from '../../../assets/svgs/reports/Ch4Icon';
import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

const columns = [
  {
    name: 'Date',
    selector: (row) => <p className="text-sm text-[#060606cc] font-bold">{row.date}</p>,
  },
  {
    name: 'Temperature',
    selector: (row) => (
      <div className="flex items-center gap-1">
        <p className="text-sm text-[#060606cc] font-bold">{row.temperature}°F</p>
        <TemperatureIcon temperature={row.temperature} />
      </div>
    ),
  },
  {
    name: 'TVOC',
    selector: (row) => (
      <div className="flex items-center gap-1">
        <p className="text-sm text-[#060606cc] font-bold">{row.tvoc}°F</p>
        <TvocIcon temperature={row.tvoc} />
      </div>
    ),
  },
  {
    name: 'CO2',
    selector: (row) => (
      <div className="flex items-center gap-1">
        <p className="text-sm text-[#060606cc] font-bold">{row.co2}°F</p>
        <Co2Icon temperature={row.co2} />
      </div>
    ),
  },
  {
    name: 'Humidity',
    selector: (row) => (
      <div className="flex items-center gap-1">
        <p className="text-sm text-[#060606cc] font-bold">{row.humidity}%</p>
        <HumidityIcon temperature={row.humidity} />
      </div>
    ),
  },
  {
    name: 'CO',
    selector: (row) => (
      <div className="flex items-center gap-1">
        <p className="text-sm text-[#060606cc] font-bold">{row.co}%</p>
        <CoIcon temperature={row.co} />
      </div>
    ),
  },
  {
    name: 'CH4',
    selector: (row) => (
      <div className="flex items-center gap-1">
        <p className="text-sm text-[#060606cc] font-bold">{row.ch}%</p>
        <Ch4Icon temperature={row.ch} />
      </div>
    ),
  },
  {
    name: 'Performance',
    selector: (row) => (
      <p className="text-sm text-[#292d32cc] font-medium capitalize">
        {row.performance} {row.face}
      </p>
    ),
  },
];

const tableStyles = {
  headCells: {
    style: {
      fontSize: '16px',
      fontWeight: 700,
      color: '#ffffff',
      background: 'rgba(3, 165, 224, 1)',
    },
  },
};

const Ratings = ({ color, title }) => {
  return (
    <div className="flex items-center gap-1">
      <div className="w-[10px] h-[10px] rounded-sm" style={{ background: color }}></div>
      <p className="text-xs font-bold text-[#414141cc]">{title}</p>
    </div>
  );
};

Ratings.propTypes = {
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const CHUNK_SIZE = 200; // adjust as needed

const FloorCard = ({ floor, filterLoading }) => {
  const [visibleData, setVisibleData] = useState([]);
  const [chunkIndex, setChunkIndex] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    if (floor?.sensorData?.length > 0) {
      console.log('🔄 New floor data received:', {
        floorId: floor.floorId,
        totalRows: floor.sensorData.length,
      });

      setVisibleData([]);
      setChunkIndex(0);

      // Start loading first chunk immediately
      loadNextChunk(0);
    }
  }, [floor?.sensorData]);

  const loadNextChunk = (index) => {
    const start = index * CHUNK_SIZE;
    const end = start + CHUNK_SIZE;
    const chunk = floor.sensorData.slice(start, end);

    if (chunk.length > 0) {
      console.log(`⏳ Loading chunk ${index + 1}`, {
        start,
        end,
        rowsInChunk: chunk.length,
      });

      setLoadingMore(true);

      setTimeout(() => {
        setVisibleData((prev) => {
          const newData = [...prev, ...chunk];
          console.log(`✅ Painted chunk ${index + 1}`, {
            totalVisibleRows: newData.length,
          });
          return newData;
        });

        setChunkIndex(index + 1);
        setLoadingMore(false);
      }, 100); // delay lets browser paint
    } else {
      console.log('🎉 All chunks painted for floor:', floor.floorId);
    }
  };

  // Auto-load next chunk until all rows loaded
  useEffect(() => {
    if (!loadingMore && chunkIndex * CHUNK_SIZE < (floor?.sensorData?.length || 0)) {
      loadNextChunk(chunkIndex);
    }
  }, [chunkIndex, loadingMore]);

  useEffect(() => {
    console.log('📊 Debug state', {
      floorId: floor.floorId,
      visibleRows: visibleData.length,
      totalRows: floor?.sensorData?.length || 0,
      chunkIndex,
      loadingMore,
    });
  }, [visibleData, chunkIndex, loadingMore]);

  return (
    <div className="bg-white rounded-[20px] border-[2px] border-[#00000012] p-4 mb-4">
      <div className="flex items-center flex-wrap justify-between gap-3">
        <div className="flex items-center flex-wrap gap-3">
          {filterLoading ? (
            <Skeleton height={106} width={186} borderRadius="12px" />
          ) : (
            (() => {
              const imgSrc = (floor && floor.twoDModel && floor.twoDModel.url) || floor?.twoDModel;
              return imgSrc ? (
                <img
                  src={imgSrc}
                  alt="image"
                  className="w-[186px] h-[106px] object-cover rounded-xl"
                />
              ) : (
                <div className="w-[186px] h-[106px] bg-[#f2f2f2] rounded-xl" />
              );
            })()
          )}

          <div className="flex flex-col">
            <p className="text-sm md:text-base">
              {filterLoading ? <Skeleton width={120} height={18} /> : floor.floorName}
            </p>
            <div className="flex items-center gap-1">
              <SensorIcon />
              <div className="text-[#292d32] font-bold">
                <p className="text-sm md:text-base">
                  {filterLoading ? <Skeleton width={120} height={18} /> : 'Total No. of Sensors'}
                </p>
                <p className="text-base md:text-xl">
                  {filterLoading ? <Skeleton width={40} height={22} /> : floor.sensors.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between h-full gap-8">
          <div className="flex items-center justify-end gap-2">
            {filterLoading ? (
              <Skeleton width={90} height={38} borderRadius={8} />
            ) : (
              <button className="flex items-center gap-1 rounded-md border border-[#414141] h-[38px] px-6 py-2 text-xs font-bold cursor-default">
                <div className="w-[10px] h-[10px] rounded-full bg-primary-lightBlue"></div>
                Active
              </button>
            )}
          </div>

          <div className="flex items-center md:justify-end gap-3">
            {filterLoading ? (
              <>
                <Skeleton width={60} height={20} />
                <Skeleton width={60} height={20} />
                <Skeleton width={60} height={20} />
              </>
            ) : (
              <>
                <Ratings title="Good" color="rgba(122, 255, 60, 1)" />
                <Ratings title="Average" color="rgba(255, 199, 115, 1)" />
                <Ratings title="Bad" color="rgba(238, 14, 0, 1)" />
              </>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <DataTable
          columns={columns}
          data={visibleData}
          customStyles={tableStyles}
          progressPending={!!filterLoading && visibleData.length === 0}
          progressComponent={
            <div className="flex justify-center items-center gap-2 py-6 text-gray-600">
              <FaSpinner className="animate-spin text-blue-500 w-6 h-6" />
              Loading data…
            </div>
          }
        />

        {loadingMore && visibleData.length > 0 && (
          <div className="flex justify-center items-center gap-2 py-4 text-gray-600">
            <FaSpinner className="animate-spin text-blue-500 w-5 h-5" />
            Rendering more rows…
          </div>
        )}
      </div>
    </div>
  );
};

FloorCard.propTypes = {
  floor: PropTypes.object.isRequired,
  filterLoading: PropTypes.bool,
};

const SensorCard = ({ sensor, filterLoading }) => {
  console.log('sensor', sensor);

  return (
    <div className="bg-white rounded-[20px] border-[2px] border-[#00000012] p-4 mb-4">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-sm md:text-base font-bold text-[#2e2e2e]">{sensor.sensorName}</h5>
          <p className="text-[10px] font-semibold text-[#060606cc]">
            Parameters: {(sensor.parameters || []).join(', ')}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <DataTable
          columns={columns}
          data={sensor.sensorData || []}
          customStyles={tableStyles}
          progressPending={!!filterLoading}
        />
      </div>
    </div>
  );
};

SensorCard.propTypes = {
  sensor: PropTypes.object.isRequired,
  filterLoading: PropTypes.bool,
};

const FilteredReports = ({ view, onBack }) => {
  const { mode, data, isLoading } = view || {};
  console.log('filterLoadingisLoading', isLoading);

  const renderBody = () => {
    if (!data) return null;
    if (mode === 'building') {
      const floors = Array.isArray(data) ? data : [data];
      return floors.map((f) => (
        <FloorCard
          key={f.floorId}
          floor={f}
          filterLoading={(view?.loadingById || {})[f.floorId] || false}
        />
      ));
    }
    if (mode === 'floor') {
      const floor = Array.isArray(data) ? data[0] : data;
      return (
        <FloorCard
          floor={floor}
          filterLoading={(view?.loadingById || {})[floor.floorId] || isLoading}
        />
      );
    }
    if (mode === 'sensor' || mode === 'parameter') {
      const sensors = Array.isArray(data) ? data : [data];
      return sensors.map((s) => (
        <SensorCard
          key={s.sensorId}
          sensor={s}
          filterLoading={(view?.loadingById || {})[s.sensorId] || isLoading}
        />
      ));
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <button className="text-xs font-bold text-[#03a5e0]" onClick={onBack}>
          Back to All Buildings
        </button>
      </div>
      {renderBody()}
    </div>
  );
};

FilteredReports.propTypes = {
  view: PropTypes.object,
  onBack: PropTypes.func.isRequired,
  onPaginate: PropTypes.func.isRequired,
};

export default FilteredReports;
