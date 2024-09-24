import React from "react";
import { CardElement } from "@stripe/react-stripe-js";
import { Card } from "@mui/material";

export default function PaymentForm() {
  return (
    <div>
      <CardElement></CardElement>
      <button>Pay Now</button>
    </div>
  );
}
