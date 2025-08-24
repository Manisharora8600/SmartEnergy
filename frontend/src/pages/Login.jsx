import React, { useState } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../lib/api'

export default function Login({ onAuthed }) {
  const [email, setEmail] = useState('demo@example.com')
  const [password, setPassword] = useState('password')
  const [mode, setMode] = useState('login')
  const [err, setErr] = useState('')

  async function submit(e) {
    e.preventDefault()
    setErr('')
    try {
      const url = mode === 'login' ? '/api/auth/login' : '/api/auth/register'
      const { data } = await axios.post(`${API_BASE_URL}${url}`, { email, password })
      if (data.error) { setErr(data.error); return }
      localStorage.setItem('token', data.token)
      localStorage.setItem('userId', data.userId)
      onAuthed({ token: data.token, userId: data.userId, email: data.email })
    } catch (e) {
      setErr('Failed. Check server logs.')
    }
  }

  return (
    <div style={{ maxWidth: 420, margin:'8rem auto', border:'1px solid #ddd', borderRadius:12, padding:24 }}>
      <h2>{mode==='login'?'Sign in':'Register'}</h2>
      <form onSubmit={submit}>
        <div><label>Email</label><br/><input value={email} onChange={e=>setEmail(e.target.value)} style={{ width:'100%' }} /></div>
        <div style={{ marginTop: 8 }}><label>Password</label><br/><input type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{ width:'100%' }} /></div>
        {err && <p style={{ color:'crimson' }}>{err}</p>}
        <button style={{ marginTop: 12 }} type="submit">{mode==='login'?'Login':'Create account'}</button>
        <button type="button" style={{ marginLeft: 8 }} onClick={()=>setMode(mode==='login'?'register':'login')}>Switch to {mode==='login'?'Register':'Login'}</button>
      </form>
    </div>
  )
}
