# Control de Gastos

Una aplicación web simple para gestionar gastos, construida con HTML, CSS (Tailwind), y JavaScript.

## Características

- Añadir gastos con concepto, categoría y importe
- Eliminar gastos
- Búsqueda de gastos por concepto
- Persistencia de datos en localStorage
- Modo oscuro

## Tecnologías Utilizadas

- HTML5
- Tailwind CSS
- JavaScript (ES6+)

## Estructura del Proyecto

- `index.html`: Estructura principal de la aplicación
- `app.js`: Lógica de JavaScript para la interactividad
- `styles.css`: Estilos CSS (no utilizado en la versión final con Tailwind)
- `package.json`: Archivo de configuración de dependencias

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

### Modo Oscuro
- Haz clic en "Alternar Modo Oscuro" para cambiar entre temas claro y oscuro

### Uso con Teclado
Todos los controles interactivos son nativos (input, select, button), así que se pueden usar con Tab, Enter y Espacio.

## Despliegue

La aplicación está diseñada para ser desplegada en la plataforma Vercel.