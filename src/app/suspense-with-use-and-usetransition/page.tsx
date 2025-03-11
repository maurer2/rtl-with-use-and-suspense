import Link from 'next/link';
import { Suspense } from 'react';

import List from '../../components/List/List';
import PaginationClient from '../../components/PaginationClient/PaginationClient';
import getData from '../../services/get-data';
import { searchParamsSchema } from '../schemas';

type SuspenseWithUseAndUseTransitionPageProps = {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function SuspenseWithUseAndUseTransitionPage({
  searchParams,
}: SuspenseWithUseAndUseTransitionPageProps) {
  const { offset, limit } = searchParamsSchema.parse({
    offset: (await searchParams)?.offset,
    limit: (await searchParams)?.limit,
  });

  const getDataPromise = getData(offset, limit);

  return (
    <main className="m-4">
      <h1 className="mb-4">Suspense with use</h1>

      <h2 className="mb-4">Show suspense fallback on load only and use transition afterwards.</h2>
      <p className="mb-4">
        "Prev" and "Next" trigger navigation to the same server component/page, which then returns a
        new promise, that is awaited in the client component within a suspense boundary. The stale
        content remains visible while the new data is being fetched by wrapping the router.push
        calls in a useTransition call.
      </p>

      <div className="mb-4">
        <Suspense
          fallback={<p className="motion-safe:animate-pulse">Loading numbers (Suspense)!</p>}
        >
          <List itemsPromise={getDataPromise} />

          <div className="mb-4 mt-4">
            <PaginationClient offset={offset} limit={limit} />
          </div>
        </Suspense>
      </div>

      <Link href="/">Home</Link>
    </main>
  );
}
