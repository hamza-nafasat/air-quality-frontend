import React from "react";
import Alert from "../../../shared/large/alert/Alert";

const Alerts = () => {
  return (
    <div className="bg-white  rounded-[16px] h-full  shadow-dashboard">
      <h5 className="p-5">Alerts</h5>
      <div className="h-[480px] overflow-y-auto pr-4">
        <div className="p-5">
          <Alert type="Notification" message="hello" padding="py-0" />
          <Alert type="warning" message="This is warning" padding="py-0" />
          <Alert type="Notification" message="hello" padding="py-0" />
          <Alert type="Notification" message="hello" padding="py-0" />
          <Alert type="Notification" message="hello" padding="py-0" />
          <Alert type="Notification" message="hello" padding="py-0" />
          <Alert type="warning" message="This is warning" padding="py-0" />
          <Alert type="Notification" message="hello" padding="py-0" />
          <Alert type="Notification" message="hello" padding="py-0" />
          <Alert type="Notification" message="hello" padding="py-0" />
          <Alert type="Notification" message="hello" padding="py-0" />
          <Alert type="warning" message="This is warning" padding="py-0" />
          <Alert type="Notification" message="hello" padding="py-0" />
          <Alert type="Notification" message="hello" padding="py-0" />
          <Alert type="Notification" message="hello" padding="py-0" />
          <Alert type="Notification" message="hello" padding="py-0" />
          <Alert type="warning" message="This is warning" padding="py-0" />
          <Alert type="Notification" message="hello" padding="py-0" />
          <Alert type="Notification" message="hello" padding="py-0" />
          <Alert type="Notification" message="hello" padding="py-0" />
          <Alert type="Notification" message="hello" padding="py-0" />
          <Alert type="warning" message="This is warning" padding="py-0" />
          <Alert type="Notification" message="hello" padding="py-0" />
          <Alert type="Notification" message="hello" padding="py-0" />
          <Alert type="Notification" message="hello" padding="py-0" />
        </div>
      </div>
    </div>
  );
};

export default Alerts;
