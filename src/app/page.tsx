import Link from 'next/link';
import { Suspense } from 'react';
import { z } from 'zod';

import List from '../components/List/List';
import getData from '../services/get-data';

type HomeProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

const searchParamsSchema = z.object({
  offset: z.any().optional().pipe(z.coerce.number()).catch(0),
  limit: z.any().optional().pipe(z.coerce.number()).catch(10),
});

export default async function Home({ searchParams }: HomeProps) {
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

      <section>
        <h2 className="mb-4">Always show suspense fallback when new data is fetched</h2>
        <Suspense
          fallback={<p className="motion-safe:animate-pulse">Loading numbers!</p>}
          key={`${offset}-${limit}`}
        >
          <List itemsPromise={getDataPromise} />
        </Suspense>

        <div className="flex gap-4 mt-4">
          <Link
            href={{
              query: { offset: prevOffset, limit: 10 },
            }}
          >
            Prev
          </Link>
          <Link
            href={{
              query: { offset: nextOffset, limit: 10 },
            }}
          >
            Next
          </Link>
        </div>
      </section>
    </main>
  );
}
