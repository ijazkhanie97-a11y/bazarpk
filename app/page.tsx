'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
export default function Products() {
  const [products, setProducts] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from('products').select('*')
      setProducts(data || [])
      setLoading(false)
    }
    fetchProducts()
  }, [])
  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
  return (
    <main style={{fontFamily:'sans-serif',background:'#0f0e0c',minHeight:'100vh',padding:'40px'}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'32px'}}>
          <h1 style={{color:'#f5a623',fontSize:'32px',fontWeight:800}}>Bazar.pk</h1>
          <a href="/dashboard" style={{color:'#f5a623',textDecoration:'none',fontWeight:600}}>← Dashboard</a>
        </div>
        <input type="text" placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)} style={{width:'100%',padding:'14px',borderRadius:'10px',border:'1px solid #333',background:'#22201f',color:'white',marginBottom:'24px',boxSizing:'border-box'}}/>
        {loading?<p style={{color:'white'}}>Loading...</p>:<div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px'}}>{filtered.map(p=><div key={p.id} style={{background:'#22201f',borderRadius:'16px',padding:'24px',textAlign:'center'}}><div style={{fontSize:'48px'}}>{p.image}</div><h3 style={{color:'white'}}>{p.name}</h3><p style={{color:'#8a8780'}}>{p.category}</p><p style={{color:'#f5a623',fontWeight:800}}>Rs. {Number(p.price).toLocaleString()}</p><button style={{marginTop:'12px',width:'100%',padding:'10px',borderRadius:'8px',background:'#f5a623',border:'none',fontWeight:700,cursor:'pointer'}}>Add to Cart</button></div>)}</div>}
      </div>
    </main>
  )
}