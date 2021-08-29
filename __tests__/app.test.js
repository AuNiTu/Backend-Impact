import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import UserService from '../lib/services/UserService';
// import Interest from '../lib/models/Interest.js';

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
        longitude: -80.9418786,
        latitude: 34.0717792
      });

    expect(res.body).toEqual({
      id: '1',
      username: 'grahf',
      longitude: "-80.9418786",
      latitude: "34.0717792"
    }); 
  
  });

  it('logs in a user', async () => {

    await UserService.create({
      username: 'grahf', 
      password: 'password', 
      longitude: -80.9418786,
      latitude: 34.0717792
    });

    const res = await agent
      .post('/auth/login')
      .send({
        username: 'grahf',
        password: 'password',
      });

    expect(res.body).toEqual({
      id: '1',
      username: 'grahf',
      longitude: "-80.9418786",
      latitude: "34.0717792"
    });
    
  });

  it('gets users location', async () => {
    
    await UserService.create({
      username: 'grahf', 
      password: 'password', 
      longitude: -80.9418786,
      latitude: 34.0717792
    });

    const res = await agent
    .get('/auth/location/grahf');

    expect(res.body).toEqual({
      longitude: "-80.9418786",
      latitude: "34.0717792"
    });
  });

});

// describe('interest routes', () => {

//   beforeEach(() => {
//     return setup(pool);
//   });

//   it('adds a new interest to a user', async () => {

//     const user = await UserService.create({
//       username: 'grahf', 
//       password: 'password', 
//     });

//     const res = await request(app)
//       .post('/interests/add')
//       .send({
//         deforestation: true,
//         airQuality: false,
//         c02: false,
//         wildfires: false,
//         userId: user.id
//       });

//     expect(res.body).toEqual({
//       id: '1',
//       deforestation: true,
//       airQuality: false,
//       c02: false,
//       wildfires: false,
//       userId: '1'
//     });

//   });

//   it('updates an interest', async () => {

//     const user = await UserService.create({
//       username: 'grahf', 
//       password: 'password', 
//     });

//     const oldInterests = await Interest.add({
//       deforestation: true,
//       airQuality: true,
//       c02: true,
//       wildfires: true,
//       userId: user.id       
//     });

//     oldInterests.wildfires = false;

//     const newInterests = {
//       id: '1',
//       deforestation: true,
//       airQuality: true,
//       c02: true,
//       wildfires: false,
//       userId: user.id       
//     };

//     const res = await request(app)
//       .put(`/interests/change/${user.id}`)
//       .send(newInterests);
    
//     expect(res.body).toEqual(newInterests);

//   });

// });
