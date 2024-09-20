import { Router } from "express";
import { IncidentRoutes } from "./incidents/routes";

export class AppRoutes{
    static get routes(): Router{
        const router = Router();
        router.use("/api/MonoV", IncidentRoutes.routes);
        return router;
    }
}