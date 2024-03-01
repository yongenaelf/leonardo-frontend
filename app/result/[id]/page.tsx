import { Suspense } from "react";
import Image from "next/image";
import Prompt from "@/app/prompt";
import { revalidateTag } from "next/cache";

interface Root {
  generations_by_pk: GenerationsByPk;
}

interface GenerationsByPk {
  generated_images: GeneratedImage[];
  modelId: string;
  motion: any;
  motionModel: any;
  motionStrength: any;
  prompt: string;
  negativePrompt: string;
  imageHeight: number;
  imageToVideo: any;
  imageWidth: number;
  inferenceSteps: number;
  seed: number;
  public: boolean;
  scheduler: string;
  sdVersion: string;
  status: string;
  presetStyle: any;
  initStrength: any;
  guidanceScale: number;
  id: string;
  createdAt: string;
  promptMagic: boolean;
  promptMagicVersion: any;
  promptMagicStrength: any;
  photoReal: boolean;
  photoRealStrength: any;
  fantasyAvatar: any;
  generation_elements: any[];
}

interface GeneratedImage {
  url: string;
  nsfw: boolean;
  id: string;
  likeCount: number;
  motionMP4URL: any;
  generated_image_variation_generics: any[];
}

async function Results({ id }: { id: string }) {
  const tag = `generations-${id}`;
  const res = await fetch(process.env.LEONARDO_API + "/generations/" + id, {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization: `Bearer ${process.env.LEONARDO_API_TOKEN}`,
    },
    next: {
      tags: [tag],
    },
  });
  const results: Root = await res.json();

  const {
    generations_by_pk: {
      imageHeight,
      imageWidth,
      generated_images,
      prompt,
      status,
    },
  } = results;

  if (status === "PENDING") {
    revalidateTag(tag);
  }

  return (
    <>
      <Prompt prompt={prompt} />
      <Suspense fallback={<div>Loading...</div>}>
        {generated_images.map((i) => (
          <Image
            key={i.id}
            src={i.url}
            width={imageWidth}
            height={imageHeight}
            alt="Image"
          />
        ))}
      </Suspense>
    </>
  );
}

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <Suspense fallback={<Prompt prompt={"Loading..."} disabled />}>
      <Results id={id} />
    </Suspense>
  );
}
