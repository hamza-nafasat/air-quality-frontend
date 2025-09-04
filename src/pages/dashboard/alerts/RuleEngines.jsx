import { Fragment, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FaChevronUp, FaEdit } from 'react-icons/fa';
import Modal from '../../../components/shared/modal/Modal';
import { FaDeleteLeft } from 'react-icons/fa6';
import { ImArrowDown, ImArrowLeft, ImArrowUp } from 'react-icons/im';
import { MdAddBox, MdDelete } from 'react-icons/md';
import { RiEditBoxFill } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import { CgArrowTopRightO } from 'react-icons/cg';
import AddRuleEngine from './components/AddRuleEngine';
import EditRuleEngine from './components/EditRuleEngine';
// import { useGetAllBuildingsQuery } from '../../../redux/apis/buildingApis';
import { useGetAllSensorsQuery } from '../../../redux/apis/sensorApis';
import { useDeleteRuleMutation, useGetRulesQuery } from '../../../redux/apis/ruleEngineApi';
import { toast } from 'react-toastify';

const RuleEngines = () => {
  const [modalType, setModalType] = useState(null);
  const [selectedAlert, setSelectedAlert] = useState(null);
  // const { data, isLoading, isSuccess } = useGetAllBuildingsQuery('');
  const { data, isLoading } = useGetAllSensorsQuery();

  const { data: rule, isError } = useGetRulesQuery();
  const [deleteRule] = useDeleteRuleMutation('');
  // const response = await deleteRule(id).unwrap();
  const sensorList = data?.data?.map((sensor) => ({
    _id: sensor._id,
    name: sensor.name,
  }));
  // console.log('sensorList', data);

  const staticAlerts = [
    {
      _id: '1',
      name: 'Speed Alert',
      type: 'speed',
      severity: 'high',
      platform: 'email',
      status: 'enable',
    },
    {
      _id: '2',
      name: 'In-Fence Alert',
      type: 'infence',
      severity: 'medium',
      platform: 'platform',
      status: 'disable',
    },
    {
      _id: '3',
      name: 'Out-Fence Alert',
      type: 'outfence',
      severity: 'low',
      platform: 'email',
      status: 'enable',
    },
  ];
  const handleDelete = async (row) => {
    const ruleId = row._id;
    // console.log('ruleId', ruleId);

    try {
      const result = await deleteRule(ruleId).unwrap();
      // console.log('Deleted successfully:', result);
      toast.success('Rule deleted successfully');
    } catch (err) {
      console.error('Delete failed:', err);
      toast.error('Failed to delete rule');
    }
  };

  const handleOpenEditModal = (row) => {
    setSelectedAlert(row);
    setModalType('edit');
  };

  const handleOpenAddModal = () => setModalType('add');

  const handleCloseModal = () => {
    setModalType(null);
  };

  const columns = [
    {
      name: 'NAME',
      selector: (row) => row.name,
      cell: (row) => (
        <div className="flex items-center gap-2">
          <span className="text-blue-700 text-sm font-medium">{row.name.toUpperCase()}</span>
        </div>
      ),
    },
    {
      name: 'SEVERITY',
      selector: (row) => row.severity,
      cell: (row) => (
        <div
          className={`flex items-center gap-2 p-2 rounded-md w-[110px] justify-center ${
            row.severity === 'high'
              ? 'bg-red-100 text-red-500'
              : row.severity === 'medium'
              ? 'bg-orange-100 text-orange-500'
              : 'bg-green-100 text-green-500'
          }`}
        >
          {row.severity === 'high' ? (
            <ImArrowUp />
          ) : row.severity === 'medium' ? (
            <ImArrowLeft />
          ) : (
            <ImArrowDown />
          )}
          <span
            className={`text-sm font-semibold ${
              row.severity === 'high'
                ? 'text-red-500'
                : row.severity === 'medium'
                ? 'text-orange-500'
                : 'text-green-500'
            }`}
          >
            {row.severity.toUpperCase()}
          </span>
        </div>
      ),
    },
    {
      name: 'NOTIFICATION TYPE',
      selector: (row) => row.platform,
      cell: (row) => (
        <div className="flex items-center gap-2 text-black text-sm">
          <div
            className={`w-5 h-5 rounded-full border-2 ${
              row.platform === 'platform' ? 'border-orange-500' : 'border-blue-500'
            }`}
          ></div>
          {row.platform === 'platform' ? 'On Platform' : 'On Email'}
        </div>
      ),
    },

    {
      name: 'STATUS',
      selector: (row) => row.status,
      cell: (row) => (
        <div className="flex items-center gap-2">
          <span className="text-black text-sm">{row.status}</span>
          <input
            type="checkbox"
            readOnly
            checked={row.status === 'enable'}
            className="cursor-pointer"
          />
        </div>
      ),
    },
    {
      name: 'ALERTS',
      selector: (row) => row.alerts,
      cell: (row) => (
        <div className="flex items-center gap-1">
          <span className="text-black text-sm font-medium">
            {row.alerts.map((item) => item.type).join(', ')}
          </span>
        </div>
      ),
    },
    {
      name: 'ACTIONS',
      cell: (row) => (
        <div className="flex items-end gap-2">
          <FiEdit
            className="cursor-pointer"
            fontSize={18}
            onClick={() => handleOpenEditModal(row)}
          />
          <button className="bg-transparent border-none flex items-center justify-center cursor-pointer">
            <MdDelete onClick={() => handleDelete(row)} className="text-red-500 text-xl" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <Fragment>
      <div className="w-full bg-white rounded-t-2xl mt-[-3.5rem] h-full overflow-hidden">
        <div className="p-4 flex justify-end gap-4">
          <div className="cursor-pointer" onClick={handleOpenAddModal}>
            <MdAddBox fontSize={30} color="#03A5E0" />
          </div>
        </div>
        {rule?.data?.length > 0 ? (
          <DataTable
            columns={columns}
            data={rule?.data}
            pagination
            customStyles={{
              rows: {
                style: {
                  minHeight: '50px',
                },
              },
              headCells: {
                style: {
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#111',
                },
              },
              cells: {
                style: {
                  fontSize: '14px',
                  color: '#555',
                },
              },
            }}
          />
        ) : (
          'No Data Component'
        )}
      </div>
      {modalType === 'edit' && (
        <Modal title="Edit Rule Engine" onClose={handleCloseModal}>
          <EditRuleEngine
            isLoading={isLoading}
            onClose={handleCloseModal}
            data={sensorList}
            editData={selectedAlert}
          />
        </Modal>
      )}
      {modalType === 'add' && (
        <Modal title="Add Rule Engine" onClose={handleCloseModal}>
          <AddRuleEngine isLoading={isLoading} onClose={handleCloseModal} data={sensorList} />
        </Modal>
      )}
    </Fragment>
  );
};

export default RuleEngines;
