import React, { useEffect, useState } from 'react'
import useAuth from '../axios/useApi';
const Star = ({ marked, starId }) => {
    return (
        <span data-star-id={starId} style={{
            color: '#ff9933',
            cursor: 'pointer',
            fontSize: "35px"
        }} role="button">
            {marked ? '\u2605' : '\u2606'}
        </span>
    );
};

export const RatingComponent = ({ value, info, reviewData, setReviewData }) => {
    const [rating, setRating] = useState(0);
    const [selection, setSelection] = useState(0);
    const authApi = useAuth();
    useEffect(() => { setRating(value) }, [value])
    const hoverOver = event => {
        let val = 0;
        if (event && event.target && event.target.getAttribute('data-star-id'))
            val = event.target.getAttribute('data-star-id');
        setSelection(val);
    };
    const saveRating = (e) => {
        setReviewData({ ...reviewData, rating: e.target.getAttribute('data-star-id') });
        // authApi.put('/user/reviews/?' + info, { rating: e.target.getAttribute('data-star-id') }).then(res => { }).catch(e => console.log(e.response.data.message))
        setRating(e.target.getAttribute('data-star-id') || rating);
    }
    return (
        <div
            onMouseOut={() => hoverOver(null)}
            onClick={saveRating}
            onMouseOver={hoverOver}
        >
            {Array.from({ length: 5 }, (v, i) => (
                <Star
                    starId={i + 1}
                    key={`star_${i + 1}`}
                    marked={selection ? selection >= i + 1 : rating >= i + 1}
                />
            ))}
        </div>
    );
};