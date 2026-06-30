const addToCart = require("./modules/addToCart");
const removeFromCart = require("./modules/removeFromCart");
const listCart = require("./modules/listCart");
const calculateTotal = require("./modules/calculateTotal");

// Add products
addToCart(1);
addToCart(2);
addToCart(5);

listCart();
calculateTotal();

// Remove product
removeFromCart(2);

listCart();
calculateTotal();