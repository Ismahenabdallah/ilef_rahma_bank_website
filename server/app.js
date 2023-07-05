const { Configuration, OpenAIApi } = require('openai');
var express = require('express');
var path = require('path')
var cors = require('cors')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');
var clc = require("cli-color");
const session = require("express-session");
const dotenv = require("dotenv");
dotenv.config()
var adminRouter = require('./routes/admin.router');
var usersRouter = require('./routes/user.router');

var TransactionRouter = require('./routes/transaction.router');
var CompteRouter = require('./routes/compte.router');
var CreditRouter = require('./routes/credit.router');
var CarteRouter = require('./routes/carte.router')
var authRouter = require('./routes/auth.router');

var mongoose = require('mongoose')
var app = express();
//app.set('veiw engine', 'ejs')
mongoose.set('strictQuery', true);
const PORT = process.env.PORT || 3000;
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(logger("dev"));
app.use(express.json({ limit: "50mb", extended: false }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.json({ limit: "50mb", extended: false }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(cookieParser());

mongoose.connect(process.env.URL,
  {

    useNewUrlParser: true,
    useUnifiedTopology: true,


  })
  .then(() => console.log(clc.bgBlue.underline(`Server running on PORT ${PORT} ...`)))
  .catch(err => console.log(err))
const config = new Configuration({
  apiKey: "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"
});

const openai = new OpenAIApi(config);

app.post('/message', (req, res) => {
  // {prompt: "This is the message"}
  const response = openai.createCompletion({
    model: 'text-davinci-003',
    prompt: req.body.prompt,
    temperature: 0,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 256
  });

  response.then((data) => {
    res.send({ message: data.data.choices[0].text })
  }).catch((err) => {
    res.send({ message: err })
  })

});
app.use('/auth', authRouter)
app.use('/admin', adminRouter);
app.use('/user', usersRouter);
app.use('/transactions', TransactionRouter);

app.use('/compte', CompteRouter);
app.use('/credit', CreditRouter);
app.use('/carte', CarteRouter);

//app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
