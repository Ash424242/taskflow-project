# Control de Gastos

Una aplicación web simple para gestionar gastos, construida con HTML, CSS (Tailwind), y JavaScript.

## Características

- Añadir gastos con concepto, categoría y nivel de impacto
- Eliminar gastos
- Búsqueda de gastos por concepto
- Persistencia de datos en localStorage
- Modo oscuro
- Diseño responsive
- Transiciones suaves

## Tecnologías Utilizadas

- HTML5
- Tailwind CSS
- JavaScript (ES6+)

## Instalación y Uso

1. Clona el repositorio:
   ```
   git clone https://github.com/Ash424242/expenseflow-project.git
   cd expenseflow-project
   ```

2. Abre `index.html` en tu navegador web.

No se requiere servidor, ya que es una aplicación estática.

## Estructura del Proyecto

- `index.html`: Estructura principal de la aplicación
- `app.js`: Lógica de JavaScript para la interactividad
- `styles.css`: Estilos CSS (no utilizado en la versión final con Tailwind)
- `tailwind.config.js`: Configuración de Tailwind CSS
- `postcss.config.js`: Configuración de PostCSS
- `input.css`: Archivo de entrada para Tailwind

## Funcionalidades

### Añadir Gastos
- Ingresa el concepto del gasto
- Selecciona la categoría (Ocio, Supermercado, Hogar, Transporte)
- Selecciona el nivel de impacto (Bajo, Medio, Alto)
- Haz clic en "Añadir Gasto"

### Eliminar Gastos
- Haz clic en el botón "×" junto al gasto

### Búsqueda
- Escribe en el campo de búsqueda para filtrar gastos por concepto

### Modo Oscuro
- Haz clic en "Alternar Modo Oscuro" para cambiar entre temas claro y oscuro

## Despliegue

La aplicación está diseñada para ser desplegada en plataformas como Vercel, Netlify o GitHub Pages.

Para Vercel:
1. Conecta tu repositorio de GitHub a Vercel
2. Despliega automáticamente

## Contribución

Si deseas contribuir, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT.