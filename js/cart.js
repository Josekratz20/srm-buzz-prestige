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
    const summaryContainer = document.getElementById("cart-summary");
    const emptyMsg = document.getElementById("empty-cart-msg");

    if (!cartItemsContainer) return; // Only run on the cart page

    cartItemsContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        if(summaryContainer) summaryContainer.style.display = 'none';
        if(emptyMsg) emptyMsg.style.display = 'block';
        return;
    }

    if(summaryContainer) summaryContainer.style.display = 'block';
    if(emptyMsg) emptyMsg.style.display = 'none';

    cart.forEach((item, index) => {
        const price = parseFloat(item.price);
        const itemTotal = price * item.qty;
        total += itemTotal;

        const div = document.createElement("div");
        div.className = "cart-item-card";
        div.style.cssText = `
            display: flex; align-items: center; justify-content: space-between; 
            padding: 25px; background: #fff; margin-bottom: 20px; 
            border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.1);
            color: #0f172a; border: 1px solid rgba(0,0,0,0.05);
        `;
        
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 15px; border: 3px solid #f1f5f9;">
            <div style="flex: 1; padding: 0 30px;">
                <h3 style="font-size: 1.5rem; font-family: 'Playfair Display', serif; margin-bottom: 5px; color: #b45309;">${item.name}</h3>
                <p style="opacity: 0.6; font-weight: 600;">KSh ${price.toLocaleString()} x ${item.qty}</p>
            </div>
            <div style="text-align: right; margin-right: 30px;">
                <p style="font-size: 0.7rem; font-weight: 800; letter-spacing: 2px; opacity: 0.4;">TOTAL</p>
                <p style="font-size: 1.5rem; font-weight: 800;">KSh ${itemTotal.toLocaleString()}</p>
            </div>
            <button onclick="removeFromCart(${index})" style="background: #fef2f2; color: #ef4444; border: 2px solid #fee2e2; padding: 12px 20px; border-radius: 12px; cursor: pointer; font-weight: 800; transition: 0.3s;" onmouseover="this.style.background='#ef4444'; this.style.color='white'" onmouseout="this.style.background='#fef2f2'; this.style.color='#ef4444'">🗑️ DELETE</button>
        `;
        
        cartItemsContainer.appendChild(div);
    });

    totalEl.textContent = total.toLocaleString();
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