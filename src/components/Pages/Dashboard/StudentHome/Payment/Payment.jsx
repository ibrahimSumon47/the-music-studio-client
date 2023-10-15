import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import CheckOut from './CheckOut/CheckOut';
import { loadStripe } from '@stripe/stripe-js';
import useCart from '../../../../../hooks/useCart';

const stripePromise = loadStripe(import.meta.env.VITE_stripe)
const Payment = () => {
    const [cart] = useCart()
    const total = cart.reduce((sum, item) => parseFloat(item.price) + sum, 0);
    const price = parseInt(total.toFixed(2))
    return (
        <div className='w-1/2 mx-auto mt-20'>
            <h2>Hello</h2>
            <Elements stripe={stripePromise}>
                <CheckOut cart={cart} price={price}></CheckOut>
            </Elements>
        </div>
    );
};

export default Payment;