import type { JSX } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useLookbookEntries } from '@/hooks/lookbookHooks';
import { LookbookEntryDto } from '@/types/lookbook';
import { format } from 'date-fns';

interface LookbookTableProps {
  onEdit: (entry: LookbookEntryDto) => void;
  onDelete: (entry: LookbookEntryDto) => void;
}

export function LookbookTable({ onEdit, onDelete }: LookbookTableProps): React.JSX.Element {
  const { data: entries, isLoading, isError, error } = useLookbookEntries();

  if (isLoading) {
    return <div>Loading lookbook entries...</div>;
  }

  if (isError) {
    return <div>Error loading lookbook entries: {error?.message}</div>;
  }

  if (!entries || entries.length === 0) {
    return <div className="text-center py-8">No lookbook entries found.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table data-testid="lookbook-table">
        <TableHeader>
          <TableRow className="bg-[#F5F5DC] text-[#333333] font-semibold">
            <TableHead>Title</TableHead>
            <TableHead>Publication Date</TableHead>
            <TableHead>Image</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry.id} data-testid={`lookbook-entry-${entry.id}`}>
              <TableCell className="font-medium">{entry.title}</TableCell>
              <TableCell>{format(new Date(entry.publicationDate), 'PPP')}</TableCell>
              <TableCell>
                <img src={entry.imageUrl} alt={entry.title} className="w-16 h-16 object-cover rounded-md" />
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(entry)}
                  className="mr-2 hover:bg-[#E0E0C4] transition-all duration-200"
                  data-testid={`lookbook-edit-${entry.id}`}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(entry)}
                  className="hover:opacity-80 transition-all duration-200"
                  data-testid={`lookbook-delete-${entry.id}`}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}