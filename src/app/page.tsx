import { Suspense } from 'react';

import List from '../components/List/List';
import getData from '../services/get-data';

export default async function Home() {
  const getDataPromise = getData(0, 10);

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <h1>Test</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <List itemsPromise={getDataPromise} />
      </Suspense>
    </main>
  );
}
