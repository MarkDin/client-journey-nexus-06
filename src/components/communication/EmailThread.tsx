
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
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, X } from "lucide-react";

interface Email {
  id: number;
  from: string;
  email: string;
  to: string;
  date: string;
  subject: string;
  content: string;
}

interface EmailThreadProps {
  open: boolean;
  onClose: () => void;
  emails: Email[];
  expandedEmailIds: number[];
  onToggleEmail: (emailId: number) => void;
}

export function EmailThread({ open, onClose, emails, expandedEmailIds, onToggleEmail }: EmailThreadProps) {
  const isEmailExpanded = (emailId: number) => expandedEmailIds.includes(emailId);

  return (
    <Sheet open={open} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-lg md:max-w-xl">
        <SheetHeader className="mb-4">
          <SheetTitle>Email Thread</SheetTitle>
          <SheetDescription>
            {emails.length > 0 ? 
              `${emails.length} emails in this thread` : 
              "No emails found"}
          </SheetDescription>
        </SheetHeader>
        
        {emails.length > 0 && (
          <div className="space-y-4">
            <div className="bg-muted/50 p-3 rounded-lg">
              <h3 className="font-medium text-lg">{emails[0].subject}</h3>
              <p className="text-sm text-muted-foreground">
                Between {emails[0].from.split(" ")[0]} and {emails[0].to.split(" ")[0]}
              </p>
            </div>
            
            <ScrollArea className="h-[calc(100vh-220px)]">
              <div className="space-y-3">
                {emails.map((email) => (
                  <Card key={email.id} className="border shadow-sm">
                    <Collapsible 
                      open={isEmailExpanded(email.id)} 
                      onOpenChange={() => onToggleEmail(email.id)}
                      className="w-full"
                    >
                      <div 
                        className="p-3 flex items-center justify-between hover:bg-muted/50 cursor-pointer" 
                        onClick={() => onToggleEmail(email.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            {email.from.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center">
                              <p className="font-medium">{email.from}</p>
                              <p className="text-xs text-muted-foreground ml-2">
                                {email.date}
                              </p>
                            </div>
                            <p className="text-sm text-muted-foreground truncate max-w-[300px]">
                              {isEmailExpanded(email.id) ? '' : email.content.split('\n')[0]}
                            </p>
                          </div>
                        </div>
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                            {isEmailExpanded(email.id) ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                      
                      <CollapsibleContent>
                        <Separator />
                        <div className="p-4 pt-3">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <div className="font-medium">From: {email.from}</div>
                              <div className="text-sm text-muted-foreground">{email.email}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm">To: {email.to}</div>
                            </div>
                          </div>
                          
                          <div className="whitespace-pre-line border-t pt-3">
                            {email.content}
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                ))}
              </div>
            </ScrollArea>
            
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="ghost" size="sm">Close</Button>
              </SheetClose>
            </SheetFooter>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
