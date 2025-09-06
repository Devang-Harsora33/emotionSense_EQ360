"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { isAuthenticated } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Brain,
  Users,
  Target,
  Zap,
  ArrowRight,
  Star,
  TrendingUp,
  Award,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // If user is already authenticated, redirect to dashboard
    if (isAuthenticated()) {
      router.push("/dashboard");
    }
  }, [router]);
  const features = [
    {
      icon: Brain,
      title: "EQ Assessment",
      description:
        "Comprehensive emotional intelligence evaluation with personalized insights",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: Heart,
      title: "Emotional Tracking",
      description:
        "Daily mood logging and pattern recognition for better self-awareness",
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      icon: Target,
      title: "Goal Setting",
      description:
        "Set and track personalized emotional intelligence development goals",
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      icon: Users,
      title: "Expert Exercises",
      description:
        "Evidence-based exercises designed by emotional intelligence experts",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      icon: TrendingUp,
      title: "Progress Analytics",
      description:
        "Detailed insights and progress tracking with actionable recommendations",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      icon: Award,
      title: "Achievement System",
      description:
        "Gamified learning with badges and milestones to keep you motivated",
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
    },
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "95%", label: "Satisfaction Rate" },
    { number: "50+", label: "Expert Exercises" },
    { number: "24/7", label: "Support Available" },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Manager",
      content:
        "This platform transformed how I understand and manage my emotions. The personalized insights are incredible!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      content:
        "The daily tracking feature helped me identify patterns I never noticed before. Highly recommended!",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Teacher",
      content:
        "The exercises are practical and easy to follow. I've seen real improvement in my emotional intelligence.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Emotional Intelligence Platform
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Master Your{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Emotional Intelligence
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Develop self-awareness, emotional regulation, and interpersonal
              skills with our personalized platform designed by experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  <Zap className="mr-2 h-5 w-5" />
                  Start Your Journey
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Everything You Need to Grow
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools and insights you
              need to develop your emotional intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="card-hover fade-in">
                  <CardHeader>
                    <div
                      className={`p-3 rounded-lg ${feature.bgColor} w-fit mb-4`}
                    >
                      <IconComponent className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of people who have transformed their emotional
              intelligence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-hover fade-in">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Emotional Intelligence?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join our community and start your journey towards better
              self-awareness, emotional regulation, and stronger relationships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  <Heart className="mr-2 h-5 w-5" />
                  Get Started Free
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Already have an account? Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="font-medium">
                Emotional Intelligence Platform
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 Emotional Intelligence Platform. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
