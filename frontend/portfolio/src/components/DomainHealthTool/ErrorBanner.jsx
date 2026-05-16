export default function ErrorBanner({ message, onRetry }) {
    return (
        <div style={{ background: "#fee2e2", color: "#991b1b", padding: "12px", borderRadius: "8px", marginBottom: "15px", display: "flex", justifyContent: "space-between" }}>
            <span>
                {message}
            </span>
        
            <button onClick={onRetry}
            style={{
                background: "#dc2626",
                color: "white",
                border: "none",
                padding: "6px 10px",
                borderRadius: "6px"
            }}>
                Retry
            </button>

        </div>
    );
}