import Card from "./components/card/Card";
import Cart from "./components/cart/Cart";
import { getData } from "./constants/db";
import { useCallback, useEffect, useState } from "react";
import "./App.css";

const telegram = window.Telegram.WebApp;

const courses = getData();
function App() {
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        telegram.ready();
    });

    const onAddItem = (item) => {
        const existItem = cartItems.find((c) => c.id == item.id);
        console.log(existItem);
        if (existItem) {
            const newData = cartItems.map((c) =>
                c.id == item.id
                    ? { ...existItem, quantity: existItem.quantity + 1 }
                    : c
            );
            setCartItems(newData);
        } else {
            const newData = [...cartItems, { ...item, quantity: 1 }];
            setCartItems(newData);
        }
    };

    const onRemoveItem = (item) => {
        const existItem = cartItems.find((c) => c.id == item.id);
        console.log(existItem);

        if (existItem.quantity === 1) {
            const newData = cartItems.filter((c) => c.id !== existItem.id);
            setCartItems(newData);
        } else {
            const newData = cartItems.map((c) =>
                c.id === existItem.id
                    ? { ...existItem, quantity: existItem.quantity - 1 }
                    : c
            );
            setCartItems(newData);
        }
    };
	const onCheckout = () => {
		telegram.MainButton.text = "Sotib olish :)",
		telegram.MainButton.show()
	}
    const onSendData = useCallback(() => {
       telegram.sendData(JSON.stringify(cartItems));
    },[cartItems])

    useEffect(()=> {
        telegram.onEvent('mainButtonCliked',onSendData)
        return () => telegram.offEvent('mainButtonCliked',onSendData)
    },[onSendData])


    return (
        <>
            <h1 className="heading">Yupiter Team Kurslari</h1>
            <Cart cartItems={cartItems} onCheckout={onCheckout}/>
            <div className="cards__continer">
                {courses.map((course, index) => {
                    return (
                        <Card
                            key={index}
                            course={course}
                            onAddItem={onAddItem}
                            onRemoveItem={onRemoveItem}
                        />
                    );
                })}
            </div>
        </>
    );
}

export default App;
