import type { JSX } from 'react';
import DashboardSummary from '@/components/admin/DashboardSummary';

export default function AdminDashboardPage(): React.JSX.Element {
  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#333333] mb-6">Admin Dashboard</h1>
        <p className="text-lg text-[#333333] mb-8">Welcome to the admin portal. Here you can manage products, inquiries, and lookbook entries.</p>

        <DashboardSummary />
      </div>
    </div>
  );
}