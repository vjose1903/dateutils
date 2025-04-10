export class fun {
  constructor() {}
  // __________________________________________________________________________________________________
  /**
   * Nombre: isEmpty
   * Descripción: Esta función valida si una variable está vacía.
   * @param value La variable a evaluar.
   * @returns true si la variable está vacía, false en caso contrario.
   * @example fun.isEmpty(variable)
   */

  static isEmpty(value: any) {
    return (
      value == null ||
      value === undefined || // es null o indefinido
      (typeof value === 'string' && value.trim().length === 0) || // es un string vacío o lleno de espacios
      (typeof value === 'object' && Object.keys(value).length === 0) || // es un objeto y no tiene propiedades
      (Array.isArray(value) && value.length === 0) || // es un array vacío
      (value instanceof Date && isNaN(value.getTime())) // es una fecha inválida
    );
  }

  // __________________________________________________________________________________________________
  /**
   * Nombre: hasValue
   * Descripción: Esta función valida si una variable tiene valor.
   * @param value La variable a evaluar.
   * @returns true si la variable tiene valor, false en caso contrario.
   * @example fun.hasValue(variable)
   */

  static hasValue(value: any) {
    return !fun.isEmpty(value);
  }
}
