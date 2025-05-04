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
          excerpt: string | null
          author_id: string | null
          published: boolean
          slug: string
          cover_image: string | null
          category_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          content: string
          excerpt?: string | null
          author_id?: string | null
          published?: boolean
          slug: string
          cover_image?: string | null
          category_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          content?: string
          excerpt?: string | null
          author_id?: string | null
          published?: boolean
          slug?: string
          cover_image?: string | null
          category_id?: string | null
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string
        }
      }
      blog_media: {
        Row: {
          id: string
          blog_id: string
          media_url: string
          media_type: string
          created_at: string
          caption: string | null
          alt_text: string | null
        }
        Insert: {
          id?: string
          blog_id: string
          media_url: string
          media_type: string
          created_at?: string
          caption?: string | null
          alt_text?: string | null
        }
        Update: {
          id?: string
          blog_id?: string
          media_url?: string
          media_type?: string
          created_at?: string
          caption?: string | null
          alt_text?: string | null
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