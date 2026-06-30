const cart = require("../data/cart");

function listCart() {
  console.log("\n===== Shopping Cart =====");

  if (cart.length === 0) {
    console.log("Cart is empty.");
    return;
  }

  cart.forEach((item, index) => {
    console.log(
      `${index + 1}. ${item.name} - $${item.price}`
    );
  });
}

module.exports = listCart;