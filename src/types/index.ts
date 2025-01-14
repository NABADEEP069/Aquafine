export interface Profile {
    phone_number: any;
    id: string;
    username: string;
    role: 'student';
    rating: number;
    total_ratings: number;
    created_at: string;
    
    is_outside_campus?: boolean;
    last_status_update?: string;
    email: string;
  }