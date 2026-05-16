function getSeverityColour(severity) {
    switch (severity) {
        case "Good":
            return "bg-green-600";
        case "Warning":
            return "bg-amber-500";
        case "Critical":
            return "bg-red-600";
        default:
            return "bg-slate-500";
    }
}

export default function SpfCard({ spf }) {
    if(!spf) return null;

    return (
        <div className="rounded-xl bg-white p-5 shadow-sm hover:shadow-md">
            <h3 className="mb-4 text-xl font-semibold text-slate-900">SPF</h3>

            <span className={`rounded-full px-3 py-1 text-xs font-bold text-white ${getSeverityColour(spf.severity)}`}>
                {spf.severity}
            </span>
            
            <div className="mt-4 space-y-2 text-sm text-slate-700">
                <p><b>Has SPF:</b> {spf.hasSpf ? "Yes" : "No" }</p>
        

                <p className="break-words">
                    <b>Records:</b> {spf.spfRecord || "Not Found"}
                </p>
            </div>

            {spf.warnings?.length > 0 && (
                <ul className="mt-5 space-y-2 text-sm text-slate-700">
                   {spf.warnings.map((w, i) => (
                        <li key={i} className="rounded-md border border-amber-200 bg-amber-50 p-2">{w}</li>
                   ))} 
                </ul>
            )}
        </div>
    );
}