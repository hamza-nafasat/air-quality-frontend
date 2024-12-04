/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { IoCamera } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import profileImg from "../../../assets/images/header/profilepic.png";
import Button from "../../../components/shared/small/Button";
import Dropdown from "../../../components/shared/small/Dropdown";
import TextField from "../../../components/shared/small/TextField";
import { country } from "../../../data/data";
import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from "../../../redux/apis/authApis";
import { userExist, userNotExist } from "../../../redux/slices/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { data, isSuccess, isError, refetch } = useGetMyProfileQuery("");
  const { user } = useSelector((state) => state.auth);
  const [updateMyProfile, { isLoading }] = useUpdateMyProfileMutation();
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [editAble, setEditAble] = useState(false);
  const [form, setFrom] = useState({
    firstName: "",
    lastName: "",
    address: "",
    contact: "",
    country: "",
    image: "",
    state: "",
    email: "",
  });

  const uploadImgHandler = (e) => {
    const reader = new FileReader();
    setImage(e.target.files[0]);
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const editClickHandler = () => setEditAble(true);
  const saveClickHandler = async () => {
    console.log(form);
    const formData = new FormData();
    formData.append("firstName", form.firstName);
    formData.append("lastName", form.lastName);
    formData.append("address", form.address);
    formData.append("contact", form.contact);
    formData.append("country", form.country);
    if (image) formData.append("file", image);
    formData.append("state", form.state);
    try {
      const response = await updateMyProfile(formData).unwrap();
      if (response?.success) {
        toast.success("Profile Updated Successfully");
        await refetch();
      }
    } catch (error) {
      toast.error(error?.data?.message || "Error while updating profile");
      console.log(error);
    } finally {
      setEditAble(false);
    }
  };

  const cancelClickHandler = () => {
    setEditAble(false);
    setPreviewImage(null);
    setImage(null);
    setFrom({
      firstName: user?.firstName,
      lastName: user?.lastName,
      address: user?.address,
      contact: user?.contact,
      country: user?.country,
      image: user?.image?.url,
      state: user?.state,
      email: user?.email,
    });
  };

  useEffect(() => {
    setFrom({
      firstName: user?.firstName,
      lastName: user?.lastName,
      address: user?.address,
      contact: user?.contact,
      country: user?.country,
      image: user?.image?.url,
      state: user?.state,
      email: user?.email,
    });
  }, [user]);

  useEffect(() => {
    if (isSuccess) dispatch(userExist(data?.data));
    else if (isError) dispatch(userNotExist());
  }, [isSuccess, isError, dispatch, data]);

  return (
    <div className=" bg-white rounded-[15px] p-4 lg:p-8 mt-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-4 mx-auto items-center">
        <div className="flex lg:flex-row flex-col items-center gap-5 relative ">
          <img
            src={previewImage || form?.image || profileImg}
            alt=""
            className="w-[150px] lg:w-[250px] h-[150px] lg:h-[250px] object-cover rounded-full mb-4"
          />

          <div>
            <h1 className="text-base lg:text-lg">
              {form?.firstName} {form?.lastName}
            </h1>
            <h1 className="text-sm lg:text-base">{form?.email}</h1>
            {editAble && (
              <div className="flex justify-end w-full">
                <ChangePhoto onChange={uploadImgHandler} />
              </div>
            )}
          </div>
        </div>
      </div>
      <form className="mt-4 md:mt-6">
        <div className="flex lg:flex-row flex-col gap-4 my-4">
          <TextField
            type="text"
            readOnly={!editAble}
            label="First Name"
            labelWeight="font-semibold"
            placeHolder="Your First Name"
            value={form?.firstName}
            onChange={(e) => setFrom({ ...form, firstName: e.target.value })}
          />
          <TextField
            type="text"
            readOnly={!editAble}
            label="Last Name"
            labelWeight="font-semibold"
            placeHolder="Your Last Name"
            value={form?.lastName}
            onChange={(e) => setFrom({ ...form, lastName: e.target.value })}
          />
        </div>
        <div className="flex lg:flex-row flex-col gap-4 my-4">
          <TextField
            type="text"
            readOnly={!editAble}
            label="Address"
            labelWeight="font-semibold"
            placeHolder="Your Address"
            value={form?.address}
            onChange={(e) => setFrom({ ...form, address: e.target.value })}
          />
          <TextField
            type="tel"
            readOnly={!editAble}
            label="Contact"
            labelWeight="font-semibold"
            placeHolder="Your Contact"
            value={form?.contact}
            onChange={(e) => setFrom({ ...form, contact: e.target.value })}
          />
        </div>
        <div className="flex lg:flex-row flex-col gap-4 my-4">
          <Dropdown
            label={"Select Country"}
            defaultText={form?.country || "Select Country"}
            disabled={!editAble}
            height="200px"
            overflow={"auto"}
            options={country}
            onSelect={(value) => setFrom({ ...form, country: value?.option })}
          />
          <TextField
            type="text"
            label="State"
            readOnly={!editAble}
            labelWeight="font-semibold"
            placeHolder="Your State"
            value={form?.state}
            onChange={(e) => setFrom({ ...form, state: e.target.value })}
          />
        </div>

        <div className="flex justify-center lg:justify-end my-3 lg:my-0">
          {!editAble ? (
            <Button
              text="Edit"
              width="w-fit"
              type="button"
              onClick={editClickHandler}
            />
          ) : (
            <div className="flex gap-2">
              <Button
                disabled={isLoading}
                text="Save"
                width="w-fit"
                type="button"
                onClick={saveClickHandler}
              />
              <Button
                disabled={isLoading}
                text="Cancel"
                width="w-fit"
                type="button"
                onClick={cancelClickHandler}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;

// const DetailList = ({ title, value }) => {
//   return (
//     <div className="flex items-center gap-6 mt-2">
//       <p className="text-sm md:text-base text-[#00000099] md:basis-[25%]">{title}</p>
//       <p className="text-sm md:text-base text-[#000000] font-medium">{value}</p>
//     </div>
//   );
// };

const ChangePhoto = ({ onChange }) => (
  <button
    type="button"
    className="min-w-full relative cursor-pointer bg-[#03A5E0] text-white font-normal sm:font-medium py-3 w-[fit] px-5 rounded-xl flex items-center gap-1 justify-center text-sm sm:text-base"
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

// const editAbleChild = () => {
//   const [imgSrc, setImgSrc] = useState(null);
//   const uploadImgHandler = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImgSrc(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };
//   return (
//     <>
//       <div className="flex justify-between items-center">
//         <img src={imgSrc || profileImg} alt="" className="w-[150px]  h-[150px]  object-cover rounded-full mb-4" />

//         <div>
//           <ChangePhoto onChange={uploadImgHandler} />
//         </div>
//       </div>
//       <form className="mt-4 md:mt-6">
//         <div className="flex lg:flex-row flex-col gap-4 my-4">
//           <TextField type="text" label="First Name" labelWeight="font-semibold" placeHolder="Your First Name" />
//           <TextField type="text" label="Last Name" labelWeight="font-semibold" placeHolder="Your Last Name" />
//         </div>
//         <div className="flex lg:flex-row flex-col gap-4 my-4">
//           <TextField type="text" label="Address" labelWeight="font-semibold" placeHolder="Your Address" />
//           <TextField type="tel" label="Contact" labelWeight="font-semibold" placeHolder="Your Contact" />
//         </div>
//         <div className="flex lg:flex-row flex-col gap-4 my-4">
//           <Dropdown label="Country" height="200px" overflow={"auto"} options={country} />
//           <TextField type="text" label="State" labelWeight="font-semibold" placeHolder="Your State" />
//         </div>
//         <div className="flex justify-center lg:justify-end my-3 lg:my-0">
//           <Button text="Update Profile" width="w-fit" />
//         </div>

//         {/* <div className="lg:col-span-8 flex justify-center sm:justify-end">
//           <div className="flex items-center gap-4">
//             <Button
//               type="button"
//               text="Cancel"
//               color="#111111b3"
//               bg="#76767640"
//               width="w-[120px] sm:w-[150px]"
//               height="h-[40px] sm:h-[60px]"
//             />
//             <Button
//               text="Add"
//               width="w-[120px] sm:w-[150px]"
//               height="h-[40px] sm:h-[60px]"
//             />
//           </div>
//         </div> */}
//       </form>
//     </>
//   );
// };
