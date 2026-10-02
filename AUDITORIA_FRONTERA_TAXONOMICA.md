# Auditoría 7 — Frontera taxonómica

Regla: instrucciones §§16/22, orden02 §§4.6–7/12. No se construye durante auditoría la Taxonomía computable. Fuente de comparación: Taxonomía capítulos1–78 y U·1–U·4; Metrología I ParteIII; resoluciones S/HISTOS/SDO.

| Acoplamiento | Clasificación | Observado / estado |
|---|---|---|
| Fórmulas PF, neta, Δ, AD | legítimo universal dentro contrato actual | No se seleccionan por nombre de dominio; CONFORME |
| GENERICO.componentesS 3 criterios | piloto temporal autorizado §12 | UI importa directamente la constante; no dice claramente piloto; CONFORME_CON_RESERVA AU-08 |
| taxonomiaVersion='generico@1' en adaptador | violación de separación para sustitución de protocolo | Entrada externa otro@2 ignorada; AUD-07. PARCIAL P1 AU-07 |
| validarProtocolo/registry/loader JSON | interfaz modular parcial | Registra y clona, controla versión repetida y campos/rangos; no verifica correspondencia con contrato de operador. El test existente sólo prueba almacenamiento |
| API fuente.taxonomiaVersion libre | deuda/violación de validación | Cadena desconocida puede acompañar resultado sin carga/version resuelta. No acredita que protocolo haya sido aplicado |
| alpha taxonomico | deuda taxonómica | Helper recibe función; orquestador nunca pasa función ni ID de estrategia. Selección UI produce null |
| fraude protocoloFraude con función | deuda taxonómica | JSON HTTP no puede transportar funciones; no loader de funciones autorizadas por versión |
| E1–E8 lista en JSX | piloto/deuda taxonómica | No contiene tabla de rangos, no transforma soporte→peso; universales no demostrados por corpus; nivel no validado API |
| familias/tipos/MODOS/nomenclatura | legítimo vocabulario actual | Familia no filtra repertorio. Modo indeterminado, observaciones no producen S/α |
| escalas.js dominios/rangos/default0 | legacy inactivo, P3 AU-16 | Sin import en ruta actual; no se usa como autoridad. Eliminar/reubicar requeriría orden de corrección |
| Preguntas/contextos específicos de dominio | deuda pendiente | GENERICO preguntas/rangos vacíos; orientador reglas comunes en linter, no árbol Taxonomía |

Registrar un protocolo nuevo sin cambiar fórmulas sí es posible en el Map; **aplicarlo efectivamente a UI→API→motor→expediente sin editar JSX no está implementado**. La afirmación de cierre del bloque9 anterior fue más fuerte que su prueba. Debe corregirse estado de aceptación, no fingir que loader aislado satisface interfaz completa.

Ausencia de Taxonomía no habilita inferir perfiles/Hijos, rango E por número de soporte, asunción psicológica ni instrumentalidad. El motor actual evita esas inferencias y conserva indeterminación. Protocolo genérico es piloto para declaraciones directas, sin equivalencia empírica certificada con los 78 dominios.

Precondiciones futuras: resolver versión real, validar dominio/operador/estrategia, aplicar esquema desde protocolo en UI, registrar versión/inputs, mantener fórmulas separadas. No se ejecuta esa integración ahora. Decisión obligatoria: no, la separación exigida ya está definida; formalización de dominios es trabajo posterior.
