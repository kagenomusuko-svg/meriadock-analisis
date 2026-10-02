# Auditoría 12 — CI, Vercel y entorno real

Referencia reproducible: auditoria/evidencia/verificacion-entorno.json. SHA comprobado `ce327f74baea8c1a53c36969799c409192ddea4e`; fuente runtime idéntica a baseline `14a5e64e69fab44bdc757900d49f2e7e0f56d9f3` (comparación remota: sólo documentos, auditoria/ y tests/auditoria-*). Los commits documentales siguientes no cambian ese runtime ni dependencias.

| Comprobación | Resultado / evidencia | Alcance |
|---|---|---|
| npm ci local | PASS, 384 paquetes | Sin secretos ni servicios obligatorios |
| npm test local | 44/44 PASS, tests.txt | Incluye caracterización de defectos; no aceptación |
| npm run build local | PASS Next14.2.35, lint/types/generación | Mismo runtime baseline |
| test:ui local | BLOQUEADO: Chromium ausente; descarga Playwright truncada tras reintentos | Limitación instrumental, no fallo de aplicación acreditado por instalación |
| CI instalación/test/build/Chromium/testUI | SUCCESS run37071552089, job111051922579, todas las etapas | 44 tests pasan; navegador instala correctamente |
| CI recorrido | UI → API → PF/IIC/B*/D_total/AD → resultados → descarga: VERDE; sin errores de página | Flujo feliz; no incluye duplicado ni todas las reservas |
| Deployment production | dpl_Dr2B9hZvv9JvhxN3GhdxbtYFUayv, READY, SHAce327f74… | READY acredita construcción, no corrección doctrinal |
| Alias público | https://meriadock-analisis.vercel.app/constructor, carga y ocho pantallas recorridas | Caso sintético; sin datos persistentes reales |
| Recorrido adverso producción | Duplicado A→A rompe render; stack guardado en ui-duplicado.json | AU-03 reproducido aunque CI feliz verde |
| Valores UI/JSON/HTML | UI coincide con formatos; HTTP local exacto API/motor/HTML/JSON | Descarga cloud no entregó evento30s; no se afirma comparación byte a byte de red productiva |
| Errores recientes | Consulta baseline 24h sin entradas devueltas | No ausencia universal; fallo cliente sí observado |
| Dominio personalizado | prometeo.meriadock.org.mx devolvió502/connection refused desde instrumento | No concluir caída global: alias público funciona; revisar DNS/red si persiste desde otro entorno |
| URL individual de despliegue | Muro de acceso Vercel; alias público accesible | No se introdujeron credenciales ni se cambió protección |
| Divergencia main/producción | ce327f74 listo al consultar; commits sólo documentales pueden estar construyéndose temporalmente | No divergencia de código funcional con baseline; registrar SHA, no asumir despliegueinstantáneo |

CI: https://github.com/kagenomusuko-svg/meriadock-analisis/actions/runs/37071552089. Baseline también success37066860060 y anterior37064025902. Las cancelaciones intermedias entre commits documentales corresponden a sucesión de builds y no se interpretan como error del motor.

No se necesita Supabase, Auth, Edge Function, LLM ni secrets para calcular; se revisaron imports/config y prueba smoke. No se creó ni modificó base de datos. Vercel se actualiza automáticamente por los commits autorizados en main y el árbol de producción se conserva.

Estado: CONFORME_CON_RESERVA de entorno; sistema NO_ACEPTADO por hallazgos, independientemente de READY/verde. Ver UI, expediente y registro antes de interpretar un resultado.
