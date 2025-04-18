'use client';
import { Avatar, Box, DropdownMenu } from '@radix-ui/themes';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const UserProfile = () => {
  const { data: session, status } = useSession();
  const currentPath = usePathname();

  if (status === 'unauthenticated' && currentPath !== '/auth')
    return (
      <Box className="space-x-2">
        <Link className="text-gray-600" href="/auth?formType=signup">
          Create account
        </Link>
        <Link className="text-gray-600" href="/auth?formType=signin">
          Signin
        </Link>
      </Box>
    );

  if (status === 'authenticated')
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="cursor-pointer">
          <Avatar
            size="2"
            referrerPolicy="no-referrer"
            src={session?.user?.image || ''}
            radius="full"
            fallback="A"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content variant="soft">
          <DropdownMenu.Label>{session.user?.email}</DropdownMenu.Label>
          <DropdownMenu.Item
            className="!cursor-pointer"
            onSelect={() => signOut({ callbackUrl: `${currentPath}` })}
            color="red"
          >
            Signout
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    );

  return null;
};

export default UserProfile;
