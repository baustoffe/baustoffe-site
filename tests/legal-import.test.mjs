import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const routes=['termeni-si-conditii','politica-de-confidentialitate','politica-cookies','livrare-si-plata','gdpr'];
const replacements=[
 ['SC Chir-Man-Di SRL','BEST BAUSTOFFE SRL'],['Chirmandi SRL','BEST BAUSTOFFE SRL'],
 ['www.chirmandi.ro','acest site'],['.chirmandi.ro','acest site'],['Chirmandi.ro','acest site'],['chirmandi.ro','acest site'],
 ['chirmandi@yahoo.com','pagina de contact'],['chirmandi@yahoo.ro','pagina de contact'],
 ['localitatea Chirpar','Jud. Valcea, Sat Cainenii Mici, Comuna Caineni, Strada Cazacilor Nr 9'],
 ['RO 16459680','52365190'],['J32/811/2004','J2025062807006'],['0269/219921 sau 0785/286986','0759 378 281'],['Chirmandi','Baustoffe']
];
for(const route of routes) test(`${route}: every source block preserved with company/contact substitutions only`,()=>{
 const original=JSON.parse(fs.readFileSync(`docs/legal-sources/${route}.json`,'utf8'));
 const expected={...original,blocks:original.blocks.map(b=>({...b,text:replacements.reduce((s,[from,to])=>s.split(from).join(to),b.text)}))};
 const file=`src/content/legal/${route}.json`;
 assert.ok(fs.existsSync(file),'Full imported document must exist');
 const actual=JSON.parse(fs.readFileSync(file,'utf8'));
 assert.deepEqual(actual,expected);
 assert.doesNotMatch(actual.blocks.map(b=>b.text).join('\n'),/Chirmandi|Chir-Man-Di|16459680|J32\/811\/2004|chirmandi@/i);
 const page=fs.readFileSync(`src/app/${route}/page.tsx`,'utf8');
 assert.ok(page.includes(`@/content/legal/${route}.json`),'Page must render the full imported document');
});
test('Terms contain exact company identifiers and registered address',()=>{
 const file='src/content/legal/termeni-si-conditii.json';
 assert.ok(fs.existsSync(file));
 const text=JSON.parse(fs.readFileSync(file,'utf8')).blocks.map(b=>b.text).join('\n');
 for(const value of ['BEST BAUSTOFFE SRL','52365190','J2025062807006','Jud. Valcea, Sat Cainenii Mici, Comuna Caineni, Strada Cazacilor Nr 9']) assert.ok(text.includes(value),value);
});
