import Link from 'next/link';
import { Suspense } from 'react';

import List from '../../components/List/List';
import getData from '../../services/get-data';
import { searchParamsSchema } from '../schemas';

type SuspenseWithUsePageProps = {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function SuspenseWithUsePage({ searchParams }: SuspenseWithUsePageProps) {
  const { offset, limit } = searchParamsSchema.parse({
    offset: (await searchParams)?.offset,
    limit: (await searchParams)?.limit,
  });

  const getDataPromise = getData(offset, limit);

  const nextOffset = offset + limit;
  const prevOffset = Math.max(offset - limit, 0);

  return (
    <main className="m-4">
      <h1 className="mb-4">Suspense with use</h1>

      <h2 className="mb-4">Show suspense fallback on load and when new data is fetched</h2>

      <div className="mb-4">
        <Suspense
          fallback={<p className="motion-safe:animate-pulse">Loading numbers (Suspense)!</p>}
          key={`${offset}-${limit}`}
        >
          <List itemsPromise={getDataPromise} />
        </Suspense>
      </div>

      <div className="flex gap-4 mb-4">
        <Link
          href={{
            query: { offset: prevOffset, limit },
          }}
        >
          Prev
        </Link>
        <Link
          href={{
            query: { offset: nextOffset, limit },
          }}
        >
          Next
        </Link>
      </div>

      <Link href="/">Back</Link>
    </main>
  );
}
