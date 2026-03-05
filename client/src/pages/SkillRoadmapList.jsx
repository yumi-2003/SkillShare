import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSkillPaths } from "../stores/slices/skillPathSlice";
import { motion } from "framer-motion";

const SkillRoadmapList = () => {
    const dispatch = useDispatch();
    const { skillPaths, loading, error } = useSelector((state) => state.skillPath);

    useEffect(() => {
        dispatch(fetchSkillPaths());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                    Skill <span className="text-indigo-600">Roadmaps</span>
                </h1>
                <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
                    Structured learning paths curated by experts to take you from beginner to pro in record time.
                </p>
            </div>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {skillPaths.map((path) => (
                    <motion.div
                        key={path._id}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col h-full"
                    >
                        <div className="relative h-48 bg-indigo-100 overflow-hidden">
                            {path.image ? (
                                <img src={path.image} alt={path.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-indigo-300">
                                    <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10.394 2.827a2 2 0 00-1.788 0L2.606 5.827A2 2 0 001.5 7.618v6.764a2 2 0 001.106 1.789l6 3a2 2 0 001.788 0l6-3a2 2 0 001.106-1.789V7.618a2 2 0 00-1.106-1.791l-6-3zM8 10a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                    </svg>
                                </div>
                            )}
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-indigo-600 shadow-sm">
                                {path.difficulty}
                            </div>
                        </div>
                        <div className="p-6 flex-grow">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{path.title}</h3>
                            <p className="text-gray-600 text-sm line-clamp-3 mb-4">{path.description}</p>
                            <div className="flex items-center gap-3 mb-6">
                                <img
                                    src={path.instructor?.image || "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"}
                                    alt={path.instructor?.name}
                                    className="w-8 h-8 rounded-full border border-gray-100"
                                />
                                <span className="text-sm font-medium text-gray-700">{path.instructor?.name}</span>
                            </div>
                        </div>
                        <div className="p-6 pt-0">
                            <Link
                                to={`/roadmaps/${path._id}`}
                                className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-colors duration-200"
                            >
                                Start Roadmap
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default SkillRoadmapList;
