"use client";

import React, { useState } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Brain,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Award,
  Target,
  Users,
  Heart,
  Zap,
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  category: string;
  options: {
    value: string;
    label: string;
    score: number;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "When someone criticizes you, your first reaction is usually to:",
    category: "Self-Awareness",
    options: [
      {
        value: "defensive",
        label: "Get defensive and explain why they're wrong",
        score: 1,
      },
      {
        value: "listen",
        label: "Listen carefully and ask for specific examples",
        score: 4,
      },
      { value: "ignore", label: "Ignore it and move on", score: 2 },
      {
        value: "analyze",
        label: "Take time to reflect on the feedback",
        score: 5,
      },
    ],
  },
  {
    id: 2,
    question: "In a stressful situation, you typically:",
    category: "Emotional Regulation",
    options: [
      {
        value: "panic",
        label: "Feel overwhelmed and struggle to think clearly",
        score: 1,
      },
      {
        value: "breathe",
        label: "Take deep breaths and try to stay calm",
        score: 4,
      },
      { value: "avoid", label: "Avoid the situation if possible", score: 2 },
      {
        value: "strategize",
        label: "Focus on finding solutions step by step",
        score: 5,
      },
    ],
  },
  {
    id: 3,
    question: "When working in a team, you prefer to:",
    category: "Social Skills",
    options: [
      { value: "lead", label: "Take charge and direct the group", score: 3 },
      {
        value: "collaborate",
        label: "Work together and share ideas equally",
        score: 5,
      },
      {
        value: "follow",
        label: "Follow others' lead and contribute when asked",
        score: 2,
      },
      {
        value: "work-alone",
        label: "Work independently and share results",
        score: 3,
      },
    ],
  },
  {
    id: 4,
    question: "When you notice a colleague seems upset, you:",
    category: "Empathy",
    options: [
      { value: "ignore", label: "Ignore it unless it affects work", score: 1 },
      { value: "ask", label: "Ask them directly what's wrong", score: 4 },
      {
        value: "observe",
        label: "Observe their behavior and offer support",
        score: 5,
      },
      { value: "gossip", label: "Ask others what might be going on", score: 2 },
    ],
  },
  {
    id: 5,
    question: "Your approach to achieving long-term goals is:",
    category: "Motivation",
    options: [
      {
        value: "sporadic",
        label: "Work hard when motivated, slack when not",
        score: 2,
      },
      {
        value: "consistent",
        label: "Maintain steady effort regardless of mood",
        score: 5,
      },
      {
        value: "external",
        label: "Rely on external pressure and deadlines",
        score: 3,
      },
      {
        value: "flexible",
        label: "Adapt approach based on circumstances",
        score: 4,
      },
    ],
  },
];

const categories = {
  "Self-Awareness": {
    icon: Brain,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  "Emotional Regulation": {
    icon: Heart,
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  "Social Skills": {
    icon: Users,
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  Empathy: { icon: Target, color: "text-purple-500", bgColor: "bg-purple-50" },
  Motivation: { icon: Zap, color: "text-yellow-500", bgColor: "bg-yellow-50" },
};

export default function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [scores, setScores] = useState<Record<string, number>>({});

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerSelect = (value: string) => {
    setAnswers({ ...answers, [currentQ.id]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    const categoryScores: Record<string, { total: number; count: number }> = {};

    questions.forEach((question) => {
      const answer = answers[question.id];
      const selectedOption = question.options.find(
        (opt) => opt.value === answer
      );

      if (selectedOption) {
        if (!categoryScores[question.category]) {
          categoryScores[question.category] = { total: 0, count: 0 };
        }
        categoryScores[question.category].total += selectedOption.score;
        categoryScores[question.category].count += 1;
      }
    });

    const finalScores: Record<string, number> = {};
    Object.keys(categoryScores).forEach((category) => {
      finalScores[category] = Math.round(
        (categoryScores[category].total / categoryScores[category].count) * 20
      );
    });

    setScores(finalScores);
  };

  const getOverallScore = () => {
    const values = Object.values(scores);
    return Math.round(
      values.reduce((sum, score) => sum + score, 0) / values.length
    );
  };

  const getScoreLevel = (score: number) => {
    if (score >= 80)
      return {
        level: "Advanced",
        color: "text-green-600",
        bgColor: "bg-green-100",
      };
    if (score >= 60)
      return {
        level: "Intermediate",
        color: "text-blue-600",
        bgColor: "bg-blue-100",
      };
    if (score >= 40)
      return {
        level: "Developing",
        color: "text-yellow-600",
        bgColor: "bg-yellow-100",
      };
    return { level: "Beginner", color: "text-red-600", bgColor: "bg-red-100" };
  };

  if (isCompleted) {
    const overallScore = getOverallScore();
    const overallLevel = getScoreLevel(overallScore);

    return (
      <div className="flex h-screen bg-background">
        <DashboardSidebar />

        <main className="flex-1 overflow-y-auto lg:ml-0">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mx-auto">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold">Assessment Complete!</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Congratulations on completing your emotional intelligence
                assessment. Here are your personalized results and
                recommendations.
              </p>
            </div>

            {/* Overall Score */}
            <Card className="max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Your EQ Score</CardTitle>
                <div className="space-y-4">
                  <div className="text-6xl font-bold text-blue-600">
                    {overallScore}
                  </div>
                  <Badge
                    className={`${overallLevel.bgColor} ${overallLevel.color} text-lg px-4 py-2`}
                  >
                    {overallLevel.level} Level
                  </Badge>
                  <Progress value={overallScore} className="h-3" />
                </div>
              </CardHeader>
            </Card>

            {/* Category Breakdown */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
              {Object.entries(scores).map(([category, score]) => {
                const level = getScoreLevel(score);
                const categoryInfo =
                  categories[category as keyof typeof categories];
                const IconComponent = categoryInfo.icon;

                return (
                  <Card key={category}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={`p-2 rounded-lg ${categoryInfo.bgColor}`}
                        >
                          <IconComponent
                            className={`h-5 w-5 ${categoryInfo.color}`}
                          />
                        </div>
                        <CardTitle className="text-lg">{category}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="text-3xl font-bold">{score}</div>
                        <Badge variant="secondary" className={level.color}>
                          {level.level}
                        </Badge>
                        <Progress value={score} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Recommendations */}
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle>Personalized Recommendations</CardTitle>
                <CardDescription>
                  Based on your assessment results, here are some areas to focus
                  on
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(scores).map(([category, score]) => {
                    const categoryInfo =
                      categories[category as keyof typeof categories];
                    const IconComponent = categoryInfo.icon;

                    return (
                      <div
                        key={category}
                        className="flex items-start gap-3 p-4 rounded-lg border"
                      >
                        <div
                          className={`p-2 rounded-lg ${categoryInfo.bgColor}`}
                        >
                          <IconComponent
                            className={`h-5 w-5 ${categoryInfo.color}`}
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{category}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {score >= 80
                              ? "Excellent! You're doing great in this area. Keep up the good work!"
                              : score >= 60
                              ? "Good progress! Consider focusing on specific exercises to improve further."
                              : "This is an area for growth. Try our targeted exercises and daily practices."}
                          </p>
                        </div>
                        <Badge
                          variant={score >= 60 ? "default" : "destructive"}
                        >
                          {score}/100
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <Button size="lg">
                <CheckCircle className="h-4 w-4 mr-2" />
                Start Recommended Exercises
              </Button>
              <Button variant="outline" size="lg">
                Retake Assessment
              </Button>
            </div>
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
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">
              Emotional Intelligence Assessment
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              This assessment will help us understand your current emotional
              intelligence level across different areas. Answer honestly for the
              most accurate results.
            </p>
          </div>

          {/* Progress */}
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Question */}
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`p-2 rounded-lg ${
                    categories[currentQ.category as keyof typeof categories]
                      .bgColor
                  }`}
                >
                  {React.createElement(
                    categories[currentQ.category as keyof typeof categories]
                      .icon,
                    {
                      className: `h-5 w-5 ${
                        categories[currentQ.category as keyof typeof categories]
                          .color
                      }`,
                    }
                  )}
                </div>
                <Badge variant="outline">{currentQ.category}</Badge>
              </div>
              <CardTitle className="text-xl">{currentQ.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers[currentQ.id] || ""}
                onValueChange={handleAnswerSelect}
                className="space-y-3"
              >
                {currentQ.options.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent cursor-pointer"
                  >
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label
                      htmlFor={option.value}
                      className="flex-1 cursor-pointer"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between max-w-3xl mx-auto">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <Button onClick={handleNext} disabled={!answers[currentQ.id]}>
              {currentQuestion === questions.length - 1 ? (
                <>
                  Complete Assessment
                  <CheckCircle className="h-4 w-4 ml-2" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
