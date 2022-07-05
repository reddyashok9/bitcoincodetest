import React, { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchDataAsync,
  selectData,
} from './bitcashSlice';
import styles from './Bitcash.module.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const dataa = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export function BitCash() {
  const data = useSelector(selectData);
  const dispatch = useDispatch();
  const [chartData, setChartData] = useState([]);
  const [value, setValue] = React.useState('today');

  const handleChange = (event) => {
    setValue(event.target.value);
    const len = event.target.value == 'today' ? 20 : event.target.value == 'week' ? 50 : 100
    const mainData = [...Array(len).keys()].map((item) => {
      console.log(data[item])
      return {date: formatDate(data[item][0]), value: data[item][1]}
    })
    setChartData(mainData);
  };


  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    const mainData = data.map((item) => {
      return {date: formatDate(item[0]), value: item[1]}
    })
    setChartData(mainData);
  }, [data])
  

  const getData = async () => {
    console.log(await dispatch(fetchDataAsync()));
  }
  
  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

  return (
    <div>

      <div className={styles.row}>
        <span className={styles.value}>{}</span>
        <div><label>
        Select the duration? <select value={value} onChange={handleChange}>
          <option value="today">24 Hours</option>
          <option value="week">7 days</option>
          <option value="month">1 Month</option>
      </select></label></div>
        
       {chartData && 
        <LineChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis dataKey="value"/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8"  />
        </LineChart>
}
      </div>
    </div>
  );
}
