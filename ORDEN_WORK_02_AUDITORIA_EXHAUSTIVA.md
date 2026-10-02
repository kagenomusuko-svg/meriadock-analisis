# ORDEN WORK 02 — Auditoría exhaustiva doctrinal, matemática y de implementación

## Mandato

Trabaja sobre:

kagenomusuko-svg/meriadock-analisis

Esta orden NO es una nueva implementación. Es una auditoría exhaustiva de aceptación del sistema ya cerrado en main.

Punto de partida:

- tablero de implementación cerrado;
- commit documental de cierre: 8829643;
- último commit funcional previo al cierre: 6212675;
- CI final verde: run 37064025902;
- despliegue de producción READY.

Tu objetivo es determinar, con trazabilidad explícita, si el software implementado corresponde fielmente a la Metrología causal definida por las fuentes del autor.

No des por correcto algo sólo porque compila o porque sus tests pasan.

La pregunta de auditoría es:

¿El programa calcula, representa, discrimina y presenta exactamente aquello que el sistema teórico dice que debe calcular, representar, discriminar y presentar?

---

# 1. Regla de autonomía

Trabaja de forma autónoma hasta que:

A. termines toda la auditoría;

o

B. encuentres una contradicción real que requiera una decisión del autor.

No te detengas después de cada hallazgo.

El usuario debe poder responder simplemente:

CONTINÚA

y debes retomar desde ESTADO_AUDITORIA.md.

No pidas autorización para:

- leer otros repositorios del autor;
- recorrer todo el corpus;
- crear matrices comparativas;
- añadir fixtures de auditoría;
- ejecutar tests;
- ejecutar scripts diagnósticos;
- inspeccionar CI;
- inspeccionar Vercel;
- comparar resultados;
- documentar inconsistencias;
- crear commits sólo documentales o de pruebas de auditoría.

Sí debes detenerte si elegir entre dos alternativas cambiaría el significado del sistema y las fuentes no resuelven cuál es canónica.

---

# 2. Regla de no alteración durante la auditoría

Durante esta orden:

NO modifiques código de producción para corregir hallazgos.

Puedes añadir únicamente:

- documentos de auditoría;
- fixtures;
- scripts diagnósticos;
- tests de caracterización;
- pruebas diferenciales;
- artefactos de comparación.

Estos elementos no deben cambiar el comportamiento de runtime.

La auditoría debe conservar evidencia de lo que encontró antes de corregirlo.

Al final podrás proponer un PLAN_CORRECCION_POST_AUDITORIA.md, pero no ejecutes ese plan hasta recibir una orden posterior.

---

# 3. Fuentes de autoridad

## 3.1 Autoridad inmediata del proyecto

Lee primero, completos:

- INSTRUCCIONES_WORK_IMPLEMENTACION_METROLOGIA_CAUSAL.md
- AUDITORIA_DEUDAS_IMPLEMENTACION.md
- ORDEN_WORK_01_EJECUCION_AUTONOMA.md
- ESTADO_IMPLEMENTACION.md
- RESERVA_PROTOCOLO_EMPATES.md
- LIMITES_TECNICOS.md

Estas instrucciones contienen decisiones actuales del autor y prevalecen sobre código legacy.

## 3.2 Especificaciones y postulados

Lee en kagenomusuko-svg/ideas:

- Especificacion_conceptual_del_calculador_de_metrologia_causal.md
- Postulado_de_clausura_causal_por_evento_determinado.md
- Postulado_del_cero_epistemico_y_limite_ontologico_de_la_matriz_causal.md

## 3.3 Corpus teórico principal

Lee en kagenomusuko-svg/Paradigma, como mínimo:

- corpus/fuentes/Axiomatización del sistema de la doble mediación.md
- corpus/fuentes/El cálculo de la responsabilidad una ontología matemática para sistemas causales complejos.md
- corpus/fuentes/El método Prometeo imputación causal para juristas y abogados.md
- corpus/fuentes/La transformación formal la ontología del ego como fundamento del cálculo causal.md
- corpus/fuentes/Metrología Causal La ciencia de la medición causal.md
- corpus/fuentes/Metrología Causal Vol II.md
- corpus/fuentes/Taxonomía General de Aplicaciones.md

Consulta también, cuando una cuestión lo requiera, los capítulos desagregados bajo corpus/libros/.

## 3.4 Documentación de correcciones y segunda edición

Revisa especialmente:

- documentacion/precision-histos-prometeo-rstar.md
- documentacion/resolucion-histos-prometeo.md
- documentacion/resolucion-sdo-prometeo.md
- documentacion/segunda-edicion/2E-RSTAR-RECALCULO-001.md

No asumas que un archivo más reciente invalida otro sin justificarlo.

## 3.5 Código legacy

El código previo sirve sólo para rastrear decisiones históricas.

No lo uses como autoridad doctrinal.

---

# 4. Decisiones actuales que debes tratar como invariantes

Salvo contradicción explícita en una instrucción posterior del autor, audita bajo estas invariantes:

1. La Metrología causal es la epistemología del sistema.
2. El humano discrimina; el programa orienta, valida y calcula.
3. El programa no inventa hechos.
4. El expediente metrológico no es el expediente fuente.
5. No se exige cargar documentos para poder calcular.
6. Familia, dominio y operador son dimensiones distintas.
7. Las tres familias deben poder utilizar el repertorio completo de operadores.
8. D es el evento determinado que cierra la pregunta causal.
9. D no entra en W_D.
10. D no recibe coordenada en R*.
11. E0 es cero epistémico, no cero ontológico.
12. R* se obtiene canónicamente mediante Perron–Frobenius sobre W_D.
13. Con la convención actual W_ij = w(N_i → N_j), la ecuación canónica de esta implementación es W R* = rho(W) R*.
14. La iteración de potencia es la vía computacional ordinaria para aproximar R*.
15. Los ejemplos aritméticos pequeños de El método Prometeo son una exposición pedagógica del razonamiento; no constituyen un límite de tamaño ni una sustitución de Perron–Frobenius para sistemas complejos.
16. S no debe inventarse desde topología del grafo sin protocolo autorizado.
17. alpha mide asunción efectiva / condiciones adversas atribuibles, no cantidad de documentos.
18. Delta = R* - alpha.
19. Dato ausente no equivale a cero.
20. No hay LLM necesario en el núcleo.
21. El mismo input estructurado debe producir el mismo resultado.
22. Automatización no elimina auditabilidad.

Si una fuente contradice una de estas invariantes, no la normalices: documenta la contradicción y determina si se trata de versión histórica, exposición pedagógica, errata, o conflicto doctrinal verdadero.

---

# 5. Unidad de auditoría

Para cada concepto, operador o subsistema, crea una ficha con:

- nombre canónico;
- símbolo;
- definición doctrinal;
- fuentes exactas;
- fórmula o regla;
- dominio;
- precondiciones;
- inputs;
- outputs;
- tratamiento de ausencia;
- tratamiento de incertidumbre;
- interpretación permitida;
- interpretación prohibida;
- archivo(s) de implementación;
- tests existentes;
- fixtures canónicos;
- resultado esperado;
- resultado observado;
- estado de conformidad;
- severidad;
- decisión requerida o no.

Estados permitidos:

- CONFORME
- CONFORME_CON_RESERVA
- PARCIAL
- CONTRADICE_FUENTE
- NO_IMPLEMENTADO
- NO_APLICABLE
- DECISION_REQUERIDA

No uses un estado ambiguo como “parece bien”.

---

# 6. Auditoría 1 — Arquitectura conceptual

Verifica exhaustivamente:

- análisis;
- fenómeno;
- evento determinado;
- nodo;
- relación;
- discriminación;
- soporte;
- referencia;
- operador;
- resultado;
- expediente metrológico;
- familia;
- dominio;
- protocolo taxonómico;
- asistente determinista.

Para cada uno:

1. compara definición teórica con modelo de datos;
2. verifica que UI, API, motor y expediente usen la misma semántica;
3. busca defaults que cambien significado;
4. busca campos que mezclen niveles distintos;
5. busca conceptos que hayan sido colapsados en uno solo.

Produce:

MATRIZ_ARQUITECTURA_CONCEPTUAL.md

---

# 7. Auditoría 2 — R* y Perron–Frobenius

Audita R* con prioridad máxima.

Debes verificar:

## 7.1 Convención matricial

- orientación de W;
- correspondencia exacta entre arista y entrada W_ij;
- multiplicación usada por el código;
- eigenvector derecho o izquierdo;
- normalización L1;
- estimación de rho;
- residuo;
- tolerancia;
- criterio de convergencia.

Demuestra mediante ejemplos pequeños que la implementación satisface la convención declarada.

## 7.2 Clausura

Verifica mecánicamente que:

D no entra en W_D.

D no aparece en R*.

Busca cualquier ruta alternativa, expediente, exportación, fixture o helper que reintroduzca D.

## 7.3 Condiciones de Perron–Frobenius

Audita:

- no negatividad;
- irreducibilidad;
- periodicidad;
- primitividad;
- matrices reducibles;
- matrices periódicas;
- matrices con producto nulo;
- comportamiento sin regularización;
- comportamiento con regularización.

No confundas:

irreducibilidad de W

con

“todos llegan al evento D”.

Si las fuentes usan ambas formulaciones en versiones distintas, regístralo expresamente.

## 7.4 Regularización

Verifica separación entre:

W_E

y

W_epsilon.

Comprueba que epsilon:

- no se registre como evidencia;
- no sobrescriba W_E;
- sea auditable;
- tenga sensibilidad;
- no densifique innecesariamente redes sparse.

## 7.5 Escala

Ejecuta pruebas de:

- 1 nodo;
- 2 nodos;
- 10 nodos;
- 100 nodos;
- 1,000 nodos;
- una red mayor razonable para CI si el costo lo permite.

Registra:

- memoria;
- tiempo;
- iteraciones;
- residuo;
- convergencia;
- número de aristas.

Verifica que la complejidad observable corresponda a una implementación sparse y no a una matriz densa oculta.

## 7.6 Ejemplos canónicos

Extrae todos los ejemplos numéricos relevantes de las fuentes.

No uses únicamente el fixture de 2x2 creado durante la implementación.

Para cada ejemplo:

- transcribe sus inputs;
- clasifica si es pedagógico, canónico, histórico o de segunda edición;
- ejecuta el motor;
- compara resultado;
- explica cualquier diferencia.

Produce:

AUDITORIA_RSTAR_PERRON_FROBENIUS.md

y fixtures reproducibles.

---

# 8. Auditoría 3 — S, R*_neta, alpha y Delta

## 8.1 S

Revisa todas las definiciones de sustituibilidad en las fuentes.

Identifica:

- cuántos componentes usa cada versión;
- si existe fórmula universal;
- si existe ruta por dominio;
- papel de formalización;
- comportamiento de pares;
- determinación estructural;
- papel o no de los Hijos.

Verifica que el código actual no haya congelado como universal una variante meramente piloto.

Si el promedio simple de tres componentes sólo está autorizado como protocolo piloto, el reporte debe decirlo expresamente.

## 8.2 R*_neta

Verifica:

R*_neta = R*(1-S)

y todos sus casos límite.

## 8.3 alpha

Compara todas las definiciones y ejemplos de alpha.

Verifica:

- valor discriminado;
- proporción monetaria;
- estrategia taxonómica;
- acciones posteriores;
- consecuencias impuestas;
- reparación;
- sanción;
- pérdida;
- ausencia de psicologización.

Comprueba que el código no interprete intención.

## 8.4 Delta

Verifica exactamente:

Delta = R* - alpha.

Comprueba:

- signo;
- rango;
- cero;
- ausencia de clamp indebido;
- ausencia de umbrales universales;
- lenguaje visible.

Produce:

AUDITORIA_OPERADORES_DERIVADOS.md

---

# 9. Auditoría 4 — IIC, Fraude annona, B*, daño y AD

## IIC

Verifica la definición, denominador, tratamiento de declarados/observados/coincidencias y aplicabilidad por tipo de nodo.

## Fraude annona

Esta auditoría debe ser especialmente estricta.

Compara:

- definición conceptual;
- fórmula histórica;
- capacidad de intervención;
- prevención;
- diseño;
- omisión.

Determina si el módulo actual representa:

- operador canónico;
- variante legacy;
- interfaz incompleta;
- operador todavía no implementable.

No permitas que una fórmula legacy se convierta en definición por mera existencia en código.

## B*

Verifica fórmula, unidades, beneficios negativos si las fuentes los contemplan, suma total y caso total cero.

## D_total

Verifica:

D_total = T_invertido + T_impedido + DeltaT_trayectoria

y especialmente:

- compatibilidad de unidades;
- datos faltantes;
- estimaciones;
- daño futuro;
- tratamiento de cero.

## AD

Verifica:

AD_i = R*_i D_total

y si alguna fuente ordena usar R*_neta en algún contexto. Si existe contradicción, no elijas silenciosamente.

Produce:

AUDITORIA_OPERADORES_COMPLEMENTARIOS.md

---

# 10. Auditoría 5 — Robustez y sensibilidad

Audita:

- escenarios mínimo;
- central;
- máximo;
- regla de punto medio;
- orden de rankings;
- líder;
- empates;
- frontera exacta de 10 puntos;
- Declaraciones A/B/C/D;
- hipercubo;
- sensibilidad una-arista-a-la-vez;
- reproducibilidad.

Comprueba especialmente que:

- el umbral sea > 0.10 si ésa es la regla canónica y no >= 0.10;
- los empates no se resuelvan por orden de id;
- ninguna función legacy emita una letra distinta por otro criterio;
- no exista aleatoriedad no registrada.

Compara las definiciones A/B/C/D de todas las fuentes y documenta versiones.

Produce:

AUDITORIA_ROBUSTEZ_SENSIBILIDAD.md

---

# 11. Auditoría 6 — Operadores faltantes

Haz un inventario completo de operadores que aparecen en las fuentes y compáralos con REGISTRY.

Como mínimo busca:

- recurrencia;
- exposición;
- intervención;
- prevención;
- Shapley;
- instrumentalidad;
- beneficio;
- fraude annona;
- cualquier operador adicional definido en los volúmenes de Metrología causal.

Para cada operador faltante clasifica:

- definido matemáticamente y listo para implementar;
- definido conceptualmente pero sin contrato programable;
- dependiente de Taxonomía;
- histórico/sustituido;
- no perteneciente al calculador general.

No los implementes durante esta auditoría.

Produce:

INVENTARIO_OPERADORES_Y_COBERTURA.md

---

# 12. Auditoría 7 — Taxonomía y frontera con el motor

No conviertas esta auditoría en la construcción completa de la Taxonomía computable.

Verifica únicamente si el motor está realmente preparado para recibirla.

Audita:

- taxonomiaVersion;
- registry;
- loader;
- protocolo generico@1;
- acoplamientos hardcodeados;
- escalas embebidas;
- preguntas incrustadas en JSX;
- nombres por dominio;
- posibilidad real de cambiar un protocolo sin tocar fórmulas.

Para cada hardcode clasifica:

- legítimo universal;
- piloto temporal;
- deuda taxonómica;
- violación de separación.

Produce:

AUDITORIA_FRONTERA_TAXONOMICA.md

---

# 13. Auditoría 8 — UI y semántica visible

Recorre todas las pantallas.

Verifica que la interfaz no diga algo más fuerte que lo que el motor sabe.

Ejemplos:

- “demuestra” cuando sólo registra una declaración;
- “causa inexistente” para E0;
- “responsabilidad” donde corresponde convergencia;
- “culpabilidad”;
- “certeza” cuando sólo existe robustez;
- “evidencia verificada” cuando el programa no recibió la fuente.

Audita:

- nombres visibles;
- ayudas;
- placeholders;
- errores;
- warnings;
- notas;
- accesibilidad;
- tratamiento de indeterminación;
- familias;
- dominio;
- selección de operadores.

Produce:

AUDITORIA_UI_SEMANTICA.md

---

# 14. Auditoría 9 — Expediente y auditoría técnica

Verifica que el expediente:

- no recalcule;
- consuma exactamente el mismo resultado que la UI;
- conserve inputs;
- conserve versiones;
- conserve regularización;
- conserve advertencias;
- conserve indeterminaciones;
- no afirme haber verificado documentos;
- permita reconstruir el cálculo.

Haz una prueba diferencial:

mismo input → respuesta API → UI → expediente → JSON de auditoría.

Los valores comunes deben coincidir exactamente salvo formato de presentación.

Produce:

AUDITORIA_EXPEDIENTE_TRAZABILIDAD.md

---

# 15. Auditoría 10 — Determinismo y ausencia de inferencia silenciosa

Busca en todo el repo:

- Math.random;
- Date.now usado en cálculo;
- defaults numéricos;
- fallbacks uniformes;
- asignaciones de tipo/modo por ausencia;
- conversiones null→0;
- selección automática de protocolos;
- heurísticas no documentadas;
- redondeo antes de terminar operaciones;
- ordenamiento que resuelva empates.

Cada hallazgo debe clasificarse.

El timestamp de folio o metadata puede ser no determinista si no entra en el cálculo. Distingue presentación de matemática.

Produce:

AUDITORIA_DETERMINISMO.md

---

# 16. Auditoría 11 — Tests

No cuentes tests; audita qué prueban.

Construye una matriz:

requisito → test → fixture → cobertura → hueco.

Verifica:

- tests felices;
- casos límite;
- datos faltantes;
- cero explícito;
- null;
- matrices degeneradas;
- escalabilidad;
- errores de UI;
- exportación;
- igualdad entre capas.

Añade tests de caracterización cuando detectes un hueco, siempre que no cambien runtime.

El objetivo es que un test fallido pueda localizar qué invariante se rompió.

Produce:

MATRIZ_COBERTURA_PRUEBAS.md

---

# 17. Auditoría 12 — CI, Vercel y entorno real

Verifica:

- npm ci;
- npm test;
- npm run build;
- test UI;
- ausencia de secrets obligatorios;
- deployment production READY;
- commit desplegado;
- ruta pública;
- errores de runtime recientes si existen;
- divergencia entre main y producción.

No concluyas “producción correcta” sólo porque Vercel diga READY.

Ejecuta un recorrido funcional sobre el deployment de producción si las herramientas lo permiten.

Produce:

AUDITORIA_ENTORNO_EJECUCION.md

---

# 18. Matriz maestra de trazabilidad

Crea:

MATRIZ_TRAZABILIDAD_DOCTRINA_CODIGO.md

Cada fila debe contener como mínimo:

| ID | Concepto/operador | Fuente canónica | Regla | Código | Test | Resultado | Estado | Severidad | Decisión |

La matriz debe cubrir TODO:

- conceptos;
- operadores;
- validaciones;
- outputs;
- nomenclatura;
- reglas de ausencia;
- robustez;
- expediente;
- taxonomía;
- UI.

No cierres la auditoría mientras exista una fila marcada SIN_REVISAR.

---

# 19. Registro de discrepancias

Crea:

REGISTRO_DISCREPANCIAS_AUDITORIA.md

Clasifica por severidad:

P0 — el software calcula otra cosa.

P1 — el software calcula lo correcto pero bajo condiciones, defaults o semántica que pueden alterar resultados.

P2 — presentación, trazabilidad, cobertura o UX puede inducir una lectura incorrecta.

P3 — deuda técnica sin efecto doctrinal actual.

Cada discrepancia debe tener:

- identificador;
- fuente;
- código;
- reproducción;
- efecto;
- severidad;
- propuesta de corrección;
- si necesita decisión del autor.

---

# 20. Casos canónicos

Crea:

MATRIZ_CASOS_CANONICOS.md

No inventes ejemplos si las fuentes contienen casos suficientes.

Extrae casos de:

- Metrología Causal;
- Vol II;
- El cálculo de la responsabilidad;
- El método Prometeo;
- Axiomatización;
- segunda edición/correcciones.

Para cada caso:

- fuente;
- capítulo/sección;
- propósito pedagógico o formal;
- nodos;
- aristas;
- rangos;
- operador;
- resultado de la fuente;
- resultado del software;
- tolerancia;
- conformidad;
- explicación de diferencias.

Cuando un ejemplo del libro sea una exposición aritmética simplificada y no el cálculo PF completo, indícalo. No lo uses automáticamente como test de igualdad numérica del operador formal.

---

# 21. Contradicciones entre fuentes

No reconciles silenciosamente.

Crea una taxonomía de contradicciones:

A. terminológica — mismo objeto, nombres distintos;

B. representacional — mismo objeto, forma pedagógica distinta;

C. de versión — regla antigua sustituida por una posterior;

D. matemática — fórmulas incompatibles;

E. ontológica/metrológica — cambia qué se afirma medir.

Sólo D o E suelen requerir decisión obligatoria.

Si detectas una contradicción D/E que las instrucciones actuales no resuelven:

- crea DECISION_PENDIENTE_AUDITORIA_<tema>.md;
- sigue auditando todo lo independiente;
- no corrijas código.

---

# 22. Producto final

Al terminar, crea:

AUDITORIA_EXHAUSTIVA_METROLOGIA_CAUSAL.md

Debe contener:

1. alcance;
2. fuentes;
3. metodología;
4. resumen ejecutivo;
5. conformidades;
6. discrepancias;
7. decisiones requeridas;
8. operadores faltantes;
9. cobertura de pruebas;
10. estado de producción;
11. riesgos;
12. conclusión de aceptación.

La conclusión sólo puede ser una de:

- ACEPTADO
- ACEPTADO_CON_RESERVAS
- NO_ACEPTADO
- DECISION_REQUERIDA

No uses “aceptado” si existe un P0 abierto.

---

# 23. Plan de corrección posterior

Crea:

PLAN_CORRECCION_POST_AUDITORIA.md

Ordena las correcciones por dependencia y severidad.

Para cada corrección:

- archivos;
- regla fuente;
- cambio requerido;
- tests que deben añadirse;
- criterio de cierre.

No ejecutes este plan durante la auditoría.

---

# 24. Estado persistente

Crea y mantén:

ESTADO_AUDITORIA.md

Debe tener checklist por las 12 auditorías anteriores y por los productos finales.

Marca [x] sólo después de comitear el producto correspondiente.

Añade SHA por tarea cerrada.

Mantén:

- Último punto seguro;
- Bloque activo;
- Próxima tarea;
- Decisiones pendientes;
- Historial de commits.

---

# 25. Política de commits

Haz commits por bloque de auditoría.

Ejemplos:

- docs: auditar arquitectura conceptual
- test: añadir casos canónicos PF
- docs: auditar R* y regularización
- docs: auditar operadores derivados
- docs: inventariar operadores faltantes
- docs: consolidar matriz doctrina-código
- docs: cerrar auditoría exhaustiva

No mezcles correcciones de runtime con auditoría.

---

# 26. Condición de cierre

La auditoría termina sólo cuando:

1. todos los archivos runtime relevantes hayan sido revisados;
2. todas las fuentes principales hayan sido recorridas;
3. todos los operadores estén en la matriz;
4. todos los casos canónicos identificados hayan sido clasificados;
5. no exista ninguna fila SIN_REVISAR;
6. CI y producción hayan sido comprobados;
7. todas las discrepancias tengan severidad;
8. todas las contradicciones reales estén clasificadas;
9. ESTADO_AUDITORIA.md esté cerrado;
10. exista una conclusión de aceptación.

Si aparece una decisión obligatoria, sigue trabajando todo lo independiente y detente únicamente cuando ya no quede trabajo que pueda continuar sin esa decisión.
