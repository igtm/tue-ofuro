import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
  const CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;
  const CHANNEL_NAME = "tue_ofuro";

  if (!CLIENT_ID || !CLIENT_SECRET) {
    console.error("Missing Twitch credentials");
    return res.status(500).json({ isLive: false, error: "Missing configuration" });
  }

  try {
    // 1. Get App Access Token
    const tokenResponse = await fetch("https://id.twitch.tv/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "client_credentials",
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error("Failed to get access token");
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // 2. Check Stream Status
    const streamResponse = await fetch(
      `https://api.twitch.tv/helix/streams?user_login=${CHANNEL_NAME}`,
      {
        headers: {
          "Client-ID": CLIENT_ID,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!streamResponse.ok) {
      throw new Error("Failed to fetch stream status");
    }

    const streamData = await streamResponse.json();
    const isLive = streamData.data && streamData.data.length > 0;

    res.status(200).json({ isLive });
  } catch (error) {
    console.error("Twitch API Error:", error);
    res.status(500).json({ isLive: false });
  }
}
