
import { useState } from "react";
import { Filter, Calendar, MessageSquare } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useClientDrawer } from "@/contexts/ClientDrawerContext";

// Sample AI-generated weekly summaries
const weeklyThreads = [
  {
    id: 1,
    clientId: 1,
    clientName: "Global Industries Inc.",
    weekRange: "June 8-14, 2025",
    summary: "Confirmed order #ORD-2025-1245 for 50 units of Industrial Sensors X-5200 with delivery estimated for June 20th. Client expressed satisfaction with order processing time. Follow-up scheduled for June 16th to confirm shipment details.",
    tags: ["order", "confirmation", "delivery"],
    aiGenerated: true,
    edited: false
  },
  {
    id: 2,
    clientId: 2,
    clientName: "Tech Solutions Ltd.",
    weekRange: "June 8-14, 2025",
    summary: "Initial discussion about Smart Control Systems implementation timeline. Client's technical team is ready to begin integration. Will schedule a call to discuss implementation details and provide technical documentation. Client emphasized importance of meeting the July 1st launch date.",
    tags: ["implementation", "timeline", "integration"],
    aiGenerated: true,
    edited: true
  },
  {
    id: 3,
    clientId: 3,
    clientName: "Premier Enterprises",
    weekRange: "June 8-14, 2025",
    summary: "Pricing inquiry for bulk order (20+ units) of Manufacturing Tools Kit. Provided 15% volume discount quote. Client is reviewing internally with decision expected by June 15th. Potential to establish recurring quarterly orders if satisfied with initial delivery.",
    tags: ["pricing", "bulk order", "quote"],
    aiGenerated: true,
    edited: false
  }
];

// Sample AI-generated client summaries
const clientSummaries = [
  {
    clientId: 1,
    clientName: "Global Industries Inc.",
    summary: "Global Industries Inc. has been a consistent client since 2020, starting with quarterly purchases of industrial equipment. They became a major account in 2023 with a 45% increase in order value. Their main focus is on manufacturing equipment for the automotive industry. Recent discussions have centered around expanding their production line and implementing new automation solutions.",
    keyInsights: [
      "Consistent quarterly purchasing pattern",
      "45% growth in order value since 2023",
      "Interested in automation solutions",
      "Planning production line expansion"
    ]
  },
  {
    clientId: 2,
    clientName: "Tech Solutions Ltd.",
    summary: "Tech Solutions Ltd. joined as a client in 2022 with initial small orders for testing our systems. They quickly scaled up purchases after successful pilot implementation. Their communication focuses on technical specifications and integration support. They value quick response times and detailed documentation. Recent conversations indicate plans to implement our systems across their entire European division.",
    keyInsights: [
      "Values technical documentation",
      "Rapid scaling after successful pilots",
      "European expansion plans",
      "Prioritizes integration support"
    ]
  },
  {
    clientId: 3,
    clientName: "Premier Enterprises",
    summary: "Premier Enterprises has been a client since 2021, primarily purchasing manufacturing tools with seasonal ordering patterns. They tend to place larger orders in Q2 and Q4. Price sensitivity is a key factor in their purchasing decisions, and they often request bulk discounts. Their feedback has led to three product improvements. Recent communications suggest interest in our new premium tool line.",
    keyInsights: [
      "Seasonal ordering patterns (Q2/Q4 heavy)",
      "Price sensitive, seeks discounts",
      "Provided valuable product feedback",
      "Interest in premium product line"
    ]
  }
];

const Communication = () => {
  const { openClientDrawer } = useClientDrawer();
  
  const handleClientClick = (clientId: number) => {
    openClientDrawer(clientId);
  };
  
  return (
    <AppLayout>
      <PageHeader 
        title="Client Communication" 
        description="AI-analyzed customer communication history"
      />
      
      <Tabs defaultValue="weekly" className="space-y-4">
        <TabsList className="grid grid-cols-2 max-w-md">
          <TabsTrigger value="weekly">
            <Calendar className="h-4 w-4 mr-2" />
            Weekly Summary
          </TabsTrigger>
          <TabsTrigger value="ai-summary">
            <MessageSquare className="h-4 w-4 mr-2" />
            AI Client Insights
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="weekly" className="space-y-4">
          {weeklyThreads.map((thread) => (
            <Card key={thread.id} className="relative">
              <CardHeader className="pb-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Week of {thread.weekRange}
                      {thread.aiGenerated && (
                        <Badge variant="outline" className="ml-2">AI Generated</Badge>
                      )}
                      {thread.edited && (
                        <Badge variant="outline" className="ml-2">Edited</Badge>
                      )}
                    </CardTitle>
                    <p 
                      className="text-sm text-primary hover:underline cursor-pointer mt-1"
                      onClick={() => handleClientClick(thread.clientId)}
                    >
                      {thread.clientName}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit Summary
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{thread.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {thread.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary">#{tag}</Badge>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm">
                    View Email Thread
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="ai-summary" className="space-y-4">
          {clientSummaries.map((client) => (
            <Card key={client.clientId}>
              <CardHeader className="pb-2">
                <CardTitle>
                  <span 
                    className="text-primary hover:underline cursor-pointer"
                    onClick={() => handleClientClick(client.clientId)}
                  >
                    {client.clientName}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">{client.summary}</p>
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Key Insights</h4>
                  <ul className="space-y-2">
                    {client.keyInsights.map((insight, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="bg-primary/20 text-primary rounded-full p-1 mt-0.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-3 h-3"
                          >
                            <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                            <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                          </svg>
                        </span>
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm">
                    View Complete Communication History
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Communication;
