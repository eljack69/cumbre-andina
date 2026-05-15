# Cumbre Andina

Landing estática de portafolio para una agencia de viajes **ficticia** —
tours boutique por los Andes (Perú, Bolivia, Chile, Ecuador): Machu Picchu,
salar de Uyuni, desierto de Atacama y Quilotoa.

> Marca, datos de contacto, testimonios, dirección, cifras y rutas son
> **inventados con fines demostrativos**. No representan a una empresa real.

## URL de publicación
`https://eljack69.github.io/cumbre-andina/`

## Stack
- HTML5 semántico + CSS moderno (custom properties, grid/flex) + JS vanilla.
- Sin build step, sin frameworks, sin npm.
- Fuentes: Google Fonts (Fraunces + Inter) con `preconnect` + `display=swap`.
- Imágenes: Unsplash CDN (`images.unsplash.com/photo-…`).

## Estructura

```
cumbre-andina/
├── index.html
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── README.md
└── assets/
    ├── css/styles.css
    └── js/main.js
```

## Identidad visual
- **Paleta**: terracota cálida (`#b4452a` / `#c95a35`), crema-papel (`#f5ede0`,
  `#efe4d2`, `#e7d8bf`), tinta oscura (`#2b1d14`) y acento mostaza (`#d6a437`).
- **Tipografía**: `Fraunces` (display serif) + `Inter` (sans).
- **Mood**: revista de viajes editorial, papel cálido, mapas antiguos, expedición curada.

## Secciones
1. Nav sticky con scroll-spy.
2. Hero fullbleed (foto de Machu Picchu) con título de dos líneas.
3. Rutas (4 cards país por país, foto vertical + ficha técnica).
4. Filosofía: carta del fundador con dos fotos intercaladas.
5. Cifras animadas (12 años / 3 200 viajeros / 47 rutas / 18 comunidades).
6. Cita destacada sobre fondo tinta.
7. Footer con contacto ficticio y redes ficticias.

## Accesibilidad y rendimiento
- `lang="es"`, `alt` descriptivos, `aria-label` en botones-icono, foco visible.
- Skip-link al contenido principal.
- `prefers-reduced-motion` respetado en scroll smooth, animaciones de revelado y conteo.
- Imagen hero con `fetchpriority="high"`; el resto con `loading="lazy"`.
- JS `defer`, sin dependencias externas.

## Datos ficticios usados (recordatorio)
- Dirección: Av. Pardo 1234, Cusco — Perú.
- Teléfono: +51 84 555 0123 (rango reservado a documentación).
- Email: `hola@cumbreandina.demo` (TLD `.demo` no es público).
- Redes sociales: `@cumbreandina` (no necesariamente existe).
- Cifras y testimonios: inventados.
