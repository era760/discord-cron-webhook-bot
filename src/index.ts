export interface Env {
  DISCORD_WEBHOOK_URL: string;
  DISCORD_MESSAGE: string;
}

export default {
  async fetch(): Promise<Response> {
    return new Response("OK");
  },

  async scheduled(
    controller: ScheduledController,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<void> {
    const response = await fetch(
      `${env.DISCORD_WEBHOOK_URL}?wait=true`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: env.DISCORD_MESSAGE,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Discord webhook failed: ${response.status} ${response.statusText}`,
      );
    }

    console.log("Discord message sent successfully.");
  },
};
