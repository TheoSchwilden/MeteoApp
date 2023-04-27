import PropTypes from 'prop-types';
import { Frown } from 'react-feather';
import './style.scss';

function Error404({ children }) {
  return (
    <>
      <div className="error404">{children}</div>
      <Frown className="sadLogo" size="120px" />
    </>
  );
}

Error404.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Error404;
