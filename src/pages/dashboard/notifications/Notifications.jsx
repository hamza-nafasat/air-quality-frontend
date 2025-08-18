import React from 'react';
import {
  useGetAllNotificationsQuery,
  useGetNotificationsByUserQuery,
  useUpdateNotificationMutation,
  useDeleteNotificationMutation,
} from '../../../redux/apis/notificationApis';
import { IoCheckmarkDone } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';

import { useState, useMemo } from 'react';
import Button from '../../../components/shared/small/Button';

const severityOrder = { high: 1, low: 2 };

const Notifications = ({ userId = null }) => {
  // Fetch notifications
  const { data: response, isLoading } = userId
    ? useGetNotificationsByUserQuery(userId)
    : useGetAllNotificationsQuery();

  // Extract array safely
  const notifications = response?.data || [];

  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Sort by severity and paginate
  const sortedAndPaginated = useMemo(() => {
    const sorted = [...notifications].sort(
      (a, b) => severityOrder[a.severity] - severityOrder[b.severity]
    );
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return sorted.slice(start, end);
  }, [notifications, page]);

  const [updateNotification] = useUpdateNotificationMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

  if (isLoading) return <div>Loading notifications...</div>;

  return (
    <div>
      {sortedAndPaginated.map((n) => (
        <div
          key={n._id}
          className={`flex items-center justify-between m-2 p-2 border ${
            n.severity === 'high' ? 'bg-[#ffd6d6]' : 'bg-[#f0f0f0]'
          }`}
        >
          <div>
            <strong>{n.severity.toUpperCase()}:</strong> {n.message}
          </div>
          <div className="flex gap-2">
            <div>
              {/* {!n.isRead && ( */}

              <IoCheckmarkDone
                className={`text-xl cursor-pointer ${n.isRead ? 'text-blue-500' : 'text-gray-600'}`}
                onClick={() => updateNotification({ id: n._id, data: { isRead: true } })}
              />

              {/* )} */}
            </div>
            <div>
              {/* <Button
                bg={'bg-red-900'} */}
              <MdDelete
                className="text-xl  text-red-400 cursor-pointer"
                onClick={() => deleteNotification(n._id)}
              />
              {/* onClick={() => deleteNotification(n._id)} */}
              {/* /> */}
            </div>
          </div>
        </div>
      ))}

      <div className="flex items-center justify-end gap-4 w-full">
        <div>
          <Button text={'Prev'} onClick={() => setPage((p) => Math.max(p - 1, 1))} />
        </div>
        <span> Page {page} </span>
        <div>
          <Button
            text={'Next'}
            onClick={() => setPage((p) => (p * pageSize < notifications.length ? p + 1 : p))}
          />
        </div>
      </div>
    </div>
  );
};

export default Notifications;
