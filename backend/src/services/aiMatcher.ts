// import axios from 'axios';

// const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8001';

// export async function parseResume(filePath: string): Promise<any> {
//     try {
//         const formData = new FormData();
//         formData.append('file', fs.createReadStream(filePath));

//         const response = await axios.post(
//             `${AI_SERVICE_URL}/parse-resume`,
//             formData,
//             {
//                 headers: {'Content-Type': 'multipart/form-data'}
//             }
//         );

//         return response.data;
//     } catch (error) {
//         console.error('Resume parsing error:', error);
//         throw error;
//     }
// }

// export async function matchJobResumes(jobDescription: string, resumeTexts: string[]): Promise<number[]> {
//     try {
//         const response = await axios.post(`${AI_SERVICE_URL}/match`, {
//             job_description: jobDescription,
//             resume_texts: resumeTexts
//         });

//         return response.data.scores;
//     } catch (error) {
//         console.error('Matching error:', error);
//         throw error;
//     }
// }