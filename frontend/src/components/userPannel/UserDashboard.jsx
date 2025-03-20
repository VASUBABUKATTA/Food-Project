// import React, { useEffect, useState } from "react";
// import KeyboardArrowUpSharpIcon from "@mui/icons-material/KeyboardArrowUpSharp";
// import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
// import { Button } from "@mui/material";
// import RemoveSharpIcon from '@mui/icons-material/RemoveSharp';
// import AddSharpIcon from '@mui/icons-material/AddSharp';
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { motion } from "framer-motion";
// import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import Cart from "./Cart";
// import Service from "../Api_Services/CategoryService";
// import UserHomePage from "./UserHomePage";


// // const counters = [
// //     {
// //         counterName: 'counter1',
// //         counterId: 1,
// //         Categories: [
// //             {
// //                 name: 'IDLY',
// //                 menu: [
// //                     { name: 'Plain Idly', price: '85' },
// //                     { name: 'Ghee Pudi Idly', price: '114' },
// //                     { name: 'Ghee Sambar Button Idly', price: '143' },
// //                     { name: 'Ghee Idly', price: '143' },
// //                     { name: 'Lemon Idly', price: '114' },
// //                     { name: 'Kanchipuram Idly', price: '100' },
// //                     { name: 'Banglore Idli', price: '81' },
// //                     { name: 'Rasam Tari Idli', price: '140' },
// //                     { name: 'Ragi Balls', price: '145' },
// //                     { name: 'Idiyappam', price: '180' },

// //                 ],
// //             },

// //             {
// //                 name: 'VADA',
// //                 menu: [
// //                     { name: 'Dahi Vada', price: '149' },
// //                     { name: 'Mini Vada Sambar Dip', price: '114' },
// //                     { name: 'Rasam Vada', price: '124' },
// //                     { name: 'Onion Pakooda', price: '105' },
// //                     { name: 'Masala Vada', price: '90' },
// //                 ]
// //             },]

// //     },
// //     {
// //         counterName: 'counter2',
// //         counterId: 2,
// //         Categories: [

// //             {
// //                 name: 'ABC',
// //                 menu: [
// //                     { name: 'Plain Idly', price: '85' },
// //                     { name: 'Ghee Pudi Idly', price: '114' },
// //                     { name: 'Ghee Sambar Button Idly', price: '143' },
// //                     { name: 'Ghee Idly', price: '143' },
// //                     { name: 'Lemon Idly', price: '114' },
// //                     { name: 'Kanchipuram Idly', price: '100' },
// //                     { name: 'Banglore Idli', price: '81' },
// //                     { name: 'Rasam Tari Idli', price: '140' },
// //                     { name: 'Ragi Balls', price: '145' },
// //                     { name: 'Idiyappam', price: '180' },

// //                 ],
// //             },

// //             {
// //                 name: 'DEF',
// //                 menu: [
// //                     { name: 'Dahi Vada', price: '149' },
// //                     { name: 'Mini Vada Sambar Dip', price: '114' },
// //                     { name: 'Rasam Vada', price: '124' },
// //                     { name: 'Onion Pakooda', price: '105' },
// //                     { name: 'Masala Vada', price: '90' },
// //                 ]
// //             },]

// //     },
// //     {
// //         counterName: 'counter3',
// //         counterId: 3,
// //         Categories: [

// //             {
// //                 name: 'GHI',
// //                 menu: [
// //                     { name: 'Plain Idly', price: '85' },
// //                     { name: 'Ghee Pudi Idly', price: '114' },
// //                     { name: 'Ghee Sambar Button Idly', price: '143' },
// //                     { name: 'Ghee Idly', price: '143' },
// //                     { name: 'Lemon Idly', price: '114' },
// //                     { name: 'Kanchipuram Idly', price: '100' },
// //                     { name: 'Banglore Idli', price: '81' },
// //                     { name: 'Rasam Tari Idli', price: '140' },
// //                     { name: 'Ragi Balls', price: '145' },
// //                     { name: 'Idiyappam', price: '180' },

// //                 ],
// //             },

// //             {
// //                 name: 'JKL',
// //                 menu: [
// //                     { name: 'Dahi Vada', price: '149' },
// //                     { name: 'Mini Vada Sambar Dip', price: '114' },
// //                     { name: 'Rasam Vada', price: '124' },
// //                     { name: 'Onion Pakooda', price: '105' },
// //                     { name: 'Masala Vada', price: '90' },
// //                 ]
// //             },]

// //     },
// //     {
// //         counterName: 'counter4',
// //         counterId: 4,
// //         Categories: [

// //             {
// //                 name: 'MNO',
// //                 menu: [
// //                     { name: 'Plain Idly', price: '85' },
// //                     { name: 'Ghee Pudi Idly', price: '114' },
// //                     { name: 'Ghee Sambar Button Idly', price: '143' },
// //                     { name: 'Ghee Idly', price: '143' },
// //                     { name: 'Lemon Idly', price: '114' },
// //                     { name: 'Kanchipuram Idly', price: '100' },
// //                     { name: 'Banglore Idli', price: '81' },
// //                     { name: 'Rasam Tari Idli', price: '140' },
// //                     { name: 'Ragi Balls', price: '145' },
// //                     { name: 'Idiyappam', price: '180' },

// //                 ],
// //             },

// //             {
// //                 name: 'PQR',
// //                 menu: [
// //                     { name: 'Dahi Vada', price: '149' },
// //                     { name: 'Mini Vada Sambar Dip', price: '114' },
// //                     { name: 'Rasam Vada', price: '124' },
// //                     { name: 'Onion Pakooda', price: '105' },
// //                     { name: 'Masala Vada', price: '90' },
// //                 ]
// //             },]

// //     },
// // ];



// function UserDashboard() {
//     const [selectedCounter, setSelectedCounter] = useState(null);
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [cart, setCart] = useState([]);
//     const [itemCounts, setItemCounts] = useState({});

//     const [totalAmount, setTotalAmount] = useState(0)

//     // const handleAddClick = (itemName) => {
//     //     setItemCounts((prevCounts) => ({
//     //         ...prevCounts,
//     //         [itemName]: (prevCounts[itemName] || 0) + 1,
//     //     }));

//     //     setCart((prevCart) => ({
//     //         ...prevCart,
//     //         [itemName]: (prevCart[itemName] || 0) + 1,
//     //     }));
//     // };

//     // const handleIncrement = (itemName) => {
//     //     setItemCounts((prevCounts) => ({
//     //         ...prevCounts,
//     //         [itemName]: (prevCounts[itemName] || 0) + 1,
//     //     }));

//     //     setCart((prevCart) => ({
//     //         ...prevCart,
//     //         [itemName]: (prevCart[itemName] || 0) + 1,
//     //     }));
//     // };

//     // const handleDecrement = (itemName) => {
//     //     setItemCounts((prevCounts) => {
//     //         if (prevCounts[itemName] === 1) {
//     //             const newCounts = { ...prevCounts };
//     //             delete newCounts[itemName];
//     //             return newCounts;
//     //         }
//     //         return {
//     //             ...prevCounts,
//     //             [itemName]: prevCounts[itemName] - 1,
//     //         };
//     //     });

//     //     setCart((prevCart) => {
//     //         if (prevCart[itemName] === 1) {
//     //             const newCart = { ...prevCart };
//     //             delete newCart[itemName];
//     //             return newCart;
//     //         }
//     //         return {
//     //             ...prevCart,
//     //             [itemName]: prevCart[itemName] - 1,
//     //         };
//     //     });
//     // };

//     const removeItem = (index) => {
//         setCart(prev => prev.filter((_, i) => i !== index));
//     };

//     const updateCart = (index, newQuantity) => {
//         setCart(prevCart =>
//             prevCart.map((item, i) =>
//                 i === index ? { ...item, quantity: newQuantity } : item
//             )
//         );
//     };

//     console.log(cart);


//     // const handleAddClick = (item, counterName) => {
//     //     setItemCounts((prevCounts) => ({
//     //         ...prevCounts,
//     //         [item.name]: (prevCounts[item.name] || 0) + 1,
//     //     }));
//     //     setCart((prevCart) => {
//     //         const existingItem = prevCart.find((cartItem) => cartItem.name === item.name);
//     //         if (existingItem) {
//     //             return prevCart.map((cartItem) =>
//     //                 cartItem.name === item.name
//     //                     ? { ...cartItem, quantity: cartItem.quantity + 1 }
//     //                     : cartItem
//     //             );
//     //         } else {
//     //             return [...prevCart, { ...item, quantity: 1 }];
//     //         }
//     //     });
//     // };

//     // const handleAddClick = (item, counterName, counterId) => {

//     //     setItemCounts((prevCounts) => ({
//     //         ...prevCounts,
//     //         [counterId]: {
//     //             ...(prevCounts[counterId] || {}),
//     //             [item.name]: ((prevCounts[counterId] && prevCounts[counterId][item.name]) || 0) + 1,
//     //         },
//     //     }));


//     //     setCart((prevCart) => {
//     //         // Find if the counter already exists
//     //         const counterIndex = prevCart.findIndex((counter) => counter.counterName === counterName);

//     //         if (counterIndex !== -1) {
//     //             // Counter exists, update the existing counter's items
//     //             return prevCart.map((counter, index) => {
//     //                 if (index === counterIndex) {
//     //                     // Find if the item exists in the counter
//     //                     const existingItemIndex = counter.items.findIndex(
//     //                         (cartItem) => cartItem.itemName === item.name
//     //                     );

//     //                     if (existingItemIndex !== -1) {
//     //                         // Item exists, update quantity
//     //                         const updatedItems = counter.items.map((cartItem, i) =>
//     //                             i === existingItemIndex
//     //                                 ? { ...cartItem, quantity: cartItem.quantity + 1 }
//     //                                 : cartItem
//     //                         );

//     //                         return { ...counter, items: updatedItems };
//     //                     } else {
//     //                         // Item does not exist, add new item
//     //                         return {
//     //                             ...counter,
//     //                             items: [...counter.items, { itemName: item.name, price: item.price, quantity: 1 }],
//     //                         };
//     //                     }
//     //                 }
//     //                 return counter;
//     //             });
//     //         } else {
//     //             // Counter does not exist, create a new one with the first item
//     //             return [
//     //                 ...prevCart,
//     //                 {
//     //                     counterName: counterName,
//     //                     items: [{ itemName: item.name, price: item.price, quantity: 1 }],
//     //                 },
//     //             ];
//     //         }
//     //     });
//     // };

//     const handleAddClick = (item, counterName, counterId) => {
//         setItemCounts((prevCounts) => ({
//             ...prevCounts,
//             [counterId]: {
//                 ...(prevCounts[counterId] || {}),
//                 [item.name]: ((prevCounts[counterId] && prevCounts[counterId][item.name]) || 0) + 1,
//             },
//         }));

//         setCart((prevCart) => {
//             // Find if the counter already exists
//             const counterIndex = prevCart.findIndex((counter) => counter.counterId === counterId);

//             if (counterIndex !== -1) {
//                 // Counter exists, update the existing counter's items
//                 return prevCart.map((counter, index) => {
//                     if (index === counterIndex) {
//                         // Find if the item exists in the counter
//                         const existingItemIndex = counter.items.findIndex(
//                             (cartItem) => cartItem.itemName === item.name
//                         );

//                         if (existingItemIndex !== -1) {
//                             // Item exists, update quantity
//                             const updatedItems = counter.items.map((cartItem, i) =>
//                                 i === existingItemIndex
//                                     ? { ...cartItem, quantity: cartItem.quantity + 1 }
//                                     : cartItem
//                             );

//                             return { ...counter, items: updatedItems };
//                         } else {
//                             // Item does not exist, add new item
//                             return {
//                                 ...counter,
//                                 items: [...counter.items, { itemName: item.name, price: item.price, quantity: 1 }],
//                             };
//                         }
//                     }
//                     return counter;
//                 });
//             } else {
//                 // Counter does not exist, create a new one with counterId included
//                 return [
//                     ...prevCart,
//                     {
//                         counterId: counterId, // Added counterId here
//                         counterName: counterName,
//                         items: [{ itemName: item.name, price: item.price, quantity: 1 }],
//                     },
//                 ];
//             }
//         });
//     };



//     // const handleIncrement = (itemName) => {
//     //     setItemCounts((prevCounts) => ({
//     //         ...prevCounts,
//     //         [itemName]: (prevCounts[itemName] || 0) + 1,
//     //     }));
//     //     setCart((prevCart) =>
//     //         prevCart.map((cartItem) =>
//     //             cartItem.name === itemName
//     //                 ? { ...cartItem, quantity: cartItem.quantity + 1 }
//     //                 : cartItem
//     //         )
//     //     );
//     // };

//     // const handleDecrement = (itemName) => {

//     //     setItemCounts((prevCounts) => {
//     //         if (prevCounts[itemName] === 1) {
//     //             const newCounts = { ...prevCounts };
//     //             delete newCounts[itemName];
//     //             return newCounts;
//     //         }
//     //         return {
//     //             ...prevCounts,
//     //             [itemName]: prevCounts[itemName] - 1,
//     //         };
//     //     });

//     //     setCart((prevCart) =>
//     //         prevCart
//     //             .map((cartItem) =>
//     //                 cartItem.name === itemName
//     //                     ? { ...cartItem, quantity: cartItem.quantity - 1 }
//     //                     : cartItem
//     //             )
//     //             .filter((cartItem) => cartItem.quantity > 0) // Remove item if quantity is 0
//     //     );
//     // };


//     console.log(selectedCategory);

//     const handleIncrement = (counterId, counterName, itemName) => {

//         setItemCounts((prevCounts) => ({
//             ...prevCounts,
//             [counterId]: {
//                 ...(prevCounts[counterId] || {}),
//                 [itemName]: ((prevCounts[counterId] && prevCounts[counterId][itemName]) || 0) + 1,
//             },
//         }));


//         setCart((prevCart) =>
//             prevCart.map((counter) => {
//                 if (counter.counterName === counterName) {
//                     return {
//                         ...counter,
//                         items: counter.items.map((cartItem) =>
//                             cartItem.itemName === itemName
//                                 ? { ...cartItem, quantity: cartItem.quantity + 1 }
//                                 : cartItem
//                         ),
//                     };
//                 }
//                 return counter;
//             })
//         );
//     };

//     const handleDecrement = (counterId, counterName, itemName) => {

//         setItemCounts((prevCounts) => {
//             if (!prevCounts[counterId] || prevCounts[counterId][itemName] === 1) {
//                 const newCounts = { ...prevCounts };
//                 if (newCounts[counterId]) {
//                     delete newCounts[counterId][itemName];
//                     if (Object.keys(newCounts[counterId]).length === 0) {
//                         delete newCounts[counterId]; // Remove empty counter entries
//                     }
//                 }
//                 return newCounts;
//             }

//             return {
//                 ...prevCounts,
//                 [counterId]: {
//                     ...prevCounts[counterId],
//                     [itemName]: prevCounts[counterId][itemName] - 1,
//                 },
//             };
//         });



//         setCart((prevCart) =>
//             prevCart
//                 .map((counter) => {
//                     if (counter.counterName === counterName) {
//                         const updatedItems = counter.items
//                             .map((cartItem) =>
//                                 cartItem.itemName === itemName
//                                     ? { ...cartItem, quantity: cartItem.quantity - 1 }
//                                     : cartItem
//                             )
//                             .filter((cartItem) => cartItem.quantity > 0); // Remove if quantity is 0

//                         return updatedItems.length > 0
//                             ? { ...counter, items: updatedItems }
//                             : null; // Remove counter if no items remain
//                     }
//                     return counter;
//                 })
//                 .filter(Boolean) // Remove null entries (counters with no items)
//         );
//     };



//     console.log(cart);

//     useEffect(() => {
//         AOS.init({
//             duration: 5000,  // Adjust animation duration
//             offset: 100,     // Adjust animation trigger point
//             once: false,      // Animation happens once
//         });
//     }, []);

//     useEffect(() => {
//         AOS.refresh();
//     }, []);

//     const [showCart, setShowCart] = useState(false)

//     const showItems = () => {
//         setShowCart(!showCart)
//     }

//     const gotoCart = () => {
//         setShowCart(!showCart)
//     }

//     const [AllCountersData, setAllCountersData] = useState([]);
//     const getAllCountersWithMenu = async () => {
//         try {

//             const res = await Service.get("/counter/getAllWithAllData");
//             if (res.status == 200) {
//                 console.log(res.data);
//                 setAllCountersData(res.data);
//             }

//         } catch (error) {
//             console.log(error);

//         }
//     }

//     useEffect(() => {
//         getAllCountersWithMenu();
//     }, [])

//     useEffect(() => {
//         // const handleTotalAmount = () => {
//         //     try {
//         //         const total = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
//         //         setTotalAmount(total);
//         //     } catch (error) {
//         //         console.log(error)
//         //     }
//         // };

//         const handleTotalAmount = () => {
//             try {
//                 const total = cart.reduce((acc, counter) =>
//                     acc + counter.items.reduce((sum, item) => sum + item.quantity * item.price, 0), 0
//                 );
//                 setTotalAmount(total);
//             } catch (error) {
//                 console.log(error);
//             }
//         };


//         handleTotalAmount()
//     }, [cart]);

//     // console.log(totalAmount)

//     if (showCart)
//         return <Cart cartItems={cart} removeItem={removeItem} updateCart={updateCart} showItems={showItems} handleIncrement={handleIncrement} totalAmount={totalAmount} itemCounts={itemCounts} handleDecrement={handleDecrement} gotoCart={gotoCart} />


//     return (
//         <div className="container text-center col-12 col-md-8 mx-auto">
//            <div className='w-100 h-100 mb-2 d-flex text-light w-100 sticky-top justify-content-between align-items-center' style={{ height: '60px', backgroundColor: 'midnightblue' }}>
//               <div>
//                 <h3 className="ms-3">The Place Drive In</h3>
//               </div>

//             </div>


//             <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
//                 <div className="carousel-inner">
//                     {/* <div className="carousel-item active">
//                         <img
//                             src="https://image.wedmegood.com/resized/720X/uploads/member/2783269/1665386141_ARO__12_.jpg"
//                             className="d-block w-100"
//                             alt="Slide 1"
//                         />
//                     </div>
//                     <div className="carousel-item">
//                         <img
//                             src="https://irichphotography.com/wp-content/uploads/2022/02/PRE-WEDDING-SHOOT-OOTY-19.jpg"
//                             className="d-block w-100"
//                             alt="Slide 2"
//                         />
//                     </div>
//                     <div className="carousel-item">
//                         <img
//                             src="https://www.dphotofolio.com/wp-content/gallery/mixed-prewedding-photos/IMG_7868.jpg"
//                             className="d-block w-100"
//                             alt="Slide 3"
//                         />
//                     </div> */}
//                     <UserHomePage/>
//                 </div>
//             </div>


//             <div className="container mt-4" style={{ paddingBottom: '80px' }}>
//                 <div className="row row-gap-3">
//                     {AllCountersData.map((counter, index) => (
//                         <div key={index} className="col-12">
//                             <div className="card shadow">
//                                 <div className="card-body d-flex justify-content-between align-items-center">
//                                     <h4 className="card-title text-primary mb-0">{counter.COUNTERNAME}</h4>
//                                     <span
//                                         className="fs-4"
//                                         style={{ cursor: "pointer" }}
//                                         onClick={() => {
//                                             setSelectedCounter(selectedCounter === counter ? null : counter);
//                                             setSelectedCategory(null);
//                                         }}
//                                     >
//                                         {selectedCounter === counter ? (
//                                             <KeyboardArrowUpSharpIcon />
//                                         ) : (
//                                             <KeyboardArrowDownSharpIcon />
//                                         )}
//                                     </span>
//                                 </div>

//                                 {selectedCounter === counter && (
//                                     <div className="row row-gap-3 mb-5">
//                                         {counter.Categories.map((category, catIndex) => (
//                                             <div className="col-12" key={catIndex}>
//                                                 <div className="card mx-5">
//                                                     <div className="card-body">
//                                                         <div className="d-flex justify-content-between align-items-center">
//                                                             <h5 className="card-title">{category.name}</h5>
//                                                             <span
//                                                                 onClick={() =>
//                                                                     setSelectedCategory(selectedCategory === category ? null : category)
//                                                                 }
//                                                             >
//                                                                 {selectedCategory === category ? (
//                                                                     <KeyboardArrowUpSharpIcon />
//                                                                 ) : (
//                                                                     <KeyboardArrowDownSharpIcon />
//                                                                 )}
//                                                             </span>
//                                                         </div>

//                                                         {selectedCategory === category && (
//                                                             <div className="card border-0">
//                                                                 <div className="card-body">
//                                                                     <ul className="list-group">
//                                                                         {selectedCategory.menu.map((item, itemIndex) => (
//                                                                             <li
//                                                                                 key={itemIndex}
//                                                                                 className="list-group-item d-flex justify-content-between align-items-center border-0"
//                                                                             >
//                                                                                 <span className="fw-bold p-3">
//                                                                                     {item.name} - ₹{item.price}
//                                                                                 </span>
//                                                                                 {itemCounts[counter.counterId]?.[item.name] ? (
//                                                                                     <div className="d-flex align-items-center">
//                                                                                         <Button sx={{ backgroundColor: "blue" }} className="text-light">
//                                                                                             <span onClick={() => handleDecrement(counter.counterId, counter.counterName, item.name)}>
//                                                                                                 <RemoveSharpIcon />
//                                                                                             </span>
//                                                                                             <span className="mx-2 fw-bold">
//                                                                                                 {/* {itemCounts[item.name]} */}
//                                                                                                 {itemCounts[counter.counterId]?.[item.name] || 0}
//                                                                                             </span>
//                                                                                             <span onClick={() => handleIncrement(counter.counterId, counter.counterName, item.name)}>
//                                                                                                 <AddSharpIcon />
//                                                                                             </span>
//                                                                                         </Button>
//                                                                                     </div>
//                                                                                 ) : (
//                                                                                     <Button
//                                                                                         className="fw-bold text-light"
//                                                                                         sx={{ backgroundColor: "blue" }}
//                                                                                         onClick={() => handleAddClick(item, counter.counterName, counter.counterId)}
//                                                                                     >
//                                                                                         ADD
//                                                                                     </Button>
//                                                                                 )}
//                                                                             </li>
//                                                                         ))}
//                                                                     </ul>
//                                                                 </div>
//                                                             </div>
//                                                         )}

//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* <div data-aos="fade-up"
//                 data-aos-anchor-placement="bottom-center" className="bg-success">
//                 {cart.length > 0 ? (
//                     <div className="card border-0">
//                         <div className="card-body">
//                             <h4 className="fw-bold mb-3">Cart Items</h4>
//                             <ul className="list-group">
//                                 {cart.map((item, index) => (
//                                     <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
//                                         <span className="fw-bold p-3">
//                                             {item.name} - ₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}
//                                         </span>
//                                         <div className="d-flex align-items-center">
//                                             <Button sx={{ backgroundColor: "blue" }} className="text-light">
//                                                 <span onClick={() => handleDecrement(item.name)}>
//                                                     <RemoveSharpIcon />
//                                                 </span>
//                                                 <span className="mx-2 fw-bold">{item.quantity}</span>
//                                                 <span onClick={() => handleIncrement(item.name)}>
//                                                     <AddSharpIcon />
//                                                 </span>
//                                             </Button>
//                                         </div>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     </div>
//                 ) : (
//                     <p className="text-center text-muted">Your cart is empty.</p>
//                 )}
//             </div> */}

//             {cart.length > 0 && (
//                 <motion.nav
//                     className="navbar sticky-bottom bg-success text-light"
//                     style={{ height: "60px", padding: "10px" }}
//                     initial={{ opacity: 0, y: 50 }} // Animation starts from bottom
//                     animate={{ opacity: 1, y: 0 }} // Moves up smoothly
//                     exit={{ opacity: 0, y: 50 }} // Fades out when cart is empty
//                     transition={{ duration: 0.5 }}
//                 >
//                     <div className="container-fluid text-center d-flex justify-content-between align-items-center">
//                         <a className="navbar-brand text-light fw-bold" href="#">
//                             <span><ShoppingCartIcon /></span>{cart.length} Counter <span>{cart.length > 1 ? 's' : ''}</span> in Cart
//                         </a>
//                         {/* <h6>{totalAmount}</h6> */}
//                         <h5 onClick={gotoCart}>View Cart <span ><KeyboardArrowRightIcon /></span></h5>
//                     </div>
//                 </motion.nav>
//             )}


//             {/* <div data-aos="fade-up" data-aos-anchor-placement="bottom-center" className="bg-success">
//                 <h2>Sample Animated Text</h2>
//             </div> */}
//         </div>
//     );
// }

// export default UserDashboard;

import React, { useEffect, useState } from "react";
import KeyboardArrowUpSharpIcon from "@mui/icons-material/KeyboardArrowUpSharp";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import { Button } from "@mui/material";
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Cart from "./Cart";
import Service from "../Api_Services/CategoryService";
import UserHomePage from "./UserHomePage";
import socket from "../Api_Services/socket";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


// const counters = [
//     {
//         counterName: 'counter1',
//         counterId: 1,
//         Categories: [
//             {
//                 name: 'IDLY',
//                 menu: [
//                     { name: 'Plain Idly', price: '85' },
//                     { name: 'Ghee Pudi Idly', price: '114' },
//                     { name: 'Ghee Sambar Button Idly', price: '143' },
//                     { name: 'Ghee Idly', price: '143' },
//                     { name: 'Lemon Idly', price: '114' },
//                     { name: 'Kanchipuram Idly', price: '100' },
//                     { name: 'Banglore Idli', price: '81' },
//                     { name: 'Rasam Tari Idli', price: '140' },
//                     { name: 'Ragi Balls', price: '145' },
//                     { name: 'Idiyappam', price: '180' },

//                 ],
//             },

//             {
//                 name: 'VADA',
//                 menu: [
//                     { name: 'Dahi Vada', price: '149' },
//                     { name: 'Mini Vada Sambar Dip', price: '114' },
//                     { name: 'Rasam Vada', price: '124' },
//                     { name: 'Onion Pakooda', price: '105' },
//                     { name: 'Masala Vada', price: '90' },
//                 ]
//             },]

//     },
//     {
//         counterName: 'counter2',
//         counterId: 2,
//         Categories: [

//             {
//                 name: 'ABC',
//                 menu: [
//                     { name: 'Plain Idly', price: '85' },
//                     { name: 'Ghee Pudi Idly', price: '114' },
//                     { name: 'Ghee Sambar Button Idly', price: '143' },
//                     { name: 'Ghee Idly', price: '143' },
//                     { name: 'Lemon Idly', price: '114' },
//                     { name: 'Kanchipuram Idly', price: '100' },
//                     { name: 'Banglore Idli', price: '81' },
//                     { name: 'Rasam Tari Idli', price: '140' },
//                     { name: 'Ragi Balls', price: '145' },
//                     { name: 'Idiyappam', price: '180' },

//                 ],
//             },

//             {
//                 name: 'DEF',
//                 menu: [
//                     { name: 'Dahi Vada', price: '149' },
//                     { name: 'Mini Vada Sambar Dip', price: '114' },
//                     { name: 'Rasam Vada', price: '124' },
//                     { name: 'Onion Pakooda', price: '105' },
//                     { name: 'Masala Vada', price: '90' },
//                 ]
//             },]

//     },
//     {
//         counterName: 'counter3',
//         counterId: 3,
//         Categories: [

//             {
//                 name: 'GHI',
//                 menu: [
//                     { name: 'Plain Idly', price: '85' },
//                     { name: 'Ghee Pudi Idly', price: '114' },
//                     { name: 'Ghee Sambar Button Idly', price: '143' },
//                     { name: 'Ghee Idly', price: '143' },
//                     { name: 'Lemon Idly', price: '114' },
//                     { name: 'Kanchipuram Idly', price: '100' },
//                     { name: 'Banglore Idli', price: '81' },
//                     { name: 'Rasam Tari Idli', price: '140' },
//                     { name: 'Ragi Balls', price: '145' },
//                     { name: 'Idiyappam', price: '180' },

//                 ],
//             },

//             {
//                 name: 'JKL',
//                 menu: [
//                     { name: 'Dahi Vada', price: '149' },
//                     { name: 'Mini Vada Sambar Dip', price: '114' },
//                     { name: 'Rasam Vada', price: '124' },
//                     { name: 'Onion Pakooda', price: '105' },
//                     { name: 'Masala Vada', price: '90' },
//                 ]
//             },]

//     },
//     {
//         counterName: 'counter4',
//         counterId: 4,
//         Categories: [

//             {
//                 name: 'MNO',
//                 menu: [
//                     { name: 'Plain Idly', price: '85' },
//                     { name: 'Ghee Pudi Idly', price: '114' },
//                     { name: 'Ghee Sambar Button Idly', price: '143' },
//                     { name: 'Ghee Idly', price: '143' },
//                     { name: 'Lemon Idly', price: '114' },
//                     { name: 'Kanchipuram Idly', price: '100' },
//                     { name: 'Banglore Idli', price: '81' },
//                     { name: 'Rasam Tari Idli', price: '140' },
//                     { name: 'Ragi Balls', price: '145' },
//                     { name: 'Idiyappam', price: '180' },

//                 ],
//             },

//             {
//                 name: 'PQR',
//                 menu: [
//                     { name: 'Dahi Vada', price: '149' },
//                     { name: 'Mini Vada Sambar Dip', price: '114' },
//                     { name: 'Rasam Vada', price: '124' },
//                     { name: 'Onion Pakooda', price: '105' },
//                     { name: 'Masala Vada', price: '90' },
//                 ]
//             },]

//     },
// ];
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import UserHeader from "./UserHeader";


function UserDashboard() {
    const [selectedCounter, setSelectedCounter] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [cart, setCart] = useState([]);
    const [itemCounts, setItemCounts] = useState({});

    const [totalAmount, setTotalAmount] = useState(0)

    // const handleAddClick = (itemName) => {
    //     setItemCounts((prevCounts) => ({
    //         ...prevCounts,
    //         [itemName]: (prevCounts[itemName] || 0) + 1,
    //     }));

    //     setCart((prevCart) => ({
    //         ...prevCart,
    //         [itemName]: (prevCart[itemName] || 0) + 1,
    //     }));
    // };

    // const handleIncrement = (itemName) => {
    //     setItemCounts((prevCounts) => ({
    //         ...prevCounts,
    //         [itemName]: (prevCounts[itemName] || 0) + 1,
    //     }));

    //     setCart((prevCart) => ({
    //         ...prevCart,
    //         [itemName]: (prevCart[itemName] || 0) + 1,
    //     }));
    // };

    // const handleDecrement = (itemName) => {
    //     setItemCounts((prevCounts) => {
    //         if (prevCounts[itemName] === 1) {
    //             const newCounts = { ...prevCounts };
    //             delete newCounts[itemName];
    //             return newCounts;
    //         }
    //         return {
    //             ...prevCounts,
    //             [itemName]: prevCounts[itemName] - 1,
    //         };
    //     });

    //     setCart((prevCart) => {
    //         if (prevCart[itemName] === 1) {
    //             const newCart = { ...prevCart };
    //             delete newCart[itemName];
    //             return newCart;
    //         }
    //         return {
    //             ...prevCart,
    //             [itemName]: prevCart[itemName] - 1,
    //         };
    //     });
    // };

    const removeItem = (index) => {
        setCart(prev => prev.filter((_, i) => i !== index));
    };

    const updateCart = (index, newQuantity) => {
        setCart(prevCart =>
            prevCart.map((item, i) =>
                i === index ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    // console.log(cart);


    // const handleAddClick = (item, counterName) => {
    //     setItemCounts((prevCounts) => ({
    //         ...prevCounts,
    //         [item.name]: (prevCounts[item.name] || 0) + 1,
    //     }));
    //     setCart((prevCart) => {
    //         const existingItem = prevCart.find((cartItem) => cartItem.name === item.name);
    //         if (existingItem) {
    //             return prevCart.map((cartItem) =>
    //                 cartItem.name === item.name
    //                     ? { ...cartItem, quantity: cartItem.quantity + 1 }
    //                     : cartItem
    //             );
    //         } else {
    //             return [...prevCart, { ...item, quantity: 1 }];
    //         }
    //     });
    // };

    // const handleAddClick = (item, counterName, counterId) => {

    //     setItemCounts((prevCounts) => ({
    //         ...prevCounts,
    //         [counterId]: {
    //             ...(prevCounts[counterId] || {}),
    //             [item.name]: ((prevCounts[counterId] && prevCounts[counterId][item.name]) || 0) + 1,
    //         },
    //     }));


    //     setCart((prevCart) => {
    //         // Find if the counter already exists
    //         const counterIndex = prevCart.findIndex((counter) => counter.counterName === counterName);

    //         if (counterIndex !== -1) {
    //             // Counter exists, update the existing counter's items
    //             return prevCart.map((counter, index) => {
    //                 if (index === counterIndex) {
    //                     // Find if the item exists in the counter
    //                     const existingItemIndex = counter.items.findIndex(
    //                         (cartItem) => cartItem.itemName === item.name
    //                     );

    //                     if (existingItemIndex !== -1) {
    //                         // Item exists, update quantity
    //                         const updatedItems = counter.items.map((cartItem, i) =>
    //                             i === existingItemIndex
    //                                 ? { ...cartItem, quantity: cartItem.quantity + 1 }
    //                                 : cartItem
    //                         );

    //                         return { ...counter, items: updatedItems };
    //                     } else {
    //                         // Item does not exist, add new item
    //                         return {
    //                             ...counter,
    //                             items: [...counter.items, { itemName: item.name, price: item.price, quantity: 1 }],
    //                         };
    //                     }
    //                 }
    //                 return counter;
    //             });
    //         } else {
    //             // Counter does not exist, create a new one with the first item
    //             return [
    //                 ...prevCart,
    //                 {
    //                     counterName: counterName,
    //                     items: [{ itemName: item.name, price: item.price, quantity: 1 }],
    //                 },
    //             ];
    //         }
    //     });
    // };

    const handleAddClick = (item, counterName, counterId) => {
        setItemCounts((prevCounts) => ({
            ...prevCounts,
            [counterId]: {
                ...(prevCounts[counterId] || {}),
                [item.name]: ((prevCounts[counterId] && prevCounts[counterId][item.name]) || 0) + 1,
            },
        }));

        setCart((prevCart) => {
            // Find if the counter already exists
            const counterIndex = prevCart.findIndex((counter) => counter.counterId === counterId);

            if (counterIndex !== -1) {
                // Counter exists, update the existing counter's items
                return prevCart.map((counter, index) => {
                    if (index === counterIndex) {
                        // Find if the item exists in the counter
                        const existingItemIndex = counter.items.findIndex(
                            (cartItem) => cartItem.itemName === item.name
                        );

                        if (existingItemIndex !== -1) {
                            // Item exists, update quantity
                            const updatedItems = counter.items.map((cartItem, i) =>
                                i === existingItemIndex
                                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                                    : cartItem
                            );

                            return { ...counter, items: updatedItems };
                        } else {
                            // Item does not exist, add new item
                            return {
                                ...counter,
                                items: [...counter.items, { itemName: item.name, price: item.price, quantity: 1 }],
                            };
                        }
                    }
                    return counter;
                });
            } else {
                // Counter does not exist, create a new one with counterId included
                return [
                    ...prevCart,
                    {
                        counterId: counterId, // Added counterId here
                        counterName: counterName,
                        items: [{ itemName: item.name, price: item.price, quantity: 1 }],
                    },
                ];
            }
        });
    };



    // const handleIncrement = (itemName) => {
    //     setItemCounts((prevCounts) => ({
    //         ...prevCounts,
    //         [itemName]: (prevCounts[itemName] || 0) + 1,
    //     }));
    //     setCart((prevCart) =>
    //         prevCart.map((cartItem) =>
    //             cartItem.name === itemName
    //                 ? { ...cartItem, quantity: cartItem.quantity + 1 }
    //                 : cartItem
    //         )
    //     );
    // };

    // const handleDecrement = (itemName) => {

    //     setItemCounts((prevCounts) => {
    //         if (prevCounts[itemName] === 1) {
    //             const newCounts = { ...prevCounts };
    //             delete newCounts[itemName];
    //             return newCounts;
    //         }
    //         return {
    //             ...prevCounts,
    //             [itemName]: prevCounts[itemName] - 1,
    //         };
    //     });

    //     setCart((prevCart) =>
    //         prevCart
    //             .map((cartItem) =>
    //                 cartItem.name === itemName
    //                     ? { ...cartItem, quantity: cartItem.quantity - 1 }
    //                     : cartItem
    //             )
    //             .filter((cartItem) => cartItem.quantity > 0) // Remove item if quantity is 0
    //     );
    // };


    // console.log(selectedCategory);

    const handleIncrement = (counterId, counterName, itemName) => {

        setItemCounts((prevCounts) => ({
            ...prevCounts,
            [counterId]: {
                ...(prevCounts[counterId] || {}),
                [itemName]: ((prevCounts[counterId] && prevCounts[counterId][itemName]) || 0) + 1,
            },
        }));


        setCart((prevCart) =>
            prevCart.map((counter) => {
                if (counter.counterName === counterName) {
                    return {
                        ...counter,
                        items: counter.items.map((cartItem) =>
                            cartItem.itemName === itemName
                                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                                : cartItem
                        ),
                    };
                }
                return counter;
            })
        );
    };

    const handleDecrement = (counterId, counterName, itemName) => {

        setItemCounts((prevCounts) => {
            if (!prevCounts[counterId] || prevCounts[counterId][itemName] === 1) {
                const newCounts = { ...prevCounts };
                if (newCounts[counterId]) {
                    delete newCounts[counterId][itemName];
                    if (Object.keys(newCounts[counterId]).length === 0) {
                        delete newCounts[counterId]; // Remove empty counter entries
                    }
                }
                return newCounts;
            }

            return {
                ...prevCounts,
                [counterId]: {
                    ...prevCounts[counterId],
                    [itemName]: prevCounts[counterId][itemName] - 1,
                },
            };
        });



        setCart((prevCart) =>
            prevCart
                .map((counter) => {
                    if (counter.counterName === counterName) {
                        const updatedItems = counter.items
                            .map((cartItem) =>
                                cartItem.itemName === itemName
                                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                                    : cartItem
                            )
                            .filter((cartItem) => cartItem.quantity > 0); // Remove if quantity is 0

                        return updatedItems.length > 0
                            ? { ...counter, items: updatedItems }
                            : null; // Remove counter if no items remain
                    }
                    return counter;
                })
                .filter(Boolean) // Remove null entries (counters with no items)
        );
    };



    // console.log(cart);

    useEffect(() => {
        AOS.init({
            duration: 5000,  // Adjust animation duration
            offset: 100,     // Adjust animation trigger point
            once: false,      // Animation happens once
        });
    }, []);

    useEffect(() => {
        AOS.refresh();
    }, []);

    const [showCart, setShowCart] = useState(false)

    const showItems = () => {
        setShowCart(!showCart)
    }

    const gotoCart = () => {
        setShowCart(!showCart)
    }

    const [AllCountersData, setAllCountersData] = useState([]);
    const getAllCountersWithMenu = async () => {
        try {

            const res = await Service.get("/counter/getAllWithAllData");
            if (res.status == 200) {
                // console.log(res.data);
                setAllCountersData(res.data);
            }

        } catch (error) {
            // console.log(error);

        }
    }


    useEffect(() => {
        getAllCountersWithMenu();
        socket.on("CategoryStatusUpdated", getAllCountersWithMenu);
        socket.on("ItemStatusUpdated", getAllCountersWithMenu);
        socket.on("counterStatus", getAllCountersWithMenu);
        socket.on("updateCategory", getAllCountersWithMenu);
        socket.on("updateCategory", getAllCountersWithMenu);
        socket.on("ItemUpdated", getAllCountersWithMenu);
        socket.on("CategoryDeleted", getAllCountersWithMenu);
        socket.on("itemDeleted", getAllCountersWithMenu);


        return () => {
            socket.off("CategoryStatusUpdated", getAllCountersWithMenu);
            socket.off("ItemStatusUpdated", getAllCountersWithMenu);
            socket.off("counterStatus", getAllCountersWithMenu);
            socket.off("updateCategory", getAllCountersWithMenu);
            socket.off("ItemUpdated", getAllCountersWithMenu);
            socket.off("CategoryDeleted", getAllCountersWithMenu);
            socket.off("itemDeleted", getAllCountersWithMenu);
        }

    }, []);




    useEffect(() => {
        // const handleTotalAmount = () => {
        //     try {
        //         const total = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
        //         setTotalAmount(total);
        //     } catch (error) {
        //         console.log(error)
        //     }
        // };

        const handleTotalAmount = () => {
            try {
                const total = cart.reduce((acc, counter) =>
                    acc + counter.items.reduce((sum, item) => sum + item.quantity * item.price, 0), 0
                );
                setTotalAmount(total);
            } catch (error) {
                // console.log(error);
            }
        };


        handleTotalAmount()
    }, [cart]);

    // console.log(totalAmount)

    if (showCart)
        return <Cart cartItems={cart} removeItem={removeItem} updateCart={updateCart} showItems={showItems} handleIncrement={handleIncrement} totalAmount={totalAmount} itemCounts={itemCounts} handleDecrement={handleDecrement} gotoCart={gotoCart} />


    return (
        <div style={{backgroundColor:'whitesmoke',minHeight:'100vh'}}>
        <div className=" text-center mx-auto bg-white"  style={{width:'100%',maxWidth:'500px',minHeight:'100vh'}}>
            
               <UserHeader/>
       

            <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner" style={{ borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px' }}>
                    {/* <div className="carousel-item active">
                        <img
                            src="https://image.wedmegood.com/resized/720X/uploads/member/2783269/1665386141_ARO__12_.jpg"
                            className="d-block w-100"
                            alt="Slide 1"
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            src="https://irichphotography.com/wp-content/uploads/2022/02/PRE-WEDDING-SHOOT-OOTY-19.jpg"
                            className="d-block w-100"
                            alt="Slide 2"
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            src="https://www.dphotofolio.com/wp-content/gallery/mixed-prewedding-photos/IMG_7868.jpg"
                            className="d-block w-100"
                            alt="Slide 3"
                        />
                    </div> */}
                    <UserHomePage />
                </div>
            </div>


            <div className=" mt-2" style={{ paddingBottom: '20px' }}>
                <div className="row row-gap-2 ">
                    {
                        AllCountersData.length > 0 ? <>
                            {AllCountersData.map((counter, index) => (
                                <>
                                    {counter.Categories.some(category => category.menu.length > 0) && (<>
                                        <div key={index} className="col-12">
                                            <div className="card ">
                                                <div className="card-body d-flex justify-content-between align-items-center">
                                                    <h4 className={`fs-6 card-title text-${counter.available ? "primary" : "secondary"} mb-0`}>{counter.counterName}</h4>
                                                    <span
                                                        className=""
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => {
                                                            setSelectedCounter(selectedCounter === counter ? null : counter);
                                                            setSelectedCategory(null);
                                                        }}
                                                    >
                                                        {selectedCounter === counter ? (
                                                            <KeyboardArrowUpSharpIcon />
                                                        ) : (
                                                            <KeyboardArrowDownSharpIcon />
                                                        )}
                                                    </span>
                                                </div>

                                                {selectedCounter === counter && (
                                                    <div className="row row-gap-2 mb-2">
                                                        {counter.Categories.filter(category => category.menu.length > 0).map((category, catIndex) => (
                                                            <div className="col-12" key={catIndex}>
                                                                <div className="card mx-2">
                                                                    <div className="card-body">
                                                                        <div className="d-flex justify-content-between text-start">
                                                                            <h5 className={`fs-6 card-title text-${category.available ? 'dark' : 'secondary'}`}>{category.name}</h5>
                                                                            <span
                                                                                onClick={() =>
                                                                                    setSelectedCategory(selectedCategory === category ? null : category)
                                                                                }
                                                                            >
                                                                                {selectedCategory === category ? (
                                                                                    <KeyboardArrowUpSharpIcon />
                                                                                ) : (
                                                                                    <KeyboardArrowDownSharpIcon />
                                                                                )}
                                                                            </span>
                                                                        </div>

                                                                        {selectedCategory === category && (
                                                                            <div className=" border-0 text-start w-100 h-100" >
                                                                                <div className="">
                                                                                    <ul className="list-group">
                                                                                        {selectedCategory.menu.map((item, itemIndex) => (
                                                                                            <li
                                                                                                key={itemIndex}
                                                                                                className={` row list-group-item d-flex justify-conten-between   border-0 text-${item.available ? 'dark' : 'secondary'}`}
                                                                                            >
                                                                                                <span className="text-start col-7">
                                                                                                    {item.name} - ₹{item.price}
                                                                                                </span>
                                                                                                <span className="col-5">
                                                                                                    {itemCounts[counter.counterId]?.[item.name] ? (
                                                                                                        <div className="d-flex align-items-center  border border 2px solid black fw-bold fs-4" style={{ borderRadius: '5px' }}>
                                                                                                            <Button sx={{ backgroundColor: "white" }} className="px-4 py-1">
                                                                                                                <span className="text-danger" onClick={() => handleDecrement(counter.counterId, counter.counterName, item.name)}>
                                                                                                                    <RemoveSharpIcon />
                                                                                                                </span>
                                                                                                                <span className="mx-2 fw-bold text-blue" >
                                                                                                                    {/* {itemCounts[item.name]} */}
                                                                                                                    {itemCounts[counter.counterId]?.[item.name] || 0}
                                                                                                                </span>
                                                                                                                <span className="text-success"  
                                                                                                                 
                                                                                                                 onClick={() => {
                                                                                                                  
                                                                                                                    const counting = itemCounts[counter.counterId]?.[item.name] || 0 ;
                                                                                                                    if (counting < 50) {
                                                                                                                        handleIncrement(counter.counterId, counter.counterName, item.name);
                                                                                                                    }
                                                                                                                  }}
                                                                                                                  style={{ 
                                                                                                                    cursor: itemCounts[counter.counterId]?.[item.name] >= 50 ? "not-allowed" : "pointer",
                                                                                                                    pointerEvents: itemCounts[counter.counterId]?.[item.name] >= 50 ? "none" : "auto",
                                                                                                                    opacity: itemCounts[counter.counterId]?.[item.name] >= 50 ? 0.1 : 1
                                                                                                                  }}
                                                                                                                  
                                                                                                                // onClick={() => handleIncrement(counter.counterId, counter.counterName, item.name)}
                                                                                                                >
                                                                                                                    <AddSharpIcon />
                                                                                                                </span>
                                                                                                            </Button>
                                                                                                        </div>
                                                                                                    ) : (

                                                                                                        <>
                                                                                                            <div className="justify-content-cennter align-items-center border border 2px solid black" style={{ borderRadius: '5px' }}> {
                                                                                                                item.available ?
                                                                                                                    <Button
                                                                                                                        className="fw-bold text-blue"
                                                                                                                        sx={{ backgroundColor: "" }}
                                                                                                                        onClick={() => handleAddClick(item, counter.counterName, counter.counterId)}

                                                                                                                    >
                                                                                                                        ADD
                                                                                                                    </Button>
                                                                                                                    :
                                                                                                                    <Button
                                                                                                                        className="text-secondary fw-bold border border-4"
                                                                                                                        size="small"
                                                                                                                        disabled
                                                                                                                    >
                                                                                                                        Not Available
                                                                                                                    </Button>

                                                                                                            }
                                                                                                            </div>
                                                                                                        </>


                                                                                                    )}
                                                                                                </span>
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        )}

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </>)}

                                </>

                            ))}
                        </> : <Skeleton count={5} height={35} duration={1} className="my-2" />
                    }

                </div>
            </div>

            {/* <div data-aos="fade-up"
                data-aos-anchor-placement="bottom-center" className="bg-success">
                {cart.length > 0 ? (
                    <div className="card border-0">
                        <div className="card-body">
                            <h4 className="fw-bold mb-3">Cart Items</h4>
                            <ul className="list-group">
                                {cart.map((item, index) => (
                                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                        <span className="fw-bold p-3">
                                            {item.name} - ₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}
                                        </span>
                                        <div className="d-flex align-items-center">
                                            <Button sx={{ backgroundColor: "blue" }} className="text-light">
                                                <span onClick={() => handleDecrement(item.name)}>
                                                    <RemoveSharpIcon />
                                                </span>
                                                <span className="mx-2 fw-bold">{item.quantity}</span>
                                                <span onClick={() => handleIncrement(item.name)}>
                                                    <AddSharpIcon />
                                                </span>
                                            </Button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-muted">Your cart is empty.</p>
                )}
            </div> */}

            {
                cart.length > 0 && (
                    <motion.nav
                        className="navbar sticky-bottom bg-success text-light"
                        style={{ height: "", padding: "5px" }}
                        initial={{ opacity: 0, y: 50 }} // Animation starts from bottom
                        animate={{ opacity: 1, y: 0 }} // Moves up smoothly
                        exit={{ opacity: 0, y: 50 }} // Fades out when cart is empty
                        transition={{ duration: 0.5 }}
                    >
                        {/* <div className="container text-center d-flex justify-content-between align-items-center">
                            <a className="navbar-brand text-light fw-bold" href="#">
                                <span><ShoppingCartIcon /></span>{cart.length} Counter <span>{cart.length > 1 ? 's' : ''}</span> in Cart
                            </a>
                            {/* <h6>{totalAmount}</h6> */}
                            {/* <h5 className="text-end text-light fw-bold" onClick={gotoCart}>View Cart <span ><KeyboardArrowRightIcon /></span></h5>
                        </div> */} 
                         <div className="container-fluid text-center d-flex justify-content-between align-items-center">
                            <a className="navbar-brand text-light fw-bold" href="#">
                                <span><ShoppingCartIcon /></span>{cart.length} Counter <span>{cart.length > 1 ? 's' : ''}</span> in Cart
                            </a>
                            {/* <h6>{totalAmount}</h6> */}
                            <h6 className=" fw-bold" style={{cursor:'pointer'}} onClick={gotoCart}>View Cart <span className="fs-3 fw-bold"><span className="fs-3" ><DoubleArrowIcon /></span></span></h6>
                        </div>
                    </motion.nav>
                )
            }


            {/* <div data-aos="fade-up" data-aos-anchor-placement="bottom-center" className="bg-success">
                <h2>Sample Animated Text</h2>
            </div> */}
        </div >
        </div>
    );
}

export default UserDashboard;
