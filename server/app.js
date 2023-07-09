const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
const Grid = require('gridfs-stream');
const multer  = require('multer')

const fs = require('fs');
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
const upload = multer({ fs });


// Encryption of PWD
const JWT_SECRET = "adfwvjhwbeqhwaSNASGJA121834147&(**%*&^$#()][";
var nodemailer = require("nodemailer");

const mongoURL =
  "mongodb+srv://morem009:a3000131@cluster0.k7ryb4j.mongodb.net/test";

  // const conn = mongoose.createConnection(mongoURL);
  const conn = mongoose.createConnection(mongoURL);

  const pdfSchema = new mongoose.Schema({
    name: String,
    data: Buffer,
  });
  const Pdf = mongoose.model('Pdf', pdfSchema);

// Initialize GridFS
let gfs;
conn.once("open", () => {
  gfs =  Grid(conn.db, mongoose.mongo);
  gfs.collection('pdfs');
});
// Route to retrieve all PDF files
app.post('/templates/pdf', async (req, res) => {
  try {
    const pdfs = await Pdf.find();
    res.json(pdfs);
  } catch (error) {
    console.error('Error getting PDF files: ', error);
    res.status(500).json({ error: 'Failed to get PDF files' });
  }
});

app.get('/templates/pdf/:id', async (req, res) => {
  try {
    const pdf = await Pdf.findById(req.params.id);
    if (!pdf) {
      return res.status(404).json({ error: 'PDF file not found' });
    }
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${pdf.name}`);
    res.send(pdf.data);
  } catch (error) {
    console.error('Error getting PDF file: ', error);
    res.status(500).json({ error: 'Failed to get PDF file' });
  }
});


app.post("/addtemp", upload.single('file'),async (req, res) => {
  try {
    const pdf = new Pdf({
      name: req.file.originalname,
      data: req.file.buffer,
    });
    const savedPdf = await pdf.save();
    res.json({ message: 'PDF uploaded successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save PDF' });
  }
});

mongoose
  .connect(mongoURL, {
    useNewUrlparser: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((e) => console.log(e));
  
const userSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  password: String,
  userType: String,
});

const User = mongoose.model("UserInfo", userSchema);

app.post('/Users', async (req, res) => {
  try {
    const user = await User.find()
    return res.json(user)
  } catch (error) {
    console.log(error)
  }
});

app.post("/signup", async (req, res) => {
  const { fname, lname, email, password, userType } = req.body;
  const encryptedpassword = await bcrypt.hash(password, 10);
  const oldUser = await User.findOne({ email });
  console.log(req.body);
  if (oldUser) {
    return res.json({ error: "User Exists" });
  }
  let user = new User();
  user.fname = fname;
  user.lname = lname;
  user.email = email;
  user.password = encryptedpassword;
  user.userType = userType;
  const doc = await user.save();
  res.json({ status: "ok" });
  console.log(doc);
});


app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Doesn't Exists" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      // expiresIn:300,
    });
    if (res.status(201)) {
      return res.json({ status: "Login Successful", data: token });
    } else {
      return res.json({ error: "Login Failed" });
    }
  }
  res.json({ status: "error", error: "Invalid Password" });
});

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});


app.listen(8080, () => {
  console.log("Server Started");
});

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json({ status: "User Doesn't Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });
    const link = `http://localhost:8080/reset-password/${oldUser._id}/${token}`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "projects.mandy@gmail.com",
        pass: "gfwgarhkwmiffgjj",
      },
    });

    var mailOptions = {
      from: "projects.mandy@gmail.com",
      to: email,
      subject: "Password Reset",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    console.log(link);
  } catch (error) {}
});

app.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email, status: "Not Verified" });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
});

app.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );

    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
});
