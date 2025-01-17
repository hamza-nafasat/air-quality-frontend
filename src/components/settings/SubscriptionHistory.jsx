import { useState } from "react";
import Aside from "./Aside";
import DataTable from "react-data-table-component";

import { AiOutlineDownload } from "react-icons/ai";
import { subscriptionHistoryData } from "../../data/data";
import { useGetAllSubscriptionsQuery } from "../../redux/apis/subscriptionApis";

const SubscriptionHistory = () => {
  const { data, isLoading, refetch } = useGetAllSubscriptionsQuery();

  const [activeButton, setActiveButton] = useState("profile");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.user.firstName + " " + row.user.lastName,
    },
    {
      name: "Plan",
      selector: (row) => row?.plan,
    },
    {
      name: "Status",
      cell: (row) =>
        row.subscriptionStatus === "active" || row.subscriptionStatus === "trialing" ? (
          <div className="bg-[#B2FFB0] rounded-[6px] text-sm w-[90px] h-8 grid place-items-center capitalize">
            {row.subscriptionStatus}
          </div>
        ) : row.subscriptionStatus === "expired" ? (
          <div className="bg-[#D3D3D3] rounded-[6px] text-sm w-[90px] h-8 grid place-items-center  capitalize">
            {row.subscriptionStatus}
          </div>
        ) : (
          <div className="bg-[#FF7A7F] rounded-[6px] text-sm w-[90px] h-8 grid place-items-center capitalize">
            {row.subscriptionStatus}
          </div>
        ),
    },
    {
      name: "Last Updated",
      selector: (row) =>
        row?.updatedAt?.split("T")[0]?.split("-")[1] +
        "/" +
        row?.updatedAt?.split("T")[0]?.split("-")[2] +
        "/" +
        row?.updatedAt?.split("T")[0]?.split("-")[0],
    },
    {
      name: "CreatedAt",
      selector: (row) =>
        row?.createdAt?.split("T")[0]?.split("-")[1] +
        "/" +
        row?.createdAt?.split("T")[0]?.split("-")[2] +
        "/" +
        row?.createdAt?.split("T")[0]?.split("-")[0],
    },
  ];

  return (
    <div className="parentContainer min-h-screen">
      <div className="piechart p-4 md:p-5">
        <div className="grid grid-cols-12 xl:grid-cols-12 gap-5">
          {/* Sidebar */}

          <div className="col-span-12 lg:col-span-2">
            <Aside activeButton={activeButton} handleButtonClick={handleButtonClick} />
          </div>
          <div className="col-span-12 xl:col-span-10 2xl:col-span-10">
            <h3 className="text-base lg:text-lg font-[500] mb-4 xl:mb-0">Subscription Plan</h3>

            <div className="bg-white rounded-[15px] mt-4 p-4 lg:p-6 h-[calc(100vh-80px)] overflow-hidden">
              <div className="flex items-center justify-between">
                <div>
                  <h3>Subscription History</h3>
                </div>
              </div>
              <div className="mt-5">
                <DataTable
                  columns={columns}
                  data={data?.data}
                  selectableRows
                  selectableRowsHighlight
                  customStyles={tableStyles}
                  fixedHeader
                  fixedHeaderScrollHeight="70vh"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionHistory;

const tableStyles = {
  headCells: {
    style: {
      fontSize: "16px",
      fontWeight: 600,
      color: "rgba(17, 17, 17, 1)",
    },
  },
  rows: {
    style: {
      background: "rgba(123, 192, 247, 0.15)",
      borderRadius: "6px",
      padding: "14px 0",
      margin: "10px 0",
      borderBottomWidth: "0 !important",
    },
  },
  cells: {
    style: {
      color: "rgba(17, 17, 17, 1)",
      fontSize: "14px",
    },
  },
};
