import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { selectProduct, fetchProduct } from "../../store/product";
import ReviewsIndex from "../Review/ReviewIndex";
import './ProductShow.css';
import { memoizedCartItems, updateCartItem, createCartItem } from "../../store/cart";

const ProductShow = () => {
  // const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const { product_id } = useParams();
  const product = useSelector(selectProduct(product_id));
  const currentUser = useSelector(state => state.session.user);
  const [quantity, setQuantity] = useState(1);
  const cartItems = useSelector(memoizedCartItems)

  useEffect(() => {
    dispatch(fetchProduct(product_id));
  }, [dispatch, product_id]);

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value, 5))
  };

  const handleAddCartItem = async (e) => {
    e.preventDefault();
    // const userId = sessionUser.id;
    // console.log(userId)
    const targetProduct = { quantity, product_id };

    const existingCartItem = cartItems.find(
      (item) => item.product_id === product.id
    );

    if (existingCartItem) {
      const updatedCartItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + quantity
      };
      dispatch(updateCartItem(updatedCartItem, currentUser.id));
    } else {
      dispatch(createCartItem(targetProduct, currentUser.id));
    }
  };
  


  return (
    <div className="product-page-body">
      <div className="product-page-container">
        <div className="product-visuals-container">
          <img id="product-image" src={product?.photoUrl} alt="random image" />
        </div>
        <div className="product-info-container">
          <p id="price">${product?.price}</p>
          {/* <p id="">{product?.name}</p> */}
          <p id="product-desc">{product?.description}</p>
          <div id="quantity-selector">
            <span>Quantity</span>
            <br />
            <select 
              name="quantity" 
              id="number-select"
              value={quantity}
              onChange={handleQuantityChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div id="add-to-cart-btn-ct">
            <button onClick={handleAddCartItem} id="add-to-cart-btn">Add to cart</button>
          </div>
        </div>
      </div>
      <div className="product-reviews-container">
        <p><ReviewsIndex /></p>
      </div>
    </div>
  );


};

export default ProductShow;