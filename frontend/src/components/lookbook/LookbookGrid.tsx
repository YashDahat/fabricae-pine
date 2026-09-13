import { LookbookEntryDto } from '@/types/lookbook';
import { LookbookCard } from '@/components/lookbook/LookbookCard';

interface LookbookGridProps {
  entries: LookbookEntryDto[];
}

export function LookbookGrid({ entries }: LookbookGridProps): React.JSX.Element {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {entries.map((entry) => (
        <LookbookCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
}