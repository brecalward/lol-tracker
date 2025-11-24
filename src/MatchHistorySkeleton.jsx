export default function MatchHistorySkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between bg-gray-800 rounded-full border border-gray-600 px-6 py-3 animate-pulse"
          style={{ minHeight: "48px" }}
        >
          {/* Queue Type */}
          <div className="bg-blue-500 rounded-full px-3 py-1 text-sm w-36" />

          {/* Champion Name */}
          <div className="bg-gray-700 rounded px-10 py-1 text-sm w-28 mx-auto" />

          {/* K/D/A */}
          <div className="bg-gray-700 rounded px-8 py-1 text-sm w-20" />

          {/* Win/Loss */}
          <div className="bg-red-600 rounded px-6 py-1 text-sm w-12" />

          {/* CS */}
          <div className="bg-gray-700 rounded px-8 py-1 text-sm w-20" />
        </div>
      ))}
    </div>
  );
}
