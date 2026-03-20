(function () {
  const API_BASE_URL = (() => {
    if (typeof window.TASKFLOW_API_BASE_URL === 'string') {
      return window.TASKFLOW_API_BASE_URL.replace(/\/$/, '');
    }

    if (window.location.protocol === 'file:') {
      return 'http://localhost:3000';
    }

    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:3000';
    }

    // En despliegue, si el backend se expone bajo el mismo dominio, usamos rutas relativas.
    return '';
  })();

  async function request(path, options = {}) {
    const url = `${API_BASE_URL}${path}`;

    const res = await fetch(url, options);

    const contentType = res.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');

    let body = null;
    if (res.status !== 204) {
      if (isJson) {
        body = await res.json().catch(() => null);
      } else {
        body = await res.text().catch(() => null);
      }
    }

    if (!res.ok) {
      const message =
        body && typeof body === 'object' && typeof body.error === 'string'
          ? body.error
          : res.statusText || 'Error de red';

      const err = new Error(message);
      err.status = res.status;
      throw err;
    }

    return body;
  }

  async function obtenerTareas() {
    return await request('/api/v1/tasks');
  }

  async function crearTarea(data) {
    return await request('/api/v1/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }

  async function eliminarTarea(id) {
    await request(`/api/v1/tasks/${encodeURIComponent(id)}`, { method: 'DELETE' });
  }

  window.taskApi = {
    obtenerTareas,
    crearTarea,
    eliminarTarea
  };
})();

