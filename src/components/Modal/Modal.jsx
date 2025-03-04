import React from "react";
import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { LoginForm, SignupForm } from "../index";
import { X } from "lucide-react";

export default function Modal({
  text,
  type,
  buttonClass = "",
  isFullWidthButton = false,
  isBtn = true,
}) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      {isBtn && (
        <Button
          variant={type === "login" ? "text" : "gradient"}
          color="white"
          size="sm"
          className={`hidden lg:inline-block px-4 text-[15px] ${buttonClass} ${
            isFullWidthButton ? "w-full" : ""
          } ${type === "login" ? "border border-white" : ""}`}
          onClick={handleOpen}
        >
          <span>{text}</span>
        </Button>
      )}
      {!isBtn && (
        <div className="cursor-pointer" onClick={handleOpen}>
          {text}
        </div>
      )}
      <Dialog open={open} handler={handleOpen}>
        <DialogBody className="overflow-y-scroll max-h-[90vh] scrollbar-hide">
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
          {type === "login" ? <LoginForm /> : <SignupForm />}
        </DialogBody>
      </Dialog>
    </>
  );
}
