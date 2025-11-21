import React from 'react';
import AlertIcon from '../../../../assets/svgs/alert/AlertIcon';
import ClockIcon from './ClockIcon';

// Map severity/type to color
const severityColors = {
  low: '#32CD32', // Green
  medium: '#FFA500', // Orange
  high: '#FF0000', // Red
};

const Alert = ({ type = 'Notification', message, severity = 'medium', padding }) => {
  // Choose color based on severity
  const color = severityColors[severity.toLowerCase()] || '#32CD32';

  return (
    <div className={padding ? padding : 'py-5'}>
      <div className="flex gap-3 items-center">
        <AlertIcon color={color} />
        <p className="text-[#5C5B5B]">
          <span className="font-[500]" style={{ color: color }}>
            {type} ({severity}):
            <br />
          </span>
          {message}
        </p>
      </div>

      <div className="text-[#5C5B5B] mb-2 flex gap-2 items-center justify-end">
        <ClockIcon />
        <h5 className="text-sm xl:text-base">July 30 09:00 AM</h5>
      </div>

      <hr />
    </div>
  );
};

export default Alert;
