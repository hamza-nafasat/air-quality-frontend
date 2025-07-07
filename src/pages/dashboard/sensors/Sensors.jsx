import DataTable from 'react-data-table-component';
import DeleteIcon from '../../../assets/svgs/sensors/DeleteIcon';
import AddIcon from '../../../assets/svgs/pages/AddIcon';
import Modal from '../../../components/shared/modal/Modal';
import { useEffect, useState } from 'react';
import EditIcon from '../../../assets/svgs/stepper/EditIcon';
import AddSensor from './AddSensor';
import EditSensor from './EditSensor';
import ToggleButton from '../../../components/shared/small/ToggleButton';
import { confirmAlert } from 'react-confirm-alert';
import { IoEyeOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import {
  useDeleteSensorMutation,
  useGetAllSensorsQuery,
  useUpdateSensorMutation,
} from '../../../redux/apis/sensorApis';
import { toast } from 'react-toastify';
import Loader from '../../../components/shared/small/Loader';

const columns = (modalOpenHandler, navigate, statusToggleHandler, deleteHandler) => [
  { name: 'Name', selector: (row) => row?.name },
  { name: 'Parameters', selector: (row) => row?.parameters?.join(', ') },
  { name: 'Is Connected', selector: (row) => (row?.isConnected ? 'Yes' : 'No') },
  {
    name: 'Status',
    selector: (row) => (
      <ToggleButton
        isChecked={row.status}
        onToggle={() => statusToggleHandler(row._id, row?.status)}
      />
    ),
  },
  {
    name: 'Action',
    selector: (row) => (
      <div className="flex items-center gap-2">
        <div className="cursor-pointer" onClick={() => navigate(`sensor-detail/${row._id}`)}>
          <IoEyeOutline fontSize={20} />
        </div>
        <div className="cursor-pointer" onClick={() => modalOpenHandler('edit', row)}>
          <EditIcon />
        </div>
        <div className="cursor-pointer" onClick={() => deleteHandler(row?._id)}>
          <DeleteIcon />
        </div>
      </div>
    ),
  },
];

const Sensors = () => {
  const { data, isLoading, isSuccess, refetch } = useGetAllSensorsQuery('');
  const [updateSensor] = useUpdateSensorMutation('');
  const [deleteSensor] = useDeleteSensorMutation('');
  const [modal, setModal] = useState(false);
  const [sensorsData, setSensorsData] = useState([]);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const navigate = useNavigate();

  const modalCloseHandler = () => setModal(false);
  const modalOpenHandler = (modalType, row) => {
    setModal(modalType);
    if (row) setSelectedSensor(row);
  };

  const statusToggleHandler = async (id, status) => {
    try {
      console.log(id, status);
      const response = await updateSensor({
        sensorId: id,
        data: { status: status ? 'false' : 'true' },
      }).unwrap();
      if (response?.success) {
        await refetch();
        toast.success(response?.message);
      }
    } catch (error) {
      console.log('Error while toggling sensor status', error);
      toast.error(error?.data?.message || 'Error while updating sensor status');
    }
  };

  const deleteHandler = (id) => {
    confirmAlert({
      title: 'Delete Sensor',
      message: 'Are you sure, you want to delete the sensor?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            if (!id) return toast.error('Error while deleting sensor');
            try {
              const response = await deleteSensor(id).unwrap();
              if (response?.success) {
                await refetch();
                toast.success(response?.message);
              }
            } catch (error) {
              console.log('Error while deleting sensor', error);
              toast.error(error?.data?.message || 'Error while deleting sensor');
            }
          },
        },
        {
          label: 'No',
        },
      ],
    });
  };

  useEffect(() => {
    if (isSuccess) {
      const sensors = data?.data;
      setSensorsData(sensors);
    }
  }, [data, isSuccess, refetch]);
  return isLoading ? (
    <Loader />
  ) : (
    <div className="bg-white rounded-[15px] p-4 lg:p-6 h-[calc(100vh-80px)] overflow-hidden">
      <div className="flex justify-end">
        <div className="flex items-center gap-2">
          <div className="cursor-pointer" onClick={() => modalOpenHandler('add')}>
            <AddIcon />
          </div>
          <div className="cursor-pointer">
            <DeleteIcon />
          </div>
        </div>
      </div>
      <div className="mt-5">
        <DataTable
          columns={columns(modalOpenHandler, navigate, statusToggleHandler, deleteHandler)}
          data={sensorsData}
          selectableRows
          selectableRowsHighlight
          customStyles={tableStyles}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="70vh"
        />
      </div>
      {modal === 'add' && (
        <Modal title="Add Sensor" width="w-[300px] md:w-[750px]" onClose={modalCloseHandler}>
          <AddSensor onClose={modalCloseHandler} />
        </Modal>
      )}
      {modal === 'edit' && (
        <Modal title="Edit Sensor" width="w-[300px] md:w-[650px]" onClose={modalCloseHandler}>
          <EditSensor selectedSensor={selectedSensor} onClose={modalCloseHandler} />
        </Modal>
      )}
    </div>
  );
};

export default Sensors;

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
