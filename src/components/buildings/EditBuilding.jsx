import { useEffect, useState } from "react";
import UploadModelImage from "./uploads/UploadModelImage";
import EditGeneralInfo from "./EditGeneralInfo";
import Button from "../shared/small/Button";
import EditMapping from "./EditMapping";
import { useGetSingleBuildingQuery } from "../../redux/apis/buildingApis";
import { useParams } from "react-router-dom";

const EditBuilding = () => {
  const buildingId = useParams().id;

  const [twoDModel, setTwoDModel] = useState(null);
  const [twoDModelPreview, setTwoDModelPreview] = useState(null);
  const [twoDModelCoordinates, setTwoDModelCoordinates] = useState([]);
  const { data, isSuccess, isLoading } = useGetSingleBuildingQuery(buildingId);
  const [polygons, setPolygons] = useState([]);
  const [oldImageSrc, setOldImageSrc] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [building, setBuilding] = useState({
    name: '',
    address: '',
    area: '',
    email: '',
    type: '',
    floors: '',
    thumbnail: '',
    latitude: '',
    longitude: '',
    twoDModel: '',
    twoDModelCanvasData: '',
    totalSensors: '',
    buildingImage: null,
    buildingCoordinates: [],
    description: '',
  });
  const positionString = data?.data.position?.[0] || '';
  const [lat, long] = positionString.split(',');
  useEffect(() => {
    if (data?.data) {
      const building = data?.data;
      setBuilding({
        name: building.name || '',
        address: building.address || '',
        area: building.area || '',
        email: building.email || '',
        type: building.type || '',
        floors: building?.floors || "",

        thumbnail: building?.thumbnail?.url || "",
        twoDModel: building?.twoDModel?.url || "",
        twoDModelCanvasData: JSON.parse(building?.twoDModelCanvasData) || [],
        totalSensors: building?.floors.reduce((sensors, floor) => sensors + floor?.sensors.length, 0) || 0,
        latitude: lat,
        longitude: long,
        buildingImage: building?.twoDImage?.url || null,
        buildingCoordinates: building.polygonData || [],
        description: building.description || '',
      });
      setTwoDModelPreview(building?.twoDModel?.url)
      setPolygons(JSON.parse(building?.twoDModelCanvasData))
    }
  }, [])
  const formDataHandler = (e) => setBuilding({ ...building, [e.target.name]: e.target.value });


  return (
    <div>
      <h6 className="text-base font-semibold">Edit Building</h6>
      <div className="my-5 flex justify-center">
        <UploadModelImage
          twoDModel={twoDModel}
          setFile={setTwoDModel}
          previewValue={twoDModelPreview}
          setPreviewValue={setTwoDModelPreview}
          polygons={polygons}
          setPolygons={setPolygons}
        />
      </div>
      <div>
        <EditGeneralInfo formDataHandler={formDataHandler} building={building} />
      </div>
      <div className="my-5">
        <EditMapping formDataHandler={formDataHandler} building={building} />
      </div>
      <div className="flex justify-end">
        <Button type="button" text="Update Building" width="w-[158px]" />
      </div>
    </div>
  );
};

export default EditBuilding;
