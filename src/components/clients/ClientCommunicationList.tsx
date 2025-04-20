import { ClientCommunication } from "@/api/clientService";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Loader2, MessageSquare } from "lucide-react";

interface ClientCommunicationListProps {
  communications: ClientCommunication[];
  isLoading: boolean;
  onEditClick: (communication: ClientCommunication) => void;
}

export function ClientCommunicationList({
  communications,
  isLoading,
  onEditClick
}: ClientCommunicationListProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>每周通信摘要</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2">加载通信记录...</p>
          </div>
        ) : communications.length > 0 ? (
          <div className="space-y-6">
            {communications.map((comm) => (
              <div key={comm.id} className="pb-4 border-b last:border-0 last:pb-0">
                <h4 className="font-medium text-primary flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  {comm.week_label || '未知日期'}
                </h4>
                <p className="mt-2 text-muted-foreground">{comm.summary || '暂无摘要'}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {comm.tags && comm.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">#{tag}</Badge>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1"
                    onClick={() => onEditClick(comm)}
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>编辑</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">暂无通信记录</p>
        )}
      </CardContent>
    </Card>
  );
} 