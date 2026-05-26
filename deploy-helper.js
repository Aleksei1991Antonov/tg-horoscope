const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const root = __dirname;
const dist = path.join(root, 'dist');
const repoUrl = 'https://github.com/Aleksei1991Antonov/horoscope.git';
const tmpDir = path.join(root, '__gh_pages_tmp');

// Clean temp
if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true });

// Clone empty branch
execSync(`git clone --depth 1 --branch gh-pages ${repoUrl} ${tmpDir} 2>nul || (mkdir ${tmpDir} && cd ${tmpDir} && git init && git remote add origin ${repoUrl} && git checkout --orphan gh-pages)`, { cwd: root, stdio: 'inherit' });

// Copy dist contents
const files = fs.readdirSync(dist);
for (const f of files) {
    const src = path.join(dist, f);
    const dst = path.join(tmpDir, f);
    if (fs.statSync(src).isDirectory()) {
        copyRecursive(src, dst);
    } else {
        fs.copyFileSync(src, dst);
    }
}

// Commit and push
execSync('git add -A', { cwd: tmpDir, stdio: 'inherit' });
try { execSync('git commit -m "deploy"', { cwd: tmpDir, stdio: 'inherit' }); } catch(e) {}
execSync('git push origin gh-pages --force', { cwd: tmpDir, stdio: 'inherit' });

// Cleanup
fs.rmSync(tmpDir, { recursive: true });
console.log('✅ Deployed!');

function copyRecursive(src, dst) {
    fs.mkdirSync(dst, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const e of entries) {
        const s = path.join(src, e.name);
        const d = path.join(dst, e.name);
        if (e.isDirectory()) copyRecursive(s, d);
        else fs.copyFileSync(s, d);
    }
}
