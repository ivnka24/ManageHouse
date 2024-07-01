import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../config/instance";

export default function EditHouse() {
  const { id } = useParams();
  const [updateData, setUpdateData] = useState({ address: "" });
  const navigate = useNavigate();
  const fetchDataById = async () => {
    try {
      const { data } = await instance({ method: "get", url: "/house/" + id });
      setUpdateData(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const updateHouse = async (e) => {
    try {
      e.preventDefault();
      const { data } = await instance({
        method: "put",
        url: "/house/" + id,
        data: updateData,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  useEffect(() => {
    fetchDataById();
  }, []);
  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md mt-8">
        <h2 className="mb-4 text-2xl font-bold text-indigo-700">Edit House</h2>
        <form onSubmit={updateHouse}>
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
              value={updateData.address}
              onChange={handleInputChange}
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
