import supertest from "supertest";
import { app, server } from "./index";
import analyticalDB from "../src/database-analytical";

describe("ETL process", () => {
  const request = supertest.agent(app);

  afterAll((done) => {
    server.close(done);
  });

  it("should run ETL process and transform data", async () => {
    const res = await request.post("/api/etl/run");
    expect(res.status).toBe(200);

    // Verifica os dados transformados no banco de dados analítico
    analyticalDB.all("SELECT * FROM transformed_orders", [], (err, rows) => {
      if (err) throw err;
      expect(rows.length).toBeGreaterThan(0);
    });
  });
});
