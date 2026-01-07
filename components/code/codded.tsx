"use client";

import { useState } from "react";
import { encrypt, decrypt } from "@/utils/seededCipher";

type Mode = "encrypt" | "decrypt";

export default function CoddedPage() {
  const [text, setText] = useState("Hello WORLD! 1234 @#$%");
  const [seed, setSeed] = useState(1234);
  const [mode, setMode] = useState<Mode>("encrypt");

  const output =
    mode === "encrypt"
      ? encrypt(text, seed)
      : decrypt(text, seed);

  return (
    <div className="min-h-screen p-6 flex flex-col gap-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Seeded Text Cipher</h1>

      <div className="flex gap-2">
        <button
          onClick={() => setMode("encrypt")}
          className={`px-4 py-2 rounded border ${
            mode === "encrypt"
              ? "bg-black text-white"
              : "bg-white"
          }`}
        >
          Encrypt
        </button>

        <button
          onClick={() => setMode("decrypt")}
          className={`px-4 py-2 rounded border ${
            mode === "decrypt"
              ? "bg-black text-white"
              : "bg-white"
          }`}
        >
          Decrypt
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-medium">
          {mode === "encrypt" ? "Plain Text" : "Encrypted Text"}
        </label>
        <textarea
          className="border rounded p-2"
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-medium">Seed</label>
        <input
          type="number"
          className="border rounded p-2"
          value={seed}
          onChange={(e) => setSeed(Number(e.target.value) || 0)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-medium">
          Output
        </label>
        <div className="border rounded p-2">
          {output}
        </div>
      </div>
    </div>
  );
}
