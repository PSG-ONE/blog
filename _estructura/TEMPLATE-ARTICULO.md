# Template de Artículo — Brecha

Guía completa para construir un artículo nuevo en el blog.
Seguir este orden exacto. No publicar sin aprobación del autor.

---

## 1. IMAGEN DE PORTADA

**Formato:** 1:1 (cuadrado)  
**Estilo:** Tipográfico — fondo negro, texto blanco grande, línea cyan, subtítulo  
**Watermark:** "P. Santa Gadea" (esquina inferior derecha)  
**Nombre del archivo:** kebab-case sin caracteres especiales  
- ✅ `el-liderazgo-que-nadie-ensena.png`  
- ❌ `liderazgo_enseña.png` / `Liderazgo Enseña.png`  

**Dónde guardar:** `/image/nombre-del-articulo.png`  
**Cómo se crea:** Pablo la genera en ChatGPT o Gemini, nunca por API  

---

## 2. ESTRUCTURA HTML DEL ARTÍCULO

Ruta: `/posts/nombre-del-articulo.html`  
Referencia CSS: `../assets/css/style.css`  
Referencia JS: `../assets/js/main.js`  

### Orden de elementos dentro de `<article class="post-body">`:

```
1.  Apertura (2-3 párrafos cortos que clavan la premisa)
2.  H2 + desarrollo
3.  Blockquote (comillas grandes)
4.  H2 + desarrollo
5.  Infográfico SVG inline (.post-infographic)
6.  H2 + desarrollo con preguntas en <strong>¿...?</strong>
7.  Blockquote
8.  H2 + desarrollo
9.  Bloque de datos (.post-data) — 3 stats
10. Sección de Herramientas (.post-tools)
11. Share bar (.post-share)
12. <hr/>
13. Párrafo de cierre (2-3 párrafos)
14. <p class="post-signature">Pablo Santa Gadea</p>
```

---

## 3. BLOQUE DE DATOS — 3 ESTILOS DISPONIBLES

> Usar un estilo diferente en cada artículo. Nunca repetir el mismo consecutivamente.

---

### ESTILO 1 — Números grandes (cards) `post-data`
*Mejor para: stats con impacto visual fuerte, % o cifras llamativas*

```html
<div class="post-data">
  <span class="post-data__label">Los datos</span>
  <div class="post-data__grid">
    <div class="post-data__item">
      <div class="post-data__number">83<span>%</span></div>
      <div class="post-data__desc">descripción corta del dato (max 12 palabras)</div>
    </div>
    <div class="post-data__item">
      <div class="post-data__number">67<span>%</span></div>
      <div class="post-data__desc">descripción corta del dato</div>
    </div>
    <div class="post-data__item">
      <div class="post-data__number">1 de 3</div>
      <div class="post-data__desc">descripción corta del dato</div>
    </div>
  </div>
  <p class="post-data__source">Fuentes: <a href="URL" target="_blank" rel="noopener">Nombre</a></p>
</div>
```

---

### ESTILO 2 — Barras horizontales `post-data post-data--bars`
*Mejor para: comparaciones, rankings, distribuciones porcentuales*

```html
<div class="post-data post-data--bars">
  <span class="post-data__label">Los datos</span>
  <div class="post-data__grid">
    <div class="post-data__bar-item">
      <div class="post-data__bar-header">
        <span class="post-data__bar-label">Etiqueta del dato</span>
        <span class="post-data__bar-value">68%</span>
      </div>
      <div class="post-data__bar-track">
        <div class="post-data__bar-fill" style="width: 68%"></div>
      </div>
      <span class="post-data__bar-desc">Descripción corta de lo que significa</span>
    </div>
    <!-- repetir x3 -->
  </div>
  <p class="post-data__source">Fuentes: <a href="URL" target="_blank" rel="noopener">Nombre</a></p>
</div>
```

---

### ESTILO 3 — Círculos / Gauges `post-data post-data--circles`
*Mejor para: porcentajes que muestran progreso, logro o déficit*

```html
<div class="post-data post-data--circles">
  <span class="post-data__label">Los datos</span>
  <div class="post-data__grid">
    <!-- Círculo: circumferencia del círculo r=34 → 2πr ≈ 213.6 -->
    <!-- stroke-dasharray="213.6" stroke-dashoffset="213.6 * (1 - valor/100)" -->
    <div class="post-data__circle-item">
      <svg class="post-data__circle-svg" viewBox="0 0 90 90">
        <circle class="post-data__circle-track" cx="45" cy="45" r="34"/>
        <circle class="post-data__circle-fill" cx="45" cy="45" r="34"
          stroke-dasharray="213.6"
          stroke-dashoffset="66"/><!-- dashoffset = 213.6 * (1 - 0.69) para 69% -->
        <text class="post-data__circle-text" x="45" y="45">69%</text>
      </svg>
      <span class="post-data__circle-label">Descripción del dato</span>
    </div>
    <!-- repetir x3 -->
  </div>
  <p class="post-data__source">Fuentes: <a href="URL" target="_blank" rel="noopener">Nombre</a></p>
</div>
```

**Fórmula dashoffset:** `213.6 × (1 - porcentaje/100)`  
Ejemplos: 25% → 160.2 | 50% → 106.8 | 75% → 53.4 | 89% → 23.5

---

### Qué estilo usar en cada artículo

| Artículo | Estilo recomendado |
|---|---|
| El mito del trabajo moderno | Estilo 1 (números grandes) ✅ ya aplicado |
| El precio del silencio | Estilo 2 (barras) — pendiente |
| Metanoia y el sistema | Estilo 3 (círculos) — pendiente |
| El liderazgo que nadie enseña | Estilo 1 (números grandes) ✅ ya aplicado |

---

```html
<div class="post-data">
  <span class="post-data__label">Los datos</span>
  <div class="post-data__grid">
    <div class="post-data__item">
      <div class="post-data__number">83<span>%</span></div>
      <div class="post-data__desc">descripción del dato</div>
    </div>
    <!-- repetir x3 -->
  </div>
  <p class="post-data__source">Fuentes: 
    <a href="URL" target="_blank" rel="noopener">Nombre fuente</a> · 
    <a href="URL" target="_blank" rel="noopener">Nombre fuente</a>
  </p>
</div>
```

**Reglas:**
- Siempre 3 stats
- Número grande + descripción corta (max 12 palabras)
- Fuentes reales con link verificable

---

## 4. SECCIÓN HERRAMIENTAS DEL TEMA

```html
<div class="post-tools">
  <span class="post-tools__label">Herramientas del tema</span>
  
  <div class="post-tools__group">
    <p class="post-tools__group-title">Metodologías</p>
    <ul class="post-tools__list">
      <li class="post-tools__item">
        <strong>Nombre metodología</strong> — descripción de para qué sirve y cómo aplicarla.
      </li>
    </ul>
  </div>

  <div class="post-tools__group">
    <p class="post-tools__group-title">Herramientas digitales</p>
    <div class="post-tools__grid">
      <div class="post-tools__tool">
        <span class="post-tools__tool-name">Notion</span>
        <span class="post-tools__tool-use">Para qué se usa</span>
      </div>
    </div>
  </div>
</div>
```

---

## 5. GRÁFICOS SVG INLINE

Los SVGs van dentro de `.post-infographic`.  
**Colores permitidos:**
- Negro: `#0A0A0A`
- Cyan: `#00B4D8`
- Gris claro: `#D8D5CE`
- Fondo: `#F5F4F0`
- Texto secundario: `#525252`
- Texto muted: `#999`

**Tipos usados:**
- Comparativa (dos columnas: promesa vs realidad)
- Círculos concéntricos (zonas)
- Diagrama de flujo / ciclo (3 nodos con flechas)

**Fuente en SVG:** `font-family="'Inter',sans-serif"`  
**viewBox estándar:** `viewBox="0 0 560 290"` para horizontal, `viewBox="0 0 520 270"` para ciclos

---

## 6. BLOCKQUOTES

```html
<blockquote>Primera línea del pensamiento.<br/>Segunda línea que complementa o contrasta.</blockquote>
```

**Reglas:**
- Máximo 2 líneas
- Sin comillas — el estilo CSS ya las agrega
- Contienen la tensión central de la sección

---

## 7. SECCIÓN FILOSOFÍA

```html
<div class="post-philosophy">
  <span class="post-philosophy__label">Filosofía</span>
  <div class="post-philosophy__item">
    <p class="post-philosophy__quote">"Cita textual del autor."</p>
    <p class="post-philosophy__author">Nombre Autor, <em>Título del libro</em> (año)</p>
  </div>
  <!-- 3 items total -->
</div>
```

**Reglas:**
- Siempre 3 citas
- Autores reales con obra real
- Separar autor y obra con coma (no con —)
- La cita debe conectar directamente con el tema del artículo

---

## 8. SECCIÓN FUENTES

```html
<div class="post-sources">
  <span class="post-sources__label">Fuentes</span>
  <ul class="post-sources__list">
    <li class="post-sources__item">
      <span class="post-sources__num">01</span>
      <span>Apellido, Nombre. <a href="URL" target="_blank" rel="noopener"><em>Título.</em></a> Editorial, año. Una línea explicando por qué es relevante.</span>
    </li>
    <!-- 4 items total -->
  </ul>
</div>
```

**Reglas:**
- Siempre 4 fuentes
- Links reales a la editorial o tienda oficial
- Una línea de contexto explicando el aporte de esa fuente al artículo

---

## 9. SHARE BAR

```html
<div class="post-share">
  <span class="post-share__label">Compartir</span>
  <div class="post-share__buttons">
    <button class="share-btn" onclick="shareThreads()">
      <!-- SVG Threads -->
      Threads
    </button>
    <button class="share-btn" onclick="shareInstagram()">
      <!-- SVG Instagram -->
      Instagram
    </button>
    <button class="share-btn" onclick="copyLink()">
      <!-- SVG Link -->
      Copiar link
    </button>
  </div>
</div>
```

Los SVGs de los botones están en cualquier artículo existente — copiar de ahí.

---

## 10. NAVEGACIÓN ENTRE ARTÍCULOS

```html
<nav class="post-nav" aria-label="Navegación entre artículos">
  <a class="post-nav__item" href="articulo-anterior.html">
    <p class="post-nav__label">← Anterior</p>
    <p class="post-nav__title">Título del artículo anterior</p>
  </a>
  <a class="post-nav__item post-nav__item--next" href="articulo-siguiente.html">
    <p class="post-nav__label">Siguiente →</p>
    <p class="post-nav__title">Título del artículo siguiente</p>
  </a>
</nav>
```

---

## 11. CHECKLIST ANTES DE PUBLICAR

- [ ] Imagen de portada en `/image/` con nombre correcto
- [ ] Todos los links de fuentes verificados (no dan 404)
- [ ] SVG gráfico funciona y usa los colores del sistema
- [ ] 3 stats con fuente real
- [ ] Sección herramientas completa (metodologías + digitales)
- [ ] 3 citas filosóficas con autor y obra real
- [ ] 4 fuentes con links reales
- [ ] Share bar con los 3 botones
- [ ] Navegación prev/next apunta a artículos reales
- [ ] Mostrar al autor para aprobación ANTES de git push
- [ ] Card en index.html apunta al archivo correcto

---

## 12. TEMAS PENDIENTES Y FUTUROS

### Publicados ✅
1. `el-mito-del-trabajo-moderno.html` — Cultura / Fake Place To Work
2. `el-precio-del-silencio.html` — Silencio organizacional
3. `metanoia-y-el-sistema.html` — Transformación real vs. simulacro

### En construcción 🔲
4. `el-liderazgo-que-nadie-ensena.html` — Liderazgo real vs. manual

### Ideas futuras 💡
- La reunión que no sirve para nada
- El feedback que nunca llega
- Contratar a la persona equivocada
- El líder que escala mal
- La trampa del líder técnico
- Propósito vs. narrativa de propósito
- El agotamiento que nadie nombra
- Autonomía vs. control
