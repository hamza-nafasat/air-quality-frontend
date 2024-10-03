import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts';

const ProgressRadialChart = ({ seriesData = [70], height = 200, width=130}) => {
    const [series] = useState(seriesData);
    const [options] = useState({
      chart: {
        height: height,
        width: width,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: true,  
              fontSize: '10px',
              fontWeight: 600,
              offsetY: 3,
              formatter: function (val) {
                return `${val}%`;
              }
            }
          },
          hollow: {
            size: '40%',
          }
        },
      }
    });
  
    return (
      <div style={{width:width}}>
        <div id="chart">
          <ReactApexChart options={options} series={series} type="radialBar" height={height} />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  };

export default ProgressRadialChart