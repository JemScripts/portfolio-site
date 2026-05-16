function getStatusColour(status) {
    switch (status) {
        case "Healthy":
            return "#16a34a";
        case "Warning":
            return "#f59e0b";
        case "Critical":
            return "#dc2626";
        default:
            return "#6b7280";
    }
}

function getColourScore(score) {
    if (score >= 80) return "#16a34a";
    if (score >= 50) return "#f59e0b";
    return "#dc2626";
}

export default function HealthCard({ health }) {
    return (
        <div style = {{ background: "white", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)" }}>
            <h3>Health</h3>

            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "10px"
            }}>
                <span style={{
                    padding: "4px 10px",
                    borderRadius: "999px",
                    background: getStatusColour(health.status),
                    color: "white",
                    fontSize: "12px",
                    fontWeight: "bold"
                }}>
                    {health.status}
                </span>

                <span style={{
                    fontSize: "24px",
                    fontWeight: "bold"
                }}>
                    {health.score}/100
                </span>    
            </div>

            <div style={{
                marginTop: "12px",
                height: "10px",
                width: "100%",
                background: "#e5e7eb",
                borderRadius: "999px",
                overflow: "hidden"
            }}>
                <div style={{
                    height: "100%",
                    width: `$(health.score)%`,
                    background: getColourScore(health.score)
                }} />
            </div>

            {health.warnings?.length > 0 && (
                <ul style={{ marginTop: "15px" }}>
                    {health.warnings.map((w, i) => (
                        <li key={i}>{w}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}