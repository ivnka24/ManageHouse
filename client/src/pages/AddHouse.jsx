import { useState } from "react";
import { instance } from "../config/instance";
import { useNavigate } from "react-router-dom";

export default function AddHouse() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    address: "",
  });
  const handlerInput = (e) => {
    const { value, name } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  const handlerAddHouse = async (e) => {
    try {
      e.preventDefault();
      const { data } = await instance({
        method: "POST",
        url: "/house",
        data: { ...input },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md mt-8">
        <h2 className="mb-4 text-2xl font-bold text-indigo-700">Add House</h2>
        <form onSubmit={(e) => handlerAddHouse(e)}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="address"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={input.address}
              onChange={handlerInput}
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter house address"
            />
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
