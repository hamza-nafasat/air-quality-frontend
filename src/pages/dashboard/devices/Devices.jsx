import React, { useState } from "react";
import StatusCard from "../../../components/shared/large/card/StatusCard";
import SpecificationList from "../../../components/devices/SpecificationList";
import { alerts, deviceStatus, specificationList } from "../../../data/data";
import DioxideIcon from "../../../assets/svgs/devices/DioxideIcon";
import HumidityIcon from "../../../assets/svgs/devices/HumidityIcon";
import MethaneIcon from "../../../assets/svgs/devices/MethaneIcon";
import MonoxideIcon from "../../../assets/svgs/devices/MonoxideIcon";
import CloudIcon from "../../../assets/svgs/buildings/CloudIcon";
import LpgIcon from "../../../assets/svgs/devices/LpgIcon";
import Alert from "../../../components/shared/large/alert/Alert";
import TemperatureIcon from "../../../assets/svgs/devices/TemperatureIcon";
import Button from "../../../components/shared/small/Button";
import ChipIcon from "../../../assets/svgs/devices/ChipIcon";
import Tabs from "../../../components/devices/tabCharts";
import Modal from "../../../components/shared/large/modal/Modal";

const icons = [
  <DioxideIcon />,
  <HumidityIcon />,
  <MethaneIcon />,
  <MonoxideIcon />,
  <TemperatureIcon />,
  <LpgIcon />,
];

const Devices = () => {
  const [modal, setModal] = useState(false);

  const handleModalOpen = () => {
    setModal(true);
  };

  const handleModalClose = () => {
    setModal(false);
  };
  return (
    <div>
      <div className="bg-white  overflow-hidden rounded-[16px]">
        <section className="p-3 flex  gap-2 items-center bg-primary-lightBlue text-white ">
          <ChipIcon />
          <h5 className="text-[14px] xl:text-[16px] font-[800]">
            AQ Generator
          </h5>
        </section>
        <div className="p-4">
          <section className="mb-3 text-[14px] xl:text-[16px] font-[700] ">
            Specification
          </section>
          <section className="grid grid-cols-12 gap-4 items-start">
            <div className=" col-span-12 2xl:col-span-6">
              {specificationList.map((specs, i) => (
                <div key={i}>
                  <SpecificationList type="Device Name" status={specs.name} />
                  <SpecificationList
                    type="System Voltage"
                    status={specs.voltage}
                  />
                  <SpecificationList
                    type="Battery Alternator"
                    status={specs.alternator}
                  />
                  <SpecificationList
                    type="Cylinder No"
                    status={specs.cylinder}
                  />
                  <SpecificationList type="Type" status={specs.type} />
                  <SpecificationList
                    type="Intake Air Method"
                    status={specs.air}
                  />
                </div>
              ))}
            </div>
            <div className=" col-span-12 2xl:col-span-6  ml-0 2xl:ml-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {deviceStatus.map((item, i) => (
                  <StatusCard
                    key={i}
                    status={item.status}
                    type={item.type}
                    icon={icons[i % icons.length]}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-12 xl:col-span-8">
          <section className="bg-white p-4 rounded-[16px]">
            <Tabs />
          </section>
        </div>
        <div className="col-span-12 xl:col-span-4">
          <section className="bg-white p-4 rounded-[16px] h-full">
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
              <h2 className="  text-[#00000090] my-3 text-sm xl:text-lg">
                No Alert Found!
              </h2>
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
                      <Alert
                        key={i}
                        type={alert.type}
                        message={alert.message}
                      />
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

export default Devices;
