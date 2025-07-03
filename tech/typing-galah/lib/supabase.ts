import { createBrowserClient } from '@supabase/ssr'

// Client-side Supabase client (for use in client components)
export const createClient = () => 
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          avatar_url: string | null
          settings: any | null
          created_at: string
        }
        Insert: {
          id: string
          username?: string | null
          avatar_url?: string | null
          settings?: any | null
          created_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          avatar_url?: string | null
          settings?: any | null
          created_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string | null
          order: number
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          order: number
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          order?: number
          created_at?: string
        }
      }
      lessons: {
        Row: {
          id: string
          course_id: string
          title: string
          lesson_type: string
          content: string
          order_in_course: number
          created_at: string
        }
        Insert: {
          id?: string
          course_id: string
          title: string
          lesson_type: string
          content: string
          order_in_course: number
          created_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          title?: string
          lesson_type?: string
          content?: string
          order_in_course?: number
          created_at?: string
        }
      }
      attempts: {
        Row: {
          id: string
          user_id: string
          lesson_id: string
          wpm: number
          accuracy: number
          completed_at: string
          key_press_data: any | null
        }
        Insert: {
          id?: string
          user_id: string
          lesson_id: string
          wpm: number
          accuracy: number
          completed_at?: string
          key_press_data?: any | null
        }
        Update: {
          id?: string
          user_id?: string
          lesson_id?: string
          wpm?: number
          accuracy?: number
          completed_at?: string
          key_press_data?: any | null
        }
      }
      achievements: {
        Row: {
          id: string
          code: string
          name: string
          description: string
          icon_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          code: string
          name: string
          description: string
          icon_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          code?: string
          name?: string
          description?: string
          icon_url?: string | null
          created_at?: string
        }
      }
      user_achievements: {
        Row: {
          user_id: string
          achievement_id: string
          achieved_at: string
        }
        Insert: {
          user_id: string
          achievement_id: string
          achieved_at?: string
        }
        Update: {
          user_id?: string
          achievement_id?: string
          achieved_at?: string
        }
      }
    }
  }
} 