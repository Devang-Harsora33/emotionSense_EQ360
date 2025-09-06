"use client";

import { useState, useEffect } from "react";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { getCurrentUser, updateUserData, type User } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User as UserIcon,
  Bell,
  Shield,
  Palette,
  Download,
  Upload,
  Save,
  Edit,
  Camera,
  Award,
  Target,
  Calendar,
  TrendingUp,
} from "lucide-react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
    location: "",
    timezone: "PST",
    avatar: "/placeholder-avatar.jpg",
  });

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    if (currentUser) {
      setProfile({
        name: currentUser.name,
        email: currentUser.email,
        bio: currentUser.bio || "",
        location: currentUser.location,
        timezone: "PST",
        avatar: "/placeholder-avatar.jpg",
      });
    }
  }, []);

  const [preferences, setPreferences] = useState({
    notifications: {
      dailyReminders: true,
      weeklyReports: true,
      exerciseReminders: false,
      achievementAlerts: true,
    },
    privacy: {
      shareProgress: false,
      allowAnalytics: true,
      dataRetention: "1 year",
    },
    appearance: {
      theme: "system",
      language: "English",
      fontSize: "medium",
    },
  });

  const handleSaveProfile = () => {
    if (!user) return;

    updateUserData(user.id, {
      name: profile.name,
      email: profile.email,
      bio: profile.bio,
      location: profile.location,
    });

    setIsEditing(false);
    // Refresh user data
    const updatedUser = getCurrentUser();
    setUser(updatedUser);
  };

  const achievements = [
    {
      title: "First Steps",
      description: "Completed your first emotional intelligence assessment",
      icon: Target,
      earned: true,
      date: "2024-01-15",
    },
    {
      title: "Consistent Tracker",
      description: "Logged emotions for 7 consecutive days",
      icon: Calendar,
      earned: true,
      date: "2024-01-22",
    },
    {
      title: "Mindful Master",
      description: "Completed 10 mindfulness exercises",
      icon: Award,
      earned: true,
      date: "2024-02-01",
    },
    {
      title: "EQ Expert",
      description: "Achieved an EQ score above 80",
      icon: TrendingUp,
      earned: false,
      date: null,
    },
  ];

  const handlePreferenceChange = (
    category: string,
    key: string,
    value: boolean | string
  ) => {
    setPreferences((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }));
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
                Profile & Settings
              </h1>
              <p className="text-muted-foreground">
                Manage your account and personalize your experience
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Award className="h-3 w-3" />
                {achievements.filter((a) => a.earned).length} achievements
              </Badge>
            </div>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="data">Data & Privacy</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Profile Info */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <UserIcon className="h-5 w-5" />
                        Personal Information
                      </CardTitle>
                      <Button
                        variant={isEditing ? "default" : "outline"}
                        onClick={() =>
                          isEditing ? handleSaveProfile() : setIsEditing(true)
                        }
                      >
                        {isEditing ? (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        ) : (
                          <>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Profile
                          </>
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Avatar */}
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar className="h-20 w-20">
                          <AvatarImage
                            src={profile.avatar}
                            alt={profile.name}
                          />
                          <AvatarFallback className="text-lg">
                            {profile.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {isEditing && (
                          <Button
                            size="icon"
                            className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full"
                          >
                            <Camera className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">
                          {profile.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Member since January 2024
                        </p>
                        <Badge variant="secondary" className="mt-1">
                          Advanced Level
                        </Badge>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) =>
                            setProfile((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) =>
                            setProfile((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={profile.location}
                          onChange={(e) =>
                            setProfile((prev) => ({
                              ...prev,
                              location: e.target.value,
                            }))
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Input
                          id="timezone"
                          value={profile.timezone}
                          onChange={(e) =>
                            setProfile((prev) => ({
                              ...prev,
                              timezone: e.target.value,
                            }))
                          }
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profile.bio}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            bio: e.target.value,
                          }))
                        }
                        disabled={!isEditing}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Your Stats</CardTitle>
                    <CardDescription>
                      Overview of your emotional intelligence journey
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-4 rounded-lg bg-blue-50">
                      <div className="text-2xl font-bold text-blue-600">80</div>
                      <div className="text-sm text-blue-600">
                        Current EQ Score
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Days Active</span>
                        <span className="text-sm font-medium">45</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Emotions Logged</span>
                        <span className="text-sm font-medium">127</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Exercises Completed</span>
                        <span className="text-sm font-medium">23</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Current Streak</span>
                        <span className="text-sm font-medium">7 days</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Notifications */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notifications
                    </CardTitle>
                    <CardDescription>
                      Choose what notifications you&apos;d like to receive
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="daily-reminders">Daily Reminders</Label>
                        <p className="text-sm text-muted-foreground">
                          Get reminded to log your emotions
                        </p>
                      </div>
                      <Switch
                        id="daily-reminders"
                        checked={preferences.notifications.dailyReminders}
                        onCheckedChange={(checked) =>
                          handlePreferenceChange(
                            "notifications",
                            "dailyReminders",
                            checked
                          )
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="weekly-reports">Weekly Reports</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive weekly progress summaries
                        </p>
                      </div>
                      <Switch
                        id="weekly-reports"
                        checked={preferences.notifications.weeklyReports}
                        onCheckedChange={(checked) =>
                          handlePreferenceChange(
                            "notifications",
                            "weeklyReports",
                            checked
                          )
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="exercise-reminders">
                          Exercise Reminders
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified about new exercises
                        </p>
                      </div>
                      <Switch
                        id="exercise-reminders"
                        checked={preferences.notifications.exerciseReminders}
                        onCheckedChange={(checked) =>
                          handlePreferenceChange(
                            "notifications",
                            "exerciseReminders",
                            checked
                          )
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="achievement-alerts">
                          Achievement Alerts
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Celebrate your milestones
                        </p>
                      </div>
                      <Switch
                        id="achievement-alerts"
                        checked={preferences.notifications.achievementAlerts}
                        onCheckedChange={(checked) =>
                          handlePreferenceChange(
                            "notifications",
                            "achievementAlerts",
                            checked
                          )
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Appearance */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5" />
                      Appearance
                    </CardTitle>
                    <CardDescription>
                      Customize how the app looks and feels
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="theme">Theme</Label>
                      <Input
                        id="theme"
                        value={preferences.appearance.theme}
                        onChange={(e) =>
                          handlePreferenceChange(
                            "appearance",
                            "theme",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Input
                        id="language"
                        value={preferences.appearance.language}
                        onChange={(e) =>
                          handlePreferenceChange(
                            "appearance",
                            "language",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="font-size">Font Size</Label>
                      <Input
                        id="font-size"
                        value={preferences.appearance.fontSize}
                        onChange={(e) =>
                          handlePreferenceChange(
                            "appearance",
                            "fontSize",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Your Achievements
                  </CardTitle>
                  <CardDescription>
                    Celebrate your emotional intelligence milestones
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {achievements.map((achievement, index) => {
                      const IconComponent = achievement.icon;
                      return (
                        <div
                          key={index}
                          className={`flex items-start gap-4 p-4 rounded-lg border ${
                            achievement.earned
                              ? "border-green-200 bg-green-50"
                              : "border-gray-200"
                          }`}
                        >
                          <div
                            className={`p-3 rounded-lg ${
                              achievement.earned
                                ? "bg-green-100"
                                : "bg-gray-100"
                            }`}
                          >
                            <IconComponent
                              className={`h-6 w-6 ${
                                achievement.earned
                                  ? "text-green-600"
                                  : "text-gray-400"
                              }`}
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{achievement.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {achievement.description}
                            </p>
                            {achievement.earned && achievement.date && (
                              <p className="text-xs text-green-600 mt-2">
                                Earned on{" "}
                                {new Date(
                                  achievement.date
                                ).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                          {achievement.earned && (
                            <Badge variant="default" className="bg-green-600">
                              Earned
                            </Badge>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Data & Privacy Tab */}
            <TabsContent value="data" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Privacy Settings
                    </CardTitle>
                    <CardDescription>
                      Control how your data is used and shared
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="share-progress">Share Progress</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow sharing your progress with others
                        </p>
                      </div>
                      <Switch
                        id="share-progress"
                        checked={preferences.privacy.shareProgress}
                        onCheckedChange={(checked) =>
                          handlePreferenceChange(
                            "privacy",
                            "shareProgress",
                            checked
                          )
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="allow-analytics">Allow Analytics</Label>
                        <p className="text-sm text-muted-foreground">
                          Help improve the app with anonymous usage data
                        </p>
                      </div>
                      <Switch
                        id="allow-analytics"
                        checked={preferences.privacy.allowAnalytics}
                        onCheckedChange={(checked) =>
                          handlePreferenceChange(
                            "privacy",
                            "allowAnalytics",
                            checked
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="data-retention">Data Retention</Label>
                      <Input
                        id="data-retention"
                        value={preferences.privacy.dataRetention}
                        onChange={(e) =>
                          handlePreferenceChange(
                            "privacy",
                            "dataRetention",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="h-5 w-5" />
                      Data Management
                    </CardTitle>
                    <CardDescription>
                      Export or delete your data
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Export My Data
                    </Button>

                    <Button variant="outline" className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Import Data
                    </Button>

                    <Button variant="destructive" className="w-full">
                      Delete Account
                    </Button>
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
