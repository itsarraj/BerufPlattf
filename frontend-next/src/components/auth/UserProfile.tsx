'use client';
import { useAppSelector } from '@/lib/hooks/redux';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { FiUser } from 'react-icons/fi';
import { LogoutButton } from './LogoutButton';

export const UserProfile = () => {
  const user = useAppSelector(state => state.auth.user);

  if (!user) return null;

  const getInitials = () => {
    if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return <FiUser />;
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-charcoal-gray rounded-xl">
      <Avatar>
        <AvatarImage src={user.avatar || ''} alt={user.email} />
        <AvatarFallback className="bg-gold-sun text-charcoal-gray">
          {getInitials()}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <p className="font-medium truncate">{user.email}</p>
        <p className="text-xs text-light-gray">Free Account</p>
      </div>

      <LogoutButton />
    </div>
  );
};