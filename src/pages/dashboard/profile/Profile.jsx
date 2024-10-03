import React, { useState } from "react";
// import Title from "../../../components/shared/title/Title";

import profileImg from "../../../assets/images/header/profilepic.png";
import { IoCamera } from "react-icons/io5";
import TextField from "../../../components/shared/small/TextField";
import Button from "../../../components/shared/small/Button";
import Dropdown from "../../../components/shared/small/Dropdown";
import { country } from "../../../data/data";
import Modal from "../../../components/shared/large/modal/Modal";

const Profile = () => {
  const [imgSrc, setImgSrc] = useState(null);

  const [editModal, setEditModal] = useState(false);

  const handleOpenModal = (e) => {
    e.preventDefault();

    setEditModal(true);
  };

  return (
    <div className=" bg-white rounded-[15px] p-4 lg:p-8 mt-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-4 mx-auto items-center">
        <div className="flex lg:flex-row flex-col items-center gap-5 ">
          <img
            src={imgSrc || profileImg}
            alt=""
            className="w-[150px] lg:w-[250px] h-[150px] lg:h-[250px] object-cover rounded-full mb-4"
          />

          {/* -----------------------------------------------------------------------Dont remove this commented code */}

          {/* <div className="flex justify-end">
            <ChangePhoto onChange={uploadImgHandler} />
          </div> */}
          <div>
            <h1 className="text-base lg:text-lg">MKS</h1>
            <h1 className="text-sm lg:text-base">alexarawles@gmail.com</h1>
          </div>
        </div>
      </div>
      <form className="mt-4 md:mt-6">
        <div className="flex lg:flex-row flex-col gap-4 my-4">
          <TextField
            type="text"
            label="First Name"
            labelWeight="font-semibold"
            placeHolder="Your First Name"
          />
          <TextField
            type="text"
            label="Last Name"
            labelWeight="font-semibold"
            placeHolder="Your Last Name"
          />
        </div>
        <div className="flex lg:flex-row flex-col gap-4 my-4">
          <TextField
            type="text"
            label="Address"
            labelWeight="font-semibold"
            placeHolder="Your Address"
          />
          <TextField
            type="tel"
            label="Contact"
            labelWeight="font-semibold"
            placeHolder="Your Contact"
          />
        </div>
        <div className="flex lg:flex-row flex-col gap-4 my-4">
          <Dropdown
            label="Country"
            height="200px"
            overflow={"auto"}
            options={country}
          />
          <TextField
            type="text"
            label="State"
            labelWeight="font-semibold"
            placeHolder="Your State"
          />
        </div>

        {/* <div className="lg:col-span-8 flex justify-center sm:justify-end">
          <div className="flex items-center gap-4">
            <Button
              type="button"
              text="Cancel"
              color="#111111b3"
              bg="#76767640"
              width="w-[120px] sm:w-[150px]"
              height="h-[40px] sm:h-[60px]"
            />
            <Button
              text="Add"
              width="w-[120px] sm:w-[150px]"
              height="h-[40px] sm:h-[60px]"
            />
          </div>
        </div> */}
        <div className="flex justify-center lg:justify-end my-3 lg:my-0">
          <Button text="Edit" width="w-fit" onClick={handleOpenModal} />
        </div>
      </form>
      {editModal && (
        <Modal title="Edit Profile" onClose={() => setEditModal(false)}>
          <EditModalChild />
        </Modal>
      )}
    </div>
  );
};

export default Profile;

const DetailList = ({ title, value }) => {
  return (
    <div className="flex items-center gap-6 mt-2">
      <p className="text-sm md:text-base text-[#00000099] md:basis-[25%]">
        {title}
      </p>
      <p className="text-sm md:text-base text-[#000000] font-medium">{value}</p>
    </div>
  );
};

const ChangePhoto = ({ onChange }) => (
  <button
    type="button"
    className="relative cursor-pointer bg-[#03A5E0] text-white font-normal sm:font-medium py-3 w-[fit] px-5 rounded-xl flex items-center gap-1 justify-center text-sm sm:text-base"
  >
    Change
    <IoCamera fontSize={20} />
    <input
      type="file"
      onChange={onChange}
      className="absolute inset-0 z-50 cursor-pointer opacity-0"
    />
  </button>
);

const EditModalChild = () => {
  const [imgSrc, setImgSrc] = useState(null);
  const uploadImgHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImgSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <img
          src={imgSrc || profileImg}
          alt=""
          className="w-[150px]  h-[150px]  object-cover rounded-full mb-4"
        />

        <div>
          <ChangePhoto onChange={uploadImgHandler} />
        </div>
      </div>
      <form className="mt-4 md:mt-6">
        <div className="flex lg:flex-row flex-col gap-4 my-4">
          <TextField
            type="text"
            label="First Name"
            labelWeight="font-semibold"
            placeHolder="Your First Name"
          />
          <TextField
            type="text"
            label="Last Name"
            labelWeight="font-semibold"
            placeHolder="Your Last Name"
          />
        </div>
        <div className="flex lg:flex-row flex-col gap-4 my-4">
          <TextField
            type="text"
            label="Address"
            labelWeight="font-semibold"
            placeHolder="Your Address"
          />
          <TextField
            type="tel"
            label="Contact"
            labelWeight="font-semibold"
            placeHolder="Your Contact"
          />
        </div>
        <div className="flex lg:flex-row flex-col gap-4 my-4">
          <Dropdown
            label="Country"
            height="200px"
            overflow={"auto"}
            options={country}
          />
          <TextField
            type="text"
            label="State"
            labelWeight="font-semibold"
            placeHolder="Your State"
          />
        </div>
        <div className="flex justify-center lg:justify-end my-3 lg:my-0">
          <Button text="Update Profile" width="w-fit" />
        </div>

        {/* <div className="lg:col-span-8 flex justify-center sm:justify-end">
          <div className="flex items-center gap-4">
            <Button
              type="button"
              text="Cancel"
              color="#111111b3"
              bg="#76767640"
              width="w-[120px] sm:w-[150px]"
              height="h-[40px] sm:h-[60px]"
            />
            <Button
              text="Add"
              width="w-[120px] sm:w-[150px]"
              height="h-[40px] sm:h-[60px]"
            />
          </div>
        </div> */}
      </form>
    </>
  );
};
