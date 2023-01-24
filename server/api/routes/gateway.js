import { Router } from 'express';
import { Cors } from '../middleware/index.js';

const gatewayRouter = Router();
const baseAPI = '/api/v1';
const gatewayAPI = `${baseAPI}/gateway`;

gatewayRouter.use(Cors);

gatewayRouter.get(`${gatewayAPI}/:id`, (req, res) => {
  const { id } = req.params;
  console.log(`Gateway ${id} is up and running!`);
  if (!id || id !== '123') {
    res.status(400).send('Bad request');
    return;
  }
  res.status(200).send('Hello from the gateway!');
});

export default gatewayRouter;
