export default function SearchBar({ domain, setDomain, onSearch, loading}) {
    return (
        <div className="mb-6 flex gap-3 max-sm:flex-col">

            <input 
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") onSearch();
                }}
                placeholder="Enter domain name"
                className="flex-1 rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                //className="w-75 rounded-md border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 max-sm:w-full"
            />

            <button 
                onClick={onSearch} 
                disabled={loading} 
                className="rounded-xl bg-blue-600 px-5 py-3 text-white font-medium hover:bg-blue-700 transition"
                //className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                > 
                    {loading ? "Searching..." : "Search" } 
            </button>
        </div>
    );
}