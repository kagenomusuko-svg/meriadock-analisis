# Mapa maestro — Metrología causal / meriadock-analisis

## Propósito

Este documento es el mapa de continuidad del proyecto. Debe permitir retomar el trabajo en otro chat o sesión sin reconstruir decisiones ya tomadas.

No sustituye las fuentes doctrinales. Resume el estado de decisiones, implementaciones, auditorías y frentes pendientes.

---

# 1. Arquitectura general del paradigma

La arquitectura del paradigma del autor es:

- Ontología: **Autodeterminación causal**.
- Epistemología: **Metrología causal**.
- Praxis: **Mediación ontológica**.

Este repositorio implementa herramientas de Metrología causal. No debe convertir categorías instrumentales en afirmaciones ontológicas no justificadas.

Regla operativa general:

**humano discrimina e integra → Taxonomía orienta → motor calcula**.

El motor no descubre hechos, no sustituye la imputación humana y no convierte ausencia de soporte en inexistencia ontológica.

---

# 2. Objeto del calculador

El calculador general debe poder operar en tres grandes familias:

1. imputación causal;
2. compliance causal;
3. contabilidad ontológica.

Las familias orientan el propósito del análisis, pero **no restringen el repertorio matemático**.

Regla ya fijada:

**todas las familias deben poder calcular todos los operadores cuando existan sus insumos**.

La diferencia entre familias está en:

- qué se pregunta;
- qué se discrimina;
- cómo se calibra;
- qué significado práctico se atribuye al resultado;
- qué protocolos taxonómicos orientan la integración.

No en mutilar operadores por familia.

---

# 3. D, grafo y clausura

D es el **evento determinado**, es decir, el resultado o fenómeno cuya estructura causal se analiza.

Decisión vigente:

- D delimita la pregunta antes de construir la matriz;
- D puede aparecer descriptivamente en la interfaz;
- D no entra en W_D;
- D no recibe coordenada en R*.

Cadena conceptual:

D → N_D → A_D → W_D → R*.

Debe distinguirse:

- grafo descriptivo con D;
- grafo/metrología operativa sin D.

La existencia de una arista o cierre no puede sustituir la validación del propio soporte/rango.

---

# 4. E0

E0 es un **cero epistémico**.

Significa:

“en este análisis no está materialmente acreditada la transición causal propuesta”.

No significa:

“está acreditado que no existe causalidad”.

Formalmente:

E0 no equivale a negar ontológicamente C(i,j).

La UI y el expediente deben conservar esta fuerza predicativa limitada.

---

# 5. R* — Índice de convergencia de eventos

Nombre visible actual:

**Índice de convergencia de eventos**.

Perron–Frobenius es canónico.

Convención vigente:

W_ij = w(N_i → N_j).

Ecuación:

W R* = rho(W) R*.

Normalización:

sum_i R*_i = 1.

Método computacional ordinario:

iteración de potencia con normalización L1.

Las “rondas” pueden mostrarse pedagógicamente en grafos pequeños, pero no sustituyen el operador PF.

Para grafos grandes:

- representación sparse;
- multiplicación O(|E|) por iteración;
- auditoría resumida;
- sin límite conceptual pequeño de nodos.

Los ejemplos aritméticos de libros pequeños muestran el proceso mental; no imponen tamaño máximo del método.

---

# 6. Regularización

Debe separarse:

W_E = matriz empírica

de

W_epsilon = W_E + epsilon K.

Reglas:

- epsilon no es evidencia;
- K no crea hechos acreditados;
- W_E no se sobrescribe;
- regularización debe ser auditable;
- cualquier sensibilidad en epsilon debe ser explícita;
- no usar epsilon oculto para resolver divisiones o ausencia de datos.

---

# 7. S — Índice de sustituibilidad

Nombre visible:

**Índice de sustituibilidad**.

No debe calcularse automáticamente desde:

- norma L2 del grafo;
- centralidad;
- Hijo/modo;
- posición topológica.

S se obtiene desde componentes discriminados conforme al protocolo aplicable.

Forma genérica actualmente admitida:

S = suma(p_k s_k) / suma(p_k),

o promedio simple cuando el protocolo no usa pesos.

El protocolo de tres componentes es piloto/genérico, no exhaustividad ontológica de S.

Dato faltante no se transforma en cero.

---

# 8. R*_neta

Nombre visible:

**Contribución atribuible**.

Fórmula vigente:

R*_neta = R*(1-S).

Si falta S:

R*_neta queda indeterminada.

No debe inventarse S para producir una salida.

---

# 9. alpha

Nombre visible en interfaz:

**Condiciones adversas atribuibles**.

Ayuda metodológica:

**Asunción efectiva**.

No es intención psicológica.

No se calcula por:

- cantidad de documentos;
- densidad de referencias;
- cantidad de dominios.

Estrategias admitidas en el diseño actual:

- valor discriminado;
- proporción monetaria comparable;
- protocolo taxonómico versionado.

Puede incluir consecuencias voluntarias o impuestas, siempre que correspondan al objeto definido por el protocolo.

---

# 10. Delta

Nombre visible:

**Asimetría repercusiva**.

Fórmula:

Delta_i = R*_i - alpha_i.

Sin clamp universal.

Sin umbrales universales.

Debe conservar signo:

- positivo;
- cero;
- negativo.

Interpretaciones más específicas pertenecen al protocolo, no a la resta universal.

---

# 11. IIC

El runtime actual usa un IIC de congruencia:

coincidencias / declarado,

cuando existen insumos suficientes.

No debe restringirse automáticamente a nodo “diseño”.

Debe distinguirse de otros IIC históricos si las fuentes usan la sigla para otro objeto.

Su alcance debe quedar versionado/etiquetado.

---

# 12. Fraude annona

El operador existe como reserva, no como fórmula canónica cerrada.

Una fórmula legacy anterior fue:

R*(1-alpha)*(1-IIC),

pero **no debe reactivarse como definición universal**.

Conceptualmente el usuario lo ha descrito como:

“aquello que el diseñador pudo hacer para evitar que algo sucediera y no hizo”.

Hasta que exista contrato canónico completo:

- mantener reservado;
- devolver indeterminación;
- no llamar fraude a un mero producto numérico.

---

# 13. B*

B* es distribución de beneficio.

Fórmula general:

B*_i = B_i / sum_j B_j.

Debe conservar:

- beneficios de entrada;
- unidad;
- total;
- cuotas.

Total cero:

no aplicable.

No inferir beneficios.

Work03 cerró AU-05: UI/HTML conservan total/unidad/base numérica/cuotas/estado.

---

# 14. Daño y ajuste debitor

D_total:

D_total = T_invertido + T_impedido + DeltaT_trayectoria.

Reglas:

- unidades comparables;
- sin estimación automática del 30%;
- dato faltante → indeterminado.

Ajuste debitor:

AD_i = R*_i D_total.

El contrato vigente usa R* bruto, no R*_neta, salvo futura decisión explícita.

---

# 15. I_inv — Índice de inversión

Decisión doctrinal ya resuelta.

I_inv mide:

**brecha del diseñador por unidad de exceso del ejecutor**.

Fórmula:

I_inv = |Delta_diseñador| / |Delta_ejecutor|.

Interpretación:

- >1: la brecha del diseñador es mayor;
- =1: magnitudes iguales;
- 0<I_inv<1: el exceso del ejecutor es mayor.

Monotonicidad manteniendo la otra variable fija:

- crece con la brecha del diseñador;
- decrece con el exceso del ejecutor.

Ejemplo bancario:

0.10 / 0.56 ≈ 0.18.

Eso significa 0.18 unidades de brecha del diseñador por unidad de exceso del ejecutor.

El recíproco 5.6 sólo es lectura descriptiva; no redefine el índice.

Casos límite:

- denominador 0 con numerador positivo → no calculable/indeterminado;
- 0/0 → indeterminado;
- sin epsilon oculto;
- conservar signos originales de Delta en auditoría.

Archivo doctrinal de resolución:

RESOLUCION_AUDITORIA_I_INV.md.

---

# 16. Robustez y sensibilidad

Sensibilidad canónica:

- mínimo;
- central;
- máximo.

Robustez A/B/C/D se usa en el protocolo vigente.

Reglas ya fijadas:

- empate de líder → no inventar desempate;
- empate secundario tampoco puede resolverse por posición o ID;
- rankings con empate deben tratarse como grupos/preórdenes;
- frontera de 10 puntos: estrictamente >0.10 cuando esa regla sea aplicable.

Sensibilidad extendida debe ser determinista.

No Math.random sin semilla/registro.

---

# 17. Evidencia, referencias y expediente

El calculador no necesita almacenar el expediente fuente.

Distinción:

evidencia utilizada != evidencia almacenada por el calculador.

Declarar que existe una fuente != subir la fuente.

El programa debe registrar:

- qué declaró el analista;
- qué relación/rango usó;
- referencias opcionales;
- qué calculó;
- con qué versión/configuración.

No debe afirmar:

“el documento prueba X”

si nunca leyó el documento.

El producto es un **expediente metrológico del análisis**, no el expediente jurídico/administrativo/médico fuente.

---

# 18. Asistente determinista

No LLM en el núcleo.

Flujo:

humano escribe/discrimina → validador taxonómico → humano corrige/completa → motor calcula.

Mensajes:

- ERROR: no puede calcularse o estructura inválida;
- WARN: cálculo posible con deuda;
- INFO: orientación metodológica.

Mismo estado → mismo mensaje.

No parser “inteligente” que invente semántica.

---

# 19. Taxonomía

La Taxonomía General de Aplicaciones vive en Paradigma.

Work03 cerró AU-07: loader/registry resuelven realmente la versión, validan el dominio, aplican estrategias autorizadas y conservan protocolo/versión efectiva. La UI consume preguntas/componentes del catálogo; genérico@1 sigue siendo piloto y no toda la Taxonomía General.

No debe hardcodearse toda la Taxonomía dentro de JSX.

Arquitectura aplicada:

protocolo versionado → loader/registry → preguntas/campos/reglas → inputs discriminados → motor universal.

Cambiar protocolo no debe exigir reescribir fórmulas.

Añadir dominio no debe exigir reconstruir motor.

---

# 20. Repertorio universal

La auditoría inventarió 45 grupos/constructos frente a un REGISTRY mucho menor.

Antes de Work03, entre los faltantes o incompletos aparecían:

- Shapley;
- recurrencia;
- exposición;
- intervención;
- prevención;
- instrumentalidad;
- causalidad de beneficio;
- DeltaB;
- conversión vital;
- J;
- Id;
- H;
- ROI;
- IAS;
- ablación/distancia;
- otros históricos o fuera de alcance.

Work03 incorpora I_inv, Shapley, DeltaB absoluta, conversión vital, J, ROI neto, IAS y distancia V con contratos y pruebas. Estado por los 45 registros: REPERTORIO_POST_CORRECCION.md. No todo lo inventariado debe implementarse inmediatamente.

Clasificación obligatoria:

- MAT: matemáticamente listo;
- TAX: necesita taxonomía;
- CON: concepto aún no programable;
- HIST: histórico/sustituido;
- FUERA: fuera del calculador general.

Tres familias siguen debiendo poder usar cualquier operador que llegue a estar implementado y cuyos insumos existan.

---

# 21. Historial del trabajo en este repo

## Etapa A — rescate del prototipo

Se inspeccionó el repo legacy y se detectaron:

- PF relegado;
- suma de caminos usada como R*;
- S inventado por topología/Hijos;
- alpha por conteo documental;
- Delta con umbrales arbitrarios;
- IIC desconectado;
- daño cortado por API;
- expediente recalculando;
- IA generativa/Supabase;
- aleatoriedad y deuda de robustez.

Se crearon:

- INSTRUCCIONES_WORK_IMPLEMENTACION_METROLOGIA_CAUSAL.md
- AUDITORIA_DEUDAS_IMPLEMENTACION.md.

## Etapa B — Work 01

Se creó:

- ORDEN_WORK_01_EJECUCION_AUTONOMA.md
- ESTADO_IMPLEMENTACION.md.

Work cerró 9 bloques.

Resultado:

- runtime determinista;
- PF sparse;
- D separado;
- operadores independientes;
- UI/expediente conectados;
- sin Supabase;
- sin Anthropic;
- CI verde.

## Etapa C — Work 02

Se creó:

- ORDEN_WORK_02_AUDITORIA_EXHAUSTIVA.md
- ESTADO_AUDITORIA.md.

Work ejecutó 12 auditorías y añadió matrices, fixtures, pruebas y evidencia sin modificar runtime.

Conclusión:

NO_ACEPTADO.

Hallazgos:

- 0 P0;
- 5 P1;
- 12 P2;
- 1 P3.

44 pruebas pasaban en la versión auditada, pero tests verdes no equivalían a aceptación doctrinal.

## Etapa D — decisión I_inv

La auditoría detectó contradicción entre fórmula, interpretación y monotonicidad.

El autor resolvió:

conservar fórmula y ejemplo; corregir interpretación/monotonicidad.

Se creó:

RESOLUCION_AUDITORIA_I_INV.md.

Ya no quedan decisiones doctrinales pendientes heredadas de la auditoría.

## Etapa E — Work 03

CERRADO: plan ejecutado bajo ORDEN_WORK_03_CORRECCION_POST_AUDITORIA.md. Cinco fases comiteadas y verificadas, 75 pruebas, CI completo/producción exacta. Conclusión: ACEPTADO_CON_RESERVAS. Informe vigente: AUDITORIA_REACEPTACION_POST_CORRECCION.md.

---

# 22. Hallazgos históricos cerrados por Work03

P1:

- AU-01 clausura insuficientemente validada;
- AU-02 schema de relaciones incompleto;
- AU-04 overflow con inputs finitos;
- AU-07 Taxonomía declarada pero no realmente aplicada;
- AU-14 robustez dependiente de posición en empate secundario.

P2:

- AU-03 UI se rompe ante duplicado;
- AU-05 B* pierde total/unidad en presentación;
- AU-06 snapshot insuficiente;
- AU-08 pilotos sin alcance visible;
- AU-09 estados poco diferenciados;
- AU-10 validación global limita independencia;
- AU-11 linter no ve alpha externo;
- AU-12 rho mal etiquetado en no convergencia;
- AU-13 fraude annona reservado;
- AU-15 sensibilidad con muestras fallidas;
- AU-17 repertorio incompleto;
- AU-18 accesibilidad/orientación parcial.

P3:

- AU-16 helpers históricos inactivos.

---

# 23. Estado actual

Work02: auditoría histórica cerrada con NO_ACEPTADO para la versión previa; no describe el runtime corregido actual.

Work03: CERRADO — ACEPTADO_CON_RESERVAS. AU-01–AU-18 atendidos conforme al plan; 0 P0/P1 abierto. I_inv RESUELTO E IMPLEMENTADO, sin nueva decisión obligatoria.

Último cambio runtime: f49f69921de96a4a9be5771e92c9068fea077fba. Revisión exacta de reaceptación: 7aa0937827ad90fc894bb6c39fc42b28e380b435; CI37082233427 SUCCESS (verificar y producción), deployment dpl_JEAzkGf5cwBXS7Vop66ZCRD9JeYS READY, recorrido completo/adverso y artifacts revisados. Los commits documentales posteriores conservan ese runtime.

Repertorio efectivo: 20 entradas, 19 contratos y Fraude annona reservado. Todos disponibles por familia cuando existen sus insumos. Taxonomía genérica piloto, constructos sin contrato y accesibilidad integral conservan reservas explícitas.

Documentos operativos vigentes:

- ESTADO_CORRECCION_POST_AUDITORIA.md.
- AUDITORIA_REACEPTACION_POST_CORRECCION.md.
- MATRIZ_CORRECCION_POST_AUDITORIA.md.
- REPERTORIO_POST_CORRECCION.md.

Ninguna tarea autorizada independiente queda abierta. Una ampliación futura requiere nueva orden y fuentes completas; no reabrir las decisiones resueltas.

---

# 24. Regla para futuros chats

Antes de proponer cambios:

1. leer este mapa;
2. leer el estado operativo vigente;
3. leer el último informe de aceptación/reaceptación;
4. no reabrir decisiones ya cerradas salvo que aparezca contradicción nueva de fuente;
5. usar GitHub como estado de verdad del código;
6. usar Paradigma/ideas como fuentes doctrinales;
7. distinguir código legacy de autoridad conceptual.

---

# 25. Prompt mínimo para retomar en otro chat

Usa este texto:

“Trabajamos en kagenomusuko-svg/meriadock-analisis. Lee MAPA_MAESTRO_METROLOGIA_CAUSAL.md y el archivo ESTADO_* vigente antes de responder. No reconstruyas decisiones desde memoria. Continúa desde el último punto seguro, respetando las invariantes y fuentes allí registradas.”

---

# 26. Repositorios relacionados

Principal de implementación:

- kagenomusuko-svg/meriadock-analisis

Fuentes doctrinales:

- kagenomusuko-svg/Paradigma

Especificaciones/postulados complementarios:

- kagenomusuko-svg/ideas

La Taxonomía completa pertenece al corpus de Paradigma y su computabilización debe mantenerse separada del núcleo matemático.

---

# 27. Principio de continuidad

Cuando exista duda entre:

“esto ya se decidió”

y

“esto requiere una nueva decisión”,

primero busca en:

- MAPA_MAESTRO_METROLOGIA_CAUSAL.md;
- RESOLUCION_AUDITORIA_I_INV.md;
- AUDITORIA_EXHAUSTIVA_METROLOGIA_CAUSAL.md;
- PLAN_CORRECCION_POST_AUDITORIA.md;
- INSTRUCCIONES_WORK_IMPLEMENTACION_METROLOGIA_CAUSAL.md;
- estados operativos.

Sólo escala al autor cuando la cuestión siga siendo doctrinalmente indeterminada después de esa revisión.



---

# 28. Etapa F — Work 04: Taxonomía computable y Fraude annona

Siguiente frente autorizado en preparación:

- `ORDEN_WORK_04_TAXONOMIA_COMPUTABLE_Y_FRAUDE_ANNONA.md`
- `ESTADO_TAXONOMIA_COMPUTABLE.md`

Objetivo:

1. compilar U·1–U·4 y capítulos 1–78 de la Taxonomía General de Aplicaciones como protocolos declarativos versionados y trazables;
2. mantener la separación entre motor universal y protocolo de dominio;
3. hacer que la UI consuma preguntas/rangos/estrategias desde protocolos, no desde hardcodes;
4. preservar el estatus epistemológico de cada regla (canónica, derivada, pendiente de calibración, ilustrativa, histórica, reservada, no computable);
5. activar Fraude annona como operador matemático canónico:

[
F_A = R^*(1-alpha)(1-IIC)
]

con nodo de diseño e IIC explícitamente discriminados.

Regla de seguridad: no sustituir esta fórmula por (Delta(1-IIC)), porque con la definición vigente (Delta=R^*-alpha) no son algebraicamente equivalentes.

El umbral 0.20, cuando aparezca en la fuente, no se convierte en umbral universal del motor: sólo puede entrar como interpretación protocolaria de dominio con procedencia y estatus explícitos.

Estado al crear esta etapa: Work03 permanece ACEPTADO_CON_RESERVAS; Work04 aún no ejecutado.


## 29. Avance efectivo Work04 — sin cierre de cobertura

La reserva de Fraude de Work03 queda sustituida para el runtime vigente por la ratificación de Work04: MAT R*×(1−α)×(1−IIC), diseñador activo/rol/variante explícitos; faltante indetermina. No Δ×(1−IIC), umbral universal ni calificación automática. Las menciones anteriores de reserva describen el estado histórico Work03.

Schema taxonomia/1 y Universal U1–U4, overlays tax-cap01@1 (penal/civil) y tax-cap02@1 (laboral), orientación UI desde datos y confirmación S separada. E0, PF derecho sparse, D fuera de W/R*, epsilon separado, signed Δ y familias sin restricciones se preservan. IIC histórico no se ejecuta como congruencia.

Cobertura vigente: 6/82 capítulos; 3–78 SIN_REVISAR. No se declara cerrado Work04. La extensión continua de U4 está reservada, sin equipararla a robustez de tres escenarios. α nominal laboral presenta contradicción literal, aislada en DECISION_PENDIENTE_TAX_ALPHA_NOMINAL_WORK04.md; el resto continúa independiente. MATRIZ_COBERTURA_TAXONOMIA.md y ESTADO_TAXONOMIA_COMPUTABLE.md gobiernan el avance. Auditoría actual: NO ACEPTADO POR COBERTURA INCOMPLETA.

## 30. Cierre Work04 — cobertura computable completa

Work04 queda implementado y auditado: U·1–U·4 y `tax-cap01@1`…`tax-cap78@1` están registrados como overlays declarativos versionados, cada uno con sourceRef/blobSHA al corpus Paradigma, reglas epistemológicas, escalas/rangos presentes, preguntas, observables, S/α/IIC, operadores y condiciones. La UI consume el registro dinámico y conserva protocolo/versión en snapshot y expediente. La cobertura estricta informa 82/82 y cero `SIN_REVISAR`.

Fraude annona está activo con `R*(1-α)*(1-IIC)` y diseñador/rol/ID/variante explícitos. La reserva doctrinal `cap02.alpha.1` no tiene efecto computacional; U·4 mantiene reservada la extensión continua. La auditoría de aceptación documenta las pruebas y el dictamen final.
