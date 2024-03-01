interface IResponse {
  sdGenerationJob: {
    generationId: string;
    apiCreditCost: number;
  };
}

export async function POST(request: Request) {
  const { prompts: prompt } = await request.json();

  const res = await fetch(process.env.LEONARDO_API + "/generations", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `Bearer ${process.env.LEONARDO_API_TOKEN}`,
    },
    body: JSON.stringify({
      height: 512,
      modelId: "ac614f96-1082-45bf-be9d-757f2d31c174",
      prompt,
      width: 512,
    }),
  });

  const {
    sdGenerationJob: { generationId },
  }: IResponse = await res.json();

  return Response.json({
    id: generationId,
  });
}
