import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Playlists from '../library/Playlists';
import Artists from '../library/Artists';
import Tracks from '../library/Tracks';
import Genres from '../library/Genres';
import TableView from '../layout/TableView';
import Filters from '../filter/Filters';
import PlayerBar from '../player/PlayerBar';

const Explore = ({
  tracks,
  showPlaylists,
  showArtists,
  showTracks,
  showGenres,
}) => {
  return (
    <div className='explore-container'>
      {/* <Filters /> */}

      {showPlaylists && tracks.length !== 0 ? (
        <TableView />
      ) : (
        //<Tracks />
        showPlaylists && <Playlists />
      )}
      {showArtists && tracks.length !== 0 ? (
        <Tracks />
      ) : (
        showArtists && <Artists />
      )}
      {showTracks && <Tracks />}
      {showGenres && tracks.length !== 0 ? (
        <TableView />
      ) : (
        showGenres && <Genres />
      )}
      <PlayerBar />
    </div>
  );
};

Explore.propTypes = {
  tracks: PropTypes.array,
  playlist: PropTypes.object,
};

const mapStateToProps = (state) => ({
  playlist: state.library.playlist,
  tracks: state.library.tracks,
  showPlaylists: state.filter.showPlaylists,
  showArtists: state.filter.showArtists,
  showTracks: state.filter.showTracks,
  showGenres: state.filter.showGenres,
});

export default connect(mapStateToProps, null)(Explore);
