import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { WeeklyThread } from "@/types/communication";
import { Mail, Pencil } from "lucide-react";

interface WeeklySummaryCardProps {
  thread: WeeklyThread;
  onEdit: (thread: WeeklyThread) => void;
  onViewEmails: (threadId: string) => void;
  onClientClick: (clientId: string) => void;
}

export function WeeklySummaryCard({ thread, onEdit, onViewEmails, onClientClick }: WeeklySummaryCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">Week of {thread.weekRange}</h3>
              {thread.aiGenerated && (
                <Badge variant="outline">AI Generated</Badge>
              )}
              {thread.edited && (
                <Badge variant="outline">Edited</Badge>
              )}
            </div>
            <p
              className="text-sm text-primary hover:underline cursor-pointer mt-1"
              onClick={() => onClientClick(thread.clientId)}
            >
              {thread.clientName}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => onEdit(thread)}>
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
            onClick={() => onViewEmails(thread.id)}
          >
            <Mail className="h-4 w-4 mr-2" />
            View Email Thread
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
