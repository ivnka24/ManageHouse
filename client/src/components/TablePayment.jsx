export default function TablePayment({ data }) {
  const formattedDate = (date) => {
    const dateObj = new Date(date);

    const formatted = dateObj.toLocaleString();

    return formatted.split(",")[0];
  };
  return (
    <tr>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        {data.Resident.fullName}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {data.typePayment}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {data.amount}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {data.periodPayment}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {formattedDate(data.datePayment)}
      </td>
    </tr>
  );
}
