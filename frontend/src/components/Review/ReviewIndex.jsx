import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectReviewArray, fetchReviews } from '../../store/review';
import { useParams } from 'react-router-dom';
import ReviewIndexItem from './ReviewIndexItem.jsx';
import ReviewForm from './ReviewForm.jsx';
import StarRatings from 'react-star-ratings';
// import ReactPaginate from 'react-paginate'
// import axios from "axios"
import './ReviewIndex.css';

const ReviewsIndex = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const currentUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(fetchReviews(productId));
  }, [dispatch, productId]);

 
  const reviews = useSelector(selectReviewArray);
  const reviewCount = reviews.length;
  const [averageRating, setAverageRating] = useState(0);
  // const [data, setData] = useState([]);
  // const [currentPage, setCurrentPage] = useState(0)
  // const [totalPages, setTotalPages] = useState(0)
  // const itemsPerPage = 1
  
  useEffect(() => {
    let totalRating = 0;
    reviews.forEach((review) => {
      totalRating += review.rating;
    });
    const average = totalRating / reviewCount;
    setAverageRating(average || 0)
  }, [reviews, reviewCount])

  // useEffect(() => {
  //   axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
  //     setData(response.data);
  //     setTotalPages(Math.ceil(response.data.length / itemsPerPage))
  //   });
  // }, []);
  // const startIndex = currentPage * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const subset = data.slice(startIndex, endIndex);

  // const handlePageChange = (selectPage) => {
  //   setCurrentPage(selectPage.selected)
  // };
  
  return (
    <div className='display-review-container'>
      <p>
         {reviewCount} reviews 
         <label htmlFor="" id="average-rating">
            <StarRatings
              rating={averageRating}
              starRatedColor='#222222'
              starHoverColor='#222222'
              numberOfStars={5}
              name='rating'
              starDimension="20px"
              starSpacing="4px"
              />
          </label>
      </p>
      <div className='review-selections'>
        <button id="item-reviews">Reviews for this item {reviewCount}</button>
        <button id="shop-reviews">Reviews for this shop 0</button>
      </div>
      <div >
        {reviews.reverse().filter(review => review.productId == productId).map((review) => (
          <ReviewIndexItem key={review.id} review={review} />
        ))}
        {/* <ReactPaginate
          pageCount={totalPages}
          onPageChange={handlePageChange}
          forcePage={currentPage}
          previousLabel={"<<"}
          nextLabel={">>"}
          breakLabel={"..."}
        /> */}
      </div>
      <div className='create-review-input'>
        {currentUser ? (
          <>
            <p>Leave a review</p>
            <ReviewForm />
          </>
        ) : (
          <p>Sign in to post a review</p>
        )}
      </div>
    </div>
  );

};

export default ReviewsIndex;

