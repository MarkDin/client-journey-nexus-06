
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronUp, Filter, Search, SortDesc } from "lucide-react";
import { Input } from "@/components/ui/input";

// Combined activity data
const activitiesData = [
  { 
    id: 1,
    type: "new-order",
    title: "Global Industries Inc.",
    description: "Placed a new order of $125K",
    date: "2025-04-12",
    dateDisplay: "Today, 10:30 AM",
    change: "25% larger than previous order"
  },
  { 
    id: 3,
    type: "meeting",
    title: "Mike Johnson",
    description: "Quarterly review with Acme Manufacturing",
    date: "2025-04-11",
    dateDisplay: "Yesterday",
    change: "Discussed renewal options"
  },
];

const Activities = () => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [filters, setFilters] = useState({
    meeting: true,
    newOrder: true
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Sort and filter activities
  const filteredActivities = activitiesData
    .filter(activity => {
      // Filter by activity type
      if (activity.type === "meeting" && !filters.meeting) return false;
      if (activity.type === "new-order" && !filters.newOrder) return false;
      
      // Filter by search query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        return (
          activity.title.toLowerCase().includes(query) || 
          activity.description.toLowerCase().includes(query)
        );
      }
      
      return true;
    })
    .sort((a, b) => {
      if (sortDirection === "asc") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  // Toggle sort direction
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  // Toggle filter
  const toggleFilter = (filterType: "meeting" | "newOrder") => {
    setFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }));
  };

  return (
    <AppLayout>
      <PageHeader 
        title="Activities & Alerts" 
        description="Monitor important client activities and sales rep actions"
      />
      
      <div className="grid gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <CardTitle>Activities</CardTitle>
              <div className="flex items-center gap-4">
                <div className="relative w-full sm:w-auto max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="search"
                    placeholder="Search clients..."
                    className="pl-8 h-9 w-full sm:w-[200px] bg-background"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="filter-meeting" 
                      checked={filters.meeting} 
                      onCheckedChange={() => toggleFilter("meeting")}
                    />
                    <label htmlFor="filter-meeting" className="text-sm cursor-pointer">
                      Meeting
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="filter-new-order" 
                      checked={filters.newOrder} 
                      onCheckedChange={() => toggleFilter("newOrder")}
                    />
                    <label htmlFor="filter-new-order" className="text-sm cursor-pointer">
                      New Order
                    </label>
                  </div>
                </div>
                <button 
                  onClick={toggleSortDirection}
                  className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded hover:bg-accent"
                >
                  <SortDesc className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Date</span>
                  {sortDirection === "desc" ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronUp className="h-3 w-3" />
                  )}
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {filteredActivities.length > 0 ? (
                filteredActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                    <div>
                      {activity.type === "meeting" ? (
                        <Badge className="rounded-md bg-accent text-accent-foreground hover:bg-accent">
                          Meeting
                        </Badge>
                      ) : (
                        <Badge className="rounded-md bg-success text-success-foreground hover:bg-success">
                          New Order
                        </Badge>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium">{activity.title}</h4>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <div className="flex justify-between mt-2">
                        <p className="text-xs text-muted-foreground">{activity.dateDisplay}</p>
                        <p className="text-xs text-muted-foreground italic">
                          {activity.change}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  {searchQuery ? "No clients match your search criteria" : "No activities match your filter criteria"}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Activities;
