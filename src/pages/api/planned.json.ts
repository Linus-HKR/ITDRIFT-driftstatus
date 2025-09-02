import SuperJSON from "superjson";
import { readExcel } from "../../lib/files";

export async function GET() {
  const planned = readExcel()
    .filter((activity) => activity["Visa i driftsschema"] === "Ja")
    .filter((activity) => activity.Stopp.getTime() > Date.now())
    .sort((a, b) => a.Start.getTime() - b.Start.getTime());

  return new Response(SuperJSON.stringify(planned), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
