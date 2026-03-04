import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuicksByCategory, submitCompleteQuick, clearResult } from "../stores/slices/quickSlice";
import { toast } from "react-toastify";
import { CheckCircle, PlayCircle, Star, Award } from "lucide-react";
import Skeleton from "../components/ui/Skeleton";

const QuicksPage = () => {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.category);
    const { quicks, loading, lastCompletedResult } = useSelector((state) => state.quicks);
    const user = useSelector((state) => state.auth.user);

    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        if (categories.length > 0 && !selectedCategory) {
            setSelectedCategory(categories[0]._id);
        }
    }, [categories, selectedCategory]);

    useEffect(() => {
        if (selectedCategory) {
            dispatch(fetchQuicksByCategory(selectedCategory));
        }
    }, [selectedCategory, dispatch]);

    useEffect(() => {
        if (lastCompletedResult) {
            if (lastCompletedResult.isSuccess) {
                toast.success(`Completed! +${lastCompletedResult.pointsAwarded} points`);
                if (lastCompletedResult.newBadges?.length > 0) {
                    toast.info(`New Badge Earned: ${lastCompletedResult.newBadges[0].name}!`, {
                        icon: <Award className="text-yellow-500" />
                    });
                }
            }
            dispatch(clearResult());
            dispatch(fetchQuicksByCategory(selectedCategory)); // Refresh list to update completion status
        }
    }, [lastCompletedResult, dispatch, selectedCategory]);

    const handleComplete = (quickId) => {
        dispatch(submitCompleteQuick(quickId));
    };

    return (
        <div className="min-h-screen px-4 py-6 mt-16 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Learning Quicks</h2>
                <p className="text-gray-600 mb-8">Master new skills with bite-sized learning and earn rewards!</p>

                {/* Category Tabs */}
                <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat._id}
                            onClick={() => setSelectedCategory(cat._id)}
                            className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${selectedCategory === cat._id
                                ? "bg-green-600 text-white shadow-md"
                                : "bg-white text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Quicks Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {loading ? (
                        <>
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="bg-white rounded-xl shadow-sm p-6 border border-emerald-100">
                                    <Skeleton width="60px" height="20px" className="mb-4" />
                                    <Skeleton width="80%" height="24px" className="mb-4" />
                                    <Skeleton width="100%" height="14px" className="mb-2" />
                                    <Skeleton width="100%" height="14px" className="mb-6" />
                                    <div className="flex justify-between">
                                        <Skeleton width="30%" height="18px" />
                                        <Skeleton width="40%" height="32px" borderRadius="8px" />
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : quicks.length > 0 ? (
                        quicks.map((quick) => {
                            const isCompleted = user?.completedQuicks?.includes(quick._id);
                            return (
                                <div key={quick._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 border border-gray-100">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">
                                            +{quick.points} Points
                                        </div>
                                        {isCompleted && (
                                            <CheckCircle className="text-green-500" size={20} />
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{quick.title}</h3>
                                    <p className="text-gray-600 text-sm mb-6 line-clamp-3">{quick.description}</p>

                                    <div className="flex items-center justify-between mt-auto">
                                        <button
                                            className="flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold"
                                            onClick={() => window.open(quick.videoUrl, '_blank')}
                                        >
                                            <PlayCircle size={18} /> Watch
                                        </button>
                                        {!isCompleted ? (
                                            <button
                                                onClick={() => handleComplete(quick._id)}
                                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                                            >
                                                Mark Complete
                                            </button>
                                        ) : (
                                            <span className="text-gray-400 text-sm font-medium flex items-center gap-1">
                                                <CheckCircle size={14} /> Completed
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-span-full text-center py-20 text-gray-400">
                            No quicks found for this category yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuicksPage;
