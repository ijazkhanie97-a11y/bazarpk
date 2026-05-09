'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

const categories = ['All', 'Mobile', 'Laptop', 'Shoes', 'Clothes', 'Sports', 'Electronics']

export default function Products() {
  const [products, setProducts] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState<number | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from('products').select('*')
      setProducts(data || [])
      setLoading(false)
    }
    fetchProducts()
  }, [])

  const addToCart = async (productId: number) => {
    setAdding(productId)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      alert('Pehle login karein!')
      window.location.href = '/login'
      return
    }
    const { error } = await supabase.from('cart').insert({
      user_id: user.id,
      product_id: productId,
      quantity: 1
    })
    if (error) {
      alert('Error: ' + error.message)
    } else {
      alert('✅ Cart mein add ho gaya!')
    }
    setAdding(null)
  }

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'All' || p.category === category
    return matchSearch && matchCategory
  })

  return (
    <main style={{fontFamily:'sans-serif',background:'#0f0e0c',minHeight:'100vh',padding:'40px'}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'32px'}}>
          <h1 style={{color:'#f5a623',fontSize:'32px',fontWeight:800}}>Bazar.pk</h1>
          <div style={{display:'flex',gap:'12px'}}>
            <a href="/cart" style={{color:'#f5a623',textDecoration:'none',fontWeight:600}}>🛒 Cart</a>
            <a href="/dashboard" style={{color:'#f5a623',textDecoration:'none',fontWeight:600}}>← Dashboard</a>
          </div>
        </div>

        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{width:'100%',padding:'14px',borderRadius:'10px',border:'1px solid #333',background:'#22201f',color:'white',fontSize:'16px',marginBottom:'16px',boxSizing:'border-box'}}
        />

        <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'24px'}}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              style={{padding:'8px 16px',borderRadius:'20px',border:'none',cursor:'pointer',fontWeight:600,fontSize:'14px',
                background: category === cat ? '#f5a623' : '#22201f',
                color: category === cat ? 'black' : '#8a8780'}}>
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{color:'#8a8780',textAlign:'center'}}>Loading... ⏳</p>
        ) : (
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px'}}>
            {filtered.map(p => (
              <div key={p.id} style={{background:'#22201f',borderRadius:'16px',padding:'24px',textAlign:'center'}}>
                <div style={{fontSize:'48px',marginBottom:'12px'}}>{p.image}</div>
                <h3 style={{color:'white',fontSize:'16px',fontWeight:700,marginBottom:'8px'}}>{p.name}</h3>
                <p style={{color:'#8a8780',fontSize:'13px',marginBottom:'12px'}}>{p.category}</p>
                <p style={{color:'#f5a623',fontSize:'20px',fontWeight:800}}>Rs. {Number(p.price).toLocaleString()}</p>
                <button
                  onClick={() => addToCart(p.id)}
                  disabled={adding === p.id}
                  style={{marginTop:'12px',width:'100%',padding:'10px',borderRadius:'8px',background:'#f5a623',border:'none',fontWeight:700,cursor:'pointer'}}>
                  {adding === p.id ? 'Adding...' : 'Add to Cart 🛒'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}