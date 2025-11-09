"use client";

import { FaceFrownIcon } from "@heroicons/react/24/outline";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="text-center p-4">
      <FaceFrownIcon className="mx-auto w-12" />
      <h1>Something went wrong</h1>
      <p>This should not have happened.</p>
      <button className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
