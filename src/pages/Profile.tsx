import { Settings, Bell, Download, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Profile() {
  return (
    <AppLayout title="Profile">
      <div className="container mx-auto px-4 py-6">
        {/* Profile Header */}
        <Card className="mb-6 shadow-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-semibold text-primary">U</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">User</h2>
                <p className="text-sm text-muted-foreground">user@example.com</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Menu */}
        <Card className="shadow-card">
          <CardContent className="p-0">
            <MenuItem icon={Bell} label="Notification Settings" href="/settings/notifications" />
            <Separator />
            <MenuItem icon={Download} label="Export Data" />
            <Separator />
            <MenuItem icon={Settings} label="Account Settings" />
            <Separator />
            <MenuItem icon={LogOut} label="Sign Out" variant="destructive" />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

function MenuItem({
  icon: Icon,
  label,
  href,
  variant,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href?: string;
  variant?: "destructive";
}) {
  const content = (
    <div className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors cursor-pointer">
      <Icon className={`h-5 w-5 ${variant === "destructive" ? "text-destructive" : "text-muted-foreground"}`} />
      <span className={`text-sm ${variant === "destructive" ? "text-destructive" : "text-foreground"}`}>
        {label}
      </span>
    </div>
  );

  if (href) {
    return <Link to={href}>{content}</Link>;
  }

  return content;
}