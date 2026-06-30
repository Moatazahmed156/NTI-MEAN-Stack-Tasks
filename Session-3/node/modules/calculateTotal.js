const cart = require("../data/cart");

function calculateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  console.log(`\nTotal Price: $${total}`);

  return total;
}

module.exports = calculateTotal;