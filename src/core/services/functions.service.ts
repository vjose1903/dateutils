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
    if (value == null) return true;

    if (typeof value === 'string') return value.trim().length === 0;

    if (Array.isArray(value)) return value.length === 0;

    if (value instanceof Date) return isNaN(value.getTime());
    
    if (typeof value === 'object') return Object.keys(value).length === 0;

    return false;
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
