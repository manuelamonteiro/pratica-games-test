import supertest from "supertest";
import { faker } from "@faker-js/faker";
import app from "app";
import httpStatus from "http-status";
import { createFConsole } from "../factories/consoles-factory";
import { cleanDb } from "../helpers";

const server = supertest(app);

beforeAll(async () => {
    await cleanDb();
});

beforeEach(async () => {
    await cleanDb();
});

describe("/consoles ROUTE", () => {

    describe("GET /consoles", () => {
        it("Should respond with status 200 and valid body; valid partition", async () => {
            const consoles = await createFConsole();
            
            const response = await server.get("/consoles");
            
            expect(response.status).toBe(httpStatus.OK);
            expect(response.body).toEqual([
                {
                    id: consoles.id,
                    name: consoles.name
                }
            ])
        })
    });

    describe("POST /consoles", () => {

        it("Should responde with status 422; invalid partition - invalid body expected format", async () => {
            const response = await server.post("/consoles");
            expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
        });

        it("Should respond with status 409; invalid partition - there are already a console with this name", async () => {
            const console = await createFConsole();
            
            const response = await server.post("/consoles").send({name: console.name});
            expect(response.status).toBe(httpStatus.CONFLICT);
        })

        it("Should respond with status 201 and valid body; valid partition", async () => {
            const generateBody = () => ({
                name: faker.name.fullName()
            });
            
            const body = generateBody();
            
            const response = await server.post("/consoles").send(body);
            expect(response.status).toBe(httpStatus.CREATED);
        })
    });

    describe("GET /consoles/:id", () => {
        it("Should respond with status 200 and valid body; valid partition", async () => {
            const consoles = await createFConsole();
            
            const response = await server.get(`/consoles/${consoles.id}`);

            expect(response.status).toBe(httpStatus.OK);
            expect(response.body).toEqual(
                {
                    id: consoles.id,
                    name: consoles.name
                }
            );
        });

        it("Should respond with status 404 and invalid id; invalid partition", async () => {         
            const response = await server.get(`/consoles/0`);
            expect(response.status).toBe(httpStatus.NOT_FOUND);
        });
    });

});