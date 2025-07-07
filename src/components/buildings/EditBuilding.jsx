import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetSingleBuildingQuery,
  useUpdateSingleBuildingMutation,
} from '../../redux/apis/buildingApis';
import BrowseFile from '../shared/large/BrowseFile';
import Button from '../shared/small/Button';
import Dropdown from '../shared/small/Dropdown';
import Loader from '../shared/small/Loader';
import TextField from '../shared/small/TextField';
import StepperMap from './StepperMap';
import { toast } from 'react-toastify';

const buildingTypesOptions = [
  { option: 'Residential', value: 'residential' },
  { option: 'Commercial', value: 'commercial' },
  { option: 'Religious', value: 'religious' },
  { option: 'Educational', value: 'educational' },
  { option: 'Industrial', value: 'industrial' },
  { option: 'Hospitality', value: 'hospitality' },
  { option: 'Other', value: 'other' },
];

const EditBuilding = () => {
  const buildingId = useParams().id;
  const { data, isLoading } = useGetSingleBuildingQuery(buildingId);
  const [updateBuilding, { isLoading: updateLoading }] = useUpdateSingleBuildingMutation();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [area, setArea] = useState(Number(''));
  const [address, setAddress] = useState('');
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbNailPreview] = useState('');
  const Navigate = useNavigate();
  const updateBuildingHandler = async () => {
    try {
      const data = {};
      if (name) data.name = name;
      if (type) data.type = type;
      if (area) data.area = area;
      if (address) data.address = address;
      if (lat && lng) data.position = `${lat},${lng}`;
      if (thumbnail) data.thumbnail = thumbnail;
      const res = await updateBuilding({ buildingId, data }).unwrap();
      if (res.message) toast.success(res.message);
      Navigate('/dashboard/buildings');
    } catch (error) {
      console.log('error while updating building');
      toast.error(error?.data?.message || 'Error while updating building');
    }
  };

  useEffect(() => {
    if (!isLoading && data?.data) {
      const building = data?.data;
      if (building?.thumbnail?.url) setThumbNailPreview(building?.thumbnail?.url);
      if (building?.name) setName(building?.name);
      if (building?.type) setType(building?.type);
      if (building.area) setArea(building?.area);
      if (building.address) setAddress(building?.address);
      if (building.position) {
        setLat(building?.position?.[0]);
        setLng(building?.position?.[1]);
      }
    }
  }, [data?.data, isLoading]);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <h6 className="text-base font-semibold">Edit Building</h6>
      <div>
        {/* general info */}
        <div>
          <BrowseFile
            setFile={setThumbnail}
            previewValue={thumbnailPreview}
            setPreviewValue={setThumbNailPreview}
          />
          <form className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
            <div className="lg:col-span-6">
              <TextField
                label={'Building Name'}
                type="text"
                value={name}
                placeholder="Building Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="lg:col-span-6">
              <Dropdown
                label="Building Type"
                value={type}
                defaultText={type}
                options={buildingTypesOptions}
                onSelect={(option) => setType(option?.value)}
              />
            </div>
            <div className="lg:col-span-6">
              <TextField
                label={'Area (Sq Ft)'}
                type="text"
                value={area}
                placeholder="Area (Sq Ft)"
                onChange={(e) => setArea(e.target.value)}
              />
            </div>
            <div className="lg:col-span-6">
              <TextField
                label={'Address'}
                type="text"
                value={address}
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </form>
        </div>
        {/* mapping info */}
        <div>
          <form className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
            <div className="lg:col-span-6">
              <TextField
                label={'Latitude'}
                value={lat}
                type="number"
                placeholder="Latitude"
                onChange={(e) => setLat(e.target.value)}
              />
            </div>
            <div className="lg:col-span-6">
              <TextField
                label={'Longitude'}
                value={lng}
                type="number"
                placeholder="Longitude"
                onChange={(e) => setLng(e.target.value)}
              />
            </div>
            <div className="lg:col-span-12">
              <div className="h-[325px] rounded-lg shadow-md">
                <StepperMap lat={lat} lng={lng} />
              </div>
            </div>
          </form>
        </div>
        {/* submit button */}
        <div className="flex justify-end my-4 mt-8">
          <Button
            onClick={updateBuildingHandler}
            disabled={updateLoading}
            type="button"
            text="Update Building"
            width="w-[158px]"
            className={`${updateLoading ? 'opacity-[0.5] pointer-events-none' : ''}`}
          />
        </div>
      </div>
    </>
  );
};

export default EditBuilding;
