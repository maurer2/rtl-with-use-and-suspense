import Link from 'next/link';

export default function Home() {
  return (
    <main className="m-4">
      <h1 className="mb-4">Suspense stuff</h1>

      <ul className="list-disc list-inside">
        <li>
          <Link href="/suspense-with-use">
            Suspense with <code>use()</code>
          </Link>
        </li>
        <li>
          <Link href="/suspense-with-use-and-usetransition">
            Suspense with <code>use()</code> and <code>useTransition()</code>
          </Link>
        </li>
      </ul>
    </main>
  );
}
