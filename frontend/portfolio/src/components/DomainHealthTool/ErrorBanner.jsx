export default function ErrorBanner({ message, onRetry }) {
    return (
        <div className="mb-4 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
            <span className="text-sm font-medium">
                {message}
            </span>
        
            <button onClick={onRetry}
            className="rounded-mg bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-700 ">
                Retry
            </button>

        </div>
    );
}