import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";

export default function HabitDetail() {
  const { id } = useParams();

  return (
    <AppLayout title="Habit Details" showBottomNav={false}>
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" size="sm" className="mb-4" asChild>
          <Link to="/habits">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Habit detail view for ID: {id}
          </p>
        </div>
      </div>
    </AppLayout>
  );
}