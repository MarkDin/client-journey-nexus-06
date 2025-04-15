import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, ExternalLink, MessageSquare } from "lucide-react";

interface ClientInsightCardProps {
  client: {
    clientId: number;
    clientName: string;
    edited: boolean;
    summary: string;
    keyInsights: string[];
    communications: Array<{
      id: number;
      week: string;
      summary: string;
      tags: string[];
      threadCount: number;
    }>;
  };
  onEdit: (client: any) => void;
  onClientClick: (clientId: number) => void;
  onViewEmails: (threadId: string) => void;
  onViewTimeline: (clientId: number, week: string) => void;
}

export function ClientInsightCard({
  client,
  onEdit,
  onClientClick,
  onViewEmails,
  onViewTimeline
}: ClientInsightCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <CardTitle>
            <span
              className="text-primary hover:underline cursor-pointer"
              onClick={() => onClientClick(client.clientId)}
            >
              {client.clientName}
            </span>
            {client.edited && (
              <Badge variant="outline" className="ml-2">Edited</Badge>
            )}
          </CardTitle>
          <Button variant="outline" size="sm" onClick={() => onEdit(client)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Insight
          </Button>
        </div>
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
        <div className="space-y-6 mt-6">
          {client.communications.map((comm) => (
            <div key={comm.id} className="pb-4 border-b last:border-0 last:pb-0">
              <h4 className="font-medium text-primary flex items-center gap-2">
                Week of {comm.week}
              </h4>
              <p className="mt-2 text-muted-foreground">{comm.summary}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {comm.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">#{tag}</Badge>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  onClick={() => onViewEmails(String(comm.id))}
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>View Emails ({comm.threadCount})</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  onClick={() => onViewTimeline(client.clientId, comm.week)}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Full Timeline</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
