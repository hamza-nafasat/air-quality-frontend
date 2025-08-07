// import React, { useState } from 'react';
// import { confirmAlert } from 'react-confirm-alert';
// import DataTable from 'react-data-table-component';
// import BluePen from '../../../../assets/svgs/dashboard/BluePen';
// import GreenEye from '../../../../assets/svgs/dashboard/GreenEye';
// import RedBin from '../../../../assets/svgs/dashboard/RedBin';
// import ToggleButton from '../../../shared/small/ToggleButton';
// import { useNavigate } from 'react-router-dom';

// const columns = (sensorStatus, statusToggleHandler, navigate) => [
//   { name: 'Sensor Name', selector: (row) => row.name },
//   { name: 'Parameters', selector: (row) => row.parameters?.join(', ') },
//   { name: 'Connected', selector: (row) => (row.isConnected ? 'Yes' : 'No') },
//   {
//     name: 'Status',
//     selector: (row) => (

//       <div>{sensorStatus}</div>
//     ),
//   },
//   {
//     name: 'View',
//     selector: (row) => (
//       <div className="cursor-pointer" onClick={() => navigate(`sensor-detail/${row._id}`)}>
//         <div className="cursor-pointer">
//           <GreenEye />
//         </div>
//       </div>
//     ),
//   },
// ];

// const SensorDetails = ({ data }) => {
//   const [modal, setModal] = useState(false);
//   const [sensorStatus, setSensorStatus] = useState({});
//   const navigate = useNavigate();
//   const modalOpenHandler = (modalType) => setModal(modalType);
//   const modalCloseHandler = () => setModal(false);
//   console.log('data', data);

//   const statusToggleHandler = (sensorId) => {
//     setSensorStatus((prevState) => ({
//       ...prevState,
//       [sensorId]: !prevState[sensorId],
//     }));
//   };

//   const deleteHandler = () => {
//     confirmAlert({
//       title: 'Delete Sensor',
//       message: 'Are you sure, you want to delete the sensor?',
//       buttons: [
//         {
//           label: 'Yes',
//           onClick: () => {
//             console.log('project deleted');
//           },
//         },
//         {
//           label: 'No',
//         },
//       ],
//     });
//   };
//   return (
//     <div className="bg-white rounded-[15px] shadow-dashboard">
//       <div className="flex items-center justify-between">
//         <div className="p-5">Sensors Details</div>
//       </div>
//       <div className="mt-5 h-[300px] overflow-auto custom-scrollbar">
//         <DataTable
//           columns={columns(navigate, sensorStatus)}
//           data={data}
//           selectableRows
//           selectableRowsHighlight
//           customStyles={tableStyles}
//           fixedHeader
//           fixedHeaderScrollHeight="280px"
//         />
//       </div>
//     </div>
//   );
// };

// export default SensorDetails;

// const tableStyles = {
//   headCells: {
//     style: {
//       fontSize: '16px',
//       fontWeight: 600,
//       color: 'rgba(17, 17, 17, 1)',
//     },
//   },
//   rows: {
//     style: {
//       borderRadius: '6px',
//       padding: '0 0',
//     },
//   },
//   cells: {
//     style: {
//       color: 'rgba(17, 17, 17, 1)',
//       fontSize: '14px',
//     },
//   },
// };

import React, { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import DataTable from 'react-data-table-component';
import BluePen from '../../../../assets/svgs/dashboard/BluePen';
import GreenEye from '../../../../assets/svgs/dashboard/GreenEye';
import RedBin from '../../../../assets/svgs/dashboard/RedBin';
import ToggleButton from '../../../shared/small/ToggleButton';
import { useNavigate } from 'react-router-dom';

/* ------------------------------------------------------------------ */
/* 1. Columns helper                                                   */
/* ------------------------------------------------------------------ */
const buildColumns = (navigate) => [
  {
    name: 'Sensor Name',
    selector: (row) => row.name,
  },
  {
    name: 'Parameters',
    selector: (row) => row.parameters?.join(', '),
  },
  {
    name: 'Connected',
    selector: (row) => (row.isConnected ? 'Yes' : 'No'),
  },
  {
    /* Status column now shows a toggle that reflects & updates state   */
    name: 'Status',
    cell: (row) => <div>{row.status ? ` Active` : 'Inactive'}</div>,
    ignoreRowClick: true,
    // allowOverflow: true,
  },
  {
    name: 'View',
    cell: (row) => (
      <div
        className="cursor-pointer"
        onClick={() => navigate(`/dashboard/sensors/sensor-detail/${row._id}`)}
      >
        <GreenEye />
      </div>
    ),
    // ignoreRowClick: true,
    // allowOverflow: true,
  },
];

/* ------------------------------------------------------------------ */
/* 2. Main component                                                   */
/* ------------------------------------------------------------------ */
const SensorDetails = ({ data }) => {
  const [modal, setModal] = useState(false);
  // console.log('datadatadatadata', data);

  const [sensorStatus, setSensorStatus] = useState({}); // { sensorId: boolean }
  const navigate = useNavigate();

  /* — modal helpers (still unused in this snippet) — */

  /* — delete confirm — */

  return (
    <div className="bg-white rounded-[15px] shadow-dashboard">
      <div className="flex items-center justify-between">
        <div className="p-5">Sensors Details</div>
      </div>

      <div className="mt-5 r">
        <DataTable
          columns={buildColumns(navigate)}
          data={data}
          // selectableRows
          selectableRowsHighlight
          customStyles={tableStyles}
          fixedHeader
          fixedHeaderScrollHeight="450px"
        />
      </div>
    </div>
  );
};

export default SensorDetails;

/* ------------------------------------------------------------------ */
/* 3. Table styling (unchanged)                                        */
/* ------------------------------------------------------------------ */
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
      borderRadius: '6px',
      padding: '0 0',
    },
  },
  cells: {
    style: {
      color: 'rgba(17, 17, 17, 1)',
      fontSize: '14px',
    },
  },
};
