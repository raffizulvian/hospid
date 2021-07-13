import PropTypes from 'prop-types';

function ButtonAction({ children, id, onClick, secondary, big, disabled, className }) {
  return (
    <button
      id={id}
      onClick={onClick}
      disabled={disabled}
      className={`inline-block text-center font-semibold rounded-lg border border-solid m-0 ${
        secondary
          ? 'bg-white text-purple-600 border-solid border-purple-600'
          : 'bg-purple-600 text-white'
      } ${
        big
          ? 'h-14 min-w-[10rem] text-lg px-6 py-3 md:h-[3.875rem] md:min-w-[12.25rem] md:text-xl md:px-7 md:py-4'
          : 'h-10 min-w-[6rem] text-sm px-3 py-2'
      } ${disabled && 'bg-purple-400 text-gray-700'} ${className}`}>
      {children}
    </button>
  );
}

ButtonAction.propTypes = {
  children: PropTypes.string.isRequired,
  id: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  secondary: PropTypes.bool,
  big: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default ButtonAction;
