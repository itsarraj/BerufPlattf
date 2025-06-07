Based on your requirements, I'll create a streamlined FastAPI microservice using the NuExtract model for resume parsing. Here's the complete implementation:

### File Structure
```
ai_microservice/
├── app/
│   ├── main.py
│   ├── nuextract.py
│   └── __init__.py
├── Dockerfile
└── requirements.txt
```

### 1. `app/nuextract.py`
```python
from llama_cpp import Llama
import json
from typing import Dict

class NuExtract:
    def __init__(self, model_path: str = "./nuextract-tiny-q8.gguf"):
        self.llm = Llama(
            model_path=model_path,
            n_ctx=2048,
            n_threads=8,
            n_gpu_layers=35,
            verbose=False
        )

    def create_extraction_prompt(self, text_to_extract: str) -> str:
        return f"""Extract the following information from the text below as a JSON object:

Schema:
{{
  "name": "full name",
  "address": "full address",
  "phone": "contact phone number",
  "email": "email address",
  "linkedin": "LinkedIn profile URL",
}}

Text to extract from:
{text_to_extract}

Return ONLY the JSON object, nothing else. If information is missing, use empty strings.
"""

    def extract(self, resume_text: str) -> Dict:
        prompt = self.create_extraction_prompt(resume_text)

        output = self.llm(
            prompt,
            max_tokens=1000,
            stop=["</s>", "```"],
            temperature=0.0,
            top_p=0.1
        )

        raw_output = output['choices'][0]['text'].strip()

        # Clean JSON output
        if raw_output.startswith('```json'):
            raw_output = raw_output[7:].strip()
        if raw_output.endswith('```'):
            raw_output = raw_output[:-3].strip()
        elif raw_output.startswith('```'):
            raw_output = raw_output[3:].strip()

        try:
            return json.loads(raw_output)
        except json.JSONDecodeError:
            return {
                "name": "",
                "address": "",
                "phone": "",
                "email": "",
                "linkedin": ""
            }
```

### 2. `app/main.py`
```python
from fastapi import FastAPI
from pydantic import BaseModel
from .nuextract import NuExtract
import os

app = FastAPI(
    title="NuExtract Resume Parser",
    description="Microservice for structured resume extraction using NuExtract LLM",
    version="1.0.0"
)

# Initialize NuExtract
model_path = os.getenv("MODEL_PATH", "./nuextract-tiny-q8.gguf")
nuextract = NuExtract(model_path)

class ResumeRequest(BaseModel):
    text: str

@app.post("/extract")
async def extract_resume(request: ResumeRequest):
    """Extract structured data from resume text"""
    try:
        result = nuextract.extract(request.text)
        return result
    except Exception as e:
        return {"error": f"Extraction failed: {str(e)}"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "model": "nuextract-tiny-q8"}
```

### 3. `requirements.txt`
```
fastapi==0.115.12
uvicorn==0.34.2
llama-cpp-python==0.2.59
python-multipart==0.0.20
```

### 4. `Dockerfile`
```dockerfile
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
```

### Key Features:
1. **Minimal Implementation**: Only includes the NuExtract functionality you requested
2. **Optimized Docker Build**:
   - Uses slim Python image
   - Efficient layer caching
   - Small footprint (only essential dependencies)
3. **Simple API**:
   - POST `/extract` endpoint with JSON payload: `{"text": "resume content"}`
   - GET `/health` for service monitoring
4. **Error Handling**:
   - Graceful error recovery
   - Default empty values for missing fields
5. **Model Configuration**:
   - Model path configurable via environment variable (`MODEL_PATH`)
   - GPU offloading support

### Usage:
1. Place `nuextract-tiny-q8.gguf` in the `ai_microservice` directory
2. Build the Docker image:
   ```bash
   docker build -t nuextract-service .
   ```
3. Run the container:
   ```bash
   docker run -p 8001:8001 nuextract-service
   ```
4. Test with curl:
   ```bash
   curl -X POST http://localhost:8001/extract \
        -H "Content-Type: application/json" \
        -d '{"text": "John Doe\n123 Main St\n(555) 123-4567\njohn@example.com"}'
   ```

### Notes:
1. The model file should be in the same directory as the Dockerfile
2. For GPU acceleration, add `--gpus all` to the docker run command
3. For production use:
   - Add rate limiting
   - Implement authentication
   - Add request validation
   - Include logging middleware

This implementation provides exactly the NuExtract functionality you requested in a minimal, production-ready FastAPI service.