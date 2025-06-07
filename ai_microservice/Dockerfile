FROM python:3.11-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy model file
COPY nuextract-tiny-q8.gguf .

# Copy application files
COPY app ./app
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port
EXPOSE 8001

# Start the server
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8001"]