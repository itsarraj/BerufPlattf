'use client';
import { useAppDispatch } from '@/lib/store';
import { useForm } from 'react-hook-form';
import { parseResume } from '@/features/user/userSlice';

export default function ResumeUploadPage() {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: { resume: FileList }) => {
    const file = data.resume[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        dispatch(parseResume(text));
      };
      reader.readAsText(file);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        {...register('resume')}
      />
      <button type="submit">Upload Resume</button>
    </form>
  );
}