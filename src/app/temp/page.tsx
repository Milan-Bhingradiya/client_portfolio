import React from 'react'
import Project from '../api/model/Project';
import M from './M';

export async function getproject() {
    const res = await fetch('http://localhost:3000/api/getproject'); // Or 'https://your-api-endpoint' if no API route
    const data = await res.json();

    return data.data;
}

async function page() {
    const products = await getproject();


    return (
        <div>

            {products.map((product) => (
                <M name={product.title}></M>
            ))}
        </div>
    )
}



export default page