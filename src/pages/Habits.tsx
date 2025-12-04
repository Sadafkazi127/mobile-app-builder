import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";

export default function Habits() {
  return (
    <AppLayout title="My Habits">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            No habits yet. Create your first habit to get started!
          </p>
          <Button className="gradient-primary border-0" asChild>
            <Link to="/habits/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Habit
            </Link>
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}