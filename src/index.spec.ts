import supertest from "supertest";
process.env.PORT = '5000'; 
import { app, server } from "./index";

describe("server", () => {
  const request = supertest.agent(app);
  afterAll((done) => {
    server.close(done);
  });

  it("should get /", async () => {
    const res = await request.get("/");
    expect(res.status).toBe(200);
    expect(res.text).toEqual("Bem vindo ao Stock ETL API!");
  });
});
