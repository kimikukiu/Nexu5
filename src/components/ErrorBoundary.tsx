import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      let errorMessage = "An unexpected error occurred.";
      let errorDetails = "";

      try {
        // Check if the error is a FirestoreErrorInfo JSON string
        const parsedError = JSON.parse(this.state.error?.message || "");
        if (parsedError.error && parsedError.operationType) {
          errorMessage = `Firestore Error: ${parsedError.operationType} operation failed.`;
          errorDetails = parsedError.error;
        }
      } catch (e) {
        // Not a JSON error, use the standard error message
        errorMessage = this.state.error?.message || errorMessage;
      }

      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#111] border border-[#dc2626]/30 rounded-2xl p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-[#dc2626]/10 rounded-full flex items-center justify-center mx-auto">
              <i className="fas fa-exclamation-triangle text-[#dc2626] text-2xl"></i>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">System Malfunction</h2>
              <p className="text-gray-400 text-sm">{errorMessage}</p>
              {errorDetails && (
                <p className="text-[#dc2626] text-[10px] font-mono mt-2 break-all">{errorDetails}</p>
              )}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold py-3 rounded-xl transition-all"
            >
              Reboot Neural Link
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
