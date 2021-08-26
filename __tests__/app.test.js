import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import UserService from '../lib/services/UserService';

describe('user routes', () => {

  const agent = request.agent(app);

  beforeEach(() => {
    return setup(pool);
  });

  it('creates a profile using POST', async () => {

    const res = await agent
      .post('/auth/signup')
      .send({
        username: 'grahf',
        password: 'password',
      });

    expect(res.body).toEqual({
      id: '1',
      username: 'grahf',
    }); 
  
  });

  it('logs in a user', async () => {

    await UserService.create({
      username: 'grahf', 
      password: 'password', 
    });

    const res = await agent
      .post('/auth/login')
      .send({
        username: 'grahf',
        password: 'password',
      });

    expect(res.body).toEqual({
      id: '1',
      username: 'grahf'
    });
    
  });

});
