import { ClientInsightCard } from "@/components/communication/ClientInsightCard";
import { EmailThread } from "@/components/communication/EmailThread";
import { WeeklySummaryCard } from "@/components/communication/WeeklySummaryCard";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useClientDrawer } from "@/contexts/ClientDrawerContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ClientSummary, Email, WeeklyThread } from "@/types/communication";
import { format } from "date-fns";
import { Calendar, MessageSquare, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Communication() {
  const { openClientDrawer } = useClientDrawer();
  const { toast } = useToast();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedThread, setSelectedThread] = useState<WeeklyThread | null>(null);
  const [editedSummary, setEditedSummary] = useState("");
  const [editedTags, setEditedTags] = useState("");
  const [weeklyThreads, setWeeklyThreads] = useState<WeeklyThread[]>([]);
  const [selectedEmails, setSelectedEmails] = useState<Email[]>([]);
  const [clientSummaries, setClientSummaries] = useState<ClientSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingEmails, setLoadingEmails] = useState(false);
  const [localThreads, setLocalThreads] = useState<WeeklyThread[]>([]);
  const [localClientSummaries, setLocalClientSummaries] = useState<ClientSummary[]>([]);

  const [emailDrawerOpen, setEmailDrawerOpen] = useState(false);
  const [expandedEmailIds, setExpandedEmailIds] = useState<string[]>([]);

  const [insightEditDialogOpen, setInsightEditDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [editedClientSummary, setEditedClientSummary] = useState("");
  const [editedInsights, setEditedInsights] = useState<string[]>([]);

  const handleClientClick = (clientId: string) => {
    const client = clientSummaries.find(c => c.clientId === clientId);
    if (client) {
      openClientDrawer(clientId);
    }
  };

  const handleEditThread = (thread: WeeklyThread) => {
    setSelectedThread(thread);
    setEditedSummary(thread.summary);
    setEditedTags(thread.tags.join(", "));
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedThread) return;

    try {
      const { error } = await supabase
        .from('client_communications')
        .update({
          summary: editedSummary,
          tags: editedTags.split(",").map(tag => tag.trim()),
          edited: true
        })
        .eq('id', selectedThread.id);

      if (error) throw error;

      const updatedThreads = weeklyThreads.map(thread =>
        thread.id === selectedThread.id
          ? {
            ...thread,
            summary: editedSummary,
            tags: editedTags.split(",").map(tag => tag.trim()),
            edited: true
          }
          : thread
      );

      setWeeklyThreads(updatedThreads);
      setLocalThreads(updatedThreads);
      setEditDialogOpen(false);
      toast({
        title: "Success",
        description: "Thread summary updated successfully.",
      });
    } catch (error) {
      console.error('Error updating thread:', error);
      toast({
        title: "Error",
        description: "Failed to update thread summary. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleEditClientInsight = (client: any) => {
    setSelectedClient(client);
    setEditedClientSummary(client.summary);
    setEditedInsights([...client.keyInsights]);
    setInsightEditDialogOpen(true);
  };

  const handleSaveClientInsight = () => {
    if (!selectedClient) return;

    const updatedClientSummaries = localClientSummaries.map(client => {
      if (client.clientId === selectedClient.clientId) {
        return {
          ...client,
          summary: editedClientSummary,
          keyInsights: editedInsights.filter(insight => insight.trim() !== ""),
          edited: true
        };
      }
      return client;
    });

    setLocalClientSummaries(updatedClientSummaries);
    setInsightEditDialogOpen(false);

    toast({
      title: "Client insight updated",
      description: "The AI-generated client insight has been updated successfully.",
    });
  };

  const handleAddInsight = () => {
    setEditedInsights([...editedInsights, ""]);
  };

  const handleInsightChange = (index: number, value: string) => {
    const newInsights = [...editedInsights];
    newInsights[index] = value;
    setEditedInsights(newInsights);
  };

  const handleRemoveInsight = (index: number) => {
    const newInsights = [...editedInsights];
    newInsights.splice(index, 1);
    setEditedInsights(newInsights);
  };

  const handleViewEmailThread = async (threadId: string) => {
    try {
      setLoadingEmails(true);
      const { data: emailsData, error: emailsError } = await supabase
        .from('email')
        .select('*')
        .eq('communication_id', threadId)
        .order('send_at', { ascending: true });

      if (emailsError) throw emailsError;

      const formattedEmails: Email[] = (emailsData || []).map(email => ({
        id: String(email.id),
        from: email.sender || '',
        email: email.sender_email || '',
        to: email.receiver || '',
        date: format(new Date(email.send_at || ''), 'MMM d, yyyy h:mm a'),
        subject: email.subject || '',
        content: email.content || ''
      }));

      setSelectedEmails(formattedEmails);
      if (formattedEmails.length > 0) {
        setExpandedEmailIds([formattedEmails[0].id]);
      }
      setEmailDrawerOpen(true);
    } catch (error) {
      console.error('Error fetching emails:', error);
      toast({
        title: "Error",
        description: "Failed to load emails. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoadingEmails(false);
    }
  };

  const toggleEmailExpand = (emailId: string) => {
    setExpandedEmailIds(prevIds => {
      if (prevIds.includes(emailId)) {
        return prevIds.filter(id => id !== emailId);
      } else {
        return [...prevIds, emailId];
      }
    });
  };

  const handleViewTimeline = (clientId: number, week: string) => {
    // TODO: 实现查看完整时间线的逻辑
    console.log('View timeline for client', clientId, 'week:', week);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      console.log('Fetching data...');

      // 获取本周的通信记录
      const { data: communicationData, error: threadsError } = await supabase
        .from('client_communications')
        .select(`
          id,
          client_id,
          customers!client_communications_client_id_fkey (
            name
          ),
          summary,
          tags,
          ai_generated,
          edited,
          week_start,
          week_end,
          thread_count
        `)
        .order('week_start', { ascending: false })
        .limit(10);

      console.log('Communications data:', communicationData);
      if (threadsError) throw threadsError;

      // 获取所有客户摘要
      const { data: summariesData, error: summariesError } = await supabase
        .from('client_summaries')
        .select(`
          id,
          client_id,
          customers!client_summaries_client_id_fkey (
            name
          ),
          summary,
          key_insights,
          edited
        `);

      console.log('Summaries data:', summariesData);
      if (summariesError) throw summariesError;

      // 格式化周线程数据
      const formattedThreads: WeeklyThread[] = communicationData?.map(thread => ({
        id: String(thread.id),
        clientId: String(thread.client_id),
        clientName: thread.customers?.name || '',
        weekRange: thread.week_start ? `${format(new Date(thread.week_start), 'MMM d')}-${format(new Date(thread.week_end), 'MMM d, yyyy')}` : 'No date',
        summary: thread.summary || '',
        tags: thread.tags || [],
        aiGenerated: thread.ai_generated || false,
        edited: thread.edited || false
      })) || [];

      // 格式化客户摘要数据
      const formattedSummaries: ClientSummary[] = summariesData?.map(summary => ({
        clientId: String(summary.client_id),
        clientName: summary.customers?.name || '',
        summary: summary.summary || '',
        keyInsights: summary.key_insights || [],
        edited: summary.edited || false,
        communications: communicationData
          ?.filter(comm => comm.client_id === summary.client_id)
          .map(comm => ({
            id: String(comm.id),
            week: comm.week_start ? `${format(new Date(comm.week_start), 'MMM d')}-${format(new Date(comm.week_end), 'MMM d, yyyy')}` : 'No date',
            summary: comm.summary || '',
            tags: comm.tags || [],
            threadCount: comm.thread_count || 0
          })) || []
      })) || [];

      console.log('Formatted threads:', formattedThreads);
      console.log('Formatted summaries:', formattedSummaries);

      setWeeklyThreads(formattedThreads);
      setLocalThreads(formattedThreads);
      setClientSummaries(formattedSummaries);
      setLocalClientSummaries(formattedSummaries);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load communication data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="container mx-auto py-6">
        <PageHeader
          title="Client Communications"
          description="View and manage all client communications and weekly summaries."
        />

        <Tabs defaultValue="weekly" className="mt-6">
          <TabsList>
            <TabsTrigger value="weekly">
              <Calendar className="w-4 h-4 mr-2" />
              Weekly Summaries
            </TabsTrigger>
            <TabsTrigger value="insights">
              <MessageSquare className="w-4 h-4 mr-2" />
              Client Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="mt-6">
            <div className="grid gap-6">
              {loading ? (
                <div>Loading...</div>
              ) : localThreads.length === 0 ? (
                <div>No communication threads found.</div>
              ) : (
                localThreads.map(thread => (
                  <WeeklySummaryCard
                    key={thread.id}
                    thread={thread}
                    onEdit={handleEditThread}
                    onViewEmails={() => handleViewEmailThread(thread.id)}
                    onClientClick={handleClientClick}
                  />
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="mt-6">
            <div className="grid gap-6">
              {loading ? (
                <div>Loading...</div>
              ) : localClientSummaries.length === 0 ? (
                <div>No client insights found.</div>
              ) : (
                localClientSummaries.map(client => (
                  <ClientInsightCard
                    key={client.clientId}
                    client={client}
                    onEdit={() => handleEditClientInsight(client)}
                    onClientClick={() => handleClientClick(client.clientId)}
                    onViewEmails={handleViewEmailThread}
                    onViewTimeline={handleViewTimeline}
                  />
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>

        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Communication Summary</DialogTitle>
              <DialogDescription>
                Update the summary and tags for this communication thread.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="summary">Summary</Label>
                <Textarea
                  id="summary"
                  value={editedSummary}
                  onChange={(e) => setEditedSummary(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={editedTags}
                  onChange={(e) => setEditedTags(e.target.value)}
                  placeholder="Enter tags separated by commas"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="ghost" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveEdit}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={insightEditDialogOpen} onOpenChange={setInsightEditDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Client Insight</DialogTitle>
              <DialogDescription>
                Make changes to the AI-generated insight for {selectedClient?.clientName}.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="client-summary">Client Summary</Label>
                <Textarea
                  id="client-summary"
                  className="min-h-[120px]"
                  value={editedClientSummary}
                  onChange={(e) => setEditedClientSummary(e.target.value)}
                  placeholder="Enter client summary"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="key-insights">Key Insights</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddInsight}
                  >
                    Add Insight
                  </Button>
                </div>

                {editedInsights.map((insight, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={insight}
                      onChange={(e) => handleInsightChange(index, e.target.value)}
                      placeholder="Enter key insight"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveInsight(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button variant="ghost" onClick={() => setInsightEditDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveClientInsight}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <EmailThread
          open={emailDrawerOpen}
          onClose={() => setEmailDrawerOpen(false)}
          emails={selectedEmails}
          expandedEmailIds={expandedEmailIds}
          onToggleEmail={toggleEmailExpand}
        />
      </div>
    </AppLayout>
  );
}
