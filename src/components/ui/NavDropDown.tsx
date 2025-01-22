"use client";

import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { usePathname, useRouter } from "next/navigation";

import { protectedRoute } from "@/src/contants/contants";
import { useUser } from "@/src/context/user.provider";
import { logoutUser } from "@/src/services/AuthService";

const NavDropDown = () => {
  const router = useRouter();
  const { user, setIsLoading } = useUser();
  const pathname = usePathname();

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  const handelLogout = () => {
    logoutUser();
    setIsLoading(true);
    if (protectedRoute.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar className="cursor-pointer" src={user?.profilePhoto} />
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
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          onPress={handelLogout}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavDropDown;
