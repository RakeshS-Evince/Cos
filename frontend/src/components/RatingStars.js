import React, { useEffect, useState } from 'react'
const Star = ({ marked, starId, size }) => {
    return (
        <span data-star-id={starId} style={{
            color: '#ff9933',
            cursor: 'pointer',
            fontSize: `${size ? size : "32px"}`
        }} role="button">
            {marked ? '\u2605' : '\u2606'}
        </span>
    );
};

export const RatingStars = ({ value, size }) => {
    const [rating, setRating] = useState(0);
    useEffect(() => { setRating(value) }, [value])
    return (
        <div
        >
            {Array.from({ length: 5 }, (v, i) => (
                <Star
                    starId={i + 1}
                    key={`star_${i + 1}`}
                    marked={rating >= i + 1}
                    size={size}
                />
            ))}
        </div>
    );
};