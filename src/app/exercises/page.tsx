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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Play,
  CheckCircle,
  Clock,
  Star,
  Target,
  Brain,
  Heart,
  Users,
  Zap,
  Award,
  TrendingUp,
  Lightbulb,
  Timer,
} from "lucide-react";

interface Exercise {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  completed: boolean;
  rating: number;
  icon: React.ComponentType<{ className?: string }>;
  steps: string[];
  benefits: string[];
}

const exercises: Exercise[] = [
  {
    id: "1",
    title: "Mindful Breathing",
    description:
      "A simple breathing exercise to help you center yourself and reduce stress.",
    category: "Mindfulness",
    duration: "5 minutes",
    difficulty: "Beginner",
    completed: true,
    rating: 4,
    icon: Heart,
    steps: [
      "Find a comfortable seated position",
      "Close your eyes and take a deep breath",
      "Breathe in for 4 counts, hold for 4, exhale for 6",
      "Focus on the sensation of breathing",
      "Continue for 5 minutes",
    ],
    benefits: [
      "Reduces stress",
      "Improves focus",
      "Enhances emotional regulation",
    ],
  },
  {
    id: "2",
    title: "Emotional Journaling",
    description:
      "Reflect on your emotions and experiences through guided writing prompts.",
    category: "Self-Awareness",
    duration: "10 minutes",
    difficulty: "Beginner",
    completed: false,
    rating: 0,
    icon: BookOpen,
    steps: [
      "Set aside quiet time for reflection",
      "Write about three emotions you felt today",
      "Describe what triggered each emotion",
      "Reflect on how you responded",
      "Note what you learned about yourself",
    ],
    benefits: [
      "Increases self-awareness",
      "Improves emotional processing",
      "Reduces anxiety",
    ],
  },
  {
    id: "3",
    title: "Empathy Practice",
    description:
      "Develop your ability to understand and share the feelings of others.",
    category: "Empathy",
    duration: "15 minutes",
    difficulty: "Intermediate",
    completed: false,
    rating: 0,
    icon: Users,
    steps: [
      "Think of someone you interacted with today",
      "Consider their perspective and feelings",
      "Write down what they might be experiencing",
      "Reflect on how you could better support them",
      "Practice active listening in your next conversation",
    ],
    benefits: [
      "Strengthens relationships",
      "Improves communication",
      "Builds emotional intelligence",
    ],
  },
  {
    id: "4",
    title: "Stress Response Training",
    description:
      "Learn to recognize and manage your stress responses effectively.",
    category: "Emotional Regulation",
    duration: "20 minutes",
    difficulty: "Advanced",
    completed: false,
    rating: 0,
    icon: Brain,
    steps: [
      "Identify your stress triggers",
      "Practice the STOP technique (Stop, Take a breath, Observe, Proceed)",
      "Use positive self-talk",
      "Implement relaxation techniques",
      "Reflect on what worked best",
    ],
    benefits: [
      "Better stress management",
      "Improved decision-making",
      "Enhanced resilience",
    ],
  },
  {
    id: "5",
    title: "Gratitude Reflection",
    description: "Cultivate positive emotions through gratitude practice.",
    category: "Positive Psychology",
    duration: "8 minutes",
    difficulty: "Beginner",
    completed: true,
    rating: 5,
    icon: Star,
    steps: [
      "Think of three things you're grateful for today",
      "Write them down in detail",
      "Reflect on why each one matters to you",
      "Consider how you can express gratitude to others",
      "Notice how this makes you feel",
    ],
    benefits: [
      "Increases happiness",
      "Improves relationships",
      "Reduces negative emotions",
    ],
  },
  {
    id: "6",
    title: "Conflict Resolution Practice",
    description: "Develop skills for handling disagreements constructively.",
    category: "Social Skills",
    duration: "25 minutes",
    difficulty: "Advanced",
    completed: false,
    rating: 0,
    icon: Target,
    steps: [
      "Think of a recent conflict or disagreement",
      "Identify the underlying needs of both parties",
      "Practice using 'I' statements",
      "Role-play a constructive conversation",
      "Plan how to apply these skills in real situations",
    ],
    benefits: [
      "Better conflict resolution",
      "Stronger relationships",
      "Improved communication",
    ],
  },
];

const categories = {
  Mindfulness: { icon: Heart, color: "text-green-500", bgColor: "bg-green-50" },
  "Self-Awareness": {
    icon: Brain,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  Empathy: { icon: Users, color: "text-purple-500", bgColor: "bg-purple-50" },
  "Emotional Regulation": {
    icon: Zap,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },
  "Positive Psychology": {
    icon: Star,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  "Social Skills": {
    icon: Target,
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
};

export default function Exercises() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const [completedExercises, setCompletedExercises] = useState<string[]>([
    "1",
    "5",
  ]);
  const [currentStep, setCurrentStep] = useState(0);

  const handleStartExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setCurrentStep(0);
  };

  const handleCompleteExercise = () => {
    if (selectedExercise) {
      setCompletedExercises((prev) => [...prev, selectedExercise.id]);
      setSelectedExercise(null);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "text-green-600 bg-green-100";
      case "Intermediate":
        return "text-yellow-600 bg-yellow-100";
      case "Advanced":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const completedCount = completedExercises.length;
  const totalCount = exercises.length;
  const completionRate = Math.round((completedCount / totalCount) * 100);

  if (selectedExercise) {
    const categoryInfo =
      categories[selectedExercise.category as keyof typeof categories];
    const IconComponent = categoryInfo.icon;

    return (
      <div className="flex h-screen bg-background">
        <DashboardSidebar />

        <main className="flex-1 overflow-y-auto lg:ml-0">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  {selectedExercise.title}
                </h1>
                <p className="text-muted-foreground">
                  {selectedExercise.description}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setSelectedExercise(null)}
              >
                Back to Exercises
              </Button>
            </div>

            {/* Exercise Info */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg ${categoryInfo.bgColor}`}>
                      <IconComponent
                        className={`h-5 w-5 ${categoryInfo.color}`}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {selectedExercise.category}
                      </p>
                      <p className="text-xs text-muted-foreground">Category</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Timer className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">
                        {selectedExercise.duration}
                      </p>
                      <p className="text-xs text-muted-foreground">Duration</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <Badge
                        className={getDifficultyColor(
                          selectedExercise.difficulty
                        )}
                      >
                        {selectedExercise.difficulty}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        Difficulty
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Exercise Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  Exercise Steps
                </CardTitle>
                <CardDescription>
                  Follow these steps to complete the exercise
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedExercise.steps.map((step, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-3 p-4 rounded-lg border ${
                        index === currentStep
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200"
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                          index < currentStep
                            ? "bg-green-500 text-white"
                            : index === currentStep
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {index < currentStep ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{step}</p>
                        {index === currentStep && (
                          <p className="text-sm text-blue-600 mt-1">
                            Current step
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                  >
                    Previous
                  </Button>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      Step {currentStep + 1} of {selectedExercise.steps.length}
                    </span>
                    <Progress
                      value={
                        ((currentStep + 1) / selectedExercise.steps.length) *
                        100
                      }
                      className="w-32"
                    />
                  </div>

                  {currentStep < selectedExercise.steps.length - 1 ? (
                    <Button onClick={() => setCurrentStep(currentStep + 1)}>
                      Next Step
                    </Button>
                  ) : (
                    <Button onClick={handleCompleteExercise}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Complete Exercise
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Benefits
                </CardTitle>
                <CardDescription>
                  What you&apos;ll gain from this exercise
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {selectedExercise.benefits.map((benefit, index) => (
                    <Badge key={index} variant="secondary">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
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
              <h1 className="text-3xl font-bold tracking-tight">
                Exercises & Practice
              </h1>
              <p className="text-muted-foreground">
                Develop your emotional intelligence through guided exercises
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Award className="h-3 w-3" />
                {completedCount}/{totalCount} completed
              </Badge>
            </div>
          </div>

          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Your Progress
              </CardTitle>
              <CardDescription>
                Track your emotional intelligence development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Overall Completion
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {completionRate}%
                  </span>
                </div>
                <Progress value={completionRate} className="h-3" />
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {completedCount}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Completed
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {totalCount - completedCount}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Remaining
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      {totalCount}
                    </div>
                    <div className="text-xs text-muted-foreground">Total</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Exercises Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {exercises.map((exercise) => {
              const categoryInfo =
                categories[exercise.category as keyof typeof categories];
              const IconComponent = categoryInfo.icon;
              const isCompleted = completedExercises.includes(exercise.id);

              return (
                <Card key={exercise.id} className="relative">
                  {isCompleted && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </div>
                  )}

                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className={`p-3 rounded-lg ${categoryInfo.bgColor}`}>
                        <IconComponent
                          className={`h-6 w-6 ${categoryInfo.color}`}
                        />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">
                          {exercise.title}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {exercise.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge
                        className={getDifficultyColor(exercise.difficulty)}
                      >
                        {exercise.difficulty}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {exercise.duration}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {exercise.benefits.slice(0, 2).map((benefit, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {benefit}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      onClick={() => handleStartExercise(exercise)}
                      className="w-full"
                      variant={isCompleted ? "outline" : "default"}
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Review Exercise
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Start Exercise
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
