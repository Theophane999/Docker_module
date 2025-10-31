from http.server import BaseHTTPRequestHandler, HTTPServer
class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type","text/plain; charset=utf-8")
        self.end_headers()
        self.wfile.write(b"Hello from demo_traefik/server.py!\n")
if __name__ == "__main__":
    HTTPServer(("0.0.0.0",8080), Handler).serve_forever()
