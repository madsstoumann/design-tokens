# Design Tokens

## Types of tokens

---

### animations
- animation. Complete `@keyframe`-animation, could also reference other tokens (see below).

Individual Tokens
- animation-duration
- animation-name
- animation-timing-function (easings)

---

### aspects

---

### borders
- border. Complete border-declaration, could also reference other tokens (see below)

Inidvidual tokens:
- border-color (`colors`)
- border-style
- border-width (`sizes`)

---

### colors
Any valid color: named, hex, rgb, hsl, hwb, oklab.
Or: `currentColor`, `initial`, `inherit` etc.

---

### files
- url()

---

### gradients
- conic-gradient
- linear-gradient
- radial-gradient

---

### layouts

- flex
- grid
- align, justify, place
- grid-area, grid-template-columns etc.

---

### masks
- mask. Complete mask-declaration, could also reference other tokens (see below)

Individual tokens, `mask-image`:
- conic-gradient
- linear-gradient
- radial-gradient
- url() (`file`)

---

### other

---

### radii
- border-radius. Complete border-radius declaration, could also reference other tokens (see below)

Individual tokens:
- border-start-start-radius
- border-start-end-radius
- border-end-start-radius
- border-end-end-radius
---

### ratios

---

### shadows
- box-shadow
- drop-shadow
- text-shadow

---

### shapes
- clip-path

---

### sizes

---

### typography
- font-family
- font-size
- line-height