import PropTypes from 'prop-types';
import MapIcon from '../../../assets/svgs/reports/MapIcon';
import SensorIcon from '../../../assets/svgs/reports/SensorIcon';
import DataTable from 'react-data-table-component';
// import { reportsLists } from "../../../data/data";
import TemperatureIcon from '../../../assets/svgs/reports/TemperatureIcon';
import TvocIcon from '../../../assets/svgs/reports/TvocIcon';
import Co2Icon from '../../../assets/svgs/reports/Co2Icon';
import HumidityIcon from '../../../assets/svgs/reports/HumidityIcon';
import CoIcon from '../../../assets/svgs/reports/CoIcon';
import Ch4Icon from '../../../assets/svgs/reports/Ch4Icon';
import Loader from '../../../components/shared/small/Loader';
import Skeleton from 'react-loading-skeleton';
const columns = [
  {
    name: 'Date',
    selector: (row) => <p className="text-sm text-[#060606cc] font-bold">{row.date}</p>,
  },
  {
    name: 'Tempareture',
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
      <div className="flex gap-2 items-center">
        <p className="text-sm text-[#292d32cc] font-medium capitalize">{row.performance}</p>
        <p className="text-sm text-[#292d32cc] font-medium capitalize">{row.face}</p>
      </div>
    ),
    // center: true,
  },
];

const ReportsList = ({ building, onPaginate }) => {
  const isLoading = building.isLoading;
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-[20px] border-[2px] border-[#00000012] p-4">
        <div className="flex items-center flex-wrap justify-between gap-3">
          <div className="flex items-center flex-wrap gap-3">
            {isLoading ? (
              <Skeleton height={106} width={186} borderRadius="12px" />
            ) : (
              <img
                src={building.thumbnail.url}
                alt="image"
                className="w-[186px] h-[106px] object-cover rounded-xl"
              />
            )}

            <div>
              <h5 className="text-sm md:text-base font-bold text-[#2e2e2e]">
                {isLoading ? <Skeleton width={120} height={20} /> : building.buildingName}
              </h5>

              <div className="flex items-center gap-1 py-1">
                <MapIcon />
                <p className="text-[10px] font-semibold text-[#060606cc]">
                  {isLoading ? <Skeleton width={160} height={14} /> : building.address}
                </p>
              </div>

              <div className="flex items-center gap-1">
                <SensorIcon />
                <div className="text-[#292d32] font-bold">
                  <p className="text-sm md:text-base">
                    {isLoading ? <Skeleton width={120} height={18} /> : 'Total No. of Sensors'}
                  </p>
                  <p className="text-base md:text-xl">
                    {isLoading ? <Skeleton width={40} height={22} /> : building.totalSensors}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between h-full gap-8">
            <div className="flex items-center justify-end gap-2">
              {isLoading ? (
                <Skeleton width={90} height={38} borderRadius={8} />
              ) : (
                <button className="flex items-center gap-1 rounded-md border border-[#414141] h-[38px] px-6 py-2 text-xs font-bold cursor-default">
                  <div className="w-[10px] h-[10px] rounded-full bg-primary-lightBlue"></div>
                  Active
                </button>
              )}
            </div>

            <div className="flex items-center md:justify-end gap-3">
              {isLoading ? (
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
          {isLoading ? (
            <div className="flex flex-col gap-3">
              <Skeleton height={40} />
              <Skeleton height={40} />
              <Skeleton height={40} />
              <Skeleton height={40} />
              <Skeleton height={40} />
              <Skeleton height={40} />
              <Skeleton height={40} />
              <Skeleton height={40} />
              <Skeleton height={40} />
              <Skeleton height={40} />
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={building.sensorData}
              customStyles={tableStyles}
              pagination
              paginationServer
              paginationTotalRows={building.totalRecords}
              onChangePage={(newPage) => onPaginate(building.buildingId, newPage, building.limit)}
              onChangeRowsPerPage={(newLimit) => onPaginate(building.buildingId, 1, newLimit)}
              paginationDefaultPage={building.page}
              paginationPerPage={building.limit}
              selectableRowsHighlight
            />
          )}
        </div>
      </div>
    </div>
  );
};

ReportsList.propTypes = {
  building: PropTypes.object.isRequired,
  onPaginate: PropTypes.func.isRequired,
};

export default ReportsList;

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
