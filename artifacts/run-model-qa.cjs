const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { createRequire } = require('node:module');
const { performance } = require('node:perf_hooks');
const project = path.resolve(__dirname, '../template-solar-main');
const ts = createRequire(path.join(project, 'package.json'))('typescript');
function load(relative) {
  const result = { exports: {} };
  const js = ts.transpileModule(fs.readFileSync(path.join(project, relative), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  vm.runInNewContext(js, { exports: result.exports, module: result, require, setTimeout });
  return result.exports;
}
const data = load('src/components/ui/dashboard/demo-data.ts');
const enquiry = load('src/lib/demo-enquiry.ts');
const results = [];
function check(name, run) { const start = performance.now(); try { run(); results.push({ name, status: 'passed', ms: +(performance.now() - start).toFixed(2) }); } catch (error) { results.push({ name, status: 'failed', error: error.message }); } }
const questions = data.createQuestions();
const papers = data.createPapers(questions);
const dimensions = ['Unit / topic', 'Batch', 'Degree', 'Department', 'Semester', 'Subject', 'Marks', 'Complexity', 'Type', 'Outcome', 'Bloom'];
check('Question IDs are unique', () => assert.equal(new Set(questions.map(q => q.id)).size, questions.length));
check('Question references and metadata are valid', () => questions.forEach(q => { assert.ok(data.initialSubjects.some(s => s.id === q.subjectId)); assert.ok(q.bloom >= 1 && q.bloom <= 6 && q.unit >= 1 && q.unit <= 5 && q.marks > 0); assert.ok(q.title.trim() && q.answer.trim()); }));
check('Student-visible sample records are approved and released', () => questions.filter(q => q.released).forEach(q => assert.equal(q.status, 'Approved')));
check('Paper references resolve to approved questions', () => papers.forEach(p => { assert.ok(p.questions.length); p.questions.forEach(id => assert.equal(questions.find(q => q.id === id)?.status, 'Approved')); }));
check('Locked paper content survives question-bank edits', () => { const bank = data.createQuestions(); const paper = data.createPapers(bank).find(p => p.status === 'Locked'); const before = JSON.stringify(data.getPaperQuestions(paper, bank)); const first = bank.find(q => q.id === paper.questions[0]); first.title = 'Changed wording'; first.marks = 999; first.status = 'Draft'; assert.equal(JSON.stringify(data.getPaperQuestions(paper, bank)), before); });
check('Student IDs are unique despite duplicate-name candidates', () => assert.equal(new Set(data.initialStudents.map(s => s.id)).size, data.initialStudents.length));
check('Staff subject assignments resolve and contain no duplicate IDs', () => data.initialStaff.forEach(s => { assert.equal(new Set(s.subjects).size, s.subjects.length); s.subjects.forEach(id => assert.ok(data.initialSubjects.some(subject => subject.id === id))); }));
for (const dimension of dimensions) {
  for (const count of [0, 1, 2, 7, 50]) check(`Blueprint targets total correctly: ${dimension}, ${count} subjects`, () => { const subjects = Array.from({ length: count }, (_, i) => ({ ...data.initialSubjects[i % data.initialSubjects.length], id: `QA-${i}`, name: `QA subject ${i}` })); assert.equal([...data.coverageTargets(subjects, dimension).values()].reduce((a, b) => a + b, 0), count * 30); });
}
let scopeCases = 0;
check('Exhaustive academic filter combinations remain consistent', () => { for (const batch of ['', ...data.batches]) for (const degree of ['', 'B.E.', 'B.Tech.']) for (const department of ['', 'Computer Science', 'Information Technology', 'Electronics']) for (const semester of ['', 'IV', 'VI']) for (const subject of ['', ...data.initialSubjects.map(s => s.id)]) { const scope = { batch, degree, department, semester, subject }; const selected = data.initialSubjects.filter(s => data.matchesScope(s, scope)); const ids = new Set(selected.map(s => s.id)); const scoped = questions.filter(q => ids.has(q.subjectId)); scoped.forEach(q => assert.ok(selected.some(s => s.id === q.subjectId))); if (subject) assert.ok(selected.length <= 1); assert.ok(Number.isFinite(data.percent(scoped.filter(q => q.status === 'Approved').length, selected.length * 30))); scopeCases++; } });
check('Empty scopes report zero safely', () => { assert.equal(data.percent(0, 0), 0); assert.equal(data.initialSubjects.filter(s => data.matchesScope(s, { ...data.emptyScope, degree: 'B.Tech.', department: 'Electronics' })).length, 0); });
check('Percentages cap at 100 for overfilled sample blueprints', () => assert.equal(data.percent(1000, 30), 100));
check('CSV escapes quotes and preserves multiline content', () => assert.equal(data.csvCell('A "quoted"\nquestion'), '"A ""quoted""\nquestion"'));
for (const value of ['=1+1', '+SUM(A1:A2)', '@SUM(A1:A2)', '-1+2', '  =HYPERLINK("x")', '\t=2+2']) check(`CSV neutralizes formula-like text: ${JSON.stringify(value)}`, () => assert.ok(data.csvCell(value).startsWith('"\'')));
check('CSV preserves actual numeric values', () => { assert.equal(data.csvCell(-5), '"-5"'); assert.equal(data.csvCell(0), '"0"'); });
const valid = { name: 'QA Reviewer', email: 'qa@example.test', institution: 'QA College', role: 'Faculty / Question setter', message: '' };
check('Valid enquiry prepares an addressed draft, without sending', () => { const result = enquiry.prepareDemoEnquiry(valid, 'voicedotsio@gmail.com'); assert.equal(result.errors.length, 0); assert.ok(result.href.startsWith('mailto:voicedotsio@gmail.com?')); assert.ok(new URL(result.href).searchParams.get('body').includes('The Questra platform and Student Portal.')); });
check('Enquiry trims surrounding whitespace', () => { const result = enquiry.prepareDemoEnquiry({ ...valid, name: '  QA Reviewer  ', institution: ' QA College ' }, 'voicedotsio@gmail.com'); assert.equal(result.errors.length, 0); assert.ok(new URL(result.href).searchParams.get('body').includes('Name: QA Reviewer\n')); });
for (const [field, value] of [['name', '   '], ['institution', '\t\n'], ['email', 'invalid'], ['email', 'a@b'], ['email', 'a\r\nb@example.test'], ['role', ''], ['name', 'x'.repeat(101)], ['email', 'x'.repeat(160) + '@example.test'], ['institution', 'x'.repeat(161)], ['message', 'x'.repeat(1501)]]) check(`Enquiry rejects invalid ${field}: ${value.length} characters`, () => { const result = enquiry.prepareDemoEnquiry({ ...valid, [field]: value }, 'voicedotsio@gmail.com'); assert.ok(result.errors.length); assert.equal(result.href, ''); });
check('Unicode and special characters round-trip through mailto encoding', () => { const message = 'தமிழ் & हिन्दी ? # + <script>alert(1)</script>\nSecond line'; const result = enquiry.prepareDemoEnquiry({ ...valid, name: 'José O’Neil', message }, 'voicedotsio@gmail.com'); assert.equal(result.errors.length, 0); assert.ok(new URL(result.href).searchParams.get('body').includes(message)); });
check('Maximum supported message length is accepted', () => assert.equal(enquiry.prepareDemoEnquiry({ ...valid, message: 'x'.repeat(1500) }, 'voicedotsio@gmail.com').errors.length, 0));
let benchmark;
check('10,000-record filter workload remains correct', () => { const bank = Array.from({ length: 10000 }, (_, i) => ({ ...questions[i % questions.length], id: `LOAD-${i}` })); const start = performance.now(); let matches = 0; for (let i = 0; i < 100; i++) matches += bank.filter(q => q.subjectId === 'CS401' && q.status === 'Approved' && q.title.toLowerCase().includes('a')).length; benchmark = { records: bank.length, iterations: 100, ms: +(performance.now() - start).toFixed(2), matches }; assert.ok(matches > 0); });
const report = { testedAt: new Date().toISOString(), results, scopeCases, benchmark, browserStatus: 'blocked: browser and native-computer runtimes fail before connection with failed to write kernel assets' };
fs.writeFileSync(path.join(__dirname, 'model-qa-results.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ passed: results.filter(r => r.status === 'passed').length, failed: results.filter(r => r.status === 'failed'), scopeCases, benchmark }, null, 2));
process.exitCode = results.some(r => r.status === 'failed') ? 1 : 0;
