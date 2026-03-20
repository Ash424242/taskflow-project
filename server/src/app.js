const express = require('express');
const cors = require('cors');
const { performance } = require('perf_hooks');

const taskRoutes = require('./routes/task.routes');

const app = express();

// Permite que el frontend consuma la API desde cualquier origen.
app.use(cors());

// Convierte el body JSON del cliente en un objeto utilizable en req.body.
app.use(express.json());

// Middleware de auditoría: registra duración y resultado de cada petición.
const loggerAcademico = (req, res, next) => {
  const inicio = performance.now();

  res.on('finish', () => {
    const ruta = req.originalUrl || req.url;
    const duracion = performance.now() - inicio;
    console.log(`[${req.method}] ${ruta} - Estado: ${res.statusCode} (${duracion.toFixed(2)}ms)`);
  });

  next();
};
app.use(loggerAcademico);

app.use('/api/v1/tasks', taskRoutes);

// Endpoint de salud útil para comprobar que el servidor está vivo.
app.get('/health', (req, res) => res.status(200).json({ ok: true }));

// Manejo global de excepciones: el último middleware debe tener 4 parámetros.
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err && err.message === 'NOT_FOUND') {
    return res.status(404).json({ error: 'La tarea no existe.' });
  }

  console.error(err);
  return res.status(500).json({ error: 'Error interno del servidor' });
});

module.exports = { app };

