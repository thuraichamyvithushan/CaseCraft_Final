import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar.jsx";
import {
    adminCreatePhoneModel,
    adminDeletePhoneModel,
    adminAddTemplateToModel,
    adminRemoveTemplateFromModel,
    adminUpdateModelMockup,
    fetchPhoneModels
} from "../api/phoneModelApi.js";
import { Smartphone, Search, ChevronLeft, ChevronRight, Plus } from "lucide-react";

const ADMIN_STORAGE_KEY = "cpc_admin_token";

const PhoneModelManager = () => {
    const [models, setModels] = useState([]);
    const [form, setForm] = useState({ name: "", price: 0, category: "Apple", templateFile: null });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedModel, setSelectedModel] = useState(null);
    const [addingTemplate, setAddingTemplate] = useState(false);
    const [fetched, setFetched] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const itemsPerPage = 8;

    const loadModels = async () => {
        try {
            const data = await fetchPhoneModels();
            setModels(data);
        } catch (err) {
            console.error(err);
        } finally {
            setFetched(true);
        }
    };

    useEffect(() => {
        loadModels();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "templateFile") {
            setForm((prev) => ({ ...prev, templateFile: files?.[0] || null }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setError("");
        if (!form.templateFile) {
            setError("Please choose a template image.");
            return;
        }

        const token = localStorage.getItem(ADMIN_STORAGE_KEY);
        if (!token) {
            setError("Admin not authenticated.");
            return;
        }

        setLoading(true);
        try {
            const templateData = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(form.templateFile);
            });

            const autoKey = form.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');

            await adminCreatePhoneModel(
                {
                    name: form.name,
                    key: autoKey,
                    price: Number(form.price) || 0,
                    category: form.category,
                    templateImages: [templateData],
                },
                token
            );

            setForm({ name: "", price: 0, category: "Apple", templateFile: null });
            await loadModels();
        } catch (err) {
            setError(err.response?.data?.message || "Unable to create phone model");
        } finally {
            setLoading(false);
        }
    };

    const handleAddMultipleTemplates = async (modelId, files) => {
        if (!files || files.length === 0) return;

        const token = localStorage.getItem(ADMIN_STORAGE_KEY);
        if (!token) {
            setError("Admin not authenticated.");
            return;
        }

        setAddingTemplate(true);
        setError("");

        try {
            const filePromises = Array.from(files).map(
                (file) =>
                    new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result);
                        reader.onerror = reject;
                        reader.readAsDataURL(file);
                    })
            );

            const imageDataUrls = await Promise.all(filePromises);

            for (const imageData of imageDataUrls) {
                try {
                    await adminAddTemplateToModel(modelId, imageData, token);
                } catch (err) {
                    console.error("Error adding template:", err);
                    setError(err.response?.data?.message || "Some templates failed to add");
                }
            }

            await loadModels();
            setSelectedModel(null);
        } catch (err) {
            console.error(err);
            setError("Unable to read template images.");
        } finally {
            setAddingTemplate(false);
        }
    };

    const handleRemoveTemplate = async (modelId, templateIndex) => {
        const token = localStorage.getItem(ADMIN_STORAGE_KEY);
        if (!token) {
            setError("Admin not authenticated.");
            return;
        }

        if (!window.confirm("Remove this template?")) return;

        try {
            await adminRemoveTemplateFromModel(modelId, templateIndex, token);
            await loadModels();
            setSelectedModel(null);
        } catch (err) {
            console.error(err);
            setError("Unable to remove template.");
        }
    };


    const handleUpdateDetails = async (modelId, key, value) => {
        const token = localStorage.getItem(ADMIN_STORAGE_KEY);
        if (!token) return setError("Admin not authenticated.");

        setAddingTemplate(true);
        try {
            await adminUpdateModelMockup(
                modelId,
                undefined,
                selectedModel.coverArea,
                selectedModel.coverSize || { width: 300, height: 500 },
                token,
                key === 'name' ? value : selectedModel.name,
                key === 'price' ? Number(value) : selectedModel.price,
                selectedModel.cameraOverlay,
                key === 'category' ? value : selectedModel.category
            );

            const updated = { ...selectedModel, [key]: key === 'price' ? Number(value) : value };
            setSelectedModel(updated);

            await loadModels();
            setError("");
        } catch (err) {
            console.error(err);
            setError("Failed to update details");
        } finally {
            setAddingTemplate(false);
        }
    };


    const handleUpdateMockup = async (modelId, file) => {
        if (!file) return;

        const token = localStorage.getItem(ADMIN_STORAGE_KEY);
        if (!token) {
            setError("Admin not authenticated.");
            return;
        }

        setAddingTemplate(true);
        try {
            const reader = new FileReader();
            reader.onload = async () => {
                try {
                    const coverArea = {
                        x: 0.1,
                        y: 0.15,
                        width: 0.8,
                        height: 0.7
                    };
                    await adminUpdateModelMockup(
                        modelId,
                        reader.result,
                        coverArea,
                        selectedModel.coverSize || { width: 300, height: 500 },
                        token,
                        selectedModel.name,
                        selectedModel.price,
                        selectedModel.cameraOverlay
                    );
                    await loadModels();
                    setSelectedModel(null);
                } catch (err) {
                    setError(err.response?.data?.message || "Unable to update mockup");
                } finally {
                    setAddingTemplate(false);
                }
            };
            reader.readAsDataURL(file);
        } catch (err) {
            console.error(err);
            setError("Unable to read mockup image.");
            setAddingTemplate(false);
        }
    };


    const handleDelete = async (id) => {
        const token = localStorage.getItem(ADMIN_STORAGE_KEY);
        if (!token) {
            setError("Admin not authenticated.");
            return;
        }
        if (!window.confirm("Delete this phone model?")) return;
        try {
            await adminDeletePhoneModel(id, token);
            await loadModels();
        } catch (err) {
            console.error(err);
            setError("Unable to delete phone model.");
        }
    };

    const getTemplates = (model) => {
        return model.templateImages && model.templateImages.length > 0
            ? model.templateImages
            : model.templateImage
                ? [model.templateImage]
                : [];
    };

    // Filtering and Pagination Logic
    const filteredModels = models.filter(model =>
        (selectedCategory === "All" || model.category === selectedCategory) &&
        (model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            model.key.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedModels = filteredModels.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredModels.length / itemsPerPage);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="mx-auto flex max-w-8xl flex-col gap-6 px-4 py-6 lg:py-8 md:flex-row">
                <AdminSidebar />

                <main className="flex-1 space-y-6">
                    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div className="flex items-center gap-4">
                                <div className="rounded-xl bg-gradient-to-br from-[#02225b] to-indigo-600 p-3 text-white">
                                    <Smartphone className="h-8 w-8" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-slate-900">Phone Model Manager</h1>
                                    <p className="mt-1 text-sm text-slate-600">Create and manage phone models with custom templates</p>
                                </div>
                            </div>
                            <div className="relative flex-1 max-w-md">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                    <Search className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search by name or key..."
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="w-full rounded-xl border-2 border-slate-100 bg-slate-50 py-3 pl-11 pr-4 text-sm transition-all focus:border-[#02225b] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#02225b]/10"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-600">Total Models</p>
                                    <p className="mt-1 text-3xl font-bold text-slate-900">{models.length}</p>
                                </div>
                                <div className="rounded-xl bg-indigo-50 p-3">
                                    <svg className="h-6 w-6 text-[#02225b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-600">Total Templates</p>
                                    <p className="mt-1 text-3xl font-bold text-emerald-600">
                                        {models.reduce((sum, m) => sum + getTemplates(m).length, 0)}
                                    </p>
                                </div>
                                <div className="rounded-xl bg-emerald-50 p-3">
                                    <svg className="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50 sm:col-span-2 lg:col-span-1">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-600">Avg Templates</p>
                                    <p className="mt-1 text-3xl font-bold text-[#FFC107]">
                                        {models.length > 0
                                            ? (models.reduce((sum, m) => sum + getTemplates(m).length, 0) / models.length).toFixed(1)
                                            : 0}
                                    </p>
                                </div>
                                <div className="rounded-xl bg-[#FFC107]/5 p-3">
                                    <svg className="h-6 w-6 text-[#FFC107]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Create Form */}
                    <form
                        onSubmit={handleCreate}
                        className="space-y-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50 lg:p-8"
                    >
                        <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                            <div className="rounded-lg bg-[#02225b]/10 p-2">
                                <svg className="h-5 w-5 text-[#02225b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-900">Add New Phone Model</h2>
                                <p className="text-sm text-slate-500">Fill in the details to create a new model</p>
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Display Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="e.g. iPhone 15 Pro"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm transition-colors focus:border-[#02225b] focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Price ($)</label>
                                <input
                                    type="number"
                                    name="price"
                                    min="0"
                                    placeholder="0"
                                    value={form.price}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm transition-colors focus:border-[#02225b] focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Category</label>
                                <select
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm transition-colors focus:border-[#02225b] focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                    required
                                >
                                    <option value="Apple">Apple</option>
                                    <option value="Samsung">Samsung</option>
                                    <option value="Google">Google</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Template Image</label>
                                <input
                                    type="file"
                                    name="templateFile"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="w-full cursor-pointer rounded-xl border-2 border-dashed border-slate-300 px-4 py-3 text-sm transition-colors hover:border-indigo-400 focus:border-[#02225b] focus:outline-none"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="rounded-xl bg-rose-50 border-2 border-rose-200 p-4">
                                <div className="flex items-center gap-2">
                                    <svg className="h-5 w-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-sm font-medium text-rose-800">{error}</p>
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#02225b] to-[#02225b] px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <svg className="h-4 w-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating Model...
                                </>
                            ) : (
                                <>
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Add Phone Model
                                </>
                            )}
                        </button>
                    </form>

                    {/* Category Filter Tabs */}
                    <div className="flex items-center gap-3 overflow-x-auto p-2 scrollbar-hide">
                        {["All", "Apple", "Samsung", "Google"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setSelectedCategory(cat);
                                    setCurrentPage(1);
                                }}
                                className={`
                                    flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all
                                    ${selectedCategory === cat
                                        ? "bg-[#02225b] text-white shadow-lg shadow-indigo-200 ring-2 ring-[#02225b] ring-offset-2"
                                        : "bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-slate-200 shadow-sm"}
                                `}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/50">
                        <div className="hidden overflow-x-auto lg:block">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Preview</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Name</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Key</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Templates</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Price</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Category</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Created</th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {!fetched ? (
                                        <tr>
                                            <td colSpan="8" className="px-6 py-12 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <svg className="h-5 w-5 animate-spin text-[#02225b]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    <span className="text-sm text-slate-600">Loading models...</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : filteredModels.length === 0 ? (
                                        <tr>
                                            <td colSpan="8" className="px-6 py-12 text-center">
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className="rounded-full bg-slate-100 p-4">
                                                        <svg className="h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-slate-900">No phone models yet</p>
                                                        <p className="mt-1 text-xs text-slate-500">Create your first phone model above</p>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        paginatedModels.map((m) => {
                                            const templates = getTemplates(m);
                                            const firstTemplate = templates[0] || m.templateImage;
                                            return (
                                                <tr key={m._id} className="transition-colors hover:bg-slate-50">
                                                    <td className="px-6 py-4">
                                                        <div className="relative">
                                                            <img
                                                                src={firstTemplate}
                                                                alt={m.name}
                                                                className="h-20 w-14 rounded-lg border-2 border-slate-200 object-cover shadow-sm"
                                                            />
                                                            {templates.length > 1 && (
                                                                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#02225b] text-xs font-bold text-white ring-2 ring-white">
                                                                    {templates.length}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="font-semibold text-slate-900">{m.name}</p>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <code className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700">{m.key}</code>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                                                            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                            {templates.length}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-sm font-bold text-slate-900">$ {m.price || 0}</p>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${m.category === 'Apple' ? 'bg-slate-100 text-slate-700' : m.category === 'Samsung' ? 'bg-blue-50 text-blue-700' : 'bg-orange-50 text-orange-700'}`}>
                                                            {m.category || "Apple"}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-sm text-slate-600">
                                                            {m.createdAt ? new Date(m.createdAt).toLocaleDateString() : "-"}
                                                        </p>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button
                                                                onClick={() => setSelectedModel(m)}
                                                                className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 transition-colors hover:bg-[#02225b]/10"
                                                            >
                                                                Manage
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(m._id)}
                                                                className="rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-100"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                            {/* Pagination */}
                            <div className="flex flex-col items-center justify-between gap-4 py-4 px-6 border-t border-slate-100 sm:flex-row">
                                <p className="text-sm font-medium text-slate-500">
                                    Showing <span className="text-slate-900">{startIndex + 1}</span> to <span className="text-slate-900">{Math.min(endIndex, filteredModels.length)}</span> of{" "}
                                    <span className="text-slate-900">{filteredModels.length}</span> results
                                </p>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 transition-all hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:hover:bg-white"
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </button>

                                    <div className="flex items-center gap-1.5">
                                        {Array.from({ length: Math.min(5, totalPages || 1) }, (_, i) => {
                                            const pageNum = i + 1;
                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => setCurrentPage(pageNum)}
                                                    className={`h-10 min-w-[40px] rounded-xl px-3 text-sm font-bold transition-all ${currentPage === pageNum
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
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages || totalPages === 0}
                                        className="flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 transition-all hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:hover:bg-white"
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Card View */}
                        <div className="block space-y-4 p-4 lg:hidden">
                            {!fetched ? (
                                <div className="flex items-center justify-center py-12">
                                    <div className="flex items-center gap-2">
                                        <svg className="h-5 w-5 animate-spin text-[#02225b]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span className="text-sm text-slate-600">Loading models...</span>
                                    </div>
                                </div>
                            ) : filteredModels.length === 0 ? (
                                <div className="flex flex-col items-center gap-3 py-12">
                                    <div className="rounded-full bg-slate-100 p-4">
                                        <svg className="h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-semibold text-slate-900">No phone models yet</p>
                                        <p className="mt-1 text-xs text-slate-500">Create your first phone model above</p>
                                    </div>
                                </div>
                            ) : (
                                paginatedModels.map((m) => {
                                    const templates = getTemplates(m);
                                    const firstTemplate = templates[0] || m.templateImage;
                                    return (
                                        <div key={m._id} className="rounded-xl border-2 border-slate-200 bg-white p-4 shadow-sm">
                                            <div className="flex gap-4">
                                                <div className="relative flex-shrink-0">
                                                    <img
                                                        src={firstTemplate}
                                                        alt={m.name}
                                                        className="h-24 w-16 rounded-lg border-2 border-slate-200 object-cover"
                                                    />
                                                    {templates.length > 1 && (
                                                        <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#02225b] text-xs font-bold text-white ring-2 ring-white">
                                                            {templates.length}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex-1 space-y-2">
                                                    <div>
                                                        <h3 className="font-bold text-slate-900">{m.name}</h3>
                                                        <code className="mt-1 inline-block rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-700">{m.key}</code>
                                                    </div>
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                                                            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                            {templates.length}
                                                        </span>
                                                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${m.category === 'Apple' ? 'bg-slate-100 text-slate-700' : m.category === 'Samsung' ? 'bg-blue-50 text-blue-700' : 'bg-orange-50 text-orange-700'}`}>
                                                            {m.category || "Apple"}
                                                        </span>
                                                        <span className="text-sm font-bold text-slate-900">$ {m.price || 0}</span>
                                                    </div>
                                                    <p className="text-xs text-slate-500">
                                                        {m.createdAt ? new Date(m.createdAt).toLocaleDateString() : "-"}
                                                    </p>
                                                    <div className="flex gap-2 pt-2">
                                                        <button
                                                            onClick={() => setSelectedModel(m)}
                                                            className="flex-1 rounded-lg bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700 transition-colors hover:bg-[#02225b]/10"
                                                        >
                                                            Manage
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(m._id)}
                                                            className="flex-1 rounded-lg bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-100"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                            {/* Mobile Pagination Controls */}
                            {filteredModels.length > itemsPerPage && (
                                <div className="flex items-center justify-between border-t border-slate-200 bg-white px-4 py-3">
                                    <p className="text-xs text-slate-700">
                                        Showing <span className="font-medium">{filteredModels.length > 0 ? startIndex + 1 : 0}</span> to{" "}
                                        <span className="font-medium">{Math.min(endIndex, filteredModels.length)}</span> of{" "}
                                        <span className="font-medium">{filteredModels.length}</span> results
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                            className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            Previous
                                        </button>
                                        <span className="text-xs font-medium text-slate-700">
                                            Page {currentPage} of {totalPages}
                                        </span>
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                            className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>

            {/* Manage Model Modal */}
            {selectedModel && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm">
                    <div className="flex min-h-screen items-center justify-center p-4">
                        <div className="relative w-full max-w-4xl rounded-3xl bg-white shadow-2xl">
                            {/* Modal Header */}
                            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/95 px-6 py-5 backdrop-blur-sm rounded-t-3xl lg:px-8">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-2.5">
                                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900">Manage Templates</h2>
                                        <p className="text-sm text-slate-500">{selectedModel.name}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        setSelectedModel(null);
                                    }}
                                    className="rounded-xl bg-slate-100 p-2.5 text-slate-600 transition-all hover:bg-slate-200 hover:rotate-90"
                                >
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="max-h-[calc(100vh-12rem)] overflow-y-auto p-6 lg:p-8">
                                <div className="space-y-6">
                                    {/* Product Details Section */}
                                    <div className="rounded-2xl border-2 border-slate-200 bg-white p-6">
                                        <div className="mb-4 flex items-center gap-2">
                                            <svg className="h-5 w-5 text-[#02225b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">Product Details</h3>
                                        </div>
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-700">Name</label>
                                                <input
                                                    type="text"
                                                    value={selectedModel.name}
                                                    onChange={(e) => handleUpdateDetails(selectedModel._id, 'name', e.target.value)}
                                                    className="w-full rounded-xl border-2 border-slate-300 px-4 py-3 text-sm transition-colors focus:border-[#02225b] focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-700">Price ($)</label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={selectedModel.price || 0}
                                                    onChange={(e) => handleUpdateDetails(selectedModel._id, 'price', e.target.value)}
                                                    className="w-full rounded-xl border-2 border-slate-300 px-4 py-3 text-sm transition-colors focus:border-[#02225b] focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-700">Category</label>
                                                <select
                                                    value={selectedModel.category || "Apple"}
                                                    onChange={(e) => handleUpdateDetails(selectedModel._id, 'category', e.target.value)}
                                                    className="w-full rounded-xl border-2 border-slate-300 px-4 py-3 text-sm transition-colors focus:border-[#02225b] focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                                >
                                                    <option value="Apple">Apple</option>
                                                    <option value="Samsung">Samsung</option>
                                                    <option value="Google">Google</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Add Templates Section */}
                                    <div className="rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-[#02225b]/10 to-[#02225b]/10 p-6">
                                        <div className="mb-4 flex items-center gap-2">
                                            <svg className="h-5 w-5 text-[#02225b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">Add New Templates</h3>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={(e) => {
                                                const files = e.target.files;
                                                if (files && files.length > 0) {
                                                    handleAddMultipleTemplates(selectedModel._id, files);
                                                }
                                            }}
                                            className="w-full cursor-pointer rounded-xl border-2 border-dashed border-indigo-300 bg-white px-4 py-4 text-sm transition-colors hover:border-[#02225b] focus:border-[#02225b] focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                                            disabled={addingTemplate}
                                        />
                                        <p className="mt-2 flex items-center gap-2 text-xs text-slate-600">
                                            {addingTemplate ? (
                                                <>
                                                    <svg className="h-4 w-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Uploading templates...
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    Select multiple images to upload at once
                                                </>
                                            )}
                                        </p>
                                    </div>

                                    {/* Mockup Section */}
                                    <div className="rounded-2xl border-2 border-slate-200 bg-white p-6">
                                        <div className="mb-4 flex items-center gap-2">
                                            <svg className="h-5 w-5 text-[#FFC107]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                            </svg>
                                            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">Phone Mockup</h3>
                                        </div>
                                        <p className="mb-4 text-sm text-slate-600">
                                            Upload a full phone mockup image. User designs will fit the cover area.
                                        </p>
                                        {selectedModel.mockupImage && (
                                            <div className="mb-4 flex items-center gap-4 rounded-xl border-2 border-purple-200 bg-[#FFC107]/5 p-4">
                                                <img
                                                    src={selectedModel.mockupImage}
                                                    alt="Mockup"
                                                    className="h-28 w-20 rounded-lg border-2 border-purple-300 object-cover shadow-sm"
                                                />
                                                <div className="flex-1">
                                                    <p className="font-semibold text-slate-900">Current Mockup</p>
                                                    <p className="text-xs text-slate-600">Full phone with cover area defined</p>
                                                </div>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    handleUpdateMockup(selectedModel._id, file);
                                                }
                                            }}
                                            className="w-full cursor-pointer rounded-xl border-2 border-dashed border-slate-300 bg-white px-4 py-4 text-sm transition-colors hover:border-purple-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                                            disabled={addingTemplate}
                                        />
                                    </div>



                                    {/* Templates List */}
                                    <div className="rounded-2xl border-2 border-slate-200 bg-white p-6">
                                        <div className="mb-4 flex items-center gap-2">
                                            <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
                                                Existing Templates ({getTemplates(selectedModel).length})
                                            </h3>
                                        </div>

                                        {getTemplates(selectedModel).length === 0 ? (
                                            <div className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 py-12">
                                                <svg className="h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <div className="text-center">
                                                    <p className="text-sm font-semibold text-slate-700">No templates yet</p>
                                                    <p className="mt-1 text-xs text-slate-500">Add templates using the section above</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                                {getTemplates(selectedModel).map((template, index) => (
                                                    <div
                                                        key={index}
                                                        className="group relative overflow-hidden rounded-xl border-2 border-slate-200 bg-white transition-all hover:border-indigo-300 hover:shadow-lg"
                                                    >
                                                        <div className="aspect-[3/4] overflow-hidden bg-slate-50">
                                                            <img
                                                                src={template}
                                                                alt={`Template ${index + 1}`}
                                                                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                                            />
                                                        </div>
                                                        <div className="p-3">
                                                            <p className="text-sm font-semibold text-slate-900">Template {index + 1}</p>
                                                            <p className="text-xs text-slate-500">Cover design option</p>
                                                            <button
                                                                onClick={() => handleRemoveTemplate(selectedModel._id, index)}
                                                                className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-100"
                                                            >
                                                                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
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

export default PhoneModelManager;
