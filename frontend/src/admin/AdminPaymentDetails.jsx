import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar.jsx";
import { getAdminOrders, getAdminStats } from "../api/adminApi.js";
import {
    CreditCard,
    Search,
    DollarSign,
    TrendingUp,
    CheckCircle2,
    Clock,
    ExternalLink,
    Calendar,
    ChevronLeft,
    ChevronRight
} from "lucide-react";

const ADMIN_STORAGE_KEY = "cpc_admin_token";

const AdminPaymentDetails = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [stats, setStats] = useState({ totalRevenue: 0 });
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({ pages: 1, total: 0 });

    const fetchData = useCallback(async () => {
        const token = localStorage.getItem(ADMIN_STORAGE_KEY);
        if (!token) {
            navigate("/admin/login");
            return;
        }

        setLoading(true);
        try {
            const [ordersData, statsData] = await Promise.all([
                getAdminOrders({ page, search, token }),
                getAdminStats(token)
            ]);
            setOrders(ordersData.data || []);
            setPagination(ordersData.pagination || { pages: 1, total: 0 });
            setStats(statsData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [navigate, page, search]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

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
                                    <CreditCard className="h-8 w-8" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-slate-900">Payment Details</h1>
                                    <p className="mt-1 text-sm text-slate-600">Monitor transactions and revenue</p>
                                </div>
                            </div>
                            <div className="relative flex-1 max-w-md">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                    <Search className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search by order ID or name..."
                                    className="w-full rounded-xl border-2 border-slate-100 bg-slate-50 py-3 pl-11 pr-4 text-sm transition-all focus:border-[#02225b] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#02225b]/10"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Financial Stats */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50 hover:shadow-xl transition-all duration-300">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-5 transition-opacity" />
                            <div className="relative flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Revenue</p>
                                    <p className="text-3xl font-bold text-slate-900">$ {stats.totalRevenue?.toLocaleString() || 0}</p>
                                </div>
                                <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 p-4 shadow-lg shadow-emerald-100">
                                    <DollarSign className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>
                        <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50 hover:shadow-xl transition-all duration-300">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#02225b] to-indigo-600 opacity-0 group-hover:opacity-5 transition-opacity" />
                            <div className="relative flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Transactions</p>
                                    <p className="text-3xl font-bold text-slate-900">{pagination.total || 0}</p>
                                </div>
                                <div className="rounded-xl bg-gradient-to-br from-[#02225b] to-indigo-600 p-4 shadow-lg shadow-indigo-100">
                                    <TrendingUp className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>
                        <div className="hidden lg:block group relative overflow-hidden rounded-2xl bg-[#02225b] p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-10 transition-opacity" />
                            <div className="relative flex items-center gap-4 text-white">
                                <div className="rounded-xl bg-white/20 p-3">
                                    <CheckCircle2 className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium opacity-80 uppercase tracking-wider">System Status</p>
                                    <p className="text-lg font-bold">Stripe Integrated</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Transactions Table */}
                    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/50 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Order ID</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Customer</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Status</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Amount</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Date</th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">Audit</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {loading ? (
                                        Array(5).fill(0).map((_, i) => (
                                            <tr key={i} className="animate-pulse">
                                                <td colSpan="6" className="px-6 py-8"><div className="h-10 bg-slate-50 rounded-lg w-full"></div></td>
                                            </tr>
                                        ))
                                    ) : orders.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-20 text-center">
                                                <p className="text-slate-400 font-medium">No transactions found</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        orders.map((order) => (
                                            <tr key={order._id} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <span className="font-mono text-xs text-slate-600">#{order._id.slice(-8)}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900">{order.fullName || order.userId?.name || "Anonymous"}</p>
                                                        <p className="text-xs text-slate-500">{order.email}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${order.status === 'confirmed'
                                                        ? 'bg-emerald-50 text-emerald-700'
                                                        : 'bg-amber-50 text-amber-700'
                                                        }`}>
                                                        {order.status === 'confirmed' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                                        {order.status || 'pending'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm font-black text-slate-900">$ {order.total || 0}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                                        <Calendar className="w-3.5 h-3.5" />
                                                        {new Date(order.createdAt).toLocaleDateString()}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => navigate(`/admin/orders`)}
                                                            className="p-2 rounded-lg bg-slate-50 text-[#02225b] hover:bg-slate-100 transition-colors border border-slate-100"
                                                            title="View Order Details"
                                                        >
                                                            <ExternalLink className="w-4 h-4" />
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
                            Showing <span className="text-slate-900">{orders.length}</span> of{" "}
                            <span className="text-slate-900">{pagination.total}</span> orders
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
        </div>
    );
};

export default AdminPaymentDetails;
