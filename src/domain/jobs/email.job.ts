import cron from 'node-cron';
import {envs} from '../../config/envs.plugin';
import { MonoModel } from '../../data/models/incident.model';
import { EmailService } from '../services/email.service';
import { generateIncidentEmailTemplate } from '../templates/email.template';
import { plugin } from 'mongoose';

// Crear una instancia del servicio de correo electrónico
const emailService = new EmailService();

// Función para definir y ejecutar el cron job
export const emailJob = () => {
    cron.schedule('*/10 * * * * *', async () => {
        try {
            // Buscar incidentes que no han sido enviados
            const incidents = await MonoModel.find({ isEmailSent: false });

            if (incidents.length === 0) {
                console.log("No hay incidentes pendientes por enviar");
                return;
            }

            console.log(`Procesando ${incidents.length} incidentes.`);

            // Procesar cada incidente
            await Promise.all(
                incidents.map(async (incident) => {
                    try {
                        // Generar el cuerpo del email utilizando una plantilla
                        const htmlBody = generateIncidentEmailTemplate(
                            incident.title,
                            incident.description,
                            incident.lat,
                            incident.lng
                        );

                        // Enviar el email
                        await emailService.sendEmail({
                            to: envs.MAIL_USER ?? '',
                            subject: `Incidente: ${incident.title}`,
                            htmlBody: htmlBody
                        });

                        console.log(`Email enviado para el incidente con Id: ${incident._id}`);

                        // Actualizar el estado del incidente a enviado
                        await MonoModel.findByIdAndUpdate(incident._id, { isEmailSent: true });

                        console.log(`Incidente actualizado para el Id: ${incident._id}`);

                    } catch (error) {
                        console.error(`Error al procesar el incidente con Id: ${incident._id}`, error);
                    }
                })
            );

        } catch (error) {
            console.error("Error durante el envío de correos", error);
        }
    });
};
