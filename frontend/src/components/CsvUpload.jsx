import React, { useState } from 'react'
import { getApi } from '../lib/api'

export default function CsvUpload() {
  const [file, setFile] = useState(null)
  const [msg, setMsg] = useState('')

  async function upload() {
    if (!file) return
    const fd = new FormData()
    fd.append('file', file)
    const api = getApi()
    const { data } = await api.post('/api/readings/import', fd, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    setMsg(`Imported ${data.length} rows.`)
  }

  return (
    <div>
      <h3>Bulk Import (CSV, ADMIN only)</h3>
      <p><small>Header: <code>userId,kwh,timestamp</code> (timestamp optional, ISO-8601)</small></p>
      <input type="file" accept=".csv" onChange={e=>setFile(e.target.files[0])} />
      <button onClick={upload} disabled={!file} style={{ marginLeft: 8 }}>Upload</button>
      {msg && <p>{msg}</p>}
    </div>
  )
}
