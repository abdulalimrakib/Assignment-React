/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

import User from './User';

const Users = (props) => {

    return (
        <div className='flex justify-center'>
            <section className="grid grid-cols-4 gap-5 mt-7">
                {props.users.map((user) => (
                    <User key={user.id} {...user} onHandleDeleteUser={props.onHandleDeleteUser} />
                ))}
            </section>
        </div>
    );
};

Users.propTypes = {
    users: PropTypes.array,
    onHandleDeleteUser: PropTypes.func
};

export default Users;