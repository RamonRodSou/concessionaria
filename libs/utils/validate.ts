import { Person } from "@classes/person/Person";
import dayjs from "dayjs";
import { Errors } from "./IError";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const phoneDigitsRegex = /^[0-9]{8,11}$/;

export function sanitize(input: string): string {
    return input.replace(/<[^>]*>?/gm, '').trim();
}

export function validatePhone(phone: string): boolean {
    const cleaned = phone.replace(/\D/g, "");
    return cleaned.length >= 8 && cleaned.length <= 11;
}

export function validateEmail(email: string): boolean {
    return emailRegex.test(email);
}

export function validateDate(date: Date | null): boolean {
    if (!date) return false;

    const minDate = dayjs().add(1, "day").startOf("day");
    const selected = dayjs(date).startOf("day");

    return selected.isAfter(minDate.subtract(1, "millisecond"));
}

export function validateForm(entity: Person): Errors {
    const error: Errors = {};

    if (!entity.firstname || sanitize(String(entity.firstname)).length < 2) {
        error.firstname = 'Nome inválido (mínimo 2 caracteres).';
    }

    if (!entity.lastname || sanitize(String(entity.lastname)).length < 2) {
        error.lastname = 'Sobrenome inválido (mínimo 2 caracteres).';
    }

    const phone = String(entity.phone ?? '').replace(/\D/g, '');
    if (!phoneDigitsRegex.test(phone)) {
        error.phone = 'Telefone deve conter apenas números (8 a 11 dígitos).';
    }

    if (!entity.date) {
        error.date = 'Data obrigatória.';
    } else {
        const chosen = dayjs(entity.date).startOf('day');
        const minDate = dayjs().add(2, 'day').startOf('day');
        if (chosen.isBefore(minDate)) {
            error.date = 'A data deve ser a partir de 2 dias.';
        }
    }

    return error;
}
