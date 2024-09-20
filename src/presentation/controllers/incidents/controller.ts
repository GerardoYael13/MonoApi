import { Request, Response } from "express"
import { MonoModel } from "../../../data/models/incident.model";
import { EmailService } from "../../../domain/services/email.service";
export class IncidentController{
    public getMono = async(req: Request, res: Response) => {
        try{
            const incidents = await MonoModel.find()
            return res.json(incidents)

        }catch(error){
            return res.json([])
        }
        
    }

    public createMono = async(req: Request, res:  Response) => {
        try{
            const {title, description,lat,lng} = req.body;
            const newIncident = await MonoModel.create({
                title: title,
                description: description,
                lat:lat,
                lng:lng
            });
             const emailService = new EmailService();
            await emailService.sendEmail({
                to:"gersgyog@gmail.com",
                subject: `Incidente: ${newIncident.title}`,
                htmlBody: `<h1>${newIncident.description}</h1>`
            }) 
            res.json(newIncident)

        }catch(error){
            res.json({message: "Error creando registro"})
        }
    }

    public getMonoByLastWeek = async (req: Request, res: Response) => {
        try{
            const { id } = req.params;
            const incident = await MonoModel.findById(id);
            return res.json(incident)
        }catch(error){
            return res.json({message: "Ocurrio un error al traer un incidente"})
        }
    }

    public updateMono = async (req: Request, res: Response) => {
        try{
            const { id } = req.params;
            const { title, description, lat, lng} = req.body;
            await MonoModel.findByIdAndUpdate(id, {
                title,
                description,
                lat,
                lng,
            });
            const updatedIncident = await MonoModel.findById(id)
            return res.json(updatedIncident)

        }catch(error){
            return res.json({message: "Ocurrio un error al actualizar un incidente"})
        }
    }

    public deleteMono = async (req:Request,res : Response)=>{
        try {
            const { id } = req.params;
            await MonoModel.findByIdAndDelete(id);
            return res.json({message:"Incidente eleminado"});
        } catch (error) {
            return res.json({message:"Ocurrio un error al eliminar el incidente"});
        }
    }
}