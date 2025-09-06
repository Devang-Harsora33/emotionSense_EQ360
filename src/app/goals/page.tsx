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
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Target,
  Plus,
  CheckCircle,
  Calendar as CalendarIcon,
  Award,
  TrendingUp,
  // Lightbulb,
  Clock,
  Edit,
  Trash2,
  Brain,
  Heart,
  Users,
  Zap,
} from "lucide-react";

interface Goal {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  progress: number;
  completed: boolean;
  category:
    | "Emotional Regulation"
    | "Self-Awareness"
    | "Empathy"
    | "Social Skills"
    | "Motivation";
}

const categories = {
  "Emotional Regulation": {
    icon: Heart,
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  "Self-Awareness": {
    icon: Brain,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  Empathy: { icon: Users, color: "text-purple-500", bgColor: "bg-purple-50" },
  "Social Skills": {
    icon: Target,
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  Motivation: { icon: Zap, color: "text-yellow-500", bgColor: "bg-yellow-50" },
};

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Practice daily mindfulness for 10 minutes",
      description:
        "Dedicate 10 minutes each morning to mindfulness meditation to improve focus and reduce stress.",
      targetDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      progress: 75,
      completed: false,
      category: "Emotional Regulation",
    },
    {
      id: "2",
      title: "Identify and label 3 emotions daily",
      description:
        "Throughout the day, consciously identify and name at least three different emotions you experience.",
      targetDate: new Date(new Date().setDate(new Date().getDate() + 14)),
      progress: 50,
      completed: false,
      category: "Self-Awareness",
    },
    {
      id: "3",
      title: "Offer active listening to a colleague",
      description:
        "In a conversation, focus entirely on listening to a colleague without interrupting or formulating your response.",
      targetDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      progress: 100,
      completed: true,
      category: "Empathy",
    },
  ]);

  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    targetDate: "",
    category: "Emotional Regulation",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewGoal((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddGoal = () => {
    if (
      newGoal.title &&
      newGoal.description &&
      newGoal.targetDate &&
      newGoal.category
    ) {
      const goal: Goal = {
        id: String(goals.length + 1),
        title: newGoal.title,
        description: newGoal.description,
        targetDate: new Date(newGoal.targetDate),
        progress: 0,
        completed: false,
        category: newGoal.category as Goal["category"],
      };
      setGoals((prev) => [...prev, goal]);
      setNewGoal({
        title: "",
        description: "",
        targetDate: "",
        category: "Emotional Regulation",
      });
    }
  };

  const handleToggleComplete = (id: string) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              completed: !goal.completed,
              progress: goal.completed ? 0 : 100,
            }
          : goal
      )
    );
  };

  const handleDeleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
  };

  const getCategoryColor = (category: Goal["category"]) => {
    switch (category) {
      case "Emotional Regulation":
        return "bg-red-100 text-red-800";
      case "Self-Awareness":
        return "bg-blue-100 text-blue-800";
      case "Empathy":
        return "bg-purple-100 text-purple-800";
      case "Social Skills":
        return "bg-green-100 text-green-800";
      case "Motivation":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
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
                Goals & Objectives
              </h1>
              <p className="text-muted-foreground">
                Set, track, and achieve your emotional intelligence development
                goals
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Target className="h-3 w-3" />
                {goals.filter((g) => !g.completed).length} active goals
              </Badge>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="card-hover fade-in">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Goals
                </CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{goals.length}</div>
                <p className="text-xs text-muted-foreground">
                  All your active and completed goals
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover fade-in">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {goals.filter((g) => g.completed).length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Goals you&apos;ve successfully achieved
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover fade-in">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  In Progress
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {goals.filter((g) => !g.completed).length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Goals currently being worked on
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover fade-in">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Avg Progress
                </CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {goals.length > 0
                    ? Math.round(
                        goals.reduce((sum, goal) => sum + goal.progress, 0) /
                          goals.length
                      )
                    : 0}
                  %
                </div>
                <p className="text-xs text-muted-foreground">
                  Overall progress across all goals
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Add New Goal */}
          <Card className="card-hover fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Goal
              </CardTitle>
              <CardDescription>
                Define a new emotional intelligence goal to work towards
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Goal Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Practice active listening"
                    value={newGoal.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    name="category"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={newGoal.category}
                    onChange={handleInputChange}
                  >
                    <option value="Emotional Regulation">
                      Emotional Regulation
                    </option>
                    <option value="Self-Awareness">Self-Awareness</option>
                    <option value="Empathy">Empathy</option>
                    <option value="Social Skills">Social Skills</option>
                    <option value="Motivation">Motivation</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Briefly describe your goal and why it's important..."
                  value={newGoal.description}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetDate">Target Completion Date</Label>
                <Input
                  id="targetDate"
                  name="targetDate"
                  type="date"
                  value={newGoal.targetDate}
                  onChange={handleInputChange}
                />
              </div>

              <Button onClick={handleAddGoal} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Goal
              </Button>
            </CardContent>
          </Card>

          {/* Goals List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Your Goals</h2>
            {goals.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      No goals set yet
                    </h3>
                    <p className="text-muted-foreground">
                      Start by adding a new goal above!
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {goals.map((goal) => {
                  const categoryInfo = categories[goal.category];
                  const IconComponent = categoryInfo.icon;

                  return (
                    <Card key={goal.id} className="card-hover fade-in">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div
                              className={`p-2 rounded-lg ${categoryInfo.bgColor}`}
                            >
                              <IconComponent
                                className={`h-5 w-5 ${categoryInfo.color}`}
                              />
                            </div>
                            <div>
                              <CardTitle className="text-lg">
                                {goal.title}
                              </CardTitle>
                              <CardDescription className="mt-1">
                                {goal.description}
                              </CardDescription>
                            </div>
                          </div>
                          <Badge className={getCategoryColor(goal.category)}>
                            {goal.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <CalendarIcon className="h-4 w-4" />
                              <span>
                                Target: {goal.targetDate.toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>
                                {goal.completed
                                  ? "Completed"
                                  : `${goal.progress}% complete`}
                              </span>
                            </div>
                          </div>
                        </div>

                        <Progress
                          value={goal.progress}
                          className="progress-animate"
                        />

                        <div className="flex justify-end gap-2">
                          <Button
                            variant={goal.completed ? "secondary" : "default"}
                            onClick={() => handleToggleComplete(goal.id)}
                          >
                            {goal.completed ? (
                              <>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Mark as Incomplete
                              </>
                            ) : (
                              <>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Mark as Complete
                              </>
                            )}
                          </Button>
                          <Button variant="outline" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDeleteGoal(goal.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
