import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: "20px", fontFamily: "sans-serif", color: "#333" }}>
                    <h1>Oops! Algo salió mal.</h1>
                    <p>La aplicación ha encontrado un error inesperado.</p>
                    <pre style={{
                        backgroundColor: "#f5f5f5",
                        padding: "15px",
                        borderRadius: "5px",
                        overflow: "auto",
                        marginTop: "20px"
                    }}>
                        {this.state.error?.toString()}
                    </pre>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
