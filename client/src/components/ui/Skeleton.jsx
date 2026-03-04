import React from "react";

const Skeleton = ({ className, width, height, borderRadius = "0.5rem" }) => {
    return (
        <div
            className={`skeleton ${className}`}
            style={{
                width: width || "100%",
                height: height || "1rem",
                borderRadius: borderRadius,
            }}
        />
    );
};

export default Skeleton;
