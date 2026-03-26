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
- Demo publica `/consola` para mostrar la terminal sin autenticacion.
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

- Boton `Abrir Consola` que lleva a la demo publica `/consola`.
- Atajo de teclado: `Ctrl + Shift + T`.

Comandos utiles:
Useful commands:

- `help`: lista comandos disponibles.
- `status`: muestra barra de amenaza DEMA.
- `vialism`: desbloquea un asset visual oculto dentro de la consola.

La consola publica es opcional y no bloquea la navegacion principal.
The public console is optional and does not block the main navigation.

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

## Spotify API Metadata

- La timeline tambien puede consultar metadata real de Spotify mediante la ruta server-side `app/api/spotify/albums/route.ts`.
- El cliente usa `SPOTIFY_CLIENT_ID` y `SPOTIFY_CLIENT_SECRET` solo en servidor mediante flujo `client_credentials`.
- Cuando el `spotifyEmbedId` es valido, la UI muestra portada, artistas, fecha de lanzamiento, numero de tracks y enlace directo a Spotify.
- Si la consulta falla, la timeline conserva el embed y hace fallback visual sin romper la experiencia.

## Lore PDF Integration

- El contenido del PDF `WELCOME TO TRENCH` fue convertido a experiencia web bilingue dentro de la home.
- `ActClancyBriefing` resume el arco narrativo general antes de entrar al detalle.
- `ChronologicalEvidence` ahora combina dossier narrativo ES/EN + metadata musical + embed de Spotify.
- `EvidenceGrid` incluye expedientes nuevos para eras, personajes, ciudad, documentos y organizaciones del lore.

## Accesibilidad y UX

- Enlace `Saltar al contenido principal` disponible desde teclado.
- Landmarks explicitos en la navegacion principal, menu movil y `main`.
- Estados `focus-visible` para enlaces, botones e inputs.
- Navegacion lateral, acciones de decodificacion y accesos rapidos compatibles con `Tab` / `Enter`.
- Los iframes de video muestran señal visual en su contenedor cuando reciben foco por teclado.
- Los overlays interactivos usan `role="dialog"` y `aria-modal="true"` para mejorar lectura con tecnologias de asistencia.
- El foco se mueve al primer control util cuando se abre un panel o modal, se mantiene atrapado dentro con `Tab`, permite cierre con `Escape` y regresa al disparador al cerrar.
- Se incorporo una utilidad local en `src/lib/accessibility.ts` para resolver foco inicial, focus trap y restauracion de foco.
- Consola demo publica en `/consola` para mostrar la experiencia sin registro.
- Mejora de contraste con paleta `off-black`, texto suavizado y jerarquia visual por niveles de superficie.

## HTML semantico

- La estructura principal prioriza landmarks nativos como `header`, `nav`, `main`, `section`, `article` y `aside`.
- Las acciones interactivas usan elementos nativos (`button`, `a`, `input`) en lugar de `div` estilizados como controles.
- Las vistas de demo y los paneles laterales fueron ajustados para que lectores de pantalla entiendan mejor contexto, titulo y region activa.

## Variables de entorno adicionales

```env
SPOTIFY_CLIENT_ID=...
SPOTIFY_CLIENT_SECRET=...
```

Estas variables se usan en servidor para consultar la API de Spotify y no deben exponerse como variables `NEXT_PUBLIC_*`.

## Notas de portafolio

- `/consola` esta pensada como demo accesible para reclutadores con datos ficticios y sin autenticacion.
- `/login` y `/classified` siguen representando el flujo autenticado real del proyecto.
- La interfaz prioriza una experiencia exploratoria: dashboard visual para publico general y herramientas opcionales para usuarios tecnicos.

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
