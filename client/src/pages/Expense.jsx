import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { instance } from "../config/instance";
import TableExpense from "../components/TableExpense";

export default function Expense() {
  const [dataExpense, setDataExpense] = useState([]);
  const fetchExpense = async () => {
    try {
      const { data } = await instance.get("/expense");
      console.log(data.data);
      setDataExpense(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchExpense();
  }, []);
  return (
    <div className="px-16">
      <h1 className="my-8 text-4xl font-bold text-gray-900 text-center">
        Manage Expense
      </h1>
      <div className="mb-4">
        <Link
          to={"add-expense"}
          className="rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Add New Expense
        </Link>
      </div>
      <div className="rounded-lg border border-gray-200">
        <div className="overflow-x-auto rounded-t-lg">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Description
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Amount
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  dateExpense
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-center">
              {dataExpense.map((el) => (
                <TableExpense key={el.id} dataExpense={el} />
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-b-lg border-t border-gray-200 px-4 py-2"></div>
      </div>
    </div>
  );
}
