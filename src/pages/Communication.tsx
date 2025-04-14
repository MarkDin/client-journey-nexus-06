
import { useState, useEffect } from "react";
import { Filter, Calendar, MessageSquare, Pencil, Mail, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useClientDrawer } from "@/contexts/ClientDrawerContext";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription, 
  SheetClose,
  SheetFooter
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

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

const emailsByThreadId = {
  1: [
    {
      id: 101,
      from: "Michael Johnson",
      email: "mjohnson@globalindustries.com",
      to: "John Doe",
      date: "June 14, 2025 10:32 AM",
      subject: "Order Confirmation #ORD-2025-1245",
      content: "Hi John,\n\nThank you for processing our order so quickly. We're pleased to confirm our order #ORD-2025-1245 for 50 units of Industrial Sensors X-5200.\n\nCan you please confirm the expected delivery date? We're hoping to receive the shipment by June 20th if possible.\n\nBest regards,\nMichael Johnson\nProcurement Manager\nGlobal Industries Inc."
    },
    {
      id: 102,
      from: "John Doe",
      email: "john.doe@yourcompany.com",
      to: "Michael Johnson",
      date: "June 14, 2025 11:45 AM",
      subject: "Re: Order Confirmation #ORD-2025-1245",
      content: "Hello Michael,\n\nThank you for your order. I can confirm that we've scheduled delivery for June 20th as requested. The order is being processed now and will ship out on June 18th.\n\nWould you like me to send you tracking information once it's available?\n\nBest regards,\nJohn Doe\nAccount Manager"
    },
    {
      id: 103,
      from: "Michael Johnson",
      email: "mjohnson@globalindustries.com",
      to: "John Doe",
      date: "June 14, 2025 2:15 PM",
      subject: "Re: Order Confirmation #ORD-2025-1245",
      content: "Hi John,\n\nThat's perfect, thank you for confirming. Yes, please do send the tracking information once available.\n\nWe appreciate the quick turnaround on this order.\n\nBest regards,\nMichael"
    }
  ],
  2: [
    {
      id: 201,
      from: "Robert Lee",
      email: "rlee@techsolutions.com",
      to: "Jane Smith",
      date: "June 12, 2025 9:15 AM",
      subject: "Smart Control Systems Implementation",
      content: "Hello Jane,\n\nFollowing our discussion last week, I wanted to confirm that our technical team is ready to begin the integration of the Smart Control Systems. We've reviewed the documentation you sent over and have a few questions about the implementation timeline.\n\nCan we schedule a call this week to go over the details? It's important for us to meet the July 1st launch date.\n\nBest regards,\nRobert Lee\nCTO\nTech Solutions Ltd."
    },
    {
      id: 202,
      from: "Jane Smith",
      email: "jane.smith@yourcompany.com",
      to: "Robert Lee",
      date: "June 12, 2025 10:30 AM",
      subject: "Re: Smart Control Systems Implementation",
      content: "Hi Robert,\n\nI'm glad to hear your team is ready to proceed. I'd be happy to schedule a call this week to discuss the implementation timeline and answer any questions you might have.\n\nHow does Thursday at 2 PM sound? I'll send over some additional technical documentation before our call that should help clarify some of the integration points.\n\nRegards,\nJane Smith\nSolutions Architect"
    }
  ],
  3: [
    {
      id: 301,
      from: "Sarah Williams",
      email: "swilliams@premierenterprises.com",
      to: "Mark Wilson",
      date: "June 10, 2025 11:20 AM",
      subject: "Bulk Order Pricing Inquiry",
      content: "Dear Mark,\n\nWe're looking to place a bulk order for 20+ units of your Manufacturing Tools Kit. Could you please provide us with pricing information for this volume? We'd be interested in knowing if there are any discounts available for orders of this size.\n\nWe're hoping to make a decision by June 15th, as we have a new production line starting up at the end of the month.\n\nThank you,\nSarah Williams\nDirector of Operations\nPremier Enterprises"
    },
    {
      id: 302,
      from: "Mark Wilson",
      email: "mark.wilson@yourcompany.com",
      to: "Sarah Williams",
      date: "June 10, 2025 3:45 PM",
      subject: "Re: Bulk Order Pricing Inquiry",
      content: "Hello Sarah,\n\nThank you for your interest in our Manufacturing Tools Kit. For orders of 20+ units, we can offer a 15% volume discount off our standard pricing.\n\nI've attached a detailed quote for your review. If you're satisfied with this initial order and decide to establish recurring quarterly orders, we can discuss additional ongoing discounts.\n\nPlease let me know if you have any questions or if you'd like to schedule a call to discuss this further.\n\nBest regards,\nMark Wilson\nSales Director"
    }
  ]
};

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
  const { toast } = useToast();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedThread, setSelectedThread] = useState<any>(null);
  const [editedSummary, setEditedSummary] = useState("");
  const [editedTags, setEditedTags] = useState("");
  const [localThreads, setLocalThreads] = useState(weeklyThreads);
  
  const [emailDrawerOpen, setEmailDrawerOpen] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState<any[]>([]);
  const [currentEmailIndex, setCurrentEmailIndex] = useState(0);
  
  const handleClientClick = (clientId: number) => {
    openClientDrawer(clientId);
  };
  
  const handleEditSummary = (thread: any) => {
    setSelectedThread(thread);
    setEditedSummary(thread.summary);
    setEditedTags(thread.tags.join(", "));
    setEditDialogOpen(true);
  };
  
  const handleSaveSummary = () => {
    if (!selectedThread) return;
    
    // Update the thread in our local state
    const updatedThreads = localThreads.map(thread => {
      if (thread.id === selectedThread.id) {
        return {
          ...thread,
          summary: editedSummary,
          tags: editedTags.split(",").map(tag => tag.trim()),
          edited: true
        };
      }
      return thread;
    });
    
    setLocalThreads(updatedThreads);
    setEditDialogOpen(false);
    
    // Show success toast
    toast({
      title: "Summary updated",
      description: "The client communication summary has been updated successfully.",
    });
  };
  
  const handleViewEmailThread = (threadId: number) => {
    const emails = emailsByThreadId[threadId as keyof typeof emailsByThreadId] || [];
    setSelectedEmails(emails);
    setCurrentEmailIndex(0);
    setEmailDrawerOpen(true);
  };
  
  const handleNextEmail = () => {
    if (currentEmailIndex < selectedEmails.length - 1) {
      setCurrentEmailIndex(currentEmailIndex + 1);
    }
  };
  
  const handlePreviousEmail = () => {
    if (currentEmailIndex > 0) {
      setCurrentEmailIndex(currentEmailIndex - 1);
    }
  };
  
  const currentEmail = selectedEmails[currentEmailIndex];
  
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
          {localThreads.map((thread) => (
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
                  <Button variant="outline" size="sm" onClick={() => handleEditSummary(thread)}>
                    <Pencil className="h-4 w-4 mr-2" />
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
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewEmailThread(thread.id)}
                  >
                    <Mail className="h-4 w-4 mr-2" />
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
      
      {/* Edit Summary Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Weekly Summary</DialogTitle>
            <DialogDescription>
              Make changes to the AI-generated summary for {selectedThread?.clientName} for the week of {selectedThread?.weekRange}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                className="min-h-[100px]"
                value={editedSummary}
                onChange={(e) => setEditedSummary(e.target.value)}
                placeholder="Enter summary of client communication"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                value={editedTags}
                onChange={(e) => setEditedTags(e.target.value)}
                placeholder="order, confirmation, delivery"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveSummary}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Email Thread Drawer */}
      <Sheet open={emailDrawerOpen} onOpenChange={setEmailDrawerOpen}>
        <SheetContent className="w-full sm:max-w-lg md:max-w-xl">
          <SheetHeader className="mb-4">
            <SheetTitle>Email Thread</SheetTitle>
            <SheetDescription>
              {selectedEmails.length > 0 ? 
                `Viewing email ${currentEmailIndex + 1} of ${selectedEmails.length}` : 
                "No emails found"}
            </SheetDescription>
          </SheetHeader>
          
          {currentEmail && (
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium text-lg">{currentEmail.subject}</h3>
                  <span className="text-sm text-muted-foreground">{currentEmail.date}</span>
                </div>
                <Separator className="my-2" />
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <p className="font-medium">From: {currentEmail.from}</p>
                      <p className="text-sm text-muted-foreground">{currentEmail.email}</p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <p>To: {currentEmail.to}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <ScrollArea className="h-[calc(100vh-360px)] border rounded-md p-4">
                <div className="whitespace-pre-line">
                  {currentEmail.content}
                </div>
              </ScrollArea>
              
              <SheetFooter className="flex flex-row justify-between sm:justify-between gap-2">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handlePreviousEmail}
                    disabled={currentEmailIndex === 0}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleNextEmail}
                    disabled={currentEmailIndex === selectedEmails.length - 1}
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
                <SheetClose asChild>
                  <Button variant="ghost" size="sm">Close</Button>
                </SheetClose>
              </SheetFooter>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </AppLayout>
  );
};

export default Communication;
