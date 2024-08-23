const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()
const cors= require('cors')
const schoolRoutes = require('./routes/schoolRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{
res.send("HOME !")
})
app.use('/api', schoolRoutes);


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
