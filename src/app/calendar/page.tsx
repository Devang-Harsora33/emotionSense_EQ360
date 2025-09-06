"use client";

import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar as CalendarIcon,
  Heart,
  Brain,
  // Users,
  Target,
  // Zap,
  // Smile,
  // Frown,
  // Meh,
  AlertCircle,
  // Laugh,
  TrendingUp,
  BarChart3,
  Clock,
} from "lucide-react";

interface CalendarEntry {
  id: string;
  date: Date;
  type: "emotion" | "exercise" | "assessment" | "goal";
  title: string;
  description: string;
  category?: string;
  intensity?: number;
  completed?: boolean;
}

// const emotions = {
//   Happy: { icon: Smile, color: "text-green-500", bgColor: "bg-green-50" },
//   Sad: { icon: Frown, color: "text-blue-500", bgColor: "bg-blue-50" },
//   Calm: { icon: Meh, color: "text-purple-500", bgColor: "bg-purple-50" },
//   Anxious: {
//     icon: AlertCircle,
//     color: "text-yellow-500",
//     bgColor: "bg-yellow-50",
//   },
//   Excited: { icon: Laugh, color: "text-orange-500", bgColor: "bg-orange-50" },
// };

// const categories = {
//   "Emotional Regulation": {
//     icon: Heart,
//     color: "text-red-500",
//     bgColor: "bg-red-50",
//   },
//   "Self-Awareness": {
//     icon: Brain,
//     color: "text-blue-500",
//     bgColor: "bg-blue-50",
//   },
//   Empathy: { icon: Users, color: "text-purple-500", bgColor: "bg-purple-50" },
//   "Social Skills": {
//     icon: Target,
//     color: "text-green-500",
//     bgColor: "bg-green-50",
//   },
//   Motivation: { icon: Zap, color: "text-yellow-500", bgColor: "bg-yellow-50" },
// };

export default function CalendarView() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  // const [view, setView] = useState<"month" | "week" | "day">("month");

  // Mock data for calendar entries
  const [entries] = useState<CalendarEntry[]>([
    {
      id: "1",
      date: new Date(),
      type: "emotion",
      title: "Happy",
      description: "Had a great meeting with the team",
      intensity: 8,
    },
    {
      id: "2",
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      type: "exercise",
      title: "Mindful Breathing",
      description: "Completed 10-minute breathing exercise",
      category: "Emotional Regulation",
      completed: true,
    },
    {
      id: "3",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      type: "assessment",
      title: "EQ Assessment",
      description: "Completed monthly emotional intelligence assessment",
      completed: true,
    },
    {
      id: "4",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      type: "emotion",
      title: "Calm",
      description: "Feeling peaceful after meditation",
      intensity: 7,
    },
    {
      id: "5",
      date: new Date(Date.now() + 24 * 60 * 60 * 1000),
      type: "goal",
      title: "Practice Active Listening",
      description: "Goal: Practice active listening in team meeting",
      category: "Social Skills",
    },
  ]);

  const getEntriesForDate = (date: Date) => {
    return entries.filter(
      (entry) => entry.date.toDateString() === date.toDateString()
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "emotion":
        return Heart;
      case "exercise":
        return Brain;
      case "assessment":
        return BarChart3;
      case "goal":
        return Target;
      default:
        return CalendarIcon;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "emotion":
        return "text-red-500 bg-red-50";
      case "exercise":
        return "text-blue-500 bg-blue-50";
      case "assessment":
        return "text-purple-500 bg-purple-50";
      case "goal":
        return "text-green-500 bg-green-50";
      default:
        return "text-gray-500 bg-gray-50";
    }
  };

  const selectedDateEntries = selectedDate
    ? getEntriesForDate(selectedDate)
    : [];

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto lg:ml-0">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
              <p className="text-muted-foreground">
                View your emotional patterns and activities over time
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <CalendarIcon className="h-3 w-3" />
                {entries.length} entries this month
              </Badge>
            </div>
          </div>

          <Tabs defaultValue="calendar" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Calendar View */}
            <TabsContent value="calendar" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Calendar */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5" />
                      Emotional Calendar
                    </CardTitle>
                    <CardDescription>
                      Click on a date to view your emotional activities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                    />
                  </CardContent>
                </Card>

                {/* Selected Date Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {selectedDate
                        ? selectedDate.toLocaleDateString()
                        : "Select a Date"}
                    </CardTitle>
                    <CardDescription>
                      Your activities for this day
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedDateEntries.length === 0 ? (
                      <div className="text-center py-8">
                        <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">
                          No activities recorded
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {selectedDateEntries.map((entry) => {
                          const IconComponent = getTypeIcon(entry.type);
                          return (
                            <div
                              key={entry.id}
                              className="flex items-start gap-3 p-3 rounded-lg border"
                            >
                              <div
                                className={`p-2 rounded-lg ${getTypeColor(
                                  entry.type
                                )}`}
                              >
                                <IconComponent className="h-4 w-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm">
                                  {entry.title}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {entry.description}
                                </p>
                                {entry.intensity && (
                                  <div className="flex items-center gap-1 mt-1">
                                    <div className="w-12 bg-gray-200 rounded-full h-1">
                                      <div
                                        className="bg-blue-500 h-1 rounded-full"
                                        style={{
                                          width: `${
                                            (entry.intensity / 10) * 100
                                          }%`,
                                        }}
                                      />
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                      {entry.intensity}/10
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Timeline View */}
            <TabsContent value="timeline" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Activity Timeline
                  </CardTitle>
                  <CardDescription>
                    Chronological view of your emotional intelligence journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {entries
                      .sort((a, b) => b.date.getTime() - a.date.getTime())
                      .map((entry) => {
                        const IconComponent = getTypeIcon(entry.type);
                        return (
                          <div
                            key={entry.id}
                            className="flex items-start gap-4 p-4 rounded-lg border"
                          >
                            <div
                              className={`p-3 rounded-lg ${getTypeColor(
                                entry.type
                              )}`}
                            >
                              <IconComponent className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">{entry.title}</h4>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-muted-foreground">
                                    {entry.date.toLocaleDateString()}
                                  </span>
                                  <Badge variant="outline" className="text-xs">
                                    {entry.type}
                                  </Badge>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {entry.description}
                              </p>
                              {entry.category && (
                                <Badge variant="secondary" className="text-xs">
                                  {entry.category}
                                </Badge>
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics View */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Activity Distribution
                    </CardTitle>
                    <CardDescription>
                      Breakdown of your activities by type
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(
                        entries.reduce((acc, entry) => {
                          acc[entry.type] = (acc[entry.type] || 0) + 1;
                          return acc;
                        }, {} as Record<string, number>)
                      ).map(([type, count]) => {
                        const IconComponent = getTypeIcon(type);
                        const percentage = Math.round(
                          (count / entries.length) * 100
                        );
                        return (
                          <div
                            key={type}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className={`p-2 rounded-lg ${getTypeColor(
                                  type
                                )}`}
                              >
                                <IconComponent className="h-4 w-4" />
                              </div>
                              <span className="font-medium capitalize">
                                {type}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-500 h-2 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-sm text-muted-foreground w-12 text-right">
                                {count} ({percentage}%)
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Weekly Summary
                    </CardTitle>
                    <CardDescription>
                      Your activity patterns this week
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-7 gap-2">
                        {Array.from({ length: 7 }, (_, i) => {
                          const date = new Date();
                          date.setDate(date.getDate() - (6 - i));
                          const dayEntries = getEntriesForDate(date);
                          return (
                            <div key={i} className="text-center">
                              <div className="text-xs text-muted-foreground mb-1">
                                {date.toLocaleDateString("en", {
                                  weekday: "short",
                                })}
                              </div>
                              <div className="text-xs text-muted-foreground mb-2">
                                {date.getDate()}
                              </div>
                              <div className="space-y-1">
                                {dayEntries.slice(0, 3).map((entry, idx) => {
                                  return (
                                    <div
                                      key={idx}
                                      className={`w-2 h-2 rounded-full mx-auto ${
                                        getTypeColor(entry.type).split(" ")[1]
                                      }`}
                                      title={entry.title}
                                    />
                                  );
                                })}
                                {dayEntries.length > 3 && (
                                  <div className="text-xs text-muted-foreground">
                                    +{dayEntries.length - 3}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
