console.log("Running")
document.addEventListener("DOMContentLoaded", () => {
    const products = [
        { id: 1, name: "Product 1", price: 29.99 },
        { id: 2, name: "Product 2", price: 19.99 },
        { id: 3, name: "Product 3", price: 59.99 },
    ];

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart");
    const cartTotalMessage = document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total-price");
    const checkOutBtn = document.getElementById("checkout-btn");

    // Render product list
    products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add to cart</button>
        `;
        productList.appendChild(productDiv);
    });

    // Add product to cart
    productList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const productId = parseInt(e.target.getAttribute("data-id"));
            const product = products.find((p) => p.id === productId);
            addToCart(product);
        }
    });

    function addToCart(product) {
        cart.push(product);
        updateLocalStorage();
        renderCart();
    }

    // Remove item from cart
    function removeFromCart(productId) {
        const index = cart.findIndex((item) => item.id === productId);
        if (index > -1) {
            cart.splice(index, 1);
            updateLocalStorage();
            renderCart();
        }
    }

    // Update localStorage
    function updateLocalStorage() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Render cart
    function renderCart() {
        cartItems.innerText = "";
        let totalPrice = 0;

        if (cart.length > 0) {
            emptyCartMessage.classList.add("hidden");
            cartTotalMessage.classList.remove("hidden");
            cart.forEach((item) => {
                totalPrice += item.price;
                const cartItem = document.createElement("div");
                cartItem.classList.add("cart-item");
                cartItem.innerHTML = `
                ${item.name} - $${item.price.toFixed(2)}
                <button class="delete-btn" data-id="${item.id}">Delete</button>
                `;
                cartItems.appendChild(cartItem);
            });
            totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;
        } else {
            emptyCartMessage.classList.remove("hidden");
            totalPriceDisplay.textContent = `$0.00`;
        }
    }

    // Handle delete button click
    cartItems.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const productId = parseInt(e.target.getAttribute("data-id"));
            removeFromCart(productId);
        }
    });

    // Checkout
    checkOutBtn.addEventListener("click", () => {
        cart.length = 0;
        updateLocalStorage();
        alert("Checkout successfully");
        renderCart();
    });

    // Load cart from localStorage on page load
    renderCart();
});
