import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar.jsx";
import { getContactMessages, updateMessageStatus, deleteContactMessage } from "../api/contactApi.js";
import {
    Mail,
    Search,
    Trash2,
    CheckCircle2,
    MessageSquare,
    Calendar,
    X,
    Clock,
    Reply,
    Phone
} from "lucide-react";

const ADMIN_STORAGE_KEY = "cpc_admin_token";

const ContactMessages = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [updating, setUpdating] = useState(false);
    const [filter, setFilter] = useState("all");

    const fetchMessages = useCallback(async () => {
        const token = localStorage.getItem(ADMIN_STORAGE_KEY);
        if (!token) {
            navigate("/admin/login");
            return;
        }

        setLoading(true);
        try {
            const data = await getContactMessages(token);
            setMessages(data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    const handleStatusChange = async (msgId, newStatus) => {
        const token = localStorage.getItem(ADMIN_STORAGE_KEY);
        if (!token) return;

        setUpdating(true);
        try {
            await updateMessageStatus(msgId, newStatus, token);
            await fetchMessages();
            if (selectedMessage && selectedMessage._id === msgId) {
                setSelectedMessage({ ...selectedMessage, status: newStatus });
            }
        } catch (error) {
            console.error(error);
            alert("Failed to update status");
        } finally {
            setUpdating(false);
        }
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem(ADMIN_STORAGE_KEY);
        if (!token) return;

        if (!window.confirm("Delete this message?")) return;

        try {
            await deleteContactMessage(id, token);
            await fetchMessages();
            setSelectedMessage(null);
        } catch (error) {
            console.error(error);
            alert("Failed to delete message");
        }
    };

    const filteredMessages = messages.filter(msg => {
        const matchesSearch = msg.name.toLowerCase().includes(search.toLowerCase()) ||
            msg.email.toLowerCase().includes(search.toLowerCase()) ||
            msg.comment.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === "all" || msg.status === filter;
        return matchesSearch && matchesFilter;
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case "replied":
                return <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"><CheckCircle2 className="w-3 h-3" /> Replied</span>;
            case "read":
                return <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700"><Clock className="w-3 h-3" /> Read</span>;
            default:
                return <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 animate-pulse"><Clock className="w-3 h-3" /> New</span>;
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
                                    <Mail className="h-8 w-8" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-slate-900">Messages</h1>
                                    <p className="mt-1 text-sm text-slate-600">Manage incoming customer inquiries</p>
                                </div>
                            </div>
                            <div className="relative flex-1 max-w-md">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                    <Search className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search messages..."
                                    className="w-full rounded-xl border-2 border-slate-100 bg-slate-50 py-3 pl-11 pr-4 text-sm transition-all focus:border-[#02225b] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#02225b]/10"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex gap-2 pb-2 overflow-x-auto scrollbar-hide">
                        {["all", "new", "read", "replied"].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${filter === f
                                    ? "bg-[#02225b] text-white ring-2 ring-[#02225b] ring-offset-2"
                                    : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-200 hover:text-slate-900"
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    {/* Table Container */}
                    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/50 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Sender</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Preview</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Status</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Date</th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {loading ? (
                                        Array(5).fill(0).map((_, i) => (
                                            <tr key={i} className="animate-pulse">
                                                <td colSpan="5" className="px-6 py-8"><div className="h-10 bg-slate-50 rounded-lg w-full"></div></td>
                                            </tr>
                                        ))
                                    ) : filteredMessages.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-20 text-center">
                                                <div className="flex flex-col items-center gap-3 text-slate-400">
                                                    <div className="rounded-full bg-slate-50 p-4">
                                                        <Mail className="w-12 h-12 opacity-20" />
                                                    </div>
                                                    <p className="font-semibold text-sm">No messages found</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredMessages.map((msg) => (
                                            <tr
                                                key={msg._id}
                                                className="hover:bg-slate-50 transition-colors cursor-pointer"
                                                onClick={() => setSelectedMessage(msg)}
                                            >
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <p className={`text-slate-900 ${msg.status === 'new' ? 'font-bold' : ''}`}>{msg.name}</p>
                                                        <p className="text-xs text-slate-500">{msg.email}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm text-slate-600 truncate max-w-[200px] lg:max-w-md italic">
                                                        "{msg.comment}"
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {getStatusBadge(msg.status)}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {new Date(msg.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleDelete(msg._id); }}
                                                        className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>

            {/* Message Detail Modal */}
            {selectedMessage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between border-b border-slate-100 p-6 lg:p-8">
                            <div className="flex items-center gap-4">
                                <div className="h-14 w-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#02225b] to-indigo-600 text-xl font-bold text-white shadow-lg">
                                    {selectedMessage.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">{selectedMessage.name}</h2>
                                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-slate-500 mt-1">
                                        <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-indigo-500" />{selectedMessage.email}</span>
                                        {selectedMessage.phone && <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[#FFC107]" />{selectedMessage.phone}</span>}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedMessage(null)}
                                className="p-3 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-all hover:rotate-90 group"
                            >
                                <X className="w-5 h-5 group-hover:text-slate-700" />
                            </button>
                        </div>

                        <div className="p-6 lg:p-8 space-y-6">
                            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/50">
                                <div className="flex items-center gap-2 mb-4 text-[#02225b]">
                                    <MessageSquare className="w-4 h-4" />
                                    <span className="text-xs font-bold uppercase tracking-widest opacity-60">Customer Message</span>
                                </div>
                                <p className="text-slate-800 leading-relaxed text-lg whitespace-pre-wrap italic">
                                    "{selectedMessage.comment}"
                                </p>
                                <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-400">
                                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{new Date(selectedMessage.createdAt).toLocaleString()}</span>
                                    <span className="uppercase tracking-widest">Status: {selectedMessage.status}</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {selectedMessage.status === 'new' && (
                                    <button
                                        onClick={() => handleStatusChange(selectedMessage._id, 'read')}
                                        disabled={updating}
                                        className="flex-1 min-w-[140px] bg-indigo-50 text-indigo-700 py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-indigo-100 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Clock className="w-4 h-4" /> Mark as Read
                                    </button>
                                )}
                                {selectedMessage.status !== 'replied' && (
                                    <button
                                        onClick={() => handleStatusChange(selectedMessage._id, 'replied')}
                                        disabled={updating}
                                        className="flex-1 min-w-[140px] bg-emerald-50 text-emerald-700 py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-emerald-100 transition-all flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle2 className="w-4 h-4" /> Mark Replied
                                    </button>
                                )}
                                <a
                                    href={`mailto:${selectedMessage.email}?subject=Re: Inquiry from CaseCraft`}
                                    className="flex-1 min-w-[140px] bg-[#02225b] text-white py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
                                >
                                    <Reply className="w-4 h-4" /> Compose Reply
                                </a>
                                <button
                                    onClick={() => handleDelete(selectedMessage._id)}
                                    className="bg-rose-50 text-rose-500 p-3.5 rounded-xl hover:bg-rose-500 hover:text-white transition-all border border-rose-100"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactMessages;
