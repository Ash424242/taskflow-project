const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function pad2(n) {
  return String(n).padStart(2, '0');
}

function formatVersion(date) {
  // Formato estilo: v-YYYY.MM.DD-HH:mm
  const yyyy = date.getFullYear();
  const mm = pad2(date.getMonth() + 1);
  const dd = pad2(date.getDate());
  const hh = pad2(date.getHours());
  const min = pad2(date.getMinutes());
  return `v-${yyyy}.${mm}.${dd}-${hh}:${min}`;
}

let commitCi = null;
try {
  commitCi = execSync('git log -1 --format=%ci', { encoding: 'utf8' }).trim();
} catch (e) {
  // Si no hay git disponible en el entorno de build, dejamos un valor genérico.
  commitCi = null;
}

const commitDate = commitCi ? new Date(commitCi) : new Date();
const version = formatVersion(commitDate);

const outPath = path.resolve(__dirname, '../version.js');

const content = `// Generado automáticamente en el build.\nwindow.TASKFLOW_VERSION = ${JSON.stringify(version)};\n`;
fs.writeFileSync(outPath, content, 'utf8');

console.log(`TASKFLOW_VERSION=${version}`);

