import { ClientCommunication } from "@/api/clientService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Loader2, Paperclip } from "lucide-react";

interface ClientAttachmentListProps {
  communications: ClientCommunication[];
  isLoading: boolean;
}

export function ClientAttachmentList({ communications, isLoading }: ClientAttachmentListProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>邮件附件</CardTitle>
        <CardDescription>与客户共享的最新文档</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2">加载附件数据...</p>
          </div>
        ) : communications.length > 0 && communications.some(c => c.attachments && c.attachments.length > 0) ? (
          <div className="space-y-3">
            {communications.flatMap((comm, commIndex) =>
              comm.attachments ? Array.isArray(comm.attachments) ?
                comm.attachments.map((attachment, attIndex) => (
                  <div key={`${commIndex}-${attIndex}`} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="bg-muted p-2 rounded">
                        <Paperclip className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{attachment.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {attachment.type.toUpperCase()} · {attachment.size} · {new Date(attachment.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        预览
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        下载
                      </Button>
                    </div>
                  </div>
                )) : [] : []
            )}
          </div>
        ) : (
          <p className="text-muted-foreground">暂无附件</p>
        )}
      </CardContent>
    </Card>
  );
} 