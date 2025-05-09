// Example usage in layout files
import AuthGuard from '@/components/AuthGuard';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthGuard role="user">{children}</AuthGuard>;
}