import { Link } from "react-router-dom";
import { instance } from "../config/instance";
import { useEffect, useState } from "react";
import TableHistory from "../components/TableHistory";
export default function History() {
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState();

  const fetchData = async () => {
    try {
      const { data } = await instance({ method: "get", url: "/residenthouse" });
      console.log(data.data);
      setHistory(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const exitHouse = async (e, id) => {
    e.preventDefault();
    console.log(id, "<<<< id");
    try {
      const { data } = await instance({
        method: "patch",
        url: `/residenthouse/exit/${id}`,
      });
      setMessage(data.message);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="px-16">
      <h1 className="my-8 text-4xl font-bold text-gray-900 text-center">
        History House
      </h1>
      <div className="mb-4">
        <Link
          to={"add-history"}
          className="rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Add New
        </Link>
      </div>
      <div className="rounded-lg border border-gray-200">
        <div className="overflow-x-auto rounded-t-lg">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Full Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Address
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  residentStatus
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  startDate
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  exitDate
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-center">
              {history.map((el) => (
                <TableHistory
                  key={el.id}
                  dataHistory={el}
                  exit={(e) => exitHouse(e, el.id)}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-b-lg border-t border-gray-200 px-4 py-2"></div>
      </div>
    </div>
  );
}
