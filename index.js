const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');

const adminRouter = require('./routes/adminRouter');
const authRouter = require('./routes/authRouter');
const profileRouter = require('./routes/profileRouter');
const uploadDocsRouter = require('./routes/uploadDocsRouter');
const companyPostingRouter = require('./routes/companyPostsRouter')
const studentRegRouter = require('./routes/studentRegisterationRouter');

// const { exec } = require('child_process');

// function runCommand(command) {
//   exec(command, (error, stdout, stderr) => {
//     if (error) {
//       console.error(`Error executing command: ${error}`);
//       return;
//     }
//     console.log(`Command output: ${stdout}`);
//     if (stderr) {
//       console.error(`Command error: ${stderr}`);
//     }
//   });
// }

// runCommand('npx prisma migrate dev --name init');
// runCommand('npx prisma generate');

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use(express.json());

app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/upload', uploadDocsRouter);
app.use('/companyPosting', companyPostingRouter);
app.use('/studentResponse', studentRegRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
