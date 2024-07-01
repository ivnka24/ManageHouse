import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../config/instance";

export default function EditResident() {
  const { id } = useParams(); 
  const [formData, setFormData] = useState({
    fullName: "",
    residentStatus: "",
    phoneNumber: "",
    statusMarriage: "",
    photoIdentityCard: null,
  });
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`/resident/${id}`);
        console.log(response.data);
        const { fullName, residentStatus, phoneNumber, statusMarriage, photoIdentityCard } = response.data;
        setFormData({
          fullName,
          residentStatus,
          phoneNumber,
          statusMarriage,
          photoIdentityCard, 
        });
      } catch (error) {
        console.error("Error fetching resident data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photoIdentityCard: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("residentStatus", formData.residentStatus);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("statusMarriage", formData.statusMarriage);

    if (formData.photoIdentityCard instanceof File) {
      data.append("photoIdentityCard", formData.photoIdentityCard);
    }

    try {
      const response = await instance.put(`/resident/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      navigate("/resident"); 
    } catch (error) {
      console.error("Error updating resident:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md mt-8">
        <h2 className="mb-4 text-2xl font-bold text-indigo-700">Edit Resident</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter full name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="residentStatus"
            >
              Resident Status
            </label>
            <select
              id="residentStatus"
              name="residentStatus"
              value={formData.residentStatus}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="Tetap">Tetap</option>
              <option value="Kontrak">Kontrak</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter phone number"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="statusMarriage"
            >
              Marital Status
            </label>
            <input
              type="text"
              id="statusMarriage"
              name="statusMarriage"
              value={formData.statusMarriage}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter marital status"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="photoIdentityCard"
            >
              Photo Identity Card
            </label>
            <input
              type="file"
              id="photoIdentityCard"
              name="photoIdentityCard"
              onChange={handleFileChange}
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {formData.photoIdentityCard && (
              <img
                src={
                  formData.photoIdentityCard instanceof File
                    ? URL.createObjectURL(formData.photoIdentityCard)
                    : formData.photoIdentityCard
                }
                alt="Identity Card"
                className="mt-2 w-32 h-32 object-cover"
              />
            )}
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading} 
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
