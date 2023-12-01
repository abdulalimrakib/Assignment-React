
import PropTypes from 'prop-types';

const User = ({ id, name, email, phone }) => {
  return (
    <article className="bg-gray-900 text-white p-5 rounded-2xl shadow-2xl hover:scale-105 duration-200">
      <h3>{id}</h3>
      <h3 className="text-[24px] font-semibold py-2">{name}</h3>
      <p className=" text-[18px] font-medium py-1">{email}</p>
      <a className=" font-medium" href={'tel:+' + phone}>
        {phone}
      </a>
    </article>
  );
};

User.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string
};

export default User;
