import { Router } from 'express';
import Interest from '../models/Interest';

export default Router()

  .post('/interests/add', async (req, res, next) => {
    Interest.add(req.body)
      .then(interest => res.send(interest))
      .catch(next);
  });
