import type { JSX } from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LookbookTable } from '@/components/lookbook/admin/LookbookTable';
import LookbookForm from '@/components/lookbook/admin/LookbookForm';
import { DeleteConfirmationDialog } from '@/components/shared/DeleteConfirmationDialog';
import { useLookbookEntries, useDeleteLookbookEntry } from '@/hooks/lookbookHooks';
import { LookbookEntryDto } from '@/types/lookbook';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminLookbookPage(): React.JSX.Element {
  const { data: lookbookEntries, isLoading, isError, error } = useLookbookEntries();
  const { mutate: deleteLookbookEntry } = useDeleteLookbookEntry();

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [selectedEntry, setSelectedEntry] = useState<LookbookEntryDto | null>(null);

  const handleEdit = (entry: LookbookEntryDto): void => {
    setSelectedEntry(entry);
    setIsFormOpen(true);
  };

  const handleDelete = (entry: LookbookEntryDto): void => {
    setSelectedEntry(entry);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = (): void => {
    if (selectedEntry) {
      deleteLookbookEntry(selectedEntry.id, {
        onSuccess: () => {
          toast.success('Lookbook entry deleted successfully.');
          setIsDeleteDialogOpen(false);
          setSelectedEntry(null);
        },
        onError: (err) => {
          toast.error(`Failed to delete lookbook entry: ${err.message}`);
        },
      });
    }
  };

  const handleFormClose = (): void => {
    setIsFormOpen(false);
    setSelectedEntry(null);
  };

  const handleFormSuccess = (): void => {
    toast.success('Lookbook entry saved successfully.');
    handleFormClose();
  };

  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-red-600">
        Error loading lookbook entries: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Lookbook Entries</h1>
        <Button onClick={() => { setSelectedEntry(null); setIsFormOpen(true); }} data-testid="create-lookbook-entry-cta">
          Add New Entry
        </Button>
      </div>

      <LookbookTable
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedEntry ? 'Edit Lookbook Entry' : 'Create New Lookbook Entry'}</DialogTitle>
          </DialogHeader>
          <LookbookForm
            entry={selectedEntry}
            onClose={handleFormClose}
            onSuccess={handleFormSuccess}
          />
        </DialogContent>
      </Dialog>

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        itemType="lookbook entry"
        itemName={selectedEntry?.title || ''}
      />
    </div>
  );
}