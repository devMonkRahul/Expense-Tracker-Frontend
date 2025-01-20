import React, { useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  Drawer,
  Card,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../index";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/features/authSlice";
import { Power, Menu } from "lucide-react";
import { SidebarContent } from "../index";
 
export function StickyNavbar() {
  const [openNav, setOpenNav] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(true);
 
  const navigate = useNavigate();

  const { status } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.clear();
    navigate("/");
  }

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false) && setOpenSidebar(false),
    );
  }, []);
 
  return (
    <>
    <div className="max-h-[768px] w-full sticky top-0 z-10">
      <Navbar className="z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-3">
        <div className="flex items-center justify-between text-blue-gray-900">
          { openSidebar && <IconButton 
            variant="text" 
            className="lg:hidden" 
            onClick={() => setOpenDrawer(!openDrawer)}
          >
            <Menu className="h-6 w-6" />
          </IconButton> }
          <Typography
            className="mr-4 cursor-pointer font-bold text-lg"
            onClick={() => navigate("/")}
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
                  <Button className="hidden lg:inline-block" onClick={handleLogout}>Log out</Button>
                )
              }
            </div>
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
          </div>
        </div>
        <Collapse open={openNav}>
          <div className="flex items-center justify-end gap-x-1">
            {!status ? (<>
              <Modal type={"login"} buttonClass="inline-block" isFullWidthButton={true} />
              <Modal type={"signup"} buttonClass="inline-block" isFullWidthButton={true}/>
            </>) : (<Button onClick={handleLogout}>Log out</Button>)}
          </div>
        </Collapse>
      </Navbar>
    </div>
    {openSidebar && <Drawer
      open={openDrawer} 
      onClose={() => setOpenDrawer(!openDrawer)}
      className="px-4"
    >
      <Card className="h-full w-full max-w-[15rem] py-4 shadow-xl shadow-blue-gray-900/20" onClick={() => setOpenDrawer(!openDrawer)}>
        <SidebarContent />
      </Card>
    </Drawer>}
    </>
  );
}