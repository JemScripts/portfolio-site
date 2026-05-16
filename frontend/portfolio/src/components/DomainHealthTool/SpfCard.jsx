function getSeverityColour(severity) {
    switch (severity) {
        case "Good":
            return "#16a34a";
        case "Warning":
            return "#f59e0b";
        case "Critical":
            return "#dc2626";
        default:
            return "#6b7280";
    }
}

export default function SpfCard({ spf }) {
    return (
        <div style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
        }}>
            <h3>SPF</h3>

            <span style={{
                padding: "4px 10px",
                borderRadius: "999px",
                background: getSeverityColour(spf.severity),
                color: "white",
                fontSize: "12px",
                fontWeight: "bold"
            }}>
                {spf.severity}
            </span>

            <p><b>Has SPF:</b> {spf.hasSpf ? "Yes" : "No" }</p>
            <p><b>SPF Record:</b> {spf.spfRecord || "Not Found"}</p>

            {spf.warnings?.length > 0 && (
                <ul>
                   {spf.warnings.map((w, i) => (
                        <li key={i}>{w}</li>
                   ))} 
                </ul>
            )}
        </div>
    );
}