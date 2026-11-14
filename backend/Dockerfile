
# Python base image
FROM python:3.11-slim

# Python environment settings
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Working directory
WORKDIR /app

# Copy locked dependencies
COPY requirements.lock .

# Install exact dependency versions using binary packages
RUN pip install --no-cache-dir --only-binary=:all: -r requirements.lock

# Create a non-root application user
RUN addgroup --system appgroup && \
    adduser --system --ingroup appgroup --home /app appuser

# Copy application code with correct ownership
COPY --chown=appuser:appgroup app/ ./app/

# Run application as non-root user
USER appuser

# Backend port
EXPOSE 8000

# Start FastAPI
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

