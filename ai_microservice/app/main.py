from fastapi import FastAPI
from pydantic import BaseModel
from .nuextract import NuExtract
from .readiness import JobReadiness
import os

app = FastAPI(
    title="NuExtract Resume Parser",
    description="Microservice for structured resume extraction using NuExtract LLM",
    version="1.0.0"
)

model_path = os.getenv("MODEL_PATH", "./tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf")
nuextract = NuExtract(model_path)
job_readiness = JobReadiness(model_path)

class ResumeRequest(BaseModel):
    text: str

class ReadinessRequest(BaseModel):
    resume: str
    job: str

@app.post("/extract")
async def extract_resume(request: ResumeRequest):
    try:
        result = nuextract.extract(request.text)
        return result
    except Exception as e:
        return {"error": f"Extraction failed: {str(e)}"}

@app.post("/readiness")
async def check_readiness(request: ReadinessRequest):
    try:
        result = job_readiness.evaluate(request.resume, request.job)
        return result
    except Exception as e:
        return {"error": f"Readiness scoring failed: {str(e)}"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "model": "nuextract-tiny-q8"}
