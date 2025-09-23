import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getReviewsByCourse,
  addReview,
  updateReview,
  deleteReview,
} from "../../stores/slices/reviewSlice";
import StarRating from "./StarRating";
import { toast } from "react-toastify";

const ReviewCourse = ({ courseId, enrolled, currentUser }) => {
  const dispatch = useDispatch();
  const { reviews, status } = useSelector((state) => state.review);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [prevReview, setPrevReview] = useState([]);
  const [visiableReview, setVisibleReview] = useState(3);
  const viewMore = 3;

  // Fetch reviews
  useEffect(() => {
    if (courseId) dispatch(getReviewsByCourse(courseId));
  }, [dispatch, courseId]);

  // prevReview whenever reviews change
  useEffect(() => {
    if (reviews) setPrevReview(reviews);
  }, [reviews]);

  // Check if user already reviewed
  // const myReview = prevReview?.find((r) => r.student?._id === currentUser._id);

  //  form if editing
  // useEffect(() => {
  //   if (myReview) {
  //     setEditingReviewId(myReview._id);
  //     setRating(myReview.rating);
  //     setComment(myReview.comment);
  //   } else {
  //     setEditingReviewId(null);
  //     setRating(0);
  //     setComment("");
  //   }
  // }, [myReview]);

  // Calculate ratings
  const calculateRatings = () => {
    const ratingsCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    prevReview.forEach((review) => {
      if (review?.rating) ratingsCount[review.rating] += 1;
    });
    return ratingsCount;
  };

  const ratingsCount = calculateRatings();
  const totalRatings = prevReview?.length || 0;

  const totalWeightedRatings = Object.keys(ratingsCount).reduce(
    (sum, key) => sum + key * ratingsCount[key],
    0
  );

  const avgRating = totalRatings
    ? (totalWeightedRatings / totalRatings).toFixed(1)
    : 0;
  console.log("avg rating", avgRating);

  const getPercentage = (star) =>
    totalRatings ? (ratingsCount[star] / totalRatings) * 100 : 0;
  console.log("totalRating", totalRatings);

  const renderStars = (rating) => {
    return (
      <span className="flex">
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className={`text-xl ${
              value <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </span>
    );
  };

  // Add or Update review
  const handleSubmit = () => {
    if (!rating || !comment.trim() || !courseId || !currentUser?._id) return;

    const reviewData = {
      student: currentUser._id,
      rating,
      comment,
      isEnrolled: enrolled,
    };

    if (editingReviewId) {
      dispatch(updateReview({ reviewId: editingReviewId, reviewData }))
        .unwrap()
        .then(() => {
          toast.success("Review updated successfully!");
          setEditingReviewId(null);
          setRating(0);
          setComment("");
          // dispatch(getReviewsByCourse(courseId));
        })
        .catch((err) => toast.error(err.message || "Failed to update review"));
    } else {
      dispatch(addReview({ courseId, reviewData }))
        .unwrap()
        .then(() => {
          toast.success("Review added successfully!");
          setEditingReviewId(null);
          setRating(0);
          setComment("");
          // dispatch(getReviewsByCourse(courseId));
        })
        .catch((err) => toast.error(err.message || "Failed to add review"));
    }
  };

  console.log(reviews);

  const handleEdit = (review) => {
    setEditingReviewId(review._id);
    setRating(review.rating);
    setComment(review.comment);
  };

  const handleDelete = (id) => {
    dispatch(deleteReview(id))
      .unwrap()
      .then(() => {
        toast.success("Review deleted successfully!");
        dispatch(getReviewsByCourse(courseId));
      })
      .catch((err) => toast.error(err.message || "Failed to delete review"));
  };

  return (
    <div className="mt-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Students Voice</h2>

      {/* Average Rating */}
      <div className="flex items-center space-x-6 mb-6">
        <div className="flex flex-col items-center">
          <span className="text-5xl font-bold text-yellow-500">
            {avgRating}
          </span>
          <span className="text-sm text-gray-500">{totalRatings} ratings</span>
        </div>
        <div className="flex-1">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center mb-1">
              <span className="w-10 text-sm">{star} ★</span>
              <div className="h-3 flex-1 bg-gray-200 rounded mx-2 overflow-hidden">
                <div
                  className="h-3 bg-yellow-400 rounded transition-all duration-500"
                  style={{ width: `${getPercentage(star)}%` }}
                ></div>
              </div>
              <span className="w-12 text-sm text-gray-600">
                {getPercentage(star).toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Review Form */}
      {enrolled ? (
        <div className="border-none p-4 rounded-md mb-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">
            {editingReviewId ? "Edit Your Review" : "Add a Review"}
          </h3>
          <StarRating rating={rating} setRating={setRating} />
          <textarea
            className="w-full border p-2 rounded-md mt-2"
            rows="3"
            placeholder="Write your review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            onClick={handleSubmit}
          >
            {editingReviewId ? "Update Review" : "Submit Review"}
          </button>
        </div>
      ) : (
        <p className="text-gray-500 mb-6">
          Enroll in this course to add a review.
        </p>
      )}

      {/* Review List */}
      <div className="space-y-4">
        {status === "loading" && <p className="text-sm">Loading reviews...</p>}
        {reviews?.length === 0 && status === "succeeded" && (
          <p className="text-gray-500">No reviews yet.</p>
        )}
        {reviews?.slice(0, visiableReview).map((review, index) => (
          <div
            key={review?._id || index}
            className="border rounded-md p-4 shadow-sm flex justify-between items-start"
          >
            <div>
              <div className="flex items-center space-x-2 mb-1">
                {review.student && (
                  <span className="font-semibold">{review.student.name}</span>
                )}

                <span>{renderStars(review.rating)}</span>
              </div>
              <p className="text-sm text-gray-700">{review.comment}</p>
            </div>
            {review?.student && review.student?._id === currentUser._id && (
              <div className="flex flex-col space-y-1 text-xs ml-4">
                <button
                  onClick={() => handleEdit(review)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
        {/* laod more revieww 3 for each time  */}
        {visiableReview < reviews.length && (
          <button
            className="mt-2 text-blue-600 hover:underline"
            onClick={() => setVisibleReview(visiableReview + viewMore)}
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
};

export default ReviewCourse;
