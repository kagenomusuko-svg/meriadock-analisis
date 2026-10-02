# ORDEN WORK 03 — Corrección post-auditoría y reaceptación

## Mandato

Trabaja directamente sobre:

kagenomusuko-svg/meriadock-analisis

Esta orden AUTORIZA modificar código de producción para corregir los hallazgos de la auditoría exhaustiva ya cerrada.

Lee completos, antes de tocar runtime:

1. PLAN_CORRECCION_POST_AUDITORIA.md
2. AUDITORIA_EXHAUSTIVA_METROLOGIA_CAUSAL.md
3. REGISTRO_DISCREPANCIAS_AUDITORIA.md
4. MATRIZ_TRAZABILIDAD_DOCTRINA_CODIGO.md
5. MATRIZ_COBERTURA_PRUEBAS.md
6. RESOLUCION_AUDITORIA_I_INV.md
7. ESTADO_AUDITORIA.md
8. INSTRUCCIONES_WORK_IMPLEMENTACION_METROLOGIA_CAUSAL.md
9. AUDITORIA_DEUDAS_IMPLEMENTACION.md
10. ESTADO_CORRECCION_POST_AUDITORIA.md
11. MAPA_MAESTRO_METROLOGIA_CAUSAL.md

No conviertas esta orden en una nueva fase de planeación. El plan ya existe. Debes ejecutar las correcciones, probarlas, comitearlas y continuar.

La regla de trabajo es:

corregir → probar → comparar con la auditoría → commit → marcar estado → continuar.

El usuario debe poder responder únicamente:

CONTINÚA

y debes retomar exactamente desde ESTADO_CORRECCION_POST_AUDITORIA.md.

---

# 1. Autonomía

Puedes resolver sin consultar toda decisión técnica que no cambie el significado doctrinal o matemático del sistema.

No te detengas por:

- refactors;
- nombres internos;
- reorganización de carpetas;
- schemas;
- validadores;
- manejo de errores;
- pruebas;
- CI;
- cambios de UI que sólo mejoren claridad/accesibilidad;
- serialización;
- snapshots;
- representación sparse;
- guardas numéricas;
- eliminación de legacy inactivo;
- actualización de dependencias no doctrinales;
- integración Vercel.

Detente sólo si una decisión nueva cambia:

- qué mide un operador;
- su fórmula;
- su dirección o signo;
- su objeto causal;
- la semántica de una variable;
- un umbral doctrinal;
- una regla de imputación;
- un protocolo taxonómico no definido por las fuentes.

Si aparece una decisión obligatoria:

1. crea DECISION_PENDIENTE_CORRECCION_<tema>.md;
2. marca únicamente esa tarea como BLOQUEADA;
3. continúa todo lo independiente;
4. detente sólo cuando ya no quede trabajo independiente.

---

# 2. Invariantes que NO debes reabrir

Durante esta orden trata como ya resuelto:

- humano discrimina; Taxonomía orienta; motor calcula;
- el núcleo no usa LLM;
- no se exige cargar documentos;
- familia, dominio y operador son dimensiones distintas;
- ninguna familia bloquea operadores;
- D es evento determinado y no entra en W_D ni en R*;
- E0 es cero epistémico;
- R* usa Perron–Frobenius;
- convención vigente: W_ij = w(N_i → N_j);
- ecuación: W R* = rho(W) R*;
- iteración de potencia como vía ordinaria;
- sparse para redes grandes;
- W_E separado de W_epsilon;
- epsilon no es evidencia;
- dato ausente != 0;
- S no se infiere de topología o Hijos;
- R*_neta = R*(1-S);
- alpha es asunción efectiva / condiciones adversas atribuibles y no conteo documental;
- Delta = R* - alpha;
- expediente no recalcula;
- los ejemplos pequeños son pedagógicos y no limitan el tamaño;
- empates no se resuelven por posición ni ID;
- I_inv quedó resuelto como brecha del diseñador por unidad de exceso del ejecutor:

  I_inv = |Delta_diseñador| / |Delta_ejecutor|.

La interpretación de I_inv es:

- >1: más brecha del diseñador que exceso del ejecutor;
- =1: magnitudes iguales;
- entre 0 y 1: el exceso del ejecutor es mayor;
- denominador 0: no calculable salvo que una regla futura explícita disponga otra cosa;
- 0/0: indeterminado;
- no uses epsilon oculto.

---

# 3. Objetivo de cierre

Debes corregir los hallazgos AU-01 a AU-18 conforme al plan, sin inventar doctrina.

La meta no es “hacer que los tests pasen”. La meta es que:

1. el hallazgo original deje de reproducirse;
2. exista una prueba de regresión;
3. la corrección respete las fuentes;
4. UI/API/motor/expediente coincidan;
5. CI quede verde;
6. producción quede desplegada;
7. una reauditoría de aceptación pueda concluir si el sistema ya es aceptable.

---

# 4. Fase 1 — P1 de corrección matemática y estructural

Ejecuta primero:

## 4.1 AU-01 / AU-02 — clausura y relaciones

Corrige:

- IDs de relación únicos;
- nivel de evidencia entero y válido;
- rangos válidos, finitos y no negativos;
- cierre distinguido entre declarado, no acreditado e inválido;
- D siempre externo;
- E0 no equivale a causalidad inexistente;
- una mera conexión hacia D no debe bastar para tratar el cierre como válido si sus propios datos son inválidos.

Añade pruebas para:

- cierre E0;
- cierre faltante;
- rango negativo;
- rango no finito;
- niveles -1, 9, fraccionarios;
- IDs repetidos;
- D nunca presente en W/R*.

## 4.2 AU-04 — overflow y finitud

Corrige B*, daño, AD y cualquier suma/producto que pueda generar Infinity o NaN.

Regla:

un input finito no puede terminar etiquetado como “calculado” si el resultado es no finito.

No conviertas Infinity a null por serialización.

Debes devolver indeterminación/error explícito con motivo.

Añade pruebas para:

- 1e308 + 1e308;
- cancelaciones grandes;
- beneficios signed si están autorizados;
- total 0;
- subnormales;
- overflow en AD.

## 4.3 AU-14 — robustez y empates

Elimina cualquier dependencia del orden de nodos para decidir A/B/C/D.

Representa rankings con empates como preórdenes o grupos de empate.

Si el protocolo vigente no adjudica un empate, devuelve indeterminación.

Prueba todas las permutaciones relevantes del mismo conjunto de valores.

La frontera de 10 puntos debe conservar la regla ya fijada: “mayor que 0.10”, no “mayor o igual”.

## 4.4 AU-03 — error recuperable en UI

Después de corregir schema/validación:

- duplicados y errores de entrada deben producir mensajes recuperables;
- no deben romper render;
- no deben borrar el borrador;
- el usuario debe poder corregir y continuar sin recargar.

Añade Playwright para duplicados, rangos inválidos e IDs inválidos.

Cierra Fase 1 sólo con tests y build verdes.

---

# 5. Fase 2 — trazabilidad, estados y coherencia entre capas

Ejecuta AU-05, AU-06, AU-09, AU-11, AU-12, AU-15 y AU-10.

## 5.1 Snapshot reproducible

Conserva en el resultado/auditoría:

- solicitud original relevante;
- estructura efectiva;
- insumos externos;
- configuración;
- taxonomiaVersion solicitada y efectiva;
- versión del motor;
- regularización;
- epsilon;
- K;
- estados faltantes;
- motivos de indeterminación.

El expediente debe poder explicar el cálculo sin reconstruir información que ya se perdió.

## 5.2 B* y unidades

UI y expediente deben mostrar:

- cuotas;
- total;
- unidad;
- base numérica;
- estado.

No muestres una cuota aislada como si fuese suficiente para interpretar el beneficio.

## 5.3 Estados visibles

Distingue de forma explícita:

- calculado;
- indeterminado;
- no aplicable;
- no solicitado;
- error.

No uses el mismo vacío visual para todos.

Las garantías PF deben mostrarse junto al resultado:

- convergencia;
- residuo;
- tolerancia;
- primitividad/diagnóstico;
- regularización aplicada.

## 5.4 rho

Si PF no converge, no llames al escalar “eigenvalor dominante” como si estuviera verificado.

Usa una etiqueta como “estimación de rho” y conserva residuo/estado.

## 5.5 Linter

El linter debe usar los mismos insumos efectivos normalizados que usa el motor.

No debe emitir ERR_DELTA_SIN_ALPHA si Delta se pudo calcular con alpha externo.

## 5.6 Sensibilidad extendida

Un resultado con muestras fallidas no puede aparecer simplemente “calculado”.

Conserva:

- total de muestras;
- convergentes;
- fallidas;
- motivos;
- completitud.

---

# 6. Fase 3 — Taxonomía efectiva, pilotos y accesibilidad

Ejecuta AU-07, AU-08 y AU-18.

## 6.1 Taxonomía efectiva

El sistema debe resolver realmente el protocolo versionado.

No basta con transportar taxonomiaVersion como string.

Debes poder:

- solicitar generico@1;
- resolverlo;
- rechazar versión inexistente;
- registrar versión efectiva;
- cambiar protocolo sin cambiar fórmulas;
- cambiar protocolo sin hardcodear nuevas preguntas en JSX;
- aplicar estrategias autorizadas por el protocolo.

No implementes todavía toda la Taxonomía General si no es necesaria para cerrar AU-07. Construye correctamente la frontera y el mecanismo.

## 6.2 Pilotos

Etiqueta explícitamente cuando algo es:

- piloto;
- genérico;
- dominio-específico;
- pendiente de protocolo.

No presentes el protocolo de tres componentes de S como si agotara universalmente S.

No presentes IIC de congruencia como cualquier otro IIC histórico.

## 6.3 Accesibilidad

Añade y verifica:

- aria-current en navegación;
- foco tras errores y cambios relevantes;
- aria-live para mensajes de estado;
- recorrido teclado;
- contraste medido;
- labels consistentes.

No declares certificación WCAG si sólo has hecho pruebas parciales.

---

# 7. Fase 4 — repertorio, reservas e I_inv

## 7.1 AU-13 — Fraude annona

Mantén Fraude annona reservado si no existe contrato canónico suficiente.

No reactives la fórmula legacy.

Haz visible su estado de reserva y la razón.

## 7.2 AU-17 — repertorio incompleto

Usa INVENTARIO_OPERADORES_Y_COBERTURA.md.

Para cada operador faltante conserva una clasificación:

- MAT — contrato matemático suficiente;
- TAX — necesita protocolo taxonómico;
- CON — conceptual, aún no programable;
- HIST — histórico/sustituido;
- FUERA — fuera del calculador general.

No implementes CON, TAX o conjeturas como si fueran operadores terminados.

Para MAT sí puedes implementar cuando:

- fórmula;
- inputs;
- precondiciones;
- casos límite;
- output;
- interpretación

estén completamente definidos por fuentes vigentes.

Cada nueva implementación debe tener tests canónicos.

## 7.3 I_inv — autorizado

Esta orden autoriza implementar I_inv porque la decisión doctrinal ya fue resuelta.

Contrato mínimo:

I_inv = |Delta_diseñador| / |Delta_ejecutor|.

Inputs:

- Delta del diseñador;
- Delta del ejecutor;
- identificación explícita de cuál nodo/rol cumple cada posición.

No infieras diseñador/ejecutor por nombre libre.

Si las posiciones no están discriminadas, el operador queda indeterminado.

Casos:

- denominador >0: calcular;
- denominador=0 y numerador>0: no calculable/indeterminado con motivo;
- 0/0: indeterminado;
- conserva signos originales de Delta en auditoría aunque la fórmula use valores absolutos.

Pruebas mínimas:

- .10/.56 ≈ .178571;
- .6/.3 = 2;
- .6/.4 = 1.5;
- denominador 0;
- 0/0;
- inversión de roles produce otro resultado y debe ser auditable.

Nombre visible:

Índice de inversión

Ayuda metodológica:

“Brecha del diseñador por unidad de exceso del ejecutor”.

---

# 8. Fase 5 — legacy de baja prioridad

Ejecuta AU-16 sólo después de que todo lo anterior esté verde.

Reubica, elimina o marca explícitamente legacy:

- escalas.js;
- espacio.js;
- hello.js;
- otros helpers inactivos detectados.

No borres una pieza si existen imports o valor histórico necesario para auditoría.

---

# 9. Pruebas y regresiones

No elimines los tests de auditoría que caracterizan defectos sin reemplazarlos por pruebas que demuestren la corrección.

Cuando un test de caracterización reproduce un bug:

1. conviértelo en una expectativa correcta;
2. conserva el caso;
3. documenta el hallazgo AU que cierra.

Mantén matrices:

hallazgo → cambio → test → commit.

---

# 10. CI y despliegue

Al final de cada fase:

- npm ci;
- npm test;
- npm run build;
- test UI;
- revisión de artifacts;
- commit.

Al final global:

- CI completo;
- deployment de producción READY;
- recorrido funcional en producción;
- prueba adversa de los bugs P1/P2 corregidos;
- revisión de errores runtime.

No confundas READY con aceptación.

---

# 11. Reauditoría de aceptación

Cuando todas las correcciones autorizadas estén terminadas, crea:

AUDITORIA_REACEPTACION_POST_CORRECCION.md

No repitas desde cero toda la auditoría histórica. Revisa:

- AU-01 a AU-18;
- invariantes centrales;
- regressions;
- matrices de trazabilidad;
- producción.

Conclusión permitida:

- ACEPTADO
- ACEPTADO_CON_RESERVAS
- NO_ACEPTADO
- DECISION_REQUERIDA

No marques ACEPTADO si queda un P1 abierto.

Actualiza:

ESTADO_CORRECCION_POST_AUDITORIA.md

con SHA por tarea y conclusión.

---

# 12. Política de commits

Commits pequeños, por hallazgo o conjunto coherente.

Ejemplos:

- fix: validar clausura y relaciones causales
- fix: rechazar resultados no finitos
- fix: hacer robustez invariante a permutación
- fix: recuperar UI ante entradas inválidas
- feat: conservar snapshot metrológico reproducible
- fix: alinear linter con insumos efectivos
- feat: resolver protocolos taxonómicos versionados
- feat: implementar índice de inversión
- test: cerrar regresiones de auditoría
- docs: cerrar reaceptación post-auditoría

Antes de marcar [x], el cambio y sus pruebas deben estar comiteados.

---

# 13. Condición de parada

Sólo detente cuando:

A. exista una decisión doctrinal nueva que no pueda resolverse con fuentes vigentes;

o

B. todas las correcciones autorizadas estén cerradas, CI esté verde, producción verificada y exista AUDITORIA_REACEPTACION_POST_CORRECCION.md.

En cualquier otro caso, continúa.
