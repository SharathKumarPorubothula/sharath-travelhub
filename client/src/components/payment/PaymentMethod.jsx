// src/components/payment/PaymentMethod.jsx
import React from "react";

const PaymentMethod = ({ selectedMethod, onSelect }) => {
  return (
    <div className="payment-methods">
      <h3>Select Payment Method</h3>
      <div className="methods">
        {["Card", "UPI", "Wallet"].map((method) => (
          <button
            key={method}
            className={selectedMethod === method ? "selected" : ""}
            onClick={() => onSelect(method)}
          >
            {method}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethod;
