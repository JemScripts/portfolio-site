function getStatusColour(status) {
    switch (status) {
        case "Healthy":
            return "bg-green-600";
        case "Warning":
            return "bg-amber-500";
        case "Critical":
            return "bg-red-600";
        default:
            return "bg-slate-500";
    }
}

function getColourScore(score) {
    if (score >= 80) return "bg-green-600";
    if (score >= 50) return "bg-amber-500";
    return "bg-red-600";
}

export default function HealthCard({ health }) {
    if (!health) return null;

    const score = health.score ?? 0;
    const status = health.status ?? "Unknown";

    return (
        <div className="rounded-xl bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold text-slate-900">Health</h3>

            <div className="flex items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-bold text-white ${getStatusColour(status)}`}>
                    {status}
                </span>

                <span className="text-2xl font-bold text-slate-900">
                    {score}/100
                </span>
            </div>

            <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-slate-200">
                <div 
                className={`h-full transition-all duration-300 ${getColourScore(score)}`}
                style={{ width: `${score}%` }}
                />
            </div>

            {health.warnings?.length > 0 && (
                <ul className="mt-5 space-y-2 text-sm text-slate-700">
                    {health.warnings.map((w, i) => (
                        <li key={i} className="rounded-md border border-amber-200 bg-amber-50 p-2">{w}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}