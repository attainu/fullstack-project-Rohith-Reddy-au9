import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../components/stripeCheckout";
import "../strip.css";
const STRIPE_KEY = "pk_test_51IZKZ4SBKRZHKo3pT8zJJxOXg1aljumgBVbHvILjhldZpUKaUwYqBz0Xr3ZQ3jDTKAVPCpdoLEWUTTDTZdXewWCD00CsYIDwRy"
const PaymentPage = () => {
  const promise = loadStripe(STRIPE_KEY);

  return (
    <div className="container p-5 text-center">
      <h4>Complete your purchase</h4>
      <Elements stripe={promise}>
        <div className="col-md-8 offset-md-2">
          <StripeCheckout />
        </div>
      </Elements>
    </div>
  );
};

export default PaymentPage;

 