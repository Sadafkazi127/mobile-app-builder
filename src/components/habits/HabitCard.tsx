import { useState } from "react";
import { Link } from "react-router-dom";
import { MoreVertical, Pencil, Archive, Trash2, RotateCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Habit } from "@/hooks/useHabits";

const CATEGORY_LABELS: Record<string, string> = {
  health: "Health",
  fitness: "Fitness",
  productivity: "Productivity",
  learning: "Learning",
  mindfulness: "Mindfulness",
  social: "Social",
  finance: "Finance",
  other: "Other",
};

interface HabitCardProps {
  habit: Habit;
  onArchive: (id: string) => Promise<boolean>;
  onRestore: (id: string) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
}

export function HabitCard({ habit, onArchive, onRestore, onDelete }: HabitCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(habit.id);
    setIsDeleting(false);
    setShowDeleteDialog(false);
  };

  const frequencyLabel = 
    habit.frequency === "daily" 
      ? "Daily" 
      : habit.frequency === "weekly" 
        ? "Weekly" 
        : `${habit.frequency_days?.length || 0} days/week`;

  return (
    <>
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <div className="h-1" style={{ backgroundColor: habit.color }} />
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <Link to={`/habits/${habit.id}`} className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate hover:text-primary transition-colors">
                {habit.name}
              </h3>
              {habit.description && (
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {habit.description}
                </p>
              )}
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover border-border">
                <DropdownMenuItem asChild>
                  <Link to={`/habits/${habit.id}`} className="flex items-center">
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                {habit.status === "active" ? (
                  <DropdownMenuItem onClick={() => onArchive(habit.id)}>
                    <Archive className="mr-2 h-4 w-4" />
                    Archive
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onClick={() => onRestore(habit.id)}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Restore
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setShowDeleteDialog(true)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
              {CATEGORY_LABELS[habit.category]}
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
              {frequencyLabel}
            </span>
            {habit.target_per_period > 1 && (
              <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                {habit.target_per_period}x
              </span>
            )}
            {habit.status === "archived" && (
              <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                Archived
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
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
    </>
  );
}
