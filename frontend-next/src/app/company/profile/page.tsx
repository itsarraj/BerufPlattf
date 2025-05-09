'use client';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { fetchCompanyProfile } from '@/features/company/companySlice';

export default function CompanyProfilePage() {
  const dispatch = useAppDispatch();
  const { company, status } = useAppSelector((state) => state.company);

  useEffect(() => {
    dispatch(fetchCompanyProfile());
  }, [dispatch]);

  if (status === 'loading') return <div>Loading...</div>;

  return (
    <div>
      {/* Company details */}
      <h1>{company?.name}</h1>
      <p>{company?.description}</p>
    </div>
  );
}