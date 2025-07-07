// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import AddIcon from "../../../assets/svgs/pages/AddIcon";
// import SearchIcon from "../../../assets/svgs/reports/SearchIcon";
// import BuildingCard from "../../../components/buildings/BuildingCard";
// import { useGetAllBuildingsQuery } from "../../../redux/apis/buildingApis";
// import Loader from "../../../components/shared/small/Loader";

// const Buildings = () => {
//   const [buildings, setBuildings] = useState([]);
//   const { data, isLoading, isSuccess } = useGetAllBuildingsQuery("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = buildings.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(buildings.length / itemsPerPage);

//   const handleNextPage = () =>
//     currentPage < totalPages
//       ? setCurrentPage((prevPage) => prevPage + 1)
//       : null;
//   const handlePrevPage = () =>
//     currentPage > 1 ? setCurrentPage((prevPage) => prevPage - 1) : null;

//   useEffect(() => {
//     if (isSuccess) {
//       const buildingsData = data?.data?.map((building) => ({
//         ...building,
//         id: building?._id,
//         name: building?.name,
//         address: building?.address,
//         sensors:
//           building?.floors?.reduce(
//             (sensors, floor) => sensors + floor?.sensors?.length,
//             0
//           ) || 0,
//         temperature: building?.temperature || 0,
//         thumbnail: building?.thumbnail?.url || "",
//         thumbnailPublicId: building?.tumbnail?.public_id || "",
//         tvoc: building?.tvoc || 0,
//         co2: building?.co2 || 0,
//       }));
//       setBuildings(buildingsData);
//     }
//   }, [isSuccess, data]);

//   return isLoading ? (
//     <Loader />
//   ) : (
//     <div className="bg-white p-[16px] rounded-[16px]">
//       <section className="p-3 sm:flex-row flex-col flex justify-between  sm:items-center">
//         <h5 className="text-[14px] xl:text-[16px] font-[600]">Buildings</h5>

//         <div className="flex gap-2 items-end sm:items-center sm:flex-row flex-col-reverse">
//           <div className="mt-2 sm:mt-0">
//             <FilterSection />
//           </div>
//           <div className="flex gap-2">
//             <button>
//               <Link to="/dashboard/add-building">
//                 <AddIcon />
//               </Link>
//             </button>
//           </div>
//         </div>
//       </section>
//       <section className="p-3">
//         {buildings?.length === 0 ? (
//           <div className="text-gray-500 font-medium text-base">
//             No buildings data
//           </div>
//         ) : (
//           currentItems?.map((building, i) => (
//             <BuildingCard
//               key={i}
//               name={building?.name}
//               address={building?.address}
//               sensors={building?.sensors}
//               temperature={building?.temperature}
//               thumbnail={building?.thumbnail}
//               tvoc={building?.tvoc}
//               co2={building?.co2}
//               link={`/dashboard/building-view/${building?.id}`}
//             />
//           ))
//         )}
//       </section>
//       <div className="flex justify-between items-center mt-4">
//         <button
//           onClick={handlePrevPage}
//           disabled={currentPage === 1}
//           className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
//         >
//           Previous
//         </button>
//         <span className="text-sm">
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={handleNextPage}
//           disabled={currentPage === totalPages}
//           className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Buildings;

// const FilterSection = () => {
//   return (
//     <div className="flex flex-wrap  gap-4">
//       <div className="flex items-center gap-1 border border-[#e7e7e7] rounded-lg h-[34px] bg-white px-3 basis-[35%] flex-1">
//         <SearchIcon />
//         <input
//           type="search"
//           placeholder="Search"
//           className="focus:outline-none text-sm w-full"
//         />
//       </div>
//       <div className="flex items-center justify-between gap-1 border border-[#e7e7e7] rounded-lg h-[34px] bg-white px-3 ">
//         <p className="text-sm text-[#7e7e7e]">Sort By:</p>
//         <select className="focus:outline-none text-sm">
//           <option className="w-full">Newest</option>
//           <option className="w-full">Oldest</option>
//         </select>
//       </div>
//     </div>
//   );
// };

import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AddIcon from '../../../assets/svgs/pages/AddIcon';
import SearchIcon from '../../../assets/svgs/reports/SearchIcon';
import BuildingCard from '../../../components/buildings/BuildingCard';
import { useGetAllBuildingsQuery } from '../../../redux/apis/buildingApis';
import Loader from '../../../components/shared/small/Loader';
import RingMeter from '../../../components/buildings/utils/RingMeter';

/* ─────────────────────────────────────────────────────────────────── */
/*  Main page                                                          */
/* ─────────────────────────────────────────────────────────────────── */
const Buildings = () => {
  const { data, isLoading, isSuccess } = useGetAllBuildingsQuery('');

  /* raw list fetched from API */
  const [buildings, setBuildings] = useState([]);

  /* filter + sort controls */
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('Newest');

  /* pagination */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  /* — hydrate buildings when query succeeds — */
  useEffect(() => {
    if (isSuccess) {
      const buildingsData = data?.data?.map((building) => {
        /* quick helper: ObjectId → Date ‑ fallback to now() */
        const createdAt =
          building?.createdAt || new Date(parseInt(building?._id?.substring(0, 8), 16) * 1000);
        return {
          ...building,
          id: building?._id,
          name: building?.name,
          address: building?.address,
          sensors:
            building?.floors?.reduce((sensors, floor) => sensors + floor?.sensors?.length, 0) || 0,
          temperature: building?.temperature || 0,
          thumbnail: building?.thumbnail?.url || '',
          thumbnailPublicId: building?.tumbnail?.public_id || '',
          tvoc: building?.tvoc || 0,
          co2: building?.co2 || 0,
          createdAt, // ✨ used for sorting
        };
      });
      setBuildings(buildingsData);
    }
  }, [isSuccess, data]);

  /* — derive filtered + sorted list — */
  const filteredSorted = useMemo(() => {
    let list = [...buildings];

    /* search */
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      list = list.filter(
        (b) => b.name?.toLowerCase().includes(term) || b.address?.toLowerCase().includes(term)
      );
    }

    /* sort */
    list.sort((a, b) =>
      sortOrder === 'Newest' ? b.createdAt - a.createdAt : a.createdAt - b.createdAt
    );

    return list;
  }, [buildings, searchTerm, sortOrder]);

  /* reset to first page when filter changes */
  useEffect(() => setCurrentPage(1), [searchTerm, sortOrder]);

  /* pagination maths */
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSorted.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSorted.length / itemsPerPage);

  /* page nav handlers */
  const handleNextPage = () => currentPage < totalPages && setCurrentPage((p) => p + 1);
  const handlePrevPage = () => currentPage > 1 && setCurrentPage((p) => p - 1);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="bg-white p-[16px] rounded-[16px]">
      {/* header + controls */}
      <section className="p-3 sm:flex-row flex-col flex justify-between sm:items-center">
        <h5 className="text-[14px] xl:text-[16px] font-[600]">Buildings</h5>
        {/* <div className="flex items-center justify-center">
          <div id='ring4' className="size-8 flex items-center justify-center bg-red-200 rounded-full">
            <div id='ring3' className="size-6 flex items-center justify-center bg-red-300 rounded-full">
              <div id='ring2' className="size-4 flex items-center justify-center bg-red-700 rounded-full">
                <div id='ring1' className="size-4 flex items-center justify-center bg-red-900 rounded-full"></div>
              </div>
            </div>
          </div>
        </div> */}
        {/* <div>
          <RingMeter value={100} />
          <RingMeter value={85} />
          <RingMeter value={75} />
          <RingMeter value={55} />
          <RingMeter value={42} />
          <RingMeter value={30} />
        </div> */}

        <div className="flex gap-2 items-end sm:items-center sm:flex-row flex-col-reverse">
          <FilterSection
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
          />
          <button>
            <Link to="/dashboard/add-building">
              <AddIcon />
            </Link>
          </button>
        </div>
      </section>

      {/* list */}
      <section className="p-3">
        {filteredSorted.length === 0 ? (
          <div className="text-gray-500 font-medium text-base">No buildings data</div>
        ) : (
          currentItems.map((b) => (
            <BuildingCard
              key={b.id}
              name={b.name}
              address={b.address}
              sensors={b.sensors}
              temperature={b.temperature}
              thumbnail={b.thumbnail}
              tvoc={b.tvoc}
              co2={b.co2}
              link={`/dashboard/building-view/${b.id}`}
            />
          ))
        )}
      </section>

      {/* pagination */}
      {totalPages > 1 && (
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
      )}
    </div>
  );
};

export default Buildings;

/* ─────────────────────────────────────────────────────────────────── */
/*  Small, controlled filter bar                                       */
/* ─────────────────────────────────────────────────────────────────── */
const FilterSection = ({ searchTerm, onSearchChange, sortOrder, onSortChange }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {/* search */}
      <div className="flex items-center gap-1 border border-[#e7e7e7] rounded-lg h-[34px] bg-white px-3 basis-[35%] flex-1">
        <SearchIcon />
        <input
          type="search"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="focus:outline-none text-sm w-full"
        />
      </div>

      {/* sort */}
      <div className="flex items-center gap-1 border border-[#e7e7e7] rounded-lg h-[34px] bg-white px-3">
        <p className="text-sm text-[#7e7e7e]">Sort By:</p>
        <select
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
          className="focus:outline-none text-sm"
        >
          <option>Newest</option>
          <option>Oldest</option>
        </select>
      </div>
    </div>
  );
};
