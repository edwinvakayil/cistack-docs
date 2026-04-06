const fs = require('fs');
const path = require('path');

const DICTIONARY_DIR = path.join(__dirname, '../dictionaries');
const SOURCE_LOCALE = 'en.json';

const sourceData = JSON.parse(fs.readFileSync(path.join(DICTIONARY_DIR, SOURCE_LOCALE), 'utf8'));

function syncKeys(source, target) {
  const result = { ...target };
  let updated = false;

  for (const key in source) {
    if (typeof source[key] === 'object' && source[key] !== null) {
      if (!result[key] || typeof result[key] !== 'object') {
        result[key] = {};
        updated = true;
      }
      const [childResult, childUpdated] = syncKeys(source[key], result[key]);
      result[key] = childResult;
      if (childUpdated) updated = true;
    } else {
      if (!(key in result)) {
        result[key] = `[TODO] ${source[key]}`;
        updated = true;
      }
    }
  }

  // Optional: Remove keys from target that are not in source
  for (const key in result) {
    if (!(key in source)) {
      delete result[key];
      updated = true;
    }
  }

  return [result, updated];
}

const files = fs.readdirSync(DICTIONARY_DIR);

files.forEach(file => {
  if (file === SOURCE_LOCALE || !file.endsWith('.json')) return;

  const filePath = path.join(DICTIONARY_DIR, file);
  const targetData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  const [syncedData, isUpdated] = syncKeys(sourceData, targetData);

  if (isUpdated) {
    fs.writeFileSync(filePath, JSON.stringify(syncedData, null, 2) + '\n', 'utf8');
    console.log(`✅ Synced ${file} with ${SOURCE_LOCALE}`);
  } else {
    console.log(`- ${file} is already in sync`);
  }
});

console.log('Done!');
