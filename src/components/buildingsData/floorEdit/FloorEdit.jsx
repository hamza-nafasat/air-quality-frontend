'use client'
import React, { useEffect, useState } from 'react'
import { useGetAllBuildingsQuery } from '../../../redux/apis/buildingApis';
import TextField from '../../shared/small/TextField';
import { useParams } from 'react-router-dom';
import EditIcon from '../../../assets/svgs/stepper/EditIcon';
import UploadModelImage from '../../buildings/uploads/UploadModelImage';
import DeleteIcon from '../../../assets/svgs/pages/DeleteIcon';
import AccordionEditIcon from '../../../assets/svgs/buildings/AccordionEditIcon';

function FloorEdit() {
    const { id } = useParams();

    const { data, isSuccess, isLoading } = useGetAllBuildingsQuery();
    console.log("data", data)
    const [twoDModelPreview, setTwoDModelPreview] = useState(null);
    const [polygons, setPolygons] = useState([]);

    const [floor, setFloor] = useState({
        floorName: '',
        floorRooms: '',

    })
    const formDataHandler = (e) => setBuilding({ ...building, [e.target.name]: e.target.value });


    useEffect(() => {
        if (data?.data) {
            const building = data?.data?.find((building) =>
                building?.floors?.some((floor) => floor?._id === id)
            );
            const singleFloor = building?.floors?.find((floor) => floor?._id === id);
            console.log("singleFloor", singleFloor)
            setFloor({
                floorName: singleFloor?.name || "",
                floorRooms: singleFloor?.rooms || "",
            })
            setTwoDModelPreview(singleFloor?.twoDModel?.url)
            setPolygons(JSON.parse(singleFloor?.twoDModelCanvasData))
        }
    }, [data, isSuccess, id])

    const deleteButtonHandler = () => {

        console.log('hallo');
    }


    return (
        <div>
            <div className="flex items-center justify-between bg-red-400 rounded-[4px] px-4 md:px-8 py-2">
                <h6 className="text-base md:text-lg font-bold text-white">Floor 1</h6>
                <div className="flex items-center gap-4">
                    <div className="cursor-pointer">
                        <AccordionEditIcon />
                    </div>
                </div>
            </div>
            <div className='flex gap-4 mt-4'>

                <TextField
                    type="text"
                    value={floor.floorName}
                    placeholder="Floor Name"
                    onChange={formDataHandler}
                />
                <TextField
                    type="text"
                    value={floor.floorRooms}
                    placeholder="Rooms"
                    onChange={formDataHandler}
                />
            </div>
            <div className="lg:col-span-3 flex justify-center">
                <div className=''>

                    <div className="flex items-center justify-between my-3 gap-4">
                        <h3 className="text-sm md:text-base font-semibold text-[rgba(6,6,6,0.8)]">Upload Floor TwoD Model</h3>
                        <div className="cursor-pointer" onClick={deleteButtonHandler}>
                            <DeleteIcon />
                        </div>
                    </div>
                    <UploadModelImage
                        previewValue={twoDModelPreview}
                        setPreviewValue={setTwoDModelPreview}
                        polygons={polygons}
                        setPolygons={setPolygons}
                    />
                </div>
            </div>

        </div>
    )
}

export default FloorEdit