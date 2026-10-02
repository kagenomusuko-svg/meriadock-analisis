# Extrae únicamente arrays numéricos explícitos, no ejecuta código del corpus.
import re, json, ast, hashlib
from pathlib import Path
root=Path('/workspace/scratch/09c308d4205c/audit-sources')
out=[]
for p in sorted(root.rglob('*.md')):
 t=p.read_text()
 for m in re.finditer(r'(\w+)\s*=\s*np\.array\(\s*\[',t):
  start=m.end()-1;depth=0;end=None
  for j in range(start,len(t)):
   if t[j]=='[':depth+=1
   if t[j]==']':
    depth-=1
    if depth==0:end=j+1;break
  if end is None:continue
  rows=re.findall(r'\[\s*((?:-?\d+(?:\.\d*)?|\.\d+)(?:\s*,\s*(?:-?\d+(?:\.\d*)?|\.\d+))+\s*)\]',t[start:end])
  if not rows:continue
  matrix=[ast.literal_eval('['+s+']') for s in rows]
  if len(matrix)<2 or any(len(r)!=len(matrix) for r in matrix):continue
  line=t[:m.start()].count('\n')+1
  out.append({'id':f'MAT-{len(out)+1:03d}','fuente':str(p.relative_to(root)),'linea':line,'variable':m[1],'matrizLiteral':matrix,'convencionLiteral':'orientación y final según contexto; no se corrige el ejemplo','clase':'código ilustrativo de fuente; último índice tratado como final sólo para contraste con su algoritmo explícito'})
Path('auditoria/fixtures/matrices-corpus.json').write_text(json.dumps(out,ensure_ascii=False,indent=2))
print(len(out),'matrices cuadradas extraídas')
for x in out:print(x['id'],x['fuente'].split('/')[-1],x['variable'],len(x['matrizLiteral']))
