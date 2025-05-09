'use client';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { fetchUserApplications } from '@/features/applications/applicationsSlice';

export default function UserApplicationsPage() {
  const dispatch = useAppDispatch();
  const { applications, status } = useAppSelector(
    (state) => state.applications
  );

  useEffect(() => {
    dispatch(fetchUserApplications());
  }, [dispatch]);

  if (status === 'loading') return <div>Loading...</div>;

  return (
    <div>
      {applications.map((app) => (
        <div key={app.id}>
          <h3>{app.job_title}</h3>
          <p>Status: {app.status}</p>
        </div>
      ))}
    </div>
  );
}