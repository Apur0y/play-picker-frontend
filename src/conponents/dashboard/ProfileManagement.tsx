"use client";
import { useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, Edit2, Save, X } from "lucide-react";
import { useAppSelector } from "@/redux/features/hook";

type UserProfile = {
  name: string;
  email: string;
  phone: string;
  address: string;
  role?: string;
  joinDate?: string;
};

export default function ProfileManagement() {
  const [isEditing, setIsEditing] = useState(false);
   const user = useAppSelector((state) => state.auth?.user);
const [profile, setProfile] = useState<UserProfile>({
  name: "",
  email: "",
  phone: "",
  address: "",
  role: "",
  joinDate: ""
});



  const [editData, setEditData] = useState(profile);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(profile);
  };

  const handleSave = () => {
    setProfile(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
  if (user) {
    setProfile({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
      role: user.role || "",
      joinDate: user.createdAt
        ? new Date(user.createdAt).toLocaleDateString()
        : "",
    });
  }
}, [user]);

  if (isEditing) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl text-gray-900">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <User className="w-8 h-8 text-orange-600" />
          Edit Profile
        </h2>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-600 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-600 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={editData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-600 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={editData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-600 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={editData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-600 transition"
              />
            </div>
            {/* <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={editData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-600 transition"
              />
            </div> */}
          </div>

          <div className="flex gap-4 pt-6">
            <button
              onClick={handleSave}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition transform hover:scale-105"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition"
            >
              <X className="w-5 h-5" />
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <User className="w-8 h-8 text-orange-600" />
          Profile Information
        </h2>
        <button
          onClick={handleEdit}
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition transform hover:scale-105"
        >
          <Edit2 className="w-5 h-5" />
          Edit
        </button>
      </div>

      <div className="space-y-4">
        <div className="border-b border-gray-200 pb-4">
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <User className="w-4 h-4" />
            Full Name
          </p>
          <p className="text-xl font-semibold text-gray-800">{profile.name}</p>
        </div>

        <div className="border-b border-gray-200 pb-4">
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email
          </p>
          <p className="text-xl font-semibold text-gray-800">{profile.email}</p>
        </div>

        <div className="border-b border-gray-200 pb-4">
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Phone
          </p>
          <p className="text-xl font-semibold text-gray-800">{profile.phone}</p>
        </div>

        <div className="border-b border-gray-200 pb-4">
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Address
          </p>
          <p className="text-xl font-semibold text-gray-800">
            {profile.address}
          </p>
        </div>

        <div className="pt-4">
          <p className="text-sm text-gray-600">Member Since</p>
          <p className="text-lg font-semibold text-gray-800">{profile.joinDate}</p>
        </div>
      </div>
    </div>
  );
}
