import { Separator } from '@/components/ui/separator';

export default function CompanyStory(): React.JSX.Element {
  return (
    <section className="py-16 px-4 bg-white" data-testid="company-story-section">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#333333] mb-8 text-center">
          Our Story & Mission
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#0A4837]">The Fabricae PINE Legacy</h3>
            <p className="text-[#333333] leading-relaxed">
              Fabricae PINE began with a vision to blend timeless elegance with modern
              sustainability. Founded in [Year], our journey started in a small workshop
              with a handful of dedicated artisans. From the outset, we committed to
              crafting garments that not only look exquisite but also stand the test of
              time, both in durability and style. Our name, "Fabricae PINE," reflects
              this ethos: "Fabricae" (Latin for 'workshops' or 'factories') signifies
              our commitment to meticulous craftsmanship, and "PINE" evokes the enduring
              strength and natural beauty of the pine tree.
            </p>
            <p className="text-[#333333] leading-relaxed">
              Over the decades, we have grown, but our core values remain unchanged. We
              continue to honor traditional tailoring techniques while embracing
              innovative, eco-friendly practices. Every stitch, every cut, and every
              fabric choice is made with precision and purpose, ensuring that each
              Fabricae PINE garment is a masterpiece of design and quality.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#0A4837]">Our Mission & Values</h3>
            <p className="text-[#333333] leading-relaxed">
              At Fabricae PINE, our mission is to empower individuals through exceptional
              apparel that embodies confidence, comfort, and conscious living. We believe
              that true luxury lies in quality that lasts, design that inspires, and
              production that respects both people and the planet.
            </p>
            <ul className="list-disc list-inside text-[#333333] leading-relaxed space-y-2">
              <li>
                <strong className="text-[#0A4837]">Craftsmanship:</strong> We uphold the
                highest standards of artistry, ensuring every garment is meticulously
                constructed.
              </li>
              <li>
                <strong className="text-[#0A4837]">Sustainability:</strong> We are
                dedicated to responsible sourcing, ethical manufacturing, and minimizing
                our environmental footprint.
              </li>
              <li>
                <strong className="text-[#0A4837]">Innovation:</strong> We continuously
                explore new techniques and materials to enhance comfort, durability, and
                style.
              </li>
              <li>
                <strong className="text-[#0A4837]">Integrity:</strong> We operate with
                transparency and honesty, building trust with our customers, employees,
                and partners.
              </li>
              <li>
                <strong className="text-[#0A4837]">Timelessness:</strong> We create
                designs that transcend fleeting trends, offering enduring style for every
                wardrobe.
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-12 bg-gray-200" />

        <div className="text-center space-y-4">
          <h3 className="text-xl font-bold text-[#0A4837]">Our Vision for the Future</h3>
          <p className="text-[#333333] leading-relaxed max-w-3xl mx-auto">
            We envision a future where fashion is synonymous with responsibility and
            longevity. Fabricae PINE is committed to leading the way in sustainable
            luxury, inspiring a global community to choose quality over quantity, and to
            invest in garments that tell a story of ethical production and timeless
            beauty. Join us as we continue to weave this narrative, one exquisite garment
            at a time.
          </p>
        </div>
      </div>
    </section>
  );
}