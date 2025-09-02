import { useEffect, useState } from "react";
import type { readTickets } from "../../lib/files";
import SuperJSON from "superjson";

export default function Tickets({
  refreshInterval,
}: {
  refreshInterval: number;
}) {
  const [tickets, setTickets] =
    useState<Awaited<ReturnType<typeof readTickets>>>();

  const fetchData = () =>
    fetch("/api/tickets.json").then((res) =>
      res.text().then((data) => setTickets(SuperJSON.parse(data))),
    );

  useEffect(() => {
    fetchData();

    const interval = setInterval(async () => {
      fetchData();
    }, refreshInterval);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="ring-hkr rounded ring-2">
      <h2 className="bg-hkr flex p-4 text-3xl font-bold text-gray-950">
        Pågående problem &ndash; {tickets ? tickets.length : 0}
      </h2>
      <div className="grid grid-cols-1 gap-4 p-4 xl:grid-cols-2">
        {tickets && tickets.length > 0 ? (
          tickets.map((ticket) => (
            <div
              key={btoa(ticket.Title + ticket.Date)}
              className="flex flex-col gap-2 rounded p-2 ring-2 ring-gray-950 xl:odd:last:col-span-2"
            >
              <span className="text-xl font-semibold">{ticket.Title}</span>
              <p className="line-clamp-2 whitespace-pre-wrap">{ticket.Error}</p>
              <span className="text-sm text-gray-700">
                Öppnad: {ticket.Date.toLocaleDateString("sv-SE")}
              </span>
            </div>
          ))
        ) : (
          <span className="text-lg font-bold">
            Inga pågående rapporterade problem
          </span>
        )}
      </div>
    </section>
  );
}
