'use client';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { useParams } from 'next/navigation';
import { fetchApplicationDetails } from '@/features/applications/applicationsSlice';

export default function ApplicationDetailsPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { currentApplication, status } = useAppSelector(
    (state) => state.applications
  );

  useEffect(() => {
    dispatch(fetchApplicationDetails(id.toString()));
  }, [dispatch, id]);

  if (status === 'loading') return <div>Loading...</div>;
  if (!currentApplication) return <div>Application not found</div>;

  return (
    <div>
      {/* Application details */}
      <p>Status: {currentApplication.status}</p>
      <p>Match Score: {currentApplication.match_score}%</p>
    </div>
  );
}