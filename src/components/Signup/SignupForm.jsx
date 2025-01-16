import React, { useState } from "react";

// @components
import {
  Card,
  Input,
  Button,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setError, clearError } from "../../store/features/errorSlice";
import { login } from "../../store/features/authSlice";
import { usePost } from "../../hooks/useHttp";

export default function SignupForm() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const { postRequest } = usePost();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      dispatch(clearError());
      if (password !== confirmPassword) {
        dispatch(setError("Password and Confirm Password do not match"));
      }
      const response = await postRequest("/api/v1/users/register", {
        email,
        username,
        password,
        confirmPassword,
        fullName,
      })

      if (response.success) {
        dispatch(login({
          userData: response.data.registeredUser,
          accessToken: response.data.accessToken,
        }));
        sessionStorage.setItem("accessToken", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      dispatch(setError(error.message || "An error occurred while signing up"));
    } finally {
      setIsLoading(false);
    }
  } 

  return (
    <>
      <Card shadow={false} 
      >
        <CardHeader
          shadow={false}
          floated={false}
          className="text-center flex flex-col items-center"
        >
          <Typography
            variant="h1"
            color="blue-gray"
            className="mb-4 !text-3xl lg:text-4xl"
          >
            Effortless Expense Tracking Starts Here
          </Typography>
          <Typography className="!text-gray-600 text-[18px] font-normal ">
            Securely manage your finances and track expenses with ease.
          </Typography>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSignup} className="flex flex-col gap-4 md:mt-12">
            <div>
              <label htmlFor="fullName">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="block font-medium mb-2"
                >
                  Full Name
                </Typography>
              </label>
              <Input
                onChange={(e) => setFullName(e.target.value)}
                required
                id="fullName"
                color="gray"
                size="lg"
                type="text"
                name="FullName"
                placeholder="Sherlock Holmes"
                className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <div>
              <label htmlFor="email">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="block font-medium mb-2"
                >
                  Your Email
                </Typography>
              </label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                required
                id="email"
                color="gray"
                size="lg"
                type="email"
                name="email"
                placeholder="name@mail.com"
                className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <div>
              <label htmlFor="username">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="block font-medium mb-2"
                >
                  User Name
                </Typography>
              </label>
              <Input
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                color="gray"
                size="lg"
                type="text"
                name="username"
                placeholder="Detective_007"
                className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <div>
              <label htmlFor="password">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="block font-medium mb-2"
                >
                  Password
                </Typography>
              </label>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                required
                id="password"
                color="gray"
                size="lg"
                type="password"
                name="password"
                placeholder="ABC@123"
                className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="block font-medium mb-2"
                >
                  Confirm Password
                </Typography>
              </label>
              <Input
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                id="confirmPassword"
                color="gray"
                size="lg"
                type="password"
                name="confirmPassword"
                placeholder="ABC@123"
                className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <Button size="lg" color="gray" fullWidth type="submit" disabled={isLoading}>
              {isLoading ? "Signing up..." : "Sign Up"}
            </Button>
            <Button
              variant="outlined"
              size="lg"
              className="flex h-12 border-blue-gray-200 items-center justify-center gap-2"
              fullWidth
            >
              <img
                src={`https://www.material-tailwind.com/logos/logo-google.png`}
                alt="google"
                className="h-6 w-6"
              />{" "}
              Sign up with google
            </Button>
            <Typography
              variant="small"
              className="text-center mx-auto max-w-[19rem] !font-medium !text-gray-600"
            >
              Upon signing in, you consent to abide by our{" "}
              <a href="#" className="text-gray-900">
                Terms of Service
              </a>{" "}
              &{" "}
              <a href="#" className="text-gray-900">
                Privacy Policy.
              </a>
            </Typography>
          </form>
        </CardBody>
      </Card>
    </>
  );
}
