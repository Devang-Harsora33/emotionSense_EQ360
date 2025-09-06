"use client";

import React, { useState, useEffect } from "react";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { getCurrentUser, logEmotion, type User } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Heart,
  Plus,
  Calendar as CalendarIcon,
  // TrendingUp,
  BarChart3,
  Smile,
  Frown,
  Meh,
  Angry,
  Laugh,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";

interface EmotionEntry {
  id: string;
  emotion: string;
  intensity: number;
  note: string;
  timestamp: Date;
  triggers?: string[];
}

const emotions = [
  {
    name: "Happy",
    icon: Smile,
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  { name: "Sad", icon: Frown, color: "text-blue-500", bgColor: "bg-blue-50" },
  { name: "Angry", icon: Angry, color: "text-red-500", bgColor: "bg-red-50" },
  {
    name: "Anxious",
    icon: AlertCircle,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },
  {
    name: "Calm",
    icon: Meh,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    name: "Excited",
    icon: Laugh,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
];

const commonTriggers = [
  "Work stress",
  "Family",
  "Health",
  "Relationships",
  "Finances",
  "Social media",
  "News",
  "Weather",
  "Exercise",
  "Sleep",
  "Food",
];

export default function EmotionalTracking() {
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [selectedEmotion, setSelectedEmotion] = useState<string>("");
  const [intensity, setIntensity] = useState([5]);
  const [note, setNote] = useState("");
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [entries, setEntries] = useState<EmotionEntry[]>([
    {
      id: "1",
      emotion: "Happy",
      intensity: 8,
      note: "Had a great meeting with the team today!",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      triggers: ["Work", "Relationships"],
    },
    {
      id: "2",
      emotion: "Calm",
      intensity: 7,
      note: "Morning meditation really helped center me.",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      triggers: ["Exercise"],
    },
    {
      id: "3",
      emotion: "Anxious",
      intensity: 6,
      note: "Feeling worried about the upcoming presentation.",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      triggers: ["Work stress"],
    },
  ]);
  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    setIsClient(true);
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleTriggerToggle = (trigger: string) => {
    setSelectedTriggers((prev) =>
      prev.includes(trigger)
        ? prev.filter((t) => t !== trigger)
        : [...prev, trigger]
    );
  };

  const handleSaveEntry = () => {
    if (!selectedEmotion || !user) return;

    const newEntry: EmotionEntry = {
      id: Date.now().toString(),
      emotion: selectedEmotion,
      intensity: intensity[0],
      note,
      timestamp: new Date(),
      triggers: selectedTriggers,
    };

    setEntries((prev) => [newEntry, ...prev]);

    // Log emotion to user's cache
    const emotionKey = selectedEmotion.toLowerCase() as
      | "happy"
      | "calm"
      | "focused"
      | "anxious"
      | "sad";
    if (["happy", "calm", "focused", "anxious", "sad"].includes(emotionKey)) {
      logEmotion(emotionKey);
      // Refresh user data
      const updatedUser = getCurrentUser();
      setUser(updatedUser);
    }

    // Reset form
    setSelectedEmotion("");
    setIntensity([5]);
    setNote("");
    setSelectedTriggers([]);
  };

  const getEmotionIcon = (emotionName: string) => {
    const emotion = emotions.find((e) => e.name === emotionName);
    return emotion ? emotion.icon : Heart;
  };

  const getEmotionColor = (emotionName: string) => {
    const emotion = emotions.find((e) => e.name === emotionName);
    return emotion ? emotion.color : "text-gray-500";
  };

  const getEmotionBgColor = (emotionName: string) => {
    const emotion = emotions.find((e) => e.name === emotionName);
    return emotion ? emotion.bgColor : "bg-gray-50";
  };

  const formatTime = (date: Date) => {
    if (!isClient) return "--:--";
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    if (!isClient) return "--";
    return date.toLocaleDateString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />

      <main className="flex-1 overflow-y-auto lg:ml-0">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Emotional Tracking
              </h1>
              <p className="text-muted-foreground">
                Log your emotions and track patterns over time
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {entries.length} entries today
              </Badge>
            </div>
          </div>

          <Tabs defaultValue="log" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="log">Log Emotion</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
            </TabsList>

            {/* Log Emotion Tab */}
            <TabsContent value="log" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Log Form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="h-5 w-5" />
                      Log Your Emotion
                    </CardTitle>
                    <CardDescription>
                      How are you feeling right now?
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Emotion Selection */}
                    <div className="space-y-3">
                      <Label>Select Emotion</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {emotions.map((emotion) => {
                          const IconComponent = emotion.icon;
                          return (
                            <Button
                              key={emotion.name}
                              variant={
                                selectedEmotion === emotion.name
                                  ? "default"
                                  : "outline"
                              }
                              className={`h-16 flex-col gap-2 ${
                                selectedEmotion === emotion.name
                                  ? emotion.bgColor
                                  : ""
                              }`}
                              onClick={() => setSelectedEmotion(emotion.name)}
                            >
                              <IconComponent
                                className={`h-5 w-5 ${emotion.color}`}
                              />
                              <span className="text-sm">{emotion.name}</span>
                            </Button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Intensity Slider */}
                    <div className="space-y-3">
                      <Label>Intensity: {intensity[0]}/10</Label>
                      <Slider
                        value={intensity}
                        onValueChange={setIntensity}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Very Low</span>
                        <span>Very High</span>
                      </div>
                    </div>

                    {/* Triggers */}
                    <div className="space-y-3">
                      <Label>What triggered this emotion? (Optional)</Label>
                      <div className="flex flex-wrap gap-2">
                        {commonTriggers.map((trigger) => (
                          <Badge
                            key={trigger}
                            variant={
                              selectedTriggers.includes(trigger)
                                ? "default"
                                : "outline"
                            }
                            className="cursor-pointer"
                            onClick={() => handleTriggerToggle(trigger)}
                          >
                            {trigger}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Note */}
                    <div className="space-y-3">
                      <Label>Additional Notes (Optional)</Label>
                      <Textarea
                        placeholder="What's on your mind? Any additional context about how you're feeling..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        rows={3}
                      />
                    </div>

                    <Button
                      onClick={handleSaveEntry}
                      disabled={!selectedEmotion}
                      className="w-full"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Save Entry
                    </Button>
                  </CardContent>
                </Card>

                {/* Recent Entries */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Recent Entries
                    </CardTitle>
                    <CardDescription>
                      Your emotional journey today
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {entries.slice(0, 5).map((entry) => {
                        const IconComponent = getEmotionIcon(entry.emotion);
                        return (
                          <div
                            key={entry.id}
                            className="flex items-start gap-3 p-3 rounded-lg border"
                          >
                            <div
                              className={`p-2 rounded-lg ${getEmotionBgColor(
                                entry.emotion
                              )}`}
                            >
                              <IconComponent
                                className={`h-4 w-4 ${getEmotionColor(
                                  entry.emotion
                                )}`}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium">
                                  {entry.emotion}
                                </span>
                                <Badge variant="secondary" className="text-xs">
                                  {entry.intensity}/10
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {entry.note}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {formatTime(entry.timestamp)}
                                {entry.triggers &&
                                  entry.triggers.length > 0 && (
                                    <>
                                      <span>•</span>
                                      <span>{entry.triggers.join(", ")}</span>
                                    </>
                                  )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Emotional History
                  </CardTitle>
                  <CardDescription>
                    View your emotional patterns over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {entries.map((entry) => {
                      const IconComponent = getEmotionIcon(entry.emotion);
                      return (
                        <div
                          key={entry.id}
                          className="flex items-center justify-between p-4 rounded-lg border"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-lg ${getEmotionBgColor(
                                entry.emotion
                              )}`}
                            >
                              <IconComponent
                                className={`h-5 w-5 ${getEmotionColor(
                                  entry.emotion
                                )}`}
                              />
                            </div>
                            <div>
                              <p className="font-medium">{entry.emotion}</p>
                              <p className="text-sm text-muted-foreground">
                                {entry.note}
                              </p>
                              {entry.triggers && entry.triggers.length > 0 && (
                                <div className="flex gap-1 mt-1">
                                  {entry.triggers.map((trigger) => (
                                    <Badge
                                      key={trigger}
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {trigger}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium">
                                {entry.intensity}/10
                              </span>
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-500 h-2 rounded-full"
                                  style={{
                                    width: `${(entry.intensity / 10) * 100}%`,
                                  }}
                                />
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(entry.timestamp)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Calendar Tab */}
            <TabsContent value="calendar" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5" />
                      Calendar View
                    </CardTitle>
                    <CardDescription>
                      Select a date to view your emotional entries
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Emotional Summary</CardTitle>
                    <CardDescription>
                      Your emotional patterns and insights
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 rounded-lg bg-green-50">
                          <div className="text-2xl font-bold text-green-600">
                            {
                              entries.filter((e) => e.emotion === "Happy")
                                .length
                            }
                          </div>
                          <div className="text-sm text-green-600">
                            Happy Moments
                          </div>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-blue-50">
                          <div className="text-2xl font-bold text-blue-600">
                            {Math.round(
                              entries.reduce((sum, e) => sum + e.intensity, 0) /
                                entries.length
                            ) || 0}
                          </div>
                          <div className="text-sm text-blue-600">
                            Avg Intensity
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Most Common Triggers</h4>
                        <div className="flex flex-wrap gap-2">
                          {commonTriggers.slice(0, 5).map((trigger) => (
                            <Badge key={trigger} variant="outline">
                              {trigger}
                            </Badge>
                          ))}
                        </div>
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
