import React, { useState } from 'react';

export default function QuantitySelector({ initialQuantity = 1, min = 1, max = 99, onQuantityChange }) {
    const [quantity, setQuantity] = useState(initialQuantity);

    const increment = () => {
        if (quantity < max) {
            const newQuantity = quantity + 1;
            setQuantity(newQuantity);
            if (onQuantityChange) onQuantityChange(newQuantity);
        }
    };

    const decrement = () => {
        if (quantity > min) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            if (onQuantityChange) onQuantityChange(newQuantity);
        }
    };

    const handleInputChange = (e) => {
        let value = parseInt(e.target.value, 10);
        if (isNaN(value)) value = min;
        value = Math.min(max, Math.max(min, value));
        setQuantity(value);
        if (onQuantityChange) onQuantityChange(value);
    };

    return (
        <div className="flex items-center space-x-2">
            <button
                onClick={decrement}
                disabled={quantity <= min}
                className="px-3 py-1 border rounded-l bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            >
                -
            </button>
            <input
                type="number"
                value={quantity}
                onChange={handleInputChange}
                min={min}
                max={max}
                className="w-16 text-center border-t border-b py-1"
            />
            <button
                onClick={increment}
                disabled={quantity >= max}
                className="px-3 py-1 border rounded-r bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            >
                +
            </button>
        </div>
    );
}
