#!/usr/bin/env python3
"""Dev server for Cozy Island 3D.

Two things plain `python3 -m http.server` gets wrong for this game:

1. It lets the browser cache ES modules. A ?v= on the page URL does NOT bust
   a module's sibling imports, so you reload and still run yesterday's code.
   no-store fixes that for every file at once.
2. Serving from 3D/ puts the 2D game's assets/ outside the root, so the
   inventory sprites (../assets/sprites/*.png) 404. We serve the repo root
   and open /3D/ instead.
"""
import http.server
import os
import socketserver
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8766
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        super().end_headers()

    def log_message(self, fmt, *args):
        if '404' in (fmt % args):   # keep missing assets visible, drop the rest
            super().log_message(fmt, *args)


class Server(socketserver.TCPServer):
    allow_reuse_address = True


if __name__ == '__main__':
    os.chdir(ROOT)
    with Server(('', PORT), NoCacheHandler) as httpd:
        print(f'Cozy Island 3D  →  http://localhost:{PORT}/3D/')
        print('Ctrl-C to stop.')
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print('\nbye 🏝️')
