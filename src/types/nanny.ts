export interface FirebaseNanny {
  about: string;
  avatar_url: string;
  birthday: string;
  characters: string[];
  education: string;
  experience: string;
  kids_age: string;
  location: string;
  name: string;
  price_per_hour: number;
  rating: number;
  reviews: Review[];
}

export interface Nanny extends FirebaseNanny {
  id: string;
}

type Review = {
  comment: string;
  rating: number;
  reviewer: string;
};
