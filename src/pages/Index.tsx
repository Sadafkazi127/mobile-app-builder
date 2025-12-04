import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, BarChart3, Bell, Zap } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-5" />
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <div className="mx-auto mb-6 h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
              <span className="text-primary-foreground font-bold text-2xl">FT</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Build Better{" "}
              <span className="text-primary">Habits</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              Track your habits, visualize your progress, and achieve your goals with FitTrack.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" className="gradient-primary border-0" asChild>
                <Link to="/register">Get Started Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-center text-2xl font-semibold text-foreground mb-12">
          Everything you need to build lasting habits
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={CheckCircle2}
            title="Easy Tracking"
            description="One-tap logging makes tracking your habits effortless."
          />
          <FeatureCard
            icon={BarChart3}
            title="Visual Analytics"
            description="See your progress with beautiful charts and insights."
          />
          <FeatureCard
            icon={Bell}
            title="Smart Reminders"
            description="Never miss a habit with customizable notifications."
          />
          <FeatureCard
            icon={Zap}
            title="Streak Tracking"
            description="Stay motivated with streak counters and achievements."
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 py-12 text-center">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Ready to transform your habits?
          </h3>
          <Button size="lg" className="gradient-primary border-0" asChild>
            <Link to="/register">Start Your Journey</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-lg">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="mb-2 font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}