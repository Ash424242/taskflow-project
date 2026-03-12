# Cursor Workflow

## Que voy a documentar
En este archivo voy a documentar como uso Cursor dentro del proyecto TaskFlow: exploracion de interfaz, atajos de teclado, ejemplos practicos y mejoras logradas con su ayuda.

Cursor es un editor basado en VS Code, por lo que hereda todos sus atajos, pero su verdadero potencial reside en las funciones de IA. En Windows, la tecla clave es Ctrl.

## Los atajos más útiles divididos por categorías:
1. Funciones IA:
    Ctrl + K (Edición en línea).
    Ctrl + L (Chat de IA).
    Ctrl + I (Composer).

2. Control del Autocompletado (Cursor Tab)

Cursor predice tu siguiente movimiento. Para manejar estas sugerencias usa:

    Tab: Aceptar la sugerencia completa.

    Ctrl + Flecha Derecha: Aceptar la sugerencia palabra por palabra (muy útil si solo quieres una parte).

    Esc: Rechazar la sugerencia actual.

3. Gestión del Chat y Composer

Una vez dentro de las ventanas de IA, estos atajos agilizan el flujo:

    Ctrl + Enter: Envía tu prompt o aplica los cambios generados.

    Ctrl + Shift + L: Abre un chat totalmente nuevo (limpia el contexto anterior).

    Ctrl + Shift + I: Alterna el Composer entre modo ventana flotante y pantalla completa (ideal para arquitecturas complejas).

    Alt + Enter (en el chat): Envía la pregunta incluyendo "todo el código base" (@Codebase) como contexto automáticamente.

4. Navegación y Edición (Herencia de VS Code)

    Ctrl + P: Búsqueda rápida de archivos por nombre.

    Ctrl + Shift + P: Abre la paleta de comandos (para buscar cualquier función de Cursor).

    Ctrl + B: Ocultar/mostrar la barra lateral (para ganar espacio al programar).

    Ctrl + \: Divide el editor en dos paneles.

    F12: Ir a la definición de una función o variable.

    ## Dos ejemplos concretos donde Cursor ha mejorado mí código.
    1. Ha mejorado legibilidad de los documentos Markdown a través de revisión la síntaxis.
    2. Cursor fue utilizado en resolver el problema con visualisación de la app en móviles (que has mencionado en la última tutoría).