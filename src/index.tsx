import React, { Component, ErrorInfo, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

class ErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          backgroundColor: 'black', 
          color: '#ef4444', 
          padding: '40px', 
          fontFamily: 'monospace', 
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '20px', textTransform: 'uppercase' }}>System Critical Failure</h1>
          <pre style={{ 
            backgroundColor: 'rgba(127, 29, 29, 0.2)', 
            padding: '20px', 
            borderRadius: '8px', 
            border: '1px solid rgba(239, 68, 68, 0.5)',
            maxWidth: '800px',
            overflow: 'auto',
            fontSize: '0.8rem',
            marginBottom: '30px'
          }}>
            {this.state.error?.toString()}
          </pre>
          <div style={{ display: 'flex', gap: '20px' }}>
            <button 
              onClick={() => window.location.reload()}
              style={{
                padding: '12px 24px',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                textTransform: 'uppercase'
              }}
            >
              Reboot System
            </button>
            <button 
              onClick={() => {
                window.localStorage.clear();
                window.location.reload();
              }}
              style={{
                padding: '12px 24px',
                backgroundColor: 'transparent',
                color: '#ef4444',
                border: '1px solid #ef4444',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                textTransform: 'uppercase'
              }}
            >
              Wipe Memory & Reset
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

console.log("WHOAMISEC_CORE: Initializing React mount...");

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("WHOAMISEC_CORE: Root element not found!");
  document.body.innerHTML = '<div style="color: red; padding: 20px;">CRITICAL ERROR: Root element #root not found.</div>';
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ErrorBoundary>
      </React.StrictMode>
    );
    console.log("WHOAMISEC_CORE: React mount successful.");
  } catch (err: any) {
    console.error("WHOAMISEC_CORE: React mount failed:", err);
    rootElement.innerHTML = `<div style="color: red; padding: 20px;"><h1>Mount Failed</h1><pre>${err.toString()}</pre></div>`;
  }
}
