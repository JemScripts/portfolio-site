import { useState } from "react";
import DnsRecordsCard from "./DnsRecordsCard.jsx";
import ErrorBanner from "./ErrorBanner.jsx";
import HealthCard from "./HealthCard.jsx";
import SearchBar from "./SearchBar.jsx";
import SkeletonCards from "./SkeletonCards.jsx";
import SpfCard from "./SpfCard.jsx";

const API = import.meta.env.VITE_API_BASE_URL;

export default function DomainHealthTool() {
  const [domain, setDomain] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckDomain = async () => {
    if (!domain.trim()) return;

    setLoading(true);
    setError(null);

   
    try {
        const response = await fetch(
            `${API}/api/domainhealth?domain=${encodeURIComponent(domain)}`
        );
    
        if (!response. ok) {
            throw new Error("Unable to retrieve domain health data");
        }

        const result = await response.json();

      setData(result);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "sans-serif", maxWidth: "1000px", margin: "0 auto", background: "#f9fafb" }}>
        <h1 className="text-3xl font-bold text-blue-600">Domain Health Checker</h1>

        <SearchBar
            domain={domain}
            setDomain={setDomain}
            onSearch={handleCheckDomain}
            loading={loading}
        />

        {error && (
            <ErrorBanner 
                message={error}
                onRetry={handleCheckDomain}
            />
        )}

        {!data && !loading && !error && (
            <div style={{
                background: "white",
                padding: "30px",
                borderRadius: "12px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                textAlign: "center"
            }}>
                <h2>
                    Check a domain's DNS and email security posture
                </h2>
                <p style={{ color: "#6b7280", maxWidth: "600px", margin: "10px auto" }}>
                    Enter a domain above to retrieve A, MX, TXT records, detect SPF configuration and generate a health score.
                </p>
            </div>
        )}

        {loading && <SkeletonCards />}

        {!loading && data && (
            <>
                <div style={{ background: "white", padding: "20px", borderRadius: "20px", marginBottom: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
                    <h2 style= {{ margin: 0 }}>{data.domain}</h2>
                    <p style = {{ fontSize:"18px", marginTop: "10px" }}>
                        Score: <b>{data.health.score}</b> - {data.health.status}
                    </p>
                </div>

                <div style = {{
                    display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px"
                }}>
                    <HealthCard health = {data.health} />
                    <SpfCard spf = {data.spf} />
                    <DnsRecordsCard dns = {data.dns} />
                </div>
            </>
        )}
    </div>
  );
}