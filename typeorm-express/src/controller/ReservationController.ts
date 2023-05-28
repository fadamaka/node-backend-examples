import { Request, Response } from "express";
import { Reservation } from "../entity/Reservation";
import { validateAndInsert } from "../service/ReservationService";

export const saveOne = async (req: Request, res: Response) => {
    const reservationBody = Object.assign(Reservation.prototype, req.body);
    let errors = [];
    const newReservation = await validateAndInsert(reservationBody, errors);
    if (errors.length > 0) {
        res.status(400);
        return res.send(
            JSON.stringify(
                {
                    validationErrors: errors,
                },
                undefined,
                4
            )
        );
    }
    return res.send(newReservation);
};
