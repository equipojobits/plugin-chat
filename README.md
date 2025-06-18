# Plugin Chat

Este proyecto es un plugin de chat que se integra con n8n, separando la conexión de n8n del diseño y la funcionalidad del chat. A continuación se describen los componentes principales del proyecto.

## Estructura del Proyecto

```
plugin-chat
├── src
│   ├── n8n
│   │   └── connection.ts      # Maneja la conexión con n8n
│   ├── chat
│   │   ├── ui.ts              # Interfaz de usuario del chat
│   │   └── logic.ts           # Lógica del chat
│   └── types
│       └── index.ts           # Definiciones de tipos e interfaces
├── package.json                # Configuración de npm
├── tsconfig.json               # Configuración de TypeScript
└── README.md                   # Documentación del proyecto
```

## Componentes

### src/n8n/connection.ts
Este archivo maneja la conexión con n8n. Exporta la clase `N8nConnection`, que incluye métodos para establecer y cerrar la conexión.

### src/chat/ui.ts
Este archivo se encarga de la interfaz de usuario del chat. Exporta la clase `ChatUI`, que tiene métodos para renderizar el chat y actualizar su contenido.

### src/chat/logic.ts
Este archivo contiene la lógica del chat. Exporta la clase `ChatLogic`, que incluye métodos para enviar y recibir mensajes.

### src/types/index.ts
Este archivo exporta interfaces como `Message` y `User`, que definen la estructura de los mensajes y los usuarios en el chat.

## Instalación

Para instalar las dependencias del proyecto, ejecute:

```
npm install
```

## Compilación

Para compilar el proyecto, use el siguiente comando:

```
npm run build
```

## Uso

Para utilizar el plugin de chat, asegúrese de que la conexión con n8n esté establecida y luego inicialice la interfaz de usuario del chat.

## Contribuciones

Las contribuciones son bienvenidas. Si desea contribuir, por favor abra un issue o un pull request en el repositorio.

## Licencia

Este proyecto está bajo la licencia MIT.