'use client';
import { Box, Flex } from '@radix-ui/themes';
import LogoIcon from './Logoicon';
import NavLinks from './NavLinks';
import UserProfile from './UserProfile';
import MobileMenu from './MobileMenu';

const NavBar = () => {
  return (
    <Box style={{marginLeft:'12px', marginRight:"12px", marginTop:'10px'}}>
    <Flex
      justify="between"
      className="w-full border rounded-full border-gray-200 shadow-2xs px-6 h-14"
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
    </Box>
  );
};

export default NavBar;
