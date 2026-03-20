let tasks = [];
let nextId = 1;

function obtenerTodas() {
  return tasks;
}

function crearTarea(data) {
  const nuevaTarea = {
    id: nextId++,
    title: data.title,
    amount: data.amount,
    category: data.category
  };

  tasks.push(nuevaTarea);
  return nuevaTarea;
}

function eliminarTarea(id) {
  const numericId = Number(id);
  const index = tasks.findIndex((task) => task.id === numericId);

  if (index === -1) {
    throw new Error('NOT_FOUND');
  }

  tasks.splice(index, 1);
}

module.exports = {
  obtenerTodas,
  crearTarea,
  eliminarTarea
};

