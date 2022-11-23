const express = require('express');
const app = express();
const cors = require('cors')
const axios = require('axios');
const port = process.env.PORT || 5000 ||  3000;

app.use(cors())
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/retrieveQuestion', (req, res) => {
    axios({
        method: 'get',
        url: 'https://data.mongodb-api.com/app/data-pkrpq/endpoint/getRandom',
        withCredentials: false,
        headers: {
            'api-key': process.env.apiKey
        }
    }).then((resp) => {
        res.json({ challenge: resp.data })
    })
});