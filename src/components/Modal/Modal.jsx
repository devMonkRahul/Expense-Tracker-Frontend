import React from "react";
import {
  Button,
  Dialog,
  DialogBody,
} from "@material-tailwind/react";
import { LoginForm, SignupForm } from "../index";
 
export default function Modal({ type }) {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);
 
  return (
    <>
    <Button
        variant={type === "login" ? "text" : "gradient"}
        size="sm"
        className="hidden lg:inline-block px-4 text-[15px]"
        onClick={handleOpen}
    >
        <span>{type === "login" ? ("Log in") : ("Sign up")}</span>
    </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogBody>
            {type === "login" ? (
                <LoginForm handleOpen={handleOpen} />
            ) : (
                <SignupForm handleOpen={handleOpen} />
            )}
        </DialogBody>
      </Dialog>
    </>
  )
}