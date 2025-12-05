import { useState } from "react";
import { Plus, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { HabitCard } from "@/components/habits/HabitCard";
import { useHabits } from "@/hooks/useHabits";

export default function Habits() {
  const { habits, loading, fetchHabits, archiveHabit, restoreHabit, deleteHabit } = useHabits();
  const [showArchived, setShowArchived] = useState(false);

  const activeHabits = habits.filter((h) => h.status === "active");
  const archivedHabits = habits.filter((h) => h.status === "archived");

  const handleTabChange = (value: string) => {
    const includeArchived = value === "archived";
    setShowArchived(includeArchived);
    fetchHabits(true);
  };

  return (
    <AppLayout title="My Habits">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <Tabs defaultValue="active" onValueChange={handleTabChange} className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="archived">Archived</TabsTrigger>
              </TabsList>
              <Button className="gradient-primary border-0" size="sm" asChild>
                <Link to="/habits/new">
                  <Plus className="mr-2 h-4 w-4" />
                  New Habit
                </Link>
              </Button>
            </div>

            {loading ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-32 rounded-lg" />
                ))}
              </div>
            ) : (
              <>
                <TabsContent value="active" className="mt-0">
                  {activeHabits.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground mb-4">
                        No active habits yet. Create your first habit to get started!
                      </p>
                      <Button className="gradient-primary border-0" asChild>
                        <Link to="/habits/new">
                          <Plus className="mr-2 h-4 w-4" />
                          Create Habit
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {activeHabits.map((habit) => (
                        <HabitCard
                          key={habit.id}
                          habit={habit}
                          onArchive={archiveHabit}
                          onRestore={restoreHabit}
                          onDelete={deleteHabit}
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="archived" className="mt-0">
                  {archivedHabits.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">
                        No archived habits.
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {archivedHabits.map((habit) => (
                        <HabitCard
                          key={habit.id}
                          habit={habit}
                          onArchive={archiveHabit}
                          onRestore={restoreHabit}
                          onDelete={deleteHabit}
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
}
