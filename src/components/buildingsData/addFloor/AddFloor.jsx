import React, { useState } from 'react'
import AccordionEditIcon from '../../../assets/svgs/buildings/AccordionEditIcon'
import TextField from '../../shared/small/TextField'
import UploadModelImage from '../../buildings/uploads/UploadModelImage';
import Button from '../../shared/small/Button';

function AddFloor() {
    const [floor, setFloor] = useState({ floorName: "", floorRooms: "0" });

    return (
        <div>
            <div className="flex items-center justify-between bg-primary-lightBlue rounded-[4px] px-4 md:px-8 py-2">
                <h6 className="text-base md:text-lg font-bold text-white">Add new Floor</h6>
                <div className="flex items-center gap-4">
                    <div className="cursor-pointer">
                        <AccordionEditIcon />
                    </div>
                </div>
            </div>
            <>
                <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <TextField
                        type="text"
                        placeholder="Name"
                        label="Floor Name"
                        value={floor.floorName}
                        onChange={(e) => setFloor({ ...floor, floorName: e.target.value })}
                    />
                    <TextField
                        type="text"
                        placeholder="0"
                        label="Rooms"
                        value={floor.floorRooms}
                        onChange={(e) => setFloor({ ...floor, floorRooms: e.target.value })}
                    />
                </div>
                <div className="lg:col-span-3 flex justify-center">
                    <div className="mt-4">
                        <UploadModelImage />
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button
                        text={"Add Floor"}
                        width="w-[158px]"
                    />
                </div>
            </>
        </div>
    )
}

export default AddFloor