import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'
import { getApi } from '../lib/api'

export default function UsageChart() {
  const [data, setData] = useState([])
  useEffect(() => {
    const api = getApi()
    const userId = localStorage.getItem('userId')
    api.get('/api/readings', { params: { userId } }).then(({data}) => {
      setData(data.map(d => ({ x: new Date(d.timestamp).toLocaleString(), kwh: d.kwh })))
    })
  }, [])
  return (
    <div>
      <h3>Daily Usage</h3>
      <div style={{ width:'100%', height: 280 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" hide />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="kwh" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
