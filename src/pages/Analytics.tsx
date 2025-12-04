import { AppLayout } from "@/components/layout/AppLayout";

export default function Analytics() {
  return (
    <AppLayout title="Analytics">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Your Progress
          </h2>
          <p className="text-muted-foreground">
            Analytics and insights will appear here once you start tracking habits.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}