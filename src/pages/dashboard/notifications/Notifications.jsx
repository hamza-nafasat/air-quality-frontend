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

const severityOrder = { high: 1, low: 2 };

const Notifications = () => {
  const { user } = useSelector((state) => state.auth);
  const userID = user?._id;

  const { data: response, isLoading } = userID
    ? useGetNotificationsByUserQuery(userID)
    : useGetAllNotificationsQuery();

  const notifications = response?.data || [];

  const [updateNotification] = useUpdateNotificationMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

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
        cell: (row) => (
          <span
            className={`px-2 py-1 rounded text-white ${
              row.severity === 'high' ? 'bg-red-500' : 'bg-green-500'
            }`}
          >
            {row.severity.toUpperCase()}
          </span>
        ),
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
            <IoCheckmarkDone
              className={`text-xl cursor-pointer ${row.isRead ? 'text-blue-500' : 'text-gray-600'}`}
              onClick={() => handleUpdate(row._id)}
            />
            <MdDelete
              className="text-xl text-red-400 cursor-pointer"
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
        // fixedHeaderScrollHeight="400px"
        noDataComponent="No notifications found"
      />
    </div>
  );
};

export default Notifications;
