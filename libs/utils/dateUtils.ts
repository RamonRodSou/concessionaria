import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
dayjs.locale('pt-br');

export class DateUtil {

    static dateFormated(date: Date | string) {
        return new Date(date).toLocaleDateString("pt-BR")
    }
}