export default function SearchBar({ domain, setDomain, onSearch, loading}) {
    return (
        <div style={{ marginBottom: "25px", display: "flex", gap: "10px"}}>

            <input 
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") onSearch();
                }}
                placeholder="Enter domain name"
                style = {{
                    padding: "8px",
                    width: "300px",
                    border: "1px solid #ccc",
                    borderRadius: "6px"
                }}
            />

            <button 
                onClick={onSearch} 
                disabled={loading} 
                style = {{
                    padding: "8px",
                    background: loading ? "#93c5fd" : "#2563eb",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: loading ? "not-allowed" : "pointer"
                }}
                > 
                    {loading ? "Searching..." : "Search" } 
            </button>
        </div>
    );
}