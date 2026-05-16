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
    <div className="mx-auto max-w-5xl bg-slate-50 p-8 font-sans">
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
                <div className="mb-5 rounded-2xl bg-white p-5 shadow-sm">
                    <h2 className="m-0 text-2xl font-semibold text-slate-900">{data.domain}</h2>
                    <p className="mt-2 text-lg text-slate-700">
                        Score: <b>{data.health.score}</b> - {data.health.status}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
                    <HealthCard health = {data.health} />
                    <SpfCard spf = {data.spf} />
                    <DnsRecordsCard dns = {data.dns} />
                </div>
            </>
        )}
    </div>
  );
}