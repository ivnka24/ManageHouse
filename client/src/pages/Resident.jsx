import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { instance } from "../config/instance";
import TableResident from "../components/TableResident";

export default function Resident() {
  const [resident, setResident] = useState([]);
  const fetchResident = async () => {
    try {
      const { data } = await instance({ method: "GET", url: "/resident" });
      console.log(data.data);
      setResident(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchResident();
  }, []);
  return (
    <div className="px-16">
      <h1 className="my-8 text-4xl font-bold text-gray-900 text-center">
        Manage Resident
      </h1>
      <div className="mb-4">
        <Link
          to={"add-resident"}
          className="rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Add New Resident
        </Link>
      </div>
      <div className="rounded-lg border border-gray-200">
        <div className="overflow-x-auto rounded-t-lg">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Fullname
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  KTP
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Status
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Phone Number
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Status Marriage
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-center">
              {resident.map((el) => (
                <TableResident key={el.id} dataResident={el} />
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-b-lg border-t border-gray-200 px-4 py-2"></div>
      </div>
    </div>
  );
}
