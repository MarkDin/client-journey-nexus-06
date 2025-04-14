
import { useState } from "react";
import { Clock, Filter, Search, AlertTriangle, Shield, User, Laptop, Smartphone, MapPin } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Sample user data
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@company.com",
    role: "Sales Manager",
    lastLogin: "2025-06-14T08:45:22",
    ip: "192.168.1.45",
    device: "Desktop - Chrome",
    location: "New York, USA"
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah.smith@company.com",
    role: "Sales Representative",
    lastLogin: "2025-06-14T09:12:05",
    ip: "192.168.1.87",
    device: "Mobile - Safari",
    location: "Chicago, USA"
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael.johnson@company.com",
    role: "Sales Representative",
    lastLogin: "2025-06-14T07:30:18",
    ip: "192.168.1.22",
    device: "Tablet - Chrome",
    location: "Los Angeles, USA"
  },
  {
    id: 4,
    name: "Emily Brown",
    email: "emily.brown@company.com",
    role: "Sales Representative",
    lastLogin: "2025-06-13T16:45:30",
    ip: "192.168.1.104",
    device: "Desktop - Firefox",
    location: "Boston, USA"
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.wilson@company.com",
    role: "Account Manager",
    lastLogin: "2025-06-14T10:22:15",
    ip: "192.168.1.76",
    device: "Desktop - Edge",
    location: "Seattle, USA"
  }
];

// Sample access logs
const accessLogs = [
  {
    id: 1,
    userId: 1,
    userName: "John Doe",
    action: "Login",
    timestamp: "2025-06-14T08:45:22",
    ip: "192.168.1.45",
    device: "Desktop - Chrome",
    location: "New York, USA",
    status: "success"
  },
  {
    id: 2,
    userId: 2,
    userName: "Sarah Smith",
    action: "Login",
    timestamp: "2025-06-14T09:12:05",
    ip: "192.168.1.87",
    device: "Mobile - Safari",
    location: "Chicago, USA",
    status: "success"
  },
  {
    id: 3,
    userId: 3,
    userName: "Michael Johnson",
    action: "Login",
    timestamp: "2025-06-14T07:30:18",
    ip: "192.168.1.22",
    device: "Tablet - Chrome",
    location: "Los Angeles, USA",
    status: "success"
  },
  {
    id: 4,
    userId: 1,
    userName: "John Doe",
    action: "View Client",
    timestamp: "2025-06-14T08:50:12",
    ip: "192.168.1.45",
    device: "Desktop - Chrome",
    location: "New York, USA",
    status: "success"
  },
  {
    id: 5,
    userId: 5,
    userName: "David Wilson",
    action: "Failed Login Attempt",
    timestamp: "2025-06-14T10:15:30",
    ip: "192.168.1.76",
    device: "Desktop - Edge",
    location: "Seattle, USA",
    status: "failed"
  },
  {
    id: 6,
    userId: 5,
    userName: "David Wilson",
    action: "Login",
    timestamp: "2025-06-14T10:22:15",
    ip: "192.168.1.76",
    device: "Desktop - Edge",
    location: "Seattle, USA",
    status: "success"
  },
  {
    id: 7,
    userId: 2,
    userName: "Sarah Smith",
    action: "Export Data",
    timestamp: "2025-06-14T09:35:44",
    ip: "192.168.1.87",
    device: "Mobile - Safari",
    location: "Chicago, USA",
    status: "success"
  },
  {
    id: 8,
    userId: 4,
    userName: "Emily Brown",
    action: "Login",
    timestamp: "2025-06-13T16:45:30",
    ip: "192.168.1.104",
    device: "Desktop - Firefox",
    location: "Boston, USA",
    status: "success"
  }
];

// Sample security alerts
const securityAlerts = [
  {
    id: 1,
    userId: 5,
    userName: "David Wilson",
    type: "Multiple Failed Login Attempts",
    timestamp: "2025-06-14T10:15:30",
    description: "3 failed login attempts before successful login",
    severity: "medium"
  },
  {
    id: 2,
    userId: 3,
    userName: "Michael Johnson",
    type: "Unusual Login Location",
    timestamp: "2025-06-13T23:10:45",
    description: "Login from Paris, France (unusual location)",
    severity: "high"
  },
  {
    id: 3,
    userId: 1,
    userName: "John Doe",
    type: "Multiple Device Login",
    timestamp: "2025-06-14T12:30:22",
    description: "Concurrent logins from multiple devices",
    severity: "low"
  }
];

// Device statistics
const deviceData = {
  desktop: 65,
  mobile: 25,
  tablet: 10,
  browsers: {
    chrome: 55,
    safari: 20,
    firefox: 15,
    edge: 10
  }
};

const UserAnalytics = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredLogs = accessLogs.filter(log => 
    log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <AppLayout>
      <PageHeader 
        title="User Analytics" 
        description="Monitor user activity and platform usage"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground" />
              Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{users.length}</div>
            <p className="text-sm text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Security Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{securityAlerts.length}</div>
            <p className="text-sm text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Laptop className="h-5 w-5 text-muted-foreground" />
              Device Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <div className="flex-1 flex flex-col items-center">
                <span className="text-xl font-semibold">{deviceData.desktop}%</span>
                <span className="text-xs text-muted-foreground">Desktop</span>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <span className="text-xl font-semibold">{deviceData.mobile}%</span>
                <span className="text-xs text-muted-foreground">Mobile</span>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <span className="text-xl font-semibold">{deviceData.tablet}%</span>
                <span className="text-xs text-muted-foreground">Tablet</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="access-logs" className="space-y-4">
        <TabsList className="grid grid-cols-3 max-w-md">
          <TabsTrigger value="access-logs">
            <Clock className="h-4 w-4 mr-2" />
            Access Logs
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Security Alerts
          </TabsTrigger>
          <TabsTrigger value="users">
            <User className="h-4 w-4 mr-2" />
            User List
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="access-logs">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Recent Activity Logs</CardTitle>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
              <div className="mt-2 relative max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search logs..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Device</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                        No logs found. Try adjusting your search.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium">{log.userName}</TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell>
                          {new Date(log.timestamp).toLocaleTimeString()} - {new Date(log.timestamp).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {log.device.includes("Desktop") ? (
                              <Laptop className="h-4 w-4 text-muted-foreground" />
                            ) : log.device.includes("Mobile") ? (
                              <Smartphone className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Laptop className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span>{log.device}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{log.location}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={log.status === "success" ? "outline" : "destructive"}>
                            {log.status === "success" ? "Success" : "Failed"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Security Alerts</CardTitle>
              <CardDescription>
                Suspicious activities detected in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityAlerts.map((alert) => (
                  <Card key={alert.id} className="border-l-4 border-l-destructive">
                    <CardContent className="p-4">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-semibold flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-destructive" />
                            {alert.type}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            User: {alert.userName}
                          </p>
                        </div>
                        <Badge variant={
                          alert.severity === "high" ? "destructive" : 
                          alert.severity === "medium" ? "secondary" : "outline"
                        }>
                          {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)} Severity
                        </Badge>
                      </div>
                      <p className="mt-2">{alert.description}</p>
                      <div className="mt-2 text-sm text-muted-foreground">
                        {new Date(alert.timestamp).toLocaleString()}
                      </div>
                      <div className="mt-3">
                        <Button variant="outline" size="sm">
                          Investigate
                        </Button>
                        <Button variant="ghost" size="sm" className="ml-2">
                          Dismiss
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Active Users</CardTitle>
              <CardDescription>
                Platform users and their recent activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Device</TableHead>
                    <TableHead>Location</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        {new Date(user.lastLogin).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {user.device.includes("Desktop") ? (
                            <Laptop className="h-4 w-4 text-muted-foreground" />
                          ) : user.device.includes("Mobile") ? (
                            <Smartphone className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Laptop className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span>{user.device}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{user.location}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default UserAnalytics;
