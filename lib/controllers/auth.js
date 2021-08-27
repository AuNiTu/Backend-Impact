import { Router } from 'express';
import UserService from '../services/UserService.js';
import ensureAuth from '../middleware/ensureAuth.js';

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

export default Router()

  .post('/auth/signup', (req, res, next) => {
    UserService.create(req.body)
      .then(user => {
        res.cookie('session', user.authToken(), {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
          sameSite: 'none',
          secure: 'true' 
        });
        res.send(user);
      })
      .catch(next);
  })

  .post('/auth/login', (req, res, next) => {
    UserService.authorize(req.body)
      .then(user => {
        res.cookie('session', user.authToken(), {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
          sameSite: 'none',
          secure: 'true' 
        });
        res.send(user);
      })
      .catch(next);
  })

  .get('/auth/verify', ensureAuth, (req, res) => {
    res.send(req.user);
  })

  .get('/auth/logout', (req, res) => {
    res.clearCookie('session', {
      httpOnly: true,
      maxAge: ONE_DAY_IN_MS,
      sameSite: 'none',
      secure: 'true'
    });
  });
