import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { startOfDay, endOfDay, format } from "date-fns";

export interface HabitLog {
  id: string;
  habit_id: string;
  user_id: string;
  completed_at: string;
  notes: string | null;
  created_at: string;
}

export function useHabitLogs(habitId?: string) {
  const [logs, setLogs] = useState<HabitLog[]>([]);
  const [todayLogs, setTodayLogs] = useState<HabitLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchLogs = useCallback(async (forHabitId?: string) => {
    if (!user) return;
    
    setLoading(true);
    try {
      let query = supabase
        .from("habit_logs")
        .select("*")
        .eq("user_id", user.id)
        .order("completed_at", { ascending: false });

      if (forHabitId) {
        query = query.eq("habit_id", forHabitId);
      }

      const { data, error } = await query;
      if (error) throw error;
      setLogs(data as HabitLog[]);
    } catch (error: any) {
      toast({
        title: "Error fetching logs",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  const fetchTodayLogs = useCallback(async () => {
    if (!user) return;

    const today = new Date();
    const start = startOfDay(today).toISOString();
    const end = endOfDay(today).toISOString();

    try {
      const { data, error } = await supabase
        .from("habit_logs")
        .select("*")
        .eq("user_id", user.id)
        .gte("completed_at", start)
        .lte("completed_at", end);

      if (error) throw error;
      setTodayLogs(data as HabitLog[]);
    } catch (error: any) {
      console.error("Error fetching today's logs:", error);
    }
  }, [user]);

  const logCompletion = async (habitId: string, notes?: string, completedAt?: Date): Promise<HabitLog | null> => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from("habit_logs")
        .insert({
          habit_id: habitId,
          user_id: user.id,
          notes: notes || null,
          completed_at: completedAt?.toISOString() || new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      const newLog = data as HabitLog;
      setLogs((prev) => [newLog, ...prev]);
      setTodayLogs((prev) => [newLog, ...prev]);
      
      toast({
        title: "Habit logged!",
        description: "Great job keeping up with your habit.",
      });
      
      return newLog;
    } catch (error: any) {
      toast({
        title: "Error logging habit",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
  };

  const undoLog = async (logId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from("habit_logs")
        .delete()
        .eq("id", logId);

      if (error) throw error;

      setLogs((prev) => prev.filter((l) => l.id !== logId));
      setTodayLogs((prev) => prev.filter((l) => l.id !== logId));
      
      toast({
        title: "Log removed",
        description: "Habit completion has been undone.",
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: "Error removing log",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  const isCompletedToday = useCallback((habitId: string): boolean => {
    return todayLogs.some((log) => log.habit_id === habitId);
  }, [todayLogs]);

  const getTodayLogForHabit = useCallback((habitId: string): HabitLog | undefined => {
    return todayLogs.find((log) => log.habit_id === habitId);
  }, [todayLogs]);

  const getCompletionCountForDate = useCallback((habitId: string, date: Date): number => {
    const start = startOfDay(date);
    const end = endOfDay(date);
    return logs.filter(
      (log) =>
        log.habit_id === habitId &&
        new Date(log.completed_at) >= start &&
        new Date(log.completed_at) <= end
    ).length;
  }, [logs]);

  useEffect(() => {
    if (habitId) {
      fetchLogs(habitId);
    }
    fetchTodayLogs();
  }, [user, habitId, fetchLogs, fetchTodayLogs]);

  return {
    logs,
    todayLogs,
    loading,
    fetchLogs,
    fetchTodayLogs,
    logCompletion,
    undoLog,
    isCompletedToday,
    getTodayLogForHabit,
    getCompletionCountForDate,
  };
}
