'use client';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/redux';
import { logout } from '@/lib/slices/authSlice';
import { authApi } from '@/lib/api/authApi';
import { Button } from '@/components/ui/Button';
import { FiLogOut } from 'react-icons/fi';

export const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const refreshToken = useAppSelector(state => state.auth.refreshToken);

  const handleLogout = async () => {
    if (refreshToken) {
      await authApi.logout(refreshToken);
    }
    dispatch(logout());
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={handleLogout}
      iconLeft={<FiLogOut />}
    >
      Sign Out
    </Button>
  );
};