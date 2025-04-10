# @vjose1903/dateutils

## Descripción

`@vjose1903/dateutils` es un paquete npm para manipular fechas de manera sencilla y eficiente. Proporciona una serie de utilidades para trabajar con fechas, como obtener el primer o último día de un mes, formatear fechas, y más.

## Instalación

Para instalar el paquete, ejecuta el siguiente comando:

```bash
npm install @vjose1903/dateutils
```

## Uso

Aquí tienes algunos ejemplos de cómo usar las funcionalidades del paquete:

```javascript
const { DateUtils } = require('@vjose1903/dateutils');

// Obtener el nombre del mes a partir de un número
console.log(DateUtils.getMonthLabelByNum(3)); // 'marzo'

// Obtener el primer día del año
console.log(DateUtils.getFirstDayOfYear({ year: 2024 })); // 2024-01-01T00:00:00.000Z

// Formatear una fecha
console.log(DateUtils.format({ date: new Date(), dateFormat: 'DD/MM/YYYY', include_hour: true }));
```

## Contribución

Si deseas contribuir al proyecto, por favor sigue los pasos a continuación:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz un commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Sube tus cambios a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.
