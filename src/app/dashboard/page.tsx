"use client";

import { useState, useEffect } from "react";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { ProtectedRoute } from "@/components/protected-route";
import { getCurrentUser, type User } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  Heart,
  TrendingUp,
  Target,
  Calendar,
  BookOpen,
  Award,
  Zap,
  Smile,
  Meh,
} from "lucide-react";

function DashboardContent() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  if (!user) {
    return (
      <div className="flex h-screen bg-background items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Use cached user data
  const currentEQScore = user.eqScore || 65;
  const weeklyProgress = Math.min(
    20,
    Math.floor(((user.totalEmotionsLogged || 0) / 30) * 100)
  );
  const streakDays = user.streakDays || 0;
  const completedExercises = user.totalExercisesCompleted || 0;
  const totalExercises = 20; // This could be dynamic based on available exercises

  // Generate recent emotions from user's emotional patterns
  const recentEmotions = [
    {
      emotion: "Happy",
      intensity: Math.min(10, Math.max(1, user.emotionalPatterns?.happy || 0)),
      time: "2 hours ago",
      icon: Smile,
      color: "text-green-500",
    },
    {
      emotion: "Calm",
      intensity: Math.min(10, Math.max(1, user.emotionalPatterns?.calm || 0)),
      time: "5 hours ago",
      icon: Meh,
      color: "text-blue-500",
    },
    {
      emotion: "Focused",
      intensity: Math.min(
        10,
        Math.max(1, user.emotionalPatterns?.focused || 0)
      ),
      time: "1 day ago",
      icon: Target,
      color: "text-purple-500",
    },
  ];

  // Use user's current goals
  const weeklyGoals = (user.currentGoals || []).map((goal) => ({
    title: goal.title,
    progress: Math.min(100, (goal.current / goal.target) * 100),
    target: goal.target,
    current: goal.current,
  }));

  if (!user) {
    return (
      <div className="flex h-screen bg-background items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />

      <main className="flex-1 overflow-y-auto lg:ml-0">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {user.name}! Here&apos;s your emotional
                intelligence overview.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Award className="h-3 w-3" />
                {streakDays} day streak
              </Badge>
              <Button>
                <Zap className="h-4 w-4 mr-2" />
                Quick Assessment
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="card-hover fade-in">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">EQ Score</CardTitle>
                <Brain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentEQScore}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+{weeklyProgress}%</span>{" "}
                  from last week
                </p>
                <Progress value={currentEQScore} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="card-hover fade-in">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Exercises Completed
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {completedExercises}/{totalExercises}
                </div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((completedExercises / totalExercises) * 100)}%
                  completion rate
                </p>
                <Progress
                  value={(completedExercises / totalExercises) * 100}
                  className="mt-2"
                />
              </CardContent>
            </Card>

            <Card className="card-hover fade-in">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Current Streak
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{streakDays} days</div>
                <p className="text-xs text-muted-foreground">
                  Keep it up! You&apos;re doing great.
                </p>
                <div className="flex mt-2">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full mr-1 ${
                        i < streakDays ? "bg-green-500" : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover fade-in">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Weekly Progress
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+{weeklyProgress}%</div>
                <p className="text-xs text-muted-foreground">
                  Improvement in emotional awareness
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">
                    Excellent progress!
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Recent Emotions */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Recent Emotional States
                </CardTitle>
                <CardDescription>
                  Your emotional patterns over the last few days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentEmotions.map((emotion, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg border"
                    >
                      <div className="flex items-center gap-3">
                        <emotion.icon className={`h-5 w-5 ${emotion.color}`} />
                        <div>
                          <p className="font-medium">{emotion.emotion}</p>
                          <p className="text-sm text-muted-foreground">
                            {emotion.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{
                              width: `${(emotion.intensity / 10) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm font-medium">
                          {emotion.intensity}/10
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Emotions
                </Button>
              </CardContent>
            </Card>

            {/* Weekly Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Weekly Goals
                </CardTitle>
                <CardDescription>Track your progress this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyGoals.map((goal, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {goal.title}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {goal.current}/{goal.target}
                        </span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Set New Goals
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Jump into your emotional intelligence journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Brain className="h-6 w-6" />
                  <span>Take Assessment</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Heart className="h-6 w-6" />
                  <span>Log Emotion</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <BookOpen className="h-6 w-6" />
                  <span>Start Exercise</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <TrendingUp className="h-6 w-6" />
                  <span>View Insights</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
