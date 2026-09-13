import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LookbookEntryDto } from '@/types/lookbook';
import { ROUTES } from '@/routes';

interface LookbookCardProps {
  entry: LookbookEntryDto;
}

export function LookbookCard({ entry }: LookbookCardProps): React.JSX.Element {
  return (
    <Card className="overflow-hidden rounded-xl shadow-md border border-gray-100 transition-all duration-200 hover:shadow-lg">
      <Link to={ROUTES.LOOKBOOK_ENTRY_DETAIL.replace(':id', String(entry.id))} data-testid={`lookbook-card-${entry.id}`}>
        <CardHeader className="p-0">
          <img
            src={entry.imageUrl}
            alt={entry.title}
            className="w-full h-48 object-cover"
          />
        </CardHeader>
        <CardContent className="p-6">
          <CardTitle className="text-lg font-semibold text-[#333333] hover:text-[#D4AF37]">
            {entry.title}
          </CardTitle>
        </CardContent>
      </Link>
    </Card>
  );
}