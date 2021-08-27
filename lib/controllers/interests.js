import { Router } from 'express';
import Interest from '../models/Interest.js';

export default Router()

  .post('/interests/add', async (req, res, next) => {
    Interest.add(req.body)
      .then(interest => res.send(interest))
      .catch(next);
  })

  .put('/interests/change/:id', async (req, res, next) => {
    Interest.update(req.params.id, req.body)
      .then(interest => res.send(interest))
      .catch(next);
  });
