"use client";

import BudgetDialog from "@/components/dialogs/budget-dialog";
import ExpenseDialog from "@/components/dialogs/expense-dialog";
import IncomeDialog from "@/components/dialogs/income-dialog";
import AppHeader from "@/components/header";
import { useUser } from "@/components/providers/user";
import BudgetsTab from "@/components/tabs/budgets-tab";
import ExpensesTab from "@/components/tabs/expenses-tab";
import IncomesTab from "@/components/tabs/incomes-tab";
import { fetcher } from "@/lib/api";
import { TransactionSummary } from "@/lib/types";
import {
  AddRounded,
  CallMadeRounded,
  CallReceivedRounded,
  SavingsRounded,
} from "@mui/icons-material";
import { TabContext, TabPanel } from "@mui/lab";
import { Box, SpeedDial, SpeedDialAction, useTheme } from "@mui/material";
import { green, purple, red } from "@mui/material/colors";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import {
  CustomTabList,
  Main,
  SummaryCard,
  SummaryCardTitle,
  SummaryContainer,
  SummaryNumber,
  TransactionTab,
  Welcome,
} from "./styles";

export default function DashboardPage() {
  const { user } = useUser();
  const theme = useTheme();

  const params = useSearchParams();
  const router = useRouter();

  const date = new Date();
  const query = new URLSearchParams({
    month: String(date.getMonth() + 1),
    year: String(date.getFullYear()),
  });

  const { data: totalExpenses } = useSWR<TransactionSummary>(
    `/expenses/total?${query}`,
    fetcher
  );
  const { data: totalIncomes } = useSWR<TransactionSummary>(
    `/incomes/total?${query}`,
    fetcher
  );
  const { data: budgets } = useSWR(`/budgets/summary?${query}`, fetcher);

  const [tab, setTab] = useState(params.get("tab") || "0");
  const [isExpenseDialogOpen, setExpenseDialogOpen] = useState(false);
  const [isIncomeDialogOpen, setIncomeDialogOpen] = useState(false);
  const [isBudgetDialogOpen, setBudgetDialogOpen] = useState(false);

  useEffect(() => {
    setTab(params.get("tab") || "0");
  }, [params]);

  return (
    <>
      <AppHeader />

      <Main className="py-20 gap-12">
        <section>
          <Welcome className="mb-12">Hello, {user?.username}</Welcome>

          <SummaryContainer className="gap-4">
            <SummaryCard
              sx={{
                backgroundColor: red[300],
                color: theme.palette.getContrastText(red[300]),
              }}
            >
              <SummaryCardTitle>Expenses</SummaryCardTitle>
              <SummaryNumber>
                ₹ {!!totalExpenses ? totalExpenses.amount.toLocaleString() : 0}
              </SummaryNumber>
            </SummaryCard>

            <SummaryCard
              sx={{
                backgroundColor: green[300],
                color: theme.palette.getContrastText(green[300]),
              }}
            >
              <SummaryCardTitle>Incomes</SummaryCardTitle>
              <SummaryNumber>
                ₹ {!!totalIncomes ? totalIncomes.amount.toLocaleString() : 0}
              </SummaryNumber>
            </SummaryCard>

            <SummaryCard
              sx={{
                backgroundColor: purple[300],
                color: theme.palette.getContrastText(purple[300]),
              }}
            >
              <SummaryCardTitle>Budgets</SummaryCardTitle>
              <SummaryNumber>{!!budgets ? budgets.length : 0}</SummaryNumber>
            </SummaryCard>
          </SummaryContainer>
        </section>

        <section>
          <TabContext value={tab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <CustomTabList onChange={(e, val) => router.push(`?tab=${val}`)}>
                <TransactionTab
                  value="0"
                  label="Expenses"
                  icon={<CallMadeRounded />}
                  iconPosition="start"
                />
                <TransactionTab
                  value="1"
                  label="Incomes"
                  icon={<CallReceivedRounded />}
                  iconPosition="start"
                />
                <TransactionTab
                  value="2"
                  label="Budgets"
                  icon={<SavingsRounded />}
                  iconPosition="start"
                />
              </CustomTabList>
            </Box>

            <TabPanel value="0">
              <ExpensesTab />
            </TabPanel>
            <TabPanel value="1">
              <IncomesTab />
            </TabPanel>
            <TabPanel value="2">
              <BudgetsTab />
            </TabPanel>
          </TabContext>
        </section>

        <SpeedDial
          ariaLabel="App actions"
          color="primary"
          icon={<AddRounded />}
          sx={{ position: "fixed", bottom: 32, right: 32 }}
        >
          <SpeedDialAction
            tooltipTitle="Add Expense"
            icon={<CallMadeRounded color="error" />}
            onClick={() => setExpenseDialogOpen(true)}
          />
          <SpeedDialAction
            tooltipTitle="Add Income"
            icon={<CallReceivedRounded color="success" />}
            onClick={() => setIncomeDialogOpen(true)}
          />
          <SpeedDialAction
            icon={<SavingsRounded color="primary" />}
            tooltipTitle="Add Budget"
            onClick={() => setBudgetDialogOpen(true)}
          />
        </SpeedDial>
      </Main>

      <ExpenseDialog
        isOpen={isExpenseDialogOpen}
        onClose={() => setExpenseDialogOpen(false)}
      />

      <IncomeDialog
        isOpen={isIncomeDialogOpen}
        onClose={() => setIncomeDialogOpen(false)}
      />

      <BudgetDialog
        isOpen={isBudgetDialogOpen}
        onClose={() => setBudgetDialogOpen(false)}
      />
    </>
  );
}

// Hello, <user>

// Expenditure this month (aggreations from API)
// Incomes this month (agg. from API)
// Budgets this month (And how many crossed) (API endpoints)

// Table of transactions (incomes, expenses on seperate tabs)

// Pages in the application :
// - Dashboard : Summary of all expenses, budgets and incomes (+ table of transactions)
// - Should be able to add / edit / delete any type of model from the dashboard using a dialog

// Admin Panel :
// - See list of users (seperate tab)
// - Add / edit / remove categories for expenses (seperate tab)
