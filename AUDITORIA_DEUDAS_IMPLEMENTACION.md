# Auditoría técnica del repositorio y cirugía de implementación

## Alcance

Repositorio auditado:

kagenomusuko-svg/meriadock-analisis

Esta auditoría complementa y vuelve operativas las instrucciones de INSTRUCCIONES_WORK_IMPLEMENTACION_METROLOGIA_CAUSAL.md.

La conclusión general es que el repositorio es recuperable. No conviene reconstruirlo desde cero. La interfaz, el flujo de constructor, el generador de expediente y varias funciones matemáticas pueden reutilizarse. La deuda principal está en que el prototipo mezcló tres capas distintas:

\[
\text{discriminación humana}
\;+\;
\text{proxies inventados por software}
\;+\;
\text{cálculo matemático}
\]

La cirugía debe conservar la primera como entrada humana, eliminar la segunda cuando sustituye indebidamente al analista y corregir/conectar la tercera.

---

# 1. Prioridad P0 — corregir antes de cualquier nueva interfaz

## 1.1 dist-motor/r_estrella.js

### Estado actual

La ruta principal calcula “influencia causal total por todos los caminos” sobre un DAG y normaliza la suma de productos de caminos hacia el nodo final.

La implementación de eigenvector por iteración de potencia quedó relegada a compatibilidad.

Además:

- la ruta de caminos necesita que el nodo final esté dentro del grafo;
- si no encuentra caminos, devuelve una distribución uniforme;
- la función legacy multiplica por \(W^\top\);
- devuelve eigenvalor 1 incluso en la ruta que no calcula eigenvalor.

### Deuda

Esto no implementa el \(R^*\) canónico.

### Cirugía

Haz de Perron–Frobenius la ruta principal.

Con la convención metrológica:

\[
W_{ij}=w(N_i\to N_j),
\]

el sistema formal usa:

\[
W R^*=\rho(W)R^*.
\]

Por tanto, si se conserva esa convención de almacenamiento, la iteración debe multiplicar por \(W\), no por \(W^\top\).

Implementa:

\[
r^{(t+1)}
=
\frac{W r^{(t)}}{\|Wr^{(t)}\|_1}.
\]

Devuelve:

- vector;
- eigenvalor dominante estimado;
- iteraciones;
- convergencia;
- error final;
- residuo espectral;
- tolerancia;
- regularización aplicada;
- \(\varepsilon\).

Elimina el fallback uniforme. Si no converge o el operador no está definido, devuelve estado explícito.

Conserva la suma de productos de caminos sólo si se renombra como diagnóstico independiente. No puede seguir llamándose \(R^*\).

---

## 1.2 dist-motor/grafo.js

### Estado actual

Construye \(W\) incluyendo todos los nodos y normaliza cada columna por destino.

Después ofrece pertrubarMatriz, que aplica:

\[
(1-\varepsilon)W+\varepsilon/n
\]

a todas las entradas.

### Deuda

Hay cuatro problemas:

1. el evento final puede entrar en la matriz;
2. la normalización por destino transforma los pesos de evidencia antes de Perron–Frobenius;
3. la perturbación actual mezcla el operador con una matriz uniforme;
4. no conserva explícitamente la separación entre matriz empírica y matriz regularizada.

### Cirugía

Refactoriza en funciones separadas.

construirMatrizEmpirica(analisis, escenario):

- sólo nodos activos;
- \(D\) excluido;
- usa directamente los pesos del escenario;
- no normaliza por origen ni por destino salvo regla matemática canónica explícita;
- devuelve matriz o estructura sparse y mapa de índices.

regularizarMatriz(W_E, configuracion):

- devuelve \(W_\varepsilon\) sin sobrescribir \(W_E\);
- registra \(\varepsilon\) y \(K\);
- no trata \(\varepsilon\) como evidencia.

Para redes grandes usa multiplicación sparse sin materializar matrices densas innecesarias.

Renombra o elimina pertrubarMatriz; además corrige el typo si se conserva una función equivalente.

---

## 1.3 Separación de D

### Estado actual

Constructor.jsx crea:

{ id: "nodo_final", ..., tipo: "final" }

y las conexiones pueden apuntar a ese nodo.

El expediente reconstruye matrices incluyendo el final.

### Cirugía

Conserva si es útil una representación visual del evento, pero en el modelo matemático usa:

- nodosActivos;
- eventoDeterminado;
- relacionesInternas;
- relacionesDeCierre si la interfaz necesita registrar conexiones descriptivas hacia \(D\).

Antes de construir \(W_D\), elimina siempre \(D\).

Añade invariantes:

\[
D\notin W_D,
\qquad
D\notin R^*.
\]

---

## 1.4 pages/api/calcular.js

### Estado actual

El constructor envía:

- grafo;
- insumosAlpha;
- nodosIIC;
- danio.

La API sólo extrae:

- grafo;
- insumosAlpha;
- nodosIIC.

Después llama a correrAnalisisCompleto sin danio.

Además no devuelve dTotal ni ajusteDebitor, aunque series.js sí puede producirlos.

### Cirugía

Conecta de extremo a extremo:

Constructor → /api/calcular → motor → respuesta.

Debe devolver, cuando existan:

- dTotal;
- ajusteDebitor;
- resultados adicionales solicitados.

Este es un bug de conexión, no una nueva función.

---

## 1.5 pages/api/expediente.js

### Estado actual

El constructor envía danio, pero la API de expediente no lo destructura ni lo pasa al motor.

### Cirugía

Recibe danio y pásalo al orquestador.

Verifica que el expediente muestre exactamente el mismo cálculo que la pantalla.

No recalcules con una ruta diferente.

---

# 2. Prioridad P1 — sustituir proxies que modifican lo que se mide

## 2.1 dist-motor/sustituibilidad.js

### Estado actual

Calcula:

- \(S_{op}\) desde normas L2 de aristas entrantes y salientes;
- \(S_{mode}\) desde el Hijo dominante;
- \(S=(S_{op}+S_{mode})/2\).

Además usa anteros como default cuando falta información.

### Deuda

El software está inventando una discriminación de sustituibilidad desde la topología del grafo y desde una localización modal.

### Cirugía

Elimina calcularSOp como fuente canónica de \(S\).

Elimina calcularSMode como fuente automática de \(S\).

Implementa \(S\) desde componentes discriminados:

\[
S=
\frac{\sum_k p_k s_k}{\sum_k p_k},
\]

o promedio simple cuando no existan pesos.

No rellenes componentes faltantes.

Si falta información:

S = null.

Los Hijos pueden servir como información taxonómica independiente, pero no producir \(S\) automáticamente.

---

## 2.2 dist-motor/phi1.js

### Estado actual

RANGOS_S ata cada Hijo a un rango de sustituibilidad.

### Cirugía

Separa dos objetos:

- MODOS o identificadores de los Hijos;
- protocolos/rangos de \(S\), que pertenecen a la Taxonomía computable.

No borres los nombres internos si son útiles, pero deja de tratarlos como fórmula automática de \(S\).

---

## 2.3 dist-motor/alpha.js

### Estado actual

Calcula:

\[
\alpha=F(nDoc,nivel)\times G(nDom,nI).
\]

El número de documentos y el número de dominios producen \(\alpha\).

### Deuda

Esto cambia el objeto medido. \(\alpha\) es asunción efectiva/condiciones adversas atribuibles, no densidad documental.

### Cirugía

Elimina N_REF, calcularF y calcularG de la ruta canónica.

Implementa un contrato de \(\alpha\):

- valor discriminado en \([0,1]\);
- estrategia usada;
- soportes declarados;
- referencia opcional.

Admite inicialmente:

- discriminado;
- proporcion_monetaria;
- taxonomico.

No cuentes documentos para producir \(\alpha\).

---

## 2.4 components/chat/Constructor.jsx — bloque de alpha

### Estado actual

Las acciones post-evento contienen artificialmente:

- nDoc;
- nivel;
- nDom.

Después calcularAlpha() convierte las casillas marcadas en esos conteos.

### Cirugía

Conserva las acciones como soportes descriptivos.

No las traduzcas automáticamente a \(\alpha\).

El usuario debe poder:

- declarar qué ocurrió;
- indicar si existe soporte;
- registrar referencia opcional;
- introducir/calibrar \(\alpha\) mediante el protocolo correspondiente.

El monto pagados tampoco debe modificar \(\alpha\) por sí solo salvo que el usuario seleccione explícitamente una estrategia proporcional con una base comparable definida.

---

## 2.5 dist-motor/delta.js

### Estado actual

Hace clamp a \([-1,1]\) y clasifica:

- brecha si \(>0.20\);
- sobreasuncion si \(<-0.10\);
- equilibrio en otro caso.

### Cirugía

La ruta universal debe calcular exactamente:

\[
\Delta=R^*-\alpha.
\]

No hagas clamp innecesario si ambos insumos ya están en \([0,1]\).

Devuelve como mínimo:

- valor;
- signo matemático.

Los umbrales interpretativos pertenecen a protocolos taxonómicos o de dominio, no al operador universal.

Elimina del motor universal las acciones prescriptivas como:

“protocolo integración prioritaria”

o:

“buscar nodo j”.

---

# 3. Prioridad P1 — cálculos existentes desconectados

## 3.1 IIC

### Estado actual

dist-motor/iic.js implementa:

\[
IIC=\frac{\text{coincidencias}}{\text{declarado}}.
\]

Pero Constructor.jsx fija:

nodosIIC: []

y la llamada a /api/calcular vuelve a mandar:

nodosIIC: [].

Por tanto, IIC está implementado pero funcionalmente desconectado.

Además calcularSerieII restringe IIC a nodos diseno.

### Cirugía

Crea una sección de entrada opcional para:

- declaraciones/compromisos;
- observaciones;
- coincidencias.

Pasa esos datos por la API.

El motor debe calcular IIC cuando existan los insumos, no por el nombre del tipo de nodo.

Mantén:

si no existe conjunto declarado → null.

---

## 3.2 Fraude annona

### Estado actual

Comparte archivo con IIC y usa:

\[
R^*(1-\alpha)(1-IIC).
\]

También tiene umbrales automáticos de gravedad.

### Cirugía

Sepáralo en su propio módulo.

No uses las categorías grave, moderado, bajo como interpretación universal.

Conserva la fórmula actual sólo como variante legacy/documentada hasta que la especificación canónica del operador quede conectada.

El concepto de capacidad de intervención o prevención debe poder entrar como insumo cuando corresponda.

No llames “fraude” a una configuración únicamente por un producto numérico si faltan las discriminaciones exigidas.

---

## 3.3 B*

### Estado actual

El método fuente incluye \(B^*\), pero el repositorio no tiene un módulo conectado para ello.

### Cirugía

Añade un módulo independiente.

\[
B_i^*
=
\frac{B_i}{\sum_jB_j}.
\]

No infieras beneficios.

Conserva unidad.

Si el total es cero → no aplicable.

Conecta:

Constructor → API → motor → resultados → expediente.

---

## 3.4 D_total y AD

### Estado actual

series.js sí tiene lógica de D_total y ajuste debitor.

Pero contiene una regla inventada:

si hay narrativa de trayectoria y no hay monto:

\[
T_{\text{trayectoria}}
=
0.30(T_{\text{invertido}}+T_{\text{impedido}}).
\]

Además las APIs cortan la información.

### Cirugía

Elimina el 30% automático.

Si falta monto:

indeterminado.

Mantén:

\[
D_{\text{total}}
=
T_{\text{invertido}}
+
T_{\text{impedido}}
+
\Delta T_{\text{trayectoria}}
\]

sólo cuando las unidades sean comparables y los componentes estén definidos.

Mantén:

\[
AD_i=R_i^*D_{\text{total}}.
\]

Conecta completamente los datos.

---

# 4. Prioridad P1 — robustez y sensibilidad

## 4.1 dist-motor/hipercubo.js

### Estado actual

Si hay hasta 20 aristas evalúa \(2^n\) vértices.

Si hay más de 20:

- genera 2,000 muestras con Math.random().

Después calcula impactoEnInestabilidad de cada arista contando vértices inestables en los que esa coordenada sea exactamente mínimo o máximo.

### Deuda matemática y determinista

Hay dos errores claros.

En modo exhaustivo, todas las coordenadas de todos los vértices son mínimo o máximo. Por tanto, cada vértice inestable tiende a incrementar el contador de todas las aristas; eso no identifica qué arista produjo la inestabilidad.

En modo aleatorio, una muestra continua casi nunca será exactamente igual a pesoMin o pesoMax. Por tanto, el contador tenderá a cero.

Además Math.random() viola el requisito de reproducibilidad determinista.

### Cirugía

No uses el impactoEnInestabilidad actual.

Separa:

1. sensibilidad canónica mínimo/central/máximo;
2. sensibilidad extendida.

La sensibilidad extendida debe ser determinista.

Opciones aceptables:

- hipercubo exhaustivo sólo cuando sea computacionalmente razonable;
- muestreo con semilla registrada;
- secuencia determinista de baja discrepancia;
- perturbación una-arista-a-la-vez para identificar sensibilidad marginal.

No elijas silenciosamente entre ellas si la especificación no lo fija.

El resultado debe registrar el método y, si existe, la semilla.

---

## 4.2 Declaraciones A/B/C/D

### Estado actual

hipercubo.determinarNivel() usa:

- A ≥ 90%;
- B ≥ 70%;
- C ≥ 40%;
- D < 40%.

derivados.js contiene otra función distinta que infiere A/B/C/D desde nivel de evidencia.

### Cirugía

Debe existir una sola autoridad para declaraciones.

Elimina o marca como legacy derivados.determinarDeclaracion.

No hagas que la letra dependa simultáneamente de dos criterios distintos.

En la ruta de imputación piloto usa la regla de robustez vigente del protocolo que se implemente.

Fuera de imputación, no muestres necesariamente A/B/C/D si la Taxonomía no lo solicita.

---

# 5. Prioridad P1 — dist-motor/series.js

## Estado actual

El archivo se declara:

“Las tres series siempre juntas”.

Calcula automáticamente:

- R*;
- S;
- R*_neta;
- α;
- Δ;
- IIC/fraude annona;
- hipercubo;
- declaración;
- D_total;
- AD.

Además:

- rellena α faltante con 0;
- calcula S siempre;
- ejecuta hipercubo siempre;
- presupone que todos los análisis necesitan la misma secuencia.

## Cirugía

Convierte series.js en un orquestador.

Firma conceptual:

correrAnalisis({ estructura, insumos, medicionesSolicitadas, configuracion })

Crea un registry:

- rStar;
- s;
- rStarNeta;
- alpha;
- delta;
- iic;
- fraudeAnnona;
- bStar;
- dTotal;
- ajusteDebitor;
- robustez;
- futuros operadores.

Cada operador declara:

- dependencias;
- inputs requeridos;
- resultado;
- estado calculado | no_aplicable | indeterminado | error.

No conviertas dato ausente en cero.

Ejemplo:

falta \(\alpha\) → \(\Delta\) indeterminado.

No:

falta \(\alpha\) → \(\alpha=0\) → \(\Delta=R^*\).

---

# 6. Prioridad P2 — components/chat/Constructor.jsx

## Lo recuperable

Conserva:

- estética;
- navegación por pasos;
- tarjetas;
- edición de nodos;
- edición de relaciones;
- referencias opcionales;
- cálculo;
- descarga;
- tablas de resultados.

## Deudas concretas

### 6.1 Tipo de nodo

determinarTipo() devuelve ejecucion como default.

Cámbialo a:

indeterminado

cuando las respuestas no alcancen.

No inventes tipo.

### 6.2 Hijos

determinarHijo() devuelve anteros:

- cuando no hay votos;
- cuando hay empate.

Cámbialo a:

indeterminado.

### 6.3 Contradicción Potós

El comentario afirma que Potós no es localizable desde expediente, pero la interfaz sí permite asignarlo por conviccion.

No resuelvas doctrinalmente esta contradicción en el código.

Hasta que la Taxonomía computable fije el protocolo:

- conserva la observación como dato;
- evita declarar una localización definitiva si la regla está en conflicto.

### 6.4 PREGUNTAS_MARCO

El comentario dice que el marco “informa S”, pero actualmente no existe una transformación coherente ni explícita.

No hagas que marco altere S hasta que un protocolo lo especifique.

### 6.5 Evidencia múltiple

Elimina calcularPesosMultiples como combinador heurístico.

No aumentes pesoMax por cantidad de casillas.

### 6.6 E0

Sustituye el checkbox:

“Tengo evidencia de que entre estos dos no existe conexión causal”

por una opción epistemológica:

“La transición propuesta no está materialmente acreditada en el material considerado.”

### 6.7 Número mínimo de actores

La regla:

actores.length < 2

no debe ser una invariante universal.

Puede existir un análisis con una sola unidad causal relevante.

Deja que el operador o protocolo decida sus cardinalidades mínimas.

### 6.8 Ningún involucrado conecta con resultado final

Esa validación depende del viejo nodo nodo_final.

Sustitúyela por validación de clausura del fenómeno/evento según el modelo nuevo, sin meter \(D\) en \(W\).

### 6.9 Pasos

Reestructura sin perder el estilo:

- finalidad;
- fenómeno/pregunta;
- nodos;
- relaciones/soportes;
- discriminaciones;
- mediciones;
- cálculo;
- resultados/auditoría.

---

# 7. Prioridad P2 — dist-motor/escalas.js

## Estado actual

Contiene muchas escalas por dominio embebidas directamente en el motor.

No cubre la Taxonomía completa y existen versiones distintas de las escalas en las fuentes.

Además su comentario de E0 todavía mezcla “ausencia de evidencia o arista nula”.

## Cirugía

No lo uses como autoridad universal.

Muévelo conceptualmente a la capa de Taxonomía computable.

Mientras el Frente B no entregue una versión canónica:

- conserva el archivo como legacy;
- no agregues más dominios manualmente;
- no permitas que el motor elija escalas por sí solo;
- registra taxonomiaVersion.

El motor sólo debe recibir un rango ya discriminado o una referencia a un protocolo taxonómico versionado.

---

# 8. Prioridad P2 — dist-motor/expediente.js

## Estado actual

El generador es valioso y debe conservarse, pero contiene teoría vieja incrustada.

Entre otras cosas declara:

- R* = “influencia causal total” por suma de caminos;
- “Tres Series” como arquitectura universal;
- IIC/fraude annona sólo para diseño;
- umbrales 90/70/40 del hipercubo;
- S desde Hijos;
- HISTOS automáticamente si \(|\Delta|>0.10\);
- “localización ontológica” como sección universal;
- glosario con definiciones dependientes del prototipo;
- matrices normalizadas por destino incluyendo la misma lógica de grafo.js.

### Cirugía

No reescribas el generador desde cero.

Separa:

1. plantilla;
2. datos del resultado;
3. bloques opcionales.

Haz que las secciones aparezcan sólo si el análisis las solicita o dispone de resultados.

La sección matemática debe leer los objetos producidos por el motor, no reconstruir \(W\) por su cuenta.

El expediente no debe volver a calcular la matriz.

Debe recibir la matriz/auditoría calculada y mostrarla.

Esto evita que UI, motor y expediente implementen tres matemáticas distintas.

Retira del núcleo universal:

- “Tres Series”;
- HISTOS automático;
- localización ontológica obligatoria;
- interpretación fija por umbrales;
- fórmula vieja de R*.

Estos bloques pueden volver como módulos taxonómicos cuando corresponda.

---

# 9. Prioridad P2 — pages/api/narrativa.js

## Estado actual

Usa Anthropic para generar narrativa.

### Cirugía

Elimínalo como servicio generativo.

Si se conserva un documento narrativo:

- constrúyelo con plantillas deterministas;
- usa exclusivamente resultados existentes;
- no inventes interpretación;
- no redondees de forma inconsistente;
- puede reutilizar el motor de plantillas del expediente.

Elimina la frase de deslinde que dice que la narrativa fue producida por IA.

---

# 10. Prioridad P2 — pages/api/chat.js

Elimínalo.

Contiene:

- Anthropic;
- carga de PDF/imágenes/DOCX;
- Supabase;
- reglas lingüísticas que asignan modos;
- defaults ontológicos;
- fórmulas antiguas.

Nada de esto pertenece al núcleo determinista actual.

No migres esas reglas al nuevo asistente.

El nuevo asistente debe usar reglas explícitas y estructuradas, no un prompt.

---

# 11. Prioridad P2 — autenticación

Archivos:

- pages/index.tsx;
- pages/login.tsx;
- pages/dashboard.tsx;
- utils/supabaseClient.js.

Elimina el requisito de autenticación.

La raíz debe abrir o redirigir a /constructor.

Después elimina dependencias Supabase sin uso del package.json.

---

# 12. Prioridad P2 — nombres y presentación

Centraliza en un módulo de nomenclatura.

Evita repetir traducciones en:

- Constructor.jsx;
- expediente.js;
- narrativa.js;
- otros módulos.

Mapa provisional:

- \(R^*\) → Índice de convergencia de eventos;
- \(S\) → Índice de sustituibilidad;
- \(R^*_{\text{neta}}\) → Contribución atribuible;
- \(\alpha\) → Condiciones adversas atribuibles / Asunción efectiva en vista metodológica;
- \(\Delta\) → Asimetría repercusiva.

Los nombres internos matemáticos pueden seguir siendo:

- rStar;
- s;
- rStarNeta;
- alpha;
- delta.

La nomenclatura visible no debe modificar la fórmula.

---

# 13. Prioridad P3 — módulos vacíos o heredados

dist-motor/integral.js está vacío.

dist-motor/phi2.js está vacío.

dist-motor/index.js está vacío.

No inventes contenido para “completarlos”.

Si no son necesarios en el MVP:

- elimínalos;
- o déjalos explícitamente como reservados, sin importarlos.

Evita archivos vacíos que parezcan operadores implementados.

---

# 14. Falta infraestructura de pruebas

El repositorio no contiene suite de pruebas.

Añade una sin introducir infraestructura pesada.

Opción recomendada:

Node node:test.

Añade al package.json un script test que ejecute los archivos tests.

Crea pruebas unitarias para módulos matemáticos y pruebas de integración API/motor.

Añade CI en GitHub Actions con:

- instalación limpia;
- test;
- build.

El proyecto debe poder verificarse completamente en CI, sin Supabase y sin API keys.

---

# 15. Secuencia exacta de cirugía

Work debe ejecutar en este orden:

### Bloque 1 — hacer que el repo sea ejecutable

- retirar Supabase;
- retirar Anthropic/chat;
- build limpio;
- tests mínimos de humo.

### Bloque 2 — aislar el modelo causal

- separar \(D\);
- crear modelo de análisis;
- separar aristas internas y clausura;
- corregir E0.

### Bloque 3 — reparar \(R^*\)

- refactor de grafo.js;
- Perron–Frobenius principal;
- sparse;
- regularización separada;
- pruebas PF.

### Bloque 4 — reparar operadores derivados

- S;
- R*_neta;
- α;
- Δ.

### Bloque 5 — conectar lo que ya existe

- IIC;
- B*;
- D_total;
- AD;
- sensibilidad;
- resultados API.

### Bloque 6 — limpiar robustez

- quitar random no reproducible;
- corregir análisis de sensibilidad por arista;
- una sola autoridad A/B/C/D.

### Bloque 7 — adaptar interfaz

- nueva pantalla de finalidad;
- fenómeno;
- discriminaciones;
- módulos de operadores;
- linter determinista.

### Bloque 8 — expediente

- no recalcular;
- consumir auditoría del motor;
- secciones modulares;
- exportación determinista.

### Bloque 9 — preparar Taxonomía computable

- registry de protocolos;
- versionado;
- cargador;
- sin hardcodear toda la Taxonomía en JSX.

---

# 16. Criterios de aceptación por archivo

| Archivo | Se considera corregido cuando |
|---|---|
| dist-motor/r_estrella.js | \(R^*\) usa Perron–Frobenius; no usa suma de caminos como ruta canónica; no hay fallback uniforme |
| dist-motor/grafo.js | \(D\) queda fuera; \(W_E\) conserva pesos; regularización separada; soporte sparse |
| dist-motor/sustituibilidad.js | S depende de inputs discriminados, no de normas L2 ni Hijos |
| dist-motor/alpha.js | α no depende de conteo documental |
| dist-motor/delta.js | devuelve \(R^*-\alpha\) sin umbrales universales |
| dist-motor/iic.js | IIC funciona por insumos y no por tipo; fraude annona separado |
| dist-motor/hipercubo.js | no usa random no registrado ni falsa atribución de inestabilidad |
| dist-motor/series.js | orquesta operadores solicitados; no rellena faltantes con 0 |
| dist-motor/escalas.js | deja de ser autoridad interna y queda preparado para Taxonomía versionada |
| components/chat/Constructor.jsx | no inventa tipos/modos/α/S; manda todos los insumos existentes |
| pages/api/calcular.js | devuelve todos los resultados calculados, incluido daño/AD |
| pages/api/expediente.js | pasa los mismos insumos y no pierde danio |
| dist-motor/expediente.js | muestra resultados del motor sin recalcular teoría vieja |
| pages/api/narrativa.js | eliminado o determinista |
| pages/api/chat.js | eliminado |
| Supabase | eliminado como requisito |
| tests | presentes y ejecutados en CI |

---

# 17. Resultado esperado después de esta cirugía

El repositorio no debe convertirse todavía en la Taxonomía completa.

Debe quedar como un calculador general de Metrología causal preparado para recibirla.

Después de esta cirugía:

\[
\boxed{
\text{interfaz}
\rightarrow
\text{modelo estructurado}
\rightarrow
\text{operadores deterministas}
\rightarrow
\text{auditoría única}
\rightarrow
\text{expediente}
}
\]

y nunca:

\[
\text{interfaz inventa una variable}
\rightarrow
\text{motor la trata como hecho}.
\]

La Taxonomía computable podrá incorporarse posteriormente como capa de ayuda a la discriminación, sin reconstruir el motor.
