# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Večné kvety od Tety** — prezentačný web pre ručne vyrábané umelé kytice.

- Živá stránka: https://kvetytety.sk
- GitHub Pages záloha: https://jurajhajkovsky-junitysk.github.io/TETE---vecna-kytica/
- Kontakt: terezia@junity.sk

## Nasadenie

Statický web hostovaný na GitHub Pages, napojený na vlastnú doménu `kvetytety.sk` cez DNS záznamy na Websupport. Každý push na vetvu `main` sa automaticky nasadí. Žiadny build krok — súbory sa servujú priamo.

## Štruktúra

```
index.html          — hlavná stránka (jediná verejná stránka)
css/
  light.css         — aktívny svetlý dizajn (ružovo-bielý)
  dark.css          — tmavý dizajn (pripravený, zatiaľ nepoužívaný)
  contact.css       — štýly kontaktného formulára
js/
  lightbox.js       — lightbox pre galériu
  petals.js         — animované kvetinové emoji na canvas pozadí
  contact.js        — odoslanie formulára cez Formspree
pics/
  logo.svg          — hlavné logo (používa sa v headeri)
  favicon.svg       — favicon
  logo-A/B/C/D.png  — varianty loga (archív návrhov)
  flowers/
    square/         — štvorcové náhľady kyticových PNG (zobrazujú sa v galérii)
    full/           — plnorozmerné verzie tých istých PNG (otvárajú sa v lightboxe)
    detail/         — JPEG detailné fotky (zatiaľ nepoužívané na webe)
logo-navrhy.html    — interná stránka s návrhmi loga (nie je v navigácii)
archive/            — staré verzie stránky (v1, v2), len pre referenciu
CNAME               — obsahuje "kvetytety.sk", potrebné pre GitHub Pages
```

## Sekcie index.html

1. **Header** — logo.svg ako klikateľný odkaz na #o-nas
2. **Nav** (sticky) — O nás, Kytice, Kvety, Prečo my?, Kontakt
3. **Hero** (#o-nas) — úvodný text + CTA tlačidlo
4. **Kytice** (#kytice) — galéria 6 kyticových PNG, lightbox cez `data-full` atribút
5. **Kvety** (#kvety) — sekcia "v príprave" (`.gallery-section--dev`)
6. **Prečo my?** (#preco-my) — 3 feature karty + slogan
7. **Kontakt** (#kontakt) — email odkaz + Formspree formulár
8. **Footer** — copyright
9. **Lightbox overlay** — mimo sekcie, riadený cez `js/lightbox.js`
10. **Canvas** (#petals-canvas) — animácia, riadená cez `js/petals.js`

## Galéria a lightbox

Každý obrázok v galérii má `src` (square thumbnail) a `data-full` (full verzia). Lightbox číta `data-full` pri otvorení. Pri pridávaní novej fotky treba oba atribúty.

```html
<div class="gallery-item">
  <img src="pics/flowers/square/kytica-nova.png"
       data-full="pics/flowers/full/kytica-nova.png"
       alt="Popis kytice"
       loading="lazy" />
</div>
```

## Kontaktný formulár

Formspree endpoint: `https://formspree.io/f/xqeggkop`

Formulár validuje polia (name, email, message) na strane klienta a odosieľa cez fetch. Obsahuje honeypot anti-spam pole (`.form-honeypot`). Pri zmene domény treba pridať novú doménu do allowlistu v Formspree účte.

## Dizajn — farby (light téma)

| Farba | Hex | Použitie |
|-------|-----|----------|
| Ružová | `#c0527a` | primárna (texty, bordery, CTA) |
| Svetlá ružová | `#e8a0bc` | sekundárna (bordery kariet, lightbox) |
| Tmavá ružová | `#8b2252` | hover stav |
| Pozadie | `#fdf6f8` | body |
| Text | `#4a2d3a` | primárny text |
| Tlmená | `#7a5060` | sekundárny text |
| Muted | `#a07890` | labely, poznámky |

## Čo je pripravené ale neaktívne

- `css/dark.css` — kompletný tmavý dizajn, stačí vymeniť `light.css` za `dark.css` v `index.html`
- Sekcia "Kvety" (#kvety) — má placeholder "v príprave", čaká na fotky jednotlivých kvetov
- `pics/flowers/detail/` — JPEG fotky (IMG_6127, IMG_6321, IMG_6325–6327) zatiaľ nie sú v galérii

## SEO

V `index.html` sú kompletné meta tagy: title, description, keywords, Open Graph, Twitter Card, JSON-LD (LocalBusiness). Kanonická URL je `https://kvetytety.sk/`. OG obrázok `pics/og-cover.jpg` zatiaľ neexistuje — treba vytvoriť.
