import type { JSX } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardSummary(): React.JSX.Element {
  const summaryItems = [
    { title: 'Total Products', value: '150', dataTestId: 'total-products-card' },
    { title: 'New Inquiries', value: '5', dataTestId: 'new-inquiries-card' },
    { title: 'Lookbook Entries', value: '20', dataTestId: 'lookbook-entries-card' },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {summaryItems.map((item) => (
        <Card key={item.title} data-testid={item.dataTestId}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            {/* Icon placeholder */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}