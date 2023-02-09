import { Request, Response } from "express";
import httpStatus from "http-status";

import consolesService, { ConsoleInput } from "../services/consoles-service";

export async function getConsoles(req: Request, res: Response) {
  //status 200 e consoles arr
  const consoles = await consolesService.getConsoles();
  res.send(consoles);
}

export async function getSpecificConsole(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  //caso 1: válido => id 1 ou existente => 200(OK) + objeto console
  //caso 2: inválido => id 0 ou inexistente => 404(NOT FOUND)
  try {
    const console = await consolesService.getSpecificConsole(id);
    res.send(console);
  } catch (error) {
    console.log(error);
    res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function createConsole(req: Request, res: Response) {
  //caso 1: inválido => body errado (middleware) => (422)
  //caso 2: válido => body certo e que não existia ainda => (201) 
  //caso 3: inválido => body certo, mas de um nome que já existia => (409)
  const consoleToCreate = req.body as ConsoleInput;
  try {
    await consolesService.createConsole(consoleToCreate);
    res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    console.log(error);
    res.sendStatus(httpStatus.CONFLICT);
  }
}