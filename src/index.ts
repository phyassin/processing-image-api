import express from 'express';
import imgRoute from './routes/api/image';

const app = express()
const port = 3000


app.use("/api", imgRoute);

// add routing for / path
app.get('/api', (req: express.Request, res: express.Response): void => {
  res.send('Hello Api World');
})

// start server
app.listen(port, () => {
  console.log(`Server is starting at http://localhost:${port}`)
})

export default app
