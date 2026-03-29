let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, image) {

    cart.push({
        name: name,
        price: price,
        image: image,
        qty: 1
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const count = document.getElementById("cart-count");
    if (count) {
        count.textContent = cart.length;
    }
}

updateCartCount();