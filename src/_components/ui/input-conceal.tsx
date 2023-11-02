"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Input } from "./input";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";

export const InputConceal = ({
  value,
  setValue,
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) => {
  const [isConceal, setIsConceal] = useState(true);
  return (
    <div className="relative">
      <Input
        className="h-14 text-base"
        autoFocus
        type={isConceal ? "password" : "text"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <EyeIconComponent
        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
        isConceal={isConceal}
        setIsConceal={setIsConceal}
      />
    </div>
  );
};

const EyeIconComponent = ({
  isConceal,
  setIsConceal,
  className,
}: {
  className: string;
  isConceal: boolean;
  setIsConceal: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className={className} onClick={() => setIsConceal(!isConceal)}>
      {isConceal ? <EyeClosedIcon /> : <EyeOpenIcon />}
    </div>
  );
};
