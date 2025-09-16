import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { FiMoreVertical } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  useGetUsersByCreatorQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from '../../redux/apis/authApis';
import TextField from '../../components/shared/small/TextField';
import Dropdown from '../../components/shared/small/Dropdown';
import { FaRegEyeSlash } from 'react-icons/fa';
import { IoEyeOutline } from 'react-icons/io5';
import Modal from '../../components/shared/large/modal/Modal';
import Button from '../../components/shared/small/Button';
import { confirmAlert } from 'react-confirm-alert';

function AllUsers() {
  const { data, isLoading } = useGetUsersByCreatorQuery();
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const { user } = useSelector((state) => state.auth);

  // modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // password toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      password: '',
      confirmPassword: '',
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
    setEditingUser(null);
  };

  const handleSubmit = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      return toast.error('All fields are required');
    }

    // Create User flow
    if (!editingUser) {
      if (formData.password.length < 6) {
        return toast.error('Password must be at least 6 characters');
      }
      if (formData.password !== formData.confirmPassword) {
        return toast.error('Passwords do not match');
      }

      try {
        const res = await createUser({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          role: formData.role || 'user',
          creatorId: user._id,
        }).unwrap();
        toast.success(res.message || 'User created successfully!');
        resetForm();
        setIsModalOpen(false);
      } catch (err) {
        toast.error(err?.data?.message || 'Something went wrong');
      }
    } else {
      // Update User flow
      try {
        const payload = {
          userId: editingUser._id,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          role: formData.role,
        };

        if (formData.password) {
          if (formData.password.length < 6) {
            return toast.error('Password must be at least 6 characters');
          }
          if (formData.password !== formData.confirmPassword) {
            return toast.error('Passwords do not match');
          }
          payload.password = formData.password;
        }

        const res = await updateUser(payload).unwrap();
        toast.success(res.message || 'User updated successfully!');
        resetForm();
        setIsModalOpen(false);
      } catch (err) {
        toast.error(err?.data?.message || 'Update failed');
      }
    }
  };

  // const handleDelete = async (id) => {
  //   if (!window.confirm('Are you sure you want to delete this user?')) return;
  //   try {
  //     await deleteUser(id).unwrap();
  //     toast.success('User deleted successfully');
  //   } catch (err) {
  //     toast.error(err?.data?.message || 'Delete failed');
  //   }
  // };

  const handleDelete = (id) => {
    confirmAlert({
      title: 'Delete Building',
      message: 'Are you sure, you want to delete this Manager?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            if (!id) return toast.error('Error while deleting Manager');
            try {
              const res = await await deleteUser(id).unwrap();
              if (res?.message) toast.success(res.message);
              // return Navigate('/dashboard/buildings');
            } catch (error) {
              console.log('Error in deleting Manager', error);
              toast.error(error?.data?.message || 'Error in delete Manager');
            }
          },
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const columns = [
    {
      name: 'Name',
      selector: (row) => `${row.firstName} ${row.lastName}`,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Role',
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              setEditingUser(row);
              setFormData({
                firstName: row.firstName,
                lastName: row.lastName,
                email: row.email,
                role: row.role,
                password: '',
                confirmPassword: '',
              });
              setIsModalOpen(true);
            }}
            className="px-2 py-1 bg-yellow-500 text-white rounded"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="px-2 py-1 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex w-full justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-bold">Managers</h2>
        </div>
        <div>
          <Button
            text={' Add User'}
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data?.users || []}
        progressPending={isLoading}
        pagination
        highlightOnHover
        striped
        responsive
      />

      {isModalOpen && (
        <Modal
          title={editingUser ? 'Edit User' : 'Add User'}
          onClose={() => {
            resetForm();
            setIsModalOpen(false);
          }}
          width="w-[400px] md:w-[600px]"
        >
          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="First Name"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
            />
            <TextField
              label="Last Name"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
            />
            <TextField
              label="Email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
            <Dropdown
              label="Role"
              options={[{ option: 'sub_admin' }]}
              defaultText={formData.role || 'Select Role'}
              onSelect={(opt) => handleChange('role', opt.option)}
              value={formData.role}
            />
            {/* Show password fields only for Add OR if editing user wants to change */}
            <TextField
              label="Password"
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              IconRight={
                <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
                  {showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
                </span>
              }
            />
            <TextField
              label="Confirm Password"
              placeholder="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              IconRight={
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="cursor-pointer"
                >
                  {showConfirmPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
                </span>
              }
            />
          </div>
          <div className="mt-4">
            <Button onClick={handleSubmit} text={editingUser ? 'Update User' : 'Create User'} />
          </div>
        </Modal>
      )}
    </div>
  );
}

export default AllUsers;

// export default AllUsers;
