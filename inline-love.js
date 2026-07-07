import fs from 'fs';
import path from 'path';

const distDir = 'dist-love';
const htmlPath = path.join(distDir, 'love-index.html');
const assetsDir = path.join(distDir, 'assets');

let html = fs.readFileSync(htmlPath, 'utf-8');

const files = fs.readdirSync(assetsDir);
const jsFile = files.find(f => f.endsWith('.js'));
const cssFile = files.find(f => f.endsWith('.css'));

let css = fs.readFileSync(path.join(assetsDir, cssFile), 'utf-8');
const js = fs.readFileSync(path.join(assetsDir, jsFile), 'utf-8');

css = css.replace(/url\(\.\//g, 'url(./assets/');

// Replace module script with inline script placed AFTER #root
html = html.replace(
    /<script[\s\S]*?><\/script>/,
    ''
);
html = html.replace(
    /<link rel="stylesheet"[\s\S]*?>/,
    () => `<style>${css}</style>`
);
html = html.replace(
    /<link rel="preload"[\s\S]*?>/g,
    ''
);
html = html.replace(
    '</body>',
    () => `<script>${js}</script></body>`
);

const outPath = path.join(distDir, 'inline.html');
fs.writeFileSync(outPath, html);
console.log('Inlined:', (html.length / 1024).toFixed(0), 'KB ->', outPath);
