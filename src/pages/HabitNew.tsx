import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HabitForm } from "@/components/habits/HabitForm";
import { useHabits } from "@/hooks/useHabits";

export default function HabitNew() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { createHabit } = useHabits();

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    const habit = await createHabit(data);
    setIsSubmitting(false);
    if (habit) {
      navigate("/habits");
    }
  };

  return (
    <AppLayout title="Create Habit" showBottomNav={false}>
      <div className="container mx-auto px-4 py-6 max-w-lg">
        <Button variant="ghost" size="sm" className="mb-4" asChild>
          <Link to="/habits">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Create New Habit</CardTitle>
          </CardHeader>
          <CardContent>
            <HabitForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
