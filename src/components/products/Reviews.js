import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';

export default function Reviews({ userData, productId }) {
    const [userId, setUserId] = useState(userData?.userId || null);
    const [reviews, setReviews] = useState([]);
    const [userReview, setUserReview] = useState(null);
    const [reviewRating, setReviewRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        if (userData)
            setUserId(userData.userId);
        else
            setUserId(null);
    }, [userData]);

    useEffect(() => {
        const url = process.env.REACT_APP_API_URL;
        axios.get(`${url}/reviews`)
            .then(res => {
                setReviews(res.data);
                const userProductReview = res.data.find(
                    review => review.userId === userId && review.productId === productId
                );
                setUserReview(userProductReview);
                if (userProductReview) {
                    setReviewRating(userProductReview.rating);
                }
            })
            .catch(err => console.log(err));
    }, [userId, productId]);

    const handleReviewSubmit = () => {
        if (reviewRating === 0) {
            alert('Please select a rating between 1 and 5');
            return;
        }

        const url = process.env.REACT_APP_API_URL;
        const newReview = {
            userId,
            productId,
            rating: reviewRating,
        };

        setIsSubmitting(true);

        if (userReview) {
            axios.put(`${url}/reviews/${userReview.id}`, newReview)
                .then(res => {
                    setReviews(reviews.map(review =>
                        review.id === res.data.id ? res.data : review
                    ));
                    setUserReview(res.data);
                    setIsUpdated(true);
                    setIsSubmitting(false);
                })
                .catch(err => {
                    console.log(err);
                    setIsSubmitting(false);
                });
        } else {
            axios.post(`${url}/reviews`, newReview)
                .then(res => {
                    setReviews([...reviews, res.data]);
                    setUserReview(res.data);
                    setIsUpdated(false);
                    setIsSubmitting(false);
                })
                .catch(err => {
                    console.log(err);
                    setIsSubmitting(false);
                });
        }
    };

    return (
        <div>
            {!userId ? (
                <p>Login first if you would like to add a review</p>
            ) : (
                <>
                    {userReview ? (
                        <div>
                            <h4>Your Review</h4>
                            <Rating value={userReview.rating} readOnly />
                            <p>Current Rating: {userReview.rating}</p>
                        </div>
                    ) : (
                        <div>
                            <h4>Post a Review</h4>
                            <Rating
                                name="product-rating"
                                value={reviewRating}
                                onChange={(event, newValue) => setReviewRating(newValue)}
                                precision={1}
                            />
                            <br />
                        </div>
                    )}
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={handleReviewSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? 'Submitting...'
                            : isUpdated
                                ? 'Update Review'
                                : 'Submit Review'}
                    </Button>
                </>
            )}
        </div>
    );
}
