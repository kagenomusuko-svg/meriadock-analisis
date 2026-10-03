# ORDEN WORK 04 — Taxonomía computable y activación canónica de Fraude annona

## Mandato

Trabaja sobre:

kagenomusuko-svg/meriadock-analisis

Fuentes doctrinales principales:

- kagenomusuko-svg/Paradigma
- kagenomusuko-svg/ideas cuando una resolución vigente lo requiera

Antes de modificar runtime, lee completos:

1. MAPA_MAESTRO_METROLOGIA_CAUSAL.md
2. AUDITORIA_REACEPTACION_POST_CORRECCION.md
3. ESTADO_CORRECCION_POST_AUDITORIA.md
4. REPERTORIO_POST_CORRECCION.md
5. RESOLUCION_AUDITORIA_I_INV.md
6. INSTRUCCIONES_WORK_IMPLEMENTACION_METROLOGIA_CAUSAL.md
7. Taxonomía General de Aplicaciones completa:
   - corpus/libros/taxonomia-general-de-aplicaciones/capitulo-u-01.md
   - capitulo-u-02.md
   - capitulo-u-03.md
   - capitulo-u-04.md
   - capitulo-01.md a capitulo-78.md
8. Las obras a las que cada capítulo taxonómico remita cuando sean necesarias para interpretar una fórmula, rango o condición.

No conviertas esta orden en otra fase de planeación. Debes construir la Taxonomía computable como capa declarativa versionada, conectarla al runtime aceptado sin degradar sus invariantes y activar Fraude annona con la fórmula canónica ya fijada por las fuentes y ratificada por el autor.

Regla de trabajo:

fuente → extracción trazable → protocolo declarativo → validación → integración → pruebas → commit → estado → continuar.

El usuario debe poder responder únicamente:

CONTINÚA

y debes retomar desde ESTADO_TAXONOMIA_COMPUTABLE.md.

---

# 1. Regla de autonomía

Puedes decidir sin consultar:

- estructura de carpetas;
- JSON vs módulos de datos si la solución sigue siendo declarativa;
- schemas;
- validadores;
- loaders;
- índices;
- generación de catálogos;
- tests;
- CI;
- UI dinámica;
- optimizaciones;
- migración interna de generico@1;
- extracción de componentes repetidos;
- normalización técnica de IDs.

No puedes decidir por tu cuenta:

- cambiar qué mide un operador;
- sustituir una fórmula;
- convertir una propuesta pendiente de calibración en regla universal;
- convertir un ejemplo en calibración;
- convertir una conjetura en algoritmo;
- resolver una contradicción matemática de las fuentes alterando silenciosamente una de ellas;
- inferir hechos que la Taxonomía pide al analista discriminar;
- usar una categoría de dominio para restringir qué operadores pueden calcularse.

Si aparece una decisión doctrinal nueva, documéntala, bloquea sólo lo dependiente y continúa lo demás.

---

# 2. Invariantes del núcleo que la Taxonomía NO puede romper

Conserva:

- humano discrimina e integra;
- Taxonomía orienta y estructura;
- motor calcula;
- D fuera de W_D y de R*;
- E0 como cero epistémico;
- Perron–Frobenius derecho con la convención vigente;
- W_E separado de W_epsilon;
- dato ausente distinto de cero;
- ninguna familia restringe operadores;
- S no se inventa automáticamente desde topología;
- alpha no se infiere desde cantidad de documentos;
- Delta = R* - alpha;
- expediente consume el mismo resultado;
- no LLM en runtime;
- determinismo;
- protocolos versionados;
- fuente/protocolo efectivo auditable.

La Taxonomía no reemplaza el motor matemático. Lo parametriza, orienta la discriminación y aporta protocolos de integración.

---

# 3. Arquitectura objetivo de la Taxonomía

Implementa una arquitectura en capas:

UNIVERSAL → DOMINIO → OPERADOR → CASO/ENTRADA DEL ANALISTA.

## 3.1 Capa universal

Proviene de U·1–U·4.

Debe contener, como objetos separados:

- jerarquía de legibilidad documental;
- árbol de decisión de Hijos;
- reglas de incertidumbre;
- protocolo de evidencia contradictoria;
- escalas generales de evidencia y su semántica;
- intersección/prioridad de rangos;
- rutas A/B para S;
- reglas de convergencia/divergencia entre rutas;
- reglas universales de alpha que realmente sean universales;
- reglas de Declaración/robustez sólo en la medida compatible con el runtime aceptado.

No copies estas reglas 78 veces.

## 3.2 Overlay de dominio

Cada capítulo 1–78 debe compilarse como un protocolo/overlay independiente que hereda de la capa universal.

Cada overlay debe poder declarar:

- id;
- versión;
- parte/capítulo;
- nombre del dominio;
- aliases;
- familias a las que suele servir, sólo como orientación;
- escala de evidencia del dominio;
- rangos;
- preguntas;
- observables;
- firmas documentales;
- roles/nodos especiales;
- rutas de S autorizadas;
- estrategias de alpha autorizadas;
- variante de IIC si aplica;
- reglas de beneficio/daño si aplica;
- operadores relevantes;
- condiciones de aplicabilidad;
- exclusiones;
- advertencias;
- vocabulario visible;
- estado epistemológico de cada regla;
- fuente exacta.

## 3.3 Capa de operador

Las fórmulas universales siguen en dist-motor.

La Taxonomía sólo debe suministrar:

- inputs requeridos;
- calibración;
- rangos sugeridos;
- semántica;
- protocolo de discriminación;
- interpretación permitida;
- condiciones de aplicabilidad.

No dupliques la fórmula de R*, Delta, B*, AD, I_inv, Shapley, etc. dentro de cada dominio.

---

# 4. Schema taxonómico obligatorio

Define un schema formal versionado.

Cada dato taxonómico debe incluir, cuando aplique:

- id estable;
- tipo;
- valor/rango;
- estatus epistemológico;
- fuente;
- capítulo/sección;
- texto visible;
- condiciones;
- efecto computacional autorizado.

Estatus mínimos:

- CANONICO
- DERIVADO
- PROPUESTA_PENDIENTE_CALIBRACION
- ILUSTRATIVO
- HISTORICO
- RESERVADO
- NO_COMPUTABLE

Regla crítica:

un valor PROPUESTA_PENDIENTE_CALIBRACION puede mostrarse como orientación, pero no debe convertirse silenciosamente en input efectivo.

Debe requerir confirmación explícita del analista o permanecer como sugerencia.

---

# 5. Proveniencia obligatoria

Cada protocolo y cada regla debe conservar:

- repositorio fuente;
- commit/SHA fuente;
- path;
- capítulo;
- sección;
- identificador de regla;
- estado epistemológico.

Crea un manifiesto completo:

MATRIZ_COBERTURA_TAXONOMIA.md

con una fila por U·1–U·4 y por capítulo 1–78.

Columnas mínimas:

| Capítulo | Dominio | Fuente/SHA | Escala | S | alpha | IIC | Operadores | Reglas especiales | Protocolo generado | Tests | Estado |

No cierres Work04 con un capítulo SIN_REVISAR.

---

# 6. No generar la Taxonomía en runtime

El runtime no debe leer prosa ni llamar un modelo lingüístico.

La extracción puede ocurrir durante este trabajo, pero el producto debe quedar como datos estáticos, versionados y revisables.

Arquitectura:

fuentes Paradigma → compilación editorial una vez → archivos declarativos versionados → loader determinista → UI/motor.

No:

fuente Markdown → parser semántico en cada cálculo.

---

# 7. Migración de generico@1

Conserva compatibilidad con el protocolo genérico actual.

Refactoriza taxonomia/protocolos.js para que sea principalmente:

- schema validator;
- registry;
- loader;
- resolver;
- merger universal + dominio;
- expositor de metadata.

No debe contener hardcodeados todos los dominios.

El protocolo generico@1 puede seguir existiendo como fallback explícito/piloto, pero:

- no debe seleccionarse silenciosamente si el usuario eligió un dominio con protocolo propio;
- debe mostrarse como piloto genérico;
- debe registrar que no sustituye al dominio específico.

---

# 8. U·1 — Hijos y legibilidad

Implementa U·1 como protocolo determinista de orientación.

No conviertas el árbol en un clasificador infalible.

Salidas mínimas:

- CONFIRMABLE
- HIPOTESIS
- REQUIERE_ECO
- INDETERMINADO

Preserva la jerarquía documental.

Reglas críticas:

- Harmonía no se infiere por ausencia de fricción;
- Potós/Eros desde expediente conservan incertidumbre;
- Fobos/Deimos/Anteros sólo se localizan con el nivel de evidencia que el protocolo exige;
- ausencia de evidencia no produce un Hijo default;
- no usar Anteros como empate/default.

La salida del árbol puede orientar Ruta A de S sólo cuando el analista la confirme conforme al protocolo.

---

# 9. U·2 — evidencia contradictoria

Implementa:

- rangos compatibles → intersección;
- rangos incompatibles → protocolo de contradicción/prioridad;
- evidencia insuficiente → estado explícito;
- no sumar “más documentos” como si la cantidad aumentara mecánicamente el peso.

Respeta el E0 vigente del proyecto.

Si la redacción histórica de U·2 parece tratar E0 como exclusión ontológica de la arista, no cambies el postulado vigente: registra la diferencia como histórica/representacional y conserva E0 epistémico.

Las escalas específicas de dominio pueden adaptar qué cuenta como cada nivel, pero no deben borrar la trazabilidad del nivel seleccionado.

---

# 10. U·3 — S, alpha e IIC

## 10.1 Ruta A de S

La tabla de Hijos puede incorporarse con sus rangos y fuente.

Pero el sistema no debe:

árbol documental → Hijo → S → cálculo

sin intervención del analista.

Ruta correcta:

evidencia → orientación taxonómica → analista confirma P(Hijos)/localización → protocolo calcula intervalo sugerido de S → analista confirma input efectivo.

Si P(Hijos) se usa, conserva distribución completa y fuente.

## 10.2 Ruta B de S

Las escalas DS declaradas como propuesta pendiente de calibración deben mantener ese estatus.

Pueden:

- orientar;
- sugerir intervalo;
- activar warning de provisionalidad.

No pueden presentarse como calibración empírica universal.

## 10.3 Coherencia entre rutas

Si A y B convergen:

- puede proponerse intersección;
- registrar ambas rutas.

Si divergen:

- no promediar silenciosamente;
- mostrar contradicción;
- pedir discriminación/evidencia adicional.

## 10.4 alpha

Los protocolos por dominio pueden autorizar estrategias distintas.

El motor sigue calculando alpha sólo desde el contrato autorizado y los inputs del analista.

## 10.5 IIC

Permite variantes versionadas de IIC.

No mezcles:

- IIC de congruencia operativo actual;
- IIC histórico por correlación;
- cualquier IIC sectorial.

Cada variante debe tener ID, fórmula/entrada y aplicabilidad propios.

---

# 11. U·4 — Declaraciones y robustez

No reemplaces silenciosamente la robustez ya aceptada en Work03.

Compara U·4 con el operador actual.

Si U·4 exige el producto cartesiano completo de w × P(Hijos) × alpha y el runtime actual usa otro protocolo de robustez:

- implementa la regla taxonómica como protocolo separado;
- clasifica si requiere extensión del motor;
- no llames equivalentes a algoritmos distintos;
- no alteres el operador aceptado hasta demostrar compatibilidad o documentar una decisión necesaria.

Las Declaraciones A/B/C/D deben conservar su protocolo y fuente.

No uses umbrales históricos 90/70/40 si no pertenecen al protocolo vigente.

---

# 12. Capítulos 1–78 — extracción exhaustiva

Procesa los 78 capítulos.

Para cada capítulo:

1. identifica el dominio;
2. identifica la escala de evidencia;
3. extrae rangos con estatus;
4. identifica observables/preguntas;
5. identifica firmas documentales;
6. identifica protocolos de S;
7. identifica alpha;
8. identifica IIC;
9. identifica operadores adicionales;
10. identifica invariantes especiales;
11. identifica ejemplos que NO son reglas;
12. identifica valores candidatos/pending calibration;
13. genera protocolo;
14. valida schema;
15. añade tests;
16. actualiza matriz.

No copies afirmaciones disciplinares como verdades empíricas si la fuente las presenta sólo como orientación del sistema.

No “corrijas” la Taxonomía con conocimiento externo durante esta orden.

---

# 13. UI dinámica

La nueva versión debe dejar de depender de preguntas hardcodeadas por dominio.

Flujo:

usuario elige finalidad → dominio/protocolo → UI obtiene campos del protocolo → analista discrimina → linter taxonómico valida → motor calcula operadores seleccionados.

Debe poder cambiarse un protocolo sin editar Constructor.jsx.

La UI debe mostrar:

- protocolo solicitado;
- protocolo efectivo;
- versión;
- estado epistemológico;
- fuente/ayuda;
- campos obligatorios/opcionales;
- sugerencias;
- warnings.

Sugerencia no equivale a valor elegido.

---

# 14. Fraude annona — activar ahora

La reserva actual de Fraude annona debe retirarse.

Fórmula canónica:

Fraude_annona_D = R*_D × (1 − alpha_D) × (1 − IIC_D).

Contrato:

- nodo de diseño D_design explícitamente discriminado;
- R* válido en [0,1];
- alpha válido en [0,1];
- IIC válido en [0,1] mediante una variante/protocolo identificado;
- no inferir que un nodo es diseñador por su nombre;
- no inventar IIC si falta;
- si falta cualquiera de los tres inputs: indeterminado;
- resultado en [0,1].

Casos canónicos mínimos:

- 0.60, 0.10, 0.20 → 0.432;
- 0.60, 0.60, 0.20 → 0.192;
- 0.60, 0.10, 0.80 → 0.108;
- R*=0 → 0;
- alpha=1 → 0;
- IIC=1 → 0.

Regla muy importante:

NO sustituyas la fórmula por:

Delta × (1 − IIC).

Con la definición vigente Delta = R* − alpha, esa expresión no es algebraicamente equivalente a R*(1−alpha)*(1−IIC).

La fuente contiene una frase de equivalencia histórica que no debe usarse para cambiar la fórmula explícita.

El cálculo canónico para esta implementación es el producto de tres factores.

El umbral 0.20 NO debe convertirse en umbral universal del motor.

Puede existir como regla interpretativa sólo en protocolos de dominio que lo autoricen explícitamente y con su estatus/proveniencia.

Clasificación nueva:

- fórmula Fraude annona: MAT;
- calibración/variante de IIC y aplicabilidad por dominio: TAX.

Actualiza REPERTORIO_POST_CORRECCION.md cuando se cierre.

---

# 15. Separación entre fórmula y protocolo

Patrón obligatorio:

motor:
  calcularFraudeAnnona({rStar, alpha, iic})

taxonomía:
  qué nodo es de diseño;
  qué variante de IIC aplica;
  cómo se discrimina IIC;
  qué interpretación/umbral sectorial está autorizado.

La Taxonomía nunca debe reimplementar la multiplicación.

---

# 16. Testing de Taxonomía

Añade pruebas de:

- todos los protocolos validan schema;
- todos tienen fuente;
- ningún ID duplicado;
- todas las versiones son resolubles;
- dominio correcto;
- versión inexistente rechazada;
- universal + overlay produce resultado estable;
- cambiar protocolo no cambia fórmulas universales;
- preguntas cambian sin tocar JSX;
- sugerencias no se aplican sin confirmación;
- estatus epistemológico preservado;
- E0 no cambia de semántica;
- Harmonía no se infiere documentalmente;
- contradicción A/B de S no se promedia;
- IIC variantes no se mezclan;
- Fraude annona usa producto canónico;
- familia no restringe repertorio;
- snapshot/expediente conserva protocolo y fuente.

---

# 17. Pruebas de cobertura completa

Crea una prueba/diagnóstico que falle si:

- falta alguno de U·1–U·4;
- falta alguno de los capítulos 1–78;
- un protocolo no tiene sourceRef;
- existe un campo computacional sin estatus;
- una regla pendiente de calibración se marca como canónica;
- un protocolo usa un operador inexistente sin declararlo reservado.

La cobertura debe ser verificable automáticamente.

---

# 18. Productos obligatorios

Al finalizar crea:

- MATRIZ_COBERTURA_TAXONOMIA.md
- CATALOGO_TAXONOMIA_COMPUTABLE.md
- AUDITORIA_ACEPTACION_TAXONOMIA_COMPUTABLE.md
- ESTADO_TAXONOMIA_COMPUTABLE.md actualizado
- actualización de MAPA_MAESTRO_METROLOGIA_CAUSAL.md
- actualización de REPERTORIO_POST_CORRECCION.md

La auditoría final debe decir qué proporción de la Taxonomía es:

- computable;
- orientativa;
- pendiente de calibración;
- reservada;
- no computable.

No reduzcas “integrada” a “archivo JSON generado”.

---

# 19. Commits

Haz commits pequeños por capa/parte.

Ejemplos:

- refactor: formalizar schema de protocolos taxonómicos
- feat: compilar protocolo universal U1-U4
- feat: incorporar Taxonomía partes I-III
- feat: incorporar Taxonomía partes IV-VI
- feat: incorporar Taxonomía partes VII-X
- feat: incorporar Taxonomía partes XI-XIII
- feat: activar Fraude annona canónico
- feat: generar UI desde protocolo versionado
- test: verificar cobertura completa de Taxonomía
- docs: aceptar Taxonomía computable con reservas explícitas

No marques una parte [x] antes de commit + tests.

---

# 20. Condición de cierre

Work04 sólo termina cuando:

1. U·1–U·4 estén compilados y trazables;
2. capítulos 1–78 estén revisados, clasificados y representados;
3. no exista capítulo SIN_REVISAR;
4. Fraude annona esté activo con su fórmula canónica;
5. la UI consuma protocolos declarativos;
6. ningún valor provisional se aplique silenciosamente;
7. todos los protocolos tengan sourceRef/version;
8. tests/build/UI estén verdes;
9. producción exacta esté verificada;
10. exista AUDITORIA_ACEPTACION_TAXONOMIA_COMPUTABLE.md.

Si surge una decisión doctrinal realmente nueva, documenta el bloqueo y continúa con todo lo independiente.
