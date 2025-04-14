
import { TrendChart } from "@/components/dashboard/TrendChart";
import { TopPerformers } from "@/components/dashboard/TopPerformers";

interface ChartsSectionProps {
  onClientSelect?: (clientId: number) => void;
}

export function ChartsSection({ onClientSelect }: ChartsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="md:col-span-2">
        <TrendChart className="w-full h-[400px]" />
      </div>
      <div className="md:col-span-1">
        <TopPerformers className="w-full h-[400px]" onClientSelect={onClientSelect} />
      </div>
    </div>
  );
}
