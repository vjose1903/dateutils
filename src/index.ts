import { fun } from './core/services/functions.service';

export class DateUtils {
  /**
   * objeto para poder obtener número correspondiente a un mes
   * * @example DateUtils.monthNumber.marzo = 3
   */
  static monthNumber = {
    enero: 1,
    febrero: 2,
    marzo: 3,
    abril: 4,
    mayo: 5,
    junio: 6,
    julio: 7,
    agosto: 8,
    septiembre: 9,
    octubre: 10,
    noviembre: 11,
    diciembre: 12,
  };

  /**
   * Objeto para poder obtener el label de un mes pasandole un número
   * @example DateUtils.monthLabel._3_ = marzo
   */
  static monthLabel = {
    _1_: 'enero',
    _2_: 'febrero',
    _3_: 'marzo',
    _4_: 'abril',
    _5_: 'mayo',
    _6_: 'junio',
    _7_: 'julio',
    _8_: 'agosto',
    _9_: 'septiembre',
    _10_: 'octubre',
    _11_: 'noviembre',
    _12_: 'diciembre',
  };

  static hourMinuteRegExp = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

  /**
   * Esta función retorna un arreglo de strings con todos los meses del año
   * @returns Arreglo de los nombres de los meses del año
   * @example DateUtils.getMonthsLabelArray()
   */
  static getMonthsLabelArray() {
    return Object.values(DateUtils.monthLabel);
  }

  /**
   * Esta función retorna el nombre del mes del número que sea pasado
   * @param numberOfMonth (1 - 12). Ejemplo: 3.
   * @returns Nombre del mes
   * @example DateUtils.getMonthLabelByNum(DateUtils.monthNumber.marzo)
   */
  static getMonthLabelByNum(numberOfMonth: number) {
    return DateUtils.monthLabel[`_${numberOfMonth}_` as keyof typeof DateUtils.monthLabel];
  }

  /**
   * Esta función devuelve el primer día del año correspondiente al año especificados.
   * @param params Objeto que contiene el año del cual se quiere obtener el primer día.
   *               - year: El año. Ejemplo: 2024.
   * @returns El primer día del año como un objeto Date.
   * @example DateUtils.getFirstDayOfMonth({ year: 2024 })
   */
  static getFirstDayOfYear(params: { year: number }) {
    return new Date(params.year, 0, 1);
  }

  /**
   * Esta función devuelve el primer día del mes correspondiente al año y mes especificados.
   * @param params Objeto que contiene el año y el mes del cual se quiere obtener el primer día.
   *               - month: El número del mes (1 - 12). Ejemplo: 3.
   *               - year: El año. Ejemplo: 2024.
   * @returns El primer día del mes como un objeto Date.
   * @example DateUtils.getFirstDayOfMonth({ month: 3, year: 2024 })
   */
  static getFirstDayOfMonth(params: { month: number; year: number }) {
    return new Date(params.year, params.month - 1, 1);
  }

  /**
   * Retorna el último día del mes correspondiente al año y mes proporcionados.
   * @param params Objeto que contiene el año y el mes del cual se quiere obtener el último día.
   *              - month: El número del mes (1 - 12). Ejemplo: 3.
   *               - year: El año. Ejemplo: 20234.
   * @returns El último día del mes como un objeto Date.
   * @example DateUtils.getLastDayOfMonth({ month: 3, year: 2023 })
   */
  static getLastDayOfMonth(params: { month: number; year: number }) {
    return new Date(params.year, params.month, 0);
  }

  /**
   * Retorna el número correspondiente al mes actual (1-12).
   * @returns El número del mes actual.
   * @example DateUtils.getActualMonth()
   */
  static getActualMonth() {
    return new Date().getMonth() + 1;
  }

  /**
   * Verifica si el valor de una variable es de tipo Date.
   * @param value Variable a evaluar
   * @returns true or false.
   * @example DateUtils.isDate()
   */
  static isValid(value: any): boolean {
    return value instanceof Date && !isNaN(value.getTime());
  }

  /**
   * Formatea una fecha según las opciones proporcionadas.
   * @param params Objeto con las opciones de formateo de la fecha.
   *               - date: La fecha a formatear (opcional, por defecto es la fecha actual).
   *               - dateFormat: El formato de la fecha (opcional, por defecto es 'DD/MM/YYYY').
   *               - include_hour: Indica si se debe incluir la hora en el formato (opcional, por defecto es false).
   *               - only_hour: Indica si solo se debe incluir la hora en el formato (opcional, por defecto es false).
   *               - hourFormat: El formato de la hora (opcional, por defecto es 'LT').
   *               - separator: El separador entre la fecha y la hora (opcional, por defecto es ' - ').
   * @returns Una cadena de texto que representa la fecha formateada según las opciones proporcionadas.
   * @example DateUtils.format({ date: new Date(), dateFormat: 'DD/MM/YYYY', include_hour: true, only_hour: false, hourFormat: 'LT', separator: ' - ' })
   */
  static format(params?: { date?: any; dateFormat?: string; include_hour?: boolean; only_hour?: boolean; hourFormat?: string; separator?: string }) {
    if (params == undefined) params = {};
    if (fun.hasValue(params.date) && typeof params.date == 'string') params.date = new Date(params.date);
    if (fun.isEmpty(params.date)) params.date = new Date();

    if (fun.isEmpty(params.only_hour)) params.only_hour = params.only_hour ?? false;
    if (fun.isEmpty(params.include_hour)) params.include_hour = (fun.hasValue(params.only_hour) && params.only_hour) || fun.hasValue(params.hourFormat);
    if (params?.separator == undefined) params.separator = ' - ';

    const date = params.date instanceof Date ? params.date : new Date(params.date);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexed
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    let fecha = '';
    if (!params.only_hour) {
      fecha = (params.dateFormat ?? 'DD/MM/YYYY')
        .replace('DD', day)
        .replace('MM', month)
        .replace('YYYY', String(year));
    }

    if (params.include_hour) {
      const formattedTime = (params.hourFormat ?? 'HH:mm')
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);

      fecha += `${fecha.length > 0 ? params.separator : ''}${formattedTime}`;
    }

    return fecha;
  }

  /**
   * Formatea una fecha según las opciones proporcionadas.
   * @param params Objeto con las opciones de formateo de la fecha.
   *               - date: La fecha a formatear (opcional, por defecto es la fecha actual).
   *               - dateFormat: El formato de la fecha (opcional, por defecto es 'DD/MM/YYYY').
   *               - include_hour: Indica si se debe incluir la hora en el formato (opcional, por defecto es false).
   *               - only_hour: Indica si solo se debe incluir la hora en el formato (opcional, por defecto es false).
   *               - hourFormat: El formato de la hora (opcional, por defecto es 'LT').
   *               - separator: El separador entre la fecha y la hora (opcional, por defecto es ' - ').
   * @returns Una cadena de texto que representa la fecha formateada según las opciones proporcionadas.
   * @example DateUtils.format({ date: new Date(), dateFormat: 'DD/MM/YYYY', include_hour: true, only_hour: false, hourFormat: 'LT', separator: ' - ' })
   */
  static convertStringToDate(params?: { dateString?: any; include_hour?: boolean; separator?: string }) {
    if (params == undefined) params = {};

    const pattern = /^(\d{2})\/(\d{2})\/(\d{4}) - (\d{1,2}):(\d{2}) (AM|PM)$/;

    const match = params.dateString.match(pattern);

    let date;

    if (!match) {
      return (date = new Date(params.dateString));
    } else {
      const [, day, month, year, hour, minute, period] = match;

      // Convierte las partes de string a números
      let parsedHour = parseInt(hour, 10);
      const parsedMinute = parseInt(minute, 10);
      const parsedDay = parseInt(day, 10);
      const parsedMonth = parseInt(month, 10) - 1; // Los meses en Date son 0-indexed
      const parsedYear = parseInt(year, 10);

      // Ajusta la hora para el formato AM/PM
      if (period === 'PM' && parsedHour !== 12) {
        parsedHour += 12;
      } else if (period === 'AM' && parsedHour === 12) {
        parsedHour = 0;
      }

      // Crea el objeto Date
      date = new Date(parsedYear, parsedMonth, parsedDay, parsedHour, parsedMinute);
    }

    // Verifica si la fecha es válida
    if (!DateUtils.isValid(date)) return null;

    return date;
  }

  /**
   * Retorna la diferencia en horas entre 2 horas establecidas.
   * @param time1 String || Date hora de inicio para comparar
   * @param time2 String || Date hora de fin para comparar
   * @returns La diferencia en horas entre las dos horas establecidas.
   * @example DateUtils.diffHours('03:12', '15:30')
   */
  static diffHours(time1: string | Date, time2?: string | Date): number | undefined {
    if (time2 == undefined) time2 = new Date();

    if (typeof time1 === 'string' || typeof time2 === 'string') {
      if (DateUtils.isValid(new Date(time1))) time1 = new Date(time1);
      if (DateUtils.isValid(new Date(time2))) time2 = new Date(time2);

      const match1 = typeof time1 == 'string' ? time1.match(DateUtils.hourMinuteRegExp) : false;
      const match2 = typeof time2 == 'string' ? time2.match(DateUtils.hourMinuteRegExp) : false;

      if (typeof time1 === 'string' && match1) time1 = new Date(`1970-01-01T${time1}:00`);
      if (typeof time2 === 'string' && match2) time2 = new Date(`1970-01-01T${time2}:00`);
    }

    if (DateUtils.isValid(time1) && DateUtils.isValid(time2) && time1 instanceof Date && time2 instanceof Date) {
      const diffInMillis = time2.getTime() - time1.getTime();
      const diffInHours = diffInMillis / (1000 * 60 * 60);
      return diffInHours;
    }

    return undefined;
  }

  /**
   * Calcula el número de días entre dos fechas
   * @param fecha1 Primera fecha a comparar
   * @param fecha2 Segunda fecha a comparar
   * @returns número de días entre las dos fechas
   * @example
   * ```typescript
   * const fecha1 = new Date('2024-01-01');
   * const fecha2 = new Date('2024-03-01');
   * const dias = diffDays(fecha1, fecha2); // retorna 60
   * ```
   */
  static diffDays(fecha1: Date, fecha2: Date): number {
    // Normalizar las fechas a la 1 AM
    const fecha1Normalizada = new Date(fecha1.getFullYear(), fecha1.getMonth(), fecha1.getDate(), 1, 0, 0, 0);
    const fecha2Normalizada = new Date(fecha2.getFullYear(), fecha2.getMonth(), fecha2.getDate(), 1, 0, 0, 0);

    // Asegurarse de que fecha1 es la más reciente
    const fechaMayor = fecha1Normalizada > fecha2Normalizada ? fecha1Normalizada : fecha2Normalizada;
    const fechaMenor = fecha1Normalizada > fecha2Normalizada ? fecha2Normalizada : fecha1Normalizada;

    // Calcular días totales
    return Math.floor((fechaMayor.getTime() - fechaMenor.getTime()) / (1000 * 60 * 60 * 24));
  }

  /**
   * Resta horas a un objeto Date dado y devuelve el nuevo objeto Date.
   * @param hoursToSubtract - El número de horas a restar.
   * @param date - El objeto Date del cual se restarán las horas.
   * @returns El nuevo objeto Date con las horas restadas.
   * * @example DateUtils.diffHours(15, new Date())
   */
  static subtractHours(hoursToSubtract: number, date?: string | Date): Date {
    if (date == undefined) date = new Date();

    if (typeof date === 'string') {
      if (DateUtils.isValid(new Date(date))) date = new Date(date);

      const match1 = typeof date == 'string' ? date.match(DateUtils.hourMinuteRegExp) : false;
      if (typeof date === 'string' && match1) date = new Date(`1970-01-01T${date}:00`);
    }

    if (DateUtils.isValid(date) && date instanceof Date) {
      const newDate = new Date(date.getTime());
      newDate.setHours(newDate.getHours() - hoursToSubtract);

      return newDate;
    }

    return new Date();
  }

  /**
   * Resta días a un objeto Date dado y devuelve el nuevo objeto Date.
   * @param daysToSubtract - El número de días a restar.
   * @param date - El objeto Date del cual se restarán los días.
   * @returns El nuevo objeto Date con los días restados.
   * @example DateUtils.subtractDays(5, new Date())
   */
  static subtractDays(daysToSubtract: number, date?: string | Date): Date {
    if (date == undefined) date = new Date();

    if (typeof date === 'string') {
      if (DateUtils.isValid(new Date(date))) date = new Date(date);

      const match1 = typeof date == 'string' ? date.match(DateUtils.hourMinuteRegExp) : false;
      if (typeof date === 'string' && match1) date = new Date(`1970-01-01T${date}:00`);
    }

    if (DateUtils.isValid(date) && date instanceof Date) {
      const newDate = new Date(date.getTime());
      newDate.setDate(newDate.getDate() - daysToSubtract);

      return newDate;
    }

    return new Date();
  }

  /**
   * Añade horas a un objeto Date dado y devuelve el nuevo objeto Date.
   * @param hoursToAdd - El número de horas a añadir.
   * @param date - El objeto Date al cual se añadirán las horas.
   * @returns El nuevo objeto Date con las horas añadidas.
   * @example DateUtils.addHours(5, new Date())
   */
  static addHours(hoursToAdd: number, date?: string | Date): Date {
    if (date == undefined) date = new Date();

    if (typeof date === 'string') {
      if (DateUtils.isValid(new Date(date))) date = new Date(date);

      const match1 = typeof date == 'string' ? date.match(DateUtils.hourMinuteRegExp) : false;
      if (typeof date === 'string' && match1) date = new Date(`1970-01-01T${date}:00`);
    }

    if (DateUtils.isValid(date) && date instanceof Date) {
      const newDate = new Date(date.getTime());
      newDate.setHours(newDate.getHours() + hoursToAdd);

      return newDate;
    }

    return new Date();
  }

  /**
   * Añade días a un objeto Date dado y devuelve el nuevo objeto Date.
   * @param daysToAdd - El número de días a añadir.
   * @param date - El objeto Date al cual se añadirán los días.
   * @returns El nuevo objeto Date con los días añadidos.
   * @example DateUtils.addDays(3, new Date())
   */
  static addDays(daysToAdd: number, date?: string | Date): Date {
    if (date == undefined) date = new Date();

    if (typeof date === 'string') {
      if (DateUtils.isValid(new Date(date))) date = new Date(date);

      const match1 = typeof date == 'string' ? date.match(DateUtils.hourMinuteRegExp) : false;
      if (typeof date === 'string' && match1) date = new Date(`1970-01-01T${date}:00`);
    }

    if (DateUtils.isValid(date) && date instanceof Date) {
      const newDate = new Date(date.getTime());
      newDate.setDate(newDate.getDate() + daysToAdd);

      return newDate;
    }

    return new Date();
  }
}
