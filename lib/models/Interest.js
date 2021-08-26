import pool from '../utils/pool';

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
}