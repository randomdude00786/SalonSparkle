import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Appointment } from "@shared/schema";
import { Loader2, Calendar, User, Clock, UserCheck, Scissors, FileText, LogOut } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function DashboardPage() {
  const { user, logoutMutation } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("appointments");

  const { data: appointments, isLoading } = useQuery<Appointment[], Error>({ 
    queryKey: ["/api/appointments"],
    enabled: Boolean(user), // Only fetch if user is authenticated
  });

  if (!user) {
    return null; // Should never happen due to ProtectedRoute, but just in case
  }

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <User className="h-6 w-6 text-[#D4AF37]" />
                  <CardTitle>{user.username}</CardTitle>
                </div>
                <CardDescription>Client Dashboard</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="flex flex-col">
                  <Button
                    variant="ghost"
                    className={`justify-start rounded-none py-5 px-4 text-left ${
                      activeTab === "appointments" ? "bg-muted" : ""
                    }`}
                    onClick={() => setActiveTab("appointments")}
                  >
                    <Calendar className="h-5 w-5 mr-3" />
                    My Appointments
                  </Button>
                  <Button
                    variant="ghost"
                    className={`justify-start rounded-none py-5 px-4 text-left ${
                      activeTab === "profile" ? "bg-muted" : ""
                    }`}
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="h-5 w-5 mr-3" />
                    Profile
                  </Button>
                </nav>
              </CardContent>
              <CardFooter className="flex justify-center p-4">
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                >
                  {logoutMutation.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <LogOut className="mr-2 h-4 w-4" />
                  )}
                  Logout
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
              </TabsList>

              <TabsContent value="appointments">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">My Appointments</CardTitle>
                    <CardDescription>View and manage your salon appointments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="flex justify-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin text-[#D4AF37]" />
                      </div>
                    ) : !appointments || appointments.length === 0 ? (
                      <div className="text-center py-8">
                        <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-medium mb-2">No appointments yet</h3>
                        <p className="text-muted-foreground mb-4">
                          Book your first appointment to get started
                        </p>
                        <Button className="bg-[#D4AF37] hover:bg-opacity-90 text-[#1A365D]" onClick={() => window.location.href = "/#appointment"}>
                          Book an Appointment
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {appointments.map((appointment) => (
                          <Card key={appointment.id} className="overflow-hidden">
                            <div className="border-l-4 border-[#D4AF37]">
                              <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                  <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-2 text-[#D4AF37]" />
                                    <span className="font-medium">Date</span>
                                  </div>
                                  <p>{appointment.date}</p>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-2 text-[#D4AF37]" />
                                    <span className="font-medium">Time</span>
                                  </div>
                                  <p>{appointment.time}</p>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center">
                                    <Scissors className="h-4 w-4 mr-2 text-[#D4AF37]" />
                                    <span className="font-medium">Service</span>
                                  </div>
                                  <p>{appointment.service}</p>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center">
                                    <UserCheck className="h-4 w-4 mr-2 text-[#D4AF37]" />
                                    <span className="font-medium">Stylist</span>
                                  </div>
                                  <p>{appointment.stylist || "Any available"}</p>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center">
                                    <FileText className="h-4 w-4 mr-2 text-[#D4AF37]" />
                                    <span className="font-medium">Notes</span>
                                  </div>
                                  <p className="line-clamp-2">
                                    {appointment.notes || "No additional notes"}
                                  </p>
                                </div>
                              </CardContent>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">My Profile</CardTitle>
                    <CardDescription>Manage your account details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Account Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-muted-foreground">Username</p>
                          <p className="font-medium">{user.username}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Security</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Update your password to keep your account secure
                      </p>
                      <Button>Change Password</Button>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Preferences</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Customize your notification preferences
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardContent className="pt-6">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">Email Notifications</p>
                                <p className="text-sm text-muted-foreground">
                                  Receive appointment confirmations and reminders
                                </p>
                              </div>
                              <Button variant="outline">Not available</Button>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">SMS Notifications</p>
                                <p className="text-sm text-muted-foreground">
                                  Get text messages about your appointments
                                </p>
                              </div>
                              <Button variant="outline">Not available</Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}