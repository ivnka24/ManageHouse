export default function TableExpense({ dataExpense }) {
  const formattedDate = (date) => {
    const dateObj = new Date(date);

    const formatted = dateObj.toLocaleString();

    return formatted.split(",")[0];
  };
  return (
    <tr>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        {dataExpense.description}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {dataExpense.amount}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {formattedDate(dataExpense.dateExpense)}
      </td>
    </tr>
  );
}
