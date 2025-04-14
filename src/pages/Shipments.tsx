import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Legend, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";
import { ChevronLeft } from "lucide-react";
import { useClientDrawer } from "@/contexts/ClientDrawerContext";

const productShipmentData = [
  { 
    product: "Industrial Sensors X-5200", 
    value: 1200, 
    previousYear: 950,
  },
  { 
    product: "Smart Control Systems", 
    value: 980, 
    previousYear: 870,
  },
  { 
    product: "Heavy Machinery Parts", 
    value: 850, 
    previousYear: 920,
  },
  { 
    product: "Enterprise Software License", 
    value: 750, 
    previousYear: 650,
  },
  { 
    product: "Manufacturing Tools Kit", 
    value: 620, 
    previousYear: 480,
  },
];

const countryShipmentData = {
  "Industrial Sensors X-5200": [
    { country: "United States", value: 650, previousYear: 540 },
    { country: "Germany", value: 280, previousYear: 180 },
    { country: "China", value: 160, previousYear: 130 },
    { country: "Brazil", value: 110, previousYear: 100 },
  ],
  "Smart Control Systems": [
    { country: "United States", value: 420, previousYear: 380 },
    { country: "Japan", value: 250, previousYear: 240 },
    { country: "Germany", value: 210, previousYear: 170 },
    { country: "United Kingdom", value: 100, previousYear: 80 },
  ],
};

const regionShipmentData = {
  "United States": [
    { region: "West Coast", value: 310, previousYear: 260 },
    { region: "Midwest", value: 220, previousYear: 180 },
    { region: "Northeast", value: 120, previousYear: 100 },
  ],
  "Germany": [
    { region: "Bavaria", value: 150, previousYear: 120 },
    { region: "Berlin", value: 90, previousYear: 60 },
    { region: "North Rhine", value: 40, previousYear: 0 },
  ],
};

const clientShipmentData = {
  "West Coast": [
    { client: "Global Industries Inc.", value: 180, previousYear: 150 },
    { client: "Smart Systems Corp.", value: 130, previousYear: 110 },
  ],
  "Midwest": [
    { client: "Acme Manufacturing", value: 140, previousYear: 110 },
    { client: "Future Electronics", value: 80, previousYear: 70 },
  ],
};

const clientIdMap: Record<string, number> = {
  "Global Industries Inc.": 1,
  "Smart Systems Corp.": 5,
  "Acme Manufacturing": 4,
  "Future Electronics": 6,
};

const Shipments = () => {
  const [drillLevel, setDrillLevel] = useState("product");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const { openClientDrawer } = useClientDrawer();
  
  const handleDrillDown = (data: any) => {
    if (drillLevel === "product") {
      setSelectedProduct(data.product);
      setDrillLevel("country");
    } else if (drillLevel === "country") {
      setSelectedCountry(data.country);
      setDrillLevel("region");
    } else if (drillLevel === "region") {
      setSelectedRegion(data.region);
      setDrillLevel("client");
    }
  };
  
  const handleDrillUp = () => {
    if (drillLevel === "country") {
      setSelectedProduct("");
      setDrillLevel("product");
    } else if (drillLevel === "region") {
      setSelectedCountry("");
      setDrillLevel("country");
    } else if (drillLevel === "client") {
      setSelectedRegion("");
      setDrillLevel("region");
    }
  };

  const handleClientClick = (clientName: string) => {
    const clientId = clientIdMap[clientName];
    if (clientId) {
      openClientDrawer(clientId);
    }
  };
  
  let chartData = productShipmentData;
  let xAxisDataKey = "product";
  let title = "Shipment Volume by Product";
  let subtitle = "";
  
  if (drillLevel === "country") {
    chartData = countryShipmentData[selectedProduct] || [];
    xAxisDataKey = "country";
    title = "Shipment Volume by Country";
    subtitle = `Product: ${selectedProduct}`;
  } else if (drillLevel === "region") {
    chartData = regionShipmentData[selectedCountry] || [];
    xAxisDataKey = "region";
    title = "Shipment Volume by Region";
    subtitle = `Product: ${selectedProduct} / Country: ${selectedCountry}`;
  } else if (drillLevel === "client") {
    chartData = clientShipmentData[selectedRegion] || [];
    xAxisDataKey = "client";
    title = "Shipment Volume by Client";
    subtitle = `Product: ${selectedProduct} / Country: ${selectedCountry} / Region: ${selectedRegion}`;
  }
  
  const currentTotal = chartData.reduce((sum, item) => sum + item.value, 0);
  const previousTotal = chartData.reduce((sum, item) => sum + item.previousYear, 0);
  const yoyChange = previousTotal > 0 
    ? Math.round(((currentTotal - previousTotal) / previousTotal) * 100) 
    : 0;
  
  return (
    <AppLayout>
      <PageHeader 
        title="Shipment Overview" 
        description="Track shipment volumes by product, region, and client"
      />
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
            <div>
              <CardTitle>{title}</CardTitle>
              {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
            </div>
            
            {drillLevel !== "product" && (
              <Button variant="outline" size="sm" onClick={handleDrillUp}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col md:flex-row md:items-end justify-between">
            <div>
              <p className="text-2xl font-bold">{currentTotal.toLocaleString()} units</p>
              <div className="flex items-center gap-2 mt-1">
                <p className={yoyChange >= 0 ? "text-success" : "text-destructive"}>
                  {yoyChange >= 0 ? "+" : ""}{yoyChange}% vs last year
                </p>
                <p className="text-sm text-muted-foreground">
                  ({previousTotal.toLocaleString()} units)
                </p>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mt-2 md:mt-0">
              {drillLevel === "client" ? "Click on client names to view details" : "Click on bars to drill down"}
            </p>
          </div>
          
          <div className="h-[400px] mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 70 }}
                barGap={0}
                barCategoryGap="20%"
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey={xAxisDataKey} 
                  tick={{ fontSize: 12 }}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => value.toLocaleString()}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: 8,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="value" 
                  name="Current Year" 
                  fill="hsl(var(--primary))" 
                  onClick={drillLevel === "client" 
                    ? (data) => handleClientClick(data.client) 
                    : handleDrillDown
                  }
                  cursor="pointer"
                />
                <Bar 
                  dataKey="previousYear" 
                  name="Previous Year" 
                  fill="hsl(var(--muted))"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default Shipments;
