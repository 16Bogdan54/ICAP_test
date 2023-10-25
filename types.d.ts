type AuthInitialState = {
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string;
  username: string;
};

type LoginInput = {
  username: string;
  password: string;
};

type TableItem = {
  id: number;
  name: string;
  email: string;
  birthday_date: string;
  phone_number: string;
  address: string;
};

type TableInitialState = {
  isLoading: boolean;
  error: string;
  posts: TableItem[];
};
