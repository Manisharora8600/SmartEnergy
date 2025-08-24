import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UsageChart from './components/UsageChart.jsx'
import Bills from './components/Bills.jsx'
import Login from './pages/Login.jsx'
import CsvUpload from './components/CsvUpload.jsx'
import { getApi } from './lib/api'

export default function App() {
  const [authed, setAuthed] = useState(!!localStorage.getItem('token'))
  const [summary, setSummary] = useState(null)

  useEffect(() => {
    if (!authed) return
    const api = getApi()
    const userId = localStorage.getItem('userId')
    api.get('/api/readings/summary', { params: { userId } }).then(({data}) => setSummary(data))
  }, [authed])

  if (!authed) return <Login onAuthed={()=>setAuthed(true)} />

  return (
    <div style={{ maxWidth: 960, margin: '2rem auto', fontFamily: 'Inter, system-ui, Arial' }}>
      <header style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <h2>Smart Energy Usage & Billing</h2>
        <div>
          <button onClick={()=>{ localStorage.clear(); location.reload(); }}>Logout</button>
        </div>
      </header>

      <section style={{ marginTop: 16, border:'1px solid #ddd', borderRadius:12, padding:16 }}>
        <h3>Usage Summary</h3>
        {summary ? (
          <p><b>{summary.totalKwh.toFixed(2)}</b> kWh across {summary.count} readings</p>
        ) : <p>Loading...</p>}
      </section>

      <section style={{ marginTop: 16, border:'1px solid #ddd', borderRadius:12, padding:16 }}>
        <UsageChart />
      </section>

      <section style={{ marginTop: 16, border:'1px solid #ddd', borderRadius:12, padding:16 }}>
        <CsvUpload />
      </section>

      <section style={{ marginTop: 16, border:'1px solid #ddd', borderRadius:12, padding:16 }}>
        <Bills />
      </section>
    </div>
  )
}
