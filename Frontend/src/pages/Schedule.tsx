import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  X,
  ExternalLink,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Building2
} from "lucide-react";
import { Link } from "react-router-dom";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const scheduleEvents = [
  { id: 1, projectId: "1", projectName: "NH-44 Highway Expansion", milestone: "Phase 2 Construction Start", date: "2024-08-01", type: "start", status: "ongoing" },
  { id: 2, projectId: "2", projectName: "Smart Drainage System", milestone: "Planned Completion", date: "2024-08-15", type: "end", status: "delayed" },
  { id: 3, projectId: "3", projectName: "LED Street Lighting", milestone: "Final Inspection", date: "2024-08-20", type: "milestone", status: "completed" },
  { id: 4, projectId: "1", projectName: "NH-44 Highway Expansion", milestone: "Quality Audit", date: "2024-08-25", type: "milestone", status: "planned" },
  { id: 5, projectId: "4", projectName: "Community Health Center", milestone: "Ground Breaking Ceremony", date: "2024-08-28", type: "start", status: "planned" },
  { id: 6, projectId: "5", projectName: "Water Pipeline Network", milestone: "Phase 1 Completion", date: "2024-08-10", type: "milestone", status: "completed" },
];

const statusConfig = {
  planned: { label: "Planned", color: "bg-blue-500", bgLight: "bg-blue-100", textColor: "text-blue-700" },
  ongoing: { label: "Ongoing", color: "bg-amber-500", bgLight: "bg-amber-100", textColor: "text-amber-700" },
  delayed: { label: "Delayed", color: "bg-red-500", bgLight: "bg-red-100", textColor: "text-red-700" },
  completed: { label: "Completed", color: "bg-green-500", bgLight: "bg-green-100", textColor: "text-green-700" },
};

export default function Schedule() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 7, 1)); // August 2024
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [view, setView] = useState<"month" | "week">("month");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getEventsForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return scheduleEvents.filter(event => event.date === dateStr);
  };

  const selectedEvents = selectedDate 
    ? getEventsForDate(selectedDate.getDate())
    : [];

  const calendarDays = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <Layout>
      <div className="section-gradient min-h-screen">
        <div className="container-civic py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="heading-section text-foreground mb-2">Project Schedule</h1>
              <p className="text-muted-foreground">
                Track project milestones, deadlines, and delays
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant={view === "month" ? "default" : "outline"} 
                onClick={() => setView("month")}
              >
                Monthly
              </Button>
              <Button 
                variant={view === "week" ? "default" : "outline"} 
                onClick={() => setView("week")}
              >
                Weekly
              </Button>
            </div>
          </div>

          {/* Legend */}
          <Card className="mb-6">
            <CardContent className="py-4">
              <div className="flex flex-wrap items-center gap-6">
                <span className="text-sm font-medium">Legend:</span>
                {Object.entries(statusConfig).map(([key, config]) => (
                  <div key={key} className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${config.color}`} />
                    <span className="text-sm text-muted-foreground">{config.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    {months[month]} {year}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={prevMonth}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={nextMonth}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Days of Week Header */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, index) => {
                    const events = day ? getEventsForDate(day) : [];
                    const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === month;
                    const isToday = new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year;

                    return (
                      <div
                        key={index}
                        onClick={() => day && setSelectedDate(new Date(year, month, day))}
                        className={`
                          min-h-[80px] md:min-h-[100px] p-1 md:p-2 border rounded-lg cursor-pointer transition-colors
                          ${day ? 'hover:bg-muted' : 'bg-transparent border-transparent'}
                          ${isSelected ? 'ring-2 ring-primary bg-primary/5' : ''}
                          ${isToday ? 'border-primary' : 'border-border'}
                        `}
                      >
                        {day && (
                          <>
                            <div className={`text-sm font-medium mb-1 ${isToday ? 'text-primary' : ''}`}>
                              {day}
                            </div>
                            <div className="space-y-1">
                              {events.slice(0, 2).map((event) => (
                                <div
                                  key={event.id}
                                  className={`text-xs px-1.5 py-0.5 rounded truncate ${statusConfig[event.status as keyof typeof statusConfig].bgLight} ${statusConfig[event.status as keyof typeof statusConfig].textColor}`}
                                >
                                  {event.projectName.slice(0, 15)}...
                                </div>
                              ))}
                              {events.length > 2 && (
                                <div className="text-xs text-muted-foreground px-1">
                                  +{events.length - 2} more
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Side Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>
                    {selectedDate 
                      ? `${months[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`
                      : "Select a Date"
                    }
                  </span>
                  {selectedDate && (
                    <Button variant="ghost" size="icon" onClick={() => setSelectedDate(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedDate ? (
                  selectedEvents.length > 0 ? (
                    <div className="space-y-4">
                      {selectedEvents.map((event) => {
                        const config = statusConfig[event.status as keyof typeof statusConfig];
                        return (
                          <div key={event.id} className="p-4 border rounded-lg space-y-3">
                            <div className="flex items-start justify-between">
                              <Badge className={`${config.bgLight} ${config.textColor} border-0`}>
                                {config.label}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {event.type}
                              </Badge>
                            </div>
                            <div>
                              <p className="font-medium">{event.projectName}</p>
                              <p className="text-sm text-muted-foreground">{event.milestone}</p>
                            </div>
                            <Link to={`/project/${event.projectId}`}>
                              <Button variant="outline" size="sm" className="w-full">
                                View Project
                                <ExternalLink className="h-3 w-3 ml-2" />
                              </Button>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <CalendarIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>No events scheduled for this date</p>
                    </div>
                  )
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <CalendarIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Click on a date to view scheduled events</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Events List */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Upcoming Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {scheduleEvents
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .map((event) => {
                    const config = statusConfig[event.status as keyof typeof statusConfig];
                    return (
                      <div key={event.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={`h-10 w-10 rounded-full ${config.bgLight} flex items-center justify-center`}>
                            {event.status === 'completed' ? <CheckCircle2 className={`h-5 w-5 ${config.textColor}`} /> :
                             event.status === 'delayed' ? <AlertTriangle className={`h-5 w-5 ${config.textColor}`} /> :
                             event.status === 'ongoing' ? <Building2 className={`h-5 w-5 ${config.textColor}`} /> :
                             <Clock className={`h-5 w-5 ${config.textColor}`} />}
                          </div>
                          <div>
                            <p className="font-medium">{event.milestone}</p>
                            <p className="text-sm text-muted-foreground">{event.projectName}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                          <Badge variant="outline" className={`${config.bgLight} ${config.textColor} border-0 text-xs`}>
                            {config.label}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
