#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const INSTALL_SCRIPT = path.join(__dirname, '..', 'install.sh');

console.log('🤖 AI Development CLI Installer\n');

// Check if install.sh exists
if (!fs.existsSync(INSTALL_SCRIPT)) {
  console.error('❌ Error: install.sh not found');
  console.error('   This package may be corrupted. Please reinstall.');
  process.exit(1);
}

// Make install.sh executable
try {
  fs.chmodSync(INSTALL_SCRIPT, '755');
} catch (err) {
  console.error('⚠️  Warning: Could not make install.sh executable');
  console.error(`   ${err.message}`);
}

// Execute install.sh
const install = spawn('bash', [INSTALL_SCRIPT], {
  stdio: 'inherit',
  shell: true
});

install.on('error', (err) => {
  console.error('❌ Failed to run installer:', err.message);
  process.exit(1);
});

install.on('close', (code) => {
  if (code !== 0) {
    console.error(`\n❌ Installation failed with code ${code}`);
    process.exit(code);
  }

  console.log('\n✨ Installation complete!');
  console.log('\nNext steps:');
  console.log('  1. Reload your shell or open a new terminal');
  console.log('  2. Run: ai init');
  console.log('  3. Run: ai help');
  process.exit(0);
});
