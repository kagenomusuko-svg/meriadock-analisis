# ORDEN WORK 01 — Ejecución autónoma del refactor de Metrología causal

## Mandato

Trabaja directamente sobre este repositorio:

kagenomusuko-svg/meriadock-analisis

Tu objetivo es ejecutar de forma autónoma el plan ya definido en:

1. INSTRUCCIONES_WORK_IMPLEMENTACION_METROLOGIA_CAUSAL.md
2. AUDITORIA_DEUDAS_IMPLEMENTACION.md
3. ESTADO_IMPLEMENTACION.md

No conviertas esta orden en una nueva fase de planificación. Lee esos documentos, inspecciona el código actual y empieza a modificar el repositorio.

La regla de trabajo es:

humano aprueba arquitectura → Work ejecuta → prueba → commit → marca estado → continúa.

No te detengas después de cada tarea, archivo, commit o fase para pedir autorización. Continúa por tu cuenta mientras exista una solución compatible con las instrucciones y las fuentes canónicas.

El usuario debe poder responder simplemente:

CONTINÚA

y debes reanudar exactamente desde el último estado registrado en ESTADO_IMPLEMENTACION.md, sin pedir que vuelva a explicar el proyecto.

---

# 1. Regla de autonomía

Puedes decidir por tu cuenta todo lo que sea una decisión técnica de implementación que no cambie el significado metrológico del sistema.

Puedes decidir sin consultar:

- nombres internos de funciones y tipos;
- organización de carpetas;
- extracción de utilidades;
- refactors;
- estructura de tests;
- detalles de UI que no alteren el significado de los datos;
- estrategia de representación sparse;
- optimizaciones;
- eliminación de código muerto;
- corrección de imports;
- actualización de lockfile;
- CI;
- separación en módulos;
- manejo de errores;
- compatibilidad temporal durante migraciones.

No preguntes al usuario cuál de dos implementaciones técnicas equivalentes prefiere. Elige la más simple, auditable y compatible con el repositorio.

---

# 2. Cuándo debes detenerte

Detente únicamente cuando exista una decisión que necesariamente cambie el significado del sistema y que las fuentes no resuelvan.

Se considera bloqueo obligatorio sólo alguno de estos casos:

1. Dos fuentes canónicas vigentes prescriben fórmulas incompatibles para el mismo operador y producen resultados distintos.
2. Hay dos definiciones incompatibles de una misma variable y elegir una modificaría lo que se mide.
3. La implementación exige introducir una regla, umbral, proxy o default no autorizado por las fuentes.
4. Una operación destructiva no prevista afectaría datos o artefactos que no pueden recuperarse mediante Git.
5. Una credencial o permiso externo imprescindible bloquea materialmente el trabajo y no existe alternativa local o CI.
6. Una prueba canónica demuestra una contradicción matemática real que no puede resolverse como bug.
7. Una decisión taxonómica pertenece expresamente al Frente B y no existe todavía protocolo computable que la resuelva.

No es bloqueo:

- que un archivo esté mal organizado;
- que una dependencia esté obsoleta;
- que el build falle por código corregible;
- que falten tests;
- que haya que renombrar una función;
- que haya que migrar datos internos;
- que un componente de UI deba reescribirse;
- que sea necesario eliminar Supabase o Anthropic;
- que una función legacy deba dejar de usarse;
- que exista una opción técnica mejor para sparse o Perron–Frobenius.

Cuando exista un bloqueo obligatorio:

- no improvises;
- no avances sobre la decisión bloqueada;
- sí continúa con tareas independientes que no dependan de ella;
- crea o actualiza DECISION_PENDIENTE_<tema>.md;
- deja en ESTADO_IMPLEMENTACION.md la tarea como BLOQUEADA;
- explica en el chat únicamente:
  - qué decisión exacta hace falta;
  - qué fuentes están en conflicto;
  - cuáles son las alternativas;
  - qué cambia con cada alternativa.

No hagas preguntas amplias como “¿cómo quieres continuar?”.

---

# 3. Estado persistente del trabajo

ESTADO_IMPLEMENTACION.md es el tablero operativo del proyecto.

Reglas:

1. No marques una tarea como completada antes de que su implementación y pruebas hayan sido comiteadas.
2. Al completar una tarea:
   - cambia [ ] por [x];
   - añade el SHA corto del commit;
   - añade una nota breve si fue necesario cambiar la estrategia prevista.
3. Si está bloqueada:
   - conserva [ ];
   - añade BLOQUEADA — DECISION_PENDIENTE_<tema>.md.
4. Si descubres una tarea nueva necesaria para cumplir una invariante ya aprobada:
   - añádela al bloque correspondiente;
   - no expandas el alcance a funcionalidades no pedidas.
5. Nunca borres del tablero una tarea ya completada.
6. Al final de cada bloque actualiza “Último punto seguro”.

El archivo de estado forma parte del trabajo y debe quedar versionado.

---

# 4. Política de commits

Haz commits pequeños y coherentes.

Formato recomendado:

- chore: retirar autenticación Supabase
- chore: retirar integración LLM
- refactor: separar evento determinado del grafo operativo
- fix: restaurar Perron-Frobenius como R* canónico
- fix: eliminar proxy automático de sustituibilidad
- feat: conectar IIC al constructor
- feat: añadir cálculo B*
- fix: propagar daño hasta ajuste debitor
- test: añadir fixtures canónicos de R*

Antes de cada commit:

1. ejecuta los tests relevantes;
2. ejecuta build cuando el cambio pueda afectarlo;
3. corrige errores;
4. actualiza ESTADO_IMPLEMENTACION.md;
5. comitea.

Si un commit rompe tests previamente verdes, no avances hasta corregirlo o registrar un bloqueo obligatorio.

---

# 5. Regla sobre fuentes

No normalices la Metrología causal para hacerla coincidir con definiciones externas.

Orden de autoridad:

1. instrucciones explícitas de los documentos de implementación;
2. especificaciones matemáticas y postulados vigentes;
3. Taxonomía vigente cuando corresponda;
4. libros fuente del sistema;
5. código legacy sólo como evidencia de implementación previa, nunca como autoridad conceptual.

Si una librería, framework o convención externa usa otro nombre o convención, adapta la implementación al sistema del autor.

---

# 6. Primera ejecución: comienza por el Bloque 1

No te limites a describirlo. Ejecútalo.

## Bloque 1 — hacer que el repositorio sea ejecutable sin servicios externos

### 1.1 Baseline

- inspecciona package.json, package-lock, rutas y APIs;
- registra el estado inicial de build;
- registra dependencias Supabase y Anthropic;
- crea tests de humo mínimos si hacen falta;
- no cambies todavía matemáticas.

### 1.2 Retirar Supabase

- haz que / abra o redirija a /constructor;
- elimina obligación de login;
- elimina comprobaciones de sesión;
- retira pages/login.tsx, pages/dashboard.tsx y utils/supabaseClient.js si quedan sin uso;
- elimina dependencias Supabase no utilizadas;
- actualiza lockfile;
- verifica build sin variables NEXT_PUBLIC_SUPABASE_*.

### 1.3 Retirar IA generativa

- elimina pages/api/chat.js;
- elimina @anthropic-ai/sdk;
- elimina la dependencia funcional del endpoint narrativo generativo;
- reemplaza narrativa por plantilla determinista si puede hacerse sin mezclar todavía la cirugía matemática; si no, desactívala temporalmente y deja su reconstrucción para la fase correspondiente;
- elimina textos que afirmen que una salida fue producida por IA;
- no añadas otro proveedor.

### 1.4 Verificación

El Bloque 1 sólo se cierra si:

- instalación limpia funciona;
- tests de humo funcionan;
- npm run build funciona;
- no se requiere Supabase;
- no se requiere API key de IA;
- /constructor es accesible;
- no quedan imports rotos de Supabase o Anthropic.

Cuando cierres el Bloque 1:

- marca sus tareas en ESTADO_IMPLEMENTACION.md;
- registra los commits;
- no te detengas;
- pasa directamente al Bloque 2.

---

# 7. Continúa automáticamente con los bloques siguientes

Después del Bloque 1, sigue AUDITORIA_DEUDAS_IMPLEMENTACION.md:

Bloque 2 — aislar el modelo causal y separar D.

Bloque 3 — reparar R* con Perron–Frobenius, sparse y regularización separada.

Bloque 4 — reparar S, R*_neta, α y Δ.

Bloque 5 — conectar IIC, B*, D_total, AD y demás cálculos existentes.

Bloque 6 — corregir robustez y sensibilidad y eliminar aleatoriedad no registrada.

Bloque 7 — adaptar la interfaz y crear el asistente determinista.

Bloque 8 — hacer que el expediente consuma la auditoría del motor y no recalcule.

Bloque 9 — preparar el contrato para Taxonomía computable.

No necesitas una nueva orden al terminar un bloque.

Sólo detente por un bloqueo obligatorio o cuando todo el tablero esté cerrado.

---

# 8. Perron–Frobenius es invariante

No sustituyas R* por suma finita de caminos, normalización directa general ni otro operador.

Con la convención canónica:

W_ij = w(N_i → N_j)

debe cumplirse:

W R* = ρ(W) R*

y:

Σ_i R*_i = 1.

La iteración de potencia es el método computacional ordinario.

Para grafos pequeños muestra aritmética completa.

Para grafos grandes usa representación sparse y auditoría resumida.

No introduzcas un límite conceptual de nodos.

---

# 9. Ausencia de datos

Regla global:

ausente ≠ 0

salvo que cero sea un valor explícitamente discriminado.

Ejemplos:

- falta α → Δ indeterminado;
- falta S → R*_neta indeterminado;
- falta monto de trayectoria → trayectoria indeterminada;
- falta localización modal → modo indeterminado;
- falta soporte de una transición → E0 si esa es la discriminación declarada, no “causalidad inexistente”.

No uses fallbacks uniformes ni defaults ontológicos.

---

# 10. Formato de reportes al usuario

Mientras trabajes, evita informes largos después de cada commit.

Cuando no exista bloqueo, al terminar una tanda significativa responde sólo con:

- bloque actual;
- tareas cerradas;
- commits;
- tests/build;
- siguiente tarea.

Si el usuario responde CONTINÚA, reanuda desde ESTADO_IMPLEMENTACION.md.

No vuelvas a explicar el plan completo.

---

# 11. Condición de parada

Sólo termina la ejecución autónoma cuando:

A. exista una decisión obligatoria del usuario;

o

B. todas las tareas del tablero estén [x], las pruebas pasen y el build sea verde.

En cualquier otro caso, continúa.
