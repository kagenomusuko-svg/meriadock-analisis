# Auditoría 11 — Cobertura de pruebas

> Registro histórico de Work02. El estado vigente posterior a las correcciones está en MATRIZ_CORRECCION_POST_AUDITORIA.md, REPERTORIO_POST_CORRECCION.md y AUDITORIA_REACEPTACION_POST_CORRECCION.md. Las reproducciones originales se conservan para trazabilidad; no describen defectos abiertos de Work03.

44 pruebas pasan localmente (evidencia/tests.txt); 18 eran baseline. El número no mide fidelidad doctrinal. Los tests AUD-* caracterizan defectos actuales y deben invertirse como regresiones en una orden posterior. No modifican runtime. Todas las suites se revisaron; las comparaciones puras y HTTP son distintas de la observación visual de producción.

| Requisito / autoridad | Test / fixture | Cobertura observada | Hueco / estado |
|---|---|---|---|
| Separar análisis/D/nodos, familias; instr §§1–7 | modelo.test, interfaz-expediente.test | Adaptador y equivalencia familias; IDs nodo | E niveles/cierre/IDs relación no suficientemente validados; PARCIAL |
| WR=ρR derecho, L1, residuo; orden02§7 | pf.test y canonicos PF formal [[.9,.4],[.1,.6]] | Vector (.8,.2), distingue izquierda | No prueba validez empírica del grafo; CONFORME |
| D externo y E0; invariantes9–11 | pf.test, AUD-01, AUD-13 | D no coordenada; pesoE0 cero; cierre negativo aceptado caracteriza defecto | Clausura acreditada no garantizada; PARCIAL AU-01 |
| Degeneración reducible/periódica/nula | pf.test, AUD-05, diagnostico.cjs | Vector no converge→null; periodicidad y reducción explícitas | Convergencia especial no garantía universal; CONFORME_CON_RESERVA |
| ε registrado, W_E intacto | pf.test, AUD-09, diagnostico epsilon ladder | Acción sparse de K uniforme; sensibilidad registrada | Config/inputs originales faltan en expediente; PARCIAL AU-06 |
| Escala n=1/2/10/100/1000/10000 | diagnostico.cjs evidencia/diagnostico.json; pf.test1000 | E=2N; memoria y tiempos; límite1000 iteraciones explícito | Medición de proceso sin aislamiento GC; no SLA de producción; CONFORME_CON_RESERVA |
| Casos fuentes actuales/históricos | canonicos + casos-fuente.json; comparar_corpus.cjs + matrices-corpus.json | Ocho transcripciones y seis matrices: diferencias justificadas | No forzar igualdad con pedagogía/inputs incompletos; CONFORME_CON_RESERVA |
| Shapley fórmula fuente completa | canonicos CF12 + aritmetica-fuente.json | Seis permutaciones detectan errata Chevron | No implementa Shapley runtime; NO_IMPLEMENTADO |
| I_inv conflicto | canonicos CF16 + aritmetica-fuente.json | Cociente decreciente con denominador creciente | Significado futuro pendiente; DECISION_REQUERIDA |
| S piloto/no inventar; neta límites0/1; Δ signo | derivados.test, AUD-06 | Promedio/pesos, instrumental no aplicable, null y cero | No calibración de S universal; CONFORME_CON_RESERVA |
| α discriminado/proporción/ausencia; Δ no clamp | derivados.test, operadores.test, AUD-03 | Estrategias, faltantes independientes | Linter no conoce α externo; PARCIAL AU-11 |
| IIC declaración/observación y Fraude nolegacy | operadores.test, canonicos MCII | Contrato conteo; fraude reservado | No protocolo canónico programable del fraude; NO_IMPLEMENTADO |
| B* unidad/total/cero/negativos | operadores.test, AUD-02/04 | División actual, overflow y pérdida de metadata reproducidos | Límites finitos efectivos; PARCIAL AU-04/05 |
| D_total/AD unidades, null/cero | operadores.test, diferencial AUD-11 | Suma y distribución bruta; ausencia propagada | Overflow, trayectoria y evidencia de estimación no universales; PARCIAL |
| A–D estricto>.10, empate líder | operadores.test, auditoria-robustez AUD-08 | Frontera exacta, empate principal, empate secundario afecta A/B | Permutación secundaria falla semántica; PARCIAL AU-14 |
| Hipercubo/presupuesto/E0 | auditoria-robustez AUD-09 | 7 vértices insuficientes/8 completos deterministas | Etiqueta calculado pese a vectores faltantes; PARCIAL AU-15 |
| Fallos locales, dependencia entre operadores | operadores.test | No solicitado y ausencia, B/daño independientes de PF | Modelo inválido/op desconocido abortan todo; CONFORME_CON_RESERVA |
| Registro/loader taxonómico | interfaz-expediente.test, AUD-07 | Map/clonado y hardcode generico@1 | Falta prueba end-to-end protocolo alternativo; PARCIAL AU-07 |
| Misma entrada→mismo resultado | AUD-06/09, diferencial.cjs | deepEqual repetido, ningún LLM/secreto | Identidades UI/folio distintos; no entran en fórmula; CONFORME |
| API/HTML/JSON consumen snapshot sin recálculo | auditoria-diferencial AUD-10 + diferencial.json, diferencial.cjs | Igualdad HTTP API/motor/HTML y JSON serializado | UI exacta por visual/formato, descarga producción no certificada; CONFORME_CON_RESERVA |
| Conservar inputs/version/config | auditoria-diferencial AUD-11 | Ausencia originalconfig y daño parcial caracterizados | No reconstrucción universal; PARCIAL AU-06 |
| Escapar HTML/no certificación fuentes | interfaz-expediente.test | Escapes y disclaimer; independencia de motor | Accesibilidad de export no exhaustiva; CONFORME_CON_RESERVA |
| UI duplicado y validación sin crash | auditoria-diferencial AUD-12; ui-duplicado.json | Excepción linter + reproducción producción en blanco | Test UI feliz CI no captura este flujo; PARCIAL AU-03 |
| UI flujo normal/navegación | scripts/verificar-ui.cjs, ui-produccion.json | CI navegador y recorrido8 pantallas en producción | WCAG/lector de pantalla no certificados; PARCIAL AU-18 |
| Build/instalación sin servicios | smoke.test, npmci, build, CI | Acceso directo sin Supabase/LLM/secrets obligatorios | No pruebas de carga distribuida; CONFORME_CON_RESERVA |

## Procedimientos reproducibles

npm ci; npm test; npm run build. node auditoria/diagnostico.cjs; python auditoria/extraer_matrices.py (requiere corpus local obtenido); node auditoria/comparar_corpus.cjs; node auditoria/diferencial.cjs (inicia y cierra su servidor Next construido). Los tests normales sólo necesitan fixtures versionados, no lectura remota del corpus. La extracción es diagnóstica y no ejecuta código Python del autor. test:ui usa Playwright; el navegador local no pudo instalarse, pero CI lo instala y ejecuta.

No hay «test verde» que subsane los hallazgos: los siete tests de caracterización fijan precisamente comportamiento incorrecto o incompleto. El plan posterior debe añadir expectativas doctrinales y corregir implementación sólo tras nueva orden.
