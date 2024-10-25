import "dotenv/config";
import { Client } from "pg";
import { backOff } from "exponential-backoff";
import express from "express";
import waitOn from "wait-on";
import onExit from "signal-exit";
import cors from "cors";

enum Position {
  top = "top",
  bottom = "bottom",
  left = "left",
  right = "right",
}

type SpacingType = "margin" | "padding";

type Spacing = {
  position: Position;
  value?: number;
  unit?: string;
  id: string;
  type: SpacingType;
};

// Add your routes here
const setupApp = (client: Client): express.Application => {
  const app: express.Application = express();

  app.use(cors());

  app.use(express.json());

  app.get("/examples", async (_req, res) => {
    const { rows } = await client.query(`SELECT * FROM example_table`);
    res.json(rows);
  });

  app.get("/spacing", async (_req, res) => {
    const spacingData: Spacing[] = [
      {
        id: "1",
        position: Position.top,
        type: "margin",
      },
      {
        id: "2",
        position: Position.left,
        value: 24,
        unit: "px",
        type: "margin",
      },
      {
        id: "3",
        position: Position.right,
        value: 24,
        unit: "px",
        type: "margin",
      },
      {
        id: "4",
        position: Position.bottom,
        type: "margin",
      },

      {
        id: "5",
        position: Position.top,
        type: "padding",
      },
      {
        id: "6",
        position: Position.left,
        type: "padding",
      },
      {
        id: "7",
        position: Position.right,
        value: 24,
        unit: "px",
        type: "padding",
      },
      {
        id: "8",
        position: Position.bottom,
        type: "padding",
      },
    ];
    res.json(spacingData);
  });

  return app;
};

// Waits for the database to start and connects
const connect = async (): Promise<Client> => {
  console.log("Connecting");
  const resource = `tcp:${process.env.PGHOST}:${process.env.PGPORT}`;
  console.log(`Waiting for ${resource}`);
  await waitOn({ resources: [resource] });
  console.log("Initializing client");
  const client = new Client();
  await client.connect();
  console.log("Connected to database");

  // Ensure the client disconnects on exit
  onExit(async () => {
    console.log("onExit: closing client");
    await client.end();
  });

  return client;
};

const main = async () => {
  const client = await connect();
  const app = setupApp(client);
  const port = parseInt(process.env.SERVER_PORT || "");
  app.listen(port, () => {
    console.log(
      `Draftbit Coding Challenge is running at http://localhost:${port}/`
    );
  });
};

main();
