import React, { useEffect, useState } from 'react';
import Welcome from '../../../components/buildingsData/Welcome';
import StatusCards from '../../../components/buildingsData/StatusCards';
import LineChart from '../../../components/charts/lineChart/LineChart';
import WeatherCard from '../../../components/buildingsData/WeatherCard';
import BuildingMap from '../../../components/buildingsData/BuildingMap';
import AirQualityIndex from '../../../components/buildingsData/AirQualityIndex';
import WeatherChart from '../../../components/buildingsData/WeatherChart';
import DoubleAreaChart from '../../../components/charts/areaChart/DoubleAreaChart';
import BuildingFloors from '../../../components/buildingsData/buildingView/components/BuildingFloors';
import dashboardApis from '../../../redux/apis/dashboardApis';
import { getDailyAverageAirQuality } from '../../../utils/functions';
import DashboardBuildings from '../../../components/buildingsData/DashboardBuildings';
import { useDispatch, useSelector } from 'react-redux';
import WeatherForecast from '../../../components/buildings/utils/WeatherForecast';

const BuildingsData = () => {
  // const { data, isLoading, error } = useAdminDashboardQuery();
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user.role === 'sub_admin';
  const isAdminORSubscription = ['sub_admin', 'Inspection_manager'].includes(user.role);

  // const isAdmin = true;
  console.log('isAdmin', isAdminORSubscription);
  const dispatch = useDispatch();

  const [result, setResult] = useState({
    data: null,
    isLoading: true,
    error: null,
  });
  useEffect(() => {
    if (!user) return;

    let userId;

    if (user?.role === 'super_admin') {
      // super_admin → no userId
      userId = undefined;
    } else if (user?.role === 'sub_admin') {
      // sub_admin → use own id
      userId = user._id;
    } else if (
      user?.role === 'Inspection_manager' ||
      user?.role === 'Report_Manager' ||
      user?.role === 'Subscription_Manager'
    ) {
      // Special roles → use creatorId
      userId = user.creatorId;
    } else {
      // fallback → use own id
      userId = user._id;
    }

    console.log('userId', userId);

    const promise =
      user?.role === 'super_admin'
        ? dispatch(dashboardApis.endpoints.adminDashboard.initiate())
        : dispatch(dashboardApis.endpoints.adminDashboardById.initiate({ userId }));

    promise
      .unwrap()
      .then((data) => {
        setResult({ data, isLoading: false, error: null });
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setResult({ data: null, isLoading: false, error: err });
      });

    return () => {
      promise.abort();
    };
  }, [dispatch]);

  const { data, isLoading, error } = result;

  // console.log('data', data);
  const [dailyAverages, setDailyAverages] = useState([]);

  useEffect(() => {
    if (!isLoading && !error && data) {
      const averages = getDailyAverageAirQuality(data);
      setDailyAverages(averages);
    }
  }, [isLoading, error, data]);

  const seriesData = [
    {
      name: 'Website Blog',
      type: 'column',
      data: dailyAverages,
    },
    {
      name: 'Social Media',
      type: 'line',
      data: dailyAverages,
    },
  ];

  // console.log('data:', seriesData);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <div className="lg:col-span-8 flex flex-col">
        <Welcome data={data} loading={isLoading} />
        <div className="mt-4">
          <StatusCards data={data} isLoading={isLoading} />
        </div>
        <div className="mt-4">
          <BuildingMap data={data} loading={isLoading} />
        </div>
        <div className="shadow-dashboard border-[0.2px] border-[#00000033] rounded-xl bg-white p-4 mt-4 flex-1">
          <DoubleAreaChart chartsData={data?.chartData} />
        </div>
      </div>
      <div className="lg:col-span-4 flex flex-col">
        <div className="shadow-dashboard border-[0.6px] border-[#0000004d] rounded-xl bg-white p-4">
          <LineChart
            seriesData={seriesData}
            xLabels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
            loading={isLoading}
          />
        </div>
        <div className="shadow-dashboard rounded-xl bg-white mt-4 flex-1">
          <WeatherCard />
          {/* <WeatherForecast /> */}
        </div>
        <div className="shadow-dashboard border-[0.2px] border-[#00000033] rounded-xl bg-white mt-4">
          <AirQualityIndex />
        </div>
        <div className="shadow-dashboard border-[0.2px] border-[#00000033] rounded-xl bg-white px-4 pt-4 pb-8 mt-4">
          <WeatherChart data={data} loading={isLoading} />
        </div>
      </div>
      {isAdminORSubscription && (
        <div className="lg:col-span-12">
          <DashboardBuildings title="Buildings" data={data} />
        </div>
      )}
    </div>
  );
};

export default BuildingsData;
