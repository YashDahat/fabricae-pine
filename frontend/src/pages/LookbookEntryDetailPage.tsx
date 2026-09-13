import type { JSX } from 'react';
import { useParams } from 'react-router-dom';
import { useLookbookEntryById } from '@/hooks/lookbookHooks';
import { Skeleton } from '@/components/ui/skeleton';

export default function LookbookEntryDetailPage(): React.JSX.Element {
  const { id } = useParams<{ id: string }>();
  const entryId = id ? parseInt(id, 10) : undefined;

  const { data: entry, isLoading, isError, error } = useLookbookEntryById(entryId as number);

  if (isLoading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-[400px] w-full" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-red-600">
          <p>Error loading lookbook entry: {error?.message}</p>
        </div>
      </section>
    );
  }

  if (!entry) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <p>Lookbook entry not found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-[#333333] mb-8 text-center" data-testid="lookbook-entry-title">
          {entry.title}
        </h1>

        <div className="mb-8 overflow-hidden rounded-lg shadow-lg">
          <img
            src={entry.imageUrl}
            alt={entry.title}
            className="w-full h-96 object-cover object-center"
            data-testid="lookbook-entry-image"
          />
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-lg text-[#333333] leading-relaxed whitespace-pre-line" data-testid="lookbook-entry-content">
            {entry.content}
          </p>
          <p className="text-sm text-gray-500 mt-6" data-testid="lookbook-entry-date">
            Published on: {new Date(entry.publicationDate).toLocaleDateString('en-IN')}
          </p>
        </div>
      </div>
    </section>
  );
}