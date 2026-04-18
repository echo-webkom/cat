import { env as envPublic } from "$env/dynamic/public";
import { env as envPrivate } from "$env/dynamic/private";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(envPrivate.AUTH_SECRET);

if (!secret) {
  console.error("AUTH_SECRET environment variable is not set");
}

export const SESSION_COOKIE_NAME = "session-token";

export async function extractSessionId(
  sessionCookieValue: string,
): Promise<string | null> {
  try {
    const { payload } = await jwtVerify(sessionCookieValue, secret);
    return payload.sessionId as string;
  } catch {
    return null;
  }
}

export async function signOut(sessionToken: string) {
  try {
    const response = await fetch(
      `${envPublic.PUBLIC_UNO_BASE_URL}/auth/sign-out`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      },
    );
    return response.ok;
  } catch {
    console.error("Faied to sign out");
    return false;
  }
}

export async function getUserById(userId: string) {
  const response = await fetch(
    `${envPublic.PUBLIC_UNO_BASE_URL}/users/${userId}`,
    {
      headers: {
        "X-Admin-Key": envPrivate.ADMIN_KEY,
      },
    },
  );

  if (!response.ok) {
    console.error(`Failed to fetch user with ID ${userId}`);
    return null;
  }

  const user = await response.json();
  return user;
}

export const getSessionById = async (sessionId: string) => {
  const response = await fetch(
    `${envPublic.PUBLIC_UNO_BASE_URL}/auth/sessions/${sessionId}`,
    {
      headers: {
        "X-Admin-Key": envPrivate.ADMIN_KEY,
      },
    },
  );

  const session = await response.json();
  return session as {
    userId: string;
    sessionToken: string;
    expiresAt: string;
  };
};
