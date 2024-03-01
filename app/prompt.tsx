"use client";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useState } from "react";
import ReactLoading from "react-loading";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default function Prompt({
  prompt: initialPrompt = "",
  disabled = false,
}: {
  prompt?: string;
  disabled?: boolean;
}) {
  const router = useRouter();
  const [prompt, setPrompt] = useState(initialPrompt);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    const res = await fetch("/prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompts: prompt,
      }),
    });

    const { id } = await res.json();

    // wait for image processing
    await delay(5000);
    setLoading(false);

    router.push(`/result/${id}`);
  };

  if (loading)
    return <ReactLoading type="spin" color="white" height={667} width={375} />;

  return (
    <div>
      <textarea
        className={styles.textarea}
        placeholder="prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={disabled || loading}
      />
      <button
        disabled={!prompt || loading}
        onClick={submit}
        className={styles["button-23"]}
      >
        Submit
      </button>
    </div>
  );
}
