const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()
const cors= require('cors')
const schoolRoutes = require('./routes/schoolRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use('/api', schoolRoutes);


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
