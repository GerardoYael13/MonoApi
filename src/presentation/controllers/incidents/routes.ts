import { Router } from "express";
import { IncidentController } from "./controller";

export class IncidentRoutes{
    static get routes(): Router{
        const router = Router();
        const controller = new IncidentController();
        router.get("/", controller.getMono);
        router.post("/", controller.createMono);
        router.get("/:id", controller.getMonoByLastWeek);
        router.put("/:id", controller.updateMono);
        router.delete("/:id", controller.deleteMono);
        return router;
    }
}