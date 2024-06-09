export type TFoundItem = {
  userId: string;
  category: string;
  description: string;
  date: string;
  location: string;
  email: string;
  status: 'found' | 'not found';
  image: string;
};
