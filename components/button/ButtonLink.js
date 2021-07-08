import Link from 'next/link';
import PropTypes from 'prop-types';

function ButtonLink({ children, id, href, secondary, big, className }) {
  return (
    <Link href={href}>
      <a
        id={id}
        className={`inline-block w-max text-center font-semibold rounded-lg border border-solid m-0 ${
          secondary
            ? 'bg-white text-purple-600 border-solid border-purple-600'
            : 'bg-purple-600 text-white'
        } ${
          big
            ? 'h-14 min-w-[10rem] text-lg px-6 py-3 md:h-[3.875rem] md:min-w-[12.25rem] md:text-xl md:px-7 md:py-4'
            : 'h-10 min-w-[6rem] text-sm px-3 py-2'
        } ${className}`}>
        {children}
      </a>
    </Link>
  );
}

ButtonLink.propTypes = {
  children: PropTypes.string.isRequired,
  id: PropTypes.string,
  href: PropTypes.string.isRequired,
  secondary: PropTypes.bool,
  big: PropTypes.bool,
  className: PropTypes.string,
};

export default ButtonLink;
