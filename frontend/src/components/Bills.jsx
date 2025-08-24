import React, { useEffect, useState } from 'react'
import { getApi } from '../lib/api'
import StripePayButton from './StripePayButton.jsx'

export default function Bills() {
  const [bills, setBills] = useState([])
  async function refresh() {
    const api = getApi()
    const userId = localStorage.getItem('userId')
    const { data } = await api.get('/api/billing', { params: { userId } })
    setBills(data)
  }
  useEffect(()=>{ refresh() }, [])

  async function generate() {
    const api = getApi()
    const userId = localStorage.getItem('userId')
    const end = new Date()
    const start = new Date(); start.setDate(start.getDate()-30)
    await api.post('/api/billing/generate', null, {
      params: { userId, periodStart: start.toISOString(), periodEnd: end.toISOString() }
    })
    refresh()
  }

  return (
    <div>
      <h3>Bills</h3>
      <button onClick={generate}>Generate Bill (last 30 days)</button>
      <table style={{ width:'100%', marginTop: 12, borderCollapse:'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign:'left', borderBottom:'1px solid #ddd', padding:8 }}>ID</th>
            <th style={{ textAlign:'left', borderBottom:'1px solid #ddd', padding:8 }}>Period</th>
            <th style={{ textAlign:'left', borderBottom:'1px solid #ddd', padding:8 }}>Amount (₹)</th>
            <th style={{ textAlign:'left', borderBottom:'1px solid #ddd', padding:8 }}>Status</th>
            <th style={{ textAlign:'left', borderBottom:'1px solid #ddd', padding:8 }}>Action</th>
            <th style={{ textAlign:'left', borderBottom:'1px solid #ddd', padding:8 }}>Stripe</th>
          </tr>
        </thead>
        <tbody>
          {bills.map(b => (
            <tr key={b.id}>
              <td style={{ padding:8 }}>{b.id}</td>
              <td style={{ padding:8 }}>{new Date(b.periodStart).toLocaleDateString()} → {new Date(b.periodEnd).toLocaleDateString()}</td>
              <td style={{ padding:8 }}>{b.amount.toFixed(2)}</td>
              <td style={{ padding:8 }}>{b.status}</td>
              <td style={{ padding:8 }}>
                {b.status === 'DUE' ? <button onClick={async()=>{ await getApi().post('/api/payments/pay', null, { params: { billId: b.id } }); refresh(); }}>Mark Paid (Mock)</button> : '—'}
              </td>
              <td style={{ padding:8 }}>
                {b.status === 'DUE' ? <StripePayButton billId={b.id} /> : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
