const fs = require('fs');
const path = require('path');

function logFolderStructure(dirPath, indent = '') {
  try {
    const files = fs.readdirSync(dirPath); // Читаем содержимое папки
    files.forEach((file) => {
      const fullPath = path.join(dirPath, file);
      const stats = fs.statSync(fullPath);

      // Пропускаем папку node_modules
      if (stats.isDirectory() && file === 'node_modules') {
        console.log(`${indent}— 📁 ${file}/ (пропущено)`);
        return;
      }

      if (stats.isDirectory()) {
        console.log(`${indent}— 📁 ${file}/`);
        logFolderStructure(fullPath, indent + '— '); // Рекурсивный вызов для вложенных папок
      } else {
        console.log(`${indent}— 📄 ${file}`);
      }
    });
  } catch (error) {
    console.error(`Ошибка при чтении папки ${dirPath}:`, error.message);
  }
}

// Путь к твоей папке
const folderPath = 'C:\\Users\\David\\Desktop\\programms\\my-game';

// Вывод структуры папки
logFolderStructure(folderPath);