import { useState } from "react";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import Resident from "./pages/Resident";
import Payment from "./pages/Payment";
import Expense from "./pages/Expense";
import Saldo from "./pages/Saldo";
import History from "./pages/History";
import AddHouse from "./pages/AddHouse";
import EditHouse from "./pages/EditHouse";
import AddResident from "./pages/Add-Resident";
import EditResident from "./pages/EditResident";
import AddHistory from "./pages/Add-History";
import AddPayment from "./pages/Add-Payments";
import AddExpense from "./pages/Add-Expense";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "resident",
        element: <Resident />,
      },
      {
        path: "history-house",
        element: <History />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "expense",
        element: <Expense />,
      },
      {
        path: "saldo",
        element: <Saldo />,
      },
      {
        path: "add-house",
        element: <AddHouse />,
      },
      {
        path: "edit-house/:id",
        element: <EditHouse />,
      },
      {
        path: "resident/add-resident",
        element: <AddResident />,
      },
      {
        path: "edit-resident/:id",
        element: <EditResident />,
      },
      {
        path: "history-house/add-history",
        element: <AddHistory />,
      },
      {
        path: "payment/add-payment",
        element: <AddPayment />,
      },
      {
        path: "expense/add-expense",
        element: <AddExpense />,
      },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
