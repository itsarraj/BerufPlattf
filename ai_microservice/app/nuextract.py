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
            max_tokens=512,
            stop=["</s>", "```"],
            temperature=0.0,
            top_p=0.1
        )
        print("=== Output Text ===")
        print(output)
        print("\n")

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