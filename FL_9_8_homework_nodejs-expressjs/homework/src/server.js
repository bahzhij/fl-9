const express = require('express');
const app = express();
const port = 3000;
const router = require('./routes');
const deleteAuth = require('./middlewares/delete-authorization');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(deleteAuth);
app.use('/', router);
app.listen(port, () => console.log(`app listening on port ${port}!`));