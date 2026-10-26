# Flower sprite atlas

Header logo: `dist/assets/logo.png`, supplied by the user on 2026-10-26. Original image copied unchanged and displayed at a small size with CSS.

Created with the built-in ImageGen tool. File: `dist/assets/flowers.png`. Dimensions: 1254 × 1254 pixels, RGBA with genuine transparency preserved. This is one 3 × 3 photographic sprite atlas. The selected output is a revision with generous transparent gutters. The discarded first version remains only in ImageGen storage.

Rows, left to right:

- Orange-red poppy, blue cornflower, blush pink dahlia.
- White cosmos, violet bearded iris, burgundy ranunculus.
- Golden yellow daisy, peach rose, lilac scabiosa.

## Generation prompt

Use case: product-mockup.
Asset type: a single production-ready flower sprite atlas for an elegant minimal website.
Create a square image with a precise 3 by 3 equal-cell grid, nine separate photorealistic flower blossom cutouts, one centered in each cell. The background must be genuinely transparent, including all padding and gaps. Each flower blossom occupies 65 to 72 percent of its cell width and fits entirely within its cell. Keep consistent generous empty transparent margins. There must be no grid lines.
Top row, left to right: orange-red poppy with a dark center; vivid blue cornflower; blush pink dahlia.
Middle row, left to right: white cosmos with a yellow center; violet bearded iris; deep burgundy ranunculus.
Bottom row, left to right: golden yellow daisy; peach rose; lilac scabiosa.
Fresh natural blossoms viewed face-on or slightly tilted. Sophisticated botanical editorial still-life photography, delicate realistic translucent petals and natural imperfect shapes, subtle three-dimensional shading on the petals. No stems or leaves, no background or ground shadows, no vases, no text, no numbers, no labels, no watermark. This is a single aligned sprite sheet, not a scene or bouquet.
CRITICAL TECHNICAL CONSTRAINT: Make the nine flower heads significantly smaller than a typical contact sheet. Each flower must occupy ONLY 50 percent of its square grid cell, with a full 25 percent of the cell width of completely empty transparent padding on each side. The transparent gutters between adjacent flowers must be extremely wide. Exactly 3 rows and 3 columns. All flower silhouettes fully contained and no petals anywhere near the crop boundary. Each flower sprite is centered within its own cell. Maintain the exact flower ordering above.

## CSS usage

Use `background-size: 300% 300%`. Columns correspond to background-position x values `0%`, `50%`, `100%`; rows correspond to y values `0%`, `50%`, `100%`. Each cell is 418 px square; visible flower heads occupy approximately 65% of cell width, so a 150 px square sprite displays a roughly 98 px flower head.

