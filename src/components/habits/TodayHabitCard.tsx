import { Check, Undo2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Habit } from "@/hooks/useHabits";

interface TodayHabitCardProps {
  habit: Habit;
  isCompleted: boolean;
  onComplete: () => void;
  onUndo: () => void;
  isLoading?: boolean;
}

export function TodayHabitCard({
  habit,
  isCompleted,
  onComplete,
  onUndo,
  isLoading,
}: TodayHabitCardProps) {
  return (
    <Card
      className={cn(
        "transition-all duration-200",
        isCompleted && "bg-primary/10 border-primary/30"
      )}
    >
      <CardContent className="p-4 flex items-center gap-4">
        <Button
          variant={isCompleted ? "default" : "outline"}
          size="icon"
          className={cn(
            "h-12 w-12 rounded-full shrink-0 transition-all",
            isCompleted && "bg-primary hover:bg-primary/90"
          )}
          onClick={isCompleted ? onUndo : onComplete}
          disabled={isLoading}
          style={{
            borderColor: !isCompleted ? habit.color : undefined,
            color: !isCompleted ? habit.color : undefined,
          }}
        >
          {isCompleted ? (
            <Undo2 className="h-5 w-5" />
          ) : (
            <Check className="h-5 w-5" />
          )}
        </Button>

        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              "font-medium truncate",
              isCompleted && "line-through text-muted-foreground"
            )}
          >
            {habit.name}
          </h3>
          {habit.description && (
            <p className="text-sm text-muted-foreground truncate">
              {habit.description}
            </p>
          )}
        </div>

        <div
          className="w-3 h-3 rounded-full shrink-0"
          style={{ backgroundColor: habit.color }}
        />
      </CardContent>
    </Card>
  );
}
