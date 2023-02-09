-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_consoleId_fkey";

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_consoleId_fkey" FOREIGN KEY ("consoleId") REFERENCES "Console"("id") ON DELETE CASCADE ON UPDATE CASCADE;
