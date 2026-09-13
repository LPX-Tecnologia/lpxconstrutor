// preparar-logo.js
// Garante que imagem/logo-lpxconstrutor.png seja quadrado, PNG e >= 512x512
// Uso: node preparar-logo.js

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ARQUIVO = path.join(__dirname, 'imagem', 'logo-lpxconstrutor.png');
const TAMANHO_FINAL = 512; // cobre todos os sizes do manifest antigo

async function preparar() {
  if (!fs.existsSync(ARQUIVO)) {
    console.error(`❌ Não encontrei: ${ARQUIVO}`);
    process.exit(1);
  }

  const meta = await sharp(ARQUIVO).metadata();
  console.log(`📷 Original: ${meta.width}x${meta.height}px (${meta.format})`);

  // Faz backup do original antes de sobrescrever
  const backup = ARQUIVO.replace(/\.png$/i, '.original.png');
  if (!fs.existsSync(backup)) {
    fs.copyFileSync(ARQUIVO, backup);
    console.log(`💾 Backup salvo em: ${path.basename(backup)}`);
  }

  // Redimensiona para quadrado 512x512, mantendo transparência
  await sharp(ARQUIVO)
    .resize(TAMANHO_FINAL, TAMANHO_FINAL, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toFile(ARQUIVO + '.tmp');

  // Substitui o original pelo arquivo tratado
  fs.renameSync(ARQUIVO + '.tmp', ARQUIVO);

  const novaMeta = await sharp(ARQUIVO).metadata();
  console.log(`✅ Agora é: ${novaMeta.width}x${novaMeta.height}px (${novaMeta.format})`);
  console.log('\n🎉 Pronto! Suba o arquivo atualizado para imagem/logo-lpxconstrutor.png no GitHub.');
}

preparar().catch((err) => {
  console.error('❌ Erro:', err);
  process.exit(1);
});
