/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alerts";
const stripe = Stripe(
    "pk_test_51PB6KWAurZmL4PuRgFWCT5lS4HEbyYwDQKpZbDu3G60YXNdXv90x79NqUTpKSCZErZwOX9EVARfOg5GcrhyVKt6200ko6vkKVQ",
);

export const bookTour = async (tourId) => {
    try {
        // 1) Get checkout session from API
        const session = await axios(
            // `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`,
            `/api/v1/bookings/checkout-session/${tourId}`,
        );

        // 2) Create checkout form + chanre credit card
        await stripe.redirectToCheckout({
            sessionId: session.data.session.id,
        });
    } catch (err) {
        console.log(err);
        showAlert("error", err);
    }
};
