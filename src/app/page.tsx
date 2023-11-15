"use client";
import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import React, { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("alice@prisma.io");
  const [name, setName] = useState("Alice");
  const [result, setResult] = useState("");

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setResult("requesting to api/user/login");
    e.preventDefault();
    await fetch("api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, username: name }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setResult(JSON.stringify(res, null, 2)));
    return;
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="">does user exists? {result}</div>
      <form className="flex flex-col gap-y-2 text-black">
        <Input
          className=""
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          className=""
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button className="" onClick={handleSubmit}>
          submit
        </Button>
      </form>
    </main>
  );
}
