"use client";

import { Button } from "@/components/ui/button";
import { signInWithMicrosoft } from "@/app/actions";
import Image from "next/image";

export function MicrosoftSignInButton() {
  return (
    <Button
      variant="outline"
      className="w-full flex items-center justify-center gap-2"
      onClick={async () => {
        await signInWithMicrosoft();
      }}
    >
      <Image
        src="/microsoft-logo.svg"
        alt="Microsoft logo"
        width={20}
        height={20}
      />
      Sign in with Microsoft
    </Button>
  );
}
