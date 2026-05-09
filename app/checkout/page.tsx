'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function Checkout() {
  const [form, setForm] = useState({ name: '', phone: '', address: '', city: '' })
  const [cart, setCart] = useState<any[]>([])
  const [ordered, setOrdered] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCart = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href = '/login'; return }
      const { data } = await supabase
        .from('cart')
        .select('*, products(*)')
        .eq('user_id', user.id)
      setCart(data || [])
    }
    fetchCart()
  }, [])

  const total = cart.reduce((sum, item) => sum + (item.products.price * item.quantity), 0)

  const handleOrder = async () => {
    if (!form.name || !form.phone || !form.address || !form.city) {
      alert('Sab fields bharein!')
      return
    }
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()

    await supabase.from('orders').insert({
      user_id: user!.id,
      name: form.name,
      phone: form.phone,
      address: form.address,
      city: form.city,
      total: total,
      status: 'pending'
    })

    await supabase.from('cart').delete().eq('user_id', user!.id)

    setLoading(false)
    setOrdered(true)
  }

  if (ordered) {
    return (
      <main style={{fontFamily:'sans-serif',background:'#0f0e0c',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{background:'#22201f',borderRadius:'16px',padding:'40px',textAlign:'center',maxWidth:'400px'}}>
          <div style={{fontSize:'64px',marginBottom:'16px'}}>🎉</div>
          <h2 style={{color:'#f5a623',fontSize:'24px',fontWeight:800,marginBottom:'8px'}}>Order Ho Gaya!</h2>
          <p style={{color:'#8a8780',marginBottom:'24px'}}>Aapka order place ho gaya! Jald delivery hogi!</p>
          <a href="/orders" style={{display:'block',padding:'14px',background:'#f5a623',borderRadius:'10px',fontWeight:800,textDecoration:'none',color:'black',marginBottom:'12px'}}>
            Orders Dekhein 📦
          </a>
          <a href="/products" style={{display:'block',padding:'14px',background:'transparent',border:'1px solid #f5a623',borderRadius:'10px',fontWeight:800,textDecoration:'none',color:'#f5a623'}}>
            Aur Shopping Karein 🛒
          </a>
        </div>
      </main>
    )
  }

  return (
    <main style={{fontFamily:'sans-serif',background:'#0f0e0c',minHeight:'100vh',padding:'40px'}}>
      <div style={{maxWidth:'600px',margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'32px'}}>
          <h1 style={{color:'#f5a623',fontSize:'32px',fontWeight:800}}>Checkout</h1>
          <a href="/cart" style={{color:'#f5a623',textDecoration:'none',fontWeight:600}}>← Cart</a>
        </div>

        <div style={{background:'#22201f',borderRadius:'16px',padding:'32px'}}>
          <h3 style={{color:'white',fontWeight:700,marginBottom:'24px'}}>Delivery Details</h3>

          <input placeholder="Aapka Naam" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
            style={{width:'100%',padding:'14px',borderRadius:'10px',border:'1px solid #333',background:'#1a1a1a',color:'white',fontSize:'15px',marginBottom:'16px',boxSizing:'border-box'}} />
          <input placeholder="Phone Number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
            style={{width:'100%',padding:'14px',borderRadius:'10px',border:'1px solid #333',background:'#1a1a1a',color:'white',fontSize:'15px',marginBottom:'16px',boxSizing:'border-box'}} />
          <input placeholder="Ghar ka Address" value={form.address} onChange={e => setForm({...form, address: e.target.value})}
            style={{width:'100%',padding:'14px',borderRadius:'10px',border:'1px solid #333',background:'#1a1a1a',color:'white',fontSize:'15px',marginBottom:'16px',boxSizing:'border-box'}} />
          <input placeholder="City" value={form.city} onChange={e => setForm({...form, city: e.target.value})}
            style={{width:'100%',padding:'14px',borderRadius:'10px',border:'1px solid #333',background:'#1a1a1a',color:'white',fontSize:'15px',marginBottom:'24px',boxSizing:'border-box'}} />

          <div style={{background:'#1a1a1a',borderRadius:'10px',padding:'16px',marginBottom:'24px'}}>
            {cart.map(item => (
              <div key={item.id} style={{display:'flex',justifyContent:'space-between',marginBottom:'8px'}}>
                <span style={{color:'#8a8780'}}>{item.products.name} x{item.quantity}</span>
                <span style={{color:'white'}}>Rs. {(item.products.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div style={{display:'flex',justifyContent:'space-between',borderTop:'1px solid #333',paddingTop:'12px',marginTop:'8px'}}>
              <span style={{color:'white',fontWeight:700}}>Total</span>
              <span style={{color:'#f5a623',fontWeight:800,fontSize:'20px'}}>Rs. {total.toLocaleString()}</span>
            </div>
          </div>

          <button onClick={handleOrder} disabled={loading}
            style={{width:'100%',padding:'16px',borderRadius:'10px',background:'#f5a623',border:'none',fontWeight:800,fontSize:'18px',cursor:'pointer'}}>
            {loading ? 'Processing...' : 'Order Place Karein 🚀'}
          </button>
        </div>
      </div>
    </main>
  )
}