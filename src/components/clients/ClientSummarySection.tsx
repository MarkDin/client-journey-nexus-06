import { ClientSummary } from "@/api/clientService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, X } from "lucide-react";

interface ClientSummarySectionProps {
  summary: ClientSummary | null;
  isEditing: boolean;
  editingSummary: string;
  onEdit: () => void;
  onCancel: () => void;
  onSummaryChange: (value: string) => void;
}

export function ClientSummarySection({
  summary,
  isEditing,
  editingSummary,
  onEdit,
  onCancel,
  onSummaryChange
}: ClientSummarySectionProps) {
  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>AI-Generated Client Summary</CardTitle>
            {isEditing ? (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={onCancel}>
                  <X className="h-4 w-4 mr-2" />
                  <span>取消</span>
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="sm" onClick={onEdit}>
                <Pencil className="h-4 w-4 mr-2" />
                <span>编辑</span>
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Textarea
              value={editingSummary}
              onChange={(e) => onSummaryChange(e.target.value)}
              className="min-h-[100px]"
            />
          ) : (
            <p className="text-muted-foreground italic">
              {summary?.ai_summary || "暂无客户摘要"}
            </p>
          )}
        </CardContent>
      </Card>

      {summary?.key_insights && summary.key_insights.length > 0 && (
        <Card className="mt-4">
          <CardHeader className="pb-2">
            <CardTitle>关键洞察</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-muted-foreground">
              {summary.key_insights.map((insight, idx) => (
                <li key={idx}>{insight}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </>
  );
} 