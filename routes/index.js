const alumnos = require('./alumnos');

function routerAPI(app){
    app.use('/alumnos', alumnos);
}
module.exports = routerAPI;