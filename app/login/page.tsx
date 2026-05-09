'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setMessage('❌ Error: ' + error.message)
    } else {
    window.location.href = '/dashboard'    }
  }

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setMessage('❌ Error: ' + error.message)
    } else {
      setMessage('✅ Signup successful! Email check karo.')
    }
  }

  return (
    <main style={{fontFamily:'sans-serif',background:'#0f0e0c',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{background:'#22201f',borderRadius:'16px',padding:'40px',width:'360px'}}>
        <h2 style={{fontSize:'28px',fontWeight:800,color:'#f5a623',marginBottom:'8px'}}>Bazar.pk</h2>
        <p style={{color:'#8a8780',marginBottom:'28px',fontSize:'14px'}}>Login ya signup karein</p>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
          style={{width:'100%',padding:'12px',borderRadius:'8px',border:'1px solid #333',background:'#1a1a1a',color:'white',marginBottom:'12px',boxSizing:'border-box'}} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
          style={{width:'100%',padding:'12px',borderRadius:'8px',border:'1px solid #333',background:'#1a1a1a',color:'white',marginBottom:'16px',boxSizing:'border-box'}} />
        <button onClick={handleLogin}
          style={{width:'100%',padding:'12px',borderRadius:'10px',background:'#f5a623',border:'none',fontWeight:700,fontSize:'16px',cursor:'pointer',marginBottom:'10px'}}>
          Login
        </button>
        <button onClick={handleSignup}
          style={{width:'100%',padding:'12px',borderRadius:'10px',background:'transparent',border:'1px solid #f5a623',color:'#f5a623',fontWeight:700,fontSize:'16px',cursor:'pointer'}}>
          Signup
        </button>
        {message && <p style={{marginTop:'16px',color:'#f5a623',textAlign:'center'}}>{message}</p>}
      </div>
    </main>
  )
}