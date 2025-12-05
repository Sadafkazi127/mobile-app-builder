import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export type HabitCategory = 'health' | 'fitness' | 'productivity' | 'learning' | 'mindfulness' | 'social' | 'finance' | 'other';
export type HabitFrequency = 'daily' | 'weekly' | 'custom';
export type HabitStatus = 'active' | 'archived';

export interface Habit {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  category: HabitCategory;
  frequency: HabitFrequency;
  frequency_days: number[] | null;
  target_per_period: number;
  color: string;
  icon: string;
  status: HabitStatus;
  created_at: string;
  updated_at: string;
}

export interface CreateHabitData {
  name: string;
  description?: string;
  category: HabitCategory;
  frequency: HabitFrequency;
  frequency_days?: number[];
  target_per_period?: number;
  color?: string;
  icon?: string;
}

export interface UpdateHabitData extends Partial<CreateHabitData> {
  status?: HabitStatus;
}

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchHabits = async (includeArchived = false) => {
    if (!user) return;
    
    setLoading(true);
    try {
      let query = supabase
        .from("habits")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      
      if (!includeArchived) {
        query = query.eq("status", "active");
      }

      const { data, error } = await query;
      
      if (error) throw error;
      setHabits(data as Habit[]);
    } catch (error: any) {
      toast({
        title: "Error fetching habits",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createHabit = async (habitData: CreateHabitData): Promise<Habit | null> => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from("habits")
        .insert({
          ...habitData,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      
      setHabits((prev) => [data as Habit, ...prev]);
      toast({
        title: "Habit created",
        description: `"${habitData.name}" has been created successfully.`,
      });
      return data as Habit;
    } catch (error: any) {
      toast({
        title: "Error creating habit",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
  };

  const updateHabit = async (id: string, habitData: UpdateHabitData): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from("habits")
        .update(habitData)
        .eq("id", id);

      if (error) throw error;

      setHabits((prev) =>
        prev.map((h) => (h.id === id ? { ...h, ...habitData } : h))
      );
      toast({
        title: "Habit updated",
        description: "Your habit has been updated successfully.",
      });
      return true;
    } catch (error: any) {
      toast({
        title: "Error updating habit",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteHabit = async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from("habits")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setHabits((prev) => prev.filter((h) => h.id !== id));
      toast({
        title: "Habit deleted",
        description: "Your habit has been deleted successfully.",
      });
      return true;
    } catch (error: any) {
      toast({
        title: "Error deleting habit",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  const archiveHabit = async (id: string): Promise<boolean> => {
    return updateHabit(id, { status: "archived" });
  };

  const restoreHabit = async (id: string): Promise<boolean> => {
    return updateHabit(id, { status: "active" });
  };

  const getHabit = async (id: string): Promise<Habit | null> => {
    try {
      const { data, error } = await supabase
        .from("habits")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      return data as Habit | null;
    } catch (error: any) {
      toast({
        title: "Error fetching habit",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
  };

  useEffect(() => {
    fetchHabits();
  }, [user]);

  return {
    habits,
    loading,
    fetchHabits,
    createHabit,
    updateHabit,
    deleteHabit,
    archiveHabit,
    restoreHabit,
    getHabit,
  };
}
