export const CONTRACT_TEMPLATE_TEXT = `CONTRATO DE TRABAJO POR TIEMPO DEFINIDO

ENTRE:

De una parte, {companyName}, sociedad comercial constituida de acuerdo con las leyes de la República Dominicana, con RNC No. {companyRNC}, con su domicilio social en {companyAddress}, debidamente representada por su Gerente;

Y de la otra parte, {employeeName}, de nacionalidad {nationality}, portador(a) del documento de identidad No. {identifier}, domiciliado(a) y residente en la ciudad de Santo Domingo, quien en lo adelante se denominará EL/LA TRABAJADOR(A).

HAN CONVENIDO Y PACTADO LO SIGUIENTE:

PRIMERO: EL/LA TRABAJADOR(A) se compromete a prestar sus servicios a LA EMPRESA en calidad de {position} en el departamento de {department}.

SEGUNDO: La duración de este contrato es {duration}.

TERCERO: EL/LA TRABAJADOR(A) recibirá una remuneración mensual de {salary}.

Hecho y firmado en dos originales, uno para cada una de las partes, en la ciudad de Santo Domingo, República Dominicana, el día {currentDate}.


_________________________
{companyName}


_________________________
{employeeName}
`;

export const LIQUIDACION_TEMPLATE_TEXT = `ACTO DE LIQUIDACIÓN DE PRESTACIONES LABORALES

En la ciudad de Santo Domingo, a los {currentDay} días del mes de {currentMonth} del año {currentYear}.

Yo, {employeeName}, portador de la cédula de identidad y electoral No. {identifier}, por medio del presente acto declaro haber recibido de mi empleador, {companyName}, con RNC No. {companyRNC}, la suma total de {total} ({totalWords}), por concepto de mis prestaciones laborales, detalladas a continuación:

- Preaviso: {preaviso}
- Auxilio de Cesantía: {cesantia}
- Vacaciones (proporcional): {vacaciones}
- Salario de Navidad (proporcional): {salario13}

Con el recibo de esta suma, otorgo formal descargo y finiquito por cualquier reclamación presente o futura derivada de mi contrato de trabajo que terminó por {reason}.

_________________________
{employeeName}
Cédula: {identifier}
`;