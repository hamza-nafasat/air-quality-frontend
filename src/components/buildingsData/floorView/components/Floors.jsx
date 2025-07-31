/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from 'react';
import SearchIcon from '../../../../assets/svgs/reports/SearchIcon';
import BuildingCard from '../../../buildings/BuildingCard';
import BuildingCards from '../../../buildings/BuildingCards';

const Floors = ({ floors, floor }) => {
  // console.log('floor', floor);

  // if (!Array.isArray(floor) || floor.length === 0) {
  //   return <div>No building data available</div>;
  // }
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('Newest');

  const [buildings, setBuildings] = useState([]);

  const filteredSorted = useMemo(() => {
    let list = [...buildings];
    // filter by name or address
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      list = list.filter(
        (b) => b.name?.toLowerCase().includes(term) || b.address?.toLowerCase().includes(term)
      );
      console.log('list', list);
    }

    // sort by createdAt
    list.sort((a, b) =>
      sortOrder === 'Newest' ? b.createdAt - a.createdAt : a.createdAt - b.createdAt
    );

    return list;
  }, [buildings, searchTerm, sortOrder]);
  useEffect(() => {
    if (Array.isArray(floor)) {
      const buildingsData = floor.map((building) => {
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
  }, [floor]);

  return (
    <div className="bg-white p-5 shadow-dashboard rounded-[16px]">
      <div className="flex justify-between sm:flex-row flex-col">
        <h5>Building Floors</h5>
        <FilterSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      </div>

      {filteredSorted?.map((building, index) => {
        if (!building) return null; // safeguard
        return <BuildingCards key={building._id || index} data={building} />;
      })}
    </div>
  );
};

export default Floors;

const FilterSection = ({ searchTerm, setSearchTerm, sortOrder, setSortOrder }) => {
  return (
    <div className="flex flex-wrap gap-4 sm:mt-0 mt-2">
      <div className="flex items-center gap-1 border border-[#e7e7e7] rounded-lg h-[34px] bg-white px-3 basis-[35%] flex-1">
        <SearchIcon />
        <input
          type="search"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="focus:outline-none text-sm w-full"
        />
      </div>
      <div className="flex items-center justify-between gap-1 border border-[#e7e7e7] rounded-lg h-[34px] bg-white px-3">
        <p className="text-sm text-[#7e7e7e]">Sort By:</p>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="focus:outline-none text-sm"
        >
          <option value="Newest" className="w-full">
            Newest
          </option>
          <option value="Oldest" className="w-full">
            Oldest
          </option>
        </select>
      </div>
    </div>
  );
};
