/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CarbonMonoxideIcon from '../../../assets/svgs/buildings/CarbonMonoxideIcon';
import CoIcon from '../../../assets/svgs/buildings/CoIcon';
import HumidityIcon from '../../../assets/svgs/buildings/HumidityIcon';
import LpgIcon from '../../../assets/svgs/buildings/LpgIcon';
import MethaneIcon from '../../../assets/svgs/buildings/MethaneIcon';
import AlarmsIcon from '../../../assets/svgs/dashboard/AlarmsIcon';
import DeleteIcon from '../../../assets/svgs/pages/DeleteIcon';
import EditIcon from '../../../assets/svgs/stepper/EditIcon';
import {
  useDeleteSingleFloorMutation,
  useGetSingleFloorQuery,
} from '../../../redux/apis/floorApis';
import ShowCanvasData from '../../buildings/ShowCanvasData';
import DoubleAreaChart from '../../charts/areaChart/DoubleAreaChart';
import { FloorStatusCard } from '../../shared/large/card/StatusCard';
import Alerts from './components/Alerts';
import CurrentHumidityChart from './components/CurrentHumidityChart';
import FloorDetails from './components/FloorDetails';
import FloorSensorDetails from './components/FloorSensorDetails';
import Loader from '../../shared/small/Loader';

const icons = [
  <AlarmsIcon />,
  <HumidityIcon />,
  <MethaneIcon />,
  <CarbonMonoxideIcon />,
  <CoIcon />,
  <LpgIcon />,
];
let floorDetails = { buildingImg: '', name: '', type: '', rooms: '', sensors: '' };

const FloorView = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('heat');
  const { id } = useParams();
  const [image, setImage] = useState('');
  const [polygons, setPolygons] = useState([]);
  const { data: floor, isLoading } = useGetSingleFloorQuery(id);
  const [deleteFloor] = useDeleteSingleFloorMutation();
  // console.log('full data of floor', floor);

  // const twoDModelCanvasData = floor?.data?.twoDModelCanvasData ?? [];
  // const sensors = floor?.data?.sensors ?? [];

  // const sensorMap = sensors.reduce((acc, sensor) => {
  //   acc[sensor._id] = sensor;
  //   return acc;
  // }, {});

  // const enrichedCanvasData = twoDModelCanvasData.map((item) => ({
  //   ...item,
  //   sensorAttached: sensorMap[item.sensorAttached] || null,
  // }));

  // console.log('enrichedCanvasData', enrichedCanvasData);
  const enrichResponseData = (response) => {
    const data = response?.data ?? {};
    const sensorMap = (data.sensors ?? []).reduce((acc, sensor) => {
      acc[sensor._id] = sensor;
      return acc;
    }, {});

    const enrichedCanvasData = (data.twoDModelCanvasData ?? []).map((item) => ({
      ...item,
      sensorAttached: sensorMap[item.sensorAttached] || null,
    }));

    return {
      ...response,
      data: {
        ...data,
        twoDModelCanvasData: enrichedCanvasData,
      },
    };
  };
  const enrichedResponse = enrichResponseData(floor);
  // console.log('new', enrichedResponse);

  const handleOpenDeleteModal = () => {
    confirmAlert({
      title: 'Delete Floor',
      message: 'Are you sure, you want to delete this whole Floor?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            if (!id) return toast.error('Error while deleting floor');
            try {
              const res = await deleteFloor(id).unwrap();
              if (res?.message) toast.success(res.message);
              return navigate('/dashboard/buildings');
            } catch (error) {
              console.log('Error in deleting floor', error);
              toast.error(error?.data?.message || 'Error in delete floor');
            }
          },
        },
        {
          label: 'No',
        },
      ],
    });
  };
  const sensorsData = floor?.data?.sensorsData ?? [];
  useEffect(() => {
    if (floor?.data) {
      const singleFloor = floor?.data;
      floorDetails = {
        ...floorDetails,
        name: singleFloor?.building?.name || '',
        buildingImg: singleFloor?.building?.thumbnail?.url || '',
        type: singleFloor?.building?.type || '',
        rooms: singleFloor?.rooms || '',
        sensors: singleFloor?.sensors?.length || 0,
      };
      setImage(singleFloor?.twoDModel?.url);
      setPolygons(singleFloor?.twoDModelCanvasData ? singleFloor?.twoDModelCanvasData : []);
    }
  }, [floor?.data]);
  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 gap-4">
        {sensorsData.length ? (
          sensorsData.map((item, i) => (
            <FloorStatusCard
              key={i}
              name={item?.[0] ?? '—'}
              value={item?.[1] ?? '—'}
              icon={icons[i % icons.length]}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-6 text-gray-500">No sensor data yet</div>
        )}
      </section>
      <section className="grid grid-cols-12 gap-4 mt-4  ">
        <div className="col-span-12 xl:col-span-8 flex flex-col">
          <div className="my-5"></div>
          <div className="grid grid-cols-1 rounded-[16px] p-5 bg-white shadow-dashboard">
            <ShowCanvasData image={image} polygons={polygons} />
          </div>
          {floor?.data?.chartData ? (
            <div className="grid grid-cols-1 mt-4 rounded-[16px] p-5 bg-white shadow-dashboard ">
              <DoubleAreaChart chartsData={floor?.data?.chartData} />
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">No chart data yet</div>
          )}
          <div className="grid grid-cols-1 mt-4 flex-1">
            <FloorSensorDetails data={floor?.data?.sensors ?? []} />
          </div>
        </div>

        <div className="col-span-12 xl:col-span-4 flex flex-col">
          <section className="p-2 flex justify-end">
            <div className="flex items-center gap-4 ">
              <Link title="Edit Floor" to={`/dashboard/edit-floor/${id}`}>
                <EditIcon />
              </Link>
              <button title="Delete Floor" onClick={handleOpenDeleteModal}>
                <DeleteIcon />
              </button>
            </div>
          </section>

          <div className="grid grid-cols-1">
            <FloorDetails floorDetails={floorDetails} />
          </div>
          <div className="grid grid-cols-1 mt-4 rounded-[16px] p-8 bg-white shadow-dashboard">
            <CurrentHumidityChart floorData={floor?.data?.sensorsData ?? []} />
          </div>
          <div className="grid grid-cols-1 mt-4 flex-1">
            <Alerts />
          </div>
        </div>
      </section>

      <section className="mt-4 p-5 col-span-12 xl:col-span-8 rounded-[16px] bg-white shadow-dashboard">
        <div className="">
          {/* Toggle Buttons */}
          <div className="flex border  w-fit border-none  px-1 py-2 rounded-lg relative h-[40px] sm:h-[60px] mb-6">
            {/* Heat Map button */}
            <button
              className={`absolute  w-[120px] bg-[#03A5E040] px-4 py-2  text-sm font-medium transition-colors duration-300 ${
                activeTab === 'heat'
                  ? 'bg-white text-[#03A5E0] shadow-[4px_0_10px_rgba(0,0,0,0.25)] rounded-lg font-[700] z-[1]'
                  : 'bg-[#03A5E040] text-gray-500 rounded-l-lg z-[0]'
              }`}
              onClick={() => setActiveTab('heat')}
            >
              Heat Map
            </button>

            {/* Floor Layout button */}
            <button
              className={`w-[120px] px-4 py-2 text-sm font-medium transition-colors duration-300 absolute left-[120px]  ${
                activeTab === 'floor'
                  ? 'bg-white text-[#03A5E0] shadow-[-5px_5px_15px_rgba(0,0,0,0.25)] rounded-lg font-[700] z-[1]'
                  : 'bg-[#03A5E040] text-gray-500 rounded-r-lg z-[0]'
              }`}
              onClick={() => setActiveTab('floor')}
            >
              Floor Layout
            </button>
          </div>

          <div className="flex justify-center">
            {activeTab === 'heat' ? (
              <ShowCanvasData
                data={floor?.data?.temperaturePerSensor}
                image={image}
                polygons={polygons}
                heatmap={true}
              />
            ) : (
              <ShowCanvasData image={image} polygons={polygons} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FloorView;
