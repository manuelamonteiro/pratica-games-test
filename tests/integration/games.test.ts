import supertest from "supertest";
import { faker } from "@faker-js/faker";
import app from "app";
import httpStatus from "http-status";
import { createFConsole } from "../factories/consoles-factory";
import { cleanDb } from "../helpers";
import { createFGame } from "../factories/games-factory";

const server = supertest(app);

beforeAll(async () => {
    await cleanDb();
});

beforeEach(async () => {
    await cleanDb();
});

describe("/games ROUTE", () => {

     describe("GET /games", () => {
         it("Should respond with status 200 and valid body; valid partition", async () => {
             const console = await createFConsole();
             const game = await createFGame(Number(console.id));
            
             const response = await server.get("/games");
             expect(response.status).toBe(httpStatus.OK);
             expect(response.body).toEqual([
                 {
                    id: game.id,
                    title: game.title,
                    consoleId: game.consoleId,
                    Console: {
                        id: console.id,
                        name: console.name
                    }
                 }
                ])
         })
     });

    describe("POST /games", () => {

        it("Should responde with status 422; invalid partition - invalid body expected format", async () => {
            const response = await server.post("/games");
            expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
        });

        it("Should respond with status 409; invalid partition - there are already a console with this name", async () => {
            const consoles = await createFConsole();
            
            const generateBody = () => ({
                title: faker.name.fullName(),
                consoleId: consoles.id
            });
            
            const game = await createFGame(Number(consoles.id));
            
            const response = await server.post("/games").send({title: game.title, consoleId: consoles.id});
            expect(response.status).toBe(httpStatus.CONFLICT);
        })

        it("Should respond with status 201 and valid body; valid partition", async () => {
            const consoles = await createFConsole();
            
            const generateBody = () => ({
                title: faker.name.fullName(),
                consoleId: consoles.id
            });
            
            const body = generateBody();
            
            const response = await server.post("/games").send(body);
            expect(response.status).toBe(httpStatus.CREATED);
        })
    });

    describe("GET /games/:id", () => {
        it("Should respond with status 200 and valid body; valid partition", async () => {
            const consoles = await createFConsole();
            const game = await createFGame(Number(consoles.id));
           
            const response = await server.get(`/games/${game.id}`);
            expect(response.status).toBe(httpStatus.OK);
            expect(response.body).toEqual(
                {
                   id: game.id,
                   title: game.title,
                   consoleId: game.consoleId
                })
        });

        it("Should respond with status 404 and invalid id; invalid partition", async () => {     
            const response = await server.get(`/games/0`);
            expect(response.status).toBe(httpStatus.NOT_FOUND);
        });
    });
});

