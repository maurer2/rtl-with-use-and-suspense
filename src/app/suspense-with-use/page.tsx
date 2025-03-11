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

      <h2 className="mb-4">Show suspense fallback on load and also when new data is fetched.</h2>

      <p className="mb-4">
        "Prev" and "Next" trigger navigation to the same server component/page, which then returns a
        new promise, that is awaited in the client component within a suspense boundary, while the
        fallback is shown. Content outside of the suspense boundary is rendered on the server. The
        suspense fallback is also shown when new data is being fetched by resetting the suspense
        boundary via the key prop.{' '}
        <a
          href="
        https://react.dev/reference/react/Suspense#resetting-suspense-boundaries-on-navigation"
          className="italic underline"
        >
          See React docs
        </a>
        .
      </p>

      <div className="mb-4">
        <Suspense
          fallback={<p className="motion-safe:animate-pulse">Loading numbers (Suspense)!</p>}
          key={`${offset}-${limit}`}
        >
          <List itemsPromise={getDataPromise} />

          <div className="flex gap-4 mt-4 mb-4">
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
        </Suspense>
      </div>

      <Link href="/">Back</Link>
    </main>
  );
}
