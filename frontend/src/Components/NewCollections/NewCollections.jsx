import React, { useState, useEffect } from 'react';
import './NewColections.css';
import Item from '../Item/Item';

const NewCollections = () => {

    const [newCollections, setNewCollections] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4001/newcollections')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => setNewCollections(data))
            .catch((error) => console.error('Error fetching new collections:', error));
    }, []);

    return (
        <div className='new-collections'>
            <h1>NEW COLLECTIONS</h1>
            <hr />
            <div className="collections">
                {newCollections.map((item) => (
                    <Item key={item.id} id={item.id} name={item.name} image={item.image} newPrice={item.new_price} oldPrice={item.old_price} />
                ))}
            </div>
        </div>
    );
}

export default NewCollections;

