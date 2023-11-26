export interface Artist {
  id: string;
  name: string;
  phone: number;
  email: string;
  admin_id: string;
  description: string;
  instagram: string;
  username: string;
}

export interface ArtistSession {
  id: string;
  date: string;
  estimated_time: number;
  status: string;
  price: number;
  appointment_id: string;
}
