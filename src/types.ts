export type Ticket = {
  Title: string;
  Computer: string;
  Tag: string;
  Date: string;
  Error: string;
  Name: string;
  Update: string;
  Username: string;
  Prio: string;
  ticketOwner: string;
  Status: string;
  deadLine: string;
  visible?: "Private" | "Public";
};

export type Activity = {
  Start: Date;
  Stopp: Date;
  Kvartal: "Q1" | "Q2" | "Q3" | "Q4";
  Ansvarig: string;
  Prioritet: number;
  Moment: string;
  Momentbeskrivning: string;
  "Påverkan av undervisning": string;
  "Inlagt i driftsschema": "Ja" | "Nej";
};
