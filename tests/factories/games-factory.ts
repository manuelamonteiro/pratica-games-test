import { faker } from "@faker-js/faker";
import prisma from "config/database";

async function createGame(consoleId: number) {
    return prisma.game.create({
        data: {
            title: faker.name.findName(),
            consoleId 
        }
    })
}