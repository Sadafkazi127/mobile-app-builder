import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function NotificationSettings() {
  return (
    <AppLayout title="Notifications" showBottomNav={false}>
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" size="sm" className="mb-4" asChild>
          <Link to="/profile">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>
              Configure how and when you receive reminders
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="push" className="flex flex-col gap-1">
                <span>Push Notifications</span>
                <span className="text-xs text-muted-foreground font-normal">
                  Receive habit reminders on your device
                </span>
              </Label>
              <Switch id="push" />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="achievements" className="flex flex-col gap-1">
                <span>Achievement Alerts</span>
                <span className="text-xs text-muted-foreground font-normal">
                  Get notified when you hit milestones
                </span>
              </Label>
              <Switch id="achievements" />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="weekly" className="flex flex-col gap-1">
                <span>Weekly Summary</span>
                <span className="text-xs text-muted-foreground font-normal">
                  Receive a weekly progress report
                </span>
              </Label>
              <Switch id="weekly" />
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}