import SuperJSON from "superjson";
import { readTickets } from "../../lib/files";
import { env } from "../../env";

export async function GET() {
  const internalUsers = env.INTERNAL_USERS.split(",").map((usr) =>
    usr.trim().toLowerCase(),
  );

  const tickets = (await readTickets())
    .filter((ticket) => {
      if (ticket.visible !== undefined)
        return ticket.visible === "Public" ? true : false;

      return !internalUsers.some((int) => int === ticket.Username);
    })
    .sort((a, b) => a.Date.getTime() - b.Date.getTime());

  return new Response(SuperJSON.stringify(tickets), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
