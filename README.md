# Estiba Lab · Web

Web estática de Estiba Lab (antes Booking Lab), en español (`/`), inglés (`/en/`) y catalán (`/ca/`): software a medida para distribuidoras HORECA, agencias de transporte y empresas logísticas.

No necesita instalar nada ni compilar: son archivos HTML, CSS y JavaScript.

## Estructura

```
index.html          Página principal
aviso-legal.html    Aviso legal (LSSI)
privacidad.html     Política de privacidad (RGPD)
404.html            Página de error
en/                 Versión en inglés (index, legal-notice, privacy)
ca/                 Versión en catalán (index, avis-legal, privacitat)
vercel.json         Redirige booking-lab.com y www a estibalab.com, y /es a la portada
robots.txt          Incluye la ruta del sitemap
sitemap.xml         Mapa del sitio para Google (ES, EN, CA)
.nojekyll           Hace que GitHub Pages sirva los archivos tal cual
assets/
  styles.css        Estilos de toda la web
  main.js           Pestañas, animaciones, cuestionario y envío del formulario
  favicon.svg       Icono de la pestaña
```

## Verla en tu ordenador

Haz doble clic en `index.html`.

## Publicarla en GitHub Pages

1. Crea un repositorio nuevo en GitHub (por ejemplo `booking-lab-web`).
2. Pulsa **Add file → Upload files** y arrastra **todo el contenido de esta carpeta**, incluida la carpeta `assets`. `.nojekyll` es un archivo oculto: en Mac pulsa `Cmd + Shift + .` en el Finder para verlo.
3. Pulsa **Commit changes**.
4. Ve a **Settings → Pages**, en **Source** elige **Deploy from a branch**, rama `main`, carpeta `/ (root)`, y guarda.
5. En uno o dos minutos la web estará en `https://TU-USUARIO.github.io/booking-lab-web/`.

### Dominio propio (opcional)

En **Settings → Pages → Custom domain** escribe tu dominio (por ejemplo `www.booking-lab.com`) y, en tu proveedor de dominio, crea un registro `CNAME` de `www` apuntando a `TU-USUARIO.github.io`. Marca después **Enforce HTTPS**.

## Formulario «Analiza tu operativa»

El formulario envía las respuestas a tu email mediante [FormSubmit](https://formsubmit.co), gratis y sin servidor.

**Importante, solo la primera vez:** cuando la web ya esté publicada, rellena el formulario tú mismo. FormSubmit te enviará un email de activación: pulsa el enlace. A partir de ahí recibirás todas las solicitudes.

El email de destino está en `assets/main.js`, en la línea `const EMAIL=...`.

## Antes de publicar

- Revisa la cifra «casi 200 distribuidoras» de la sección de datos en `index.html`.

## Idiomas

- Español: `index.html` en la raíz. Inglés: `en/`. Catalán: `ca/`.
- El selector ES · EN · CA está arriba a la derecha en cada página.
- Si cambias un texto en español, cámbialo también en `en/index.html` y `ca/index.html`.

## Hosting y dominio

La web se sirve en Vercel. Dominio principal: `estibalab.com`. Los dominios `booking-lab.com`, `www.booking-lab.com` y `www.estibalab.com` deben estar añadidos al mismo proyecto de Vercel para que funcionen las redirecciones de `vercel.json`.
