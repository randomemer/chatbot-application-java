export interface User {
  id: number;
  username: string;
  authorities: Authority[];
}

export interface Authority {
  authority: string;
}

export interface Expense {
  id: number;
  user: User;
  amount: number;
  date: string;
  category: any;
}

export interface ExpenseCategory {
  id: number;
  name: string;
}

export interface ExpenseInput {
  amount: number;
  date: string;
  description: string;
  category_id: number | null;
}
