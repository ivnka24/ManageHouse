import { useEffect, useState } from "react";
import TableHouse from "../components/TableHouse";
import { instance } from "../config/instance";
import { Link } from "react-router-dom";
export default function Home() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const { data } = await instance({ url: "/house" });
      setData(data.data);
      console.log(data.data, "<<<");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="px-16">
      <h1 className="my-8 text-4xl font-bold text-gray-900 text-center">Manage House</h1>
      <div className="mb-4">
        <Link
          to={"add-house"} 
          className="rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Add New House
        </Link>
      </div>
      <div className="rounded-lg border border-gray-200">
        <div className="overflow-x-auto rounded-t-lg">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Address
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Status House
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-center">
              {data.map((el) => (
                <TableHouse key={el.id} dataHouse={el} />
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-b-lg border-t border-gray-200 px-4 py-2"></div>
      </div>
    </div>
  );
}
