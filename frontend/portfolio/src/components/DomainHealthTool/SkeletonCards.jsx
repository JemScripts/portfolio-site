export default function SkeletonCards() {
    return (
        <div>
            <SkeletonBox height="90px" />
                <div style={{
                    display:"grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                    marginTop: "20px"
                }}>
                    <SkeletonBox height="170px" />
                    <SkeletonBox height="170px" />
                    <SkeletonBox height="180px" span />
                </div>
        </div>
    );
}

function SkeletonBox({ height, span = false }) {
    return (
        <div
        style={{
            height,
            gridColumn: span ? "span 2" : "auto",
            background: "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)",
            backgroundSize: "200% 100%",
            borderRadius: "10px",
            animation: "pulse 1.4s ease-in-out infinite"
        }}>
            <style>
                {`
                    @keyframes pulse {
                        0% { background-position: 200% 0%; }
                        100% { background-position: -200% 0%; }
                    }
                `}
            </style>
        </div>
    );
}