let cart ={};
let totalPrice = 0;

function updateCart(itemName, itemPrice, quantity) {
    quantity = parseInt(quantity);

    if (quantity === 0) {
        delete cart[itemName];
    } else {
        cart[itemName] = { price: itemPrice, quantity, total: itemPrice * quantity };
    }

    updateCartTable();
}

function updateCartTable() {
    const cartTableBody = document.querySelector("#cart-table tbody");
    cartTableBody.innerHTML = "";

    totalPrice = 0;

    for (const [itemName, itemDetails] of Object.entries(cart)) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${itemName}</td>
            <td>${itemDetails.quantity}</td>
            <td>$${itemDetails.price}</td>
            <td>$${itemDetails.total}</td>
        `;

        totalPrice += itemDetails.total;
        cartTableBody.appendChild(row);
    }

    document.getElementById("total-price").textContent = `Total: $${totalPrice}`;
}

function saveFavorites() {
    localStorage.setItem("favoriteCart", JSON.stringify(cart));
    alert("Cart saved as favorite!");
}

function applyFavorites() {
    const favoriteCart = JSON.parse(localStorage.getItem("favoriteCart"));

    if (favoriteCart) {
        cart = favoriteCart;
        updateCartTable();
        alert("Favorite cart applied!");
    } else {
        alert("No favorite cart found.");
    }
}

function redirectToCheckout() {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("totalPrice", totalPrice);
    window.location.href = "checkout.html";
}
