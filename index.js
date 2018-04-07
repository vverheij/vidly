const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());



const genres = [
    {
        id: 1,
        type: "Mistery"
    },
    {
        id: 2,
        type: "Horor"
    },
    {
        id: 3,
        type: "Fantasy"
    }
]
app.get('/',(req, res) => {
    //console.log(`request received on port ${port}`);
    res.send(`Server listening`);
});

app.get('/api/genres/', (req, res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre with te given id not found');
    
    res.send(genre);
});

app.post('/api/genres/',(req, res) => {
    
    const result = validateGenre(req.body);

    if (result.error) return res.send(result.error.details[0].message);

    const genre = {
        id: genres.length + 1,
        type: req.body.type
    }

    genres.push(genre);
    res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(g =>g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre with given id not found');
    
    const {error} = validateGenre(req.body);
    if (error) return res.status(400).send('Bad request');
    
    genre.type  = req.body.type;
    res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(g =>g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre with given id not found');

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    
    res.send(genre);
})
function validateGenre(genre) {
    const schema = {
        type: Joi.string().min(3).required()
    };

    return result = Joi.validate(genre, schema);
}
const port = process.env.port || 30001;

app.listen(port,() => console.log(`Server listening on port ${port}.`));
