// import SearchIcon from '../../assets/svgs/reports/SearchIcon';
// import DashboardBuildingCard from './buildingView/components/DashboardBuildingCard';

// const DashboardBuildings = ({ title = 'Building Floors', data }) => {
//   const buildings = data?.buildingMapData;

//   if (!Array.isArray(buildings) || buildings.length === 0) {
//     return <div>No building data available</div>;
//   }

//   return (
//     <div className="bg-white p-5 shadow-dashboard rounded-[16px]">
//       <div className="flex justify-between sm:flex-row flex-col">
//         <h5>{title}</h5>
//         <FilterSection />
//       </div>
//       {buildings.map((building, index) => {
//         if (!building) return null; // safeguard
//         return <DashboardBuildingCard key={building._id || index} data={building} />;
//       })}
//     </div>
//   );
// };

// export default DashboardBuildings;

// const FilterSection = () => {
//   return (
//     <div className="flex flex-wrap  gap-4 sm:mt-0 mt-2">
//       <div className="flex items-center gap-1 border border-[#e7e7e7] rounded-lg h-[34px] bg-white px-3 basis-[35%] flex-1">
//         <SearchIcon />
//         <input type="search" placeholder="Search" className="focus:outline-none text-sm w-full" />
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

// // export default DashboardBuildings

import { useMemo, useState } from 'react';
import SearchIcon from '../../assets/svgs/reports/SearchIcon';
import DashboardBuildingCard from './buildingView/components/DashboardBuildingCard';

const DashboardBuildings = ({ title = 'Building Floors', data }) => {
  const buildings = data?.buildingMapData || [];

  const [searchText, setSearchText] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  const filteredBuildings = useMemo(() => {
    const filtered = buildings.filter((b) =>
      b.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [searchText, sortOrder, buildings]);

  if (!Array.isArray(buildings) || buildings.length === 0) {
    return <div>No building data available</div>;
  }

  return (
    <div className="bg-white p-5 shadow-dashboard rounded-[16px]">
      <div className="flex justify-between sm:flex-row flex-col">
        <h5>{title}</h5>
        <div className="flex flex-wrap gap-4 sm:mt-0 mt-2">
          <div className="flex items-center gap-1 border border-[#e7e7e7] rounded-lg h-[34px] bg-white px-3 basis-[35%] flex-1">
            <SearchIcon />
            <input
              type="search"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="focus:outline-none text-sm w-full"
            />
          </div>
          <div className="flex items-center justify-between gap-1 border border-[#e7e7e7] rounded-lg h-[34px] bg-white px-3">
            <p className="text-sm text-[#7e7e7e]">Sort By:</p>
            <select
              className="focus:outline-none text-sm"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
      </div>

      {filteredBuildings.map((building, index) => {
        if (!building) return null;
        return <DashboardBuildingCard key={building._id || index} data={building} />;
      })}
    </div>
  );
};

export default DashboardBuildings;
