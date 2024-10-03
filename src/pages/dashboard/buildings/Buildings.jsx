import React, { useState } from "react";
import BuildingCard from "../../../components/buildings/BuildingCard";
import AddIcon from "../../../assets/svgs/pages/AddIcon";
import DeleteIcon from "../../../assets/svgs/pages/DeleteIcon";
import { Link } from "react-router-dom";
import { buildings } from "../../../data/data";
import DeleteConfirmation from "../../../components/shared/large/modal/DeleteConfirmation";
import Modal from "../../../components/shared/large/modal/Modal";
import SearchIcon from "../../../assets/svgs/reports/SearchIcon";

const Buildings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = buildings.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(buildings.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="bg-white p-[16px] rounded-[16px]">
      <section className="p-3 sm:flex-row flex-col flex justify-between  sm:items-center">
        <h5 className="text-[14px] xl:text-[16px] font-[600]">Buildings</h5>

        <div className="flex gap-2 items-end sm:items-center sm:flex-row flex-col-reverse">
          <div className="mt-2 sm:mt-0">
            <FilterSection />
          </div>
          <div className="flex gap-2">
            <button>
              <Link to="/dashboard/add-building">
                <AddIcon />
              </Link>
            </button>

            {/* <button onClick={handleOpenDeleteModal}>
              <Link to="">
                <DeleteIcon />
              </Link>
            </button> */}
          </div>
        </div>
      </section>

      {/* {deleteModal && (
        <Modal onClose={handleCloseDeleteModal} title="Confirmation">
          <DeleteConfirmation
            message="Are you sure you want to delete this building?"
            onClose={handleCloseDeleteModal}
          />{" "}
        </Modal>
      )} */}

      <section className="p-3">
        {currentItems.map((building, i) => (
          <BuildingCard
            key={i}
            name={building.name}
            address={building.address}
            sensors={building.sensors}
            temperature={building.temperature}
            tvoc={building.tvoc}
            co2={building.co2}
            link={`/dashboard/building-view/${building.id}`}
          />
        ))}
      </section>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Buildings;

const FilterSection = () => {
  return (
    <div className="flex flex-wrap  gap-4">
      <div className="flex items-center gap-1 border border-[#e7e7e7] rounded-lg h-[34px] bg-white px-3 basis-[35%] flex-1">
        <SearchIcon />
        <input
          type="search"
          placeholder="Search"
          className="focus:outline-none text-sm w-full"
        />
      </div>
      <div className="flex items-center justify-between gap-1 border border-[#e7e7e7] rounded-lg h-[34px] bg-white px-3 ">
        <p className="text-sm text-[#7e7e7e]">Sort By:</p>
        <select className="focus:outline-none text-sm">
          <option className="w-full">Newest</option>
          <option className="w-full">Oldest</option>
        </select>
      </div>
    </div>
  );
};
