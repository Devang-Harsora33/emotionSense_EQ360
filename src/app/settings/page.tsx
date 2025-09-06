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
// import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  // Settings,
  Bell,
  Shield,
  Palette,
  Download,
  Upload,
  Save,
  User,
  Globe,
  Moon,
  Sun,
  Monitor,
  // Volume2,
  // VolumeX,
  Smartphone,
  Mail,
  Lock,
  Database,
  Trash2,
  AlertTriangle,
} from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: {
      dailyReminders: true,
      weeklyReports: true,
      exerciseReminders: false,
      achievementAlerts: true,
      emailNotifications: true,
      pushNotifications: false,
    },
    privacy: {
      shareProgress: false,
      allowAnalytics: true,
      dataRetention: "1 year",
      profileVisibility: "private",
    },
    appearance: {
      theme: "system",
      language: "English",
      fontSize: "medium",
      animations: true,
    },
    account: {
      email: "john.doe@example.com",
      timezone: "PST",
      dateFormat: "MM/DD/YYYY",
      timeFormat: "12-hour",
    },
  });

  const handleSettingChange = (
    category: string,
    key: string,
    value: boolean | string
  ) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }));
  };

  const handleSaveSettings = () => {
    // In a real app, this would save to your backend
    console.log("Settings saved:", settings);
  };

  const getThemeIcon = (theme: string) => {
    switch (theme) {
      case "light":
        return Sun;
      case "dark":
        return Moon;
      case "system":
        return Monitor;
      default:
        return Monitor;
    }
  };

  // const ThemeIcon = getThemeIcon(settings.appearance.theme);

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto lg:ml-0">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
              <p className="text-muted-foreground">
                Customize your emotional intelligence platform experience
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={handleSaveSettings}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>

          <Tabs defaultValue="notifications" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="data">Data</TabsTrigger>
            </TabsList>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notification Preferences
                    </CardTitle>
                    <CardDescription>
                      Choose what notifications you&apos;d like to receive
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="daily-reminders">Daily Reminders</Label>
                        <p className="text-sm text-muted-foreground">
                          Get reminded to log your emotions daily
                        </p>
                      </div>
                      <Switch
                        id="daily-reminders"
                        checked={settings.notifications.dailyReminders}
                        onCheckedChange={(checked) =>
                          handleSettingChange(
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
                        checked={settings.notifications.weeklyReports}
                        onCheckedChange={(checked) =>
                          handleSettingChange(
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
                        checked={settings.notifications.exerciseReminders}
                        onCheckedChange={(checked) =>
                          handleSettingChange(
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
                        checked={settings.notifications.achievementAlerts}
                        onCheckedChange={(checked) =>
                          handleSettingChange(
                            "notifications",
                            "achievementAlerts",
                            checked
                          )
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5" />
                      Delivery Methods
                    </CardTitle>
                    <CardDescription>
                      How you&apos;d like to receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-notifications">
                          Email Notifications
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={settings.notifications.emailNotifications}
                        onCheckedChange={(checked) =>
                          handleSettingChange(
                            "notifications",
                            "emailNotifications",
                            checked
                          )
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="push-notifications">
                          Push Notifications
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Receive push notifications on your device
                        </p>
                      </div>
                      <Switch
                        id="push-notifications"
                        checked={settings.notifications.pushNotifications}
                        onCheckedChange={(checked) =>
                          handleSettingChange(
                            "notifications",
                            "pushNotifications",
                            checked
                          )
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Appearance Tab */}
            <TabsContent value="appearance" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5" />
                      Theme & Display
                    </CardTitle>
                    <CardDescription>
                      Customize how the app looks and feels
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="theme">Theme</Label>
                      <div className="flex gap-2">
                        {[
                          { value: "light", label: "Light", icon: Sun },
                          { value: "dark", label: "Dark", icon: Moon },
                          { value: "system", label: "System", icon: Monitor },
                        ].map((theme) => {
                          const IconComponent = theme.icon;
                          return (
                            <Button
                              key={theme.value}
                              variant={
                                settings.appearance.theme === theme.value
                                  ? "default"
                                  : "outline"
                              }
                              onClick={() =>
                                handleSettingChange(
                                  "appearance",
                                  "theme",
                                  theme.value
                                )
                              }
                              className="flex items-center gap-2"
                            >
                              <IconComponent className="h-4 w-4" />
                              {theme.label}
                            </Button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <select
                        id="language"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={settings.appearance.language}
                        onChange={(e) =>
                          handleSettingChange(
                            "appearance",
                            "language",
                            e.target.value
                          )
                        }
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="font-size">Font Size</Label>
                      <select
                        id="font-size"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={settings.appearance.fontSize}
                        onChange={(e) =>
                          handleSettingChange(
                            "appearance",
                            "fontSize",
                            e.target.value
                          )
                        }
                      >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="animations">Animations</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable smooth transitions and animations
                        </p>
                      </div>
                      <Switch
                        id="animations"
                        checked={settings.appearance.animations}
                        onCheckedChange={(checked) =>
                          handleSettingChange(
                            "appearance",
                            "animations",
                            checked
                          )
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Regional Settings
                    </CardTitle>
                    <CardDescription>
                      Date, time, and location preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <select
                        id="timezone"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={settings.account.timezone}
                        onChange={(e) =>
                          handleSettingChange(
                            "account",
                            "timezone",
                            e.target.value
                          )
                        }
                      >
                        <option value="PST">Pacific Standard Time (PST)</option>
                        <option value="EST">Eastern Standard Time (EST)</option>
                        <option value="CST">Central Standard Time (CST)</option>
                        <option value="MST">
                          Mountain Standard Time (MST)
                        </option>
                        <option value="UTC">UTC</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date-format">Date Format</Label>
                      <select
                        id="date-format"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={settings.account.dateFormat}
                        onChange={(e) =>
                          handleSettingChange(
                            "account",
                            "dateFormat",
                            e.target.value
                          )
                        }
                      >
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time-format">Time Format</Label>
                      <select
                        id="time-format"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={settings.account.timeFormat}
                        onChange={(e) =>
                          handleSettingChange(
                            "account",
                            "timeFormat",
                            e.target.value
                          )
                        }
                      >
                        <option value="12-hour">12-hour (AM/PM)</option>
                        <option value="24-hour">24-hour</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Privacy Tab */}
            <TabsContent value="privacy" className="space-y-6">
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
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="share-progress">Share Progress</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow sharing your progress with others
                        </p>
                      </div>
                      <Switch
                        id="share-progress"
                        checked={settings.privacy.shareProgress}
                        onCheckedChange={(checked) =>
                          handleSettingChange(
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
                        checked={settings.privacy.allowAnalytics}
                        onCheckedChange={(checked) =>
                          handleSettingChange(
                            "privacy",
                            "allowAnalytics",
                            checked
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="data-retention">Data Retention</Label>
                      <select
                        id="data-retention"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={settings.privacy.dataRetention}
                        onChange={(e) =>
                          handleSettingChange(
                            "privacy",
                            "dataRetention",
                            e.target.value
                          )
                        }
                      >
                        <option value="6 months">6 months</option>
                        <option value="1 year">1 year</option>
                        <option value="2 years">2 years</option>
                        <option value="indefinite">Indefinite</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="profile-visibility">
                        Profile Visibility
                      </Label>
                      <select
                        id="profile-visibility"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={settings.privacy.profileVisibility}
                        onChange={(e) =>
                          handleSettingChange(
                            "privacy",
                            "profileVisibility",
                            e.target.value
                          )
                        }
                      >
                        <option value="private">Private</option>
                        <option value="friends">Friends Only</option>
                        <option value="public">Public</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="h-5 w-5" />
                      Security
                    </CardTitle>
                    <CardDescription>
                      Manage your account security settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full">
                      <Lock className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>

                    <Button variant="outline" className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Update Email
                    </Button>

                    <Button variant="outline" className="w-full">
                      <Shield className="h-4 w-4 mr-2" />
                      Two-Factor Authentication
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Account Tab */}
            <TabsContent value="account" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Account Information
                  </CardTitle>
                  <CardDescription>
                    Manage your account details and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={settings.account.email}
                        onChange={(e) =>
                          handleSettingChange(
                            "account",
                            "email",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timezone-account">Timezone</Label>
                      <select
                        id="timezone-account"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={settings.account.timezone}
                        onChange={(e) =>
                          handleSettingChange(
                            "account",
                            "timezone",
                            e.target.value
                          )
                        }
                      >
                        <option value="PST">Pacific Standard Time (PST)</option>
                        <option value="EST">Eastern Standard Time (EST)</option>
                        <option value="CST">Central Standard Time (CST)</option>
                        <option value="MST">
                          Mountain Standard Time (MST)
                        </option>
                        <option value="UTC">UTC</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Data Tab */}
            <TabsContent value="data" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
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

                    <Button variant="outline" className="w-full">
                      <Database className="h-4 w-4 mr-2" />
                      Clear All Data
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Danger Zone
                    </CardTitle>
                    <CardDescription>Irreversible actions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="destructive" className="w-full">
                      <Trash2 className="h-4 w-4 mr-2" />
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
