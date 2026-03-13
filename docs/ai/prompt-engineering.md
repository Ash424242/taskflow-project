# Prompt Engineering

## Prompts útiles en Cursor para este proyecto
Esta lista recoge prompts simples y prácticos para usar en este proyecto actual: una SPA de control de gastos con [app.js](app.js), [index.html](index.html), Tailwind por CDN y persistencia en localStorage. Todos los ejemplos están pensados para pedir cambios reales sobre el código existente, no sobre un proyecto hipotético.

### 1. Generar una mejora pequeña con rol definido
**Prompt**
> Actúa como un desarrollador frontend senior. Revisa [app.js](app.js) y añade una función para mostrar el total acumulado de gastos en la interfaz. Usa JavaScript vanilla, mantén el estilo actual, no introduzcas dependencias nuevas y explica primero en 3 pasos qué vas a cambiar antes de editar.

**Por qué funciona bien**
Este prompt define un rol claro, limita la tecnología permitida y pide un objetivo concreto. Eso reduce respuestas difusas y hace que Cursor proponga cambios compatibles con la arquitectura real del proyecto.

### 2. Refactorizar sin cambiar comportamiento
**Prompt**
> Revisa [app.js](app.js) y refactoriza solo la parte de validación de gastos para mejorar legibilidad y mantenimiento. No cambies el comportamiento observable, no modifiques textos de error y no toques el HTML. Al final, resume qué funciones extrajiste o simplificaste.

**Por qué funciona bien**
La restricción de no cambiar comportamiento ni mensajes evita refactors agresivos. Es útil cuando quieres mejorar estructura interna sin arriesgar regresiones visuales o funcionales.

### 3. Few-shot para documentar funciones
**Prompt**
> Quiero documentar funciones de [app.js](app.js) con comentarios JSDoc siguiendo este estilo:
>
> Ejemplo 1:
> /**
>  * Inicializa la aplicación y registra todos los listeners.
>  *
>  * @returns {void}
>  */
>
> Ejemplo 2:
> /**
>  * Limpia el mensaje de error activo del formulario.
>  *
>  * @returns {void}
>  */
>
> Aplica exactamente este nivel de detalle a las funciones que todavía no estén documentadas. No reescribas comentarios ya correctos.

**Por qué funciona bien**
Aquí el few-shot prompting fija el formato esperado con ejemplos reales y breves. Cursor entiende mejor el tono, la longitud y la estructura exacta de la documentación que debe generar.

### 4. Razonamiento paso a paso para depurar
**Prompt**
> Analiza [app.js](app.js) paso a paso como si estuvieras depurando un bug: a veces los gastos guardados en localStorage podrían tener datos corruptos. Explica primero el flujo de carga, luego identifica puntos frágiles y después propone el cambio mínimo para hacerlo más robusto sin romper la funcionalidad actual.

**Por qué funciona bien**
Pedir razonamiento por etapas fuerza una inspección ordenada del flujo real del código. Suele producir diagnósticos mejores que pedir directamente un parche sin contexto.

### 5. Restricciones claras para cambios de UI
**Prompt**
> Modifica [index.html](index.html) para mejorar la accesibilidad del formulario de gastos. Restricciones: no cambies el texto visible actual, no elimines clases de Tailwind existentes, no añadas frameworks, conserva modo oscuro y mantén el diseño responsive.

**Por qué funciona bien**
Las restricciones acotan el espacio de solución. En un proyecto pequeño como este, eso evita que Cursor rehaga el markup entero cuando solo necesitas una mejora puntual y segura.

### 6. Generar código con contexto del proyecto
**Prompt**
> Añade una función de exportar gastos a JSON en este proyecto. Usa la estructura de datos actual de [app.js](app.js), añade el botón necesario en [index.html](index.html), conserva el estilo visual existente y guarda nombres y mensajes en español.

**Por qué funciona bien**
El prompt obliga a reutilizar la estructura actual del proyecto y a tocar tanto lógica como interfaz. Es útil para generar funcionalidad nueva sin perder coherencia con el código existente.

### 7. Few-shot para mensajes de commit o cambios pequeños
**Prompt**
> Quiero un resumen corto de los cambios hechos en este proyecto con este formato:
>
> Ejemplo 1: Añade validación del importe y evita guardar datos corruptos.
> Ejemplo 2: Mejora accesibilidad del formulario y mantiene compatibilidad con modo oscuro.
>
> Ahora redacta 3 frases similares basadas en los cambios actuales de [app.js](app.js) e [index.html](index.html), sin inventar funcionalidades.

**Por qué funciona bien**
Los ejemplos fijan el nivel de concreción y el estilo de salida. Es una forma sencilla de sacar texto útil para README, changelog o descripción de una entrega.

### 8. Revisar código con rol y prioridades
**Prompt**
> Actúa como un revisor técnico senior. Haz una review de [app.js](app.js) priorizando bugs reales, riesgos de mantenimiento y casos borde. No me des elogios ni resumen largo: enumera primero los hallazgos por severidad y cita la función implicada en cada punto.

**Por qué funciona bien**
Este prompt cambia el modo de Cursor de generador a revisor. La prioridad explícita en bugs y riesgos hace que la respuesta sea mucho más útil que una revisión superficial.

### 9. Documentar el proyecto con restricciones
**Prompt**
> Actualiza [README.md](README.md) para reflejar con precisión el estado actual del proyecto. Incluye funcionalidades reales, tecnologías usadas y limitaciones actuales. No inventes scripts, no menciones tests si no existen y mantén un tono breve y técnico.

**Por qué funciona bien**
Es un buen prompt de documentación porque obliga a contrastar el README con el código real. Las restricciones evitan la típica documentación genérica que menciona herramientas que el proyecto no usa.

### 10. Plan de trabajo antes de editar
**Prompt**
> Antes de tocar nada, inspecciona [app.js](app.js) e [index.html](index.html) y proponme un plan de 5 pasos para añadir filtros por categoría y por texto. Después ejecuta el plan con cambios mínimos, sin romper la persistencia en localStorage ni el diseño responsive.

**Por qué funciona bien**
Combina planificación y ejecución en un solo prompt. Es especialmente útil cuando el cambio afecta varios puntos del proyecto y quieres que Cursor piense primero en la integración antes de editar.

## Qué técnicas se han aplicado
- **Rol definido:** ayuda a orientar el tipo de respuesta y el nivel de rigor esperado.
- **Few-shot prompting:** fija formato, tono y nivel de detalle mediante ejemplos pequeños.
- **Razonamiento paso a paso:** mejora el análisis en tareas de depuración o cambios delicados.
- **Restricciones claras:** evita cambios excesivos y mantiene compatibilidad con el proyecto actual.

## Recomendación práctica
En este proyecto funcionan mejor los prompts que mencionan de forma explícita [app.js](app.js), [index.html](index.html) y las restricciones reales del stack: JavaScript vanilla, Tailwind por CDN, localStorage, textos en español y ausencia de dependencias extra.
