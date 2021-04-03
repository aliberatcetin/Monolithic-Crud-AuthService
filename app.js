const settings = require('./config/settings');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const swagger = require('swagger-ui-express');
const users = require('./routers/users');
const questions = require('./routers/questions');
const panel = require('./routers/panel');
const auth = require('./routers/auth');
const cors = require('cors');
const app = express();

app.use(cors({credentials: true, origin: true}));
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({extended: true}));


mongoose.Promise = global.Promise;
mongoose.connect(settings.dbUrl, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

mongoose.set('useFindAndModify', false);

const YAML = require('yamljs');
const swaggerdoc = YAML.load('./swagger.yaml');

app.use('/users', users);
app.use('/questions', questions);
app.use('/panel', panel);
app.use('/swagger', swagger.serve, swagger.setup(swaggerdoc));
app.use('/auth', auth);

const server = app.listen(process.env.PORT);

