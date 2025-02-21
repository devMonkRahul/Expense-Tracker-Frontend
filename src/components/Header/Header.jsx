import React, { useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  Drawer,
  Card,
  MenuHandler,
  Avatar,
  MenuList,
  MenuItem,
  Menu,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../index";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/features/authSlice";
import { setIncomes } from "../../store/features/incomeSlice";
import { setExpenses } from "../../store/features/expenseSlice";
import { Power, Menu as MenuIcon, ChevronDown, CircleUserRound, Settings, CirclePower } from "lucide-react";
import { SidebarContent } from "../index";


function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.userData);

  const profileMenuItems = [
    // {
    //   label: "My Profile",
    //   icon: <CircleUserRound />,
    //   onClick: () => {
    //     console.log("My Profile");
    //     closeMenu();
    //   },
    // },
    {
      label: "Settings",
      icon: <Settings />,
      onClick: () => {
        closeMenu();
        navigate("/settings");
      },
    },
    {
      label: "Log Out",
      icon: <CirclePower size={20} color="#e44949" />,
      onClick: () => {
        closeMenu();
        dispatch(logout());
        dispatch(setIncomes({ incomes: [] }));
        dispatch(setExpenses({ expenses: [] }));
        sessionStorage.clear();
        navigate("/");
      },
    },
  ];

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src={userData ? userData.profileImage : "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"}
          />
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, onClick }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={onClick}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {icon}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export function StickyNavbar() {
  const token = sessionStorage.getItem("accessToken");
  const [openNav, setOpenNav] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(true);

  const { status } = useSelector((state) => state.auth);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () =>
        window.innerWidth >= 960 && setOpenNav(false) && setOpenSidebar(false)
    );
  }, []);

  return (
    <>
      <div className="w-full sticky top-0 z-10">
        <Navbar className="z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-3">
          <div className="flex items-center justify-between text-blue-gray-900">
            {token && openSidebar && (
              <IconButton
                variant="text"
                className="lg:hidden"
                onClick={() => setOpenDrawer(!openDrawer)}
              >
                <MenuIcon className="h-6 w-6" />
              </IconButton>
            )}
            <Typography
              className="mr-4 cursor-pointer font-bold text-lg"
            >
              Expense Tracker
            </Typography>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-x-5">
                {!status ? (
                  <>
                    <Modal type="login" />
                    <Modal type="signup" />
                  </>
                ) : (
                  <>
                    <ProfileMenu />
                  </>
                )}
              </div>
              {!status && (
                <IconButton
                  variant="text"
                  className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                  ripple={false}
                  onClick={() => setOpenNav(!openNav)}
                >
                  {openNav ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <Power strokeWidth={3} />
                  )}
                </IconButton>
              )}
            </div>
          </div>
          <Collapse open={openNav}>
            <div className="flex items-center justify-end gap-x-1">
              {!status ? (
                <>
                  <Modal
                    type={"login"}
                    buttonClass="inline-block"
                    isFullWidthButton={true}
                  />
                  <Modal
                    type={"signup"}
                    buttonClass="inline-block"
                    isFullWidthButton={true}
                  />
                </>
              ) : null}
            </div>
          </Collapse>
        </Navbar>
      </div>
      {openSidebar && (
        <Drawer
          open={openDrawer}
          onClose={() => setOpenDrawer(!openDrawer)}
          className="px-4"
        >
          <Card
            className="h-full w-full max-w-[15rem] py-4 shadow-xl shadow-blue-gray-900/20"
            onClick={() => setOpenDrawer(!openDrawer)}
          >
            <SidebarContent />
          </Card>
        </Drawer>
      )}
    </>
  );
}
