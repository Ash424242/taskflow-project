# Control de Gastos

Aplicación web para registrar y visualizar gastos personales. Está construida con HTML, Tailwind CSS por CDN y JavaScript vanilla, y la persistencia se realiza mediante un backend REST en Node.js/Express.

## Características

Funciona como una SPA ligera en cliente y permite:

- Registrar gastos con validaciones de formulario.
- Buscar gastos por nombre o categoría.
- Eliminar gastos individuales.
- Reordenar gastos con arrastrar y soltar.
- Reiniciar toda la lista con confirmación.
- Consultar resumen de gastos visibles (cantidad y total).
- Alternar el modo claro/oscuro (sin persistencia en el navegador).

## Tecnologías Utilizadas

- HTML5
- Tailwind CSS (CDN)
- JavaScript (ES6+)

## Estructura del Proyecto

- `index.html`: Estructura principal de la aplicación
- `app.js`: Lógica de JavaScript para la interactividad
- `src/api/client.js`: Cliente HTTP del frontend (consumo de la API REST)
- `server/`: Backend Express con arquitectura por capas
- `package.json`: Archivo de configuración de dependencias

### Estructura actual (ampliada)

```text
taskflow-project/
├─ app.js
├─ index.html
├─ package.json
├─ package-lock.json
├─ README.md
├─ server/
├─ src/
│  └─ api/
│     └─ client.js
├─ docs/
│  └─ ai/
│     ├─ ai-comparison.md
│     ├─ cursor-workflow.md
│     ├─ experiments.md
│     ├─ MCP.md
│     ├─ prompt-engineering.md
│     └─ reflection.md
├─ .github/
└─ .cursor/
```

Nota: en la versión actual del repositorio no se utiliza un archivo `styles.css`, porque los estilos se aplican con Tailwind CSS por CDN desde `index.html`.

## Funcionalidades

### Añadir Gastos
- Ingresa el concepto del gasto
- Selecciona la categoría (Ocio, Supermercado, Hogar, Transporte)
- Ingresa el importe
- Haz clic en "Añadir Gasto"

### Eliminar Gastos
- Haz clic en el botón "×" junto al gasto

### Búsqueda
- Escribe en el campo de búsqueda para filtrar gastos por concepto

### Búsqueda por Categoría
- El mismo campo de búsqueda también filtra por categoría
- El filtrado se aplica en tiempo real mientras escribes

### Resumen de Gastos Visibles
- La interfaz muestra cuántos gastos se están viendo actualmente
- También calcula el total visible en euros según el filtro activo

### Reordenar Gastos
- Puedes arrastrar y soltar gastos para cambiar su orden
- El nuevo orden se mantiene en la interfaz durante la sesión de la página; el backend no persiste el orden.

### Resetear Todos los Gastos
- Haz clic en "Resetear todos los gastos" para vaciar la lista
- Antes de borrar, la app solicita confirmación para evitar errores

### Modo Oscuro
- Haz clic en "Alternar Modo Oscuro" para cambiar entre temas claro y oscuro

### Uso con Teclado
Todos los controles interactivos son nativos (input, select, button), así que se pueden usar con Tab, Enter y Espacio.

## Ejemplos de Uso

### Ejemplo 1: Registrar un gasto
1. Escribe "Cine" en el campo de nombre.
2. Introduce "12.50" como importe.
3. Selecciona la categoría "Ocio".
4. Pulsa el botón "Añadir Gasto".

Resultado esperado: aparece una nueva fila en la lista con el nombre, el importe y la categoría, y se actualiza el total visible.

### Ejemplo 2: Buscar por texto o categoría
1. Escribe "hogar" en el campo de búsqueda.
2. Observa cómo se filtran los gastos en tiempo real.

Resultado esperado: solo se muestran los gastos cuyo nombre o categoría coinciden con el texto introducido.

### Ejemplo 3: Reordenar gastos
1. Mantén pulsado un gasto de la lista.
2. Arrástralo a una nueva posición.
3. Suéltalo donde quieras colocarlo.

Resultado esperado: el orden de la lista cambia mientras la página está abierta; al recargar, se reflejará el orden devuelto por la API.

### Ejemplo 4: Reiniciar la lista
1. Haz clic en "Resetear todos los gastos".
2. Confirma la acción en la ventana emergente.

Resultado esperado: se eliminan todos los gastos guardados y la lista queda vacía.

## Backend REST (Fase 3): arquitectura, endpoints y consumo

### ¿Qué cambió en esta fase?
En la semana 3 se introduce un backend con Express y una API RESTful. El frontend deja de depender de `localStorage` y pasa a consumir la API para cargar, crear y eliminar tareas.

### Arquitectura por capas del backend
La carpeta `server/` separa responsabilidades en capas unidireccionales:
- `server/src/routes/`: enrutamiento HTTP (mapea URL y verbo a controladores).
- `server/src/controllers/`: validación defensiva y formateo de respuestas HTTP.
- `server/src/services/`: lógica de negocio pura con persistencia en memoria (array).
- `server/src/index.js`: inicialización de Express, montaje de rutas y manejo global de errores.
- `server/src/config/env.js`: carga y validación del entorno (dotenv + PORT).

### Middlewares y manejo de errores
En `server/src/index.js` se aplican:
- `cors()`: habilita el consumo desde el frontend.
- `express.json()`: parsea el cuerpo JSON de `POST` y lo deja disponible en `req.body`.
- `loggerAcademico`: middleware de auditoría que registra método, ruta, código de estado y duración.

El manejo global de excepciones traduce errores:
- `NOT_FOUND` -> `404` con un mensaje de error en JSON.
- cualquier otro error no controlado -> `500` con un mensaje genérico y `console.error(err)` para mantener trazabilidad sin exponer detalles al cliente.

### API REST
Base: `/api/v1/tasks`

1. `GET /api/v1/tasks`
   - Devuelve `200 OK` con un array JSON de tareas: `{ id, title, amount, category }`.

2. `POST /api/v1/tasks`
   - Devuelve `201 Created` con la tarea creada.
   - Devuelve `400 Bad Request` con `{ "error": "..." }` si el payload no cumple el contrato esperado.
   - Body esperado:
     - `title` (string, 2-60 caracteres)
     - `amount` (número, mayor que 0)
     - `category` (una de `Ocio`, `Supermercado`, `Hogar`, `Transporte`)

3. `DELETE /api/v1/tasks/:id`
   - Devuelve `204 No Content` cuando se elimina correctamente.
   - Devuelve `400 Bad Request` si el id no es válido.
   - Devuelve `404 Not Found` si la tarea no existe.

### Pruebas de integración (Postman / Thunder Client)
El backend usa memoria en lugar de una base de datos, por lo que al reiniciar el servidor la lista se vacía.

Casos recomendados:
- POST inválido: enviar un body sin `title` y comprobar que responde `400` con `{ "error": "..." }`.
- POST inválido (importe): enviar `amount` como texto (por ejemplo `"abc"`) y confirmar que responde `400`.
- DELETE inexistente: borrar un id que no existe (por ejemplo `999`) y comprobar que responde `404` con `{ "error": "La tarea no existe." }`.

### Consumo desde el frontend (sin LocalStorage)
El archivo `src/api/client.js` encapsula el acceso HTTP (`fetch`) y centraliza:
- construcción de URL (base + ruta),
- parseo de JSON,
- traducción de errores HTTP en `Error` con `status`.

En `app.js`:
- se realiza `GET /api/v1/tasks` al iniciar,
- se hace `POST /api/v1/tasks` al enviar el formulario,
- se hace `DELETE /api/v1/tasks/:id` al borrar,
- la interfaz muestra un estado de carga (`#network-loading`) y, en caso de fallo, un estado de error (`#network-error`).

### Ejecución local
1. Backend:
   - `cd server`
   - `npm install`
   - `npm run dev`
2. Frontend:
   - abre `index.html` en el navegador.

Si el backend no está en `http://localhost:3000`, define antes de cargar la página:
`window.TASKFLOW_API_BASE_URL = "http://tu-servidor:PUERTO";`

### Despliegue en Vercel
Este proyecto se despliega como un único repo/proyecto en Vercel:
- El frontend estático se sirve desde la raíz (`index.html`, `app.js`, `src/api/client.js`).
- La API REST se expone como funciones serverless bajo `api/v1/tasks/...` (mismo repo), de forma que el frontend puede consumir `/api/v1/tasks` desde el mismo origen.

No hace falta configurar `TASKFLOW_API_BASE_URL` si Vercel sirve la API desde el mismo dominio.