export function Skeleton() {
    return (
        <div className="flex flex-1 flex-col animate-pulse items-center justify-center gap-4 bg-zinc-50 px-4 py-8 dark:bg-zinc-900 sm:px-6 lg:px-8">
            <div className="flex h-12 w-3/4 max-w-md rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="flex h-12 w-3/4 max-w-md rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
    );
}