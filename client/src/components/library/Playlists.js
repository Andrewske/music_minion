import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getPlaylists } from '../../actions/playlist';
import ListItem from './ListItem';
import Loader from '../layout/Loader';
import _ from 'lodash';

const Playlists = ({
  sort = null,
  ownedPlaylists,
  getPlaylists,
  playlist: { playlists, loading },
}) => {
  useEffect(() => {
    async function load() {
      await getPlaylists();
    }
    load();
  }, [getPlaylists]);
  playlists = ownedPlaylists
    ? playlists.filter((playlist) => playlist.owner === true)
    : playlists;

  if (sort) {
    playlists = sort.az ? _.orderBy(playlists, ['name'], ['asc']) : playlists;
    playlists = sort.za ? _.orderBy(playlists, ['name'], ['desc']) : playlists;
    playlists = sort.most
      ? _.orderBy(playlists, (playlist) => _.parseInt(playlist.size), ['desc'])
      : playlists;
    playlists = sort.least
      ? _.orderBy(playlists, (playlist) => _.parseInt(playlist.size), ['asc'])
      : playlists;
  }

  return loading ? (
    <Loader />
  ) : (
    <Fragment>
      <div className='item-list'>
        {playlists.map((playlist) => (
          // <PlaylistItem key={playlist.playlist_id} playlist={playlist} />
          <ListItem
            key={playlist.playlist_id}
            type='playlist'
            current={playlist}
            count={playlist.size}
          />
        ))}
      </div>
    </Fragment>
  );
};

Playlists.propTypes = {
  getPlaylists: PropTypes.func.isRequired,
  playlist: PropTypes.object,
};

const mapStateToProps = (state) => ({
  playlist: state.playlist,
  ownedPlaylists: state.filter.ownedPlaylists,
});

export default connect(mapStateToProps, { getPlaylists })(Playlists);
