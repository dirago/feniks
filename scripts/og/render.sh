#!/bin/sh
# Renders the OpenGraph image, the Apple touch icon and the LinkedIn banners
# with a local Chrome.
# Usage: pnpm og   (CHROME=/path/to/chrome to override the binary)
set -e
cd "$(dirname "$0")"
CHROME=${CHROME:-"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"}

# render <page[?query]> <width,height> <output> [device scale factor]
render() {
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor="${4:-1}" \
    --allow-file-access-from-files --virtual-time-budget=2000 \
    --window-size="$2" --screenshot="$3" "file://$PWD/$1" >/dev/null 2>&1
  echo "✓ $3"
}

render og-image.html 1200,630 ../../public/og-image.png
render touch-icon.html 180,180 ../../public/apple-touch-icon.png

# LinkedIn banner: 1584 × 396, exported at 2× for sharp rendering on HiDPI screens.
mkdir -p ../../brand
render linkedin-banner.html 1584,396 ../../brand/linkedin-banner-light.png 2
render "linkedin-banner.html?dark" 1584,396 ../../brand/linkedin-banner-dark.png 2
