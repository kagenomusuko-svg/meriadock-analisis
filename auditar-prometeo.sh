#!/bin/bash
# =============================================
# AUDITORÍA DEL REPOSITORIO PROMETEO / MERIADOCK
# Ejecutar desde la raíz del proyecto:
#   bash auditar-prometeo.sh
# =============================================

echo ""
echo "═══════════════════════════════════════════════════"
echo "  AUDITORÍA PROMETEO — $(date '+%Y-%m-%d %H:%M')"
echo "═══════════════════════════════════════════════════"

# ── ESTRUCTURA GENERAL ──────────────────────────────────
echo ""
echo "▶ ESTRUCTURA DEL PROYECTO"
echo "─────────────────────────"
find . -not -path '*/node_modules/*' -not -path '*/.git/*' -not -path '*/.next/*' \
  -type f | sort | head -80

# ── ARCHIVOS CLAVE ──────────────────────────────────────
echo ""
echo "▶ ARCHIVOS CLAVE — ¿existen?"
echo "─────────────────────────────"
archivos=(
  "pages/api/chat.js"
  "pages/api/calcular.js"
  "pages/api/expediente.js"
  "dist-motor/grafo.js"
  "dist-motor/calcular.js"
  ".env.local"
  "package.json"
)
for f in "${archivos[@]}"; do
  if [ -f "$f" ]; then
    lineas=$(wc -l < "$f")
    echo "  ✅  $f  ($lineas líneas)"
  else
    echo "  ❌  $f  — NO ENCONTRADO"
  fi
done

# ── TAMAÑO DE ARCHIVOS CRÍTICOS ─────────────────────────
echo ""
echo "▶ TAMAÑO DE ARCHIVOS CRÍTICOS"
echo "──────────────────────────────"
for f in pages/api/chat.js pages/api/calcular.js pages/api/expediente.js; do
  [ -f "$f" ] && wc -l "$f"
done

# ── SYSTEM PROMPT ACTUAL ─────────────────────────────────
echo ""
echo "▶ SYSTEM PROMPT ACTUAL EN chat.js"
echo "───────────────────────────────────"
if [ -f "pages/api/chat.js" ]; then
  # Extrae las primeras líneas donde suele estar el system prompt
  grep -n "system\|SYSTEM\|role.*system\|content.*Prometeo\|content.*eres\|content.*Eres" \
    pages/api/chat.js | head -30
  echo ""
  echo "  (fragmento del archivo):"
  sed -n '1,80p' pages/api/chat.js
else
  echo "  ❌ chat.js no encontrado"
fi

# ── FASES DEL CHAT ───────────────────────────────────────
echo ""
echo "▶ FASES DETECTADAS EN chat.js"
echo "──────────────────────────────"
if [ -f "pages/api/chat.js" ]; then
  grep -n "INTAKE\|GRAFO\|ANÁLISIS\|ANALISIS\|fase\|phase\|PHASE\|FASE\|estado\|estado_actual" \
    pages/api/chat.js | head -20
fi

# ── MOTOR MATEMÁTICO ─────────────────────────────────────
echo ""
echo "▶ MOTOR MATEMÁTICO — dist-motor/"
echo "──────────────────────────────────"
if [ -d "dist-motor" ]; then
  ls -la dist-motor/
  echo ""
  echo "  Funciones exportadas en dist-motor:"
  grep -rn "module.exports\|export\|function " dist-motor/ 2>/dev/null | head -30
else
  echo "  ❌ Carpeta dist-motor/ no encontrada"
fi

# ── API DE EXPEDIENTE ────────────────────────────────────
echo ""
echo "▶ EXPEDIENTE — secciones generadas"
echo "────────────────────────────────────"
if [ -f "pages/api/expediente.js" ]; then
  grep -n "Sección\|Seccion\|sección\|section\|Section\|Documento\|Glosario\|glosario" \
    pages/api/expediente.js | head -20
fi

# ── VARIABLES DE ENTORNO ─────────────────────────────────
echo ""
echo "▶ VARIABLES DE ENTORNO (.env.local)"
echo "─────────────────────────────────────"
if [ -f ".env.local" ]; then
  # Muestra solo los nombres de las variables, NO los valores
  grep -v '^#' .env.local | grep '=' | sed 's/=.*/=***/' 
else
  echo "  ❌ .env.local no encontrado"
fi

# ── PACKAGE.JSON ─────────────────────────────────────────
echo ""
echo "▶ DEPENDENCIAS (package.json)"
echo "──────────────────────────────"
if [ -f "package.json" ]; then
  cat package.json
fi

# ── ÚLTIMO COMMIT ────────────────────────────────────────
echo ""
echo "▶ GIT — últimos commits"
echo "────────────────────────"
git log --oneline -10 2>/dev/null || echo "  (no es un repositorio git o git no disponible)"

echo ""
echo "═══════════════════════════════════════════════════"
echo "  FIN DE AUDITORÍA"
echo "═══════════════════════════════════════════════════"
echo ""
echo "Copia todo el output de arriba y compártelo."
