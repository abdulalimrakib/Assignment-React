/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

const User = ({ id, name, email, phone, onHandleDeleteUser }) => {
    const handleDelete = (id) => {
        onHandleDeleteUser(id);
    };
    return (
        <article className="bg-gray-900 text-white p-5 hover:scale-105 duration-200 rounded-2xl shadow-2xl">
            <h3>{id}</h3>
            <h3 className="text-[24px] font-medium py-2">{name}</h3>
            <p className="text-[18px] font-medium py-1">{email}</p>
            <a className="font-medium py-1" href={'tel:+' + phone}>
                {phone}
            </a>
            <div>
                <button className='bg-white text-black font-bold px-4 py-1 rounded-full mt-3 hover:bg-red-800 duration-200 hover:text-white'
                    onClick={() => {
                        handleDelete(id);
                    }}>
                    Delete
                </button>
            </div>
        </article>
    );
};

User.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    onHandleDeleteUser: PropTypes.func
};

export default User;
