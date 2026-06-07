import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-text-faint">404</p>
        <h1 className="mt-4 font-serif text-3xl font-light text-text">Page not found</h1>
        <Link href="/" className="mt-8 inline-block font-mono text-[0.72rem] uppercase tracking-[0.14em] text-accent hover:underline">
          ← back home
        </Link>
      </div>
    </main>
  );
}
