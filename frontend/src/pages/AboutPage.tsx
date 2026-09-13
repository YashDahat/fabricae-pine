import type { JSX } from 'react';
import CompanyStory from '@/components/about/CompanyStory';
import ManufacturingProcess from '@/components/about/ManufacturingProcess';

export default function AboutPage(): React.JSX.Element {
  return (
    <div className="bg-white text-[#333333]">
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <CompanyStory />
        </div>
      </section>

      <section className="py-16 px-4 bg-[#F5F5DC]">
        <div className="max-w-7xl mx-auto">
          <ManufacturingProcess />
        </div>
      </section>
    </div>
  );
}