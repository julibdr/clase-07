const express = require('express');
const routerAPI = require('./routes/index');
// const alumnosroute = require('./routes/alumnos');

const app = express();
const port = 2023;
app.use( express.json() );

app.get('/', (req, res) => {
    console.log('Ruta principal');
    res.send('<h1>Bienvenido</h1><a href="/routes/alumnoslegajo">Ver Alumnos</a>' );
});

// app.use('/', alumnosroute);

routerAPI(app);

  app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
})