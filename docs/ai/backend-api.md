# backend-api (Axios, Postman, Sentry y Swagger)

Esta documentación complementa la fase 3 del proyecto: durante la construcción del backend con Express y una API REST, es habitual apoyarse en herramientas que mejoran la prueba, el diagnóstico y la documentación de los endpoints.

## Axios

Axios es una librería JavaScript para realizar peticiones HTTP desde el navegador o Node.js. Aunque hoy es posible hacerlo con la API nativa `fetch`, Axios aporta comodidades como:
- Interceptores (para añadir lógica transversal como autenticación o registro).
- Manejo unificado de respuestas y errores.
- Conversión automática de datos JSON.

En este proyecto se usa `fetch` en el frontend, pero Axios sería una alternativa válida si se quiere una capa adicional de abstracción.

## Postman

Postman es una herramienta de escritorio y web para probar APIs. Permite:
- Enviar solicitudes `GET`, `POST`, `PUT`, `PATCH` y `DELETE`.
- Definir colecciones y entornos para reutilizar configuraciones.
- Inspeccionar el cuerpo de respuesta y los códigos HTTP.
- Automatizar pruebas básicas de regresión.

Es especialmente útil en esta fase porque la validación del servidor debe comprobarse enviando payloads correctos e incorrectos (por ejemplo, `POST` sin `title` o `DELETE` de un id inexistente).

## Sentry

Sentry es una plataforma de monitorización que captura errores y métricas para ayudar a localizar fallos en producción. Su valor principal es:
- Identificar excepciones con contexto (stack trace, usuario, navegador/versión, etc.).
- Agrupar errores repetidos y facilitar el seguimiento en el tiempo.
- Reducir el tiempo de diagnóstico y corrección.

En un backend real, Sentry permitiría detectar fallos inesperados del lado del servidor, mientras que en frontend ayudaría a conocer errores de red o de renderizado que ocurren solo en ciertos dispositivos.

## Swagger (OpenAPI)

Swagger es el conjunto de herramientas y la interfaz asociada al estándar OpenAPI (o un equivalente en el ecosistema). Sirve para:
- Describir la API mediante un contrato formal (OpenAPI).
- Generar documentación interactiva (se pueden “probar” endpoints desde el navegador).
- Mejorar la consistencia entre frontend y backend al trabajar sobre un esquema compartido.

Para APIs con varios endpoints, Swagger reduce ambigüedades y mejora la mantenibilidad.

## Conclusión

Estas herramientas no son “extras decorativos”: apoyan el trabajo de ingeniería de software con validación, trazabilidad y documentación. En esta fase, el frontend consume la API y el backend responde con códigos HTTP consistentes; disponer de Postman y una documentación tipo Swagger acelera la verificación, y Sentry ayuda a detectar fallos cuando la app ya está desplegada.

