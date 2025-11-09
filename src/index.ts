import express from 'express'
import cors from 'cors'
import 'dotenv/config';
import './conifg/db.js'

import v1Routes from './routes/v1.routes.js';

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json())

app.use('/api/v1', v1Routes);

app.listen(PORT, () => {
  console.log("Server is running on port:", PORT)
})