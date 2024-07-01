import { useState, useEffect } from "react";
import { instance } from "../config/instance";
import { useNavigate } from "react-router-dom";

export default function AddPayment() {
  const [residents, setResidents] = useState([]);
  const [input, setInput] = useState({
    ResidentId: "",
    typePayment: "",
    periodPayment: "1",
  });
  const [amount, setAmount] = useState(0); 
  const [error, setError] = useState(null);
  const [isPeriodDisabled, setIsPeriodDisabled] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const { data } = await instance.get("/resident");
        setResidents(data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchResidents();
  }, []);

  useEffect(() => {
    const baseAmount = input.typePayment === "Satpam" ? 100000 : 15000;
    setAmount(baseAmount * parseInt(input.periodPayment || 1));
  }, [input.typePayment, input.periodPayment]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));

    if (name === "typePayment") {
      setIsPeriodDisabled(value === "Satpam");
      if (value === "Satpam") {
        setInput((prevInput) => ({
          ...prevInput,
          periodPayment: "1", 
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const paymentData = {
        ...input,
        amount,
      };
      const { data } = await instance.post("/payment", paymentData);
      alert(data.message);
      navigate("/payment");
    } catch (err) {
      setError(err.response ? err.response.data.message : "Error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-indigo-700">Add Payment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="ResidentId"
            >
              Resident
            </label>
            <select
              id="ResidentId"
              name="ResidentId"
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={input.ResidentId}
              onChange={handleChange}
              required
            >
              <option value="">Select Resident</option>
              {residents.map((resident) => (
                <option key={resident.id} value={resident.id}>
                  {resident.fullName}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="typePayment"
            >
              Type of Payment
            </label>
            <select
              id="typePayment"
              name="typePayment"
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={input.typePayment}
              onChange={handleChange}
              required
            >
              <option value="">Select Payment Type</option>
              <option value="Satpam">Satpam</option>
              <option value="Kebersihan">Kebersihan</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="periodPayment"
            >
              Period of Payment (Months)
            </label>
            <input
              type="number"
              id="periodPayment"
              name="periodPayment"
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={input.periodPayment}
              onChange={handleChange}
              min="1"
              required
              disabled={isPeriodDisabled}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="amount"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={amount}
              readOnly
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
