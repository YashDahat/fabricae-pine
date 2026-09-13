import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ManufacturingProcess() {
  const processSteps = [
    {
      id: 1,
      title: 'Design & Concept',
      description:
        'Our journey begins with innovative design and meticulous concept development, where creativity meets market trends to envision unique garments.',
      icon: '🎨',
    },
    {
      id: 2,
      title: 'Material Sourcing',
      description:
        'We carefully select premium, sustainable fabrics and materials, ensuring quality, durability, and ethical sourcing for every product.',
      icon: '🌿',
    },
    {
      id: 3,
      title: 'Pattern Making & Grading',
      description:
        'Expert pattern makers craft precise patterns, which are then graded to ensure a perfect fit across all sizes.',
      icon: '📐',
    },
    {
      id: 4,
      title: 'Cutting',
      description:
        'Advanced cutting technology ensures accuracy and minimizes waste, preparing the fabric for assembly.',
      icon: '✂️',
    },
    {
      id: 5,
      title: 'Stitching & Assembly',
      description:
        'Skilled artisans meticulously stitch and assemble each garment, paying close attention to detail and construction.',
      icon: '🧵',
    },
    {
      id: 6,
      title: 'Quality Control',
      description:
        'Every garment undergoes rigorous quality checks to meet our high standards before it reaches our customers.',
      icon: '✅',
    },
    {
      id: 7,
      title: 'Finishing & Packaging',
      description:
        'Garments are finished with care, pressed, and thoughtfully packaged, ready for delivery.',
      icon: '📦',
    },
  ];

  return (
    <section className="py-16 px-4 bg-[#F5F5DC]" data-testid="manufacturing-process-section">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#333333]">
          Our Manufacturing Process
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processSteps.map((step) => (
            <Card
              key={step.id}
              className="bg-white rounded-xl shadow-md border border-gray-100 p-6 transition-all duration-200 hover:shadow-lg"
              data-testid={`process-step-card-${step.id}`}
            >
              <CardHeader className="flex flex-row items-center gap-4 p-0 pb-4">
                <div className="text-4xl">{step.icon}</div>
                <CardTitle className="text-xl font-semibold text-[#0A4837]">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <Separator className="mb-4 bg-gray-200" />
              <CardContent className="p-0">
                <p className="text-[#333333] leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}