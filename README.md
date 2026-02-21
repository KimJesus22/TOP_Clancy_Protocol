# T.O.P Clancy Protocol - Secure Portfolio

Un Dashboard Interactivo con tematica de ciberseguridad inspirado en el universo de Twenty One Pilots.
An interactive cybersecurity-themed Dashboard inspired by the Twenty One Pilots universe.

## Tecnologias / Technologies

- Next.js 15
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Zustand
- Supabase (`@supabase/supabase-js`, `@supabase/ssr`)

## Descripcion del proyecto / Project Description

La aplicacion esta diseniada para ser accesible para todo publico mediante una interfaz visual tipo panel de control seguro.
The app is designed to be accessible to all audiences through a visual secure-control-panel experience.

Tambien incluye herramientas ocultas para usuarios tecnicos, como una consola avanzada con comandos especiales.
It also includes hidden tools for technical users, such as an advanced console with special commands.

## Funcionalidades clave / Key Features

- Sidebar responsive con Glassmorphism y navegacion por secciones.
- Dashboard visual para usuarios no tecnicos + herramientas ocultas para usuarios avanzados.
- Grid de expedientes con panel lateral de detalles forenses.
- Timeline cronologica de albumes con animaciones por scroll.
- Reproductores de Spotify embebidos por album (acordeon expandible).
- Broadcast Gallery con videos oficiales en YouTube (iframes).
- Network Scanner (radar de red) con progresos animados y categorias estilo Wappalyzer.
- Trench Wallet (economia virtual) con codigos secretos y tienda de contrabando.
- Reproductor global persistente "Dema Radio Player" con estado compartido.
- Modulo EdTech `/learn` con motor interactivo `LyricQuizEngine`.
- Endpoint publico `/login` para solicitar Magic Link de Supabase.
- Zona restringida `/classified` con acceso autenticado y datos desde Supabase.
- Pagina 404 personalizada con tematica de violacion de seguridad DEMA.

## Datos locales / Local Static Data

- Base de datos estatica local en `lib/data/albums.ts`.
- Estructura tipada con TypeScript (`AlbumRecord`) para evitar costos de servidor.
- Incluye metadatos de albumes: estado, nivel de amenaza DEMA, color y `spotifyEmbedId`.
- Scripts SQL versionados en `supabase/` para schema y seed de lore.

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

## Trench Wallet + Smuggler Shop

- Saldo global persistente de creditos usando Zustand.
- Componente `DecodeChallenge` con codigos secretos:
  - `SAHLOFOLINA`
  - `KEONS`
- Recompensa por codigo valido en `DecodeChallenge`: `+50` creditos.
- Recompensa por respuesta correcta en `LyricQuizEngine`: `+10` creditos.
- Tienda `/smuggler` para desbloquear temas visuales (ej. `Modo Blurryface`).

## Dema Radio Player (Global Audio)

- Reproductor fijo en la parte inferior (`fixed bottom-0 w-full`).
- Controles: Play, Pause, Next, progreso y volumen.
- Audio HTML5 conectado a estado global.
- Persistente entre rutas para que la musica no se corte al navegar.

## Supabase (Auth + Data)

- Cliente browser en `src/lib/supabaseClient.ts`.
- Cliente server SSR con cookies en `src/lib/supabaseServer.ts`.
- Ruta protegida `/classified`:
  - valida sesion autenticada
  - consulta `dema_intercepts`
  - fallback con mensaje de acceso denegado si falla auth/permisos
- Ruta publica `/login`:
  - expone el formulario `BanditoLogin`
  - envia Magic Link para acceso autenticado
- Lore en tiempo real con `LoreDecryptor` sobre tabla `dema_messages`.

## Spotify Embeds

- Cada album en la timeline puede expandirse para mostrar su iframe publico de Spotify.
- Los `spotifyEmbedId` actuales son placeholders y se pueden reemplazar por IDs reales cuando quieras.

## Vista en vivo / Live Demo

- Produccion (Vercel): `https://top-clancy-protocol.vercel.app/`

## Ejecucion local / Local Run

```bash
corepack pnpm install
corepack pnpm dev
```

## Variables de entorno / Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Opcional (compatibilidad local previa):

```env
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=...
```

## Scripts

- `corepack pnpm dev`: inicia el entorno de desarrollo / starts the development server
- `corepack pnpm lint`: ejecuta el analisis estatico / runs static analysis
- `corepack pnpm build`: genera el build de produccion / creates the production build
- `corepack pnpm start`: sirve el build de produccion / runs the production server
