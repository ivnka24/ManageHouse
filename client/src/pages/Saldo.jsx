import React, { useState, useEffect } from "react";
import axios from "axios";
import { instance } from "../config/instance";

const Saldo = () => {
  const [currentBalance, setCurrentBalance] = useState(null);
  const [historySaldo, setHistorySaldo] = useState([]);
  const [status, setStatus] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    fetchCurrentBalance();
    fetchHistorySaldo();
  }, []);

  const fetchCurrentBalance = async () => {
    try {
      const { data } = await instance.get("/saldo/now");
      setCurrentBalance(data.latestSaldo.amount);
    } catch (error) {
      console.error("Error fetching current balance:", error);
    }
  };

  const fetchHistorySaldo = async () => {
    try {
      const response = await instance.get("/saldo", {
        params: { status, month, year },
      });
      setHistorySaldo(response.data.filteredSaldo);
    } catch (error) {
      console.error("Error fetching history saldo:", error);
    }
  };

  const handleFilterSubmit = () => {
    fetchHistorySaldo();
  };

  return (
    <div className="px-8 py-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Saldo Overview</h1>

      <article className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <span className="rounded-full bg-blue-100 p-3 text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </span>
        <div>
          <p className="text-2xl font-medium text-gray-900">
            {currentBalance !== null ? `Rp ${currentBalance}` : "Loading..."}
          </p>
          <p className="text-sm text-gray-500">Current Balance</p>
        </div>
      </article>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">History Saldo</h2>

        <div className="flex gap-4 mb-4">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="">Select Status</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>

          <button
            onClick={handleFilterSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Filter
          </button>
        </div>

        {historySaldo.map((transaction) => (
          <article
            key={transaction.id}
            className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-sm mb-4"
          >
            <div>
              <p className="text-2xl font-medium text-gray-900">
                Rp {transaction.amount}
              </p>
              <p className="text-sm text-gray-500">
                Date: {new Date(transaction.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div
              className={`inline-flex items-center px-4 py-2 rounded ${
                transaction.status === "Income"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              <span className="text-xs font-medium">{transaction.status}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Saldo;
