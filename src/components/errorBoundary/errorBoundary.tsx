import { Component, ErrorInfo, ReactNode } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface Props {
  children?: ReactNode;
  hasError?: boolean;
  error?: Error | null;
  errorInfo?: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props & RouteComponentProps> {
  state: Props = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true, error, errorInfo });
  }

  componentDidUpdate(prevProps: RouteComponentProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ hasError: false });
    }
  }

  render() {
    const { hasError, error, errorInfo } = this.state;
    if (hasError) {
      return (
        <div className="app">
          <div className="app-container">
            <div className="container">
              <div className="page-header mb-3">
                <h1 style={{ color: "red", marginLeft: "-30px" }}>
                  The below error occurred:
                </h1>
              </div>
              <div className="card border-none">
                <div className="card-body">
                  <p>
                    <strong style={{ color: "red" }}>Error Details:</strong>
                  </p>
                  {error ? (
                    <div>
                      <pre style={{ color: "red" }}>
                        <code>
                          {error.toString() || "Something went wrong!"}
                        </code>
                      </pre>
                    </div>
                  ) : null}
                  {errorInfo && errorInfo.componentStack ? (
                    <div>
                      <pre style={{ color: "red" }}>
                        <code>{errorInfo && errorInfo.componentStack}</code>
                      </pre>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
