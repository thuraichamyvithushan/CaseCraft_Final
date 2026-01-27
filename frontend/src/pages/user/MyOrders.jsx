import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../../components/UserSidebar.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { getMyOrders } from "../../api/orderApi.js";
import { Package, Clock, CheckCircle, X, Calendar, MapPin, Phone, Sparkles, UserCircle, ChevronLeft, ChevronRight } from "lucide-react";

const ORDERS_PER_PAGE = 5;

const MyOrders = () => {
  const navigate = useNavigate();
  const { token, isAuthenticated, user, formatName } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders(token);
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  useEffect(() => {
    setCurrentPage(1);
  }, [orders]);

  const totalPages = Math.ceil(orders.length / ORDERS_PER_PAGE);
  const paginatedOrders = orders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>
          <p className="text-slate-600 font-semibold">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto flex max-w-8xl flex-col gap-6 px-4 py-6 lg:py-8 md:flex-row">
        <UserSidebar />
        <main className="flex-1 space-y-6">
          {/* Header */}
          <div>
            <h1 className="bg-gradient-to-r from-[#02225b] to-[#02225b] bg-clip-text text-3xl font-bold text-transparent lg:text-4xl h-14">
              My Orders
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              View all your previous orders {orders.length > 0 && `(${orders.length} total)`}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden">
            {orders.length === 0 ? (
              <div className="p-12 text-center">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#02225b]/10 to-[#02225b]/10">
                  <Package className="h-12 w-12 text-[#02225b]" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-slate-800">No orders yet</h3>
                <p className="mb-8 text-slate-600">Start designing your custom phone cover today!</p>
                <button
                  onClick={() => navigate("/design")}
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#02225b] to-[#02225b] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-[#FFC107]/30 transition-all hover:shadow-xl hover:shadow-[#FFC107]/40"
                >
                  <Sparkles className="h-5 w-5" />
                  Create Your First Design
                </button>
              </div>
            ) : (
              <>
                <div className="divide-y divide-slate-100">
                  {paginatedOrders.map((order) => (
                    <div key={order._id} className="p-6 transition-all hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex flex-col sm:flex-row items-start gap-4 flex-1">
                          <div className="relative h-28 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 border-slate-200 bg-white shadow-sm">
                            <img
                              src={order.items?.[0]?.designImage || "/placeholder.png"}
                              alt="design preview"
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='150' viewBox='0 0 100 150'%3E%3Crect fill='%23f1f5f9' width='100' height='150'/%3E%3Ctext x='50' y='75' font-family='Arial' font-size='12' fill='%2394a3b8' text-anchor='middle'%3ENo Image%3C/text%3E%3C/svg%3E";
                              }}
                            />
                          </div>
                          <div className="flex-1 w-full">
                            <h3 className="text-xl font-bold text-slate-800">{order.items?.[0]?.productName || "Phone Case"}</h3>
                            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-4">
                              <p className="text-sm text-slate-500">
                                Order ID: <span className="font-mono font-semibold">#{order._id.slice(-8)}</span>
                              </p>
                              <p className="flex items-center gap-1 text-sm text-slate-500">
                                <Calendar className="h-4 w-4" />
                                {new Date(order.createdAt).toLocaleDateString()}
                              </p>
                              <p className="text-sm font-medium text-slate-700">
                                Quantity: {order.items?.[0]?.quantity || 1}
                              </p>
                              <p className="text-sm font-bold text-[#02225b]">
                                Price: ${order.items?.[0]?.price || 0}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 border-t sm:border-t-0 border-slate-100 pt-4 sm:pt-0">
                          <span
                            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${order.status === "confirmed"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                              }`}
                          >
                            {order.status === "confirmed" ? (
                              <CheckCircle className="h-3.5 w-3.5" />
                            ) : (
                              <Clock className="h-3.5 w-3.5" />
                            )}
                            {order.status || "pending"}
                          </span>
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="rounded-full bg-[#02225b] px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#02225b]/90 active:scale-95"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 p-6 sm:flex-row">
                    <p className="text-sm text-slate-600">
                      Showing {(currentPage - 1) * ORDERS_PER_PAGE + 1} to{" "}
                      {Math.min(currentPage * ORDERS_PER_PAGE, orders.length)} of {orders.length} orders
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                        className="flex items-center gap-1 rounded-lg border-2 border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </button>

                      <span className="px-4 py-2 text-sm font-semibold text-slate-800">
                        {currentPage} / {totalPages}
                      </span>

                      <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                        className="flex items-center gap-1 rounded-lg border-2 border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white"
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="my-auto md:my-8 w-full max-w-4xl rounded-3xl bg-white p-6 shadow-2xl md:p-8">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="bg-gradient-to-r from-[#02225b] to-[#FFC107] bg-clip-text text-xl font-bold text-transparent md:text-2xl">
                  Order Details
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  ID: <span className="font-mono font-semibold">#{selectedOrder._id.slice(-8)}</span>
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-full bg-slate-100 p-2 text-slate-600 transition-all hover:bg-slate-200 hover:text-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="relative overflow-hidden rounded-2xl bg-slate-50 border border-slate-100 p-4 md:p-8">
                <img
                  src={selectedOrder.items?.[0]?.designImage || "/placeholder.png"}
                  alt="full design"
                  className="relative z-10 mx-auto max-h-[300px] sm:max-h-[400px] md:max-h-[500px] w-full rounded-xl object-contain shadow-xl"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect fill='%23f8fafc' width='400' height='600'/%3E%3Ctext x='200' y='300' font-family='Arial' font-size='24' fill='%2394a3b8' text-anchor='middle'%3ENo Image Available%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>

              <div className="space-y-6">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 md:p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Phone Model</p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">{selectedOrder.items?.[0]?.productName || "Phone Case"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Quantity</p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">{selectedOrder.items?.[0]?.quantity || 1}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Status</p>
                      <span
                        className={`mt-1 inline-flex items-center gap-1 text-sm font-semibold ${selectedOrder.status === "confirmed"
                          ? "text-emerald-700"
                          : "text-amber-700"
                          }`}
                      >
                        {selectedOrder.status === "confirmed" ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Clock className="h-4 w-4" />
                        )}
                        {selectedOrder.status || "pending"}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Order Date</p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {new Date(selectedOrder.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-6">
                  <h3 className="mb-4 text-lg font-bold text-slate-800">Shipping Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <UserCircle className="h-5 w-5 flex-shrink-0 text-slate-400" />
                      <div className="flex-1">
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Name</p>
                        <p className="mt-1 text-sm text-slate-800">{formatName(user?.name)}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 flex-shrink-0 text-slate-400" />
                      <div className="flex-1">
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Address</p>
                        <p className="mt-1 text-sm text-slate-800">{selectedOrder.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 flex-shrink-0 text-slate-400" />
                      <div className="flex-1">
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Contact</p>
                        <p className="mt-1 text-sm text-slate-800">{selectedOrder.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
