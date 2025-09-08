import axios from "axios";
import { Search, Edit, Trash2, UserPlus, Users } from "lucide-react";
import { useEffect, useState } from "react";

const User = () => {
  const [allUser, setAllUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/user/allusers");
        setAllUser(res.data.users || []);
      } catch (error) {
        console.error("Error fetching users:", error);
        setAllUser([]);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = allUser.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fadeIn min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-pink-500 text-transparent bg-clip-text">
            Users
          </h1>
          <p className="text-gray-600">Manage system users</p>
        </div>
        <button
          className="mt-2 sm:mt-0 inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow disabled:opacity-60 disabled:cursor-not-allowed"
          disabled
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-green-100 to-green-50 p-4 rounded-xl shadow hover:shadow-lg transition">
          <div className="flex items-center space-x-2">
            <Users className="text-green-600 h-5 w-5" />
            <span className="text-sm text-gray-600">Total Users</span>
          </div>
          <p className="mt-1 text-2xl font-bold text-green-700">{allUser.length}</p>
        </div>
        <div className="bg-gradient-to-r from-indigo-100 to-indigo-50 p-4 rounded-xl shadow hover:shadow-lg transition">
          <div className="flex items-center space-x-2">
            <Search className="text-indigo-600 h-5 w-5" />
            <span className="text-sm text-gray-600">Search Results</span>
          </div>
          <p className="mt-1 text-2xl font-bold text-indigo-700">{filteredUsers.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 transition hover:shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search users by name or email..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        {filteredUsers.length > 0 ? (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-indigo-50/50 transition duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-400 to-pink-400 flex items-center justify-center text-white shadow-md">
                            <span className="text-sm font-medium">{user.name?.[0]?.toUpperCase() || "U"}</span>
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-indigo-600 rounded-full hover:bg-indigo-100 disabled:opacity-50 transition" disabled>
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-pink-600 rounded-full hover:bg-pink-100 disabled:opacity-50 transition" disabled>
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden divide-y bg-none divide-gray-200">
              {filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className="p-4 flex flex-col sm:flex-row justify-between bg-white rounded-xl shadow hover:shadow-lg transition animate-slideUp mb-4"
                >
                  <div className="flex items-center space-x-3 overflow-x-auto">
                    <div className="h-12 w-12 flex-shrink-0 rounded-full bg-gradient-to-br from-indigo-400 to-pink-400 flex items-center justify-center text-white shadow-md">
                      <span className="text-sm font-medium">{user.name?.[0]?.toUpperCase() || "U"}</span>
                    </div>
                    <div className="min-w-0 flex flex-col">
                      <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                      <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-3 sm:mt-0">
                    <button
                      className="p-2 text-indigo-600 rounded-full hover:bg-indigo-100 disabled:opacity-50 transition"
                      disabled
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      className="p-2 text-pink-600 rounded-full hover:bg-pink-100 disabled:opacity-50 transition"
                      disabled
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16 animate-bounceIn">
            <UserPlus className="mx-auto h-14 w-14 text-indigo-300" />
            <h3 className="mt-3 text-xl font-bold text-gray-800">No users found</h3>
            <p className="mt-2 text-gray-500 max-w-sm mx-auto">
              {searchTerm
                ? "No users match your search. Try another keyword."
                : "It looks like there are no users yet. Start by adding your first user!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
