### 1. ¿Qué es el Model Context Protocol (MCP)?
He investigado sobre MCP y he aprendido que es un protocolo estándar y abierto (creado originalmente por Anthropic) que funciona como un "conector universal" para la IA. En lugar de que el modelo esté aislado, MCP me permite conectar mi asistente de IA de forma segura a fuentes de datos externas, como bases de datos, APIs (GitHub, Slack, Jira) o el propio sistema de archivos de mi ordenador.

### 2. Instalación paso a paso en Cursor (Servidor Filesystem)
He instalado el servidor `filesystem`, el cual permite a la IA de Cursor navegar y leer carpetas locales de mi ordenador que yo le autorice. Estos son los pasos que he seguido:

1. **Abrir la configuración:** He abierto Cursor y he presionado `Cmd/Ctrl + Shift + P` para abrir la paleta de comandos. Allí he buscado y seleccionado *"Cursor Settings"*.
2. **Navegar a la sección MCP:** En el panel de configuración, he buscado la pestaña he hecho clic en **MCP**.
3. **Añadir el servidor:** He hecho clic en el botón **"+ Add Custom MCP"** para añadirlo de forma global.
4. **Configurar los parámetros:** 
   * **Type:** He seleccionado `command`.
   * **Name:** Lo he llamado `mcp-filesystem`.
   * **Command:** He escrito `npx`.
   * **Args:** He añadido `-y @modelcontextprotocol/server-filesystem /ruta absoluta a mi proyecto`.
5. **Guardar y verificar:** He guardado la configuración. Inmediatamente el indicador a la derecha del servidor se ha puesto en **verde**, confirmando que la conexión se ha establecido correctamente con Cursor.

### ¿En qué casos puede ser útil MCP en proyectos reales?
* **Evitar el cambio de contexto:** Puedo pedirle a la IA *"crea una rama y un PR en GitHub para este issue"* o *"lee el ticket de Jira PROJ-123 y escribe el código necesario"*, todo sin salir de Cursor.
* **Onboarding automatizado:** En proyectos enormes, puedo conectar un servidor MCP a Confluence o Notion. Si no entiendo una arquitectura legacy, le pido a la IA que busque la documentación interna de la empresa y me la cruce con el código que estoy viendo.
* **Depuración de errores en tiempo real:** Puedo conectar MCP a un servicio como Datadog o Sentry. Si hay una caída en producción, le puedo pedir a Cursor que analice los logs recientes del servidor y me sugiera qué línea de mi código local está fallando.