"use client";

import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useRouter } from "next/navigation";

const NavDropDown = () => {
  const router = useRouter();

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar className="cursor-pointer" name="Joe" />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          key="profile"
          onPress={() => handleNavigation("/profile")}
        >
          Profile
        </DropdownItem>
        <DropdownItem
          key="createPost"
          onPress={() => handleNavigation("/profile/create-post")}
        >
          Create Post
        </DropdownItem>
        <DropdownItem
          key="claimRequest"
          onPress={() => handleNavigation("/profile/claim-requests")}
        >
          Claim Requests
        </DropdownItem>
        <DropdownItem
          key="settings"
          onPress={() => handleNavigation("/profile/settings")}
        >
          Settings
        </DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavDropDown;
