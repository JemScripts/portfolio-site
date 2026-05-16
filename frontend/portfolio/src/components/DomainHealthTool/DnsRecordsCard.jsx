export default function DnsRecordsCard({ dns }) {
    if (!dns) return null;

    return (
        <div className="col-span-2 rounded-xl bg-white p-5 shadow-sm transition hover:shadow-md max-md:col-span-1">
            <h3 className="mb-4 text-xl font-semibold text-slate-900">
                DNS Records
            </h3>

        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
                <RecordList title="A Records" records={dns.a} />
                <RecordList title="MX Records" records={dns.mx} />
                <RecordList title="TXT Records" records={dns.text} />
            </div>
        </div>
    );
}

function RecordList({ title, records }) {
    return (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h4 className="mb-3 font-semibold text-slate-900">{title} </h4>
            
            {records?.length > 0 ? (
                <ul className="space-y-2 wrap-break-word pl-4 text-sm text-slate-700">
                    {records.map((r, i) => (
                        <li key={i}>{r}</li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm italic text-slate-500">None found</p>
            )}
        </div>
    );
}