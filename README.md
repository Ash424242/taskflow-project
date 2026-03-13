# Control de Gastos

Aplicación web para registrar y visualizar gastos personales. Está construida con HTML, Tailwind CSS por CDN y JavaScript vanilla, con persistencia local mediante localStorage.

## Características

Funciona como una SPA ligera en cliente (sin backend) y permite:

- Registrar gastos con validaciones de formulario.
- Buscar gastos por nombre o categoría.
- Eliminar gastos individuales.
- Reordenar gastos con arrastrar y soltar.
- Reiniciar toda la lista con confirmación.
- Consultar resumen de gastos visibles (cantidad y total).
- Mantener preferencia de tema claro/oscuro.

## Tecnologías Utilizadas

- HTML5
- Tailwind CSS (CDN)
- JavaScript (ES6+)

## Estructura del Proyecto

- `index.html`: Estructura principal de la aplicación
- `app.js`: Lógica de JavaScript para la interactividad
- `styles.css`: Estilos CSS (no utilizado en la versión final con Tailwind)
- `package.json`: Archivo de configuración de dependencias

### Estructura actual (ampliada)

```text
taskflow-project/
├─ app.js
├─ index.html
├─ package.json
├─ package-lock.json
├─ README.md
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
- El nuevo orden se guarda automáticamente en localStorage

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

Resultado esperado: el orden de la lista cambia y queda guardado para la próxima vez que abras la aplicación.

### Ejemplo 4: Reiniciar la lista
1. Haz clic en "Resetear todos los gastos".
2. Confirma la acción en la ventana emergente.

Resultado esperado: se eliminan todos los gastos guardados y la lista queda vacía.

## Despliegue

La aplicación está diseñada para ser desplegada en la plataforma Vercel.