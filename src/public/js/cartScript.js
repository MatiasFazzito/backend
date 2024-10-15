function fetchCarts() {
  fetch('/cart/allCarts')
    .then(response => response.json())
    .then(carts => {
      populateCartSelect(carts)
    })
    .catch(error => {
      console.error('Error fetching carts:', error)
    })
}

function populateCartSelect(carts) {
  const cartId = document.getElementById('cartId')
  if (cartId) {
    carts.forEach(cart => {
      const option = document.createElement('option')
      option.value = cart._id
      option.text = cart.title + ": " + cart._id
      cartId.appendChild(option)
    })
    cartId.addEventListener('change', () => {
      selectedCartId = cartId.value
    })
  }
}


fetchCarts()