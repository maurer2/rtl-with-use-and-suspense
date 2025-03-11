'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTransition } from 'react';

type PaginationClientProps = {
  offset: number;
  limit: number;
};

function PaginationClient({ offset, limit }: PaginationClientProps) {
  const router = useRouter();
  const pathName = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleNext = () => {
    const nextOffset = offset + limit;

    const newURLParams = new URLSearchParams({
      offset: nextOffset.toString(),
      limit: limit.toString(),
    });

    startTransition(() => {
      router.push(`${pathName}?${newURLParams.toString()}`);
      // window.history.pushState(null, '', '?' + newURLParams.toString()); // https://github.com/vercel/next.js/issues/66016
    });
  };

  const handlePrev = () => {
    const prevOffset = Math.max(offset - limit, 0);

    const newURLParams = new URLSearchParams({
      offset: prevOffset.toString(),
      limit: limit.toString(),
    });

    startTransition(() => {
      router.push(`${pathName}?${newURLParams.toString()}`);
    });
  };

  return (
    <>
      {isPending ? (
        <p className="motion-safe:animate-pulse">Loading numbers (useTransition)!</p>
      ) : null}
      <div className="flex gap-4 mt-4" inert={isPending}>
        <button onClick={handlePrev}>Prev</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </>
  );
}

export default PaginationClient;
