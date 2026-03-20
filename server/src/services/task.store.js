const fs = require('fs/promises');
const path = require('path');

// En Vercel, el directorio del repo suele ser de solo-lectura en serverless.
// Usamos /tmp para garantizar escrituras (se mantiene durante la vida del contenedor).
const DATA_DIR = process.env.TASKFLOW_DATA_DIR
  ? process.env.TASKFLOW_DATA_DIR
  : process.env.VERCEL
    ? '/tmp/taskflow-data'
    : path.resolve(__dirname, '../../data');

const DATA_FILE = path.join(DATA_DIR, 'tasks.json');

let cachedState = null; // { tasks: Array, nextId: number }
let loadingPromise = null;
let saveQueue = Promise.resolve();

async function loadState() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw);

    const tasks = Array.isArray(parsed?.tasks) ? parsed.tasks : [];
    const safeTasks = tasks
      .filter((t) => t && Number.isFinite(Number(t.id)))
      .map((t) => ({
        id: Number(t.id),
        title: String(t.title ?? ''),
        amount: Number(t.amount),
        category: String(t.category ?? '')
      }));

    const maxId = safeTasks.reduce((acc, t) => Math.max(acc, t.id), 0);
    return { tasks: safeTasks, nextId: maxId + 1 };
  } catch (err) {
    // Si el archivo no existe, empezamos con estado vacío.
    if (err && err.code === 'ENOENT') {
      return { tasks: [], nextId: 1 };
    }
    throw err;
  }
}

async function ensureLoaded() {
  if (cachedState) return cachedState;
  if (!loadingPromise) {
    loadingPromise = loadState().then((s) => {
      cachedState = s;
      return cachedState;
    });
  }
  return loadingPromise;
}

async function persistState() {
  await ensureLoaded();

  // Serializamos escrituras para evitar condiciones de carrera.
  saveQueue = saveQueue.then(async () => {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const data = JSON.stringify({ tasks: cachedState.tasks }, null, 2);
    await fs.writeFile(DATA_FILE, data, 'utf8');
  });

  return saveQueue;
}

async function getAll() {
  const state = await ensureLoaded();
  return state.tasks;
}

async function add({ title, amount, category }) {
  const state = await ensureLoaded();
  const nuevaTarea = {
    id: state.nextId++,
    title,
    amount,
    category
  };

  state.tasks.push(nuevaTarea);
  await persistState();
  return nuevaTarea;
}

async function remove(id) {
  const state = await ensureLoaded();
  const index = state.tasks.findIndex((task) => task.id === Number(id));

  if (index === -1) {
    throw new Error('NOT_FOUND');
  }

  state.tasks.splice(index, 1);
  await persistState();
}

module.exports = {
  getAll,
  add,
  remove
};

