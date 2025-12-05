import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Calendar } from "lucide-react";
import { format } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/layout/AppLayout";
import { useHabits } from "@/hooks/useHabits";
import { useHabitLogs } from "@/hooks/useHabitLogs";
import { TodayHabitCard } from "@/components/habits/TodayHabitCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { user } = useAuth();
  const { habits, loading: habitsLoading } = useHabits();
  const { todayLogs, logCompletion, undoLog, isCompletedToday, getTodayLogForHabit } = useHabitLogs();
  const [loadingHabitId, setLoadingHabitId] = useState<string | null>(null);

  const firstName = user?.user_metadata?.full_name?.split(" ")[0] || "there";
  const today = new Date();

  // Filter habits that should be done today based on frequency
  const todaysHabits = habits.filter((habit) => {
    if (habit.frequency === "daily") return true;
    if (habit.frequency === "weekly") {
      const dayOfWeek = today.getDay();
      return habit.frequency_days?.includes(dayOfWeek) ?? false;
    }
    if (habit.frequency === "custom") {
      const dayOfWeek = today.getDay();
      return habit.frequency_days?.includes(dayOfWeek) ?? false;
    }
    return true;
  });

  const completedCount = todaysHabits.filter((h) => isCompletedToday(h.id)).length;
  const totalCount = todaysHabits.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const handleComplete = async (habitId: string) => {
    setLoadingHabitId(habitId);
    await logCompletion(habitId);
    setLoadingHabitId(null);
  };

  const handleUndo = async (habitId: string) => {
    const log = getTodayLogForHabit(habitId);
    if (log) {
      setLoadingHabitId(habitId);
      await undoLog(log.id);
      setLoadingHabitId(null);
    }
  };

  return (
    <AppLayout title="Dashboard">
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Header with date and greeting */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Calendar className="h-4 w-4" />
            <span>{format(today, "EEEE, MMMM d")}</span>
          </div>
          <h2 className="text-2xl font-semibold text-foreground">
            Hello, {firstName}!
          </h2>
        </div>

        {/* Progress Card */}
        <div className="bg-card rounded-lg border p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Today's Progress</span>
            <span className="text-sm text-muted-foreground">
              {completedCount}/{totalCount} completed
            </span>
          </div>
          <Progress value={progressPercent} className="h-2" />
          {progressPercent === 100 && totalCount > 0 && (
            <p className="text-sm text-primary font-medium">
              🎉 All habits completed for today!
            </p>
          )}
        </div>

        {/* Today's Habits */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Today's Habits</h3>
            <Button asChild variant="ghost" size="sm">
              <Link to="/habits/new">
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Link>
            </Button>
          </div>

          {habitsLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          ) : todaysHabits.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-lg border">
              <p className="text-muted-foreground mb-4">
                No habits scheduled for today.
              </p>
              <Button asChild>
                <Link to="/habits/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Habit
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {todaysHabits.map((habit) => (
                <TodayHabitCard
                  key={habit.id}
                  habit={habit}
                  isCompleted={isCompletedToday(habit.id)}
                  onComplete={() => handleComplete(habit.id)}
                  onUndo={() => handleUndo(habit.id)}
                  isLoading={loadingHabitId === habit.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
