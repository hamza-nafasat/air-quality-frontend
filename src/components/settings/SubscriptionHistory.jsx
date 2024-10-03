import { useState } from "react";
import Aside from "./Aside";
import DataTable from "react-data-table-component";

import { AiOutlineDownload } from "react-icons/ai";
import { subscriptionHistoryData } from "../../data/data";

const SubscriptionHistory = () => {
  const [activeButton, setActiveButton] = useState("profile");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const columns = [
    {
      name: "Date",
      selector: (row) => row.date,
    },
    {
      name: "Plan",
      selector: (row) => row.plan,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
    },
    {
      name: "Status",
      cell: (row) =>
        row.status === "active" ? (
          <div className="bg-[#B2FFB0] rounded-[6px] text-sm w-[90px] h-8 grid place-items-center capitalize">
            {row.status}
          </div>
        ) : row.status === "expired" ? (
          <div className="bg-[#D3D3D3] rounded-[6px] text-sm w-[90px] h-8 grid place-items-center  capitalize">
            {row.status}
          </div>
        ) : (
          <div className="bg-[#FF7A7F] rounded-[6px] text-sm w-[90px] h-8 grid place-items-center capitalize">
            {row.status}
          </div>
        ),
    },
    {
      name: "Invoice",
      selector: () => (
        <div className="cursor-pointer">
          <AiOutlineDownload fontSize={22} fontWeight={700} />
        </div>
      ),
    },
  ];

  return (
    <div className="parentContainer min-h-screen">
      <div className="piechart p-4 md:p-5">
        <div className="grid grid-cols-12 xl:grid-cols-12 gap-5">
          {/* Sidebar */}

          <div className="col-span-12 lg:col-span-2">
            <Aside
              activeButton={activeButton}
              handleButtonClick={handleButtonClick}
            />
          </div>
          <div className="col-span-12 xl:col-span-10 2xl:col-span-10">
            <h3 className="text-base lg:text-lg font-[500] mb-4 xl:mb-0">
              Subscription Plan
            </h3>

            <div className="bg-white rounded-[15px] mt-4 p-4 lg:p-6 h-[calc(100vh-80px)] overflow-hidden">
              <div className="flex items-center justify-between">
                <div>
                  <h3>Subscription History</h3>
                </div>
              </div>
              <div className="mt-5">
                <DataTable
                  columns={columns}
                  data={subscriptionHistoryData}
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
