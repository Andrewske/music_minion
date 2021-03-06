import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import Moment from 'react-moment';
//import { Img } from 'react-image';
import { getTracks } from '../../actions/library';

const ListItem = ({ getTracks, type, current, count }) => {
  const onClick = () => {
    getTracks(type, current);
  };
  return (
    <div
      className='list-item'
      style={{ cursor: 'pointer' }}
      onClick={() => onClick()}
    >
      <p className='list-text'>{current.name}</p>
      <p className='count'>{count}</p>
    </div>
  );
};
//        <Img className='playlist-item-img' src={img_url} loading={Loader} />

ListItem.propTypes = {
  getTracks: PropTypes.func.isRequired,
};

export default connect(null, { getTracks })(ListItem);
