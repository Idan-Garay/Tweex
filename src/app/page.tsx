"use client";
import React, { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("alice@prisma.io");
  const [name, setName] = useState("Alice");
  const [result, setResult] = useState("");

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    await fetch("api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, name }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setResult(JSON.stringify(res)));
    return;
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-white">does user exists? {result}</div>
      <form className="flex flex-col gap-y-2 text-black">
        <input
          className=""
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className=""
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="bg-white" onClick={handleSubmit}>
          submit
        </button>
      </form>
    </main>
  );
}
