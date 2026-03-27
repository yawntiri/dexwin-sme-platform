import { useState, useEffect } from 'react'
import {
  QrCode, Search, ShoppingBag, Clock, CheckCircle, X, Send,
  Plus, Minus, History, Settings, Zap, ArrowRight, RefreshCw,
  AlertTriangle, Smartphone, Banknote, HeartPulse
} from 'lucide-react'

const NAV = [
  { id: 'checkout',  label: 'New Transaction', Icon: ShoppingBag },
  { id: 'history',   label: 'Settlement History', Icon: History },
  { id: 'catalog',   label: 'Service Catalog', Icon: Settings },
]

const MOCK_EMPLOYEES = [
  { id:'EMP-001', name:'Kofi Asante',   walletBal:'GHS 500.00', dept:'Engineering', photo:'KA' },
  { id:'EMP-004', name:'Ama Owusu',     walletBal:'GHS 290.00', dept:'Sales', photo:'AO' },
  { id:'EMP-005', name:'Yaw Darko',     walletBal:'GHS 0.00',   dept:'Marketing', photo:'YD' },
  { id:'EMP-008', name:'Akua Frimpong', walletBal:'GHS 320.00', dept:'Finance', photo:'AF' },
]

const CATALOG = [
  { id:'SVC-01', name:'Consultation Fee',    price:120, cat:'Medical' },
  { id:'SVC-02', name:'Lab Tests',           price:280, cat:'Diagnostic' },
  { id:'SVC-03', name:'Pharmacy — Dispensed',price:95,  cat:'Pharmacy' },
  { id:'SVC-04', name:'X-Ray',               price:350, cat:'Diagnostic' },
  { id:'SVC-05', name:'Dental Examination',  price:150, cat:'Dental' },
  { id:'SVC-06', name:'Optical Test',        price:200, cat:'Optical' },
  { id:'SVC-07', name:'Physiotherapy',       price:175, cat:'Wellness' },
  { id:'SVC-08', name:'Vaccination',         price:80,  cat:'Preventive' },
]

const HISTORY = [
  { id:'STL-2291', date:'27 Mar 2026 10:14', emp:'Kofi Asante', services:'Consultation + Lab Tests', amount:'GHS 400.00', status:'settled' },
  { id:'STL-2290', date:'26 Mar 2026 15:32', emp:'Ama Owusu', services:'Pharmacy', amount:'GHS 95.00', status:'settled' },
  { id:'STL-2289', date:'25 Mar 2026 09:05', emp:'Akua Frimpong', services:'X-Ray + Consultation', amount:'GHS 470.00', status:'settled' },
  { id:'STL-2288', date:'24 Mar 2026 14:20', emp:'Yaw Darko', services:'Dental Examination', amount:'GHS 150.00', status:'failed' },
  { id:'STL-2287', date:'23 Mar 2026 11:45', emp:'Kofi Asante', services:'Optical Test', amount:'GHS 200.00', status:'settled' },
]

// Simulated real-time approval flow
function PaymentRequestModal({ employee, cart, total, onClose, onComplete }) {
  const [stage, setStage] = useState('sending') // sending → waiting → approved → done

  useEffect(() => {
    const t1 = setTimeout(()=>setStage('waiting'), 1500)
    const t2 = setTimeout(()=>setStage('approved'), 5000)
    const t3 = setTimeout(()=>{ setStage('done'); onComplete() }, 6500)
    return ()=>{ clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <span className="modal-title">Payment Request</span>
          {stage==='done'&&<button className="modal-close" onClick={onClose}><X/></button>}
        </div>

        <div style={{textAlign:'center',padding:'20px 0'}}>
          {stage==='sending' && <>
            <div style={{width:60,height:60,borderRadius:50,background:'var(--purple-dim)',border:'2px solid rgba(167,139,250,0.3)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px'}}>
              <Send size={24} style={{color:'var(--purple)'}}/>
            </div>
            <div style={{fontFamily:'Outfit',fontWeight:700,fontSize:15,marginBottom:4}}>Sending to Employee App…</div>
            <div className="text-secondary text-sm">Contacting {employee.name}'s device</div>
            <div className="animate-spin" style={{width:24,height:24,border:'2px solid var(--border-strong)',borderTop:'2px solid var(--purple)',borderRadius:50,margin:'16px auto 0'}}/>
          </>}

          {stage==='waiting' && <>
            <div style={{width:60,height:60,borderRadius:50,background:'var(--amber-dim)',border:'2px solid rgba(245,158,11,0.3)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px'}}>
              <Smartphone size={24} style={{color:'var(--amber)'}}/>
            </div>
            <div style={{fontFamily:'Outfit',fontWeight:700,fontSize:15,marginBottom:4}}>Awaiting Approval</div>
            <div className="text-secondary text-sm">{employee.name} is reviewing the payment request</div>
            <div style={{marginTop:16,padding:'12px 16px',background:'var(--amber-dim)',border:'1px solid rgba(245,158,11,0.25)',borderRadius:8}}>
              <div style={{fontFamily:'IBM Plex Mono',fontWeight:500,fontSize:20,color:'var(--amber)'}}>GHS {total.toFixed(2)}</div>
              <div className="text-xs text-muted mt-1">{cart.length} service{cart.length!==1?'s':''}</div>
            </div>
            <div className="animate-pulse" style={{marginTop:12,fontSize:12,color:'var(--amber)'}}>● Waiting for approval…</div>
          </>}

          {(stage==='approved'||stage==='done') && <>
            <div style={{width:60,height:60,borderRadius:50,background:'var(--green-dim)',border:'2px solid rgba(34,197,94,0.3)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px'}}>
              <CheckCircle size={24} style={{color:'var(--green)'}}/>
            </div>
            <div style={{fontFamily:'Outfit',fontWeight:700,fontSize:15,marginBottom:4,color:'var(--green)'}}>Payment Approved!</div>
            <div className="text-secondary text-sm">{employee.name} approved the payment</div>
            <div style={{marginTop:16,padding:'12px 16px',background:'var(--green-dim)',border:'1px solid rgba(34,197,94,0.25)',borderRadius:8}}>
              <div style={{fontFamily:'IBM Plex Mono',fontWeight:500,fontSize:20,color:'var(--green)'}}>GHS {total.toFixed(2)}</div>
              <div className="text-xs text-secondary mt-1">Debited from Health Wallet</div>
            </div>
            <div className="mt-3">
              <div className="stat-row"><span className="stat-label">Transaction ID</span><span className="stat-value td-mono text-xs">STL-{2292}</span></div>
              <div className="stat-row"><span className="stat-label">Settlement</span><span className="stat-value text-green text-xs">Within 1 business day</span></div>
            </div>
          </>}
        </div>

        {(stage==='approved'||stage==='done') && (
          <div className="modal-actions">
            <button className="btn btn-primary w-full" onClick={onClose}><CheckCircle/>Done — New Transaction</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function POSMode() {
  const [nav, setNav] = useState('checkout')
  const [step, setStep] = useState(1) // 1=lookup, 2=services, 3=confirm
  const [searchQ, setSearchQ] = useState('')
  const [lookupMode, setLookupMode] = useState('name')
  const [selectedEmp, setSelectedEmp] = useState(null)
  const [cart, setCart] = useState([])
  const [showPayment, setShowPayment] = useState(false)
  const [lastTxn, setLastTxn] = useState(null)

  const filteredEmps = searchQ.length>1
    ? MOCK_EMPLOYEES.filter(e=>e.name.toLowerCase().includes(searchQ.toLowerCase())||e.id.toLowerCase().includes(searchQ.toLowerCase()))
    : []

  const total = cart.reduce((s,i)=>s+i.price*i.qty, 0)

  const addToCart = (svc) => {
    setCart(c=>{
      const ex = c.find(i=>i.id===svc.id)
      if(ex) return c.map(i=>i.id===svc.id?{...i,qty:i.qty+1}:i)
      return [...c, {...svc,qty:1}]
    })
  }

  const removeFromCart = (id) => setCart(c=>c.map(i=>i.id===id&&i.qty>1?{...i,qty:i.qty-1}:i).filter(i=>i.qty>0))

  const reset = () => { setStep(1); setSelectedEmp(null); setCart([]); setSearchQ(''); setShowPayment(false); setLastTxn(null) }

  return (
    <>
      <aside className="sidebar">
        <div className="sidebar-section">
          <div className="sidebar-label">POS Terminal</div>
          {NAV.map(({ id, label, Icon }) => (
            <div key={id} className={`nav-item ${nav===id?'active p-nav':''}`} onClick={()=>setNav(id)}>
              <Icon/>{label}
            </div>
          ))}
        </div>
        <div className="sidebar-section" style={{marginTop:'auto'}}>
          <div style={{background:'var(--purple-dim)',border:'1px solid rgba(167,139,250,0.2)',borderRadius:8,padding:'10px 12px'}}>
            <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:4}}>
              <div style={{width:8,height:8,borderRadius:50,background:'var(--green)'}} className="animate-pulse"/>
              <span style={{fontSize:11,fontFamily:'Outfit',fontWeight:600,color:'var(--green)'}}>Terminal Online</span>
            </div>
            <div className="text-xs text-muted">Trust Hospital — Accra</div>
            <div className="td-mono text-xs text-secondary">MID-00421-GH</div>
          </div>
        </div>
      </aside>

      <main className="content">
        {nav==='checkout' && (
          <>
            <div className="page-header">
              <div>
                <div className="page-title">HealthWallet POS</div>
                <div className="page-subtitle">Employee health wallet payments · Real-time approval</div>
              </div>
              {(step>1||selectedEmp) && <button className="btn btn-outline btn-sm" onClick={reset}><RefreshCw/>New Transaction</button>}
            </div>

            {/* Step breadcrumb */}
            <div className="flex items-center gap-3 mb-5">
              {['Employee Lookup','Select Services','Confirm & Request'].map((s,i)=>(
                <div key={s} className="flex items-center gap-2">
                  <div style={{width:22,height:22,borderRadius:50,background:step>i+1?'var(--green-dim)':step===i+1?'var(--purple-dim)':'var(--surface-4)',border:`1.5px solid ${step>i+1?'rgba(34,197,94,0.3)':step===i+1?'rgba(167,139,250,0.3)':'var(--border)'}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontFamily:'Outfit',fontWeight:700,color:step>i+1?'var(--green)':step===i+1?'var(--purple)':'var(--text-muted)'}}>
                    {step>i+1?<CheckCircle size={11}/>:i+1}
                  </div>
                  <span style={{fontSize:12,fontFamily:'Outfit',fontWeight:step===i+1?600:400,color:step===i+1?'var(--text-primary)':'var(--text-muted)'}}>{s}</span>
                  {i<2&&<ArrowRight size={12} style={{color:'var(--text-muted)'}}/>}
                </div>
              ))}
            </div>

            {/* Step 1: Employee Lookup */}
            {step===1 && (
              <div className="grid-2">
                <div className="card">
                  <div className="section-header"><span className="section-title">Find Employee</span></div>
                  {/* Lookup mode selector */}
                  <div className="tabs" style={{marginBottom:16}}>
                    {['name','id','qr'].map(m=>(
                      <div key={m} className={`tab-item ${lookupMode===m?'active':''}`} style={{textTransform:'capitalize'}} onClick={()=>setLookupMode(m)}>
                        {m==='qr'?'QR Code':m==='id'?'Employee ID':'Name Search'}
                      </div>
                    ))}
                  </div>

                  {(lookupMode==='name'||lookupMode==='id') && (
                    <div className="search-bar" style={{marginBottom:16}}>
                      <Search/><input placeholder={lookupMode==='id'?'Enter employee ID (e.g. EMP-001)…':'Search by name…'}
                        value={searchQ} onChange={e=>setSearchQ(e.target.value)} autoFocus/>
                    </div>
                  )}

                  {lookupMode==='qr' && (
                    <div style={{textAlign:'center',padding:'24px 0'}}>
                      <div style={{width:130,height:130,border:'2px dashed var(--border-strong)',borderRadius:12,display:'inline-flex',alignItems:'center',justifyContent:'center',marginBottom:12}}>
                        <QrCode size={52} style={{color:'var(--text-muted)',opacity:.5}}/>
                      </div>
                      <div className="text-secondary text-sm">Point camera at employee QR code</div>
                      <div className="text-xs text-muted mt-1">Or use the Employee App digital staff ID</div>
                    </div>
                  )}

                  {/* Results */}
                  {filteredEmps.length>0 && (
                    <div className="flex-col gap-2">
                      {filteredEmps.map(e=>(
                        <div key={e.id} className="employee-card" onClick={()=>{setSelectedEmp(e);setStep(2)}}>
                          <div className="emp-avatar">{e.photo}</div>
                          <div style={{flex:1}}>
                            <div className="emp-name">{e.name}</div>
                            <div className="emp-detail">{e.id} · {e.dept}</div>
                          </div>
                          <div style={{textAlign:'right'}}>
                            <div className="text-xs text-muted">Health Wallet</div>
                            <div className={`td-mono text-sm font-semibold ${e.walletBal==='GHS 0.00'?'text-red':'text-green'}`}>{e.walletBal}</div>
                          </div>
                          <ArrowRight size={14} style={{color:'var(--text-muted)'}}/>
                        </div>
                      ))}
                    </div>
                  )}

                  {searchQ.length>1 && filteredEmps.length===0 && (
                    <div className="text-center text-muted text-sm" style={{padding:'24px 0'}}>No employees found for "{searchQ}"</div>
                  )}
                </div>

                {/* Right: recent lookups */}
                <div className="card">
                  <div className="section-header"><span className="section-title">Recent Transactions</span></div>
                  {HISTORY.slice(0,4).map(h=>(
                    <div className="stat-row" key={h.id}>
                      <div>
                        <div style={{fontWeight:500,fontSize:12}}>{h.emp}</div>
                        <div className="text-xs text-muted">{h.services} · {h.date}</div>
                      </div>
                      <div style={{textAlign:'right'}}>
                        <div className="td-mono text-sm font-semibold">{h.amount}</div>
                        <span className={`badge ${h.status==='settled'?'badge-green':'badge-red'}`}>{h.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Service Selection */}
            {step===2 && selectedEmp && (
              <div className="grid-2-1">
                <div>
                  {/* Employee confirmed */}
                  <div className="card card-sm mb-3" style={{background:'var(--purple-dim)',border:'1px solid rgba(167,139,250,0.2)'}}>
                    <div className="flex items-center gap-3">
                      <div className="emp-avatar" style={{background:'var(--surface-4)'}}>{selectedEmp.photo}</div>
                      <div style={{flex:1}}>
                        <div className="emp-name">{selectedEmp.name}</div>
                        <div className="emp-detail">{selectedEmp.id} · {selectedEmp.dept}</div>
                      </div>
                      <div style={{textAlign:'right'}}>
                        <div className="text-xs text-muted">Available</div>
                        <div className={`td-mono font-semibold ${selectedEmp.walletBal==='GHS 0.00'?'text-red':'text-green'}`}>{selectedEmp.walletBal}</div>
                      </div>
                      <button className="btn btn-ghost btn-sm" onClick={()=>{setSelectedEmp(null);setStep(1);setSearchQ('')}}><X/></button>
                    </div>
                  </div>

                  {/* Service catalog */}
                  <div className="card">
                    <div className="section-header"><span className="section-title">Select Services</span><span className="text-xs text-secondary">Tap to add</span></div>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
                      {CATALOG.map(svc=>{
                        const inCart = cart.find(i=>i.id===svc.id)
                        return (
                          <div key={svc.id} className={`service-item ${inCart?'selected':''}`} onClick={()=>addToCart(svc)}>
                            <div>
                              <div style={{fontFamily:'Outfit',fontWeight:600,fontSize:12}}>{svc.name}</div>
                              <div className="text-xs text-muted">{svc.cat}</div>
                            </div>
                            <div style={{textAlign:'right'}}>
                              <div className="td-mono font-semibold" style={{fontSize:13}}>GHS {svc.price}</div>
                              {inCart && <span className="badge badge-purple" style={{fontSize:9,padding:'1px 5px'}}>{inCart.qty}×</span>}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Cart */}
                <div className="card" style={{position:'sticky',top:0}}>
                  <div className="section-header"><span className="section-title">Order Summary</span></div>
                  {cart.length===0 ? (
                    <div style={{textAlign:'center',padding:'32px 0',color:'var(--text-muted)'}}>
                      <ShoppingBag size={28} style={{opacity:.3,margin:'0 auto 8px'}}/>
                      <div className="text-xs">No services selected</div>
                    </div>
                  ) : (
                    <div className="flex-col gap-0">
                      {cart.map(item=>(
                        <div key={item.id} className="stat-row">
                          <div>
                            <div style={{fontSize:12,fontWeight:500}}>{item.name}</div>
                            <div className="text-xs text-muted">GHS {item.price} × {item.qty}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="td-mono text-sm font-semibold">GHS {(item.price*item.qty).toFixed(2)}</span>
                            <div className="flex gap-1">
                              <button className="icon-btn" style={{width:20,height:20}} onClick={()=>removeFromCart(item.id)}><Minus size={9}/></button>
                              <button className="icon-btn" style={{width:20,height:20}} onClick={()=>addToCart(item)}><Plus size={9}/></button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="divider"/>
                  <div className="flex items-center justify-between mb-3">
                    <span style={{fontFamily:'Outfit',fontWeight:700,fontSize:13}}>Total</span>
                    <span style={{fontFamily:'IBM Plex Mono',fontWeight:700,fontSize:18,color:'var(--purple)'}}>GHS {total.toFixed(2)}</span>
                  </div>

                  {total > parseFloat(selectedEmp.walletBal.replace(/[^0-9.]/g,'')) && (
                    <div className="alert alert-red mb-3" style={{padding:'8px 10px',fontSize:11}}>
                      <AlertTriangle size={13}/>Insufficient health wallet balance
                    </div>
                  )}

                  <button
                    className="btn btn-primary w-full btn-lg"
                    disabled={cart.length===0||total>parseFloat(selectedEmp.walletBal.replace(/[^0-9.]/g,''))}
                    onClick={()=>setStep(3)}
                    style={{background:'var(--purple)',borderColor:'var(--purple)'}}
                  >
                    <Send/>Request Payment
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Confirm */}
            {step===3 && selectedEmp && (
              <div style={{maxWidth:520,margin:'0 auto'}}>
                <div className="card mb-3">
                  <div className="section-header"><span className="section-title">Confirm Payment Request</span></div>
                  <div className="flex items-center gap-3 mb-4" style={{padding:'12px',background:'var(--surface-2)',borderRadius:8}}>
                    <div className="emp-avatar">{selectedEmp.photo}</div>
                    <div>
                      <div className="emp-name">{selectedEmp.name}</div>
                      <div className="emp-detail">{selectedEmp.id}</div>
                    </div>
                    <div style={{marginLeft:'auto',textAlign:'right'}}>
                      <div className="text-xs text-muted">Health Wallet</div>
                      <div className="td-mono text-green font-semibold">{selectedEmp.walletBal}</div>
                    </div>
                  </div>

                  {cart.map(item=>(
                    <div className="stat-row" key={item.id}>
                      <span className="stat-label">{item.name} ×{item.qty}</span>
                      <span className="stat-value font-mono">GHS {(item.price*item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="divider"/>
                  <div className="flex items-center justify-between">
                    <span style={{fontFamily:'Outfit',fontWeight:700}}>Total Charge</span>
                    <span style={{fontFamily:'IBM Plex Mono',fontWeight:700,fontSize:20,color:'var(--purple)'}}>GHS {total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="alert alert-blue mb-3">
                  <Smartphone/>
                  <div>A payment approval request will be sent to <strong>{selectedEmp.name}</strong>'s Employee App. They must approve within 2 minutes.</div>
                </div>

                <div className="flex gap-3">
                  <button className="btn btn-outline w-full" onClick={()=>setStep(2)}>Back</button>
                  <button
                    className="btn w-full btn-lg"
                    style={{background:'var(--purple)',borderColor:'var(--purple)',color:'white'}}
                    onClick={()=>setShowPayment(true)}
                  >
                    <Send/>Send Request to Employee
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {nav==='history' && <SettlementHistory/>}
        {nav==='catalog' && <CatalogManager/>}
      </main>

      {showPayment && selectedEmp && (
        <PaymentRequestModal
          employee={selectedEmp}
          cart={cart}
          total={total}
          onClose={reset}
          onComplete={()=>setLastTxn({id:'STL-2292',amount:total})}
        />
      )}
    </>
  )
}

function SettlementHistory() {
  return (
    <>
      <div className="page-header">
        <div><div className="page-title">Settlement History</div><div className="page-subtitle">All HealthWallet POS transactions · Trust Hospital</div></div>
        <div className="flex gap-2 items-center">
          <div className="search-bar" style={{width:220}}><Search/><input placeholder="Search transactions…"/></div>
        </div>
      </div>
      <div className="grid-4 mb-4">
        {[
          {label:'Transactions (MTD)',val:'47',color:'var(--purple)'},
          {label:'Total Volume (MTD)',val:'GHS 12,480',color:'var(--teal)'},
          {label:'Settled',val:'GHS 11,980',color:'var(--green)'},
          {label:'Pending Settlement',val:'GHS 500',color:'var(--amber)'},
        ].map(s=>(
          <div className="card card-sm" key={s.label}>
            <div className="wc-label">{s.label}</div>
            <div className="wc-amount" style={{color:s.color,fontSize:s.val.startsWith('GHS')?16:26}}>{s.val}</div>
          </div>
        ))}
      </div>
      <div className="card p-0">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Ref</th><th>Employee</th><th>Services</th><th>Date & Time</th><th className="td-right">Amount</th><th>Status</th></tr></thead>
            <tbody>
              {HISTORY.map(h=>(
                <tr key={h.id}>
                  <td className="td-mono text-xs text-muted">{h.id}</td>
                  <td style={{fontWeight:500,fontSize:12}}>{h.emp}</td>
                  <td className="text-sm td-muted">{h.services}</td>
                  <td className="text-sm td-muted">{h.date}</td>
                  <td className="td-right td-mono font-semibold">{h.amount}</td>
                  <td><span className={`badge ${h.status==='settled'?'badge-green':'badge-red'}`}>{h.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

function CatalogManager() {
  return (
    <>
      <div className="page-header">
        <div><div className="page-title">Service Catalog</div><div className="page-subtitle">Configure services and pricing for your HealthWallet terminal</div></div>
        <button className="btn btn-primary btn-sm"><Plus/>Add Service</button>
      </div>
      <div className="card p-0">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Service</th><th>Category</th><th className="td-right">Price (GHS)</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {CATALOG.map(s=>(
                <tr key={s.id}>
                  <td style={{fontWeight:500,fontSize:12}}>{s.name}</td>
                  <td><span className="badge badge-purple">{s.cat}</span></td>
                  <td className="td-right td-mono font-semibold">{s.price}.00</td>
                  <td><span className="badge badge-green">Active</span></td>
                  <td><button className="btn btn-ghost btn-sm"><Settings size={12}/>Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
