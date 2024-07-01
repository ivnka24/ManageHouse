import { Link } from "react-router-dom";
import { instance } from "../config/instance";
import { useState } from "react";

export default function TableHistory({ dataHistory, exit }) {
  const formattedDate = (date) => {
    const dateObj = new Date(date);

    const formatted = dateObj.toLocaleString();

    return formatted.split(",")[0];
  };

  return (
    <tr>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        {dataHistory.fullName}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {dataHistory.address}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {dataHistory.residentStatus}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {formattedDate(dataHistory.startDate)}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {dataHistory.exitDate ? formattedDate(dataHistory.exitDate) : "-"}
      </td>

      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        <button
          onClick={(e) => exit(e, dataHistory.id)}
          disabled={dataHistory.exitDate !== null}
          className={`inline-block rounded px-4 py-2 text-xs font-medium text-white ${
            dataHistory.exitDate !== null
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          Exit House
        </button>
      </td>
    </tr>
  );
}
