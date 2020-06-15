const { query } = require('../config/db');

exports.addPlaylists = async (playlist_info) => {
  try {
    const asyncRes = await Promise.all(
      playlist_info.map(
        async ({ playlist_id, name, owner, img_url, size, platform }) => {
          const insertText = `
            INSERT INTO playlist (playlist_id, name, owner, img_url, size, platform) 
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (playlist_id)
            DO UPDATE
            SET name = EXCLUDED.name, owner = EXCLUDED.owner, img_url = EXCLUDED.img_url, size = EXCLUDED.size, platform = EXCLUDED.platform
            RETURNING *`;
          const insertValues = [
            playlist_id,
            name,
            owner,
            img_url,
            size,
            platform,
          ];
          const res = await query(insertText, insertValues);
          return res.rows;
        }
      )
    );
    return asyncRes;
  } catch (e) {
    throw e;
  }
};

exports.getPlaylist = async (playlist_id) => {
  try {
    const playlist = await query(
      'SELECT * FROM playlist WHERE playlist_id = $1',
      [playlist_id]
    );
    if (playlist.rows.length > 0) {
      return playlist.rows[0];
    } else {
      console.log('false');
      return false;
    }
  } catch (err) {
    console.error(err.message);
  }
};

exports.getAllUserPlaylists = async (user_id) => {
  try {
    const playlists = await query(
      `
      SELECT playlist.playlist_id, name, img_url
      FROM playlist 
      INNER JOIN user_playlist on playlist.playlist_id = user_playlist.playlist_id
      WHERE user_playlist.user_id = $1
      `,
      [user_id]
    );
    if (playlists.rows.length > 0) {
      return playlists.rows;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
  }
};

exports.addPlaylist = async ({
  playlist_id,
  name,
  owner,
  img_url,
  size,
  platform,
}) => {
  try {
    playlist = await query(
      `
        INSERT INTO playlist
        (playlist_id, name, owner, img_url, size, platform)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
        `,
      [playlist_id, name, owner, img_url, size, platform]
    );
    return playlist.rows[0];
  } catch (err) {
    console.log(playlist_id);
    console.log('Error Creating Playlist');
    console.error(err.message);
  }
};

exports.updatePlaylist = async ({
  playlist_id,
  name,
  owner,
  img_url,
  size,
  platform,
}) => {
  try {
    playlist = await query(
      `
        UPDATE playlist
        SET name = $2, owner = $3, img_url = $4, size = $5, platform = $6
        WHERE playlist_id = $1
        RETURNING *
        `,
      [playlist_id, name, owner, img_url, size, platform]
    );
    return playlist.rows[0];
  } catch (err) {
    console.log('Error Updating Playlist');
    console.error(err);
  }
};

exports.getUserPlaylists = async (user_id) => {
  try {
    playlists = query(
      `
      SELECT * FROM playlist
      INNER JOIN user_playlist ON playlist.playlist_id = user_playlist.playlist_id
      WHERE user_playlist.user_id = $1
      `,
      [user_id]
    );
    return playlists;
  } catch (err) {
    console.log('Error Fetching Playlists');
    console.error(err);
  }
};