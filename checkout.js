document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    const totalPrice = localStorage.getItem("totalPrice") || 0;

    const checkoutTableBody = document.querySelector("#checkout-table tbody");
    const checkoutTotalPrice = document.getElementById("checkout-total-price");

    // Populate cart details in the table
    for (const [itemName, itemDetails] of Object.entries(cart)) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${itemName}</td>
            <td>${itemDetails.quantity}</td>
            <td>$${itemDetails.price}</td>
            <td>$${itemDetails.total}</td>
        `;

        checkoutTableBody.appendChild(row);
    }

    checkoutTotalPrice.textContent = `Total: $${totalPrice}`;

    const checkoutForm = document.getElementById("checkout-form");
    const confirmationSection = document.getElementById("confirmation-section");
    const paymentMethod = document.getElementById("payment");
    const cardDetails = document.getElementById("card-details");
    const deliveryDateInput = document.getElementById("delivery-date");

    // Show/hide card details based on payment method
    paymentMethod.addEventListener("change", () => {
        if (paymentMethod.value === "credit") {
            cardDetails.style.display = "block";
        } else {
            cardDetails.style.display = "none";
        }
    });

    // Dynamically calculate delivery date (e.g., 3 business days from today)
    const calculateDeliveryDate = () => {
        const today = new Date();
        let deliveryDate = new Date();

        // Add 3 business days
        let businessDaysAdded = 0;
        while (businessDaysAdded < 3) {
            deliveryDate.setDate(deliveryDate.getDate() + 1);

            // Exclude weekends (Saturday and Sunday)
            if (deliveryDate.getDay() !== 0 && deliveryDate.getDay() !== 6) {
                businessDaysAdded++;
            }
        }

        return deliveryDate.toLocaleDateString();
    };

    // Set the delivery date on load
    deliveryDateInput.value = calculateDeliveryDate();

    // Handle form submission
    checkoutForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const contact = document.getElementById("contact").value;
        const address = document.getElementById("address").value;
        const email = document.getElementById("email").value;
        const payment = paymentMethod.value;


        // If card payment is selected, ensure card details are filled
        if (payment === "credit") {
            const cardNumber = document.getElementById("card-number").value;
            const ccvNumber = document.getElementById("ccv-number").value;

            if (!cardNumber || !ccvNumber) {
                alert("Please fill in your card details.");
                return;
            }
        }

        const deliveryDate = deliveryDateInput.value;

        confirmationSection.innerHTML = `
            <h3>Thank you for your purchase, ${name}!</h3>
            <p>Contact: ${contact}</p>
            <p>Your order will be delivered to: ${address}</p>
            <p>Delivery Date: ${deliveryDate}</p>
            <p>Payment method: ${payment === "credit" ? "Card Payment" : "Cash on Delivery"}</p>
            <p>Email: ${email}</p>
        `;
    });
});
