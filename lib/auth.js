import { verifyJwt } from "@/lib/jwt";
import { cookies } from "next/headers";

// for API routes (req-based)
export function getUserIdFromReq(req) {
  const cookieHeader = req.headers.cookie || "";
  const token = cookieHeader.split("token=").pop()?.split(";")[0];
  if (!token) return null;

  try {
    const payload = verifyJwt(token);
    return payload?.id || null;
  } catch {
    return null;
  }
}

// for server components / server actions
export async function getUserIdFromCookies() {
  try {
    const cookieStore = await cookies(); // ✅ await cookies()
    const token = cookieStore.get("token")?.value;
    if (!token) return null;

    const payload = verifyJwt(token);
    return payload?.id || null;
  } catch {
    return null;
  }
}
