'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <main style={{fontFamily:'sans-serif',background:'#0f0e0c',minHeight:'100vh',padding:'40px'}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'40px'}}>
          <h1 style={{color:'#f5a623',fontSize:'32px',fontWeight:800}}>Bazar.pk</h1>
          <button onClick={handleLogout}
            style={{padding:'10px 20px',background:'transparent',border:'1px solid #f5a623',color:'#f5a623',borderRadius:'8px',cursor:'pointer',fontWeight:600}}>
            Logout
          </button>
        </div>

        <div style={{background:'#22201f',borderRadius:'16px',padding:'30px',marginBottom:'24px'}}>
          <h2 style={{color:'white',fontSize:'20px',marginBottom:'8px'}}>Welcome! 👋</h2>
          <p style={{color:'#8a8780'}}>{user ? user.email : 'Loading...'}</p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px'}}>
          <a href="/products" style={{textDecoration:'none'}}>
            <div style={{background:'#22201f',borderRadius:'16px',padding:'24px',textAlign:'center',border:'1px solid #333'}}>
              <div style={{fontSize:'40px',marginBottom:'8px'}}>🛍️</div>
              <h3 style={{color:'#f5a623',fontWeight:700}}>Products</h3>
              <p style={{color:'#8a8780',fontSize:'13px',marginTop:'4px'}}>Sab products dekhein</p>
            </div>
          </a>
          <a href="/cart" style={{textDecoration:'none'}}>
            <div style={{background:'#22201f',borderRadius:'16px',padding:'24px',textAlign:'center',border:'1px solid #333'}}>
              <div style={{fontSize:'40px',marginBottom:'8px'}}>🛒</div>
              <h3 style={{color:'#f5a623',fontWeight:700}}>Cart</h3>
              <p style={{color:'#8a8780',fontSize:'13px',marginTop:'4px'}}>Apna cart dekhein</p>
            </div>
          </a>
          <a href="/orders" style={{textDecoration:'none'}}>
            <div style={{background:'#22201f',borderRadius:'16px',padding:'24px',textAlign:'center',border:'1px solid #333'}}>
              <div style={{fontSize:'40px',marginBottom:'8px'}}>📦</div>
              <h3 style={{color:'#f5a623',fontWeight:700}}>My Orders</h3>
              <p style={{color:'#8a8780',fontSize:'13px',marginTop:'4px'}}>Orders track karein</p>
            </div>
          </a>
          <a href="/checkout" style={{textDecoration:'none'}}>
            <div style={{background:'#22201f',borderRadius:'16px',padding:'24px',textAlign:'center',border:'1px solid #333'}}>
              <div style={{fontSize:'40px',marginBottom:'8px'}}>🚀</div>
              <h3 style={{color:'#f5a623',fontWeight:700}}>Checkout</h3>
              <p style={{color:'#8a8780',fontSize:'13px',marginTop:'4px'}}>Order complete karein</p>
            </div>
          </a>
          <a href="/seller" style={{textDecoration:'none'}}>
            <div style={{background:'#22201f',borderRadius:'16px',padding:'24px',textAlign:'center',border:'1px solid #333'}}>
              <div style={{fontSize:'40px',marginBottom:'8px'}}>🏪</div>
              <h3 style={{color:'#f5a623',fontWeight:700}}>Seller Panel</h3>
              <p style={{color:'#8a8780',fontSize:'13px',marginTop:'4px'}}>Products add karein</p>
            </div>
          </a>
          <a href="/products" style={{textDecoration:'none'}}>
            <div style={{background:'#22201f',borderRadius:'16px',padding:'24px',textAlign:'center',border:'1px solid #333'}}>
              <div style={{fontSize:'40px',marginBottom:'8px'}}>🔍</div>
              <h3 style={{color:'#f5a623',fontWeight:700}}>Search</h3>
              <p style={{color:'#8a8780',fontSize:'13px',marginTop:'4px'}}>Products search karein</p>
            </div>
          </a>
        </div>
      </div>
    </main>
  )
}