const taskService = require('../services/task.service');

const ALLOWED_CATEGORIES = ['Ocio', 'Supermercado', 'Hogar', 'Transporte'];
const MAX_TITLE_LENGTH = 60;
const MAX_AMOUNT = 1000000;

function validatePayload(data) {
  const titulo = data?.title;
  const importe = data?.amount;
  const categoria = data?.category;

  if (typeof titulo !== 'string' || titulo.trim().length < 2 || titulo.trim().length > MAX_TITLE_LENGTH) {
    return { valid: false, message: 'El título es obligatorio y debe tener entre 2 y 60 caracteres.' };
  }

  const normalizedAmount = Number(importe);
  if (!Number.isFinite(normalizedAmount) || normalizedAmount <= 0) {
    return { valid: false, message: 'El importe debe ser un número mayor que 0.' };
  }

  if (normalizedAmount > MAX_AMOUNT) {
    return { valid: false, message: `El importe no puede superar ${MAX_AMOUNT.toLocaleString('es-ES')} €.` };
  }

  if (typeof categoria !== 'string' || !ALLOWED_CATEGORIES.includes(categoria)) {
    return { valid: false, message: 'La categoría seleccionada no es válida.' };
  }

  return {
    valid: true,
    value: {
      title: titulo.trim(),
      amount: normalizedAmount,
      category: categoria
    }
  };
}

async function getAllTasks(req, res, next) {
  try {
    const tasks = await taskService.obtenerTodas();
    return res.status(200).json(tasks);
  } catch (err) {
    return next(err);
  }
}

async function createTask(req, res, next) {
  const validation = validatePayload(req.body);

  if (!validation.valid) {
    return res.status(400).json({ error: validation.message });
  }

  try {
    const created = await taskService.crearTarea(validation.value);
    return res.status(201).json(created);
  } catch (err) {
    return next(err);
  }
}

async function deleteTask(req, res, next) {
  const { id } = req.params;
  const numericId = Number(id);

  if (!Number.isFinite(numericId) || numericId < 1) {
    return res.status(400).json({ error: 'El identificador de la tarea no es válido.' });
  }

  try {
    await taskService.eliminarTarea(numericId);
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getAllTasks,
  createTask,
  deleteTask
};

