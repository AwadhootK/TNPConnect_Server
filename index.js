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
const pushNotificationRouter = require('./routes/push-notifications.routes.js');

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
app.use('/api', pushNotificationRouter);

app.post('/analyze', (req, res) => {
  setTimeout(() => {
    res.status(200).json({
      jd_match: 80,
      missing_keywords: [
        "Software Development",
        "Engineering",
        "Cloud Computing",
        "Agile",
        "Scrum"
      ],
      summary: "Atharva Date is a 3rd-year undergraduate student pursuing a Bachelor of Engineering in Computer Engineering from the Pune Institute of Computer Technology with a CGPA of 9.34. He has a strong academic record, with a 99.49 percentile in JEE MAINS and a 87.85 percentage in his Higher Secondary School Certificate Examination. Atharva has a good foundation in Machine Learning, Data Science, Data Structures and Algorithms, Database Management Systems, Computer Vision and Image Processing, Object Oriented Programming, Web Development, Communication and Public Speaking, and Competitive Programming. He has completed several certifications from Coursera and Udemy, including Sequence Models, Convolutional Neural Networks, Neural Networks and Deep Learning, Modern THREE.js for Real Websites, and Machine Learning Specialization. Atharva has also worked on several projects, including PlanetView, MediAnalytica, and CR Matchup Predictor. He is an active member of the PICT ACM Student Chapter and the PICT IEEE Student Branch, where he has held leadership positions and contributed to various events and projects. Overall, Atharva is a well-rounded candidate with a strong academic record, technical skills, and extracurricular involvement. However, his resume lacks some of the keywords that are typically found in SDE job descriptions, such as \"Software Development\", \"Engineering\", \"Cloud Computing\", \"Agile\", and \"Scrum\".}\n"
    });
  }, 2000);
});

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
