"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  Heart,
  Brain,
  Users,
  Target,
  Zap,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser, setCurrentUser } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Login user
      const user = loginUser(formData.email, formData.password);

      // Set as current user and cache
      setCurrentUser(user);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    return formData.email && formData.password;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Emotional Intelligence Platform
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Welcome back! Continue your emotional intelligence journey
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Side - Login Form */}
          <Card className="card-hover fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Sign In to Your Account
              </CardTitle>
              <CardDescription>
                Enter your credentials to access your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      id="remember"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <Label htmlFor="remember" className="text-sm">
                      Remember me
                    </Label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={!isFormValid() || isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Sign In
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/register"
                      className="text-blue-600 hover:underline"
                    >
                      Create one here
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Right Side - Features & Benefits */}
          <div className="space-y-6">
            <Card className="card-hover fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-blue-500" />
                  Your Emotional Intelligence Journey
                </CardTitle>
                <CardDescription>
                  Track your progress and continue growing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Target className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Personalized Dashboard</h4>
                    <p className="text-sm text-muted-foreground">
                      View your EQ score, progress, and personalized
                      recommendations
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <Users className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Daily Tracking</h4>
                    <p className="text-sm text-muted-foreground">
                      Log your emotions and track patterns over time
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Zap className="h-4 w-4 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Smart Insights</h4>
                    <p className="text-sm text-muted-foreground">
                      Get AI-powered insights and recommendations
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover fade-in">
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
                <CardDescription>
                  Your emotional intelligence progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">78</div>
                    <div className="text-sm text-muted-foreground">
                      EQ Score
                    </div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">15</div>
                    <div className="text-sm text-muted-foreground">
                      Days Active
                    </div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">42</div>
                    <div className="text-sm text-muted-foreground">
                      Emotions Logged
                    </div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">8</div>
                    <div className="text-sm text-muted-foreground">
                      Exercises Done
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover fade-in">
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-50 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-yellow-500" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">7-Day Streak</p>
                      <p className="text-xs text-muted-foreground">
                        Daily emotional tracking
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">EQ Assessment</p>
                      <p className="text-xs text-muted-foreground">
                        Completed this month
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Mindfulness Goal</p>
                      <p className="text-xs text-muted-foreground">
                        75% complete
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
