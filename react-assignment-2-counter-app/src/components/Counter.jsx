/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const Counter = () => {

    const [count, setCount] = useState(0)

    const increment = () => {
        setCount(count + 1)
    }

    const decrement = () => {
        setCount(count - 1)
    }

    const reset = () => {
        setCount(0)
    }

    return (
        <div className="flex justify-center text-center">
            <div>
                <h1 className="text-[40px] font-bold">Counter App</h1>
                <div className="card center">
                    <h2 className="text-[30px] font-medium">Count : {count}</h2>
                    <div className="flex gap-5 mt-5 justify-center">
                        <button className="bg-green-500 px-5 py-3 text-[30px] font-bold rounded-full" onClick={increment} disabled={count === 5 ? true : false}>+</button>
                        <button className="bg-green-500 px-5 py-3 text-[30px] font-bold rounded-full" onClick={decrement} disabled={count === -5 ? true : false}>-</button>
                        <button className="bg-green-500 px-5 py-3 text-[24px] font-bold rounded-full" onClick={reset}>0</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Counter;