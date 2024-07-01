import { Link, useNavigate } from "react-router-dom";
export default function TableHouse({ dataHouse }) {
  return (
    <tr>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        {dataHouse.address}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {dataHouse.statusHouse}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        <Link
          to={"edit-house/" + dataHouse.id}
          class="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
        >
          Update
        </Link>
      </td>
    </tr>
  );
}
