import React from "react";
import greyBuilding from "../../../../assets/images/buildings/greyBuilding.png";
import LocationIcon from "../../../../assets/svgs/pages/LocationIcon";

const listStatuses = [
  {
    type: "success",
    message: "Temperature value reached above the threashold limit at Zone 3",
    time: "12:00 Pm , 3 July 2024",
  },
  {
    type: "warning",
    message: "Temperature value reached above the threashold limit at Zone 3",
    time: "12:00 Pm , 3 July 2024",
  },
];

const FloorDetails = ({floorDetails}) => {
  return (
    <div className="py-4 px-5 bg-white rounded-[16px]  shadow-dashboard h-full">
      <h5 className="mb-2">Building Details</h5>
      <section className="max-w-90 xl:w-90   overflow-hidden mx-auto xl:mx-0">
        <img
          src={floorDetails?.buildingImg}
          alt="Description"
          className="max-w-full max-h-full object-contain rounded-lg"
        />
      </section>

      <section className="mt-2">
        <h1 className="text-[16px] font-[600] text-[#060606CC] ">{floorDetails?.name}</h1>
      </section>

      <section>
        <div className="flex justify-between mt-1">
          <h3 className="text-[12px] text-[#060606CC] font-[400]">Type</h3>
          <h3 className="text-[12px] text-[#060606CC] font-[400] capitalize">
            {floorDetails?.type}
          </h3>
        </div>
        <div className="flex justify-between mt-1">
          <h3 className="text-[12px] text-[#060606CC] font-[400]">Rooms</h3>
          <h3 className="text-[12px] text-[#060606CC] font-[400]">{floorDetails?.rooms}</h3>
        </div>
        <div className="flex justify-between mt-1">
          <h3 className="text-[12px] text-[#060606CC] font-[400]">
            Total Sensors
          </h3>
          <h3 className="text-[12px] text-[#060606CC] font-[400]">{floorDetails?.sensors}</h3>
        </div>
      </section>

      <section className="mt-4 flex flex-col gap-1">
        {listStatuses.map((item, i) => (
          <div
            key={i}
            className={`rounded-[10px] py-4 px-3 ${
              item.type === "success" ? "bg-[#D6FFD6]" : "bg-[#FFD6D6]"
            }`}
          >
            <h6 className="text-xs">{item.message}</h6>
            <h6 className="text-[#00000080] text-[10px] flex justify-end">
              {item.time}
            </h6>
          </div>
        ))}

        {/* <div className="bg-[#FFD6D6] rounded-[10px] py-4 px-3">
          <h6 className="text-xs">
            Temperature value reached above the threashold limit at Zone 3
          </h6>
          <h6 className="text-[#00000080] text-[10px] flex justify-end">
            12:00 Pm , 3 July 2024
          </h6>
        </div> */}
      </section>
    </div>
  );
};

export default FloorDetails;
