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
  amount: number;
  description: string;
  date: string;
  category: ExpenseCategory;
  user: User;
}

export interface Income {
  id: number;
  amount: number;
  source: string;
  date: string;
  user: User;
}

export interface BudgetSummary {
  id: number;
  total_expenses: number;
  budget_limit: number;
  user: User;
  expense_category: ExpenseCategory;
}

export interface ExpenseCategory {
  id: number;
  name: string;
}

export interface ExpenseInput {
  amount: number;
  description: string;
  date: string;
  category_id: number | null;
}

export interface IncomeInput {
  amount: number;
  source: string;
  date: string;
}

export interface BudgetInput {
  budget_limit: number;
  expense_category_id: number;
}

export interface TransactionSummary {
  amount: number;
  month: number;
  year: number;
}
