const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
test('acceso directo sin servicios externos',()=>{
 const p=require('../package.json');
 assert.ok(!Object.keys(p.dependencies).some(k=>/supabase|anthropic|mammoth/.test(k)));
 assert.match(fs.readFileSync('pages/index.tsx','utf8'),/destination: "\/constructor"/);
 for(const f of ['pages/login.tsx','pages/dashboard.tsx','pages/api/chat.js','utils/supabaseClient.js']) assert.ok(!fs.existsSync(f));
 assert.ok(fs.existsSync('pages/constructor.tsx'));
});
