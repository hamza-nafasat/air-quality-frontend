import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AddIcon from '../../../assets/svgs/pages/AddIcon';
import SearchIcon from '../../../assets/svgs/reports/SearchIcon';
import BuildingCard from '../../../components/buildings/BuildingCard';
import { useGetAllBuildingsQuery } from '../../../redux/apis/buildingApis';
import Loader from '../../../components/shared/small/Loader';
import RingMeter from '../../../components/buildings/utils/RingMeter';
import BuildingCards from '../../../components/buildings/BuildingCards';
import { useSelector } from 'react-redux';

/* ─────────────────────────────────────────────────────────────────── */
/*  Main page                                                          */
/* ─────────────────────────────────────────────────────────────────── */
const Buildings = () => {
  const { data, isLoading, isSuccess } = useGetAllBuildingsQuery('');
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user.role === 'sub_admin';
  const isAdminORSubscription = ['sub_admin', 'Inspection_manager'].includes(user.role);

  // const isAdmin = true;
  console.log('isAdmin', isAdminORSubscription);
  /* raw list fetched from API */
  const [buildings, setBuildings] = useState([]);

  /* filter + sort controls */
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('Newest');

  /* pagination */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  /* — hydrate buildings when query succeeds — */
  // useEffect(() => {
  //   console.log('data', data);

  //   if (isSuccess) {
  //     const buildingsData = data?.data?.map((building) => {
  //       /* quick helper: ObjectId → Date ‑ fallback to now() */
  //       const createdAt =
  //         building?.createdAt || new Date(parseInt(building?._id?.substring(0, 8), 16) * 1000);
  //       return {
  //         ...building,
  //         id: building?._id,
  //         name: building?.name,
  //         address: building?.address,
  //         sensors:
  //           building?.floors?.reduce((sensors, floor) => sensors + floor?.sensors?.length, 0) || 0,
  //         temperature: building?.temperature || 0,
  //         thumbnail: building?.thumbnail?.url || '',
  //         thumbnailPublicId: building?.tumbnail?.public_id || '',
  //         tvoc: building?.tvoc || 0,
  //         co2: building?.co2 || 0,
  //         createdAt, // ✨ used for sorting
  //       };
  //     });
  //     setBuildings(buildingsData);
  //   }
  // }, [isSuccess, data]);

  /* — derive filtered + sorted list — */
  const filteredSorted = useMemo(() => {
    let list = [...buildings];
    // filter by name or address
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      list = list.filter(
        (b) => b.name?.toLowerCase().includes(term) || b.address?.toLowerCase().includes(term)
      );
      // console.log('list', list);
    }

    // sort by createdAt
    list.sort((a, b) =>
      sortOrder === 'Newest' ? b.createdAt - a.createdAt : a.createdAt - b.createdAt
    );

    return list;
  }, [buildings, searchTerm, sortOrder]);

  /* reset to first page when filter changes */
  useEffect(() => setCurrentPage(1), [searchTerm, sortOrder]);
  useEffect(() => {
    if (isSuccess && Array.isArray(data?.data)) {
      const buildingsData = data.data.map((building) => {
        const createdAt = building?.createdAt
          ? new Date(building.createdAt)
          : new Date(parseInt(building._id?.substring(0, 8), 16) * 1000);

        return {
          ...building,
          id: building._id,
          sensors: building?.floors?.reduce((acc, floor) => acc + (floor?.sensors?.length || 0), 0),
          createdAt,
        };
      });
      setBuildings(buildingsData);
    }
  }, [isSuccess, data]);

  /* pagination maths */
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSorted.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSorted.length / itemsPerPage);
  // console.log('currentItemscurrentItems', currentItems);
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
        <div className="flex gap-2 items-end sm:items-center sm:flex-row flex-col-reverse">
          <FilterSection
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
          />
          {isAdmin && (
            <button>
              <Link to="/dashboard/add-building">
                <AddIcon />
              </Link>
            </button>
          )}
        </div>
      </section>

      {/* list */}
      <section className="p-3">
        {currentItems.length === 0 ? (
          <div className="text-gray-500 font-medium text-base">No buildings match your search.</div>
        ) : (
          currentItems.map((building, index) => {
            if (!building) return null;
            return <BuildingCards key={building._id || index} data={building} />;
          })
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
