"use client";

import { useState, useEffect } from "react";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  Brain,
  Heart,
  Target,
  Calendar,
  BarChart3,
  Lightbulb,
  Award,
  Users,
  CheckCircle,
  AlertCircle,
  Smile,
  Frown,
  Meh,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Insights() {
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
          <p className="text-muted-foreground">Loading insights...</p>
        </div>
      </div>
    );
  }

  // Generate trend data based on user's progress
  const trendData = [
    {
      month: "Jan",
      EQ: Math.max(50, (user.eqScore || 65) - 20),
      Stress: 45,
      Happiness: user.emotionalPatterns?.happy || 0,
      Focus: user.emotionalPatterns?.focused || 0,
    },
    {
      month: "Feb",
      EQ: Math.max(50, (user.eqScore || 65) - 15),
      Stress: 42,
      Happiness: (user.emotionalPatterns?.happy || 0) + 2,
      Focus: (user.emotionalPatterns?.focused || 0) + 3,
    },
    {
      month: "Mar",
      EQ: Math.max(50, (user.eqScore || 65) - 10),
      Stress: 38,
      Happiness: (user.emotionalPatterns?.happy || 0) + 5,
      Focus: (user.emotionalPatterns?.focused || 0) + 7,
    },
    {
      month: "Apr",
      EQ: Math.max(50, (user.eqScore || 65) - 5),
      Stress: 35,
      Happiness: (user.emotionalPatterns?.happy || 0) + 8,
      Focus: (user.emotionalPatterns?.focused || 0) + 10,
    },
    {
      month: "May",
      EQ: user.eqScore || 65,
      Stress: 32,
      Happiness: (user.emotionalPatterns?.happy || 0) + 10,
      Focus: (user.emotionalPatterns?.focused || 0) + 13,
    },
    {
      month: "Jun",
      EQ: (user.eqScore || 65) + 5,
      Stress: 28,
      Happiness: (user.emotionalPatterns?.happy || 0) + 13,
      Focus: (user.emotionalPatterns?.focused || 0) + 16,
    },
  ];

  // Use user's emotional patterns
  const patternData = [
    {
      emotion: "Happy",
      count: user.emotionalPatterns?.happy || 0,
      percentage:
        Math.round(
          ((user.emotionalPatterns?.happy || 0) /
            (user.totalEmotionsLogged || 1)) *
            100
        ) || 0,
    },
    {
      emotion: "Calm",
      count: user.emotionalPatterns?.calm || 0,
      percentage:
        Math.round(
          ((user.emotionalPatterns?.calm || 0) /
            (user.totalEmotionsLogged || 1)) *
            100
        ) || 0,
    },
    {
      emotion: "Focused",
      count: user.emotionalPatterns?.focused || 0,
      percentage:
        Math.round(
          ((user.emotionalPatterns?.focused || 0) /
            (user.totalEmotionsLogged || 1)) *
            100
        ) || 0,
    },
    {
      emotion: "Anxious",
      count: user.emotionalPatterns?.anxious || 0,
      percentage:
        Math.round(
          ((user.emotionalPatterns?.anxious || 0) /
            (user.totalEmotionsLogged || 1)) *
            100
        ) || 0,
    },
    {
      emotion: "Sad",
      count: user.emotionalPatterns?.sad || 0,
      percentage:
        Math.round(
          ((user.emotionalPatterns?.sad || 0) /
            (user.totalEmotionsLogged || 1)) *
            100
        ) || 0,
    },
  ];

  const weeklyPatternData = [
    { day: "Mon", emotions: 8, exercises: 2, assessments: 1 },
    { day: "Tue", emotions: 6, exercises: 3, assessments: 0 },
    { day: "Wed", emotions: 9, exercises: 1, assessments: 1 },
    { day: "Thu", emotions: 7, exercises: 4, assessments: 0 },
    { day: "Fri", emotions: 10, exercises: 2, assessments: 1 },
    { day: "Sat", emotions: 5, exercises: 3, assessments: 0 },
    { day: "Sun", emotions: 4, exercises: 2, assessments: 0 },
  ];

  const COLORS = ["#14b8a6", "#f97316", "#ec4899", "#22c55e", "#8b5cf6"];

  // Mock data - in a real app, this would come from your backend
  const weeklyInsights = [
    {
      title: "Emotional Stability Improved",
      description:
        "Your emotional regulation has improved by 15% this week compared to last week.",
      type: "positive",
      icon: TrendingUp,
      metric: "+15%",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Stress Triggers Identified",
      description:
        "Work-related stress appears to be your primary trigger on weekdays.",
      type: "insight",
      icon: Lightbulb,
      metric: "3 triggers",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Social Connections Strong",
      description:
        "Your empathy and social skills scores are consistently high.",
      type: "positive",
      icon: Users,
      metric: "85%",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const monthlyTrends = [
    { month: "Jan", score: 65, emotions: 45, exercises: 12 },
    { month: "Feb", score: 68, emotions: 52, exercises: 15 },
    { month: "Mar", score: 72, emotions: 48, exercises: 18 },
    { month: "Apr", score: 75, emotions: 55, exercises: 20 },
    { month: "May", score: 78, emotions: 58, exercises: 22 },
    { month: "Jun", score: 80, emotions: 62, exercises: 25 },
  ];

  const emotionalPatterns = [
    { emotion: "Happy", frequency: 35, trend: "up", color: "text-green-500" },
    { emotion: "Calm", frequency: 28, trend: "up", color: "text-blue-500" },
    {
      emotion: "Anxious",
      frequency: 15,
      trend: "down",
      color: "text-yellow-500",
    },
    { emotion: "Sad", frequency: 12, trend: "down", color: "text-gray-500" },
    { emotion: "Angry", frequency: 10, trend: "down", color: "text-red-500" },
  ];

  const recommendations = [
    {
      title: "Morning Mindfulness",
      description:
        "Start your day with 5 minutes of meditation to improve emotional regulation.",
      priority: "high",
      category: "Mindfulness",
      estimatedTime: "5 min/day",
    },
    {
      title: "Evening Reflection",
      description:
        "Spend 10 minutes journaling about your emotions before bed.",
      priority: "medium",
      category: "Self-Awareness",
      estimatedTime: "10 min/day",
    },
    {
      title: "Social Connection Practice",
      description: "Practice active listening in your conversations this week.",
      priority: "low",
      category: "Social Skills",
      estimatedTime: "15 min/day",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
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
                Insights & Analytics
              </h1>
              <p className="text-muted-foreground">
                Discover patterns in your emotional intelligence journey
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Award className="h-3 w-3" />
                Last updated 2 hours ago
              </Badge>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="patterns">Patterns</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Key Insights */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {weeklyInsights.map((insight, index) => {
                  const IconComponent = insight.icon;
                  return (
                    <Card key={index}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                          <div className={`p-2 rounded-lg ${insight.bgColor}`}>
                            <IconComponent
                              className={`h-5 w-5 ${insight.color}`}
                            />
                          </div>
                          <CardTitle className="text-lg">
                            {insight.title}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">
                          {insight.description}
                        </p>
                        <Badge variant="secondary" className={insight.color}>
                          {insight.metric}
                        </Badge>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* EQ Score Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    EQ Score Evolution
                  </CardTitle>
                  <CardDescription>
                    Your emotional intelligence growth over the last 6 months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">80</span>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-600">
                          +15 points this month
                        </span>
                      </div>
                    </div>
                    <Progress value={80} className="h-3" />
                    <div className="grid grid-cols-6 gap-2">
                      {monthlyTrends.map((month) => (
                        <div key={month.month} className="text-center">
                          <div className="text-xs text-muted-foreground mb-1">
                            {month.month}
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-16 flex items-end">
                            <div
                              className="bg-blue-500 rounded-full w-full"
                              style={{
                                height: `${(month.score / 100) * 100}%`,
                              }}
                            />
                          </div>
                          <div className="text-xs font-medium mt-1">
                            {month.score}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Current EQ Score
                    </CardTitle>
                    <Brain className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {user.eqScore || 65}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">
                        +{Math.floor((user.eqScore || 65) * 0.1)}
                      </span>{" "}
                      from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Emotions Logged
                    </CardTitle>
                    <Heart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {user.totalEmotionsLogged || 0}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Total logged
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Exercises Completed
                    </CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {user.totalExercisesCompleted || 0}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">
                        +{Math.floor((user.totalExercisesCompleted || 0) * 0.2)}
                      </span>{" "}
                      this week
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Streak Days
                    </CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {user.streakDays || 0}
                    </div>
                    <p className="text-xs text-muted-foreground">Keep it up!</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Trends Tab */}
            <TabsContent value="trends" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Emotional Intelligence Trends
                  </CardTitle>
                  <CardDescription>
                    Track your progress across different emotional metrics over
                    time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="EQ"
                          stroke="#3b82f6"
                          strokeWidth={3}
                          name="EQ Score"
                        />
                        <Line
                          type="monotone"
                          dataKey="Happiness"
                          stroke="#10b981"
                          strokeWidth={3}
                          name="Happiness"
                        />
                        <Line
                          type="monotone"
                          dataKey="Focus"
                          stroke="#f59e0b"
                          strokeWidth={3}
                          name="Focus"
                        />
                        <Line
                          type="monotone"
                          dataKey="Stress"
                          stroke="#ef4444"
                          strokeWidth={3}
                          name="Stress Level"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Weekly Activity Pattern
                    </CardTitle>
                    <CardDescription>
                      Your daily engagement with the platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={weeklyPatternData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar
                            dataKey="emotions"
                            fill="#3b82f6"
                            name="Emotions Logged"
                          />
                          <Bar
                            dataKey="exercises"
                            fill="#10b981"
                            name="Exercises Done"
                          />
                          <Bar
                            dataKey="assessments"
                            fill="#f59e0b"
                            name="Assessments"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Growth Areas
                    </CardTitle>
                    <CardDescription>
                      Areas where you&apos;ve shown the most improvement
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-lg bg-green-50">
                            <Heart className="h-4 w-4 text-green-500" />
                          </div>
                          <span className="font-medium">
                            Emotional Regulation
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">
                            +18%
                          </div>
                          <Progress value={85} className="w-20 h-2" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-lg bg-blue-50">
                            <Brain className="h-4 w-4 text-blue-500" />
                          </div>
                          <span className="font-medium">Self-Awareness</span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-600">
                            +12%
                          </div>
                          <Progress value={78} className="w-20 h-2" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-lg bg-purple-50">
                            <Users className="h-4 w-4 text-purple-500" />
                          </div>
                          <span className="font-medium">Social Skills</span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-purple-600">
                            +8%
                          </div>
                          <Progress value={82} className="w-20 h-2" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Patterns Tab */}
            <TabsContent value="patterns" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Emotional Distribution
                    </CardTitle>
                    <CardDescription>
                      Frequency of different emotions you&apos;ve experienced
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={patternData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="emotion" />
                          <YAxis />
                          <Tooltip
                            formatter={(value) => [`${value} times`, "Count"]}
                          />
                          <Legend />
                          <Bar
                            dataKey="count"
                            fill="#3b82f6"
                            radius={[4, 4, 0, 0]}
                            name="Count"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5" />
                      Emotional Breakdown
                    </CardTitle>
                    <CardDescription>
                      Percentage distribution of your emotional states
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 w-full relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={patternData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ emotion, count }) =>
                              `${emotion}: ${count}`
                            }
                            outerRadius={100}
                            innerRadius={40}
                            fill="#8884d8"
                            dataKey="count"
                          >
                            {patternData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value, name) => [
                              `${value} times`,
                              name,
                            ]}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Emotional Patterns Analysis
                  </CardTitle>
                  <CardDescription>
                    Detailed breakdown of your emotional patterns and trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {emotionalPatterns.map((pattern, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 rounded-lg border"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            {pattern.emotion === "Happy" && (
                              <Smile className="h-5 w-5 text-green-500" />
                            )}
                            {pattern.emotion === "Calm" && (
                              <Meh className="h-5 w-5 text-blue-500" />
                            )}
                            {pattern.emotion === "Anxious" && (
                              <AlertCircle className="h-5 w-5 text-yellow-500" />
                            )}
                            {pattern.emotion === "Sad" && (
                              <Frown className="h-5 w-5 text-gray-500" />
                            )}
                            {pattern.emotion === "Angry" && (
                              <AlertCircle className="h-5 w-5 text-red-500" />
                            )}
                            <span className="font-medium">
                              {pattern.emotion}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-lg font-bold">
                              {pattern.frequency}%
                            </div>
                            <div className="text-xs text-muted-foreground">
                              frequency
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {pattern.trend === "up" ? (
                              <TrendingUp className="h-4 w-4 text-green-500" />
                            ) : (
                              <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
                            )}
                            <span
                              className={`text-sm ${
                                pattern.trend === "up"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {pattern.trend}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Recommendations Tab */}
            <TabsContent value="recommendations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Personalized Recommendations
                  </CardTitle>
                  <CardDescription>
                    Based on your patterns and progress, here are our
                    suggestions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recommendations.map((rec, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 rounded-lg border"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">{rec.title}</h4>
                            <Badge className={getPriorityColor(rec.priority)}>
                              {rec.priority} priority
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {rec.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Category: {rec.category}</span>
                            <span>Time: {rec.estimatedTime}</span>
                          </div>
                        </div>
                        <Button size="sm">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Start
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
