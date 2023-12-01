
import PropTypes from 'prop-types';

import User from './User';

const Users = (props) => {
  return (
    <div className='flex justify-center'>
      <section className="grid grid-cols-4 gap-5">
        {props.users.map((user) => (
          <User key={user.id} {...user} />
        ))}
      </section>
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.array
};

export default Users;
