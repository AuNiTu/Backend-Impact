import pool from '../utils/pool.js';

export default class Interest {
  
  id;
  c02;
  deforestation;
  wildfires;
  airQuality;
  userId

  constructor (row) {

    this.id = row.id;
    this.c02 = row.c02;
    this.deforestation = row.deforestation;
    this.wildfires = row.wildfires;
    this.airQuality = row.air_quality;
    this.userId = row.fk_user_id

  }

  static async add({ c02, deforestation, wildfires, airQuality, userId }) {

    const { rows } = await pool.query(`
    INSERT INTO interests (c02, deforestation, wildfires, air_quality, fk_user_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,[c02, deforestation,wildfires, airQuality, userId]);

    return new Interest(rows[0]);
  }

  static async update(id, { c02, deforestation, wildfires, airQuality, userId }) {

    const { rows } = await pool.query(`
    UPDATE interests
    SET c02 = $2, deforestation = $3, wildfires = $4, air_quality = $5
    WHERE fk_user_id = $1
    RETURNING *
    `,[id, c02, deforestation, wildfires, airQuality]);

    return new Interest(rows[0]);
  }
}