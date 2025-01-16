import React from "react";
import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { LoginForm, SignupForm } from "../index";
import { X } from "lucide-react";

export default function Modal({ type, buttonClass="", isFullWidthButton=false }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button
        variant={type === "login" ? "text" : "gradient"}
        size="sm"
        className={`hidden lg:inline-block px-4 text-[15px] ${buttonClass} ${isFullWidthButton ? "w-full" : ""}`}
        onClick={handleOpen}
      >
        <span>{type === "login" ? "Log in" : "Sign up"}</span>
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogBody 
          className="overflow-y-scroll max-h-[90vh] scrollbar-hide"
        >
          <div className="flex justify-end sticky z-10 top-0">
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="border border-red-200 p-2 bg-white"
            >
              <X size={28} strokeWidth={3} />
            </Button>
          </div>
          {type === "login" ? (
            <LoginForm />
          ) : (
            <SignupForm />
          )}
        </DialogBody>
      </Dialog>
    </>
  );
}
