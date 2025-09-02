import { useEffect, useState } from "react";
import type { readExcel } from "../../lib/files";
import SuperJSON from "superjson";

export default function Planned({
  refreshInterval,
}: {
  refreshInterval: number;
}) {
  const [planned, setPlanned] =
    useState<Awaited<ReturnType<typeof readExcel>>>();

  const fetchData = () =>
    fetch("/api/planned.json").then((res) =>
      res.text().then((data) => setPlanned(SuperJSON.parse(data))),
    );

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, refreshInterval);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="ring-hkr rounded ring-2">
      <h2 className="bg-hkr p-4 text-3xl font-bold text-gray-950">
        Planerade moment
      </h2>
      <div className="grid grid-cols-1 gap-4 p-4 xl:grid-cols-2">
        {planned && planned.length > 0 ? (
          planned.map((activity) => {
            const active =
              activity.Start.getTime() < Date.now() &&
              Date.now() < activity.Stopp.getTime();

            return (
              <div
                key={btoa(activity.Moment + activity.Start)}
                data-active={active}
                className="group flex flex-col gap-2 rounded p-2 ring-2 ring-gray-950 data-[active=true]:ring-red-600 xl:odd:last:col-span-2"
              >
                <div>
                  <div className="text-xl font-semibold">{activity.Moment}</div>

                  <div className="text-lg">
                    {activity["Påverkan av undervisning"]}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-700">
                    Start: {activity.Start.toLocaleDateString("sv-SE")}
                  </span>
                  <span className="text-sm text-gray-700">
                    Slut: {activity.Stopp.toLocaleDateString("sv-SE")}
                  </span>
                  <div className="ml-auto hidden font-semibold text-red-600 group-data-[active=true]:block">
                    Pågående
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <span className="text-lg font-bold">Inga planerad händelser</span>
        )}
      </div>
    </section>
  );
}
