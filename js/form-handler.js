async function srm_submitForm(event, formId, successMsg) {
    event.preventDefault();
    
    const form = document.getElementById(formId);
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    // Aesthetic Loading State
    btn.disabled = true;
    btn.innerHTML = "<span>✨</span> Sending Moment...";
    
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));

    try {
        // POS INTEGRATION: Record to local sales.json if it's an order
        if(formId === 'checkoutForm') {
            await fetch('/api/sales', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        }

        const response = await fetch(form.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            // Show Professional Success Toast
            srm_showToast(successMsg);
            form.reset();
            
            // Special case for cart: clear it after order
            if(formId === 'checkoutForm') {
                localStorage.removeItem("cart");
                if (typeof updateCartCount === 'function') updateCartCount();
                setTimeout(() => window.location.href = "/", 3000);
            }
        } else {
            throw new Error("Submission Failed");
        }
    } catch (error) {
        srm_showToast("❌ Connection error. Please try again.", true);
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
    }
}


function srm_showToast(msg, isError = false) {
    const toast = document.createElement("div");
    toast.style.cssText = `
        position: fixed;
        bottom: 40px;
        right: 40px;
        background: ${isError ? '#7f1d1d' : 'var(--accent-gold)'};
        color: ${isError ? 'white' : 'black'};
        padding: 20px 40px;
        border-radius: 20px;
        box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        font-weight: 800;
        z-index: 100000;
        transform: translateY(100px);
        opacity: 0;
        transition: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    `;
    toast.innerText = msg;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.transform = "translateY(0)";
        toast.style.opacity = "1";
    }, 10);
    
    setTimeout(() => {
        toast.style.transform = "translateY(100px)";
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}
