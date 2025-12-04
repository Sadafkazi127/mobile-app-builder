import { useAuth } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/layout/AppLayout";

export default function Dashboard() {
  const { user } = useAuth();
  const firstName = user?.user_metadata?.full_name?.split(" ")[0] || "there";

  return (
    <AppLayout title="Dashboard">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Welcome, {firstName}!
          </h2>
          <p className="text-muted-foreground">
            Your daily habits will appear here.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}