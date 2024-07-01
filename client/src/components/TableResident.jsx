import { Link } from "react-router-dom";

export default function TableResident({ dataResident }) {
  return (
    <tr>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        {dataResident.fullName}
      </td>
      {/* image */}
      <td className="whitespace-nowrap px-4 py-2">
        <img
          src={dataResident.photoIdentityCard}
          alt="Identity Card"
          className="w-16 h-16 object-cover rounded-lg"
        />
      </td>
      {/* end image */}
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {dataResident.residentStatus}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {dataResident.phoneNumber}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {dataResident.statusMarriage}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        <Link
          to={"/edit-resident/" + dataResident.id}
          className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
        >
          Update
        </Link>
      </td>
    </tr>
  );
}
