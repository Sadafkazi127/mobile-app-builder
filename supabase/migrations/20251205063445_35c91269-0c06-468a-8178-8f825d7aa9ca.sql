-- Create enum for habit categories
CREATE TYPE public.habit_category AS ENUM ('health', 'fitness', 'productivity', 'learning', 'mindfulness', 'social', 'finance', 'other');

-- Create enum for habit frequency type
CREATE TYPE public.habit_frequency AS ENUM ('daily', 'weekly', 'custom');

-- Create enum for habit status
CREATE TYPE public.habit_status AS ENUM ('active', 'archived');

-- Create habits table
CREATE TABLE public.habits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  category habit_category NOT NULL DEFAULT 'other',
  frequency habit_frequency NOT NULL DEFAULT 'daily',
  frequency_days INTEGER[] DEFAULT NULL,
  target_per_period INTEGER NOT NULL DEFAULT 1,
  color TEXT DEFAULT '#10B981',
  icon TEXT DEFAULT 'check',
  status habit_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own habits"
ON public.habits FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own habits"
ON public.habits FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own habits"
ON public.habits FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own habits"
ON public.habits FOR DELETE
USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_habits_updated_at
BEFORE UPDATE ON public.habits
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();