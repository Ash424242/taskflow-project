const taskStore = require('./task.store');

async function obtenerTodas() {
  return await taskStore.getAll();
}

async function crearTarea(data) {
  return await taskStore.add(data);
}

async function eliminarTarea(id) {
  await taskStore.remove(id);
}

module.exports = {
  obtenerTodas,
  crearTarea,
  eliminarTarea
};

