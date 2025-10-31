# Use a small base image
FROM python:3.12-alpine

# Copy app code
COPY server.py /app/server.py

# Expose HTTP port
EXPOSE 8080

# Run server
CMD ["python3", "/app/server.py"]
