import { glob } from "glob";
import * as fs from "fs";
import type { Ticket } from "../types";
import * as XLSX from "xlsx";
import { TICKET_FOLDER_PATH, SCHEDULE_FILE_PATH } from "astro:env/server";
import { join } from "node:path/posix";
import { z } from "astro:schema";

// Schemas

const activityObjectSchema = z.object({
  Start: z.coerce.date(),
  Stopp: z.coerce.date(),
  Kvartal: z.enum(["Q1", "Q2", "Q3", "Q4"]),
  Ansvarig: z.string().optional(),
  Prioritet: z.number(),
  Moment: z.string(),
  Momentbeskrivning: z.string(),
  "Påverkan av undervisning": z.string(),
  "Visa i driftsschema": z.enum(["Ja", "Nej"]).optional(),
});

// Functions

export async function readTickets() {
  const ticketJson = await glob(
    join(TICKET_FOLDER_PATH, "/{new,prio1,prio2,prio3}/*.json"),
  );
  const tickets = ticketJson
    .map((ticketPath) => fs.readFileSync(ticketPath, "utf16le"))
    .map((ticketContents) => JSON.parse(ticketContents.trim()) as Ticket)
    .map((ticket) => ({
      ...ticket,
      Date: new Date(
        `20${ticket.Date.substring(0, 2)}-${ticket.Date.substring(
          2,
          4,
        )}-${ticket.Date.substring(4, 6)}`,
      ),
    }));

  return tickets;
}

XLSX.set_fs(fs);
export function readExcel() {
  const workbook = XLSX.readFile(SCHEDULE_FILE_PATH, {
    cellDates: true,
  });
  const scheduleData = XLSX.utils.sheet_to_json(
    workbook.Sheets["Uppgifter och datum"],
  );

  const activityData = scheduleData
    .map((obj) => {
      const parseRes = activityObjectSchema.safeParse(obj);

      if (parseRes.success) return parseRes.data;
      return null;
    })
    .filter((activity) => !!activity);

  return activityData;
}
