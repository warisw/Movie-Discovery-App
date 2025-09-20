export default function ListSkeleton() {
  return (
    <div className="p-4">
      <div className="mb-6 h-24 rounded-2xl bg-gray-200 animate-pulse" />
      <ul className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(240px,1fr))]">
        {Array.from({ length: 8 }).map((_, i) => (
          <li key={i} className="border border-gray-200 rounded-xl p-4">
            <div className="w-full aspect-[2/3] rounded-md bg-gray-200 animate-pulse" />
            <div className="mt-2 h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="mt-2 h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
          </li>
        ))}
      </ul>
    </div>
  );
}
