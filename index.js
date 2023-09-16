// import express from 'express';
const express = require('express'),
    app = express();

app.use(express.json());

let notas = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2019-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2019-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2019-05-30T19:20:14.298Z",
        important: true
    }
];

app.get('/', (req, res) => {
    res.send('<h1>Holis</h1>');
});

app.get('/api/notes', (req, res) => {
    res.json(notas);
});

app.get('/api/notes/:id', (req, res) => {
    const id = +req.params.id,
        note = notas.find(n => n.id === id);

    if (!note)
        res.status(404).end();
    else
        res.json(note);
});

const generarId = () => {
    const maxId = notas.length > 0 ?
        Math.max(...notas.map(n => n.id)) :
        0;

    return maxId + 1;
};

app.post('/api/notes', (req, res) => {
    const body = req.body;

    if (!body.content)
    {
        return res.status(400).json({
            error: 'Contenido faltante'
        });
    }

    const nota = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generarId(),
    };

    notas = notas.concat(nota);

    res.json(nota);
});

app.delete('/api/notes/:id', (req, res) => {
    const id = +req.params.id;

    notas = notas.filter(n => n.id !== id);

    res.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server corriendo en el puerto ${ PORT }`);
});
