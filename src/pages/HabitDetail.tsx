import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Trash2, Archive, RotateCcw } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { HabitForm } from "@/components/habits/HabitForm";
import { useHabits, type Habit } from "@/hooks/useHabits";

export default function HabitDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getHabit, updateHabit, deleteHabit, archiveHabit, restoreHabit } = useHabits();
  
  const [habit, setHabit] = useState<Habit | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const loadHabit = async () => {
      if (!id) return;
      setLoading(true);
      const data = await getHabit(id);
      setHabit(data);
      setLoading(false);
    };
    loadHabit();
  }, [id]);

  const handleSubmit = async (data: any) => {
    if (!id) return;
    setIsSubmitting(true);
    const success = await updateHabit(id, data);
    setIsSubmitting(false);
    if (success) {
      navigate("/habits");
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    setIsDeleting(true);
    const success = await deleteHabit(id);
    setIsDeleting(false);
    if (success) {
      navigate("/habits");
    }
  };

  const handleArchiveToggle = async () => {
    if (!id || !habit) return;
    if (habit.status === "active") {
      await archiveHabit(id);
    } else {
      await restoreHabit(id);
    }
    navigate("/habits");
  };

  if (loading) {
    return (
      <AppLayout title="Habit Details" showBottomNav={false}>
        <div className="container mx-auto px-4 py-6 max-w-lg">
          <Skeleton className="h-8 w-24 mb-4" />
          <Skeleton className="h-[500px] rounded-lg" />
        </div>
      </AppLayout>
    );
  }

  if (!habit) {
    return (
      <AppLayout title="Habit Not Found" showBottomNav={false}>
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-muted-foreground mb-4">This habit could not be found.</p>
          <Button asChild>
            <Link to="/habits">Back to Habits</Link>
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Edit Habit" showBottomNav={false}>
      <div className="container mx-auto px-4 py-6 max-w-lg">
        <Button variant="ghost" size="sm" className="mb-4" asChild>
          <Link to="/habits">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Edit Habit</CardTitle>
          </CardHeader>
          <CardContent>
            <HabitForm
              habit={habit}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Habit Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button
              variant="outline"
              onClick={handleArchiveToggle}
              className="justify-start"
            >
              {habit.status === "active" ? (
                <>
                  <Archive className="mr-2 h-4 w-4" />
                  Archive Habit
                </>
              ) : (
                <>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Restore Habit
                </>
              )}
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="justify-start text-destructive hover:text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Habit
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete habit?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete "{habit.name}" and all its logged data.
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
