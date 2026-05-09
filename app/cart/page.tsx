'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function Cart() {
  const [cart, setCart] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { window.location.href = '/login'; return }

    const { data } = await supabase
      .from('cart')
      .select('*, products(*)')
      .eq('user_id', user.id)

    setCart(data || [])
    setLoading(false)
  }

  const remove = async (id: number) => {
    await supabase.from('cart').delete().eq('id', id)
    fetchCart()
  }

  const increase = async (id: number, qty: number) => {
    await supabase.from('cart').update({ quantity: qty + 1 }).eq('id', id)
    fetchCart()
  }

  const decrease = async (id: number, qty: number) => {
    if (qty <= 1) return
    await supabase.from('cart').update({ quantity: qty - 1 }).eq('id', id)
    fetchCart()
  }

  const total = cart.reduce((sum, item) => sum + (item.products.price * item.quantity), 0)

  return (
    <main style={{fontFamily:'sans-serif',background:'#0f0e0c',minHeight:'100vh',padding:'40px'}}>
      <div style={{maxWidth:'700px',margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'32px'}}>
          <h1 style={{color:'#f5a623',fontSize:'32px',fontWeight:800}}>🛒 Cart</h1>
          <a href="/products" style={{color:'#f5a623',textDecoration:'none',fontWeight:600}}>← Products</a>
        </div>

        {loading ? (
          <p style={{color:'#8a8780',textAlign:'center'}}>Loading... ⏳</p>
        ) : cart.length === 0 ? (
          <div style={{background:'#22201f',borderRadius:'16px',padding:'40px',textAlign:'center'}}>
            <p style={{color:'#8a8780',fontSize:'18px'}}>Cart khali hai! 😢</p>
            <a href="/products" style={{color:'#f5a623',fontWeight:700}}>Products dekhein →</a>
          </div>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.id} style={{background:'#22201f',borderRadius:'16px',padding:'20px',marginBottom:'16px',display:'flex',alignItems:'center',gap:'16px'}}>
                <div style={{fontSize:'40px'}}>{item.products.image}</div>
                <div style={{flex:1}}>
                  <h3 style={{color:'white',fontWeight:700,marginBottom:'4px'}}>{item.products.name}</h3>
                  <p style={{color:'#f5a623',fontWeight:800}}>Rs. {(item.products.price * item.quantity).toLocaleString()}</p>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                  <button onClick={() => decrease(item.id, item.quantity)} style={{width:'32px',height:'32px',borderRadius:'8px',background:'#333',color:'white',border:'none',fontSize:'18px',cursor:'pointer'}}>-</button>
                  <span style={{color:'white',fontWeight:700,minWidth:'24px',textAlign:'center'}}>{item.quantity}</span>
                  <button onClick={() => increase(item.id, item.quantity)} style={{width:'32px',height:'32px',borderRadius:'8px',background:'#333',color:'white',border:'none',fontSize:'18px',cursor:'pointer'}}>+</button>
                </div>
                <button onClick={() => remove(item.id)} style={{background:'transparent',border:'none',color:'#ff4444',fontSize:'20px',cursor:'pointer'}}>🗑️</button>
              </div>
            ))}

            <div style={{background:'#22201f',borderRadius:'16px',padding:'24px',marginTop:'24px'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'16px'}}>
                <span style={{color:'#8a8780',fontSize:'16px'}}>Total:</span>
                <span style={{color:'#f5a623',fontSize:'24px',fontWeight:800}}>Rs. {total.toLocaleString()}</span>
              </div>
              <a href="/checkout">
                <button style={{width:'100%',padding:'14px',borderRadius:'10px',background:'#f5a623',border:'none',fontWeight:800,fontSize:'16px',cursor:'pointer'}}>
                  Checkout کریں 🚀
                </button>
              </a>
            </div>
          </>
        )}
      </div>
    </main>
  )
}