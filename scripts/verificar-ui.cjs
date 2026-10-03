'use strict';
const {chromium}=require('playwright');const {spawn}=require('node:child_process');const assert=require('node:assert/strict');
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--port','3100'],{stdio:['ignore','pipe','pipe']});
let browser,page;let logs='';server.stdout.on('data',d=>logs+=d);server.stderr.on('data',d=>logs+=d);
(async()=>{
 try{
  await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('Servidor no arrancó: '+logs)),30000);server.stdout.on('data',()=>{if(logs.includes('Ready')){clearTimeout(timer);resolve();}});server.on('exit',c=>{clearTimeout(timer);reject(Error('Servidor terminó '+c+': '+logs));});});
  const redirect=await fetch('http://127.0.0.1:3100/',{redirect:'manual'});assert.equal(redirect.status,307);assert.equal(redirect.headers.get('location'),'/constructor');
  browser=await chromium.launch({headless:true});page=await browser.newPage({viewport:{width:1024,height:900}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const {GENERICO}=require('../taxonomia/protocolos');
  const fixtureProtocolo={...GENERICO,id:'fixture_ui',version:'2',alcance:'fixture_sin_calibracion',componentesS:[{id:'manual',texto:'Componente alternativo explícito'}],preguntas:[{id:'contexto',texto:'Pregunta alternativa',tipo:'texto'}]};
  await page.route('**/api/protocolos',route=>route.fulfill({contentType:'application/json',body:JSON.stringify({protocolos:[GENERICO,fixtureProtocolo]})}));
  await page.goto('http://127.0.0.1:3100/');await page.getByRole('heading',{name:'¿Qué quieres hacer con este análisis?'}).waitFor();
  await page.getByRole('radio',{name:/Describir y medir/}).check();await page.getByLabel('¿Qué estás analizando? Dominio').fill('Genérico');
  async function tab(name){const b=page.getByRole('button',{name:new RegExp(name)});await b.focus();await page.keyboard.press('Enter');assert.equal(await b.getAttribute('aria-current'),'step');assert.equal(await page.locator('h1').evaluate(el=>el===document.activeElement),true);}
  await tab('Fenómeno y pregunta');await page.getByLabel('Título del análisis').fill('Fixture PF');await page.getByLabel('Pregunta del análisis',{exact:true}).fill('¿Cómo converge?');await page.getByLabel('Describe el fenómeno, evento o estructura que quieres analizar.').fill('Sistema de dos nodos');await page.getByLabel('Evento determinado / punto de cierre (D)').fill('Evento D');
  await tab('Nodos');for(const name of ['A','B']){await page.getByLabel('Nombre del nuevo nodo').fill(name);await page.getByRole('button',{name:'Agregar nodo',exact:true}).click();}
  await tab('Finalidad');await page.getByLabel('Protocolo taxonómico versionado').selectOption('fixture_ui@2');await tab('Discriminaciones');
  assert.equal(await page.getByLabel('Componente alternativo explícito',{exact:true}).count(),2);assert.equal(await page.getByLabel('Pregunta alternativa',{exact:true}).count(),2);
  await tab('Finalidad');await page.getByLabel('Protocolo taxonómico versionado').selectOption('generico@1');
  await tab('Relaciones y soportes');
  for(const [origen,destino,peso] of [['A','A','.9'],['A','B','.4'],['B','A','.1'],['B','B','.6'],['A','D — Evento D','1']]){
   await page.getByLabel('Origen',{exact:true}).selectOption({label:origen});await page.getByLabel('Destino',{exact:true}).selectOption({label:destino});await page.getByLabel('Nivel aplicable discriminado por el analista').selectOption('1');await page.getByLabel('Peso mínimo').fill(peso);await page.getByLabel('Peso máximo').fill(peso);await page.getByRole('button',{name:'Agregar relación',exact:true}).click();
  }
  // AU-03: errores esperados conservan borrador y no rompen render.
  await page.getByLabel('Origen',{exact:true}).selectOption({label:'A'});await page.getByLabel('Destino',{exact:true}).selectOption({label:'A'});await page.getByLabel('Nivel aplicable discriminado por el analista').selectOption('1');await page.getByLabel('Peso mínimo').fill('.9');await page.getByLabel('Peso máximo').fill('.9');await page.getByRole('button',{name:'Agregar relación',exact:true}).click();await page.getByRole('alert').filter({hasText:'Relación duplicada'}).waitFor();assert.equal(await page.getByLabel('Peso mínimo').inputValue(),'.9');assert.equal(await page.getByRole('alert').evaluate(el=>el===document.activeElement),true);
  await page.getByLabel('Peso mínimo').fill('-.9');await page.getByRole('button',{name:'Agregar relación',exact:true}).click();await page.getByRole('alert').filter({hasText:'rango no negativo'}).waitFor();
  await page.getByLabel('Origen',{exact:true}).evaluate(el=>el.add(new Option('ID inválido','id_inexistente')));await page.getByLabel('Origen',{exact:true}).selectOption('id_inexistente');await page.getByLabel('Peso mínimo').fill('.9');await page.getByRole('button',{name:'Agregar relación',exact:true}).click();await page.getByRole('alert').filter({hasText:'Identificadores'}).waitFor();await page.getByLabel('Origen',{exact:true}).selectOption({label:'A'});
  await tab('Discriminaciones');
  for(const [name,alpha,s] of [['A','.08',['0','.4','.1']],['B','.03',['.5','.5','.7']]]){
   const card=page.locator('article').filter({has:page.getByRole('heading',{name,exact:true})});
   for(const [i,label] of ['Formalización / procedimiento','Sustituibilidad del actor en la posición','Determinación por sistema / incentivos'].entries())await card.getByLabel(label,{exact:true}).fill(s[i]);
   await card.getByLabel('Estrategia de α (asunción efectiva)').selectOption('discriminado');await card.getByLabel('α entre 0 y 1').fill(alpha);
   await card.locator('summary').filter({hasText:'Índice de integridad causal'}).click();await card.getByLabel('Declaraciones / compromisos (uno por línea)').fill('x\ny');await card.getByLabel('Observaciones (una por línea)').fill('x');await card.getByLabel('Coincidencias identificadas').fill('1');
  }
  await tab('Medidas adicionales');await page.getByLabel('Unidad de los beneficios netos').fill('MXN');await page.getByLabel('A: beneficio neto (0 si expresamente no hay beneficio)').fill('30');await page.getByLabel('B: beneficio neto (0 si expresamente no hay beneficio)').fill('10');await page.getByLabel('Unidad común del daño').fill('MXN');for(const [label,v]of [['T_invertido','100'],['T_impedido','20'],['ΔT_trayectoria','30']])await page.getByLabel(label,{exact:true}).fill(v);
  await tab('Calcular');for(const label of ['Índice de convergencia de eventos','Índice de sustituibilidad','Contribución atribuible','Condiciones adversas atribuibles','Asimetría repercusiva','Índice de integridad causal','Distribución de beneficio (B*)','Daño total','Ajuste debitor','Robustez de tres escenarios'])await page.getByRole('checkbox',{name:label,exact:true}).check();
  const response=page.waitForResponse(r=>r.url().endsWith('/api/calcular'));await page.getByRole('button',{name:'Calcular mediciones seleccionadas'}).click();const data=await (await response).json();assert.equal(data.dTotal.dTotal,150);assert.ok(Math.abs(data.rStar[0].valor-.8)<1e-9);assert.equal(data.serieII[0].valor,.5);assert.equal(data.bStar[0].valor,.75);assert.equal(data.declaracion.nivel,'A');assert.equal(data.rStar.length,2);
  await page.getByText('Declaración A',{exact:true}).waitFor();assert.ok((await page.locator('table').first().innerText()).includes('80.00%'));
  const download=page.waitForEvent('download');await page.getByRole('button',{name:'Descargar expediente',exact:true}).click();const file=await download;assert.ok(file.suggestedFilename().endsWith('.html'));const fs=require('node:fs');const html=fs.readFileSync(await file.path(),'utf8');assert.ok(html.includes('150'));assert.ok(html.includes('120'));assert.ok(!html.includes('Tres Series'));
  assert.equal(await page.locator('[aria-live=polite]').count()>0,true);
  const contrast=await page.locator('main label,nav button,header a').evaluateAll(els=>{const rgb=s=>s.match(/[\d.]+/g).map(Number),lum=a=>{const c=a.slice(0,3).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;});return .2126*c[0]+.7152*c[1]+.0722*c[2];};return els.filter(el=>el.getClientRects().length).map(el=>{const st=getComputedStyle(el);let p=el,bg;while(p){bg=rgb(getComputedStyle(p).backgroundColor);if(bg.length<4||bg[3]===1)break;p=p.parentElement;}const f=lum(rgb(st.color)),b=lum(bg||[255,255,255]);return {texto:el.innerText,color:st.color,fondo:bg,ratio:(Math.max(f,b)+.05)/(Math.min(f,b)+.05)};});});
  require('node:fs').writeFileSync('/tmp/meriadock-contraste.json',JSON.stringify(contrast,null,2));assert.ok(contrast.length>0);assert.ok(contrast.every(x=>x.ratio>=4.5),JSON.stringify(contrast.filter(x=>x.ratio<4.5)));
  await page.screenshot({path:'/tmp/meriadock-verificacion.png',fullPage:true});assert.deepEqual(errors,[]);console.log('UI → API → PF/IIC/B*/D_total/AD → resultados → descarga: VERDE; sin errores de página.');
 }catch(e){if(page){console.error('Estado de interfaz:',await page.locator('body').innerText());await page.screenshot({path:'/tmp/meriadock-error.png',fullPage:true}).catch(()=>{});}throw e;}finally{if(browser)await browser.close();server.kill();}
})().catch(e=>{console.error(e);process.exitCode=1;});
