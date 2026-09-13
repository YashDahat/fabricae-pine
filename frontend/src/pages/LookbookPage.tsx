import { LookbookGrid } from '@/components/lookbook/LookbookGrid';
import { useLookbookEntries } from '@/hooks/lookbookHooks';
import { Skeleton } from '@/components/ui/skeleton';

export default function LookbookPage() {
  const { data: entries, isLoading, isError, error } = useLookbookEntries();

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <section className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: 'url(/images/lookbook-hero.jpg)' }}>
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="relative z-10 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Collections</h1>
            <p className="text-lg md:text-xl">Explore the latest designs and inspirations from Fabricae PINE.</p>
          </div>
        </section>
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12 text-[#333333]">Discover Our Unique Styles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-[300px] w-full rounded-xl" />
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-red-600">Error</h1>
        <p className="text-lg text-gray-700">Failed to load lookbook entries: {error?.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: 'url(/images/lookbook-hero.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="lookbook-hero-title">Our Collections</h1>
          <p className="text-lg md:text-xl" data-testid="lookbook-hero-subtitle">Explore the latest designs and inspirations from Fabricae PINE.</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12 text-[#333333]" data-testid="lookbook-section-title">Discover Our Unique Styles</h2>
          {entries && entries.length > 0 ? (
            <LookbookGrid entries={entries} />
          ) : (
            <div className="text-center text-gray-600 text-lg">No lookbook entries found.</div>
          )}
        </div>
      </section>
    </div>
  );
}