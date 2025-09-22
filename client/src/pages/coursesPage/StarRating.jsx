import React from "react";

const StarRating = ({ setRating, rating = 0 }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="focus:outline none"
          onClick={() => setRating(star)}
        >
          <span
            className={`text-2xl ${
              star <= rating ? "text-yellow-500" : "text-gray-300"
            } cursor-pointer`}
          >
            ★
          </span>
        </button>
      ))}
    </div>
  );
};

export default StarRating;
