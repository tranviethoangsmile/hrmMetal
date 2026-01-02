/**
 * Script để tự động refactor routers
 * Sử dụng: node scripts/refactor-routers.js
 * 
 * LƯU Ý: Script này chỉ là helper, nên review kỹ trước khi commit
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Pattern để tìm và thay thế
const patterns = [
    // Error responses
    {
        find: /res\.status\((400|401|403|404|500)\)\.(json|send)\(\s*\{\s*success:\s*false,\s*message:\s*['"]([^'"]+)['"]\s*\}\s*\)/g,
        replace: (match, statusCode, method, message) => {
            return `errorResponse(res, ${statusCode}, '${message}')`;
        }
    },
    // Success responses với data
    {
        find: /res\.status\((200|201|202)\)\.(json|send)\(\s*\{\s*success:\s*true,\s*data:\s*([^}]+)\s*\}\s*\)/g,
        replace: (match, statusCode, method, data) => {
            return `successResponse(res, ${statusCode}, ${data})`;
        }
    },
    // Success responses với message
    {
        find: /res\.status\((200|201|202)\)\.(json|send)\(\s*\{\s*success:\s*true,\s*message:\s*['"]([^'"]+)['"]\s*\}\s*\)/g,
        replace: (match, statusCode, method, message) => {
            return `successResponse(res, ${statusCode}, undefined, '${message}')`;
        }
    }
];

function refactorFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Check if already has imports
    const hasImports = content.includes('errorResponse') || content.includes('successResponse');
    
    if (!hasImports) {
        // Add imports
        const importLine = "import { errorResponse, successResponse } from '../../helpers';";
        // Find last import
        const lastImportIndex = content.lastIndexOf('import');
        if (lastImportIndex !== -1) {
            const nextLineIndex = content.indexOf('\n', lastImportIndex);
            content = content.slice(0, nextLineIndex + 1) + importLine + '\n' + content.slice(nextLineIndex + 1);
            modified = true;
        }
    }

    // Apply patterns
    patterns.forEach(pattern => {
        const newContent = content.replace(pattern.find, pattern.replace);
        if (newContent !== content) {
            content = newContent;
            modified = true;
        }
    });

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Refactored: ${filePath}`);
        return true;
    }
    return false;
}

// Main
const routerFiles = glob.sync('src/routers/**/*.router.ts');
let refactored = 0;

routerFiles.forEach(file => {
    if (refactorFile(file)) {
        refactored++;
    }
});

console.log(`\n📊 Refactored ${refactored} out of ${routerFiles.length} files`);
console.log('⚠️  Please review changes before committing!');

