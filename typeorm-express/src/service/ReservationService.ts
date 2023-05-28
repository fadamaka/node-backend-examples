import { AppDataSource } from "../data-source";
import { validate } from "class-validator";
import { Reservation } from "../entity/Reservation";
import { Room } from "../entity/Room";

export const validateAndInsert = async (
    reservation: Reservation,
    validationErrors: string[]
) => {
    const errors = await validate(reservation);
    errors
        .flatMap((e) => Object.values(e.constraints))
        .forEach((e) => validationErrors.push(e));
    if (!reservation.room?.id) {
        validationErrors.push("room id is missing");
    }
    if (!reservation.user?.id) {
        validationErrors.push("user id is missing");
    }
    if (validationErrors.length > 0) {
        return {};
    }
    const room = await AppDataSource.getRepository(Room).findOneBy({
        id: reservation.room.id,
    });
    const desiredDays = getDaysArray(
        reservation.startDate,
        reservation.endDate
    );

    if (desiredDays.length < 2) {
        validationErrors.push("incorrect date range");
        return {};
    }
    const reservedDays = new Set(
        room.reservations.flatMap((r) => {
            return getDaysArray(r.startDate, r.endDate);
        })
    );

    let conflict = desiredDays.filter((x) => reservedDays.has(x));

    if (conflict.length > 0) {
        conflict.forEach((c) =>
            validationErrors.push(
                c + " date is conflicting with existing reservation"
            )
        );
        return {};
    }

    const newReservation = await AppDataSource.getRepository(
        Reservation
    ).create(reservation);
    const results = await AppDataSource.getRepository(Reservation).save(
        newReservation
    );

    return results;
};

const getDaysArray = function (start, end) {
    for (
        var arr = [], dt = new Date(start);
        dt <= new Date(end);
        dt.setDate(dt.getDate() + 1)
    ) {
        arr.push(new Date(dt));
    }
    return arr.map((v) => v.toISOString().slice(0, 10));
};
