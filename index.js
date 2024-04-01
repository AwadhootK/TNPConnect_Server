const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');

const adminRouter = require('./routes/adminRouter');
const authRouter = require('./routes/authRouter');
const profileRouter = require('./routes/profileRouter');
const uploadDocsRouter = require('./routes/uploadDocsRouter');

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use(express.json());

app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/upload', uploadDocsRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`)
})