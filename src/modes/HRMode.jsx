import { useState } from 'react'
import {
  Users, Calculator, CheckSquare, Calendar, Star, FileText,
  Plus, Search, Filter, Download, ChevronRight, X, AlertTriangle,
  CheckCircle, Clock, UserPlus, Mail, Phone, Briefcase, Edit2,
  TrendingUp, MoreHorizontal, ChevronDown, ArrowRight, Send
} from 'lucide-react'

const NAV = [
  { id: 'employees',   label: 'Employees',         Icon: Users },
  { id: 'payroll',     label: 'Payroll Engine',     Icon: Calculator },
  { id: 'approvals',   label: 'Payroll Approvals',  Icon: CheckSquare },
  { id: 'leave',       label: 'Leave Management',   Icon: Calendar },
  { id: 'performance', label: 'Performance',        Icon: Star },
  { id: 'compliance',  label: 'Compliance Reports', Icon: FileText },
]

const EMPLOYEES = [
  { id:'EMP-001', name:'Kofi Asante',    role:'Senior Engineer',    dept:'Engineering',  salary:8200, status:'active',     email:'k.asante@acra.gh',    phone:'054-XXX-1201', start:'Jan 2023', paye:1640,  ssnit:656,  net:5904 },
  { id:'EMP-002', name:'Abena Mensah',   role:'HR Officer',         dept:'People & HR',  salary:6800, status:'active',     email:'a.mensah@acra.gh',    phone:'020-XXX-4502', start:'Mar 2022', paye:1360,  ssnit:544,  net:4896 },
  { id:'EMP-003', name:'Kwame Boateng',  role:'Finance Manager',    dept:'Finance',      salary:9500, status:'active',     email:'k.boateng@acra.gh',   phone:'024-XXX-3301', start:'Jun 2021', paye:1900,  ssnit:760,  net:6840 },
  { id:'EMP-004', name:'Ama Owusu',      role:'Sales Executive',    dept:'Sales',        salary:5500, status:'active',     email:'a.owusu@acra.gh',     phone:'050-XXX-8803', start:'Sep 2023', paye:1100,  ssnit:440,  net:3960 },
  { id:'EMP-005', name:'Yaw Darko',      role:'Marketing Lead',     dept:'Marketing',    salary:7200, status:'active',     email:'y.darko@acra.gh',     phone:'027-XXX-5504', start:'Nov 2022', paye:1440,  ssnit:576,  net:5184 },
  { id:'EMP-006', name:'Esi Amoah',      role:'UI Designer',        dept:'Product',      salary:6000, status:'active',     email:'e.amoah@acra.gh',     phone:'024-XXX-7205', start:'Feb 2024', paye:1200,  ssnit:480,  net:4320 },
  { id:'EMP-007', name:'Nana Boateng',   role:'Backend Engineer',   dept:'Engineering',  salary:7800, status:'invited',    email:'n.boateng@acra.gh',   phone:'055-XXX-6606', start:'Apr 2024', paye:1560,  ssnit:624,  net:5616 },
  { id:'EMP-008', name:'Akua Frimpong',  role:'Accountant',         dept:'Finance',      salary:5800, status:'active',     email:'a.frimpong@acra.gh',  phone:'023-XXX-9907', start:'Jul 2023', paye:1160,  ssnit:464,  net:4176 },
  { id:'EMP-009', name:'Kojo Mensah',    role:'Sales Representative',dept:'Sales',       salary:4800, status:'suspended',  email:'k.mensah@acra.gh',    phone:'026-XXX-4408', start:'Dec 2022', paye:960,   ssnit:384,  net:3456 },
  { id:'EMP-010', name:'Adwoa Sarpong',  role:'Operations Manager', dept:'Operations',   salary:8800, status:'active',     email:'a.sarpong@acra.gh',   phone:'028-XXX-1109', start:'Oct 2021', paye:1760,  ssnit:704,  net:6336 },
]

const STATUS_MAP = {
  active: 'badge-green', invited: 'badge-amber', suspended: 'badge-red', provisioned: 'badge-blue'
}

const LEAVE_DATA = [
  { id:'LV-041', emp:'Ama Owusu', type:'Annual Leave', from:'01 Apr', to:'05 Apr', days:5, status:'pending', submitted:'26 Mar 2026' },
  { id:'LV-040', emp:'Kofi Asante', type:'Sick Leave', from:'28 Mar', to:'29 Mar', days:2, status:'approved', submitted:'27 Mar 2026' },
  { id:'LV-039', emp:'Yaw Darko', type:'Paternity Leave', from:'15 Apr', to:'26 Apr', days:10, status:'pending', submitted:'25 Mar 2026' },
  { id:'LV-038', emp:'Abena Mensah', type:'Annual Leave', from:'08 Apr', to:'10 Apr', days:3, status:'approved', submitted:'20 Mar 2026' },
  { id:'LV-037', emp:'Esi Amoah', type:'Compassionate', from:'31 Mar', to:'01 Apr', days:2, status:'pending', submitted:'27 Mar 2026' },
]

function Modal({ title, onClose, children, size='' }) {
  return (
    <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className={`modal ${size}`}>
        <div className="modal-header">
          <span className="modal-title">{title}</span>
          <button className="modal-close" onClick={onClose}><X/></button>
        </div>
        {children}
      </div>
    </div>
  )
}

function AddEmployeeModal({ onClose }) {
  const [step, setStep] = useState(1)
  return (
    <Modal title={step===1?'Add Employee — Details':step===2?'Add Employee — Compensation':'Add Employee — Review'} onClose={onClose} size="modal-lg">
      {/* Step indicators */}
      <div className="flex gap-2 mb-4" style={{borderBottom:'1px solid var(--border)',paddingBottom:14}}>
        {['Personal Details','Compensation','Review & Invite'].map((s,i)=>(
          <div key={s} className="flex items-center gap-2">
            <div style={{width:20,height:20,borderRadius:50,background:step>i+1?'var(--green-dim)':step===i+1?'var(--blue-dim)':'var(--surface-4)',border:`1.5px solid ${step>i+1?'rgba(34,197,94,0.3)':step===i+1?'rgba(96,165,250,0.3)':'var(--border)'}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontFamily:'Outfit',fontWeight:700,color:step>i+1?'var(--green)':step===i+1?'var(--blue)':'var(--text-muted)',flexShrink:0}}>
              {step>i+1?<CheckCircle size={11}/>:i+1}
            </div>
            <span style={{fontSize:11,color:step===i+1?'var(--text-primary)':'var(--text-muted)',fontFamily:'Outfit',fontWeight:step===i+1?600:400}}>{s}</span>
            {i<2&&<ChevronRight size={11} style={{color:'var(--text-muted)'}}/>}
          </div>
        ))}
      </div>

      {step===1 && <>
        <div className="form-row mb-3">
          <div className="form-group"><label className="form-label">First Name</label><input className="form-input" placeholder="Kwame"/></div>
          <div className="form-group"><label className="form-label">Last Name</label><input className="form-input" placeholder="Adjei"/></div>
        </div>
        <div className="form-row mb-3">
          <div className="form-group"><label className="form-label">Email Address</label><input className="form-input" placeholder="kwame@company.com" type="email"/></div>
          <div className="form-group"><label className="form-label">Phone Number</label><input className="form-input" placeholder="024 XXX XXXX"/></div>
        </div>
        <div className="form-row mb-3">
          <div className="form-group"><label className="form-label">Job Title</label><input className="form-input" placeholder="e.g. Senior Engineer"/></div>
          <div className="form-group"><label className="form-label">Department</label>
            <select className="form-select"><option>Engineering</option><option>Finance</option><option>People & HR</option><option>Sales</option><option>Marketing</option><option>Operations</option><option>Product</option></select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group"><label className="form-label">Start Date</label><input className="form-input" type="date"/></div>
          <div className="form-group"><label className="form-label">Employment Type</label>
            <select className="form-select"><option>Full-time</option><option>Part-time</option><option>Contract</option></select>
          </div>
        </div>
      </>}

      {step===2 && <>
        <div className="form-row mb-3">
          <div className="form-group"><label className="form-label">Gross Monthly Salary (GHS)</label><input className="form-input" placeholder="0.00" style={{fontFamily:'IBM Plex Mono'}}/></div>
          <div className="form-group"><label className="form-label">Pay Frequency</label>
            <select className="form-select"><option>Monthly</option><option>Bi-weekly</option><option>Weekly</option></select>
          </div>
        </div>
        <div className="card card-sm mb-3" style={{background:'var(--surface-2)'}}>
          <div className="section-title mb-2" style={{fontSize:12}}>Estimated Deductions</div>
          <div className="stat-row"><span className="stat-label">PAYE (20%)</span><span className="stat-value font-mono text-amber">GHS 0.00</span></div>
          <div className="stat-row"><span className="stat-label">SSNIT Tier 1 (5.5%)</span><span className="stat-value font-mono text-amber">GHS 0.00</span></div>
          <div className="stat-row"><span className="stat-label">SSNIT Tier 2 (5%)</span><span className="stat-value font-mono text-amber">GHS 0.00</span></div>
          <div className="stat-row"><span className="stat-label">Net Monthly Pay</span><span className="stat-value font-mono text-green">GHS 0.00</span></div>
        </div>
        <div className="form-row mb-3">
          <div className="form-group"><label className="form-label">Health Wallet (GHS/month)</label>
            <select className="form-select"><option>GHS 500</option><option>GHS 300</option><option>GHS 800</option><option>GHS 1,000</option><option>None</option></select>
          </div>
          <div className="form-group"><label className="form-label">HealthWallet Tier</label>
            <select className="form-select"><option>Full Stack</option><option>Full Wallet</option><option>Wellness Only</option></select>
          </div>
        </div>
      </>}

      {step===3 && <>
        <div className="alert alert-blue"><CheckCircle/><div>An SMS invite will be sent to the employee's registered phone number. They will activate their Dexwin account through the Employee App.</div></div>
        <div className="card card-sm mt-3">
          <div className="stat-row"><span className="stat-label">Employee</span><span className="stat-value">Kwame Adjei</span></div>
          <div className="stat-row"><span className="stat-label">Email</span><span className="stat-value td-mono text-sm">kwame@company.com</span></div>
          <div className="stat-row"><span className="stat-label">Role</span><span className="stat-value">Senior Engineer · Engineering</span></div>
          <div className="stat-row"><span className="stat-label">Gross Salary</span><span className="stat-value font-mono">GHS 0.00</span></div>
          <div className="stat-row"><span className="stat-label">Net Salary</span><span className="stat-value text-green font-mono">GHS 0.00</span></div>
          <div className="stat-row"><span className="stat-label">Health Wallet</span><span className="stat-value">GHS 500 · Full Stack</span></div>
        </div>
      </>}

      <div className="modal-actions">
        {step>1 && <button className="btn btn-outline" onClick={()=>setStep(s=>s-1)}>Back</button>}
        <button className="btn btn-outline" onClick={onClose}>Cancel</button>
        {step<3 && <button className="btn btn-primary" onClick={()=>setStep(s=>s+1)}>Continue <ArrowRight size={12}/></button>}
        {step===3 && <button className="btn btn-success" onClick={onClose}><Send size={13}/>Send Invite</button>}
      </div>
    </Modal>
  )
}

export default function HRMode() {
  const [nav, setNav] = useState('employees')
  const [showAddEmp, setShowAddEmp] = useState(false)

  return (
    <>
      <aside className="sidebar">
        <div className="sidebar-section">
          <div className="sidebar-label">People & Payroll</div>
          {NAV.map(({ id, label, Icon }) => (
            <div key={id} className={`nav-item ${nav===id?'active h-nav':''}`} onClick={()=>setNav(id)}>
              <Icon/>{label}
              {id==='approvals' && <span className="nav-badge">1</span>}
              {id==='leave' && <span className="nav-badge">3</span>}
            </div>
          ))}
        </div>
        <div className="sidebar-section" style={{marginTop:'auto'}}>
          <div className="sidebar-label">Actions</div>
          <div className="nav-item" onClick={()=>setShowAddEmp(true)}><UserPlus/>Add Employee</div>
          <div className="nav-item" onClick={()=>setNav('payroll')}><Calculator/>New Payroll Run</div>
        </div>
      </aside>

      <main className="content">
        {nav==='employees'   && <EmployeeList setShowAdd={setShowAddEmp} setNav={setNav}/>}
        {nav==='payroll'     && <PayrollEngine/>}
        {nav==='approvals'   && <PayrollApprovals/>}
        {nav==='leave'       && <LeaveManagement/>}
        {nav==='performance' && <PerformancePage/>}
        {nav==='compliance'  && <CompliancePage/>}
      </main>

      {showAddEmp && <AddEmployeeModal onClose={()=>setShowAddEmp(false)}/>}
    </>
  )
}

function EmployeeList({ setShowAdd, setNav }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  const filtered = EMPLOYEES.filter(e =>
    (filter==='all' || e.status===filter) &&
    (e.name.toLowerCase().includes(search.toLowerCase()) ||
     e.dept.toLowerCase().includes(search.toLowerCase()) ||
     e.role.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <>
      <div className="page-header">
        <div>
          <div className="page-title">Employees</div>
          <div className="page-subtitle">{EMPLOYEES.filter(e=>e.status==='active').length} active · {EMPLOYEES.filter(e=>e.status==='invited').length} invited · {EMPLOYEES.filter(e=>e.status==='suspended').length} suspended</div>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline btn-sm"><Download/>Export</button>
          <button className="btn btn-primary btn-sm" onClick={()=>setShowAdd(true)}><UserPlus/>Add Employee</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid-4 mb-4">
        {[
          {label:'Total Headcount',val:EMPLOYEES.length,color:'var(--teal)'},
          {label:'Active',val:EMPLOYEES.filter(e=>e.status==='active').length,color:'var(--green)'},
          {label:'Invited / Pending',val:EMPLOYEES.filter(e=>e.status==='invited').length,color:'var(--amber)'},
          {label:'Suspended',val:EMPLOYEES.filter(e=>e.status==='suspended').length,color:'var(--red)'},
        ].map(s=>(
          <div className="card card-sm" key={s.label}>
            <div className="wc-label">{s.label}</div>
            <div className="wc-amount" style={{color:s.color,fontSize:26}}>{s.val}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4 items-center">
        <div className="search-bar" style={{width:280}}>
          <Search/><input placeholder="Search by name, role, department…" value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
        {['all','active','invited','suspended'].map(f=>(
          <button key={f} className={`btn btn-sm ${filter===f?'btn-primary':'btn-outline'}`} onClick={()=>setFilter(f)} style={{textTransform:'capitalize'}}>{f}</button>
        ))}
        <button className="btn btn-outline btn-sm" style={{marginLeft:'auto'}}><Filter/>Filter</button>
      </div>

      <div className="grid-3-2">
        {/* Employee table */}
        <div className="card p-0">
          <div className="table-wrap">
            <table>
              <thead><tr>
                <th>Employee</th><th>Role</th><th>Dept</th><th>Status</th><th>Since</th>
              </tr></thead>
              <tbody>
                {filtered.map(e=>(
                  <tr key={e.id} style={{cursor:'pointer'}} onClick={()=>setSelected(e)}>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="emp-avatar" style={{width:28,height:28,fontSize:10}}>{e.name.split(' ').map(n=>n[0]).join('')}</div>
                        <div><div style={{fontWeight:500,fontSize:12}}>{e.name}</div><div className="td-mono text-xs text-muted">{e.id}</div></div>
                      </div>
                    </td>
                    <td className="text-sm">{e.role}</td>
                    <td className="td-muted text-sm">{e.dept}</td>
                    <td><span className={`badge ${STATUS_MAP[e.status]}`}>{e.status}</span></td>
                    <td className="td-muted text-sm">{e.start}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Employee detail panel */}
        {selected ? (
          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="emp-avatar">{selected.name.split(' ').map(n=>n[0]).join('')}</div>
                <div>
                  <div style={{fontFamily:'Outfit',fontWeight:700,fontSize:14}}>{selected.name}</div>
                  <div className="text-xs text-secondary">{selected.role}</div>
                </div>
              </div>
              <button className="modal-close" onClick={()=>setSelected(null)}><X size={12}/></button>
            </div>
            <span className={`badge ${STATUS_MAP[selected.status]}`} style={{marginBottom:12,display:'inline-flex'}}>{selected.status}</span>

            <div className="stat-row"><span className="stat-label"><Mail size={11} style={{display:'inline',marginRight:4}}/>Email</span><span className="stat-value text-xs">{selected.email}</span></div>
            <div className="stat-row"><span className="stat-label"><Phone size={11} style={{display:'inline',marginRight:4}}/>Phone</span><span className="stat-value text-xs">{selected.phone}</span></div>
            <div className="stat-row"><span className="stat-label"><Briefcase size={11} style={{display:'inline',marginRight:4}}/>Department</span><span className="stat-value text-xs">{selected.dept}</span></div>
            <div className="stat-row"><span className="stat-label">Start Date</span><span className="stat-value text-xs">{selected.start}</span></div>

            <div className="divider"/>
            <div className="section-title mb-2" style={{fontSize:12}}>Compensation</div>
            <div className="stat-row"><span className="stat-label">Gross Salary</span><span className="stat-value font-mono">GHS {selected.salary.toLocaleString()}.00</span></div>
            <div className="stat-row"><span className="stat-label">PAYE (20%)</span><span className="stat-value font-mono text-amber">-GHS {selected.paye.toLocaleString()}.00</span></div>
            <div className="stat-row"><span className="stat-label">SSNIT (8%)</span><span className="stat-value font-mono text-amber">-GHS {selected.ssnit.toLocaleString()}.00</span></div>
            <div className="stat-row"><span className="stat-label">Net Pay</span><span className="stat-value font-mono text-green">GHS {selected.net.toLocaleString()}.00</span></div>

            <div className="flex gap-2 mt-3">
              <button className="btn btn-outline btn-sm w-full"><Edit2/>Edit</button>
              <button className="btn btn-ghost btn-sm w-full"><MoreHorizontal/>Actions</button>
            </div>
          </div>
        ) : (
          <div className="card" style={{display:'flex',alignItems:'center',justifyContent:'center',color:'var(--text-muted)',flexDirection:'column',gap:8}}>
            <Users size={28} style={{opacity:.3}}/>
            <span className="text-xs">Select an employee to view details</span>
          </div>
        )}
      </div>
    </>
  )
}

function PayrollEngine() {
  const [runStep, setRunStep] = useState(0) // 0=setup, 1=review, 2=signed-off
  const total = { gross: 184200, paye: 36840, ssnit: 14736, net: 132624 }

  const activeEmps = EMPLOYEES.filter(e=>e.status==='active')

  return (
    <>
      <div className="page-header">
        <div><div className="page-title">Payroll Engine</div><div className="page-subtitle">March 2026 — Monthly Run</div></div>
        <div className="flex gap-2 items-center">
          {runStep===0 && <button className="btn btn-primary" onClick={()=>setRunStep(1)}><Calculator/>Calculate Payroll</button>}
          {runStep===1 && <><button className="btn btn-outline" onClick={()=>setRunStep(0)}>Back</button><button className="btn btn-success" onClick={()=>setRunStep(2)}><CheckCircle/>Sign Off Run</button></>}
          {runStep===2 && <span className="badge badge-green animate-pulse">Awaiting Finance Disbursement</span>}
        </div>
      </div>

      {runStep===0 && <div className="alert alert-blue"><CheckCircle/><div>Click <strong>Calculate Payroll</strong> to compute PAYE, SSNIT, and net pay for all 8 active employees for March 2026.</div></div>}
      {runStep===2 && <div className="alert alert-green"><CheckCircle/><div><strong>Payroll signed off.</strong> Finance admin has been notified. The payroll run PR-2026-03 is awaiting disbursement approval in Banking Mode.</div></div>}

      {/* Summary cards */}
      {runStep>=1 && <div className="grid-4 mb-4 mt-4">
        <div className="card card-sm"><div className="wc-label">Total Gross</div><div className="wc-amount"><small>GHS </small>{(total.gross).toLocaleString()}.00</div></div>
        <div className="card card-sm"><div className="wc-label">Total PAYE</div><div className="wc-amount text-amber"><small>GHS </small>{(total.paye).toLocaleString()}.00</div></div>
        <div className="card card-sm"><div className="wc-label">Total SSNIT</div><div className="wc-amount text-amber"><small>GHS </small>{(total.ssnit).toLocaleString()}.00</div></div>
        <div className="card card-sm"><div className="wc-label">Total Net Pay</div><div className="wc-amount text-green"><small>GHS </small>{(total.net).toLocaleString()}.00</div></div>
      </div>}

      <div className={`card p-0 ${runStep===0?'opacity-50':''}`}>
        {runStep===0 && <div style={{position:'absolute',inset:0,zIndex:1,borderRadius:'var(--radius-lg)',background:'rgba(7,15,30,0.5)',display:'flex',alignItems:'center',justifyContent:'center'}}/>}
        <div style={{padding:'14px 14px 0',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <span className="section-title">Employee Payroll Breakdown</span>
          {runStep>=1 && <button className="btn btn-ghost btn-sm"><Download/>Export CSV</button>}
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr>
              <th>Employee</th><th>Dept</th><th className="td-right">Gross Pay</th>
              <th className="td-right">PAYE (20%)</th><th className="td-right">SSNIT T1 (5.5%)</th>
              <th className="td-right">SSNIT T2 (5%)</th><th className="td-right">Net Pay</th><th>Status</th>
            </tr></thead>
            <tbody>
              {activeEmps.map(e=>{
                const t1 = Math.round(e.salary*0.055)
                const t2 = Math.round(e.salary*0.05)
                const net = e.salary - e.paye - t1 - t2
                return (
                  <tr key={e.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="emp-avatar" style={{width:26,height:26,fontSize:9}}>{e.name.split(' ').map(n=>n[0]).join('')}</div>
                        <div><div style={{fontWeight:500,fontSize:12}}>{e.name}</div><div className="td-mono text-xs text-muted">{e.id}</div></div>
                      </div>
                    </td>
                    <td className="td-muted text-sm">{e.dept}</td>
                    <td className="td-right td-mono">GHS {e.salary.toLocaleString()}.00</td>
                    <td className="td-right td-mono text-amber">-{e.paye.toLocaleString()}.00</td>
                    <td className="td-right td-mono text-amber">-{t1.toLocaleString()}.00</td>
                    <td className="td-right td-mono text-amber">-{t2.toLocaleString()}.00</td>
                    <td className="td-right td-mono font-semibold text-green">GHS {net.toLocaleString()}.00</td>
                    <td><span className={`badge ${runStep===2?'badge-amber':'badge-muted'}`}>{runStep===2?'Awaiting Disburse':'Draft'}</span></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

function PayrollApprovals() {
  const [approved, setApproved] = useState(false)
  return (
    <>
      <div className="page-header">
        <div><div className="page-title">Payroll Approvals</div><div className="page-subtitle">Review and sign-off payroll runs before disbursement</div></div>
      </div>
      {!approved ? <>
        <div className="alert alert-amber"><AlertTriangle/><div><strong>1 payroll run awaiting your sign-off.</strong> Review the breakdown before approving.</div></div>
        <div className="card mt-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div style={{fontFamily:'Outfit',fontWeight:700,fontSize:15}}>March 2026 Payroll Run</div>
              <div className="text-xs text-secondary">Prepared by Abena Mensah · 27 Mar 2026 · Run ID: PR-2026-03</div>
            </div>
            <span className="badge badge-amber">Awaiting Sign-off</span>
          </div>
          <div className="grid-4 mb-4">
            {[['Employees','8'],['Gross Total','GHS 58,800.00'],['Total Deductions','GHS 14,800.00'],['Net Pay','GHS 44,000.00']].map(([l,v])=>(
              <div key={l} style={{padding:'10px 12px',background:'var(--surface-2)',borderRadius:8}}>
                <div className="wc-label">{l}</div>
                <div className="wc-amount" style={{fontSize:16}}>{v}</div>
              </div>
            ))}
          </div>
          <table><thead><tr><th>Employee</th><th className="td-right">Gross</th><th className="td-right">Deductions</th><th className="td-right">Net Pay</th></tr></thead>
          <tbody>
            {EMPLOYEES.filter(e=>e.status==='active').slice(0,5).map(e=>(
              <tr key={e.id}><td style={{fontSize:12,fontWeight:500}}>{e.name}</td>
                <td className="td-right td-mono">GHS {e.salary.toLocaleString()}.00</td>
                <td className="td-right td-mono text-amber">-GHS {(e.paye+e.ssnit).toLocaleString()}.00</td>
                <td className="td-right td-mono text-green">GHS {e.net.toLocaleString()}.00</td>
              </tr>
            ))}
          </tbody></table>
          <div className="alert alert-amber mt-3"><AlertTriangle/><div>Signing off will notify the Finance admin to fund and disburse. This action cannot be undone.</div></div>
          <div className="flex gap-2 justify-end mt-3">
            <button className="btn btn-outline"><X/>Reject Run</button>
            <button className="btn btn-success" onClick={()=>setApproved(true)}><CheckCircle/>Sign Off & Notify Finance</button>
          </div>
        </div>
      </> : (
        <div className="card" style={{textAlign:'center',padding:48}}>
          <CheckCircle size={40} style={{color:'var(--green)',margin:'0 auto 12px'}}/>
          <div style={{fontFamily:'Outfit',fontWeight:700,fontSize:16,marginBottom:4}}>Payroll Signed Off</div>
          <div className="text-secondary text-sm">Finance admin has been notified. Run ID: PR-2026-03</div>
          <div className="badge badge-green mt-3" style={{display:'inline-flex'}}>Awaiting Disbursement</div>
        </div>
      )}
    </>
  )
}

function LeaveManagement() {
  const [selected, setSelected] = useState(null)
  return (
    <>
      <div className="page-header">
        <div><div className="page-title">Leave Management</div><div className="page-subtitle">3 pending approvals · 12 approved this month</div></div>
        <button className="btn btn-outline btn-sm"><Download/>Export</button>
      </div>
      <div className="grid-4 mb-4">
        {[
          {label:'Pending',val:3,color:'var(--amber)'},
          {label:'Approved (Mar)',val:7,color:'var(--green)'},
          {label:'On Leave Today',val:1,color:'var(--blue)'},
          {label:'Annual Days Remaining',val:'16.5 avg',color:'var(--teal)'},
        ].map(s=>(
          <div className="card card-sm" key={s.label}>
            <div className="wc-label">{s.label}</div>
            <div className="wc-amount" style={{color:s.color,fontSize:22}}>{s.val}</div>
          </div>
        ))}
      </div>
      <div className="card p-0">
        <div style={{padding:'14px 14px 0'}}><span className="section-title">Leave Requests</span></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Employee</th><th>Type</th><th>From</th><th>To</th><th>Days</th><th>Submitted</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {LEAVE_DATA.map(l=>(
                <tr key={l.id}>
                  <td style={{fontWeight:500,fontSize:12}}>{l.emp}</td>
                  <td className="text-sm">{l.type}</td>
                  <td className="td-mono text-xs">{l.from}</td>
                  <td className="td-mono text-xs">{l.to}</td>
                  <td className="td-mono text-center">{l.days}</td>
                  <td className="td-muted text-xs">{l.submitted}</td>
                  <td><span className={`badge ${l.status==='pending'?'badge-amber':'badge-green'}`}>{l.status}</span></td>
                  <td>
                    {l.status==='pending' && <div className="flex gap-1">
                      <button className="btn btn-success btn-sm" style={{padding:'3px 8px',fontSize:10}}>Approve</button>
                      <button className="btn btn-danger btn-sm" style={{padding:'3px 8px',fontSize:10}}>Deny</button>
                    </div>}
                    {l.status==='approved' && <span className="text-xs text-muted">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

function PerformancePage() {
  const reviews = [
    {emp:'Kofi Asante',cycle:'Q1 2026',rating:4.2,status:'In Review',reviewer:'Kwame Boateng'},
    {emp:'Abena Mensah',cycle:'Q1 2026',rating:4.8,status:'Completed',reviewer:'Adwoa Sarpong'},
    {emp:'Esi Amoah',cycle:'Q1 2026',rating:3.9,status:'Draft',reviewer:'Adwoa Sarpong'},
    {emp:'Ama Owusu',cycle:'Q1 2026',rating:0,status:'Not Started',reviewer:'Yaw Darko'},
  ]
  return (
    <>
      <div className="page-header">
        <div><div className="page-title">Performance Reviews</div><div className="page-subtitle">Q1 2026 cycle · 2 of 8 completed</div></div>
        <button className="btn btn-primary btn-sm"><Plus/>New Review Cycle</button>
      </div>
      <div className="card p-0">
        <div style={{padding:'14px 14px 0'}}><span className="section-title">Current Cycle — Q1 2026</span></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Employee</th><th>Review Cycle</th><th>Reviewer</th><th>Rating</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {reviews.map(r=>(
                <tr key={r.emp}>
                  <td style={{fontWeight:500,fontSize:12}}>{r.emp}</td>
                  <td className="td-muted text-sm">{r.cycle}</td>
                  <td className="text-sm">{r.reviewer}</td>
                  <td>
                    {r.rating>0 ? (
                      <div className="flex items-center gap-1">
                        {[1,2,3,4,5].map(s=><Star key={s} size={11} fill={s<=r.rating?'var(--amber)':'none'} style={{color:'var(--amber)'}}/>)}
                        <span className="td-mono text-xs ml-1">{r.rating}</span>
                      </div>
                    ) : <span className="text-xs text-muted">Not rated</span>}
                  </td>
                  <td><span className={`badge ${r.status==='Completed'?'badge-green':r.status==='In Review'?'badge-blue':r.status==='Draft'?'badge-amber':'badge-muted'}`}>{r.status}</span></td>
                  <td><button className="btn btn-ghost btn-sm"><Edit2/>Review</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

function CompliancePage() {
  return (
    <>
      <div className="page-header">
        <div><div className="page-title">Compliance Reports</div><div className="page-subtitle">PAYE & SSNIT deduction summaries for GRA and SSNIT filing</div></div>
        <button className="btn btn-primary btn-sm"><Download/>Download All</button>
      </div>
      <div className="grid-2 mb-4">
        <div className="card">
          <div className="section-header"><span className="section-title">PAYE Summary — March 2026</span><span className="badge badge-amber">Due: 14 Apr</span></div>
          <div className="stat-row"><span className="stat-label">Total Employees</span><span className="stat-value">8</span></div>
          <div className="stat-row"><span className="stat-label">Total Gross Pay</span><span className="stat-value font-mono">GHS 58,800.00</span></div>
          <div className="stat-row"><span className="stat-label">Total PAYE Deducted</span><span className="stat-value font-mono text-amber">GHS 11,760.00</span></div>
          <div className="stat-row"><span className="stat-label">Remittance Status</span><span className="stat-value"><span className="badge badge-amber">Pending</span></span></div>
          <button className="btn btn-outline btn-sm w-full mt-3"><Download/>Download P9A Form</button>
        </div>
        <div className="card">
          <div className="section-header"><span className="section-title">SSNIT Summary — March 2026</span><span className="badge badge-amber">Due: 14 Apr</span></div>
          <div className="stat-row"><span className="stat-label">Total Employees</span><span className="stat-value">8</span></div>
          <div className="stat-row"><span className="stat-label">Employee Contribution (5.5%)</span><span className="stat-value font-mono text-amber">GHS 3,234.00</span></div>
          <div className="stat-row"><span className="stat-label">Employer Contribution (13%)</span><span className="stat-value font-mono text-amber">GHS 7,644.00</span></div>
          <div className="stat-row"><span className="stat-label">Total SSNIT Payable</span><span className="stat-value font-mono text-red">GHS 10,878.00</span></div>
          <button className="btn btn-outline btn-sm w-full mt-3"><Download/>Download SSNIT Schedule</button>
        </div>
      </div>
      <div className="card p-0">
        <div style={{padding:'14px 14px 0'}}><span className="section-title">Per-Employee Deduction Detail — March 2026</span></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Employee</th><th>SSNIT No.</th><th className="td-right">Gross</th><th className="td-right">PAYE</th><th className="td-right">SSNIT Emp</th><th className="td-right">SSNIT Empr</th><th className="td-right">Net Pay</th></tr></thead>
            <tbody>
              {EMPLOYEES.filter(e=>e.status==='active').map(e=>{
                const t1=Math.round(e.salary*0.055), empR=Math.round(e.salary*0.13)
                return <tr key={e.id}>
                  <td style={{fontWeight:500,fontSize:12}}>{e.name}</td>
                  <td className="td-mono text-xs text-muted">SSN-{e.id.replace('EMP-','')}-GH</td>
                  <td className="td-right td-mono">GHS {e.salary.toLocaleString()}.00</td>
                  <td className="td-right td-mono text-amber">GHS {e.paye.toLocaleString()}.00</td>
                  <td className="td-right td-mono text-amber">GHS {t1.toLocaleString()}.00</td>
                  <td className="td-right td-mono text-amber">GHS {empR.toLocaleString()}.00</td>
                  <td className="td-right td-mono text-green">GHS {e.net.toLocaleString()}.00</td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
