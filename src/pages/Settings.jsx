"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Select,
  Option,
  Button,
  IconButton,
  Avatar,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, login } from "../store/features/authSlice";
import { useGet } from "../hooks/useHttp";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Moon, Sun } from "lucide-react";

export default function SettingsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getRequest } = useGet();
  const userData = useSelector((state) => state.auth.userData);

  const token = sessionStorage.getItem("accessToken");

  useEffect(() => {
    if (token) {
      const getUserProfile = async () => {
        try {
          const response = await getRequest("/api/v1/user/profile", token);
          if (response.success) {
            dispatch(login());
            dispatch(
              setUserData({
                userData: response.data,
                accessToken: token,
              })
            );
          }
        } catch (error) {
          console.error(error);
          navigate("/");
        }
      };
      getUserProfile();
    } else {
      navigate("/");
    }
  }, []);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if user previously selected dark mode
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("darkMode", (!darkMode).toString());
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8 transition-colors duration-200">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header with Dark Mode Toggle */}
        <div className="flex justify-between items-center">
          <div>
            <Typography variant="h4" color={darkMode ? "white" : "blue-gray"}>
              Settings
            </Typography>
            <Typography
              variant="small"
              color={darkMode ? "gray" : "blue-gray"}
              className="opacity-70"
            >
              Manage your account settings and preferences
            </Typography>
          </div>
          <IconButton
            variant="text"
            color={darkMode ? "white" : "gray"}
            onClick={toggleDarkMode}
            className="rounded-full"
          >
            {darkMode ? <Sun /> : <Moon />}
          </IconButton>
        </div>

        {/* Account Settings */}
        <Card className="bg-white dark:bg-gray-800">
          <CardBody className="space-y-6">
            <Typography variant="h5" color={darkMode ? "white" : "blue-gray"}>
              Account Settings
            </Typography>
            <div className="flex items-center gap-4">
              <Avatar
                variant="circular"
                size="lg"
                alt="User Avatar"
                src={userData?.profileImage}
                className={`border border-${
                  darkMode ? "white" : "gray"
                }-900 p-0.5`}
              />
              {/*TODO: Add a button to change avatar*/}
              {/* <Button variant="outlined" size="sm" color={darkMode ? "white" : "blue-gray"} className="rounded-full">
                Change Avatar
              </Button> */}
            </div>

            <div className="grid grid-cols-1 gap-6">
              <Input
                label="User Name"
                defaultValue={userData?.username}
                color={darkMode ? "white" : "gray"}
                className="!text-gray-900 dark:!text-white"
                labelProps={{
                  className: "!text-gray-900 dark:!text-white",
                }}
              />
              <Input
                label="Full Name"
                defaultValue={userData?.fullName}
                color={darkMode ? "white" : "gray"}
                className="!text-gray-900 dark:!text-white"
                labelProps={{
                  className: "!text-gray-900 dark:!text-white",
                }}
              />
              <Input
                label="Email Address"
                defaultValue={userData?.email}
                color={darkMode ? "white" : "gray"}
                className="!text-gray-900 dark:!text-white"
                labelProps={{
                  className: "!text-gray-900 dark:!text-white",
                }}
              />
            </div>
          </CardBody>
        </Card>

        {/* Currency */}
        <Card className="bg-white dark:bg-gray-800">
          <CardBody>
            <Typography
              variant="h5"
              color={darkMode ? "white" : "blue-gray"}
              className="mb-6"
            >
              Currency Type
            </Typography>
            <div>
              <Typography
                variant="h6"
                color={darkMode ? "white" : "blue-gray"}
                className="mb-2"
              >
                Default Currency
              </Typography>
              <Select
                label="Select Currency"
                defaultValue="usd"
                color={darkMode ? "white" : "gray"}
                className="!text-gray-900 dark:!text-white"
                labelProps={{
                  className: "!text-gray-900 dark:!text-white",
                }}
              >
                <Option value="inr">INR (₹)</Option>
                <Option value="usd">USD ($)</Option>
                <Option value="eur">EUR (€)</Option>
                <Option value="gbp">GBP (£)</Option>
                <Option value="jpy">JPY (¥)</Option>
              </Select>
            </div>
          </CardBody>
        </Card>

        {/* Security */}
        <Card className="bg-white dark:bg-gray-800">
          <CardBody className="space-y-6">
            <Typography variant="h5" color={darkMode ? "white" : "blue-gray"}>
              Security
            </Typography>
            <div className="flex items-center gap-4">
              <Button
                variant="outlined"
                size="sm"
                color={darkMode ? "white" : "blue-gray"}
                className="rounded-full"
              >
                Change Password
              </Button>
            </div>
            {/* TODO: Add Two-Factor Authentication */}
            {/* <div className="flex items-center justify-between">
              <div>
                <Typography variant="h6" color={darkMode ? "white" : "blue-gray"}>
                  Two-Factor Authentication
                </Typography>
                <Typography variant="small" color={darkMode ? "gray" : "blue-gray"} className="opacity-70">
                  Add an extra layer of security to your account
                </Typography>
              </div>
              <Switch color="blue" />
            </div> */}
          </CardBody>
        </Card>

        {/* Save Button */}
        <div className="flex justify-between">
          <Button
            size="lg"
            color={darkMode ? "white" : "black"}
            className="rounded-full flex items-center gap-2"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft size={20} />
            Back
          </Button>
          <Button size="lg" color="blue" className="rounded-full">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
