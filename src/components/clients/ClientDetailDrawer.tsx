
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useClientData } from "@/hooks/useClientData";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  CreditCard,
  ShoppingBag,
  X,
  Clock,
  MessageSquare,
  ArrowRight,
  Loader2
} from "lucide-react";
import { format } from "date-fns";

interface ClientDetailDrawerProps {
  clientId: string | null;
  onClose: () => void;
  open: boolean;
}

export function ClientDetailDrawer({ clientId, onClose, open }: ClientDetailDrawerProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const { client, communications, isLoading, error } = useClientData(clientId);

  if (!open) return null;

  if (isLoading) {
    return (
      <Sheet open={open} onOpenChange={(open) => !open && onClose()}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto p-0">
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  if (error || !client) {
    return (
      <Sheet open={open} onOpenChange={(open) => !open && onClose()}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto p-0">
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <p className="text-red-500">{error || "Client not found"}</p>
            <Button onClick={onClose}>Close</Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  const creditUsagePercentage = client.credit_limit ? (client.credit_used || 0) / client.credit_limit * 100 : 0;

  return (
    <Sheet open={open} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto p-0">
        <SheetHeader className="p-6 border-b sticky top-0 bg-background z-10">
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle className="text-xl">{client.company}</SheetTitle>
              <SheetDescription>
                {client.industry} {client.region ? `· ${client.region}` : ''}
              </SheetDescription>
            </div>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-6">
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="grid gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">Primary Contact</p>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{client.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{client.email || "No email provided"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{client.phone || "No phone provided"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{client.address || "No address provided"}</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm text-muted-foreground mb-3">Account Details</p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Client Since</span>
                        </div>
                        <span className="text-sm">
                          {format(new Date(client.created_at || new Date()), 'MMM yyyy')}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Next Meeting</span>
                        </div>
                        <span className="text-sm">
                          {client.next_meeting ? 
                            format(new Date(client.next_meeting), 'MMM d, yyyy') : 
                            "Not scheduled"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Credit Status</span>
                        </div>
                        <Badge variant="outline">{client.credit_level || "Not set"}</Badge>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Credit Used</span>
                          <span>
                            ${client.credit_used?.toLocaleString() || 0} of ${client.credit_limit?.toLocaleString() || 0}
                          </span>
                        </div>
                        <Progress value={creditUsagePercentage} className="h-2" />
                      </div>
                    </div>
                  </div>

                  {client.tags && client.tags.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <p className="text-sm text-muted-foreground mb-3">Tags</p>
                        <div className="flex flex-wrap gap-2">
                          {client.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="communications" className="space-y-4">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="communications">Communications</TabsTrigger>
                <TabsTrigger value="summary">AI Summary</TabsTrigger>
              </TabsList>

              <TabsContent value="communications">
                <div className="space-y-4">
                  {communications.length > 0 ? (
                    communications.map((comm) => (
                      <Card key={comm.id} className="relative">
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>Week of {comm.week_label}</span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm mb-3">{comm.summary}</p>
                          {comm.tags && comm.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {comm.tags.map((tag, idx) => (
                                <Badge key={idx} variant="outline">#{tag}</Badge>
                              ))}
                            </div>
                          )}
                          <Button variant="outline" size="sm" className="gap-2">
                            <MessageSquare className="h-4 w-4" />
                            View Thread
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-4">
                      No communication records available.
                    </p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="summary">
                <Card>
                  <CardHeader>
                    <CardTitle>AI-Generated Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {client.ai_summary || "No AI summary available for this client."}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
