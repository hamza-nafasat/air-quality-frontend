import { useState } from 'react';
import Aside from './Aside';
import DataTable from 'react-data-table-component';

import { AiOutlineDownload } from 'react-icons/ai';
import { subscriptionHistoryData } from '../../data/data';
import {
  useGetAllSubscriptionsQuery,
  useGetUserSubscriptionHistoryQuery,
} from '../../redux/apis/subscriptionApis';
import { useSelector } from 'react-redux';

const SubscriptionHistory = () => {
  const { user } = useSelector((state) => state.auth);
  let owner;

  if (user?.creatorId && user?.role === 'Subscription_Manager') {
    // If user was created by someone else → use that creator as owner
    owner = user.creatorId;
  } else {
    // Otherwise → user is the owner
    owner = user._id;
  }
  console.log('owner', owner);
  // const { data, isLoading, refetch } = useGetAllSubscriptionsQuery();
  const { data } = useGetUserSubscriptionHistoryQuery(owner);
  // console.log('newsdsd', newsdsd);

  const [activeButton, setActiveButton] = useState('profile');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const columns = [
    {
      name: 'User ID',
      selector: (row) => row?.user,
    },
    {
      name: 'Plan',
      selector: (row) => row?.plan,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div
          className={`rounded-[6px] text-sm w-[90px] h-8 grid place-items-center capitalize
          ${
            row.action === 'created'
              ? 'bg-[#B2FFB0]'
              : row.action === 'updated'
              ? 'bg-[#FFD580]'
              : row.action === 'canceled'
              ? 'bg-[#FF7A7F]'
              : row.action === 'deleted'
              ? 'bg-[#D3D3D3]'
              : 'bg-gray-200'
          }`}
        >
          {row.action}
        </div>
      ),
      sortable: true,
    },
    {
      name: 'Created At',
      selector: (row) => {
        if (!row?.createdAt) return '';
        const date = new Date(row.createdAt);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      },
      sortable: true,
    },
    {
      name: 'Stripe Customer',
      selector: (row) => row?.stripeCustomerId,
    },
    {
      name: 'Stripe Subscription',
      selector: (row) => row?.stripeSubscriptionId,
    },
  ];

  return (
    <div className="parentContainer ">
      <div className="piechart p-4 md:p-5">
        <div className="grid grid-cols-12 xl:grid-cols-12 gap-5">
          {/* Sidebar */}

          <div className="col-span-12 lg:col-span-2">
            <Aside activeButton={activeButton} handleButtonClick={handleButtonClick} />
          </div>
          <div className="col-span-12 xl:col-span-10 2xl:col-span-10">
            <h3 className="text-base lg:text-lg font-[500] mb-4 xl:mb-0">Subscription Plan</h3>

            <div className="bg-white rounded-[15px] mt-4 p-4 lg:p-6  ">
              <div className="flex items-center justify-between">
                <div>
                  <h3>Subscription History</h3>
                </div>
              </div>
              <div className="mt-5">
                <DataTable
                  columns={columns}
                  data={data?.data}
                  // selectableRows
                  // selectableRowsHighlight
                  customStyles={tableStyles}
                  fixedHeader
                  fixedHeaderScrollHeight="55vh"
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
      fontSize: '16px',
      fontWeight: 600,
      color: 'rgba(17, 17, 17, 1)',
    },
  },
  rows: {
    style: {
      background: 'rgba(123, 192, 247, 0.15)',
      borderRadius: '6px',
      padding: '14px 0',
      margin: '10px 0',
      borderBottomWidth: '0 !important',
    },
  },
  cells: {
    style: {
      color: 'rgba(17, 17, 17, 1)',
      fontSize: '14px',
    },
  },
};
