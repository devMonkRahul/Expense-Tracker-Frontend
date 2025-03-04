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
import { setUserData, login, logout } from "../store/features/authSlice";
import { useGet, usePatch } from "../hooks/useHttp";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CircleAlert,
  CircleCheckBig,
  Moon,
  Sun,
} from "lucide-react";
import {
  currencyOptions,
  currencyValues,
  validateEmail,
} from "../utils/helper";
import { setError } from "../store/features/errorSlice";
import { UpdatePasswordModal } from "../components";

export default function SettingsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getRequest } = useGet();
  const { patchRequest, isLoading } = usePatch();
  const userData = useSelector((state) => state.auth.userData);
  const [darkMode, setDarkMode] = useState(false);
  const [currency, setCurrency] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [emailAvailable, setEmailAvailable] = useState(true);
  const [emailAvailableByRegex, setEmailAvailableByRegex] = useState(true);
  const [emailLoading, setEmailLoading] = useState(false);

  const token = sessionStorage.getItem("accessToken");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setEmailError("Please enter a valid email address");
      setEmailAvailableByRegex(false);
    } else {
      setEmailError("");
      setEmailAvailableByRegex(true);
    }
  };

  useEffect(() => {
    if (token) {
      if (email && emailAvailableByRegex) {
        const checkEmailAvailability = async () => {
          try {
            setEmailLoading(true);
            const response = await getRequest(
              `/api/v1/user/validate/email/${email}`,
              token
            );
            setEmailAvailable(response.data.available);
            if (!response.data.available) setEmailError(response.message);
          } catch (error) {
            console.error(error);
            dispatch(
              setError("An error occurred while checking email availability")
            );
          } finally {
            setEmailLoading(false);
          }
        };
        checkEmailAvailability();
      }
    } else {
      dispatch(logout());
      dispatch(setError("Session expired. Please login again"));
      navigate("/");
    }
  }, [email]);

  useEffect(() => {
    if (token) {
      if (username && username.length >= 3) {
        const checkUsernameAvailability = async () => {
          try {
            setUsernameLoading(true);
            const response = await getRequest(
              `/api/v1/user/validate/username/${username}`,
              token
            );
            setUsernameAvailable(response.data.available);
            if (!response.data.available) setUsernameError(response.message);
          } catch (error) {
            console.error(error);
            dispatch(
              setError("An error occurred while checking username availability")
            );
          } finally {
            setUsernameLoading(false);
          }
        };
        checkUsernameAvailability();
      } else {
        setUsernameAvailable(false);
        setUsernameError("Username should be at least 3 characters long");
      }
    } else {
      dispatch(logout());
      dispatch(setError("Session expired. Please login again"));
      navigate("/");
    }
  }, [username]);

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
      dispatch(logout());
      dispatch(setError("Session expired. Please login again"));
      navigate("/");
    }
  }, [token, dispatch, navigate]);

  useEffect(() => {
    if (userData) {
      setUsername(userData.username);
      setFullName(userData.fullName);
      setEmail(userData.email);
      setCurrency(userData.currency);
    }
  }, [userData]);

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

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    if (token) {
      if (
        usernameAvailable &&
        emailAvailable &&
        emailAvailableByRegex &&
        !usernameLoading &&
        !emailLoading
      ) {
        try {
          let data = {};
          if (currency !== userData?.currency) data.currency = currency;
          if (username !== userData?.username) data.username = username;
          if (fullName !== userData?.fullName) data.fullName = fullName;
          if (email !== userData?.email) data.email = email;

          if (Object.keys(data).length === 0) return;

          const response = await patchRequest(
            "/api/v1/user/profile/update",
            data,
            token
          );
          if (response.success) {
            dispatch(
              setUserData({
                userData: response.data,
                accessToken: token,
              })
            );
          }
        } catch (error) {
          console.error(error);
          dispatch(
            setError(
              error.message || "An error occurred while updating your profile"
            )
          );
        }
      } else {
        dispatch(
          setError("Please validate the details before saving your changes")
        );
      }
    } else {
      dispatch(logout());
      dispatch(setError("Session expired. Please login again"));
      navigate("/");
    }
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
              color={darkMode ? "white" : "blue-gray"}
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
                defaultValue={username}
                color={darkMode ? "white" : "gray"}
                className="!text-gray-900 dark:!text-white"
                labelProps={{
                  className: "!text-gray-900 dark:!text-white",
                }}
                onChange={(e) => setUsername(e.target.value)}
                icon={
                  usernameAvailable ? (
                    <CircleCheckBig size={20} color="green" />
                  ) : (
                    <CircleAlert size={20} color="red" />
                  )
                }
              />
              {!usernameAvailable && (
                <Typography variant="small" color="red" className="-my-4 ml-2">
                  {usernameError}
                </Typography>
              )}

              <Input
                label="Email Address"
                defaultValue={email}
                color={darkMode ? "white" : "gray"}
                className="!text-gray-900 dark:!text-white"
                labelProps={{
                  className: "!text-gray-900 dark:!text-white",
                }}
                onChange={(e) => handleEmailChange(e)}
                icon={
                  emailAvailableByRegex && emailAvailable ? (
                    <CircleCheckBig size={20} color="green" />
                  ) : (
                    <CircleAlert size={20} color="red" />
                  )
                }
              />
              {(!emailAvailableByRegex || !emailAvailable) && (
                <Typography variant="small" color="red" className="-my-4 ml-2">
                  {emailError}
                </Typography>
              )}
              <Input
                label="Full Name"
                defaultValue={fullName}
                color={darkMode ? "white" : "gray"}
                className="!text-gray-900 dark:!text-white"
                labelProps={{
                  className: "!text-gray-900 dark:!text-white",
                }}
                onChange={(e) => setFullName(e.target.value)}
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
                value={currency}
                onChange={(value) => setCurrency(value)}
                className="!text-gray-900 dark:!text-white"
                labelProps={{
                  className: "!text-gray-900 dark:!text-white",
                }}
              >
                {currencyOptions.map((currency) => (
                  <Option key={currency} value={currencyValues[currency]}>
                    {currency}
                  </Option>
                ))}
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
              {/* <Button
                variant="outlined"
                size="sm"
                color={darkMode ? "white" : "blue-gray"}
                className="rounded-full"
              >
                Change Password
              </Button> */}
              <UpdatePasswordModal />
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
          <Button
            size="lg"
            color="blue"
            className="rounded-full"
            onClick={(e) => handleSaveChanges(e)}
            disabled={isLoading}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
