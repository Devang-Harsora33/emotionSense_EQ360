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
import { Textarea } from "@/components/ui/textarea";
import {
  User as UserIcon,
  Mail,
  Briefcase,
  Heart,
  Brain,
  Users,
  Target,
  Zap,
  CheckCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser, setCurrentUser } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    profession: "",
    location: "",
    bio: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Validate password match
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      // Register user
      const newUser = registerUser({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        age: formData.age,
        profession: formData.profession,
        location: formData.location,
        bio: formData.bio,
      });

      // Set as current user and cache
      setCurrentUser(newUser);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.email &&
      formData.phone &&
      formData.age &&
      formData.profession &&
      formData.location &&
      formData.password &&
      formData.confirmPassword &&
      formData.password === formData.confirmPassword
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
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
            Join thousands of people improving their emotional intelligence
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Side - Features */}
          <div className="space-y-6">
            <Card className="card-hover fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-blue-500" />
                  Why Join Our Platform?
                </CardTitle>
                <CardDescription>
                  Discover the benefits of emotional intelligence development
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Target className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Personalized Goals</h4>
                    <p className="text-sm text-muted-foreground">
                      Set and track your emotional intelligence development
                      goals
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <Users className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Expert Guidance</h4>
                    <p className="text-sm text-muted-foreground">
                      Access to evidence-based exercises and assessments
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Zap className="h-4 w-4 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Real-time Insights</h4>
                    <p className="text-sm text-muted-foreground">
                      Track your progress with detailed analytics and reports
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover fade-in">
              <CardHeader>
                <CardTitle>What You&apos;ll Get</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">EQ Assessment & Scoring</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Daily Emotional Tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Personalized Exercises</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Progress Analytics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Goal Setting & Tracking</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Registration Form */}
          <Card className="card-hover fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="h-5 w-5" />
                Create Your Account
              </CardTitle>
              <CardDescription>
                Fill in your details to start your emotional intelligence
                journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <UserIcon className="h-4 w-4" />
                    Personal Information
                  </h3>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="age">Age *</Label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        placeholder="25"
                        value={formData.age}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio (Optional)</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      placeholder="Tell us a bit about yourself..."
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Contact Information
                  </h3>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
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
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Professional Information
                  </h3>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="profession">Profession *</Label>
                      <Input
                        id="profession"
                        name="profession"
                        placeholder="Software Engineer"
                        value={formData.profession}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        name="location"
                        placeholder="San Francisco, CA"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Security */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Security
                  </h3>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Password *</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
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

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">
                        Confirm Password *
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="space-y-4">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!isFormValid() || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <UserIcon className="mr-2 h-4 w-4" />
                        Create Account
                      </>
                    )}
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Already have an account?{" "}
                      <Link
                        href="/login"
                        className="text-blue-600 hover:underline"
                      >
                        Sign in here
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
