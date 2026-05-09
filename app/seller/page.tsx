'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Seller() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.category || !form.image) {
      setMessage('❌ Sab fields bharein!')
      return
    }
    setLoading(true)
    const { error } = await supabase.from('products').insert({
      name: form.name,
      price: Number(form.price),
      category: form.category,
      image: form.image,
    })
    if (error) {
      setMessage('❌ Error: ' + error.message)
    } else {
      setMessage('✅ Product add ho gaya!')
      setForm({ name: '', price: '', category: '', image: '' })
    }
    setLoading(false)
  }

  return (
    <main style={{fontFamily:'sans-serif',background:'#0f0e0c',minHeight:'100vh',padding:'40px'}}>
      <div style={{maxWidth:'600px',margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'32px'}}>
          <h1 style={{color:'#f5a623',fontSize:'32px',fontWeight:800}}>Seller Panel</h1>
          <a href="/dashboard" style={{color:'#f5a623',textDecoration:'none',fontWeight:600}}>← Dashboard</a>
        </div>

        <div style={{background:'#22201f',borderRadius:'16px',padding:'32px'}}>
          <h3 style={{color:'white',fontWeight:700,marginBottom:'24px'}}>Naya Product Add Karein</h3>

          <input
            placeholder="Product ka Naam"
            value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
            style={{width:'100%',padding:'14px',borderRadius:'10px',border:'1px solid #333',background:'#1a1a1a',color:'white',fontSize:'15px',marginBottom:'16px',boxSizing:'border-box'}}
          />
          <input
            placeholder="Price (Rs.)"
            value={form.price}
            onChange={e => setForm({...form, price: e.target.value})}
            style={{width:'100%',padding:'14px',borderRadius:'10px',border:'1px solid #333',background:'#1a1a1a',color:'white',fontSize:'15px',marginBottom:'16px',boxSizing:'border-box'}}
          />
          <input
            placeholder="Category (e.g. Mobile, Laptop)"
            value={form.category}
            onChange={e => setForm({...form, category: e.target.value})}
            style={{width:'100%',padding:'14px',borderRadius:'10px',border:'1px solid #333',background:'#1a1a1a',color:'white',fontSize:'15px',marginBottom:'16px',boxSizing:'border-box'}}
          />
          <input
            placeholder="Emoji Image (e.g. 📱 💻 👟)"
            value={form.image}
            onChange={e => setForm({...form, image: e.target.value})}
            style={{width:'100%',padding:'14px',borderRadius:'10px',border:'1px solid #333',background:'#1a1a1a',color:'white',fontSize:'15px',marginBottom:'24px',boxSizing:'border-box'}}
          />

          <button onClick={handleSubmit} disabled={loading}
            style={{width:'100%',padding:'16px',borderRadius:'10px',background:'#f5a623',border:'none',fontWeight:800,fontSize:'18px',cursor:'pointer'}}>
            {loading ? 'Adding...' : 'Product Add Karein 🚀'}
          </button>

          {message && <p style={{marginTop:'16px',color:'#f5a623',textAlign:'center',fontWeight:600}}>{message}</p>}
        </div>
      </div>
    </main>
  )
}