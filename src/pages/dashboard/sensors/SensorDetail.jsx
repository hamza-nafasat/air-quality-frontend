import { useState } from 'react';
import TemperatureSpecification from '../../../components/sensors/TemperatureSpecification';
import ChipIcon from '../../../assets/svgs/devices/ChipIcon';
import { alerts, temperatureSpecification } from '../../../data/data';
import Button from '../../../components/shared/small/Button';
import Alert from '../../../components/shared/large/alert/Alert';
import Modal from '../../../components/shared/large/modal/Modal';
import BarChart from '../../../components/charts/barChart/BarChart';
import SingleAreaChart from '../../../components/charts/areaChart/SingleAreaChart';
import { useGetSingleSensorQuery } from '../../../redux/apis/sensorApis';
import { useParams } from 'react-router-dom';

const SensorDetail = () => {
  const { id } = useParams();
  console.log('hjjhhjjhhj', id);

  const { data } = useGetSingleSensorQuery(id);
  console.log('hjj?.hhjjadfefeqwfwehhj', data);
  const [modal, setModal] = useState(false);

  const handleModalOpen = () => {
    setModal(true);
  };

  const handleModalClose = () => {
    setModal(false);
  };
  return (
    <div>
      <div className="bg-white  overflow-hidden rounded-[16px] shadow-dashboard">
        <section className="p-3 flex  gap-2 items-center bg-primary-lightBlue text-white ">
          <ChipIcon />
          <h5 className="text-[14px] xl:text-[16px] font-[800]">{data?.data?.name}</h5>
        </section>
        <h4 className="m-5 text-[14px] xl:text-[16px] font-[700] ">
          DS18B20 Temperature Sensor Module For Arduino
        </h4>
        <div className="p-7">
          <section className="grid grid-cols-12 gap-4 items-start">
            <div className=" col-span-12 xl:col-span-4">
              <section className="mb-3 text-[14px] xl:text-[16px] font-[700] ">
                SENSOR SPECIFICATION
              </section>
              <div>
                <TemperatureSpecification type="Supply Name" status={'Name'} />
                <TemperatureSpecification type="Sensor Type" status={'Type'} />
                <TemperatureSpecification type="Install on" status={data?.data?.createdAt} />
                {/* <TemperatureSpecification type="Last data received" status={'hallo'} /> */}
                <TemperatureSpecification
                  type="Last data received"
                  status={
                    data?.latestReadings && Object.keys(data.latestReadings).length
                      ? `(${Object.values(data.latestReadings)[0].time})`
                      : '— no data yet'
                  }
                />
              </div>
              <div className="border-b border-dashed border-gray-300 mt-2" />
              {data?.latestReadings &&
                Object.entries(data.latestReadings).map(([gas, { value, time }]) => (
                  <TemperatureSpecification
                    key={gas}
                    type={gas.toUpperCase()}
                    status={`${value} – ${time}`}
                  />
                ))}
            </div>
            <div className="text-center xl:col-span-2">
              <div className="hidden xl:block w-[2px] h-[20rem] bg-[#00000020] mx-auto"></div>
            </div>
            <div className=" col-span-12 xl:col-span-6 ">
              <BarChart data={data?.charts} />
            </div>
          </section>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-12 xl:col-span-8">
          <section className="bg-white p-4 rounded-[16px] shadow-dashboard">
            {/* <SingleAreaChart data={data?.charts} /> */}
            <SingleAreaChart dataSets={data?.frequencyData} />
          </section>
        </div>
        <div className="col-span-12 xl:col-span-4">
          <section className="bg-white p-4 rounded-[16px] shadow-dashboard h-full">
            <div className="flex justify-between items-center">
              <h1>Alerts</h1>
              <Button
                text="View All"
                width="w-fit"
                bg="bg-none"
                color="#03A5E0"
                size="text-[18px]"
                onClick={() => handleModalOpen()}
              />
            </div>
            <hr />
            {alerts.length === 0 ? (
              <h2 className="  text-[#00000090] my-3 text-sm xl:text-lg">No Alert Found!</h2>
            ) : (
              <>
                {alerts.slice(0, 3).map((alert, i) => (
                  <Alert key={i} type={alert.type} message={alert.message} />
                ))}
              </>
            )}
            {modal && (
              <Modal title="All Alerts" onClose={handleModalClose}>
                <div>
                  <div className="modal-content overflow-y-auto max-h-64">
                    {alerts.map((alert, i) => (
                      <Alert key={i} type={alert.type} message={alert.message} />
                    ))}
                  </div>
                </div>
              </Modal>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default SensorDetail;
