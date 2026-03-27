import { useState, Component } from 'react'
import './index.css'
import { Building2, Users, ShoppingCart, Bell, Settings } from 'lucide-react'
import BankingMode from './modes/BankingMode'
import HRMode from './modes/HRMode'
import POSMode from './modes/POSMode'

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: null } }
  static getDerivedStateFromError(e) { return { error: e } }
  render() {
    if (this.state.error) return (
      <div style={{padding:32,color:'#D92C20',fontFamily:'Inter',fontSize:13,background:'#FEF2F1',borderRadius:8,margin:24,border:'1px solid rgba(240,68,55,0.3)'}}>
        <strong>Runtime Error:</strong><br/>{this.state.error.message}<br/><br/>
        <pre style={{fontSize:11,color:'#535861',whiteSpace:'pre-wrap'}}>{this.state.error.stack}</pre>
      </div>
    )
    return this.props.children
  }
}

const MODES = [
  { id: 'banking', label: 'Banking', Icon: Building2 },
  { id: 'hr',      label: 'HR',      Icon: Users },
  { id: 'pos',     label: 'POS',     Icon: ShoppingCart },
]

export default function App() {
  const [mode, setMode] = useState('banking')

  return (
    <div className="app-shell">
      {/* Top Bar */}
      <header className="top-bar">
        <div className="logo-area">
          <div className="logo-mark">DX</div>
          <div>
            <div className="logo-name">Dex<span>win</span></div>
            <div className="logo-sub">SME Platform</div>
          </div>
        </div>

        <nav className="mode-switcher">
          {MODES.map(({ id, label, Icon }) => (
            <button
              key={id}
              className={`mode-tab ${id} ${mode === id ? 'active' : ''}`}
              onClick={() => setMode(id)}
            >
              <Icon />
              {label}
            </button>
          ))}
        </nav>

        <div className="top-bar-right">
          <span className="role-chip">Finance Admin</span>
          <button className="icon-btn">
            <Bell />
            <span className="badge-dot" />
          </button>
          <button className="icon-btn">
            <Settings />
          </button>
          <div className="avatar-btn">KN</div>
        </div>
      </header>

      {/* Mode Content */}
      <div className="main-area">
        <ErrorBoundary>
          {mode === 'banking' && <BankingMode />}
          {mode === 'hr'      && <HRMode />}
          {mode === 'pos'     && <POSMode />}
        </ErrorBoundary>
      </div>
    </div>
  )
}
