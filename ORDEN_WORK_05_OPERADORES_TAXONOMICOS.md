# ORDEN WORK 05 — Activación de operadores taxonómicos y cierre de reservas operativas

## Mandato

Trabaja sobre:

kagenomusuko-svg/meriadock-analisis

Punto de partida:

- Work03: ACEPTADO_CON_RESERVAS.
- Work04: ACEPTADA CON RESERVAS EXPLÍCITAS.
- Taxonomía compilada: U·1–U·4 + tax-cap01@1…tax-cap78@1.
- Cobertura: 82/82.
- Reglas declarativas: 1.094.
- Fraude annona: activo.
- Reserva doctrinal específica: cap02.alpha.1.
- Extensión continua de U·4: reservada como extensión matemática, no equiparada a robustez de tres escenarios.

Lee antes de modificar runtime:

1. MAPA_MAESTRO_METROLOGIA_CAUSAL.md
2. AUDITORIA_ACEPTACION_TAXONOMIA_COMPUTABLE.md
3. ESTADO_TAXONOMIA_COMPUTABLE.md
4. REPERTORIO_POST_CORRECCION.md
5. CATALOGO_TAXONOMIA_COMPUTABLE.md
6. MATRIZ_COBERTURA_TAXONOMIA.md
7. DECISION_PENDIENTE_TAX_ALPHA_NOMINAL_WORK04.md
8. INSTRUCCIONES_WORK_IMPLEMENTACION_METROLOGIA_CAUSAL.md
9. Las fuentes concretas de Paradigma referidas por cada operador.

Objetivo:

Usar la Taxonomía ya compilada para determinar qué operadores TAX/CON previamente reservados pueden convertirse ahora en contratos computables sin inventar doctrina; implementar sólo los que hayan quedado suficientemente determinados y conservar reservas explícitas en los demás.

No conviertas “la Taxonomía menciona un concepto” en “el motor ya tiene una fórmula”.

Regla:

inventario → contrato fuente → suficiencia → implementación o reserva → pruebas → commit → estado → continuar.

El usuario debe poder responder únicamente:

CONTINÚA

y debes retomar desde ESTADO_WORK05_OPERADORES_TAXONOMICOS.md.

---

# 1. Autonomía y criterio de bloqueo

Puedes decidir sin consultar:

- schemas;
- tipos;
- loaders;
- adaptadores;
- registro de operadores;
- estructura UI;
- nombres internos;
- pruebas;
- serialización;
- validación;
- manejo de estados;
- optimización;
- CI.

No puedes decidir por tu cuenta:

- una fórmula ausente;
- un umbral doctrinal;
- una calibración empírica inexistente;
- una función contrafactual no definida;
- un modelo probabilístico sólo ilustrativo;
- equivalencia entre dos operadores distintos;
- una reasignación que pueda producir doble conteo;
- una regla de dominio que la fuente presenta como pendiente.

Cuando falte una decisión:

- crea DECISION_PENDIENTE_WORK05_<tema>.md;
- marca sólo ese contrato como bloqueado;
- continúa todo lo independiente.

---

# 2. Invariantes

No reabrir:

- humano discrimina; Taxonomía orienta; motor calcula;
- todas las familias pueden usar todos los operadores si existen sus insumos;
- D fuera de W_D y R*;
- E0 epistémico;
- PF derecho;
- W_E separado de W_epsilon;
- ausencia != 0;
- S no automático por topología;
- alpha efectiva, no conteo documental;
- Delta = R* - alpha;
- I_inv resuelto;
- Fraude annona = R*(1-alpha)*(1-IIC);
- protocolos versionados;
- UI declarativa;
- expediente no recalcula;
- no LLM en runtime.

---

# 3. Reauditar el repertorio contra la Taxonomía ya compilada

Toma los 45 registros de REPERTORIO_POST_CORRECCION.md.

Para cada operador, crea una ficha:

- ID;
- clase histórica MAT/TAX/CON/HIST/FUERA;
- fuentes;
- protocolos de dominio que lo mencionan;
- inputs necesarios;
- fórmula/regla;
- condiciones;
- calibraciones;
- casos límite;
- outputs;
- interpretación;
- estado actual;
- suficiencia después de Work04.

Estados nuevos permitidos:

- ACTIVO
- LISTO_PARA_IMPLEMENTAR
- TAXONOMIA_SUFICIENTE
- REQUIERE_CALIBRACION
- REQUIERE_DECISION
- RESERVADO_CONCEPTUAL
- HISTORICO
- FUERA

Produce:

MATRIZ_SUFICIENCIA_OPERADORES_WORK05.md

No cierres mientras exista un operador SIN_REVISAR.

---

# 4. Prioridad de revisión

Revisa especialmente los reservados actuales:

- OP13 Recurrencia.
- OP14 Exposición.
- OP15 Intervención / prevención.
- OP17 Instrumentalidad / reasignación R*_efectivo.
- OP18 R*_B.
- OP22 Impunidad del diseñador I_d.
- OP23 Herencia H.
- OP24 Opacidad.
- OP25 Probabilidades sectoriales.
- OP26 aliases sectoriales.
- OP32 Shapley deportivo / S_B.
- OP34 Contrafactual / ablación / bifurcación.
- OP35 S_prob / S_op / S_est.
- OP39 Delta_neto / Delta_idiosincrático.
- OP40 beta / reconocimiento / tributo.
- OP45 Contribución contrafactual.

No asumas que todos deben implementarse.

---

# 5. Regla de suficiencia

Un operador sólo puede implementarse si están definidos:

1. objeto medido;
2. inputs;
3. unidades;
4. fórmula/regla;
5. dominio o condición de aplicabilidad;
6. tratamiento de ausencia;
7. tratamiento de cero;
8. casos límite;
9. interpretación permitida;
10. procedencia/version;
11. al menos un caso canónico o propiedad verificable.

Si falta uno de 1–9 y no puede derivarse inequívocamente de una fuente vigente:

RESERVAR.

---

# 6. Recurrencia y exposición

No confundir REC con recurrencia.

Para recurrencia:

- verificar si los 78 overlays contienen una regla temporal/probabilística verdaderamente calibrada;
- si sólo hay frecuencias ilustrativas o fórmulas sectoriales candidatas, mantener REQUIERE_CALIBRACION;
- no predecir recurrencia desde R*, S, alpha o IIC sin fuente explícita.

Para exposición:

- exigir oportunidades, ventana temporal, base comparable y unidad;
- no inferir exposición desde centralidad;
- si la Taxonomía ya fija contratos suficientes por dominio, implementar como operador protocolario versionado.

---

# 7. Intervención y prevención

Separar:

- identificación de una intervención;
- efecto contrafactual;
- costo;
- DeltaP;
- ROI prevención;
- prevención como clasificación/medición.

ROI prevención ya está activo como MAT con DeltaP externo.

No conviertas eso en modelo predictivo de eficacia.

Una intervención sólo puede generar un contrafactual si el protocolo define cómo construir G' o los inputs alternativos.

---

# 8. R*_B y beneficio

No confundir:

- B* = cuota de beneficio directo;
- R*_B = convergencia causal en un grafo de beneficio;
- Delta_B = brecha de beneficio.

Si R*_B queda suficientemente tipado después de Work04:

- crear contrato separado de grafo de beneficio;
- usar PF sólo si las fuentes vigentes autorizan esa estructura;
- mantener D_B y unidades semánticamente distintas del grafo de daño.

No reutilizar B* como R*_B.

---

# 9. Instrumentalidad y reasignación

No implementar una reasignación R*_efectivo si puede duplicar o borrar contribución sin regla explícita.

Exigir:

- diseñador;
- ejecutor;
- mecanismo de instrumentalidad;
- criterio de detección;
- distribución/reasignación;
- conservación o no del total;
- tratamiento de múltiples diseñadores/ejecutores.

Si no existe contrato inequívoco, mantener reservado.

---

# 10. Contrafactual, ablación y V(G,G')

V(G,G') ya está activo como distancia entre vectores comparables.

No confundirlo con:

- contribución contrafactual;
- ablación de nodo;
- efecto de intervención.

Para activar ablación debe existir una regla explícita sobre:

- qué se elimina/modifica;
- cómo se reconstruye W';
- cómo se trata D;
- cómo se recalcula;
- qué magnitud se compara.

Si la Taxonomía sólo indica “analizar contrafactual”, no inventes la transformación.

---

# 11. S_prob / S_op / S_est

No equiparar automáticamente estos estimandos.

Usa las fuentes/resoluciones vigentes para determinar:

- si son versiones históricas;
- si son operacionalizaciones por dominio;
- si son componentes;
- si alguno debe permanecer fuera del contrato universal.

No sustituir S vigente sin decisión doctrinal.

---

# 12. Modelos probabilísticos sectoriales

Probabilidades de impago, quiebra, colapso, recurrencia, etc.:

- sólo implementar si existe calibración autorizada;
- coeficientes ilustrativos no son modelos predictivos;
- no convertir ejemplos logísticos en producción;
- registrar horizonte, población, variables y versión de calibración.

Si falta calibración: REQUIERE_CALIBRACION.

---

# 13. cap02.alpha.1

Mantener RESERVADO hasta decisión autoral.

No dejar que esta reserva bloquee Work05.

El contrato alpha efectivo general permanece activo.

---

# 14. U·4 extensión continua

Revisar por separado.

No equiparar:

- robustez de tres escenarios;
- muestreo de hipercubo;
- cobertura de todo el producto cartesiano continuo.

Si la fuente exige garantía sobre todo el continuo, determinar si existe un algoritmo formalmente suficiente.

Si no:

RESERVADO_MATEMATICO.

No simular “todo el continuo” con muestras finitas.

---

# 15. UI de disponibilidad de operadores

La UI debe poder mostrar, para el dominio/protocolo elegido:

- operador ACTIVO;
- operador disponible si se aportan insumos;
- operador reservado;
- operador pendiente de calibración;
- operador fuera del calculador.

Nunca ocultar un operador sólo porque no sea típico del dominio si matemáticamente puede calcularse con inputs explícitos.

La Taxonomía orienta; no bloquea familias ni repertorio.

---

# 16. Implementación de nuevos operadores

Para cada operador que pase a LISTO_PARA_IMPLEMENTAR:

1. crear contrato;
2. crear módulo matemático si procede;
3. registrar en REGISTRY;
4. conectar UI declarativa;
5. conectar API;
6. snapshot;
7. expediente;
8. nomenclatura;
9. tests canónicos;
10. casos adversos;
11. documentación de alcance.

No implementar varios operadores en un único commit si pueden separarse.

---

# 17. Pruebas

Añadir pruebas de:

- suficiencia/rechazo de contrato;
- ausencia != 0;
- unidades;
- estados;
- no uso de defaults;
- compatibilidad con todas las familias;
- protocolo solicitado/efectivo;
- UI/API/motor/expediente;
- determinismo;
- trazabilidad;
- casos límite.

Mantener las 90 pruebas existentes.

---

# 18. Productos finales

Crear:

- MATRIZ_SUFICIENCIA_OPERADORES_WORK05.md
- CATALOGO_OPERADORES_ACTIVOS_WORK05.md
- REGISTRO_RESERVAS_POST_WORK05.md
- AUDITORIA_ACEPTACION_WORK05.md
- ESTADO_WORK05_OPERADORES_TAXONOMICOS.md actualizado
- MAPA_MAESTRO_METROLOGIA_CAUSAL.md actualizado
- REPERTORIO_POST_CORRECCION.md actualizado

La auditoría final debe distinguir:

- operador activo;
- operador computable sólo con protocolo;
- operador pendiente de calibración;
- operador bloqueado doctrinalmente;
- operador conceptual;
- operador fuera del calculador.

---

# 19. CI y producción

Al cerrar:

- npm ci;
- npm test;
- npm run build;
- Playwright;
- casos adversos;
- producción exacta;
- artifact;
- revisión runtime;
- snapshot/expediente.

No concluir aceptación sólo por CI verde.

---

# 20. Condición de cierre

Work05 cierra cuando:

1. los 45 registros estén reevaluados;
2. no exista SIN_REVISAR;
3. todos los operadores implementables sin nueva doctrina estén activos;
4. los no implementables tengan reserva concreta y causa;
5. UI muestre disponibilidad/estado;
6. pruebas/build/CI/producción estén verdes;
7. exista AUDITORIA_ACEPTACION_WORK05.md.

Si una decisión doctrinal nueva aparece, documenta sólo esa decisión y continúa todo lo independiente.
