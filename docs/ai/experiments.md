# Experimentos con IA en programación

En este documento registro los resultados de mi experimento comparando mi flujo de trabajo habitual (como programador junior) frente al uso de herramientas de Inteligencia Artificial para resolver problemas de código en JavaScript.

## Parte 1: Problemas básicos de JavaScript

He elegido tres problemas clásicos y sencillos para la primera prueba:
1. **Invertir una cadena de texto.**
2. **Encontrar el número mayor en un array.**
3. **Comprobar si una palabra es un palíndromo.**

### 1. Resolución sin IA (Mi enfoque Junior)
*   **Problema 1:** Usé un bucle `for` clásico, iterando la cadena desde el final hasta el principio y concatenando los caracteres en una nueva variable.
*   **Problema 2:** Creé una variable `max` iniciada en 0 y recorrí el array con un `forEach`, actualizando la variable si el número actual era mayor.
*   **Problema 3:** Reutilicé la lógica del bucle del primer problema para invertir la palabra y luego usé un `if` para comparar ambas.

### 2. Resolución con IA (ChatGPT)
Le pedí a la IA que resolviera los mismos problemas. 
*   **Problema 1:** Devolvió `str.split('').reverse().join('');`
*   **Problema 2:** Devolvió `Math.max(...arr);`
*   **Problema 3:** Devolvió `str === str.split('').reverse().join('');`

### 3. Comparación (Problemas básicos)
*   **Tiempo invertido:** Yo tardé unos 20 minutos en pensar, escribir y probar los tres scripts. La IA generó las tres soluciones exactas en pocos segundos.
*   **Calidad del código:** Mi código era funcional, pero verboso. La IA utilizó métodos integrados de JavaScript modernos (ES6+), como el *spread operator* y métodos de arrays, logrando *one-liners* muy limpios.
*   **Comprensión del problema:** Al hacerlo yo mismo, tuve que repasar mentalmente cómo funcionan los índices de los arrays, lo cual afianza mi lógica. Al ver la solución de la IA, entendí rápidamente lo que hacía, pero si solo hubiera copiado y pegado desde el principio, no habría practicado mi pensamiento algorítmico.

---

## Parte 2: Tareas relacionadas con mi proyecto

### Tarea 1: Mostrar estado vacío cuando no hay gastos o no hay resultados de búsqueda

#### 1. Resolución sin IA (mi enfoque)
- Revisé la función que pinta la lista para detectar cuándo no hay elementos visibles.
- Planteé dos escenarios distintos: lista totalmente vacía y filtro de búsqueda sin coincidencias.
- Creé un bloque visual de estado vacío con un título y un texto de ayuda para cada caso.

#### 2. Resolución con IA
- Pedí a la IA una implementación mínima reutilizable para el estado vacío en JavaScript.
- La propuesta fue crear una función dedicada para construir el mensaje y llamarla desde el renderizado cuando el número de resultados visibles sea 0.
- Revisé manualmente los textos y clases CSS para asegurar coherencia con la interfaz del proyecto.

#### 3. Comparación
- Tiempo invertido: sin IA me habría llevado alrededor de 20-25 minutos; con IA se reduce a unos 8-12 minutos entre generación y revisión.
- Calidad del código: con IA la solución sale más modular desde el inicio (función separada para empty state), mientras que sin IA probablemente haría primero una versión más directa dentro del render.
- Comprensión: hacerlo yo me obliga a pensar mejor el flujo de renderizado; con IA avanzo más rápido, pero la revisión manual sigue siendo clave para no introducir mensajes o estilos incoherentes.

### Tarea 2: Mejorar la búsqueda para que también encuentre por categoría

#### 1. Resolución sin IA (mi enfoque)
- Revisé la función de filtrado para identificar por qué solo buscaba en el título del gasto.
- Definí el criterio de coincidencia: un gasto debe mostrarse si el texto buscado aparece en el título o en la categoría.
- Ajusté la condición de filtrado para evaluar ambos campos y mantener la búsqueda sin distinguir mayúsculas de minúsculas.

#### 2. Resolución con IA
- Pedí a la IA una propuesta mínima para extender la búsqueda actual sin romper el comportamiento existente.
- La sugerencia fue centralizar la comparación en una función clara, con una consulta normalizada y dos comprobaciones: título y categoría.
- Revisé manualmente la solución y actualicé el placeholder del campo de búsqueda para reflejar el nuevo comportamiento.

#### 3. Comparación
- Tiempo invertido: sin IA me habría llevado unos 15-20 minutos; con IA se reduce a 6-10 minutos incluyendo revisión.
- Calidad del código: con IA la propuesta llegó más ordenada desde el principio, con variables intermedias legibles y una condición final explícita.
- Comprensión: al implementarlo yo, refuerzo la lógica de filtrado; con IA gano velocidad, pero debo validar que el cambio sea coherente con la experiencia de usuario.

### Tarea 3: Añadir un botón para resetear todos los gastos (con confirmación)

#### 1. Resolución sin IA (mi enfoque)
- Revisé la zona del panel lateral para decidir la ubicación del nuevo botón sin romper la jerarquía visual.
- Implementé un evento de clic con confirmación previa para evitar borrados accidentales.
- Al confirmar, vacié la lista de gastos, actualicé localStorage y repinté la interfaz.

#### 2. Resolución con IA
- Pedí a la IA una implementación simple y segura para borrar todos los gastos con una confirmación explícita.
- La propuesta incluyó separar el comportamiento en un handler dedicado y reutilizar las funciones ya existentes de guardado y renderizado.
- Revisé manualmente el texto del mensaje de confirmación y el estado final de la interfaz para asegurar consistencia.

#### 3. Comparación
- Tiempo invertido: sin IA me habría llevado unos 20-30 minutos; con IA se reduce a 10-15 minutos entre propuesta, integración y revisión.
- Calidad del código: con IA el flujo quedó más estructurado desde el inicio, con pasos claros de validación, confirmación y actualización del estado.
- Comprensión: al hacerlo por mi cuenta entiendo mejor el flujo de eventos; con IA avanzo más rápido, pero sigo necesitando validar casos límite para evitar pérdidas de datos no deseadas.

