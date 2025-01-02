'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

type PaginationClientProps = {
  offset: number;
  limit: number;
};

function PaginationClient({ offset, limit }: PaginationClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleNext = () => {
    const nextOffset = offset + limit;

    const newURLParams = new URLSearchParams({
      offset: nextOffset.toString(),
      limit: limit.toString(),
    });

    startTransition(() => {
      router.replace(`/?${newURLParams.toString()}`);
    });
  };

  const handlePrev = () => {
    const prevOffset = Math.max(offset - limit, 0);

    const newURLParams = new URLSearchParams({
      offset: prevOffset.toString(),
      limit: limit.toString(),
    });

    startTransition(() => {
      router.replace(`/?${newURLParams.toString()}`);
    });
  };

  return (
    <>
      {isPending ? <p className="motion-safe:animate-pulse">Loading numbers!</p> : null}
      <div className="flex gap-4 mt-4">
        <button onClick={handlePrev}>Prev</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </>
  );
}

export default PaginationClient;
