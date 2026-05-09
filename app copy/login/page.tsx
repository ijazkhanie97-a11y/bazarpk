export default function Login() {
  return (
    <main style={{fontFamily:'sans-serif',background:'#0f0e0c',minHeight:'100vh',color:'#f0ede8',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{background:'#22201f',borderRadius:'16px',padding:'40px',width:'100%',maxWidth:'400px'}}>
        <h2 style={{fontSize:'28px',fontWeight:800,color:'#f5a623',marginBottom:'8px'}}>Bazar.pk</h2>
        <p style={{color:'#8a8780',marginBottom:'28px',fontSize:'14px'}}>Login karein</p>
        <input type="email" placeholder="Email" style={{width:'100%',padding:'12px',borderRadius:'10px',border:'1px solid rgba(255,255,255,0.1)',background:'#1a1916',color:'#f0ede8',fontSize:'14px',marginBottom:'12px',display:'block'}} />
        <input type="password" placeholder="Password" style={{width:'100%',padding:'12px',borderRadius:'10px',border:'1px solid rgba(255,255,255,0.1)',background:'#1a1916',color:'#f0ede8',fontSize:'14px',marginBottom:'16px',display:'block'}} />
        <button style={{width:'100%',padding:'12px',borderRadius:'10px',background:'#f5a623',color:'#0f0e0c',fontWeight:700,border:'none',cursor:'pointer'}}>Login</button>
      </div>
    </main>
  )
}