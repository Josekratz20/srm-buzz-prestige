// LOAD CART FROM STORAGE
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ADD TO CART
function addToCart(name, price, image) {
    const item = { name, price, image, qty: 1 };

    // CHECK IF ITEM EXISTS
    const existing = cart.find(i => i.name === name);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push(item);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    // Professional Toast Notification
    let toast = document.createElement("div");
    toast.className = "toast-notification";
    toast.innerHTML = `✅ <span><strong>${name}</strong> added to cart</span>`;
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => toast.classList.add("show"), 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// UPDATE CART COUNT
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);

    const cartEl = document.getElementById("cart-count");
    if (cartEl) cartEl.textContent = count;
}

// LOAD COUNT ON PAGE LOAD
updateCartCount();

// RENDER CART ITEMS on the Cart Page
function renderCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalEl = document.getElementById("total");

    if (!cartItemsContainer) return; // Only run on the cart page

    cartItemsContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p style='margin: 20px 0;'>Your cart is empty.</p>";
        totalEl.textContent = "0";
        return;
    }

    cart.forEach((item, index) => {
        // Ensure price is treated as a number
        const price = parseFloat(item.price);
        const itemTotal = price * item.qty;
        total += itemTotal;

        cartItemsContainer.innerHTML += `
            <div class="cart-item" style="display: flex; align-items: center; justify-content: space-between; padding: 15px; border-bottom: 1px solid #333; margin-bottom: 10px; background: #1a1a1a; border-radius: 8px;">
                <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 5px; background: white;">
                <div style="flex: 1; padding: 0 15px;">
                    <h3 style="margin: 0; font-size: 1.1em;">${item.name}</h3>
                    <p style="margin: 5px 0 0; color: #aaa; font-size: 0.9em;">KSh ${price} x ${item.qty}</p>
                </div>
                <div style="font-weight: bold; font-size: 1.1em; color: #fff;">
                    KSh ${itemTotal}
                </div>
                <button onclick="removeFromCart(${index})" style="background: #e74c3c; color: white; border: none; padding: 8px 12px; margin-left: 15px; cursor: pointer; border-radius: 5px; font-weight: bold;">X</button>
            </div>
        `;
    });

    totalEl.textContent = total;
}

// REMOVE ITEM FROM CART
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

// Initial Render
renderCart();