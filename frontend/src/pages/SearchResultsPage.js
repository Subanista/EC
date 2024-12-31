import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const results = location.state?.results || [];

  if (results.length === 0) {
    return <p className="text-center mt-4">No products found for your search.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Search Results</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((product) => (
          <div key={product._id} className="border p-4 rounded shadow">
            <h3 className="font-bold">{product.name}</h3>
            <p>{product.description}</p>
            <p className="text-primary font-semibold">${product.price}</p>
            <div className="mt-2">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-200 text-sm px-2 py-1 rounded-full mr-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
