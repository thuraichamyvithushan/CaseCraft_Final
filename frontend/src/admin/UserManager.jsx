import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar.jsx";
import { getAdminUsers, updateUserRole, deleteAdminUser } from "../api/adminApi.js";
import { Users, Search, ChevronLeft, ChevronRight } from "lucide-react";

const ADMIN_STORAGE_KEY = "cpc_admin_token";

const UserManager = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({ pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updating, setUpdating] = useState(false);

  const fetchUsers = useCallback(async () => {
    const token = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!token) {
      navigate("/admin/login");
      return;
    }

    setLoading(true);
    try {
      const data = await getAdminUsers({ page, search, token });
      setUsers(data.data || []);
      setPagination(data.pagination || { pages: 1, total: 0 });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [navigate, page, search]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRoleChange = async (userId, newRole) => {
    const token = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!token) {
      navigate("/admin/login");
      return;
    }

    if (!window.confirm(`Change user role to ${newRole}?`)) return;

    setUpdating(true);
    try {
      await updateUserRole(userId, newRole, token);
      await fetchUsers();
      setSelectedUser(null);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to update user role");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!token) {
      navigate("/admin/login");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return;
    }

    try {
      await deleteAdminUser(id, token);
      await fetchUsers();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="mx-auto flex max-w-8xl flex-col gap-6 px-4 py-6 lg:py-8 md:flex-row">
        <AdminSidebar />

        <main className="flex-1 space-y-6">
          {/* Header Card */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-gradient-to-br from-[#02225b] to-indigo-600 p-3 text-white">
                  <Users className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">User Management</h1>
                  <p className="mt-1 text-sm text-slate-600">Manage users and assign admin access</p>
                </div>
              </div>
              <div className="relative flex-1 max-w-md">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full rounded-xl border-2 border-slate-100 bg-slate-50 py-3 pl-11 pr-4 text-sm transition-all focus:border-[#02225b] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#02225b]/10"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Users</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900">{pagination.total || 0}</p>
                </div>
                <div className="rounded-xl bg-indigo-50 p-3">
                  <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Administrators</p>
                  <p className="mt-1 text-2xl font-bold text-amber-600">
                    {users.filter(u => u.role === "admin").length}
                  </p>
                </div>
                <div className="rounded-xl bg-amber-50 p-3">
                  <svg className="h-6 w-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Page</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900">
                    {pagination.page || 1}/{pagination.pages || 1}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-100 p-3">
                  <svg className="h-6 w-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/50">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Role</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Joined</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <svg className="h-5 w-5 animate-spin text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span className="text-sm text-slate-600">Loading users...</span>
                        </div>
                      </td>
                    </tr>
                  ) : users.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <svg className="h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          <p className="text-sm font-medium text-slate-600">No users found</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user._id} className="transition-colors hover:bg-slate-50">
                        <td className="px-6 py-4 font-medium text-slate-900">{user.name}</td>
                        <td className="px-6 py-4 text-slate-600">{user.email}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${user.role === "admin"
                              ? "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20"
                              : "bg-slate-50 text-slate-700 ring-1 ring-slate-200/50"
                              }`}
                          >
                            {user.role || "user"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedUser(user)}
                              className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-200"
                            >
                              Manage
                            </button>
                            {user.role !== "admin" ? (
                              <button
                                onClick={() => handleRoleChange(user._id, "admin")}
                                disabled={updating}
                                className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 transition-colors hover:bg-indigo-100 disabled:opacity-60"
                              >
                                Make Admin
                              </button>
                            ) : (
                              <button
                                onClick={() => handleRoleChange(user._id, "user")}
                                disabled={updating}
                                className="rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 transition-colors hover:bg-amber-100 disabled:opacity-60"
                              >
                                Remove Admin
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(user._id)}
                              className="rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-100"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex flex-col items-center justify-between gap-4 py-4 sm:flex-row">
            <p className="text-sm font-medium text-slate-500">
              Showing <span className="text-slate-900">{users.length}</span> of{" "}
              <span className="text-slate-900">{pagination.total}</span> users
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 transition-all hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:hover:bg-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-1.5">
                {Array.from({ length: Math.min(5, pagination.pages || 1) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`h-10 min-w-[40px] rounded-xl px-3 text-sm font-bold transition-all ${page === pageNum
                          ? "bg-[#02225b] text-white shadow-lg shadow-indigo-200"
                          : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-200"
                        }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setPage((p) => (p < (pagination.pages || 1) ? p + 1 : p))}
                disabled={page >= (pagination.pages || 1)}
                className="flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 transition-all hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:hover:bg-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">User Details</h2>
                  <p className="text-xs text-slate-500">{selectedUser.email}</p>
                </div>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="rounded-lg bg-slate-100 p-2 text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl bg-slate-50 p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-slate-600">Full Name</span>
                    <span className="text-slate-900">{selectedUser.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-slate-600">Role</span>
                    <span className={`font-bold ${selectedUser.role === 'admin' ? 'text-amber-600' : 'text-slate-900'}`}>{selectedUser.role || 'user'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-slate-600">Joined</span>
                    <span className="text-slate-900">{new Date(selectedUser.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-slate-200">
                    <span className="font-semibold text-slate-600">User ID</span>
                    <span className="font-mono text-xs text-slate-500">{selectedUser._id}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {selectedUser.role !== "admin" ? (
                    <button
                      onClick={() => handleRoleChange(selectedUser._id, "admin")}
                      disabled={updating}
                      className="w-full rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-indigo-700 disabled:opacity-60 transition-colors"
                    >
                      Grant Admin Access
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRoleChange(selectedUser._id, "user")}
                      disabled={updating}
                      className="w-full rounded-xl bg-amber-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-amber-700 disabled:opacity-60 transition-colors"
                    >
                      Remove Admin Access
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setSelectedUser(null);
                      handleDelete(selectedUser._id);
                    }}
                    className="w-full rounded-xl bg-rose-50 px-4 py-2.5 text-sm font-bold text-rose-600 hover:bg-rose-100 transition-colors"
                  >
                    Delete User Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManager;


