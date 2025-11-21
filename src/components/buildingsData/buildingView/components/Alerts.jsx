import React from 'react';
import Alert from '../../../shared/large/alert/Alert';

const Alerts = ({ buildingNotifications }) => {
  return (
    <div className="bg-white  rounded-[16px] h-full  shadow-dashboard">
      <h5 className="p-5">Alerts</h5>
      <div className="h-[400px] overflow-y-auto pr-4">
        <div className="p-5">
          {buildingNotifications && buildingNotifications.length > 0 ? (
            buildingNotifications.map((notification) => (
              <Alert
                type={notification.type}
                message={notification.message}
                padding="py-0"
                severity={notification.severity}
              />
            ))
          ) : (
            <p>No notifications found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alerts;
