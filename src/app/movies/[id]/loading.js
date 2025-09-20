export default function Loading() {
  return (
    <article className="mx-auto max-w-5xl">
      <div className="mb-3 h-5 w-28 bg-gray-200 rounded animate-pulse" />
      <div className="h-8 w-2/3 bg-gray-200 rounded animate-pulse" />

      <div className="mt-6 grid gap-6 md:grid-cols-[320px_1fr] items-start">
        <div className="rounded-xl border border-gray-200 bg-white p-3">
          <div className="h-[480px] bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="h-4 w-40 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="h-20 w-full bg-gray-200 rounded animate-pulse" />
          <div className="mt-6 h-10 w-48 rounded-md bg-gray-200 animate-pulse" />
        </div>
      </div>
    </article>
  );
}
