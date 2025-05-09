'use client';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { useParams } from 'next/navigation';
import { fetchJobMatches } from '@/features/jobs/jobsSlice';

export default function JobMatchesPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { currentJobMatches, status } = useAppSelector(
    (state) => state.jobs
  );

  useEffect(() => {
    dispatch(fetchJobMatches(id.toString()));
  }, [dispatch, id]);

  if (status === 'loading') return <div>Loading...</div>;

  return (
    <div>
      {currentJobMatches.map((match) => (
        <div key={match.id}>
          <h3>{match.applicant_name}</h3>
          <p>Match Score: {match.match_score}%</p>
        </div>
      ))}
    </div>
  );
}