import { useState } from 'react'
import {
  LayoutDashboard, Wallet, HeartPulse, BarChart3, Send, ArrowLeftRight,
  History, Plus, TrendingUp, TrendingDown, ChevronRight,
  RefreshCw, ExternalLink, ChevronDown, X, AlertTriangle, CheckCircle,
  DollarSign, CreditCard, Landmark, Zap
} from 'lucide-react'

const NAV = [
  { id: 'dashboard',    label: 'Dashboard',      Icon: LayoutDashboard },
  { id: 'payroll-pool', label: 'Payroll Pool',   Icon: Wallet },
  { id: 'health-pool',  label: 'Health Pool',    Icon: HeartPulse },
  { id: 'treasury',     label: 'Treasury',       Icon: BarChart3 },
  { id: 'payments',     label: 'Payments',       Icon: Send },
  { id: 'fx',           label: 'FX Conversion',  Icon: ArrowLeftRight },
  { id: 'transactions', label: 'Transactions',   Icon: History },
]

const TXN_DATA = [
  { id:'TXN-8821', date:'27 Mar 2026', desc:'Payroll Disbursement — March 2026', type:'debit', amount:'-GHS 184,200.00', cat:'Payroll', status:'completed' },
  { id:'TXN-8820', date:'26 Mar 2026', desc:'Health Pool Top-up', type:'debit', amount:'-GHS 12,000.00', cat:'Health', status:'completed' },
  { id:'TXN-8819', date:'25 Mar 2026', desc:'Inbound Transfer — Stanbic Bank', type:'credit', amount:'+GHS 250,000.00', cat:'Inbound', status:'completed' },
  { id:'TXN-8818', date:'24 Mar 2026', desc:'FX Conversion USD → GHS', type:'credit', amount:'+GHS 34,800.00', cat:'FX', status:'completed' },
  { id:'TXN-8817', date:'23 Mar 2026', desc:'Payment — Accra Mall (Supplier)', type:'debit', amount:'-GHS 8,400.00', cat:'Payments', status:'completed' },
  { id:'TXN-8816', date:'22 Mar 2026', desc:'Payroll Pool Funding', type:'debit', amount:'-GHS 200,000.00', cat:'Payroll', status:'completed' },
  { id:'TXN-8815', date:'20 Mar 2026', desc:'MoMo Payment — Vendor Settlement', type:'debit', amount:'-GHS 3,200.00', cat:'Payments', status:'completed' },
  { id:'TXN-8814', date:'19 Mar 2026', desc:'Inbound Revenue — Client Invoice', type:'credit', amount:'+GHS 95,000.00', cat:'Inbound', status:'completed' },
  { id:'TXN-8813', date:'18 Mar 2026', desc:'PAYE Remittance — GRA', type:'debit', amount:'-GHS 22,400.00', cat:'Compliance', status:'pending' },
  { id:'TXN-8812', date:'17 Mar 2026', desc:'SSNIT Contribution — March', type:'debit', amount:'-GHS 14,600.00', cat:'Compliance', status:'pending' },
]

const FX_RATES = [
  { pair:'USD / GHS', rate:'15.82', change:'+0.12', dir:'up', flag:'🇺🇸' },
  { pair:'EUR / GHS', rate:'17.21', change:'-0.08', dir:'down', flag:'🇪🇺' },
  { pair:'GBP / GHS', rate:'20.14', change:'+0.31', dir:'up', flag:'🇬🇧' },
  { pair:'XOF / GHS', rate:'0.0261', change:'+0.001', dir:'up', flag:'🌍' },
]

function Modal({ title, onClose, children, size='' }) {
  return (
    <div className="modal-overlay" onClick={e => e.target===e.currentTarget&&onClose()}>
      <div className={`modal ${size}`}>
        <div className="modal-header">
          <span className="modal-title">{title}</span>
          <button className="modal-close" onClick={onClose}><X /></button>
        </div>
        {children}
      </div>
    </div>
  )
}

function FundPayrollModal({ onClose }) {
  const [step, setStep] = useState(1)
  const [amount, setAmount] = useState('')
  const [source, setSource] = useState('business-wallet')

  return (
    <Modal title="Fund Payroll Pool" onClose={onClose}>
      {step === 1 && (
        <>
          <div className="form-group mb-3">
            <label className="form-label">Amount (GHS)</label>
            <input className="form-input" placeholder="0.00" value={amount}
              onChange={e => setAmount(e.target.value)} style={{fontFamily:'Inter',fontVariantNumeric:'tabular-nums',fontSize:18,fontWeight:500}} />
            <span className="text-xs text-secondary mt-2">Payroll pool balance: GHS 42,000.00 · Required: GHS 184,200.00</span>
          </div>
          <div className="form-group mb-3">
            <label className="form-label">Funding Source</label>
            <select className="form-select" value={source} onChange={e=>setSource(e.target.value)}>
              <option value="business-wallet">Business Wallet — GHS 1,240,500.00</option>
              <option value="business-bank">Business Bank Account — GHS 3,820,000.00</option>
            </select>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{width:'23%', background:'var(--amber)'}}/></div>
          <p className="text-xs text-secondary mt-2">Pool is 23% funded. Minimum required before disbursement: GHS 184,200.00</p>
          <div className="modal-actions">
            <button className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={()=>setStep(2)} disabled={!amount}>Continue</button>
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <div className="alert alert-amber"><AlertTriangle/><div>Review the transfer details carefully. This action will move funds from your {source==='business-wallet'?'Business Wallet':'Business Bank Account'} to the Payroll Pool.</div></div>
          <div className="card card-sm mt-3">
            <div className="stat-row"><span className="stat-label">Amount</span><span className="stat-value font-mono">GHS {parseFloat(amount||0).toLocaleString('en-GH',{minimumFractionDigits:2})}</span></div>
            <div className="stat-row"><span className="stat-label">Source</span><span className="stat-value">{source==='business-wallet'?'Business Wallet':'Business Bank Account'}</span></div>
            <div className="stat-row"><span className="stat-label">Destination</span><span className="stat-value text-teal">Payroll Pool</span></div>
            <div className="stat-row"><span className="stat-label">Reference</span><span className="stat-value td-mono">PPF-2026-03-27</span></div>
          </div>
          <div className="modal-actions">
            <button className="btn btn-outline" onClick={()=>setStep(1)}>Back</button>
            <button className="btn btn-success" onClick={onClose}><CheckCircle/> Confirm Transfer</button>
          </div>
        </>
      )}
    </Modal>
  )
}

function PaymentModal({ onClose }) {
  const [payType, setPayType] = useState('bank')
  const [step, setStep] = useState(1)
  return (
    <Modal title="New Payment" onClose={onClose} size="modal-lg">
      {step===1 && <>
        <div className="tabs">
          <div className={`tab-item ${payType==='bank'?'active':''}`} onClick={()=>setPayType('bank')}>Bank Transfer</div>
          <div className={`tab-item ${payType==='momo'?'active':''}`} onClick={()=>setPayType('momo')}>MoMo</div>
          <div className={`tab-item ${payType==='dexwin'?'active':''}`} onClick={()=>setPayType('dexwin')}>Dexwin User</div>
        </div>
        {payType==='bank' && <div className="form-row">
          <div className="form-group"><label className="form-label">Account Name</label><input className="form-input" placeholder="Beneficiary name"/></div>
          <div className="form-group"><label className="form-label">Account Number</label><input className="form-input" placeholder="0012345678"/></div>
          <div className="form-group"><label className="form-label">Bank</label>
            <select className="form-select"><option>Ghana Commercial Bank</option><option>Stanbic Bank</option><option>Ecobank</option><option>Fidelity Bank</option><option>Affinity Bank</option></select>
          </div>
          <div className="form-group"><label className="form-label">Amount (GHS)</label><input className="form-input" placeholder="0.00" style={{fontFamily:'Inter',fontVariantNumeric:'tabular-nums'}}/></div>
          <div className="form-group" style={{gridColumn:'1/-1'}}><label className="form-label">Narration</label><input className="form-input" placeholder="Payment description…"/></div>
        </div>}
        {payType==='momo' && <div className="form-row">
          <div className="form-group"><label className="form-label">Network</label>
            <select className="form-select"><option>MTN Mobile Money</option><option>Telecel Cash</option><option>AirtelTigo Money</option></select>
          </div>
          <div className="form-group"><label className="form-label">Phone Number</label><input className="form-input" placeholder="024 XXX XXXX"/></div>
          <div className="form-group"><label className="form-label">Amount (GHS)</label><input className="form-input" placeholder="0.00" style={{fontFamily:'Inter',fontVariantNumeric:'tabular-nums'}}/></div>
          <div className="form-group"><label className="form-label">Narration</label><input className="form-input" placeholder="Payment description…"/></div>
        </div>}
        {payType==='dexwin' && <div className="form-row">
          <div className="form-group" style={{gridColumn:'1/-1'}}><label className="form-label">Dexwin Username or Phone</label><input className="form-input" placeholder="Search by name or phone…"/></div>
          <div className="form-group"><label className="form-label">Amount (GHS)</label><input className="form-input" placeholder="0.00" style={{fontFamily:'Inter',fontVariantNumeric:'tabular-nums'}}/></div>
          <div className="form-group"><label className="form-label">Narration</label><input className="form-input" placeholder="Payment description…"/></div>
        </div>}
        <div className="modal-actions">
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={()=>setStep(2)}>Review Payment</button>
        </div>
      </>}
      {step===2 && <>
        <div className="alert alert-amber"><AlertTriangle/><div>Please confirm this payment. Funds will be debited immediately from your Business Wallet.</div></div>
        <div className="card card-sm mt-3">
          <div className="stat-row"><span className="stat-label">Payment Type</span><span className="stat-value">{payType==='bank'?'Bank Transfer':payType==='momo'?'MoMo':'Dexwin'}</span></div>
          <div className="stat-row"><span className="stat-label">Amount</span><span className="stat-value font-mono">GHS 0.00</span></div>
          <div className="stat-row"><span className="stat-label">Fee</span><span className="stat-value text-secondary font-mono">GHS 2.00</span></div>
          <div className="stat-row"><span className="stat-label">Total Debit</span><span className="stat-value text-red font-mono">GHS 2.00</span></div>
        </div>
        <div className="modal-actions">
          <button className="btn btn-outline" onClick={()=>setStep(1)}>Back</button>
          <button className="btn btn-success" onClick={onClose}><CheckCircle/> Confirm Payment</button>
        </div>
      </>}
    </Modal>
  )
}

function FXModal({ onClose }) {
  const [fromCur, setFromCur] = useState('GHS')
  const [toCur, setToCur] = useState('USD')
  const [amount, setAmount] = useState('')
  const rate = 15.82
  const converted = amount ? (parseFloat(amount)/rate).toFixed(2) : ''
  return (
    <Modal title="FX Conversion" onClose={onClose}>
      <div className="form-group mb-3">
        <label className="form-label">You Send</label>
        <div className="flex gap-2">
          <select className="form-select" style={{width:100}} value={fromCur} onChange={e=>setFromCur(e.target.value)}>
            <option>GHS</option><option>USD</option><option>EUR</option><option>GBP</option>
          </select>
          <input className="form-input" placeholder="0.00" value={amount} onChange={e=>setAmount(e.target.value)} style={{fontFamily:'Inter',fontVariantNumeric:'tabular-nums',fontSize:16}}/>
        </div>
      </div>
      <div className="flex items-center justify-center mb-3">
        <div style={{background:'var(--teal-dim)',borderRadius:99,padding:'6px 12px',display:'flex',gap:6,alignItems:'center',fontSize:12,color:'var(--brand)'}}>
          <RefreshCw size={12}/> 1 USD = {rate} GHS · live rate
        </div>
      </div>
      <div className="form-group mb-3">
        <label className="form-label">You Receive</label>
        <div className="flex gap-2">
          <select className="form-select" style={{width:100}} value={toCur} onChange={e=>setToCur(e.target.value)}>
            <option>USD</option><option>EUR</option><option>GBP</option><option>GHS</option>
          </select>
          <input className="form-input" value={converted} readOnly style={{fontFamily:'Inter',fontVariantNumeric:'tabular-nums',fontSize:16,color:'var(--brand)'}}/>
        </div>
      </div>
      <div className="card card-sm mt-3">
        <div className="stat-row"><span className="stat-label">Exchange Rate</span><span className="stat-value font-mono">1 USD = 15.82 GHS</span></div>
        <div className="stat-row"><span className="stat-label">Settlement</span><span className="stat-value text-green">Instant → Business Wallet</span></div>
        <div className="stat-row"><span className="stat-label">Fee</span><span className="stat-value font-mono">0.5%</span></div>
      </div>
      <div className="modal-actions">
        <button className="btn btn-outline" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" disabled={!amount}><ArrowLeftRight/> Convert Now</button>
      </div>
    </Modal>
  )
}

export default function BankingMode() {
  const [nav, setNav] = useState('dashboard')
  const [showFundPayroll, setShowFundPayroll] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [showFX, setShowFX] = useState(false)

  return (
    <>
      <aside className="sidebar">
        <div className="sidebar-section">
          <div className="sidebar-label">Banking</div>
          {NAV.map(({ id, label, Icon }) => (
            <div key={id} className={`nav-item ${nav===id?'active b-nav':''}`} onClick={()=>setNav(id)}>
              <Icon/>{label}
              {id==='transactions' && <span className="nav-chip">3 new</span>}
            </div>
          ))}
        </div>
        <div className="sidebar-section" style={{marginTop:'auto'}}>
          <div className="sidebar-label">Quick Actions</div>
          <div className="nav-item" onClick={()=>setShowPayment(true)}><Send/>Send Payment</div>
          <div className="nav-item" onClick={()=>setShowFX(true)}><ArrowLeftRight/>Convert FX</div>
          <div className="nav-item" onClick={()=>setShowFundPayroll(true)}><Plus/>Fund Payroll</div>
        </div>
      </aside>

      <main className="content">
        {nav==='dashboard' && <Dashboard setNav={setNav} setShowFundPayroll={setShowFundPayroll} setShowPayment={setShowPayment} setShowFX={setShowFX}/>}
        {nav==='payroll-pool' && <PayrollPool setShowFund={setShowFundPayroll}/>}
        {nav==='health-pool' && <HealthPool/>}
        {nav==='treasury' && <Treasury/>}
        {nav==='payments' && <Payments setShowPayment={setShowPayment} setShowFX={setShowFX}/>}
        {nav==='fx' && <FXPage setShowFX={setShowFX}/>}
        {nav==='transactions' && <Transactions data={TXN_DATA}/>}
      </main>

      {showFundPayroll && <FundPayrollModal onClose={()=>setShowFundPayroll(false)}/>}
      {showPayment && <PaymentModal onClose={()=>setShowPayment(false)}/>}
      {showFX && <FXModal onClose={()=>setShowFX(false)}/>}
    </>
  )
}

function Dashboard({ setNav, setShowFundPayroll, setShowPayment, setShowFX }) {
  return (
    <>
      <div className="page-header">
        <div>
          <div className="page-title">Business Overview</div>
          <div className="page-subtitle">Accra Retail Group Ltd · Account #DX-0021-GH · Updated just now</div>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline btn-sm" onClick={()=>setShowFX(true)}><ArrowLeftRight/>FX</button>
          <button className="btn btn-outline btn-sm" onClick={()=>setShowPayment(true)}><Send/>Send</button>
          <button className="btn btn-primary btn-sm" onClick={()=>setShowFundPayroll(true)}><Plus/>Fund Payroll</button>
        </div>
      </div>

      <div className="grid-4 mb-4">
        <div className="wallet-card" style={{'--wc-color':'var(--teal)','--wc-dim':'var(--teal-dim)'}}>
          <div className="wc-icon"><Wallet/></div>
          <div className="wc-label">Business Wallet</div>
          <div className="wc-amount"><small>GHS </small>1,240,500.00</div>
          <div className="wc-footer">
            <span className="wc-change change-up"><TrendingUp size={10}/>+12.4% MTD</span>
            <span className="wc-tag">Available</span>
          </div>
        </div>
        <div className="wallet-card" style={{'--wc-color':'var(--blue)','--wc-dim':'var(--blue-bg)'}}>
          <div className="wc-icon" style={{background:'var(--blue-bg)'}}><Landmark style={{color:'var(--blue)'}}/></div>
          <div className="wc-label">Bank Account</div>
          <div className="wc-amount"><small>GHS </small>3,820,000.00</div>
          <div className="wc-footer">
            <span className="wc-change change-up"><TrendingUp size={10}/>+8.1% MTD</span>
            <span className="wc-tag">Affinity Bank</span>
          </div>
        </div>
        <div className="wallet-card" style={{'--wc-color':'var(--amber)','--wc-dim':'var(--amber-dim)'}}>
          <div className="wc-icon" style={{background:'var(--amber-dim)'}}><Zap style={{color:'var(--amber)'}}/></div>
          <div className="wc-label">Payroll Pool</div>
          <div className="wc-amount"><small>GHS </small>42,000.00</div>
          <div className="wc-footer">
            <span className="wc-change change-down"><TrendingDown size={10}/>23% funded</span>
            <span className="wc-tag" style={{color:'var(--red)',fontSize:10,fontWeight:600}}>Needs Top-up</span>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{width:'23%',background:'var(--amber)'}}/></div>
        </div>
        <div className="wallet-card" style={{'--wc-color':'var(--green)','--wc-dim':'var(--green-dim)'}}>
          <div className="wc-icon" style={{background:'var(--green-dim)'}}><HeartPulse style={{color:'var(--green)'}}/></div>
          <div className="wc-label">Health Pool</div>
          <div className="wc-amount"><small>GHS </small>28,400.00</div>
          <div className="wc-footer">
            <span className="wc-change change-flat">68% utilized</span>
            <span className="wc-tag">Active</span>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{width:'68%',background:'var(--green)'}}/></div>
        </div>
      </div>

      <div className="grid-3-2">
        {/* Recent Transactions */}
        <div className="card">
          <div className="section-header">
            <span className="section-title">Recent Transactions</span>
            <button className="btn btn-ghost btn-sm" onClick={()=>setNav('transactions')}>View all <ChevronRight size={12}/></button>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr>
                <th>Description</th><th>Date</th><th>Category</th><th className="td-right">Amount</th><th>Status</th>
              </tr></thead>
              <tbody>
                {TXN_DATA.slice(0,6).map(t=>(
                  <tr key={t.id}>
                    <td><div style={{fontSize:12,fontWeight:500}}>{t.desc}</div><div className="td-mono text-muted">{t.id}</div></td>
                    <td className="td-muted text-sm">{t.date}</td>
                    <td><span className="badge badge-muted">{t.cat}</span></td>
                    <td className={`td-right td-mono font-semibold ${t.type==='credit'?'text-green':'text-red'}`}>{t.amount}</td>
                    <td><span className={`badge ${t.status==='completed'?'badge-green':'badge-amber'}`}>{t.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column */}
        <div className="flex-col gap-3">
          {/* Payroll alert */}
          <div className="card">
            <div className="section-header mb-2">
              <span className="section-title">Payroll Awaiting Disbursement</span>
              <span className="badge badge-amber animate-pulse">Action Required</span>
            </div>
            <div className="stat-row"><span className="stat-label">Run ID</span><span className="stat-value td-mono">PR-2026-03</span></div>
            <div className="stat-row"><span className="stat-label">Employees</span><span className="stat-value">24</span></div>
            <div className="stat-row"><span className="stat-label">Total Net Pay</span><span className="stat-value font-mono">GHS 184,200.00</span></div>
            <div className="stat-row"><span className="stat-label">Pool Balance</span><span className="stat-value text-amber font-mono">GHS 42,000.00</span></div>
            <div className="stat-row"><span className="stat-label">Shortfall</span><span className="stat-value text-red font-mono">GHS 142,200.00</span></div>
            <button className="btn btn-primary w-full mt-3" onClick={()=>setShowFundPayroll(true)}><Plus/>Fund Payroll Pool</button>
          </div>

          {/* FX Rates */}
          <div className="card">
            <div className="section-header"><span className="section-title">Live FX Rates</span><button className="btn btn-ghost btn-sm" onClick={()=>setShowFX(true)}>Convert</button></div>
            {FX_RATES.map(f=>(
              <div className="stat-row" key={f.pair}>
                <span className="stat-label">{f.flag} {f.pair}</span>
                <div className="flex items-center gap-3">
                  <span className="stat-value font-mono">{f.rate}</span>
                  <span className={`text-xs font-mono ${f.dir==='up'?'text-green':'text-red'}`}>{f.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

function PayrollPool({ setShowFund }) {
  return (
    <>
      <div className="page-header">
        <div><div className="page-title">Payroll Pool</div><div className="page-subtitle">Pre-funded pool for salary disbursements</div></div>
        <button className="btn btn-primary" onClick={()=>setShowFund(true)}><Plus/>Fund Pool</button>
      </div>
      <div className="alert alert-amber"><AlertTriangle/><div><strong>Funding required.</strong> March payroll run is awaiting disbursement. Pool is 23% funded. Top up GHS 142,200.00 to proceed.</div></div>
      <div className="grid-2 mt-4">
        <div className="card">
          <div className="section-title mb-3">Pool Status</div>
          <div className="stat-row"><span className="stat-label">Current Balance</span><span className="stat-value font-mono text-amber">GHS 42,000.00</span></div>
          <div className="stat-row"><span className="stat-label">Required (March Run)</span><span className="stat-value font-mono">GHS 184,200.00</span></div>
          <div className="stat-row"><span className="stat-label">Shortfall</span><span className="stat-value font-mono text-red">GHS 142,200.00</span></div>
          <div className="stat-row"><span className="stat-label">Funded</span><span className="stat-value text-amber">23%</span></div>
          <div className="progress-bar" style={{height:6,marginTop:12}}><div className="progress-fill" style={{width:'23%',background:'var(--amber)'}}/></div>
        </div>
        <div className="card">
          <div className="section-title mb-3">Funding History</div>
          {[
            {date:'26 Feb 2026',amount:'GHS 200,000.00',ref:'PPF-2026-02'},
            {date:'27 Jan 2026',amount:'GHS 190,000.00',ref:'PPF-2026-01'},
            {date:'28 Dec 2025',amount:'GHS 185,000.00',ref:'PPF-2025-12'},
          ].map(h=>(
            <div className="stat-row" key={h.ref}>
              <div><div className="td-mono text-xs">{h.ref}</div><div className="text-secondary text-xs">{h.date}</div></div>
              <span className="stat-value font-mono text-sm">{h.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

function HealthPool() {
  const employees = [
    {name:'Kofi Asante',id:'EMP-001',allocated:'GHS 500',used:'GHS 320',util:64},
    {name:'Abena Mensah',id:'EMP-002',allocated:'GHS 500',used:'GHS 150',util:30},
    {name:'Kwame Boateng',id:'EMP-003',allocated:'GHS 500',used:'GHS 480',util:96},
    {name:'Ama Owusu',id:'EMP-004',allocated:'GHS 500',used:'GHS 210',util:42},
    {name:'Yaw Darko',id:'EMP-005',allocated:'GHS 500',used:'GHS 500',util:100},
  ]
  return (
    <>
      <div className="page-header">
        <div><div className="page-title">Health Pool</div><div className="page-subtitle">Employee health wallet allocations — HealthWallet Programme</div></div>
        <button className="btn btn-primary"><Plus/>Top-up Pool</button>
      </div>
      <div className="grid-3 mb-4">
        <div className="card"><div className="wc-label">Pool Balance</div><div className="wc-amount"><small>GHS </small>28,400.00</div><div className="text-xs text-secondary">Available for allocation</div></div>
        <div className="card"><div className="wc-label">Total Allocated</div><div className="wc-amount"><small>GHS </small>12,000.00</div><div className="text-xs text-secondary">24 employees — GHS 500/ea</div></div>
        <div className="card"><div className="wc-label">Total Spent (MTD)</div><div className="wc-amount text-green"><small>GHS </small>8,160.00</div><div className="text-xs text-secondary">68% utilization rate</div></div>
      </div>
      <div className="card">
        <div className="section-header"><span className="section-title">Per-Employee Utilization</span></div>
        <table><thead><tr><th>Employee</th><th>ID</th><th>Allocated</th><th>Used</th><th>Remaining</th><th>Utilization</th></tr></thead>
        <tbody>{employees.map(e=>(
          <tr key={e.id}>
            <td><div style={{fontWeight:500}}>{e.name}</div></td>
            <td className="td-mono td-muted">{e.id}</td>
            <td className="td-mono">{e.allocated}</td>
            <td className="td-mono text-green">{e.used}</td>
            <td className="td-mono">{`GHS ${500-parseInt(e.used.replace(/[^0-9]/g,''))}`}</td>
            <td>
              <div className="flex items-center gap-2">
                <div className="progress-bar" style={{width:80,display:'inline-block'}}><div className="progress-fill" style={{width:`${e.util}%`,background:e.util>90?'var(--red)':e.util>60?'var(--amber)':'var(--green)'}}/></div>
                <span className="text-xs td-mono">{e.util}%</span>
              </div>
            </td>
          </tr>
        ))}</tbody></table>
      </div>
    </>
  )
}

function Treasury() {
  return (
    <>
      <div className="page-header">
        <div><div className="page-title">Treasury Overview</div><div className="page-subtitle">All business wallet balances and financial positions</div></div>
      </div>
      <div className="grid-4 mb-4">
        {[
          {label:'Total Assets',amount:'5,060,500.00',color:'var(--brand)',icon:<Wallet/>},
          {label:'Total Liabilities',amount:'184,200.00',color:'var(--red)',icon:<CreditCard/>},
          {label:'Net Position',amount:'4,876,300.00',color:'var(--green)',icon:<TrendingUp/>},
          {label:'Pending Payroll',amount:'184,200.00',color:'var(--amber)',icon:<Zap/>},
        ].map(c=>(
          <div className="card" key={c.label}>
            <div className="wc-label">{c.label}</div>
            <div className="wc-amount" style={{color:c.color}}><small>GHS </small>{c.amount}</div>
          </div>
        ))}
      </div>
      <div className="grid-2">
        <div className="card">
          <div className="section-title mb-3">Wallet Balances</div>
          {[
            {name:'Business Wallet',bal:'GHS 1,240,500.00',type:'Internal'},
            {name:'Business Bank Account',bal:'GHS 3,820,000.00',type:'Affinity Bank'},
            {name:'Payroll Pool',bal:'GHS 42,000.00',type:'Restricted'},
            {name:'Health Pool',bal:'GHS 28,400.00',type:'Restricted'},
          ].map(w=>(
            <div className="stat-row" key={w.name}>
              <div><div style={{fontWeight:500,fontSize:12}}>{w.name}</div><span className="text-xs text-muted">{w.type}</span></div>
              <span className="stat-value font-mono">{w.bal}</span>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="section-title mb-3">Monthly Cash Flow</div>
          {[
            {label:'Revenue (Inbound)',val:'+GHS 345,000.00',cls:'text-green'},
            {label:'Payroll (Mar)',val:'-GHS 184,200.00',cls:'text-red'},
            {label:'Operations',val:'-GHS 11,600.00',cls:'text-red'},
            {label:'Tax Remittances',val:'-GHS 37,000.00',cls:'text-red'},
            {label:'Net Cash Flow',val:'+GHS 112,200.00',cls:'text-teal'},
          ].map(r=>(
            <div className="stat-row" key={r.label}>
              <span className="stat-label">{r.label}</span>
              <span className={`stat-value font-mono ${r.cls}`}>{r.val}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

function Payments({ setShowPayment, setShowFX }) {
  return (
    <>
      <div className="page-header">
        <div><div className="page-title">Payments</div><div className="page-subtitle">Send to bank accounts, MoMo, or Dexwin users</div></div>
        <div className="flex gap-2">
          <button className="btn btn-outline" onClick={()=>setShowFX(true)}><ArrowLeftRight/>FX</button>
          <button className="btn btn-primary" onClick={()=>setShowPayment(true)}><Send/>New Payment</button>
        </div>
      </div>
      <div className="grid-3 mb-4">
        <div className="card" style={{cursor:'pointer'}} onClick={()=>setShowPayment(true)}>
          <div className="flex items-center gap-3">
            <div className="wc-icon" style={{background:'var(--blue-bg)',marginBottom:0}}><Landmark style={{color:'var(--blue)'}}/></div>
            <div><div className="section-title">Bank Transfer</div><div className="text-xs text-secondary">GIP / GHIPSS</div></div>
          </div>
        </div>
        <div className="card" style={{cursor:'pointer'}} onClick={()=>setShowPayment(true)}>
          <div className="flex items-center gap-3">
            <div className="wc-icon" style={{background:'var(--amber-dim)',marginBottom:0}}><DollarSign style={{color:'var(--amber)'}}/></div>
            <div><div className="section-title">MoMo</div><div className="text-xs text-secondary">MTN · Telecel · Airteltigo</div></div>
          </div>
        </div>
        <div className="card" style={{cursor:'pointer'}} onClick={()=>setShowPayment(true)}>
          <div className="flex items-center gap-3">
            <div className="wc-icon" style={{marginBottom:0}}><Zap/></div>
            <div><div className="section-title">Dexwin User</div><div className="text-xs text-secondary">Instant internal transfer</div></div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="section-header"><span className="section-title">Recent Payments</span></div>
        <Transactions data={TXN_DATA.filter(t=>t.cat==='Payments'||t.cat==='Inbound')} compact />
      </div>
    </>
  )
}

function FXPage({ setShowFX }) {
  return (
    <>
      <div className="page-header">
        <div><div className="page-title">FX Conversion</div><div className="page-subtitle">Live rates from partner banks · Settles to Business Wallet</div></div>
        <button className="btn btn-primary" onClick={()=>setShowFX(true)}><ArrowLeftRight/>New Conversion</button>
      </div>
      <div className="grid-4 mb-4">
        {FX_RATES.map(f=>(
          <div className="card" key={f.pair}>
            <div className="wc-label">{f.flag} {f.pair}</div>
            <div className="wc-amount">{f.rate}</div>
            <span className={`badge ${f.dir==='up'?'badge-green':'badge-red'}`}>{f.change}</span>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="section-header"><span className="section-title">Conversion History</span></div>
        <table><thead><tr><th>Date</th><th>From</th><th>To</th><th>Rate</th><th>Status</th></tr></thead>
        <tbody>
          <tr><td className="td-muted text-sm">24 Mar 2026</td><td className="td-mono">USD 2,200.00</td><td className="td-mono text-teal">GHS 34,804.00</td><td className="td-mono">15.82</td><td><span className="badge badge-green">Settled</span></td></tr>
          <tr><td className="td-muted text-sm">10 Mar 2026</td><td className="td-mono">GBP 1,000.00</td><td className="td-mono text-teal">GHS 20,140.00</td><td className="td-mono">20.14</td><td><span className="badge badge-green">Settled</span></td></tr>
        </tbody></table>
      </div>
    </>
  )
}

function Transactions({ data, compact }) {
  return (
    <>
      {!compact && <div className="page-header">
        <div><div className="page-title">Transaction History</div><div className="page-subtitle">All business financial activity</div></div>
        <div className="flex gap-2 items-center">
          <div className="search-bar" style={{width:220}}><ExternalLink/><input placeholder="Search transactions…"/></div>
          <button className="btn btn-outline btn-sm"><ChevronDown/>Filter</button>
        </div>
      </div>}
      <div className={compact?'':'card'}>
        <div className="table-wrap">
          <table>
            <thead><tr>
              <th>Ref</th><th>Description</th><th>Date</th><th>Category</th><th className="td-right">Amount</th><th>Status</th>
            </tr></thead>
            <tbody>
              {data.map(t=>(
                <tr key={t.id}>
                  <td className="td-mono text-xs text-muted">{t.id}</td>
                  <td><span style={{fontWeight:500,fontSize:12}}>{t.desc}</span></td>
                  <td className="td-muted text-sm">{t.date}</td>
                  <td><span className="badge badge-muted">{t.cat}</span></td>
                  <td className={`td-right td-mono font-semibold ${t.type==='credit'?'text-green':'text-red'}`}>{t.amount}</td>
                  <td><span className={`badge ${t.status==='completed'?'badge-green':'badge-amber'}`}>{t.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
