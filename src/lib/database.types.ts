export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      blogs: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          content: string
          excerpt: string
          slug: string
          published: boolean
          featured_image: string | null
          author_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          content: string
          excerpt: string
          slug: string
          published?: boolean
          featured_image?: string | null
          author_id: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          content?: string
          excerpt?: string
          slug?: string
          published?: boolean
          featured_image?: string | null
          author_id?: string
        }
      }
      blog_tags: {
        Row: {
          id: string
          blog_id: string
          tag_id: string
        }
        Insert: {
          id?: string
          blog_id: string
          tag_id: string
        }
        Update: {
          id?: string
          blog_id?: string
          tag_id?: string
        }
      }
      tags: {
        Row: {
          id: string
          name: string
          slug: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
        }
      }
      authors: {
        Row: {
          id: string
          name: string
          bio: string | null
          avatar_url: string | null
        }
        Insert: {
          id: string
          name: string
          bio?: string | null
          avatar_url?: string | null
        }
        Update: {
          id?: string
          name?: string
          bio?: string | null
          avatar_url?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}