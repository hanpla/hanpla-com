import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getSessionUser } from "@/lib/utils/auth";
import { getCommentsByUserId } from "@/lib/queries/comment";

export const GET = async (request: NextRequest) => {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

  try {
    const data = await getCommentsByUserId(user.id, page, pageSize);
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/profile/comments error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
