# app/readiness.py
from llama_cpp import Llama
from typing import Dict
import os
import json

class JobReadiness:
    def __init__(self, model_path: str = "./nuextract-tiny-q8.gguf"):
        self.llm = Llama(
            model_path=model_path,
            n_ctx=2048,
            n_threads=8,
            n_gpu_layers=35,
            verbose=False
        )

    def create_prompt(self, resume: str, job: str) -> str:
        return f"""You are an expert career coach and resume evaluator.

Given the resume and job description, evaluate how well the resume matches the job.

Respond ONLY in JSON format as:
{{
  "match_score": 0-100 [How much %age of resume is perfect for job],
  "suggestions": ["short actionable suggestion 1", "suggestion 2", ...]
}}

Resume:
{resume}

Job Description:
{job}
"""

    def evaluate(self, resume_text: str, job_description: str) -> Dict:
        prompt = self.create_prompt(resume_text, job_description)
        output = self.llm(
            prompt,
            max_tokens=512,
            stop=["</s>", "```"],
            temperature=0.2,
            top_p=0.9
        )
        print("=== Output Text ===")
        print(output)
        print("\n")
        # raw_output = output['choices'][0]['text'].strip()

        # # Clean JSON block
        # if raw_output.startswith('```json'):
        #     raw_output = raw_output[7:].strip()
        # if raw_output.endswith('```'):
        #     raw_output = raw_output[:-3].strip()
        # elif raw_output.startswith('```'):
        #     raw_output = raw_output[3:].strip()

        try:
            return json.loads(output)
        except json.JSONDecodeError:
            return {
                "match_score": 0,
                "suggestions": ["Could not parse response. Try rephrasing resume or job."]
            }
