import React from "react";

const AirQualityIndex = () => {
  return (
    <div className="overflow-x-scroll lg:overflow-hidden no-scrollbar">
      <h2 className="text-sm md:text-base font-semibold pl-4 pt-4">
        Air Quality Index
      </h2>
      {/* table */}
      <table className="w-full mt-3">
        <thead className="bg-[#0222130d] border-l-[12px] border-[#c9ffe663]">
          <tr>
            <td className="p-3 leading-none text-xs font-semibold">
              AQI
            </td>
            <td className="p-3 leading-none text-xs font-semibold">
              PM 2.5 <p className="text-[8px]">(Ug/M3)</p>
            </td>
            <td className="p-3 leading-none text-xs font-semibold">
              PM 2.5 <p className="text-[8px]">(Ug/M3)</p>
            </td>
            <td className="p-3 leading-none text-xs font-semibold">
              VOC <p className="text-[8px]">(ppm)</p>
            </td>
            <td className="p-3 leading-none text-xs font-semibold">
              CO<sup>2</sup> <p className="text-[8px]">(ppm)</p>
            </td>
            <td className="p-3 leading-none text-xs font-semibold">
              Formaidhyde
            </td>
          </tr>
        </thead>
        <tbody>
          {tableRowsData.map((rowData, i) => (
            <>
            <tr key={i} style={{borderLeft: `12px solid ${rowData[0].color}`}}>
              {rowData.map((tdData, i) => (
                <>
                  <td
                    className="text-[12px] font-semibold px-2 py-4"
                    style={{ borderBottom: `0.5px solid ${tdData.color}` }}
                    key={i}
                  >
                    {tdData.aqi}
                  </td>
                  <td
                    className="text-[12px] font-semibold px-2 py-4"
                    style={{ borderBottom: `0.5px solid ${tdData.color}` }}
                    key={i}
                  >
                    {tdData.pm2}
                  </td>
                  <td
                    className="text-[12px] font-semibold px-2 py-4"
                    style={{ borderBottom: `0.5px solid ${tdData.color}` }}
                    key={i}
                  >
                    {tdData.pm3}
                  </td>
                  <td
                    className="text-[12px] font-semibold px-2 py-4"
                    style={{ borderBottom: `0.5px solid ${tdData.color}` }}
                    key={i}
                  >
                    {tdData.voc}
                  </td>
                  <td
                    className="text-[12px] font-semibold px-2 py-4"
                    style={{ borderBottom: `0.5px solid ${tdData.color}` }}
                    key={i}
                  >
                    {tdData.co2}
                  </td>
                  <td
                    className="text-[12px] font-semibold px-2 py-4"
                    style={{ borderBottom: `0.5px solid ${tdData.color}` }}
                    key={i}
                  >
                    {tdData.formaidhyde}
                  </td>
                </>
              ))}
            </tr>
            <tr style={{height: '10px'}}></tr>
            </>
          ))}
        </tbody>
      </table>
      <div className="px-4 py-2 flex items-center justify-center flex-wrap gap-3" style={{rowGap:'4px'}}>
        <TablePoints title='Good' color='rgba(135, 255, 169, 1)' />
        <TablePoints title='Moderate' color='rgba(255, 239, 125, 1)' />
        <TablePoints title='Unhealthy' color='rgba(255, 193, 192, 1)' />
        <TablePoints title='Very Unhealthy' color='rgba(255, 187, 215, 1)' />
        <TablePoints title='Unhealthy for sensitive groups' color='rgba(255, 197, 151, 1)' />
        <TablePoints title='Hazardous' color='rgba(233, 169, 47, 1)' />
      </div>
    </div>
  );
};

export default AirQualityIndex;

const TablePoints = ({title, color}) => {
  return (
    <div className="flex items-center gap-1">
      <div className="size-[11px] rounded-sm block" style={{background: `${color}`}}></div>
      <p className="text-xs font-medium text-[rgba(70,78,95,1)]">{title}</p>
    </div>
  )
}

var tableRowsData = [
  [
    {
      color: "rgba(59,227,107,1)",
      aqi: "0-50",
      pm2: "0-12",
      pm3: "0-54",
      voc: "0-15",
      co2: "400-655",
      formaidhyde: "0-0.2",
    },
  ],
  [
    {
      color: "rgba(227,59,59,1)",
      aqi: "51-100",
      pm2: "13-35",
      pm3: "55-154",
      voc: "16-30",
      co2: "656-800",
      formaidhyde: "0.21-0.3",
    },
  ],
  [
    {
      color: "rgba(227,227,59,1)",
      aqi: "101-150",
      pm2: "36-55",
      pm3: "155-254",
      voc: "31-45",
      co2: "801-1000",
      formaidhyde: "0.31-0.4",
    },
  ],
  [
    {
      color: "rgba(59,107,227,1)",
      aqi: "151-200",
      pm2: "56-150",
      pm3: "255-354",
      voc: "46-60",
      co2: "1001-1200",
      formaidhyde: "0.41-0.5",
    },
  ],
  [
    {
      color: "rgba(107,59,227,1)",
      aqi: "201-300",
      pm2: "151-250",
      pm3: "355-424",
      voc: "61-75",
      co2: "1201-1400",
      formaidhyde: "0.51-0.6",
    },
  ],
  [
    {
      color: "rgba(227,59,107,1)",
      aqi: "301-500",
      pm2: "251-500",
      pm3: "425-504",
      voc: "76-100",
      co2: "1401-1600",
      formaidhyde: "0.61-0.7",
    },
  ],
];
