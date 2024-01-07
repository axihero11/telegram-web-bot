import React, { useState } from "react";
import "./card.css";
import Button from "../button/Button";

const Card = (props) => {
    const { course, onAddItem, onRemoveItem } = props;
    const [count, setCount] = useState(0);
    const handleIncrement = () => {
        setCount((prev) => prev + 1);
        onAddItem(course);
    };
    const handleDecrement = () => {
        setCount((prev) => prev - 1);
        onRemoveItem(course);
    };
    return (
        <>
            <div className="card">
                <span
                    className={`${
                        count !== 0 ? "card__badge" : "card__badge-hidden"
                    }`}
                >
                    {count}
                </span>
                <div className="img__container">
                    <img
                        src={course.Image}
                        alt={course.title}
                        width={"100%"}
                        height={"230px"}
                    />
                </div>
                <div className="card__body">
                    <div className="card__title">{course.title}</div>
                    <div className="card__price">
                        {course.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                        })}
                    </div>
                </div>
                <div className="hr"></div>
                <div className="btn__container">
                    <Button
                        type={"add"}
                        onClick={handleIncrement}
                        title={"+"}
                    />
                    {count !== 0 && (
                        <Button
                            type={"checkout"}
                            onClick={handleDecrement}
                            title={"-"}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default Card;
