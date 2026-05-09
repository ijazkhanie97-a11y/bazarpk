'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href = '/login'; return }
      const { data } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      setOrders(data || [])
      setLoading(false)
    }
    fetchOrders()
  }, [])

  return (
    <main style={{fontFamily:'sans-serif',background:'#0f0e0c',minHeight:'100vh',padding:'40px'}}>
      <div style={{maxWidth:'700px',margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'32px'}}>
          <h1 style={{color:'#f5a623',fontSize:'32px',fontWeight:800}}>📦 My Orders</h1>
          <a href="/dashboard" style={{color:'#f5a623',textDecoration:'none',fontWeight:600}}>← Dashboard</a>
        </div>

        {loading ? (
          <p style={{color:'#8a8780',textAlign:'center'}}>Loading... ⏳</p>
        ) : orders.length === 0 ? (
          <div style={{background:'#22201f',borderRadius:'16px',padding:'40px',textAlign:'center'}}>
            <p style={{color:'#8a8780',fontSize:'18px'}}>Koi order nahi hai abhi! 😢</p>
            <a href="/products" style={{color:'#f5a623',fontWeight:700}}>Shopping Karein →</a>
          </div>
        ) : (
          orders.map(order => (
            <div key={order.id} style={{background:'#22201f',borderRadius:'16px',padding:'24px',marginBottom:'16px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'12px'}}>
                <h3 style={{color:'white',fontWeight:700}}>Order #{order.id}</h3>
                <span style={{background:'#f5a623',color:'black',padding:'4px 12px',borderRadius:'20px',fontSize:'13px',fontWeight:700}}>
                  {order.status}
                </span>
              </div>
              <p style={{color:'#8a8780',fontSize:'14px',marginBottom:'4px'}}>👤 {order.name}</p>
              <p style={{color:'#8a8780',fontSize:'14px',marginBottom:'4px'}}>📞 {order.phone}</p>
              <p style={{color:'#8a8780',fontSize:'14px',marginBottom:'4px'}}>📍 {order.address}, {order.city}</p>
              <div style={{borderTop:'1px solid #333',marginTop:'12px',paddingTop:'12px',display:'flex',justifyContent:'space-between'}}>
                <span style={{color:'#8a8780',fontSize:'13px'}}>{new Date(order.created_at).toLocaleDateString()}</span>
                <span style={{color:'#f5a623',fontWeight:800,fontSize:'18px'}}>Rs. {Number(order.total).toLocaleString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  )
}