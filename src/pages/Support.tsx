
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileText, MessageSquare, Search, Star, ThumbsDown, ThumbsUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Support = () => {
  const { toast } = useToast();
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  
  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback!",
    });
  };
  
  return (
    <AppLayout>
      <PageHeader 
        title="Help & Support" 
        description="Documentation, FAQs, and support resources"
      />
      
      <Tabs defaultValue="docs" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="docs">
            <FileText className="h-4 w-4 mr-2" />
            Documentation
          </TabsTrigger>
          <TabsTrigger value="faq">
            <MessageSquare className="h-4 w-4 mr-2" />
            FAQs
          </TabsTrigger>
          <TabsTrigger value="feedback">
            <Star className="h-4 w-4 mr-2" />
            Feedback
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="docs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Documentation</CardTitle>
                  <CardDescription>
                    Browse our user guides and tutorials
                  </CardDescription>
                  <div className="mt-2 relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search documentation..."
                      className="pl-8"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    <div className="p-4 hover:bg-muted cursor-pointer">
                      <h4 className="font-medium">Getting Started</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Introduction to the Sales Dashboard
                      </p>
                    </div>
                    <div className="p-4 hover:bg-muted cursor-pointer">
                      <h4 className="font-medium">User Management</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Adding and managing users
                      </p>
                    </div>
                    <div className="p-4 hover:bg-muted cursor-pointer">
                      <h4 className="font-medium">Client Management</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Working with client profiles
                      </p>
                    </div>
                    <div className="p-4 hover:bg-muted cursor-pointer">
                      <h4 className="font-medium">Orders & Shipments</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Tracking and managing orders
                      </p>
                    </div>
                    <div className="p-4 hover:bg-muted cursor-pointer">
                      <h4 className="font-medium">AI-Generated Insights</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Understanding communications analysis
                      </p>
                    </div>
                    <div className="p-4 hover:bg-muted cursor-pointer">
                      <h4 className="font-medium">Reporting & Analytics</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Creating and exporting reports
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Getting Started</CardTitle>
                  <CardDescription>
                    Introduction to the Sales Management Dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Overview</h3>
                    <p className="mt-2">
                      The Sales Management Dashboard is a comprehensive tool designed for sales teams and managers to track performance, manage client relationships, monitor orders and shipments, and gain insights from communication history.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">Key Features</h3>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>Real-time sales performance metrics and KPIs</li>
                      <li>Client management with detailed profiles</li>
                      <li>Order and shipment tracking</li>
                      <li>AI-powered communication analysis</li>
                      <li>User activity monitoring</li>
                      <li>Responsive design for desktop and mobile</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">Navigation</h3>
                    <p className="mt-2">
                      The main navigation is located at the left side of the screen and provides access to all major sections of the application:
                    </p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li><strong>Dashboard:</strong> Overview of sales KPIs and product shipment trends</li>
                      <li><strong>Activity:</strong> Client-facing updates and key events</li>
                      <li><strong>Clients:</strong> Client list with detailed profiles</li>
                      <li><strong>Orders:</strong> Order management</li>
                      <li><strong>Shipments:</strong> Shipment tracking with drill-down analysis</li>
                      <li><strong>Communication:</strong> AI-generated customer journey insights</li>
                      <li><strong>Users:</strong> Platform access and usage statistics</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">Client Detail View</h3>
                    <p className="mt-2">
                      Throughout the application, clicking on a client name will open a detailed client profile in a slide-out drawer. This allows you to view client information without losing your place in the current page.
                    </p>
                  </div>
                  
                  <div className="flex justify-between mt-6 pt-4 border-t">
                    <div></div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Helpful
                      </Button>
                      <Button variant="outline" size="sm">
                        <ThumbsDown className="h-4 w-4 mr-2" />
                        Not Helpful
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Common questions and answers about the Sales Management Dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    How do I add a new client to the system?
                  </AccordionTrigger>
                  <AccordionContent>
                    To add a new client, navigate to the Clients tab and click the "Add Client" button in the top-right corner. Fill in the required information in the form and click "Save" to create the new client profile.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    Can I export data from the dashboard?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, most data tables in the application include an "Export" button that allows you to download the data in CSV or Excel format. Look for the export button near the top-right corner of data tables.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    How are the AI-generated client summaries created?
                  </AccordionTrigger>
                  <AccordionContent>
                    The AI-generated summaries are created by analyzing email communication history with clients. The system identifies patterns, key topics, and sentiment in the communications to generate insights about the client relationship. These summaries are updated weekly as new communications occur.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    How do I track a specific order?
                  </AccordionTrigger>
                  <AccordionContent>
                    To track a specific order, go to the Orders tab and use the search function to locate the order by ID or client name. Click on the order to view its details, including current status, shipment information, and history.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    Can I customize the dashboard view?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, you can customize aspects of the dashboard by clicking on the settings icon in the top-right corner. This allows you to adjust which metrics are displayed, change the time period for charts, and save your preferred layout.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-6">
                  <AccordionTrigger>
                    How do I set up email notifications?
                  </AccordionTrigger>
                  <AccordionContent>
                    Email notifications can be configured in your user profile settings. Go to your profile by clicking on your username in the top-right corner, then select "Notification Settings." From there, you can choose which events trigger email notifications.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-7">
                  <AccordionTrigger>
                    What do the different security alert levels mean?
                  </AccordionTrigger>
                  <AccordionContent>
                    The security alert levels indicate the severity of potential security issues:
                    <ul className="list-disc ml-6 mt-2">
                      <li><strong>High:</strong> Requires immediate attention, may indicate unauthorized access</li>
                      <li><strong>Medium:</strong> Should be investigated soon, may indicate unusual but not necessarily malicious activity</li>
                      <li><strong>Low:</strong> Minor issue that should be noted but doesn't require urgent action</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>Product Feedback</CardTitle>
              <CardDescription>
                Share your thoughts and suggestions to help us improve
              </CardDescription>
            </CardHeader>
            <CardContent>
              {feedbackSubmitted ? (
                <div className="text-center py-8">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <ThumbsUp className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Thank You for Your Feedback!</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    We appreciate your input and will use it to improve the Sales Management Dashboard. If you provided contact information, a member of our team may reach out for more details.
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-6"
                    onClick={() => setFeedbackSubmitted(false)}
                  >
                    Submit Another Response
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Name</label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input id="email" type="email" placeholder="Your email" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="feedback-type" className="text-sm font-medium">Feedback Type</label>
                    <select id="feedback-type" className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md">
                      <option value="">Select feedback type</option>
                      <option value="suggestion">Feature Suggestion</option>
                      <option value="bug">Bug Report</option>
                      <option value="improvement">Improvement Idea</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                    <Input id="subject" placeholder="Brief summary of your feedback" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <Textarea 
                      id="message" 
                      placeholder="Please provide detailed feedback..." 
                      rows={6}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">How would you rate your experience?</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <Button 
                          key={rating} 
                          type="button" 
                          variant="outline" 
                          className="w-10 h-10 p-0"
                        >
                          {rating}
                        </Button>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">1 = Poor, 5 = Excellent</p>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">Submit Feedback</Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Support;
