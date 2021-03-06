import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import Spotify from '../player/SpotifyPlayer';
// import Loader from './Loader';

const Navbar = ({
  auth: { isAuthenticated, loading },
  logout,
  hidden = false,
}) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/explore'>Explore</Link>
      </li>
      <li>
        <Link to='/settings'>Settings</Link>
      </li>
      <li>
        <a onClick={logout} href='/login'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = <ul></ul>;

  return (
    <Fragment>
      <nav className={hidden ? 'hidden' : 'navbar'}>
        <h1>
          {/* <Loader /> */}
          <Link to='/'>Music Minion</Link>
        </h1>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </nav>
    </Fragment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
