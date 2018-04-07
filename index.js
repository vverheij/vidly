const express = require('express');
const app = express();

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
})

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre with te given id not found');
    
    res.send(genre);
})

const port = process.env.port || 30001;

app.listen(port,() => console.log(`Server listening on port ${port}.`));
