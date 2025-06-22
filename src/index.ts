import express from 'express'
import cors from 'cors'
import assetRoutes from './routes/assets.js'
import morgan from 'morgan'

const app = express();

app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173", "https://shiva-inv.vercel.app"] }))
app.use(morgan('dev')); 

app.get('/', (req, res) => {
  res.send('Inventory API');
})

app.use('/assets', assetRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})