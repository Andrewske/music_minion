const pool = require('../config/db');

exports.getArtist = async (artist_id) => {
  try {
    const artist = await pool.query(
      'SELECT * FROM artist WHERE artist_id = $1',
      [artist_id]
    );
    //console.log(artist_id);
    if (artist.rows.length > 0) {
      console.log(artist.rows[0]);
      return artist.rows[0];
    } else {
      console.log('false');
      return false;
    }
  } catch (err) {
    console.error(err.message);
  }
};

exports.addArtist = async (artist_id, name) => {
  try {
    artist = await pool.query(
      `
        INSERT INTO artist
        (artist_id, name)
        VALUES ($1, $2)
        RETURNING *
        `,
      [artist_id, name]
    );
    return artist.rows[0];
  } catch (err) {
    console.log(artist_id);
    console.log('Error Creating artist');
    console.error(err.message);
  }
};

exports.updateArtist = async (artist_id, followers, img_url, popularity) => {
  try {
    artist = await pool.query(
      `
        UPDATE artist
        SET followers = $2, img_url = $3, popularity = $4
        WHERE artist_id = $1
        RETURNING *
        `,
      [artist_id, followers, img_url, popularity]
    );
    return artist.rows[0];
  } catch (err) {
    console.log('Error Updating artist');
    console.error(err);
  }
};
