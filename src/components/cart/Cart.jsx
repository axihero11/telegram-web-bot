import React from "react";
import Button from "../button/Button";
import "./cart.css";
import { totalPrice } from "../units/total-price";

function Cart({ cartItems,onCheckout }) {
    return (
        <div className="cart__continer">
            <p>
                Umumiy Narx:{" "}
                {totalPrice(cartItems).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                })}
            </p>
            <Button
                title={`${
                    cartItems.length === 0 ? "Buyrutma berish" : "To'lov"
                }`}
                type={"checkout"}
                onClick={onCheckout}
            />
        </div>
    );
}
export default Cart;
