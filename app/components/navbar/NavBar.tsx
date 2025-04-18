'use client';
import { Flex } from '@radix-ui/themes';
import LogoIcon from './Logoicon';
import NavLinks from './NavLinks';
import UserProfile from './UserProfile';
import MobileMenu from './MobileMenu';

const NavBar = () => {
  return (
    <Flex
      justify="between"
      className="w-full border-b border-gray-200 shadow-2xs px-6 h-14"
    >
      <Flex className="!hidden lg:!flex gap-6 items-center">
        <LogoIcon />
        <NavLinks />
      </Flex>

      <Flex className="lg:!hidden items-center">
        <MobileMenu />
      </Flex>

      <Flex className="items-center gap-6">
        <UserProfile />
      </Flex>
    </Flex>
  );
};

export default NavBar;
