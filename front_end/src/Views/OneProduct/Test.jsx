import React, { useState } from 'react';
import './ProductDetails.css';

// Mock Loading component
const LoadingSpinner = ({ size = 60 }) => (
  <div className="loading-spinner" style={{ width: size, height: size }}>
    <div className="spinner-circle"></div>
  </div>
);

// Mock Select component (you can replace with your actual Select component)
const CustomSelect = ({ style, placeholder, size, options, onChange }) => (
  <select 
    className="custom-select"
    style={style}
    onChange={(e) => onChange(e.target.value)}
  >
    <option value="">{placeholder}</option>
    {options.map((option, index) => (
      <option key={index} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

// Mock ProductCard component for similar products
const SimilarProductCard = ({ id, mainImg, mainTitle, addPrice }) => (
  <div className="similar-product-item">
    <div className="similar-product-image">
      <img src={mainImg || '/api/placeholder/200/200'} alt={mainTitle} />
    </div>
    <div className="similar-product-info">
      <h4>{mainTitle}</h4>
      <p className="similar-product-price">LKR {addPrice}</p>
    </div>
  </div>
);

// Mock SignInModal component
const SignInModal = ({ isOpen, closeModal }) => (
  isOpen && (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Sign In Required</h3>
        <p>Please sign in to continue with your purchase.</p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  )
);

const ProductDetailsPage = () => {
  // Sample data
  const [item] = useState({
    name: "Premium Wireless Bluetooth Headphones",
    price: 15999.99,
    description: "Experience superior sound quality with these premium wireless headphones featuring advanced noise cancellation technology and 30-hour battery life.",
    images: [
      'https://th.bing.com/th/id/R.8d22bc9130a38ab2ba2949ebbb93e329?rik=u4gxWrluP3V%2bew&pid=ImgRaw&r=0',
      'https://th.bing.com/th/id/OIP.-B2OcAz20z2ZVHJnwssnvAAAAA?cb=iwp2&w=474&h=731&rs=1&pid=ImgDetMain',
      'https://th.bing.com/th/id/OIP.btOggDv70Yaa_ixSzkB3mgHaHa?cb=iwp2&w=1024&h=1024&rs=1&pid=ImgDetMain',
      'https://th.bing.com/th/id/OIP.pcWNlIxm1wGWtTkXdQXAowHaHa?cb=iwp2&rs=1&pid=ImgDetMain'
    ],
    brand: 'https://th.bing.com/th/id/R.79fc511f18d5797f285e49430d606a48?rik=P7yR8eulf5UgHA&pid=ImgRaw&r=0',
    material: "Premium Plastic & Metal",
    weight: "250g"
  });

  const [similar] = useState([
    { id: 1, mainImg: 'https://th.bing.com/th/id/R.8d22bc9130a38ab2ba2949ebbb93e329?rik=u4gxWrluP3V%2bew&pid=ImgRaw&r=0', mainTitle: 'Gaming Headset Pro', addPrice: '12999.99' },
    { id: 2, mainImg: 'https://th.bing.com/th/id/R.8d22bc9130a38ab2ba2949ebbb93e329?rik=u4gxWrluP3V%2bew&pid=ImgRaw&r=0', mainTitle: 'Studio Monitor Headphones', addPrice: '18999.99' },
    { id: 3, mainImg: 'https://th.bing.com/th/id/R.8d22bc9130a38ab2ba2949ebbb93e329?rik=u4gxWrluP3V%2bew&pid=ImgRaw&r=0', mainTitle: 'Sport Wireless Earbuds', addPrice: '8999.99' },
    { id: 4, mainImg: 'https://th.bing.com/th/id/R.8d22bc9130a38ab2ba2949ebbb93e329?rik=u4gxWrluP3V%2bew&pid=ImgRaw&r=0', mainTitle: 'Noise Cancelling Headphones', addPrice: '22999.99' }
  ]);

  const [isLoading] = useState({ fuc1: false, fuc2: false });
  const [btnLoading, setBtnLoading] = useState(false);
  const [askLogin, setAskLogin] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const sizes = ['Small', 'Medium', 'Large', 'Extra Large'];
  const paymentOptionImg = '/api/placeholder/150/50';

  const handleImageChange = (e) => {
    const clickedImg = e.target.src;
    const mainImg = document.getElementById('main-product-image');
    if (mainImg) {
      mainImg.src = clickedImg;
    }
    setCurrentImageIndex(item.images.findIndex(img => img === clickedImg));
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleCheckout = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    console.log('Proceeding to checkout with:', { item: item.name, quantity, size: selectedSize });
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    setBtnLoading(true);
    // Simulate API call
    setTimeout(() => {
      setBtnLoading(false);
      console.log('Added to cart:', { item: item.name, quantity, size: selectedSize });
    }, 1000);
  };

  return (
    <div className="product-details-page">
      {isLoading.fuc1 ? (
        <div className="loading-container">
          <LoadingSpinner size={60} />
        </div>
      ) : (
        <div className="product-details-container">
          <div className="product-gallery-section">
            <div className="thumbnail-images-list">
              {item?.images.map((url, index) => (
                <div 
                  key={index} 
                  className={`thumbnail-image-wrapper ${index === currentImageIndex ? 'active' : ''}`}
                >
                  <img
                    src={url}
                    alt={`Product view ${index + 1}`}
                    onClick={handleImageChange}
                    className="thumbnail-image"
                  />
                </div>
              ))}
            </div>
            <div className="main-image-display">
              <img 
                src={item.images[0]} 
                alt="Main product view" 
                id="main-product-image"
                className="main-product-image"
              />
            </div>
          </div>

          <div className="product-information-section">
            <div className="product-header">
              <h1 className="product-title">{item.name}</h1>
              <p className="product-price-display">LKR {item?.price?.toFixed(2)}</p>
            </div>

            <div className="product-description">
              <p className="description-text">{item.description}</p>
              <p className="image-disclaimer">
                *Product image may differ from actual due to photographic lighting*
              </p>
            </div>

            <div className="product-specifications">
              <div className="brand-information">
                <span className="spec-label">Brand:</span>
                <img src={item.brand} alt="Brand logo" className="brand-logo" />
              </div>

              <div className="specification-item">
                <span className="spec-label">Material:</span>
                <span className="spec-value">{item.material}</span>
              </div>

              <div className="specification-item">
                <span className="spec-label">Weight:</span>
                <span className="spec-value">{item.weight}</span>
              </div>
            </div>

            <div className="payment-options">
              <p className="installment-text">or 3 installments of LKR {(item.price / 3).toFixed(2)} with</p>
              <img src={paymentOptionImg} alt="Payment option" className="payment-logo" />
            </div>

            <div className="size-selection-section">
              <label className="size-label">Size</label>
              <CustomSelect
                style={{ width: "200px" }}
                placeholder="Select Size"
                size="large"
                options={sizes.map((size) => ({
                  value: size,
                  label: size,
                }))}
                onChange={setSelectedSize}
              />
            </div>

            <div className="purchase-controls">
              <div className="quantity-selector">
                <div className="quantity-display">
                  <span className="quantity-number">{quantity}</span>
                </div>
                <div className="quantity-buttons">
                  <button 
                    className="quantity-btn increment-btn"
                    onClick={incrementQuantity}
                    type="button"
                  >
                    <i className="icon-plus">+</i>
                  </button>
                  <button 
                    className="quantity-btn decrement-btn"
                    onClick={decrementQuantity}
                    type="button"
                    disabled={quantity <= 1}
                  >
                    <i className="icon-minus">−</i>
                  </button>
                </div>
              </div>

              <div className="action-buttons">
                <button 
                  className="buy-now-button"
                  onClick={handleCheckout}
                >
                  BUY NOW
                </button>
                <button 
                  className="add-to-cart-button"
                  onClick={handleAddToCart}
                  disabled={btnLoading}
                >
                  {btnLoading ? <LoadingSpinner size={20} /> : "ADD TO CART"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="related-products-section">
        <div className="section-header">
          <h2 className="section-title">Similar Products</h2>
        </div>

        {isLoading.fuc2 ? (
          <div className="loading-container">
            <LoadingSpinner size={60} />
          </div>
        ) : (
          <div className="similar-products-grid">
            {similar?.map((product) => (
              <SimilarProductCard
                id={product.id}
                key={product.id}
                mainImg={product.mainImg}
                mainTitle={product.mainTitle}
                addPrice={product.addPrice}
              />
            ))}
          </div>
        )}
      </div>

      <SignInModal 
        isOpen={askLogin} 
        closeModal={() => setAskLogin(false)} 
      />
    </div>
  );
};

export default ProductDetailsPage;