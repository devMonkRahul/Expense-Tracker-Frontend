import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import { Eye, EyeClosed } from "lucide-react";
import { usePatch } from "../../hooks/useHttp";
import { logout } from "../../store/features/authSlice";
import { setError } from "../../store/features/errorSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function DialogWithForm() {
  const token = sessionStorage.getItem("accessToken");
  const { patchRequest, isLoading } = usePatch();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [passwordMatched, setPasswordMatched] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const handleOpen = () => setOpen((cur) => !cur);

  useEffect(() => {
    setError("");
    setOldPassword("");
    setPassword("");
    setConfirmPassword("");
    setShowOldPassword(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setPasswordMatched(false);
  }, [open]);

  useEffect(() => {
    // Check if user previously selected dark mode
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwordMatched && confirmPassword !== "") {
      if (token) {
        try {
          const data = {
            currentPassword: oldPassword,
            newPassword: password,
          };
          patchRequest(
            "/api/v1/user/profile/changePassword",
            data,
            token
          );
        } catch (error) {
          console.error(error);
          dispatch(
            setError(
              error.message || "An Error Occurred while changing password"
            )
          );
        } finally {
            handleOpen();
        }
      } else {
        dispatch(logout());
        dispatch(setError("Session Expired. Please login again"));
        navigate("/");
      }
    } else {
      setError("Passwords do not match");
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        size="sm"
        color={darkMode ? "white" : "blue-gray"}
        className="rounded-full"
        onClick={handleOpen}
      >
        Change Password
      </Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Change Password
            </Typography>
            <Typography
              className="mb-3 font-sans"
              variant="paragraph"
              color="gray"
            >
              Enter your old Password and New Password to change Password.
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Old Password
            </Typography>
            <Input
              placeholder="Old Password"
              type={showOldPassword ? "text" : "password"}
              onChange={(e) => setOldPassword(e.target.value)}
              className="appearance-none placeholder:opacity-100 focus:!border-t-black !border-t-blue-gray-200 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              icon={
                showOldPassword ? (
                  <Eye size={20} onClick={() => setShowOldPassword(false)} />
                ) : (
                  <EyeClosed
                    size={20}
                    onClick={() => setShowOldPassword(true)}
                  />
                )
              }
              value={oldPassword}
            />
            <Typography className="-mb-2" variant="h6">
              New Password
            </Typography>
            <Input
              placeholder="New Password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none placeholder:opacity-100 focus:!border-t-black !border-t-blue-gray-200 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              icon={
                showPassword ? (
                  <Eye size={20} onClick={() => setShowPassword(false)} />
                ) : (
                  <EyeClosed size={20} onClick={() => setShowPassword(true)} />
                )
              }
              value={password}
            />
            <Typography className="-mb-2" variant="h6">
              Confirm Password
            </Typography>
            <Input
              placeholder="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              success={passwordMatched && confirmPassword !== ""}
              error={!passwordMatched && confirmPassword !== ""}
              className={`appearance-none placeholder:opacity-100 
                focus:!border-t-${
                  confirmPassword === ""
                    ? "black"
                    : passwordMatched
                    ? "green-500"
                    : "red-500"
                } 
              ${
                passwordMatched && confirmPassword !== ""
                  ? "border-t-green-500"
                  : "border-t-red-500"
              }
              [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setPasswordMatched(e.target.value === password);
              }}
              icon={
                showConfirmPassword ? (
                  <Eye
                    size={20}
                    onClick={() => setShowConfirmPassword(false)}
                  />
                ) : (
                  <EyeClosed
                    size={20}
                    onClick={() => setShowConfirmPassword(true)}
                  />
                )
              }
              value={confirmPassword}
            />
            {error !== "" && (
              <Typography variant="paragraph" className="text-red-500 text-sm">
                {error}
              </Typography>
            )}
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              onClick={(e) => handleChangePassword(e)}
              fullWidth
              disabled={isLoading}
            >
              Change Password
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
