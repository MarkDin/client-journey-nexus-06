import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface EditSummaryDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialSummary: string;
    initialTags: string;
    weekLabel: string;
    onSave: (summary: string, tags: string) => Promise<void>;
}

export function EditSummaryDialog({
    open,
    onOpenChange,
    initialSummary,
    initialTags,
    weekLabel,
    onSave,
}: EditSummaryDialogProps) {
    const [summary, setSummary] = useState(initialSummary);
    const [tags, setTags] = useState(initialTags);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await onSave(summary, tags);
            onOpenChange(false);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>编辑周报摘要</DialogTitle>
                    <DialogDescription>
                        修改 {weekLabel} 的AI生成摘要内容
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <h4 className="font-medium">摘要内容</h4>
                        <Textarea
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            placeholder="请输入摘要内容..."
                            className="min-h-[150px]"
                        />
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-medium">标签</h4>
                        <Input
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="请输入标签，用逗号分隔..."
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        取消
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                        {isSaving ? "保存中..." : "保存"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
} 