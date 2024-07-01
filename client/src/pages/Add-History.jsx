import { useEffect, useState } from "react";
import { instance } from "../config/instance";
import { useNavigate } from "react-router-dom";

export default function AddHistory() {
  const navigate = useNavigate();
  const [resident, setResident] = useState([]);
  const [house, setHouse] = useState([]);
  const [input, setInput] = useState({
    HouseId: "",
    ResidentId: "",
  });

  const fetchHouse = async () => {
    try {
      const { data } = await instance({
        method: "GET",
        url: "/house/available",
      });
      setHouse(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchResident = async () => {
    try {
      const { data } = await instance({
        method: "GET",
        url: "/resident",
      });
      setResident(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await instance({
        method: "post",
        url: "/residenthouse",
        data: input,
      });
      navigate("/history-house");
    } catch (error) {
      console.log(error);
    }
  };

  const handleResidentChange = (e) => {
    setInput({
      ...input,
      ResidentId: e.target.value,
    });
  };

  const handleHouseChange = (e) => {
    setInput({
      ...input,
      HouseId: e.target.value,
    });
  };

  useEffect(() => {
    fetchHouse();
    fetchResident();
  }, []);

  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md mt-8">
        <h2 className="mb-4 text-2xl font-bold text-indigo-700">Add History</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="residentId"
            >
              Resident
            </label>
            <select
              id="residentId"
              name="ResidentId"
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              onChange={handleResidentChange}
              value={input.ResidentId}
              required
            >
              <option value="">Select Resident</option>
              {resident.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.fullName}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="houseId"
            >
              House
            </label>
            <select
              id="houseId"
              name="HouseId"
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              onChange={handleHouseChange}
              value={input.HouseId}
              required
            >
              <option value="">Select House</option>
              {house.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.address}
                </option>
              ))}
            </select>
          </div>
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
