# Picute in Picture [![Chat](https://img.shields.io/badge/chat-on%20discord-7289da.svg)](https://deckbrew.xyz/discord)

Watch your favorite stream while you game!

![Screenshot of PiP mode](picture.jpg)

![Screenshot of Expand mode](expand.jpg)

## Installing

1. In Decky Loader, open Settings → Developer and enable Developer mode.
2. Under Developer → Install Plugin from URL, enter:
   `https://github.com/MattGibbard/decky-pip/raw/main/release/decky-pip.zip`
   (or download the ZIP and use Install Plugin from ZIP File).

## Building the ZIP

Run `./scripts/package.sh`. It builds the frontend and writes `release/decky-pip.zip`
in the folder layout Decky Loader expects. Pushing a `v*` tag also builds the ZIP in
GitHub Actions and attaches it to a GitHub release.
