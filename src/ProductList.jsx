import React, { useState, useEffect } from 'react';
import './ProductList.css'
import CartItem from './CartItem';
import { addItem } from './CartSlice';
import { useSelector,useDispatch } from 'react-redux';

function ProductList({ onHomeClick }) {
    const [showCart, setShowCart] = useState(false);
    const [showPlants, setShowPlants] = useState(false); // State to control the visibility of the About Us page

    const cartItems = useSelector((state) => state.cart.items);
    //const cartCount = cartItems.length;
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                {
                    name: "Red-Edged Dracaena",
                    image: "https://cdn.pixabay.com/photo/2018/12/08/15/45/nature-3863519_640.jpg",
                    description: "They can get big and may need extra space. Most love full shade, but some need partial sun",
                    cost: "$15"
                },
                {
                    name: "English Ivy",
                    image: "https://cdn.pixabay.com/photo/2018/07/05/23/32/ivy-3519432_640.jpg",
                    description: "Filters formaldehyde and xylene from the air.",
                    cost: "$12"
                },
            ]
        },
        {
            category: "Medicinal Plants",
            plants: [
                {
                    name: "Ajwain Plant",
                    image: "https://cdn.pixabay.com/photo/2017/09/03/06/34/indian-borage-2709425_1280.jpg",
                    description: "Ajwain is an aromatic herb with various medicinal uses, including aiding digestion",
                    cost: "$14"
                },
                {
                    name: "Lemongrass Plant",
                    image: "https://cdn.pixabay.com/photo/2022/01/17/02/14/lemongrass-6943711_640.jpg",
                    description: "Lemongrass is a rich source of flavonoids and phenolic compounds, which contain antioxidants.",
                    cost: "$16"
                }
            ]
        },
               
        {
            category: "Low Maintenance Plants",
            plants: [
                {
                    name: "Philodendron Plant",
                    image: "https://cdn.pixabay.com/photo/2023/05/07/00/27/leaves-7975347_640.jpg",
                    description: "It prefer indirect light and can grow in average home temperatures",
                    cost: "$25"
                },
                {
                    name: "Golden Money Plant",
                    image: "https://cdn.pixabay.com/photo/2022/11/01/17/15/plant-7562844_640.jpg",
                    description: "Reduces Anxiety And Stress from Home and Office.",
                    cost: "$10"
                }
            ]            
        }
    ];
    const styleObj = {
        backgroundColor: '#4CAF50',
        color: '#fff!important',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignIems: 'center',
        fontSize: '20px',
    }
    const styleObjUl = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '1100px',
    }
    const styleA = {
        color: 'white',
        fontSize: '30px',
        textDecoration: 'none',
    }

    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true); // Set showCart to true when cart icon is clicked
    };
    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowPlants(true); // Set showAboutUs to true when "About Us" link is clicked
        setShowCart(false); // Hide the cart when navigating to About Us
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
        setShowPlants(true);
    };

    const [addedToCart, setAddedToCart] = useState({});

    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        
        dispatch(addItem(product));
        setAddedToCart((prevState) => ({
           ...prevState,
           [product.name]: true, // Set the product name as key and value as true to indicate it's added to cart
         }));

         /*const handleRemoveFromCart = (product) => {
            // When item is removed from cart, reset its status in addedToCart
            setAddedToCart((prevState) => ({
              ...prevState,
              [product.name]: false, // Mark this item as not added
            }));
          }; */
        
      };

    return (
        <div>
            <div className="navbar" style={styleObj}>
                <div className="tag">
                    <div className="luxury">
                        <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
                        <a href="/" onClick={(e) => handleHomeClick(e)}>
                            <div>
                                <h3 style={{ color: 'white' }}>JK Nursery</h3>
                                <i style={{ color: 'white' }}>Where Green is always Green</i>
                            </div>
                        </a>
                    </div>

                </div>
                <div style={styleObjUl}>
                    <div> <a href="#" onClick={(e) => handlePlantsClick(e)} style={styleA}>Plants</a></div>
                    <div> <a href="#" onClick={(e) => handleCartClick(e)} style={styleA}><h1 className='cart'><svg 
xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="IconChangeColor" height="68" width="68"><rect width="156" 
height="156" fill="none"></rect><circle cx="80" cy="216" r="12"></circle><circle cx="184" cy="216" r="12"></circle><path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" 
fill="none" stroke="#faf9f9" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
id="mainIconPathAttribute"></path></svg></h1></a></div>
                </div>
                <div className="cart-icon">
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
    
                </div>
            </div>
            {!showCart ? (
                <div className="product-grid">
    {plantsArray.map((category, index) => (
    <div key={index}>
        <h1><div>{category.category}</div></h1>
        <div className="product-list">
            {category.plants.map((plant, plantIndex) => (
            <div className="product-card" key={plantIndex}>
                <img className="product-image" src={plant.image} alt={plant.name} />
                <div className="product-title">{plant.name}</div>
                <div className="product-cost">{plant.cost}</div>
                <div className="product-description">{plant.description}</div>
                {/*Similarly like the above plant.name show other details like description and cost*/}
                <button  className="product-button" onClick={() => handleAddToCart(plant)}disabled={addedToCart[plant.name]}>{addedToCart[plant.name] ? 'Added' : 'Add to Cart'}</button>
            </div>
            ))}
        </div>
    </div>
    ))}

                </div>

                
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
                          //handleRemoveFromCart={handleRemoveFromCart}/>
            )}
        </div>
    );
}

export default ProductList;



