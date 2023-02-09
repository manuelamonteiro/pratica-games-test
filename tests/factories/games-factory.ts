import { faker } from "@faker-js/faker";
import prisma from "config/database";

export async function createFGame(consoleId: number) {
    return prisma.game.create({
        data: {
            title: faker.name.fullName(),
            consoleId 
        }
    })
}