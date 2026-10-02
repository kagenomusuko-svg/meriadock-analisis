# Instrucciones de implementación para Work — Calculador de Metrología causal

## Propósito de este documento

Ejecuta estas instrucciones sobre el repositorio existente:

kagenomusuko-svg/meriadock-analisis

No reconstruyas el proyecto desde cero salvo que una parte concreta sea técnicamente irrecuperable. Este repositorio ya contiene una interfaz útil, un constructor de casos, módulos matemáticos, generación de expediente y varias piezas que deben conservarse. La tarea es **corregir deudas conceptuales, retirar dependencias que ya no corresponden y conectar cálculos que ya existen o que quedaron incompletos**.

Este documento es una orden de implementación. No es una lista de temas para investigar.

La regla general del producto es:

Humano discrimina → programa orienta y valida → motor calcula → expediente explicita.

El programa no debe inventar hechos, no debe leer expedientes mediante IA, no debe decidir causalidad por lenguaje probabilístico y no debe exigir que el usuario suba la documentación fuente.

---

# 1. Mantén el proyecto existente y corrige la arquitectura

Trabaja sobre el Next.js ya presente.

Conserva, en la medida en que sigan siendo útiles:

- components/chat/Constructor.jsx como base visual y funcional del constructor;
- pages/constructor.tsx;
- dist-motor como núcleo de cálculo, reorganizándolo;
- pages/api/calcular.js;
- pages/api/expediente.js;
- dist-motor/expediente.js;
- los estilos, logo y estructura visual ya existentes;
- la idea de un recorrido por pasos;
- la representación de nodos, relaciones, evidencia, resultados y expediente descargable.

No conserves decisiones del prototipo que contradigan estas instrucciones.

---

# 2. Elimina el bloqueo de acceso y toda dependencia obligatoria de Supabase

El proyecto debe abrir directamente sin autenticación.

Haz lo siguiente:

1. Cambia pages/index.tsx para que redirija directamente a /constructor.
2. Elimina cualquier comprobación de sesión.
3. Elimina la dependencia funcional de:
   - pages/login.tsx;
   - pages/dashboard.tsx;
   - utils/supabaseClient.js.
4. Si esos archivos dejan de tener función, elimínalos.
5. Elimina del package.json las dependencias de Supabase que queden sin uso.
6. Ejecuta npm install o el equivalente para actualizar package-lock.json.
7. Verifica que npm run build funcione sin variables NEXT_PUBLIC_SUPABASE_*.

Criterio de cierre:
abrir la aplicación debe llevar al constructor sin login y sin necesitar Supabase.

---

# 3. Elimina la IA generativa del producto

No uses Anthropic, OpenAI ni ningún LLM.

Haz lo siguiente:

1. Elimina pages/api/chat.js.
2. Elimina cualquier interfaz de chat que dependa de ese endpoint.
3. Sustituye pages/api/narrativa.js por una salida determinista o elimina ese endpoint y reutiliza el generador de expediente.
4. El botón “Análisis narrativo” no debe llamar a ningún modelo.
5. Si se conserva un resumen en lenguaje natural, debe ser construido por plantillas y reglas deterministas a partir de los resultados.
6. Elimina @anthropic-ai/sdk del package.json.
7. Elimina mammoth si ya no existe ninguna función legítima de carga de archivos que lo requiera.
8. No añadas embeddings, OCR, RAG ni ningún servicio externo.

Criterio de cierre:
el proyecto debe compilar y funcionar sin API keys y sin llamadas a modelos generativos.

---

# 4. Introduce una primera pantalla de orientación

Antes del flujo actual del caso, añade una pantalla inicial con la pregunta:

## ¿Qué quieres hacer con este análisis?

Presenta tres opciones por su finalidad, no por el nombre técnico como encabezado principal.

Opción 1:
“Reconstruir y sostener una atribución causal frente a contradicción o impugnación.”

Guardar internamente:
familia = "imputacion_causal"

Opción 2:
“Estudiar un sistema para detectar exposición, fallas de diseño, prevención e intervención.”

Guardar internamente:
familia = "compliance_causal"

Opción 3:
“Describir y medir causalmente un fenómeno sin finalidad inmediata adversarial u organizacional.”

Guardar internamente:
familia = "contabilidad_ontologica"

Los tres nombres técnicos pueden aparecer en la vista avanzada o en el expediente, pero no deben ser necesarios para que el usuario entienda qué elegir.

Después de la familia, pide:

“¿Qué estás analizando?”

Por ahora implementa un selector genérico de dominio o un campo de texto estructurado. La Taxonomía computable se integrará después desde otro frente de Work.

No bloquees ningún operador por familia. Las tres familias deben poder calcular todo el repertorio cuando existan los insumos.

---

# 5. Sustituye el concepto rígido de “caso adverso” por “análisis de fenómeno”

En Constructor.jsx, el primer paso actual pregunta:

“¿Cuál es el resultado adverso que se analiza?”

Cámbialo por una formulación general, por ejemplo:

“Describe el fenómeno, evento o estructura que quieres analizar.”

Conserva un campo de título.

Añade un campo separado para la pregunta del análisis.

Ejemplo de estructura interna:

analisis = {
  familia,
  dominio,
  titulo,
  pregunta,
  fenomeno: {
    descripcion,
    eventoDeterminado
  }
}

El fenómeno no tiene que ser adverso.

---

# 6. Separa el evento determinado del grafo operativo

La implementación actual utiliza un nodo sintético tipo final y lo integra en la representación del grafo.

Corrígelo.

El evento determinado D puede existir en la representación descriptiva o visual, pero:

D no entra en W.
D no recibe coordenada en R*.

Implementa una separación explícita:

- nodosActivos: nodos que pueden participar en el cálculo;
- eventoDeterminado: objeto separado;
- conexionesCierre: relaciones de los nodos activos con el evento o punto de cierre, cuando sean necesarias para el método de rondas.

Puedes conservar temporalmente un nodo visual final para no romper la interfaz, pero crea un adaptador que lo saque antes del cálculo.

Nunca construyas la matriz operativa con el nodo final incluido.

Añade pruebas automáticas que fallen si D aparece en W o en el vector R*.

---

# 7. Corrige E0

La interfaz actual usa una formulación equivalente a “tengo evidencia de que no existe conexión causal”.

Sustitúyela.

La formulación operativa debe ser:

“La transición causal propuesta no está materialmente acreditada en el material considerado.”

E0 significa cero epistémico, no cero ontológico.

Implementación:

- una arista o transición en E0 recibe peso empírico 0;
- el nodo no se elimina por ello;
- el nodo puede conservar otros datos, incluida α;
- E0 no debe activar mensajes como “conexión imposible” o “causalidad inexistente”;
- cualquier regularización matemática debe registrarse separadamente y nunca contarse como evidencia.

Elimina cualquier texto o lógica que equipare E0 con “evidencia positiva de inexistencia” como regla universal del sistema actual.

---

# 8. Cambia el tratamiento de evidencia múltiple

En Constructor.jsx existe una regla que toma la evidencia más fuerte y aumenta pesoMax +0.05 por cada evidencia adicional.

Elimina esa regla.

No incrementes automáticamente un rango por contar documentos.

La combinación de evidencias debe provenir de una regla taxonómica explícita.

Mientras la Taxonomía computable no esté integrada:

- deja que el usuario seleccione el tipo/nivel aplicable;
- muestra las evidencias declaradas como soporte;
- no alteres el rango mediante una heurística inventada.

Mantén la referencia documental como campo opcional.

No pidas subir archivos.

---

# 9. Refactoriza series.js: deja de ejecutar “las tres series siempre juntas”

dist-motor/series.js no debe asumir que todos los análisis ejecutan siempre la misma secuencia.

Conviértelo en un orquestador de operadores.

La nueva idea debe ser equivalente a:

correrAnalisis({
  estructura,
  medicionesSolicitadas,
  insumos
})

Cada operador debe:

- declarar qué insumos necesita;
- devolver resultado o estado “no calculable”;
- no inventar defaults;
- poder ejecutarse sin que los demás operadores sean obligatorios.

Puedes mantener una función de compatibilidad correrAnalisisCompleto mientras migras la interfaz, pero internamente debe usar el nuevo registro de operadores.

---

# 10. Programa R* como “Índice de convergencia de eventos” mediante Perron–Frobenius

Nombre interno:
rStar

Nombre visible:
Índice de convergencia de eventos

No uses “vector de responsabilidad causal” como etiqueta general de interfaz.

La regla matemática canónica es:

\[
W_D R^* = \rho(W_D)R^*
\]

con:

\[
R^*_i \ge 0,
\qquad
\sum_i R^*_i = 1.
\]

Perron–Frobenius es el operador central para obtener la distribución estable de convergencia en sistemas complejos. No lo sustituyas por una normalización directa de aristas ni por un recorrido finito de caminos como algoritmo general.

## 10.1 Construcción de \(W_D\)

Construye \(W_D\) exclusivamente con los nodos causalmente relevantes respecto del evento determinado \(D\).

Reglas:

- \(D\) no entra en \(W_D\);
- \(D\) no recibe coordenada en \(R^*\);
- \(W_D\) contiene sólo relaciones entre antecedentes;
- si la convención del repositorio conserva \(W_{ij}=w(N_i\to N_j)\), implementa el eigenvector derecho de \(W_D\), no el de \(W_D^\top\), salvo que una fuente canónica posterior ordene explícitamente la convención transpuesta;
- documenta la convención en código y pruebas para impedir cambios silenciosos.

No normalices por origen o destino sólo porque una biblioteca de Markov lo espere. La normalización de \(W_D\) debe seguir la especificación metrológica, no transformar el problema en una cadena de Markov distinta.

## 10.2 Cálculo de \(R^*\)

Implementa Perron–Frobenius mediante iteración de potencia para la ruta ordinaria:

1. inicializa un vector positivo, por ejemplo:

\[
r^{(0)}_i=\frac1n;
\]

2. itera:

\[
\tilde r^{(t+1)}=W_D r^{(t)};
\]

3. normaliza en norma \(L^1\):

\[
r^{(t+1)}
=
\frac{\tilde r^{(t+1)}}
{\sum_i \tilde r^{(t+1)}_i};
\]

4. calcula el error:

\[
e_t=
\left\|
r^{(t+1)}-r^{(t)}
\right\|_1;
\]

5. detén cuando:

\[
e_t<\text{tol};
\]

6. calcula y registra el residuo espectral:

\[
\left\|
W_D R^*-\rho R^*
\right\|;
\]

7. devuelve también el eigenvalor dominante estimado \(\rho\), número de iteraciones y estado de convergencia.

Firma sugerida:

calcularRStar(W, {
  tolerancia,
  maxIteraciones,
  regularizacion
})

Salida:

{
  vector,
  eigenvalorDominante,
  iteraciones,
  convergio,
  errorFinal,
  residuo,
  regularizacionAplicada,
  epsilon
}

No uses distribución uniforme como fallback si el cálculo falla. Devuelve estado no convergente o no calculable.

## 10.3 Matrices grandes: representación dispersa

El motor debe poder operar con al menos 1,000 nodos sin construir innecesariamente una matriz densa.

Usa representación dispersa por aristas o una estructura equivalente:

- lista de adyacencia ponderada;
- CSR/CSC;
- u otra representación sparse.

La multiplicación matriz-vector debe recorrer únicamente aristas existentes.

Complejidad objetivo por iteración:

\[
O(|E|)
\]

y memoria:

\[
O(|E|+|N|).
\]

No implementes Perron–Frobenius mediante descomposición completa de eigenvalores de una matriz densa para la ruta ordinaria.

## 10.4 Regularización

Conserva separadas:

\[
W_E
\]

y:

\[
W_\varepsilon.
\]

Si \(W_E\) no satisface las condiciones requeridas para una convergencia estable, aplica la regularización metrológica definida por el sistema:

\[
W_\varepsilon = W_E+\varepsilon K.
\]

Reglas:

- \(\varepsilon\) no es evidencia;
- \(K\) no crea una arista empíricamente acreditada;
- registra el valor de \(\varepsilon\);
- permite calcular \(R^*(\varepsilon)\);
- permite análisis de sensibilidad cuando \(\varepsilon\to0^+\);
- nunca sobrescribas \(W_E\) con la versión regularizada.

Si \(K\) es densa pero estructuralmente simple, impleméntala de forma implícita para no convertir una red sparse de 1,000 o más nodos en una matriz densa.

## 10.5 Irreducibilidad, primitividad y diagnóstico

Antes o durante el cálculo:

- diagnostica reducibilidad;
- diagnostica periodicidad cuando sea pertinente;
- registra si la matriz cumple las condiciones suficientes usadas por el motor;
- si no las cumple, no cambies la causalidad para satisfacer la matemática;
- aplica únicamente la regularización metrológica autorizada o devuelve un diagnóstico explícito.

No interpretes irreducibilidad como “todos llegan a D”. \(D\) no pertenece a la matriz.

## 10.6 Escenarios de evidencia

Para cada escenario:

- mínimo;
- central;
- máximo;

construye la correspondiente matriz empírica:

\[
W_{\min},\quad
W_{\mathrm{central}},\quad
W_{\max}
\]

y calcula Perron–Frobenius independientemente en cada una.

Central = punto medio del rango cuando ésa sea la regla vigente para el operador.

La sensibilidad compara los tres vectores obtenidos.

## 10.7 Método de rondas

No elimines el método de rondas de la documentación ni de la vista de auditoría.

Pero no lo uses como sustituto conceptual de Perron–Frobenius.

Cuando se utilice como iteración sucesiva:

\[
r^{(t+1)}
=
\frac{W_D r^{(t)}}{\|W_D r^{(t)}\|_1},
\]

las “rondas” son precisamente las iteraciones de potencia mediante las cuales el software aproxima \(R^*\).

La interfaz ordinaria no obliga al usuario a ejecutarlas manualmente.

En ejemplos pedagógicos o grafos pequeños puedes mostrar ronda 0, ronda 1, ronda 2, etc.; en grafos grandes muestra iteraciones resumidas, error de convergencia y residuo.

## 10.8 Pruebas canónicas de Perron–Frobenius

Añade un caso mínimo con:

\[
W=
\begin{pmatrix}
0.9 & 0.4\\
0.1 & 0.6
\end{pmatrix}.
\]

El eigenvector derecho dominante normalizado debe ser aproximadamente:

\[
R^*=(0.8,0.2).
\]

Añade también:

- una matriz reducible;
- una matriz periódica;
- una matriz regularizada;
- un grafo sparse determinista de al menos 1,000 nodos.

Para el caso de 1,000 nodos verifica:

- convergencia o diagnóstico explícito;
- \(R_i^*\ge0\);
- \(\sum_iR_i^*=1\);
- ausencia de matriz densa innecesaria;
- tiempo y memoria razonables para CI.

## 10.9 Compatibilidad con el repositorio actual

dist-motor/r_estrella.js contiene actualmente dos rutas:

- una ruta principal de “influencia causal total por todos los caminos”;
- una implementación de iteración de eigenvector conservada sólo por compatibilidad.

Invierte esa situación.

La implementación de Perron–Frobenius debe convertirse en la ruta principal de \(R^*\).

La suma de productos de caminos puede conservarse únicamente como diagnóstico o cálculo especializado si tiene una función separada y explícitamente nombrada. No debe presentarse como \(R^*\) canónico.

Corrige además la multiplicación transpuesta actual si contradice la convención canónica \(W_D R^*=\rho(W_D)R^*\).

# 11. Mantén el hipercubo sólo como análisis extendido

dist-motor/hipercubo.js puede conservarse como herramienta adicional de sensibilidad.

No debe sustituir el análisis canónico de tres escenarios.

El resultado estándar de robustez debe construirse primero con:

R*_min
R*_central
R*_max

Implementa el árbol:

1. Si el líder es el mismo en los tres escenarios:
   - si el orden completo también es igual → Declaración A;
   - si cambia el orden secundario → Declaración B.
2. Si cambia el líder:
   - si en el escenario central la diferencia entre los dos candidatos principales es > 10 puntos porcentuales → Declaración C;
   - si no → Declaración D.

No uses como regla primaria los umbrales actuales 90/70/40% de vértices del hipercubo.

El hipercubo puede mostrarse en auditoría como “sensibilidad extendida”.

---

# 12. Reprograma S como “Índice de sustituibilidad”

Nombre interno:
s

Nombre visible:
Índice de sustituibilidad

Elimina como regla principal el cálculo actual de dist-motor/sustituibilidad.js basado en:

- norma L2 de aristas entrantes;
- norma L2 de aristas salientes;
- promedio con S_mode.

Esa heurística no debe producir S automáticamente.

Implementa un operador general:

calcularS(componentes, pesosOpcionales)

Cada componente debe estar en [0,1].

Si no hay pesos:
S = promedio(componentes)

Si hay pesos:
S = suma(componentes_i × peso_i) / suma(pesos)

No inventes componentes faltantes.

Para el protocolo piloto, usa tres componentes de igual peso:

A. formalización/procedimiento;
B. sustituibilidad del actor en la posición;
C. determinación por sistema/incentivos.

Cada componente puede aceptar cualquier valor continuo entre 0 y 1.

Ejemplo canónico:

Banco:
[0.0, 0.4, 0.1] → S ≈ 0.17

Riesgos:
[0.5, 0.5, 0.7] → S ≈ 0.57

Asesores:
[1.0, 1.0, 1.0] → S = 1.00

Instrumental:
S = null / N/A salvo que una futura regla taxonómica diga otra cosa.

La Taxonomía computable podrá sustituir las preguntas visibles y los componentes por dominio, pero no deberá reescribir la función de agregación sin una regla explícita.

---

# 13. Programa “Contribución atribuible”

Nombre interno:
rStarNeta

Nombre visible:
Contribución atribuible

Fórmula:

R*_neta = R* × (1 − S)

Implementa:

calcularContribucionAtribuible(rStar, s)

Reglas:

- si R* falta → no calculable;
- si S falta → no calculable;
- no sustituyas S faltante por 0;
- para nodo instrumental con S = null, devuelve null.

Pruebas canónicas:

Banco:
0.580 × (1 − 0.17) ≈ 0.481

Riesgos:
0.113 × (1 − 0.57) ≈ 0.049

Asesores:
0.172 × (1 − 1.00) = 0

---

# 14. Reprograma α como “Condiciones adversas atribuibles”

Nombre interno:
alpha

Nombre visible principal:
Condiciones adversas atribuibles

Nombre metodológico en ayuda avanzada:
Asunción efectiva

Elimina la fórmula actual basada en:

nDoc / nRef
y
nDom / nI

El número de documentos no debe calcular α.

α representa el grado efectivo en que consecuencias vinculadas al evento recaen, son soportadas, reparadas, incorporadas o asumidas por el nodo.

Implementa un contrato flexible:

alpha = {
  valor: número entre 0 y 1,
  estrategia,
  soportes: [],
  referenciaOpcional
}

Estrategias admitidas inicialmente:

1. "discriminado":
   el analista introduce directamente un valor de 0 a 1 con apoyo del protocolo.

2. "proporcion_monetaria":
   sólo cuando el dominio y las unidades lo permitan:
   alpha = min(1, montoEfectivamenteAsumido / baseComparativa)

3. "taxonomico":
   reservado para que la futura Taxonomía calcule o traduzca respuestas a un valor.

No selecciones una estrategia automáticamente.

Las acciones posteriores pueden registrarse como soportes, pero no deben convertirse en α mediante conteo automático.

Ejemplo de prueba:

B = 0.08
R = 0.03
A = 0.62

El sistema debe aceptar esos valores y conservar sus soportes.

---

# 15. Programa Δ como “Asimetría repercusiva”

Nombre interno:
delta

Nombre visible:
Asimetría repercusiva

Fórmula exacta:

Δ_i = R*_i − α_i

Implementa:

calcularDelta(rStar, alpha)

No hagas clamp.

No uses los umbrales actuales:

> 0.20
< -0.10

para decidir automáticamente “brecha”, “sobreasunción” o “equilibrio”.

La salida básica debe ser:

{
  valor,
  signo: "positiva" | "negativa" | "cero"
}

Texto determinista:

Δ > 0:
“Índice de convergencia mayor que condiciones adversas atribuibles.”

Δ < 0:
“Condiciones adversas atribuibles mayores que índice de convergencia.”

Δ = 0:
“Coincidencia entre ambas magnitudes.”

Cualquier umbral interpretativo adicional deberá venir de la Taxonomía, no del motor universal.

Pruebas:

B:
0.580 − 0.08 = +0.500

R:
0.113 − 0.03 = +0.083

A:
0.172 − 0.62 = −0.448

---

# 16. Separa los Hijos de Afrodita/Ágape del cálculo automático de S

Mantén identificadores internos si son útiles:

fobos
deimos
anteros
eros
potos
harmonia

Centraliza su traducción visible en un solo archivo o módulo.

Usa provisionalmente:

fobos → Presión de consecuencias
deimos → Parálisis estructural
anteros → Reciprocidad / práctica precedente
eros → Apertura
potos → Convicción propia
harmonia → Deliberación integrada

No dupliques nombres distintos en varios archivos.

Elimina la regla actual:

si no hay información → anteros

Si no hay información suficiente:

modo = "indeterminado"

Los modos pueden orientar preguntas taxonómicas, pero no deben producir S automáticamente.

---

# 17. Conecta IIC a la interfaz y elimina el bloqueo por tipo de nodo

dist-motor/iic.js ya calcula:

IIC = coincidencias / total declarado

Conserva esa operación básica.

No la limites en el motor a:

nd.tipo === "diseno"

La aplicabilidad debe depender de que existan:

- elementos declarados;
- elementos observados;
- coincidencias identificadas.

Si no hay declarados:
IIC = null.

Añade en la interfaz un bloque opcional para registrar:

- compromisos/declaraciones;
- observaciones;
- coincidencias.

No obligues al usuario a subir documentos.

---

# 18. Trata Fraude annona como operador separado y no lo confundas con IIC

El módulo actual calcula:

R* × (1 − α) × (1 − IIC)

No elimines esa implementación hasta revisar su fuente, pero no la presentes como definición universal definitiva si la Taxonomía o la especificación vigente exige incorporar capacidad de intervención o prevención.

Haz lo siguiente:

1. renombra internamente la implementación actual, si es necesario, como variante documentada;
2. crea una interfaz estable calcularFraudeAnnona(input);
3. permite que la Taxonomía posterior determine los insumos exactos;
4. no derives “fraude” de un nodo sólo porque R* sea alto, α bajo e IIC bajo;
5. conserva el concepto de intervención no ejercida como dato discriminable.

Si no existe todavía una regla canónica suficiente para una variante, devuelve “no calculable” en vez de inventar.

---

# 19. Añade B* porque está en el método y no está conectado al motor actual

Crea un módulo, por ejemplo:

dist-motor/b_estrella.js

Nombre interno:
bStar

Nombre visible provisional:
Distribución de beneficio (B*)

Cálculo:

B*_i = beneficioNeto_i / beneficioTotal

donde:

beneficioTotal = suma de beneficios netos de los nodos.

Reglas:

- si beneficioTotal = 0 → B* no aplicable;
- nodo sin beneficio → 0;
- no inferir beneficio;
- permitir beneficio monetario o cuantificado por la unidad que declare el análisis;
- conservar unidad.

Añade una sección opcional de beneficios al constructor.

Conecta B* a resultados y expediente.

No mezcles B* con R*.

---

# 20. Conecta D_total y Ajuste debitor: actualmente están cortados

Constructor.jsx ya construye danioCalc y ya envía danio a /api/calcular.

Pero pages/api/calcular.js no usa danio.

Corrígelo:

1. destructura danio del body;
2. pásalo a series.correrAnalisis...;
3. devuelve dTotal y ajusteDebitor en la respuesta.

Haz lo mismo en pages/api/expediente.js:

1. recibe danio;
2. pásalo al motor;
3. incluye el resultado en el expediente.

Mantén:

D_total =
T_invertido
+ T_impedido
+ ΔT_trayectoria

y:

AD_i = R*_i × D_total

No uses R*_neta para AD salvo que una regla futura lo ordene.

Elimina cualquier estimación automática de trayectoria del tipo:

si hay narrativa pero no monto → 30%

si esa regla no está sustentada expresamente. Si falta el monto, déjalo indeterminado.

---

# 21. Crea un asistente determinista tipo “linter causal”

No hagas un chat.

Añade un panel de ayuda vinculado al estado del análisis.

Debe producir tres tipos de mensajes:

ERROR:
impide un cálculo concreto.

WARN:
permite continuar, pero deja una deuda explícita.

INFO:
recuerda una medición o discriminación posible.

Ejemplos de reglas:

ERR_DELTA_SIN_ALPHA
si se solicita Δ y falta α.

ERR_RSTAR_SIN_APORTES
si no existe ninguna contribución al cierre.

WARN_REFERENCIA_AUSENTE
si el usuario declara soporte pero no registra referencia.

WARN_E0
si una transición se conserva como E0.

INFO_S_DISPONIBLE
si existe un nodo activo al que todavía no se ha calculado S.

INFO_IIC_DISPONIBLE
si existen declaraciones y observaciones suficientes.

El mismo estado debe producir siempre los mismos mensajes.

No analices semánticamente texto libre con IA.

---

# 22. Conserva el cuadro de texto libre, pero no lo conviertas en parser inteligente

El usuario debe poder escribir una descripción libre del fenómeno.

El programa puede comprobar reglas simples, por ejemplo:

- campo vacío;
- ausencia de título;
- ausencia de pregunta;
- evento demasiado genérico porque no se ha llenado la estructura mínima;
- nodos inexistentes;
- aristas sin soporte declarado.

No intentes “entender” todo el español del usuario.

La descomposición debe ocurrir mediante campos y preguntas estructuradas.

---

# 23. Rediseña el flujo de Constructor.jsx sin perder su estilo

Conserva la estética y el patrón de pasos.

Propuesta mínima:

0. Finalidad del análisis
1. Fenómeno y pregunta
2. Nodos
3. Relaciones y soportes
4. Discriminaciones complementarias
5. Medidas adicionales
6. Calcular
7. Resultados / auditoría

En “Discriminaciones complementarias” deben poder aparecer, según disponibilidad:

- S;
- α;
- modos;
- IIC;
- intervención;
- prevención;
- recurrencia;
- exposición;
- otras variables taxonómicas.

En “Medidas adicionales”:

- B*;
- daño;
- ajuste debitor;
- sensibilidad extendida;
- otros operadores.

La futura Taxonomía decidirá qué preguntar primero, pero el constructor ya debe estar preparado para recibir módulos dinámicos.

---

# 24. Crea un modelo de datos estable para integrar después la Taxonomía

No acoples preguntas taxonómicas directamente al JSX.

Crea una estructura de análisis semejante a:

{
  version,
  familia,
  dominio,
  pregunta,
  fenomeno,
  eventoDeterminado,
  nodos,
  relaciones,
  soportes,
  discriminaciones,
  medicionesSolicitadas,
  resultados,
  mensajes
}

Cada nodo debe poder contener:

{
  id,
  nombre,
  tipo,
  descripcion,
  modo,
  s,
  alpha,
  iic,
  beneficios,
  soportes
}

Cada relación:

{
  id,
  origen,
  destino,
  tipo,
  evidenciaNivel,
  rango,
  referencia,
  estado
}

Las conexiones al evento determinado deben poder almacenarse separadamente de las mediaciones internas.

Esto permitirá que la Taxonomía computable llegue después desde otro repositorio o carpeta sin tener que rehacer el motor.

---

# 25. Genera un expediente metrológico determinista

dist-motor/expediente.js debe convertirse en el generador principal de salida.

El expediente debe mostrar claramente:

- finalidad/familia;
- dominio;
- pregunta;
- fenómeno;
- evento determinado;
- nodos;
- relaciones;
- soportes declarados;
- referencias opcionales;
- niveles/rangos;
- R* mínimo, central y máximo;
- S;
- contribución atribuible;
- α;
- Δ;
- IIC si aplica;
- B* si aplica;
- D_total y AD si aplica;
- robustez;
- advertencias;
- método utilizado;
- pasos de auditoría.

No uses lenguaje que implique que el programa verificó documentos que no recibió.

Usa fórmulas como:

“Según los insumos declarados por el analista...”

y no:

“el expediente demuestra...”

cuando el programa no tuvo acceso al expediente fuente.

---

# 26. Añade vista de auditoría adaptativa

La vista normal debe ser sencilla.

La vista técnica debe permitir inspeccionar:

- matriz empírica y, si aplica, matriz regularizada;
- iteraciones de potencia;
- error de convergencia;
- eigenvalor dominante estimado;
- residuo espectral;
- normalización L1;
- vector final;
- componentes de S;
- valor de α y estrategia;
- cálculo de Δ;
- escenarios de sensibilidad;
- mensajes de deuda;
- versión del motor.

Automatización no significa opacidad.

La cantidad de detalle visible debe adaptarse al tamaño del sistema, sin cambiar la matemática.

## 26.1 Grafos pequeños

Cuando el número de nodos y aristas permita una lectura humana razonable, muestra la aritmética completa:

- vector inicial;
- cada iteración o ronda;
- multiplicaciones;
- sumas;
- normalizaciones;
- diferencia entre iteraciones;
- criterio de convergencia.

El propósito es pedagógico y probatorio: hacer visible el razonamiento que conduce a \(R^*\).

## 26.2 Grafos medianos y grandes

Cuando el detalle completo sea impracticable en pantalla, no reduzcas ni cambies el cálculo.

Muestra un resumen auditable:

- número de nodos;
- número de aristas;
- representación sparse utilizada;
- número de iteraciones;
- tolerancia;
- error final;
- residuo espectral;
- eigenvalor dominante;
- suma de \(R^*\);
- top de nodos por \(R^*\);
- advertencias de reducibilidad, periodicidad o regularización.

Permite exportar o desplegar el detalle iterativo completo si el usuario lo solicita.

## 26.3 Regla de escalabilidad

No establezcas un límite conceptual pequeño de nodos porque los ejemplos pedagógicos utilicen pocos actores.

La implementación debe diseñarse para que el mismo operador funcione desde grafos pequeños hasta redes de al menos 1,000 nodos, y debe evitar barreras artificiales en la interfaz.

Si aparece un límite técnico real por memoria, tiempo o infraestructura:

- documenta el límite;
- mide el punto de falla;
- no lo presentes como límite teórico de la Metrología causal;
- prioriza optimización sparse antes que reducción arbitraria del universo causal.

La regla es:

\[
\boxed{
\text{mismo operador}
\;+\;
\text{distinta escala de representación}
}
\]

No implementes “modo simple” y “modo complejo” como matemáticas distintas para \(R^*\).

# 27. Pruebas obligatorias

Crea pruebas automáticas al menos para:

1. acceso sin Supabase;
2. build sin API keys;
3. D fuera de W;
4. D fuera de R*;
5. R* por Perron–Frobenius en matriz canónica pequeña;
6. R* por Perron–Frobenius en grafo sparse de al menos 1,000 nodos;
7. diagnóstico de matriz reducible/periódica y regularización;
8. separación entre W_E y W_epsilon;
9. S por promedio;
10. contribución atribuible;
11. α discriminado;
12. Δ;
13. E0 conserva el nodo;
14. IIC;
15. B*;
16. D_total;
17. AD;
18. escenarios mínimo/central/máximo con R* por Perron–Frobenius;
19. declaraciones A/B/C/D;
20. danio llega correctamente desde Constructor → API → motor → expediente;
21. nodosIIC dejan de estar hardcodeados como [];
22. ausencia de un dato requerido produce “no calculable” y no un valor inventado.

---

# 28. Orden de implementación

Trabaja en este orden y haz un commit al cerrar cada bloque:

## Fase A — Acceso y limpieza

- quitar Supabase;
- quitar IA;
- build limpio.

Producto:
aplicación accesible y compilable sin servicios externos.

## Fase B — Modelo y cierre causal

- separar D;
- nuevo modelo de análisis;
- corregir E0;
- adaptar Constructor.

Producto:
constructor estructural sin matemáticas incorrectas.

## Fase C — Núcleo matemático

- R*;
- sensibilidad de tres escenarios;
- S;
- contribución atribuible;
- α;
- Δ;
- IIC;
- B*;
- D_total;
- AD.

Producto:
motor determinista con pruebas canónicas.

## Fase D — Conexión de cálculos existentes

- quitar hardcodes;
- pasar danio;
- pasar IIC;
- conectar resultados;
- expediente.

Producto:
ningún cálculo implementado debe quedar inaccesible por una conexión rota.

## Fase E — Asistente determinista

- reglas ERROR/WARN/INFO;
- panel de estado;
- mensajes.

Producto:
ayuda metodológica sin chat.

## Fase F — Preparación para Taxonomía computable

- contratos de módulos;
- esquema estable;
- cargador o registry de protocolos;
- dominio piloto genérico.

Producto:
la Taxonomía futura puede integrarse sin reescribir el motor.

---

# 29. No hagas estas cosas

No:

- vuelvas a convertir el producto en una IA;
- uses un LLM para “interpretar” el caso;
- metas D en la matriz;
- elimines nodos por E0;
- conviertas regularización en evidencia;
- calcules S desde normas del grafo sin regla taxonómica;
- calcules α contando documentos;
- uses defaults silenciosos;
- asignes Anteros cuando no hay datos;
- obligues al usuario a subir expedientes;
- bloquees operadores por familia;
- mantengas “tres series siempre juntas”;
- uses el hipercubo como sustituto del análisis canónico de tres escenarios;
- inventes una fórmula cuando una especificación esté incompleta.

Si una regla matemática queda genuinamente contradictoria entre fuentes, crea un archivo DECISION_PENDIENTE_<tema>.md con:

- fuentes en conflicto;
- implementación actual;
- consecuencias de cada alternativa;
- punto exacto que requiere decisión.

No resuelvas la contradicción por cuenta propia.

---

# 30. Criterio final de éxito

La implementación se considera correcta cuando:

1. el usuario entra sin login;
2. elige qué quiere hacer con el análisis;
3. describe un fenómeno;
4. discrimina nodos, relaciones y soportes;
5. no necesita subir el expediente fuente;
6. el programa le señala deudas y faltantes de forma determinista;
7. calcula R*, S, contribución atribuible, α y Δ con los nombres visibles definidos;
8. puede calcular IIC, B*, daño, AD y otros operadores cuando existan insumos;
9. produce escenarios mínimo, central y máximo;
10. genera una declaración de robustez reproducible;
11. exporta un expediente metrológico;
12. permite auditar cada operación;
13. no usa IA;
14. no inventa datos;
15. queda preparado para que otra sesión de Work integre después la Taxonomía computable.

La regla de producto es:

El humano trabaja donde debe trabajar; el programa le quita deuda mecánica, le recuerda los puentes que faltan y calcula exactamente las consecuencias de lo que el humano declaró.
