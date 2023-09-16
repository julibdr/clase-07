const express = require("express");
const fs = require("fs").promises;
const app = express();

const pathJSON = "./data/alumnos.json";

app.get("/", async (req, res) => {
  try {
    const { limit, offset } = req.query;
    console.log(limit, offset);
    const data = JSON.parse(await fs.readFile(pathJSON, "utf-8"));
    res.json({
      msg: `listado de alumnos ${limit}`,
      data,
    });
  } catch (error) {
    res.json({
      msg: "Error en el servidor",
    });
  }
});

app.get("/:alumnoslegajo", async (req, res) => {
  try {
    const { alumnoslegajo } = req.params;

    console.log("legajo de alumno: " + alumnoslegajo);

    const data = JSON.parse(await fs.readFile(pathJSON, "utf-8"));
    const alumno = data.find((item) => item.legajo == alumnoslegajo);

    if (alumno) {
      res.json({
        msg: "Detalle de alumno",
        data: alumno,
      });
    } else {
      res.status(404).json({
        msg: "alumno no encontrado",
        data: {},
      });
    }
  } catch (error) {
    res.json({
      msg: "Error en el servidor",
    });
  }
});

app.post("/", async (req, res) => {
  try {
    const alumnoList = JSON.parse(await fs.readFile(pathJSON, "utf-8"));
    const alumno = req.body;
    alumnoList.push(alumno);
    await fs.writeFile(pathJSON, JSON.stringify(alumnoList, null, 2));
    res.json({
      msg: "alumno Guardado",
      data: alumno,
    });
  } catch (error) {
    res.json({
      msg: "Error en el Servidor ",
    });
  }
});

app.put("/:alumnoslegajo", async (req, res) => {
  try {

    const alumnolist = JSON.parse(await fs.readFile(pathJSON, "utf-8"));
    const alumno = req.body;
    const { alumnoslegajo } = req.params;

    alumnolist.forEach(element => {
      if (element.legajo == alumnoslegajo) {
        element.legajo = alumnoslegajo;
        element.nombre = alumno.nombre;
        element.apellido = alumno.apellido;
        element.anio = alumno.anio;
      }
    });

    await fs.writeFile(pathJSON, JSON.stringify(alumnolist, null, 2));

    res.json({
      msg: "Alumno guardado",
      data:  alumno
    });
  } catch (error) {
    res.json({
      msg: "Error en el servidor",
    });
  }
});

app.delete("/:alumnoslegajo", async (req, res) => {
  try {
    const { alumnoslegajo } = req.params;
    console.log("Solicitud DELETE recibida para el legajo:", alumnoslegajo);
    const alumnoList = JSON.parse(await fs.readFile(pathJSON, "utf-8"));

    const index = alumnoList.findIndex((item) => item.legajo == alumnoslegajo);

    if (index !== -1) {
      alumnoList.splice(index, 1);

      await fs.writeFile(pathJSON, JSON.stringify(alumnoList, null, 2));

      res.json({
        msg: "Alumno eliminado",
      });
    } else {
      res.status(404).json({
        msg: "Alumno no encontrado",
      });
    }
  } catch (error) {
    console.error(error); 
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
});


  

module.exports = app;
