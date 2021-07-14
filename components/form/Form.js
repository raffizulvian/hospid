import PropTypes from 'prop-types';

function Form({ children }) {
  return <form className='flex flex-col'>{children}</form>;
}

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.bool])),
  ]).isRequired,
};

export default Form;
