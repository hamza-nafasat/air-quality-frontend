import React, { useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { IoCheckmarkDone } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import {
  useGetAllNotificationsQuery,
  useGetNotificationsByUserQuery,
  useUpdateNotificationMutation,
  useDeleteNotificationMutation,
} from '../../../redux/apis/notificationApis';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { MdOutlineVisibility } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const severityOrder = { high: 1, medium: 2, low: 3 };
const Notifications = () => {
  const { user } = useSelector((state) => state.auth);
  const userID = user?._id;

  const { data: response, isLoading } = useGetNotificationsByUserQuery(userID);

  const notifications = response?.data || [];

  const [updateNotification] = useUpdateNotificationMutation();
  const [deleteNotification] = useDeleteNotificationMutation();
  const navigate = useNavigate();
  function splitByDictionary(str) {
    const dictionary = ['RULE', 'ENGINE', 'ALERT', 'MAIN']; // add more words here
    let result = str;

    dictionary.forEach((word) => {
      result = result.replace(new RegExp(word, 'g'), ' ' + word + ' ');
    });

    // Clean extra spaces
    return result.trim().replace(/\s+/g, ' ');
  }
  // 👉 Columns definition for DataTable
  const columns = useMemo(
    () => [
      {
        name: 'Type',
        selector: (row) => row.type,
        sortable: true,
        width: '150px',
      },
      {
        name: 'Severity',
        selector: (row) => row.severity,
        sortable: true,
        width: '120px',
        cell: (row) => {
          const severityColors = {
            high: 'bg-red-500',
            medium: 'bg-yellow-500',
            low: 'bg-green-500',
          };

          return (
            <span
              className={`px-2 py-1 rounded text-white ${
                severityColors[row.severity] || 'bg-gray-400'
              }`}
            >
              {row.severity.toUpperCase()}
            </span>
          );
        },
      },
      {
        name: 'Origin',
        selector: (row) => row.severity,
        sortable: true,
        width: '180px',
        cell: (row) => <span className={`px-2 py-1 `}>{row.alert_source.toUpperCase()}</span>,
      },
      {
        name: 'Message',
        selector: (row) => row.message,
        sortable: true,
        grow: 2, // take more space
      },
      {
        name: 'Sensor ID',
        selector: (row) => row.uniqueId,
        sortable: true,
        width: '150px',
      },
      {
        name: 'Actions',
        width: '120px',
        cell: (row) => (
          <div className="flex gap-2">
            {/* <MdOutlineVisibility
              className="text-xl text-gray-400 cursor-pointer hover:text-gray-600 hover:scale-110 transition duration-200"
              onClick={() => handleView(row.building)}
            /> */}
            <IoCheckmarkDone
              className={`text-xl cursor-pointer ${
                row.isRead
                  ? 'text-blue-500 hover:text-blue-700'
                  : 'text-gray-600 hover:text-gray-800'
              } hover:scale-110 transition duration-200`}
              onClick={() => handleUpdate(row._id)}
            />
            <MdDelete
              className="text-xl text-red-400 cursor-pointer hover:text-red-600 hover:scale-110 transition duration-200"
              onClick={() => handleDelete(row._id)}
            />
          </div>
        ),
      },
    ],
    []
  );

  const handleUpdate = async (id) => {
    try {
      await updateNotification({
        id,
        data: {
          isRead: true,
          readAt: new Date().toISOString(),
        },
      });
      toast.success('Notification marked as read!');
    } catch (error) {
      toast.error('Failed to update notification.');
    }
  };
  const handleView = async (id) => {
    return navigate(`/dashboard/building-view/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);
      toast.success('Notification deleted!');
    } catch (error) {
      toast.error('Failed to delete notification.');
    }
  };

  if (isLoading) return <div>Loading notifications...</div>;

  return (
    <div className="p-4">
      <DataTable
        title="Notifications"
        columns={columns}
        data={[...notifications].sort(
          (a, b) => severityOrder[a.severity] - severityOrder[b.severity]
        )}
        pagination
        highlightOnHover
        pointerOnHover
        fixedHeader
        noDataComponent="No notifications found"
      />
    </div>
  );
};

export default Notifications;
