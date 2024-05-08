import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResults, selectResultsArray } from "../../store/search";
import { useParams } from "react-router-dom";
import ProductIndexItem from "../Product/ProductIndexItem";


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


export default SearchIndex;
 