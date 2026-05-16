export default function SkeletonCards() {
    return (
        <div>
            <SkeletonBox className="h-24" />
                <div className="mt-5 grid grids-cols-2 gap-5 max-md:grid-cols-1">
                    <SkeletonBox className="h-44" />
                    <SkeletonBox className="h-44" />
                    <SkeletonBox className="col-span-2 h-48 max-md:col-span-1" />
                </div>
        </div>
    );
}

function SkeletonBox({ className }) {
    return (
        <div
            className={`animate-pulse rounded-xl bg-slate-200 ${className}`}
        />
    );
}