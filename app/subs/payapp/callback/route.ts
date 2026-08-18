import { NextRequest, NextResponse } from "next/server";
import { dz } from "@/database/engine";
import { PayAppCallback } from "@/database/schemas/payapp";
import { isBodyTooLarge } from "@/app/subs/payapp/callback/limits";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();

  if (isBodyTooLarge(rawBody)) {
    return new NextResponse(null, { status: 400 });
  }

  const parsed = Object.fromEntries(new URLSearchParams(rawBody));

  // PayApp 은 응답 지연/실패 시 결제요청을 최대 10회 재통보하고 이는 결제 자체를 막을 수 있어,
  // 적재 성공 여부와 무관하게 200 SUCCESS 를 먼저 돌려준다.
  try {
    await dz.insert(PayAppCallback).values({
      raw_body: rawBody,
      parsed,
      mul_no: parsed.mul_no,
      pay_state: parsed.pay_state,
    });
  } catch (error) {
    console.error("payapp callback insert failed", error);
  }

  return new NextResponse("SUCCESS", { status: 200 });
}
