import { faker } from "@faker-js/faker";
import prisma from "config/database";

export async function createFConsole() {
    return prisma.console.create({
        data: {
            name: faker.name.fullName(),
        }
    })
}