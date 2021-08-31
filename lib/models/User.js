import pool from '../utils/pool.js';
import jwt from 'jsonwebtoken';

export default class User {

  id;
  username;
  passwordHash;
  longitude;
  latitude;

  constructor(row) {

    this.id = row.id;
    this.username = row.username;
    this.passwordHash = row.password_hash;
    this.longitude = row.longitude;
    this.latitude = row.latitude;

  }

  static async insert({ username, passwordHash, longitude, latitude }) {

    const { rows } = await pool.query(
      'INSERT INTO users (username, password_hash, longitude, latitude) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, passwordHash, longitude, latitude]
    );

    return new User(rows[0]);
  }

  authToken() {
    return jwt.sign({ ...this }, process.env.APP_SECRET, {
      expiresIn: '24h'
    });
  }

  static async findByUsername(username) {

    const { rows } = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if(!rows[0]) return null;

    return new User(rows[0]);
  }

  static async getLocation(username) {

    const { rows } = await pool.query(
      `SELECT longitude, latitude
      FROM users
      WHERE username = $1`,
      [username]
    );

    if(!rows[0]) return null;

    return new User(rows[0]);
  }

  static async updateLocation(username, {longitude, latitude} ) {

    console.log(username, longitude, latitude)

    const { rows } = await pool.query(
      `UPDATE users
      SET longitude = $2, latitude = $3
      WHERE username = $1
      RETURNING *`,
      [username, longitude, latitude]
    );
    console.log(rows);

    if(!rows[0]) return null;

    return new User(rows[0]);
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      longitude: this.longitude,
      latitude: this.latitude
    };
  }
}