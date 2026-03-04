import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Video, FileText } from "lucide-react";
import { getAllQuicksAdmin, addQuickAdmin } from "../../apiCalls/quickApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AdminQuicks = () => {
    const [quicks, setQuicks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const { categories } = useSelector((state) => state.category);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        videoUrl: "",
        content: "",
        points: 10,
        category: "",
    });

    const fetchQuicks = async () => {
        try {
            const res = await getAllQuicksAdmin();
            if (res.isSuccess) setQuicks(res.quicks);
        } catch (err) {
            toast.error("Failed to fetch quicks");
        }
    };

    useEffect(() => {
        fetchQuicks();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await addQuickAdmin(formData);
            if (res.isSuccess) {
                toast.success("Quick added successfully");
                setShowModal(false);
                fetchQuicks();
                setFormData({ title: "", description: "", videoUrl: "", content: "", points: 10, category: "" });
            }
        } catch (err) {
            toast.error(err.message || "Failed to add quick");
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <h3 className="text-xl font-bold text-gray-800">Manage Quicks</h3>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full sm:w-auto"
                >
                    <Plus size={18} /> Add Quick
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b">
                            <th className="p-3 text-sm font-semibold text-gray-600">Title</th>
                            <th className="p-3 text-sm font-semibold text-gray-600">Category</th>
                            <th className="p-3 text-sm font-semibold text-gray-600">Points</th>
                            <th className="p-3 text-sm font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quicks.map((q) => (
                            <tr key={q._id} className="border-b hover:bg-gray-50">
                                <td className="p-3 text-sm text-gray-800 font-medium">{q.title}</td>
                                <td className="p-3 text-sm text-gray-600">{q.category?.name}</td>
                                <td className="p-3 text-sm text-gray-600">{q.points}</td>
                                <td className="p-3 text-sm flex gap-3">
                                    <button className="text-blue-600 hover:text-blue-800"><Edit size={16} /></button>
                                    <button className="text-red-600 hover:text-red-800"><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[100] p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
                        <div className="p-6 border-b flex justify-between items-center">
                            <h4 className="text-lg font-bold">Add New Quick</h4>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Points</label>
                                    <input
                                        type="number"
                                        className="w-full border rounded-lg p-2 outline-none"
                                        value={formData.points}
                                        onChange={(e) => setFormData({ ...formData, points: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Video URL (Optional)</label>
                                <input
                                    type="url"
                                    className="w-full border rounded-lg p-2 outline-none"
                                    value={formData.videoUrl}
                                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    required
                                    rows="3"
                                    className="w-full border rounded-lg p-2 outline-none"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                ></textarea>
                            </div>
                            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition mt-4">
                                Create Quick
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminQuicks;
