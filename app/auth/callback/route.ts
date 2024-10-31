import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const error = requestUrl.searchParams.get("error");
  const error_description = requestUrl.searchParams.get("error_description");

  // Handle error case
  if (error) {
    console.error("Auth error:", error, error_description);
    return NextResponse.redirect(
      `${requestUrl.origin}/sign-in?error=${encodeURIComponent(error_description || "Authentication failed")}`
    );
  }

  const supabase = await createClient();

  const { error: supabaseError } = await supabase.auth.exchangeCodeForSession(
    code || ""
  );

  if (supabaseError) {
    console.error("Supabase auth error:", supabaseError);
    return NextResponse.redirect(
      `${requestUrl.origin}/sign-in?error=${encodeURIComponent(supabaseError.message)}`
    );
  }

  return NextResponse.redirect(`${requestUrl.origin}/protected`);
}
