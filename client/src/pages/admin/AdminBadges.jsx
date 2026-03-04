import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Award, Image } from "lucide-react";
import { getAllBadgesAdmin, addBadgeAdmin } from "../../apiCalls/quickApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AdminBadges = () => {
    const [badges, setBadges] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const { categories } = useSelector((state) => state.category);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: "",
        category: "",
        criteria: 1,
    });

    const fetchBadges = async () => {
        try {
            const res = await getAllBadgesAdmin();
            if (res.isSuccess) setBadges(res.badges);
        } catch (err) {
            toast.error("Failed to fetch badges");
        }
    };

    useEffect(() => {
        fetchBadges();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await addBadgeAdmin(formData);
            if (res.isSuccess) {
                toast.success("Badge created successfully");
                setShowModal(false);
                fetchBadges();
                setFormData({ name: "", description: "", image: "", category: "", criteria: 1 });
            }
        } catch (err) {
            toast.error(err.message || "Failed to create badge");
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <h3 className="text-xl font-bold text-gray-800">Manage Badges</h3>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center justify-center gap-2 bg-[#065f46] text-white px-4 py-2 rounded hover:bg-[#064e3b] transition w-full sm:w-auto"
                >
                    <Plus size={18} /> Add Badge
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {badges.map((b) => (
                    <div key={b._id} className="border rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition">
                        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center border">
                            {b.image ? <img src={b.image} alt={b.name} className="w-10 h-10 object-contain" /> : <Award className="text-green-600" />}
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-800">{b.name}</h4>
                            <p className="text-xs text-gray-500">{b.category?.name} • {b.criteria} Quicks</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button className="text-gray-400 hover:text-blue-600"><Edit size={16} /></button>
                            <button className="text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[100] p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
                        <div className="p-6 border-b flex justify-between items-center">
                            <h4 className="text-lg font-bold">Create New Badge</h4>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Badge Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-green-500"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select
                                        required
                                        className="w-full border rounded-lg p-2 outline-none"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map(c => (
                                            <option key={c._id} value={c._id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Quicks Required</label>
                                    <input
                                        type="number"
                                        min="1"
                                        className="w-full border rounded-lg p-2 outline-none"
                                        value={formData.criteria}
                                        onChange={(e) => setFormData({ ...formData, criteria: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Icon URL (Optional)</label>
                                <input
                                    type="url"
                                    className="w-full border rounded-lg p-2 outline-none"
                                    placeholder="https://example.com/badge.png"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    rows="2"
                                    className="w-full border rounded-lg p-2 outline-none"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                ></textarea>
                            </div>
                            <button type="submit" className="w-full bg-[#065f46] text-white py-2 rounded-lg font-bold hover:bg-[#064e3b] transition mt-4">
                                Create Badge
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminBadges;
