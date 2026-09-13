import { useAuth } from '@/context/AuthContext';
import { InquiryHistoryTable } from '@/components/client/InquiryHistoryTable';
import DashboardHeader from '@/components/client/DashboardHeader';

export default function ClientDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#F5F5DC]">
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {user && <DashboardHeader clientName={user.username} />}
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#333333] mb-6">Your Inquiry History</h2>
          <InquiryHistoryTable />
        </div>
      </section>
    </div>
  );
}