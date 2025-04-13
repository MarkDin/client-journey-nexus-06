
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { country: "USA", users: 4500 },
  { country: "UK", users: 2300 },
  { country: "Canada", users: 1800 },
  { country: "Germany", users: 1200 },
  { country: "France", users: 1000 },
  { country: "Australia", users: 900 },
  { country: "Japan", users: 850 },
  { country: "India", users: 700 },
];

export function UserLocationMap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Locations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{
                top: 5,
                right: 30,
                left: 70,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} horizontal={true} vertical={false} />
              <XAxis type="number" />
              <YAxis dataKey="country" type="category" width={70} />
              <Tooltip />
              <Bar dataKey="users" fill="#8884d8" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
