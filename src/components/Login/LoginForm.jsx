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
import { login } from "../../store/features/authSlice";
import { setError, clearError } from "../../store/features/errorSlice";
import { usePost } from "../../hooks/useHttp"
 
export default function LoginForm() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { postRequest } = usePost();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      dispatch(clearError());
      const response = await postRequest("/api/v1/user/login", {
        email,
        username,
        password,
      })
      if (response.success) {
        dispatch(login());
        sessionStorage.setItem("accessToken", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      dispatch(setError(error.message || "An error occurred while logging in"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <Card
      shadow={false}
    >
      <CardHeader shadow={false} floated={false} className="text-center flex flex-col items-center">
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
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4 md:mt-12"
        >
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
              required={username ? false : true}
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
              required={email ? false : true}
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
          <Button size="lg" color="gray" fullWidth type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log in"}
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
            Log in with google
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
 