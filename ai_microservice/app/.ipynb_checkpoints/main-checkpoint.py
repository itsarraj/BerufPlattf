from fastapi import FastAPI, File, UploadFile, HTTPException
from pydantic import BaseModel
from typing import List, Dict
import numpy as np
from sentence_transformers import SentenceTransformer
from .model import Embedder
from .resume_parser import parse
import sys

print(f"Python executable: {sys.executable}")
print(f"Python path: {sys.path}")

app = FastAPI(
    title="AI Job Matching Service",
    description="Microservice for resume parsing and job matching",
    version="1.0.0"
)

# Initialize models
embedder = Embedder()
matcher_model = SentenceTransformer('all-MiniLM-L6-v2')

class MatchRequest(BaseModel):
    job_description: str
    resume_texts: List[str]
    top_n: int = 5

class JobVectorRequest(BaseModel):
    job_description: str

@app.post("/parse-resume")
async def parse_resume(file: UploadFile = File(...)):
    """Parse uploaded resume file"""
    try:
        contents = await file.read()
        return parse(contents, file.filename)
    except Exception as e:
        raise HTTPException(500, f"Resume parsing failed: {str(e)}")

@app.post("/match")
async def match_job_resumes(request: MatchRequest):
    """Match job description with multiple resumes"""
    try:
        # Generate embeddings
        job_vector = matcher_model.encode([request.job_description])[0]
        resume_vectors = matcher_model.encode(request.resume_texts)

        # Calculate cosine similarities
        scores = []
        for i, vec in enumerate(resume_vectors):
            sim = np.dot(job_vector, vec) / (np.linalg.norm(job_vector) * np.linalg.norm(vec))
            scores.append({
                'index': i,
                'score': float(sim),
                'percent': round(float(sim) * 100, 1)
            })

        # Sort and get top matches
        sorted_scores = sorted(scores, key=lambda x: x['score'], reverse=True)
        return {'matches': sorted_scores[:request.top_n]}
    except Exception as e:
        raise HTTPException(500, f"Matching failed: {str(e)}")

@app.post("/embed-job")
async def embed_job(request: JobVectorRequest):
    """Generate embedding vector for a job description"""
    try:
        vector = embedder.embed([request.job_description])[0]
        return {'vector': vector}
    except Exception as e:
        raise HTTPException(500, f"Embedding failed: {str(e)}")

@app.post("/embed-resume")
async def embed_resume(text: str):
    """Generate embedding vector for resume text"""
    try:
        vector = embedder.embed([text])[0]
        return {'vector': vector}
    except Exception as e:
        raise HTTPException(500, f"Embedding failed: {str(e)}")