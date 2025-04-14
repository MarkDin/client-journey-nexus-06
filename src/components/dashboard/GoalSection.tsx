
import { useState } from "react";
import { GoalCompletionChart } from "@/components/dashboard/GoalCompletionChart";
import { ClientDetail } from "@/components/clients/ClientDetail";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function GoalSection() {
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  
  // Sample top performers that would be fetched from a real API
  const topPerformers = [
    { id: 1, name: "Global Industries Inc.", amount: 320000 },
    { id: 2, name: "Tech Solutions Ltd.", amount: 245000 },
    { id: 3, name: "Acme Corporation", amount: 210000 }
  ];
  
  return (
    <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <GoalCompletionChart className="w-full" />
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Top Performers</CardTitle>
          <CardDescription>Clients with highest goal achievement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPerformers.map((client) => (
              <div key={client.id} className="flex items-center justify-between">
                <div>
                  <button 
                    onClick={() => setSelectedClientId(client.id)}
                    className="text-left hover:text-primary transition-colors font-medium hover:underline"
                  >
                    {client.name}
                  </button>
                  <p className="text-sm text-muted-foreground">${client.amount.toLocaleString()}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setSelectedClientId(client.id)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {selectedClientId && (
        <ClientDetail 
          clientId={selectedClientId} 
          onClose={() => setSelectedClientId(null)}
          open={selectedClientId !== null}
        />
      )}
    </div>
  );
}
