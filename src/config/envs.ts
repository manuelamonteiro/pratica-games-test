import dotenv from "dotenv";

export function loadEnvs() {
    //sempre aponta pro .env padrão
    let path = ".env";
    if (process.env.NODE_ENV === "test") {
        //rodará em ambiente de teste
        path = ".env.test";
    }
    dotenv.config({ path })
}
//npx dotenv -e .env.test npx jest

//npx dotenv -e .env.test npx prisma migrate dev --name games_test postgres-init

