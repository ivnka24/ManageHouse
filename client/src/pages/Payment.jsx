import { Link } from "react-router-dom";
import { instance } from "../config/instance";
import { useEffect, useState } from "react";
import TablePayment from "../components/TablePayment";

export default function Payment() {
  const [dataPayment, setDataPayment] = useState([]);
  const fetchPayment = async () => {
    try {
      const { data } = await instance("/payment");
      console.log(data.payments);
      setDataPayment(data.payments);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPayment();
  }, []);
  return (
    <div className="px-16">
      <h1 className="my-8 text-4xl font-bold text-gray-900 text-center">
        Payments
      </h1>
      <div className="mb-4">
        <Link
          to={"add-payment"}
          className="rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Add Payments
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
                  Type Payment
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Amount
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  periodPayment
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  datePayment
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-center">
              {dataPayment.map((el) => (
                <TablePayment key={el.id} data={el} />
              ))}
              {/* {history.map((el) => (
                <TableHistory
                  key={el.id}
                  dataHistory={el}
                  exit={(e) => exitHouse(e, el.id)}
                />
              ))} */}
            </tbody>
          </table>
        </div>

        <div className="rounded-b-lg border-t border-gray-200 px-4 py-2"></div>
      </div>
    </div>
  );
}
