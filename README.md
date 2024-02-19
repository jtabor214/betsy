# Betsy
[Check it out!](https://betsy-0jcd.onrender.com)

### Introduction
Betsy is a clone of the website Etsy. Etsy is, "a global online marketplace, where people come together to make, sell, buy, and collect unique items." A user who creates a profile on Etsy can create a store where they can post product listings, review products, like products, and search or browse the sites inventory. 

* Languages: Javascript, Ruby, HTML, CSS 
* Frontend: React-Redux
* Backend: Ruby on Rails
* Database: PostgreSql
* Hosting: Render
* Asset Storage: AWS Simple Cloud Storage (S3)

# MVP

### Create an Account 

Betsy users can create new accounts that save their credientials to a backend database; or log in to an existing account that has already been saved and seeded to that database: 
```js
/* From LoginForm.jsx */

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  };

/* From SignupForm.jsx */

const SignupForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Navigate to="/" replace={true}/>;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, name, password }))
        .catch(async (res) => {
          let data;
          try {
            data = await res.clone().json();
          } catch {
            data = await res.text();
          }
          if (data?.errors) setErrors(data.errors);
          else if (data) setErrors([data]);
          else setErrors([res.statusText]);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <>
      <form className='signup-form' onSubmit={handleSubmit}>
        <ul>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
        <div className='credential-fields'>
          <h1>Registration is easy.</h1>
          <br />
          <label id='email-field'>
              Email
            <input
              id='input-field'
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <br />
          <label id='name-field'>
            Name
            <input
              id='input-field'
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <br />
          <label id='password-field'>
            Password
            <input
              id='input-field'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <br />
          <label id='confirm-field'>
            Confirm Password
            <input
              id='input-field'
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
        
          <button id='submit-button' type="submit">Register</button>
        </div>
      </form>
    </>
  );
};
```

### Browse 

Betsy users are able to browse product listings:
```js
/* From product.js */

export const selectProductsArray = (state) => Object.values(state.products);

export const fetchProducts = () => async dispatch => {
  const response = await csrfFetch(`/api/products`);

  if (response.ok) {
    const products = await response.json();
    dispatch(receiveProducts(products));
    console.log(products);
  }
};

const ProductsIndex = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const products = useSelector(selectProductsArray);

  const productsList = products.map((product) => {
    return <ProductIndexItem key={product.id} product={product} />;
  });

  return (
    <div id='display-product-container'>
      <h1>Shop Handmade Items</h1>
      <ul id="product-listings">
        {productsList}
      </ul>
    </div>
  );
};
```
### Reviews

Users who have an account can create, edit, and remove reviews and ratings that they leave on products:
```js
export const createReview = (review, productId ) => async dispatch => {
  const response = await csrfFetch(`/api/products/${productId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(review),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch((receiveReview(data.review)));
  }
};

export const updateReview = (review) => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${review.id}`, {
    method: 'PATCH',
    body: JSON.stringify(review),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(receiveReview(data.review));
  }
};

export const deleteReview = (productId, reviewId) => async dispatch => {
  const response = await csrfFetch(`/api/products/${productId}/reviews/${reviewId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  if (response.ok) {
    dispatch(removeReview(reviewId));
  }
};
```

### Search Items
Through the Navigation Bar, users can search for specific items: 
```js
/* From Navigation.jsx */

  const [query, setQuery] = useState('');
  const handleSearch= (e) => {
    e.preventDefault();

    dispatch(fetchResults(query));
    navigate(`/search/${query}`);
    
    //redirect to search/${query}
  };

  return (
    <header id="main_header">
      <div id="nav_bar">
        <SessionModal />
        <NavLink id="name" to="/">Betsy</NavLink>
        <button id="category-container">
          <img id="category-icon" src="../../../public/assets/images/menu-icon.png" alt="" />
          <p>Categories</p>
        </button>
        <form id="search-container" action="" onSubmit={handleSearch}>
          <input placeholder="Search for anything"id="search_bar" value={query} onChange={(e) => setQuery(e.target.value)}></input>
          <button id="search-button"type='submit'><img id="search-icon" src="../../../public/assets/images/search-icon.png" alt="search icon" /></button>
        </form>
        {sessionLinks}
        <button id="cart_button"><img id="cart-icon" src="../../../public/assets/images/cart-icon.png" alt="cart icon" /></button>
      </div>
      <div id="quick_look">
        <button>Valentine&apos;s Day Gifts</button>
        <button>Home Favorites</button>
        <button>Fashion Finds</button>
        <button>Gift Guides</button>
        <button>Registry</button>
      </div>
    </header>
  );
}

/* From SearchIndex.jsx */

const SearchIndex = () => {
  const dispatch = useDispatch();
  const { query } = useParams();

  useEffect(() => {
    dispatch(fetchResults(query));
  }, [dispatch, query]);

  const results = useSelector(selectResultsArray);
  const resultList = results.map((result) => {
    return <ProductIndexItem key={result.id} product={result} />;
  });

  return (
    <div className="display-search-results">
      <ul className="searched-products">
        {resultList}
      </ul>
    </div>
  );
};
```
### Thank you!
Betsy was originally created within the span of 14 days. I appreciate you taking the time to check it out!
