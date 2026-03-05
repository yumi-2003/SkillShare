import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchSkillPathById, updateSkillProgress, clearSkillPathMessage } from "../stores/slices/skillPathSlice";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

const SkillRoadmapDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { currentSkillPath, progress, loading, error, message } = useSelector((state) => state.skillPath);
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        dispatch(fetchSkillPathById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (message && message.includes("Congratulations")) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 5000);
            dispatch(clearSkillPathMessage());
        }
    }, [message, dispatch]);

    const handleMarkComplete = (type, itemId) => {
        dispatch(updateSkillProgress({
            skillPathId: id,
            [type === "course" ? "courseId" : "quickId"]: itemId
        }));
    };

    if (loading && !currentSkillPath) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (!currentSkillPath) return null;

    const contentItems = [
        ...(currentSkillPath.courses || []).map(c => ({ ...c, type: "course" })),
        ...(currentSkillPath.quicks || []).map(q => ({ ...q, type: "quick" }))
    ];

    const percentage = progress?.percentage || 0;

    return (
        <div className="bg-gray-50 min-h-screen pt-32 pb-12">
            {showConfetti && <Confetti />}

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                    <div className="h-40 bg-indigo-600 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-90"></div>
                        <div className="absolute bottom-[-40px] left-8">
                            <img
                                src={currentSkillPath.image || "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=200"}
                                className="w-24 h-24 md:w-32 md:h-32 rounded-2xl border-4 border-white shadow-lg object-cover bg-white"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="pt-14 pb-8 px-8 flex justify-between items-end flex-wrap gap-4">
                        <div>
                            <h1 className="text-3xl font-black text-gray-900">{currentSkillPath.title}</h1>
                            <p className="text-gray-500 mt-1 max-w-xl">{currentSkillPath.description}</p>
                        </div>
                        <div className="text-right">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-indigo-50 text-indigo-700">
                                {currentSkillPath.difficulty}
                            </span>
                        </div>
                    </div>

                    <div className="px-8 pb-8">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">Overall Progress</span>
                            <span className="text-2xl font-black text-indigo-600">{percentage}%</span>
                        </div>
                        <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.3)]"
                            ></motion.div>
                        </div>
                    </div>
                </div>

                {/* Roadmap Items */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-800 ml-2">Learning Path</h2>
                    {contentItems.map((item, index) => {
                        const isCompleted = item.type === "course"
                            ? progress?.completedCourses?.includes(item._id)
                            : progress?.completedQuicks?.includes(item._id);

                        // Lock logic: disable if previous item is not completed
                        let isLocked = false;
                        if (index > 0) {
                            const prevItem = contentItems[index - 1];
                            const prevCompleted = prevItem.type === "course"
                                ? progress?.completedCourses?.includes(prevItem._id)
                                : progress?.completedQuicks?.includes(prevItem._id);
                            isLocked = !prevCompleted;
                        }

                        return (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`group relative flex items-start gap-6 p-6 rounded-2xl border transition-all duration-300 ${isCompleted
                                    ? "bg-green-50/50 border-green-100"
                                    : isLocked
                                        ? "bg-gray-100 border-gray-200 opacity-60 grayscale"
                                        : "bg-white border-gray-100 hover:shadow-md"
                                    }`}
                            >
                                {/* Connector Line */}
                                {index < contentItems.length - 1 && (
                                    <div className="absolute left-[39px] top-20 bottom-[-24px] w-0.5 bg-gray-200"></div>
                                )}

                                {/* Index / Status Circle */}
                                <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-sm z-10 ${isCompleted
                                    ? "bg-green-500 text-white"
                                    : isLocked
                                        ? "bg-gray-300 text-gray-500"
                                        : "bg-indigo-600 text-white"
                                    }`}>
                                    {isCompleted ? (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : index + 1}
                                </div>

                                <div className="flex-grow">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter ${item.type === "course" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"
                                            }`}>
                                            {item.type}
                                        </span>
                                        <h3 className="text-lg font-bold text-gray-900 leading-tight">{item.title}</h3>
                                    </div>
                                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">{item.description}</p>

                                    <div className="flex items-center justify-between mt-auto">
                                        <Link
                                            to={item.type === "course" ? `/course-overview/${item._id}` : `/quicks/${item._id}/watch`}
                                            className={`text-sm font-bold flex items-center gap-1 ${isLocked ? "pointer-events-none text-gray-400" : "text-indigo-600 hover:text-indigo-700"
                                                }`}
                                        >
                                            {isLocked ? "Locked" : `View ${item.type}`}
                                            {!isLocked && (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            )}
                                        </Link>

                                        {!isCompleted && !isLocked && (
                                            <button
                                                onClick={() => handleMarkComplete(item.type, item._id)}
                                                className="bg-gray-900 text-white text-xs font-bold py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
                                            >
                                                Mark as Done
                                            </button>
                                        )}
                                        {isCompleted && (
                                            <span className="text-green-600 text-xs font-bold flex items-center gap-1">
                                                Completed
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Milestone Badge Section */}
                <AnimatePresence>
                    {percentage === 100 && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="mt-12 p-8 bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl text-center text-white relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                                </svg>
                            </div>
                            <div className="relative z-10">
                                <div className="w-24 h-24 bg-yellow-400 rounded-full mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(250,204,21,0.5)] mb-4">
                                    <svg className="w-14 h-14 text-yellow-900" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-black mb-2">Roadmap Mastered!</h3>
                                <p className="text-indigo-100 mb-6">You've successfully completed every step of this journey. A custom milestone badge has been added to your profile.</p>
                                <div className="flex justify-center gap-4">
                                    <Link to="/roadmaps" className="bg-white text-indigo-900 px-6 py-2 rounded-xl font-bold text-sm">Find More</Link>
                                    <Link to="/profile" className="bg-indigo-500/30 backdrop-blur border border-indigo-400 text-white px-6 py-2 rounded-xl font-bold text-sm">View Profile</Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default SkillRoadmapDetail;
