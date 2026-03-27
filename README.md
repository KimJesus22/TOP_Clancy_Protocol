# T.O.P Clancy Protocol - Secure Portfolio

Un Dashboard Interactivo con tematica de ciberseguridad inspirado en el universo de Twenty One Pilots.
An interactive cybersecurity-themed Dashboard inspired by the Twenty One Pilots universe.

## Tecnologias / Technologies

- Next.js 15
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- next-sitemap
- SWR
- Zustand
- Supabase (`@supabase/supabase-js`, `@supabase/ssr`)
- Jest + Testing Library

## Descripcion del proyecto / Project Description

La aplicacion esta diseniada para ser accesible para todo publico mediante una interfaz visual tipo panel de control seguro.
The app is designed to be accessible to all audiences through a visual secure-control-panel experience.

Tambien incluye herramientas ocultas para usuarios tecnicos, como una consola avanzada con comandos especiales.
It also includes hidden tools for technical users, such as an advanced console with special commands.

## Funcionalidades clave / Key Features

- Sidebar responsive con Glassmorphism y navegacion por secciones.
- Dashboard visual para usuarios no tecnicos + herramientas ocultas para usuarios avanzados.
- Grid de expedientes con panel lateral de detalles forenses.
- Archivo indexable de expedientes con rutas limpias tipo `/expedientes/[slug]`.
- Timeline cronologica de albumes con animaciones por scroll.
- Reproductores de Spotify embebidos por album (acordeon expandible).
- Broadcast Gallery con videos oficiales en YouTube (iframes).
- Network Scanner (radar de red) con progresos animados y categorias estilo Wappalyzer.
- Trench Wallet (economia virtual) con codigos secretos y tienda de contrabando.
- Ruta secreta `/admin/analytics` para monitoreo interno de economia Bandito.
- Reproductor global persistente "Dema Radio Player" con estado compartido.
- Modulo EdTech `/learn` con motor interactivo `LyricQuizEngine`.
- Demo publica `/consola` para mostrar la terminal sin autenticacion.
- Endpoint publico `/login` para solicitar Magic Link de Supabase.
- Zona restringida `/classified` con acceso autenticado y datos desde Supabase.
- Pagina 404 personalizada con tematica de violacion de seguridad DEMA.

## Datos locales / Local Static Data

- El catalogo editorial de albumes vive en `public/data/albums.json`.
- `lib/data/albums.ts` mantiene la capa tipada (`AlbumRecord`) y centraliza el acceso al dataset.
- Esto separa contenido y presentacion: los textos bilingues, colores y relaciones de lore ya no viven incrustados en el componente o en un array TypeScript gigante.
- Como el dataset ahora es JSON estatico dentro del repo, resulta mas facil migrarlo despues a Supabase o a un panel editorial sin reescribir la UI.
- Incluye metadatos de albumes: estado, nivel de amenaza DEMA, color y `spotifyEmbedId`.
- Scripts SQL versionados en `supabase/` para schema y seed de lore.

## Arquitectura de componentes

- `SecureDashboard` fue descompuesto en subcomponentes para reducir complejidad y facilitar mantenimiento.
- La navegacion lateral vive en `app/components/secure-dashboard/SidebarNavigation.tsx`.
- El menu movil vive en `app/components/secure-dashboard/MobileNavigation.tsx`.
- La consola avanzada modal vive en `app/components/secure-dashboard/AdvancedTerminalDialog.tsx`.
- Los placeholders de carga reutilizables viven en `app/components/secure-dashboard/SectionSkeleton.tsx`.
- El atajo `Ctrl + Shift + T` fue movido al hook `src/hooks/useTerminalShortcut.ts`.
- La gestion reutilizable de foco en overlays fue movida al hook `src/hooks/useOverlayFocusTrap.ts`.
- La autenticacion del formulario fue abstraida a `src/hooks/useAuth.ts`, permitiendo que `BanditoLogin` se concentre en UI, mensajes y estados de carga.

## Alias de importacion

- El proyecto usa alias `@/` para imports internos en lugar de rutas relativas profundas.
- `tsconfig.json` define `baseUrl: "."` y mantiene el mapeo `@/*`.
- Ejemplo recomendado:
  - `import { topAlbums } from "@/lib/data/albums"`
- Esta convencion se aplica tanto en imports estaticos como en `next/dynamic`.

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
- Ruta `/admin/analytics` con datos mock de 50 usuarios Banditos y transacciones recientes.
- Incluye utilidades TypeScript para calcular:
  - media de saldos
  - mediana de saldos
  - moda de recompensas compradas
- Los datos mock incluyen codenames como `Ghost_141` y `Sector_TXT` como easter eggs.

## Dema Radio Player (Global Audio)

- Reproductor fijo en la parte inferior (`fixed bottom-0 w-full`).
- Controles: Play, Pause, Next, progreso y volumen.
- Audio HTML5 conectado a estado global.
- Persistente entre rutas para que la musica no se corte al navegar.

## Supabase (Auth + Data)

- Cliente browser en `src/lib/supabaseClient.ts`.
- Cliente server SSR con cookies en `src/lib/supabaseServer.ts`.
- Ambos clientes usan un schema `Database` tipado en `src/lib/supabaseTypes.ts`.
- El tipado actual cubre las tablas `dema_messages` y `dema_intercepts`, mejorando autocompletado y validacion de columnas.
- Ruta protegida `/classified`:
  - valida sesion autenticada
  - consulta `dema_intercepts`
  - fallback con mensaje de acceso denegado si falla auth/permisos
- Ruta publica `/login`:
  - expone el formulario `BanditoLogin`
  - envia Magic Link para acceso autenticado
  - soporta login por email/password y registro mediante el hook `useAuth`
  - redirige a `/classified` tras autenticacion exitosa por password
- Lore en tiempo real con `LoreDecryptor` sobre tabla `dema_messages`.
- Si la conexion al feed de `dema_messages` falla, `LoreDecryptor` no rompe la UI:
  - traduce errores de red como `Failed to fetch` a mensajes legibles
  - muestra fallback visual claro para usuario final
  - permite reintentar la conexion manualmente
- La zona `/classified` incluye dos compuertas interactivas adicionales:
  - `KeonsFirewall`, que exige resolver un limite matematico antes de mostrar el contenido
  - `ColorDecryptor`, que exige convertir un color hexadecimal a RGB decimal exacto para desbloquear un archivo confidencial

## Spotify Embeds

- Cada album en la timeline puede expandirse para mostrar su iframe publico de Spotify.
- Los `spotifyEmbedId` actuales son placeholders y se pueden reemplazar por IDs reales cuando quieras.

## Spotify API Metadata

- La timeline tambien puede consultar metadata real de Spotify mediante la ruta server-side `app/api/spotify/albums/route.ts`.
- El cliente usa `SPOTIFY_CLIENT_ID` y `SPOTIFY_CLIENT_SECRET` solo en servidor mediante flujo `client_credentials`.
- La ruta `/api/spotify/albums` reutiliza un token de Spotify en cache de memoria y devuelve `Cache-Control: s-maxage=3600, stale-while-revalidate=86400`.
- El fetching del lado cliente usa `useSWR('/api/spotify/albums?ids=...')` para cachear respuestas, deduplicar solicitudes y simplificar el manejo declarativo de carga/error.
- El `fetch` del cliente usa `cache: "no-store"` para no depender del cache implicito del navegador; la estrategia de cache queda concentrada en SWR y en el API route.
- Cuando el `spotifyEmbedId` es valido, la UI muestra portada, artistas, fecha de lanzamiento, numero de tracks y enlace directo a Spotify.
- Si la consulta falla, la timeline conserva el embed y hace fallback visual sin romper la experiencia.

## Performance y Core Web Vitals

- El proyecto se revisa con `corepack pnpm build` para detectar peso de rutas, JS compartido y problemas de compilacion antes de optimizar.
- La referencia de trabajo para auditorias es Lighthouse / PageSpeed Insights con foco en `LCP`, `CLS`, `TTFB` y el resto de Core Web Vitals.
- Objetivos recomendados:
  - `LCP < 2.5s`
  - `CLS < 0.1`
  - `FID < 100ms`
- La home y la consola demo priorizan carga estatica donde es posible; los datos de Spotify se consultan por ruta server-side con fallback para no romper la renderizacion.
- La home ahora divide codigo con `next/dynamic` para modulos pesados por debajo del primer scroll.
- Componentes como `EvidenceGrid`, `NetworkScanner`, `ThreatMap`, `LoreDecryptor`, `BroadcastGallery` y `TerminalInterface` se cargan de forma diferida con placeholders mientras llegan sus bundles.
- Se reservaron alturas de carga para varios bloques y reproductores, reduciendo riesgo de `CLS`.
- Los iframes de Spotify ya no se montan en todos los albumes por defecto; ahora se renderizan solo al expandir cada expediente.
- Los iframes de YouTube en `BroadcastGallery` se montan solo cuando entran en viewport y mantienen placeholder con altura fija.
- Varias animaciones se degradan con `prefers-reduced-motion`, reduciendo trabajo inicial de pintura y scripting.
- Mejora medida en build para `/`:
  - antes: `29.6 kB` y `293 kB First Load JS`
  - despues: `20.3 kB` y `233 kB First Load JS`

## Render estatico e ISR

- En App Router se usa prerender estatico para las vistas publicas principales en lugar de `getStaticProps`.
- `/` y `/consola` declaran render estatico con `revalidate = 3600`, permitiendo Incremental Static Regeneration cada 1 hora.
- Este enfoque mejora velocidad inicial, cacheabilidad y base SEO para contenido mayormente editorial como timeline, briefing y demo publica.

## Optimizacion de imagenes

- Las imagenes reales de la interfaz usan `next/image`.
- Las portadas de Spotify declaran `sizes` para evitar descargas sobredimensionadas.
- Las imagenes renderizadas con `next/image` declaran `width` y `height` concretos para estabilizar layout.
- El asset desbloqueado de la consola tambien declara `sizes` responsivo.
- No se fuerza `priority` donde no existe una imagen LCP clara above-the-fold; los fondos principales son gradientes CSS y no archivos raster.
- Los fondos visuales decorativos actuales se resuelven con CSS (`linear-gradient` / `radial-gradient`), por lo que no aplica migrarlos a `next/image`.
- Los iframes de Spotify usan `loading="lazy"` y se diferencian de los de YouTube en que solo se montan cuando el usuario expande el album.
- Los iframes de YouTube tambien usan carga diferida y esperan al viewport antes de montarse.

## Carga de fuentes

- Las fuentes se gestionan con `next/font/google`, por lo que Next.js las auto-hospeda dentro del flujo de build.
- Se usa `display: "swap"` para evitar bloqueo de render mientras cargan las fuentes personalizadas.
- Las fuentes secundarias `Noto Sans KR` y `Noto Sans JP` deshabilitan `preload` para no competir con la ruta critica de la home.
- La prioridad de carga queda concentrada en las familias base de interfaz (`Inter` y `Fira Code`).

## Metadata, SEO y Open Graph

- El proyecto usa la API `metadata` de Next.js 15 en App Router para definir `title`, `description`, canonical y etiquetas sociales por ruta.
- Existe una capa reutilizable en `src/lib/metadata.ts` para mantener consistencia entre paginas.
- Se generan miniaturas Open Graph/Twitter dinamicas con `next/og` desde `src/lib/opengraph-image.tsx`.
- Rutas con metadata y vista previa social dedicada:
  - `/`
  - `/classified`
  - `/learn`
  - `/consola`
  - `/login`
  - `/smuggler`
- Cada una expone su propia ruta `opengraph-image`, lo que permite compartir vistas del dashboard sin depender de assets manuales en `public/`.
- `app/layout.tsx` define `metadataBase`, plantilla de titulos y defaults globales de Open Graph/Twitter.
- La pagina `/smuggler` fue separada en pagina server + componente cliente (`SmugglerStorefront`) para cumplir la restriccion de Next.js que impide exportar `metadata` desde componentes marcados con `"use client"`.

## Rutas semanticas

- Los expedientes ya no dependen solo del panel lateral del dashboard.
- Existe un indice publico en `/expedientes`.
- Cada evidencia tiene su propia URL descriptiva, por ejemplo:
  - `/expedientes/blurryface`
  - `/expedientes/trench`
  - `/expedientes/dema`
  - `/expedientes/red-envelope`
- Estas rutas se prerenderizan con `generateStaticParams`, lo que mejora compartibilidad, crawl e indexacion.

## Datos estructurados y AEO

- La home publica JSON-LD con esquemas `WebSite`, `WebPage` y `FAQPage`.
- `/expedientes` publica `CollectionPage`, `ItemList` y `FAQPage`.
- Cada `/expedientes/[slug]` publica `Article`, `BreadcrumbList` y `FAQPage`.
- La utilidad `src/lib/structured-data.ts` centraliza la generacion de bloques JSON-LD para mantener consistencia y facilitar Answer Engine Optimization.

## Sitemap y robots

- `next-sitemap` genera automaticamente:
  - `public/sitemap.xml`
  - `public/sitemap-0.xml`
  - `public/robots.txt`
- La generacion corre en `postbuild`, por lo que `corepack pnpm build` deja estos archivos listos.
- Se excluyen de indexacion rutas no utiles para crawlers, como:
  - `/api/*`
  - `/classified`
  - `opengraph-image`
- `/` y `/expedientes` reciben prioridad superior dentro del sitemap.
- Para produccion conviene definir `NEXT_PUBLIC_SITE_URL` con el dominio publico real, evitando que sitemap y metadata usen `http://localhost:3000`.

## Testing

- El proyecto incluye pruebas unitarias con Jest y React Testing Library.
- Configuracion principal:
  - `jest.config.mjs`
  - `jest.setup.ts`
- Casos cubiertos actualmente:
  - `tests/TerminalInterface.test.tsx`
    - valida respuesta a comandos soportados
    - valida desbloqueo del secreto `vialism`
  - `tests/trenchWalletStore.test.ts`
    - valida que `redeemCode` incremente creditos
    - evita duplicar recompensas al reutilizar un codigo
- Script disponible:
  - `corepack pnpm test`

## Lore PDF Integration

- El contenido del PDF `WELCOME TO TRENCH` fue convertido a experiencia web bilingue dentro de la home.
- `ActClancyBriefing` resume el arco narrativo general antes de entrar al detalle.
- `ChronologicalEvidence` ahora combina dossier narrativo ES/EN + metadata musical + embed de Spotify.
- `EvidenceGrid` incluye expedientes nuevos para eras, personajes, ciudad, documentos y organizaciones del lore.

## Modulos secretos

- `KeonsFirewall` se renderiza antes del contenido clasificado y simula una terminal al borde del colapso.
- Muestra la alerta `Sobrecarga de memoria detectada. Estabilice el núcleo resolviendo la indeterminación algorítmica`.
- Presenta el limite `lim x→2 (x² - 4) / (x - 2)` como desafio de acceso.
- Si el usuario responde `4`, la terminal cambia a verde, muestra `Núcleo estabilizado. Bypassing firewall...` y habilita el acceso.
- Si falla, la terminal vibra con una animacion agresiva de error.
- `ColorDecryptor` trabaja sobre señales hexadecimales como `#FCE300` y `#FF2E2E`.
- El usuario debe ingresar los canales `R`, `G` y `B` correctos en decimal.
- Si acierta, el modulo parpadea en el color objetivo y desbloquea un `Archivo Confidencial`.

## Accesibilidad y UX

- Enlace `Saltar al contenido principal` disponible desde teclado.
- Landmarks explicitos en la navegacion principal, menu movil y `main`.
- Estados `focus-visible` para enlaces, botones e inputs.
- Navegacion lateral, acciones de decodificacion y accesos rapidos compatibles con `Tab` / `Enter`.
- Los controles con estado expuesto a usuario ahora anuncian ese estado con atributos ARIA como `aria-expanded`, `aria-controls` y `aria-pressed`.
- El menu movil expone apertura/cierre a tecnologias de asistencia.
- La timeline de albumes expone sus paneles expandibles como regiones controladas por acordeon.
- El selector de modo de autenticacion en `BanditoLogin` comunica que opcion esta activa.
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
NEXT_PUBLIC_SITE_URL=...
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
