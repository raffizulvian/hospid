import Link from 'next/link';
import PropTypes from 'prop-types';

function NavLink({ children, id, href, color, className }) {
  return (
    <Link href={href}>
      <a id={id} className={`text-sm font-semibold ${color ?? 'text-purple-600'} ${className}`}>
        {children}
      </a>
    </Link>
  );
}

NavLink.propTypes = {
  children: PropTypes.string.isRequired,
  id: PropTypes.string,
  href: PropTypes.string.isRequired,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default NavLink;
