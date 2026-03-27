export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      dema_intercepts: {
        Row: {
          id: number;
          message_title: string;
          decrypted_content: string;
          threat_level: number;
        };
        Insert: {
          id?: never;
          message_title: string;
          decrypted_content: string;
          threat_level: number;
        };
        Update: {
          id?: never;
          message_title?: string;
          decrypted_content?: string;
          threat_level?: number;
        };
        Relationships: [];
      };
      dema_messages: {
        Row: {
          id: number;
          message_title: string;
          decrypted_content: string;
          threat_level: number;
        };
        Insert: {
          id?: never;
          message_title: string;
          decrypted_content: string;
          threat_level: number;
        };
        Update: {
          id?: never;
          message_title?: string;
          decrypted_content?: string;
          threat_level?: number;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
