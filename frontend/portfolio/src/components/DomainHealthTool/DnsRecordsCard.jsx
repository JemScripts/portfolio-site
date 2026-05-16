export default function DnsRecordsCard({ dns }) {
    return (
        <div style= {{     
            gridColumn: "span 2",
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}
        >
            <h3>DNS Records</h3>

        <div style={{
            display:"grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "15px"
        }}>
                <RecordList title="A Records" records={dns.a} />
                <RecordList title="MX Records" records={dns.mx} />
                <RecordList title="TXT Records" records={dns.text} />
            </div>
        </div>
    );
}

function RecordList({ title, records }) {
    return (
        <div style={{
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "12px",
        background: "#f9fafb"
        }}>
            <h4 style={{ marginTop: 0 }}>{title}: </h4>
            
            {records?.length > 0 ? (
                <ul style={{ paddingLeft: "18px", wordBreak: "break-word" }}>
                    {records.map((r, i) => (
                        <li key={i}>{r}</li>
                    ))}
                </ul>
            ) : (
                <p style={{ color: "##6b7280", fontStyle: "italic" }}>None found</p>
            )}
        </div>
    );
}