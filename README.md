# T.O.P Clancy Protocol - Secure Portfolio

Un Dashboard Interactivo con tematica de ciberseguridad inspirado en el universo de Twenty One Pilots.
An interactive cybersecurity-themed Dashboard inspired by the Twenty One Pilots universe.

## Tecnologias / Technologies

- Next.js 15
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

## Descripcion del proyecto / Project Description

La aplicacion esta diseniada para ser accesible para todo publico mediante una interfaz visual tipo panel de control seguro.
The app is designed to be accessible to all audiences through a visual secure-control-panel experience.

Tambien incluye herramientas ocultas para usuarios tecnicos, como una consola avanzada con comandos especiales.
It also includes hidden tools for technical users, such as an advanced console with special commands.

## Funcionalidades clave / Key Features

- Sidebar responsive con navegacion clara para usuarios no tecnicos.
- Grid de expedientes con panel lateral de detalles forenses.
- Timeline cronologica de albumes con animaciones por scroll.
- Reproductores de Spotify embebidos por album (acordeon expandible).
- Estetica Cyberpunk/Clancy con indicadores visuales de seguridad.
- Consola oculta para exploracion avanzada.

## Datos locales / Local Static Data

- Base de datos estatica local en `lib/data/albums.ts`.
- Estructura tipada con TypeScript (`AlbumRecord`) para evitar costos de servidor.
- Incluye metadatos de albumes: estado, nivel de amenaza DEMA, color y `spotifyEmbedId`.

## Terminal oculta / Hidden Terminal

Puedes abrir la consola avanzada de dos formas:
You can open the advanced console in two ways:

- Boton `Abrir Consola` en el menu lateral.
- Atajo de teclado: `Ctrl + Shift + T`.

Comandos utiles:
Useful commands:

- `help`: lista comandos disponibles.
- `status`: muestra barra de amenaza DEMA.
- `vialism`: desbloquea un asset visual oculto dentro de la consola.

La consola es opcional y no bloquea la navegacion principal.
The console is optional and does not block the main navigation.

## Spotify Embeds

- Cada album en la timeline puede expandirse para mostrar su iframe publico de Spotify.
- Los `spotifyEmbedId` actuales son placeholders y se pueden reemplazar por IDs reales cuando quieras.

## Ejecucion local / Local Run

```bash
cd clancy-protocol
corepack pnpm install
corepack pnpm dev
```

## Scripts

- `corepack pnpm dev`: inicia el entorno de desarrollo / starts the development server
- `corepack pnpm lint`: ejecuta el analisis estatico / runs static analysis
- `corepack pnpm build`: genera el build de produccion / creates the production build
- `corepack pnpm start`: sirve el build de produccion / runs the production server
