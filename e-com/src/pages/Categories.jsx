
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard"; // adjust the path
import { useAppContext } from '../context/AppContext.jsx';

const Categories = () => {
  const { name } = useParams(); // category name from route
  const { allProduct } = useAppContext();

  console.log(allProduct);
  // filter products by category
  const filteredProducts = allProduct.filter(
    (product) => product.category === name
  );

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Products in {name}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={{
                id: product._id,
                name: product.productName,
                image: product.images?.[0]
                  ? `http://localhost:8000/img/${product.images[0]}`
                  : "",
                price: product.price,
              }}
              onAddToCart={() => {
                console.log("Add to cart:", product._id);
              }}
              onToggleWishlist={() => {
                console.log("Wishlist toggle:", product._id);
              }}
              isCompactMobile={true}
            />
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Categories;
