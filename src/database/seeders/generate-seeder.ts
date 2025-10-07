import * as fs from 'fs';
import * as path from 'path';

const args = process.argv.slice(2);
const entityName = args[0];

if (!entityName) {
  console.error('❌ Please provide an entity name');
  console.log('Usage: npm run seed:generate <EntityName>');
  console.log('Example: npm run seed:generate Role');
  process.exit(1);
}

const seederName = entityName.toLowerCase();
const className = `${entityName}Seeder`;
const fileName = `${seederName}.seeder.ts`;

const template = `import { DataSource } from 'typeorm';
import { ${entityName} } from '../entities/${seederName}.entity';
import { BaseSeeder } from './base.seeder';

export class ${className} extends BaseSeeder {
  async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(${entityName});

    const data = [
      // Add your seed data here
      // { name: 'Example', status: 1 },
    ];

    console.log('  🌱 Seeding ${entityName}s...');

    for (const item of data) {
      // Check if already exists (adjust the 'where' condition as needed)
      const exists = await repo.findOne({ where: { name: item.name } as any });
      
      if (!exists) {
        const entity = repo.create(item);
        await repo.save(entity);
        console.log(\`    ✓ Inserted: \${item.name}\`);
      } else {
        console.log(\`    - Already exists: \${item.name}\`);
      }
    }

    console.log('  ✅ ${entityName} seeding completed!\\n');
  }
}
`;

const seedersDir = path.join(__dirname);
const filePath = path.join(seedersDir, fileName);

if (fs.existsSync(filePath)) {
  console.error(`❌ Seeder already exists: ${fileName}`);
  process.exit(1);
}

fs.writeFileSync(filePath, template);

// Auto-import in seed.ts
let autoImported = false;
try {
  const seedFilePath = path.join(seedersDir, 'seed.ts');
  let seedContent = fs.readFileSync(seedFilePath, 'utf-8');
  const originalContent = seedContent;

  // Add import statement
  const importStatement = `import { ${className} } from './${seederName}.seeder';`;
  
  // Find the last import statement and add after it
  const lastImportMatch = seedContent.match(/import\s+{[^}]+}\s+from\s+['"][^'"]+['"];/g);
  if (lastImportMatch) {
    const lastImport = lastImportMatch[lastImportMatch.length - 1];
    const lastImportIndex = seedContent.lastIndexOf(lastImport);
    const afterLastImport = lastImportIndex + lastImport.length;
    seedContent = 
      seedContent.slice(0, afterLastImport) + 
      '\n' + importStatement + 
      seedContent.slice(afterLastImport);
  }

  // Add to seeders array
  const seederInstance = `new ${className}(),`;
  
  // Find the seeders array and add before the closing bracket or before "// Add more seeders here"
  const seedersArrayRegex = /(const seeders:\s*Seeder\[\]\s*=\s*\[[\s\S]*?)(  \/\/ Add more seeders here|\];)/;
  const match = seedContent.match(seedersArrayRegex);
  
  if (match) {
    if (match[2] === '  // Add more seeders here') {
      // Add before the comment
      seedContent = seedContent.replace(
        seedersArrayRegex,
        `$1  ${seederInstance}\n$2`
      );
    } else {
      // Add before the closing bracket
      seedContent = seedContent.replace(
        seedersArrayRegex,
        `$1  ${seederInstance}\n$2`
      );
    }
  }

  // Only write if content changed
  if (seedContent !== originalContent) {
    fs.writeFileSync(seedFilePath, seedContent);
    autoImported = true;
  }
} catch (error) {
  // Silent fail, will show manual instructions
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`✅ Seeder created successfully!`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`📄 File: src/database/seeders/${fileName}`);
console.log(`📝 Class: ${className}`);

if (autoImported) {
  console.log(`🔗 Auto-imported in seed.ts`);
} else {
  console.log(`⚠️  Could not auto-import. Please add manually:`);
  console.log(`\n   In seed.ts, add these lines:\n`);
  console.log(`   import { ${className} } from './${seederName}.seeder';`);
  console.log(`\n   const seeders: Seeder[] = [`);
  console.log(`     new UserTypeSeeder(),`);
  console.log(`     new ${className}(),  // <-- Add this`);
  console.log(`   ];\n`);
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log('Next steps:');
console.log(`1. Edit src/database/seeders/${fileName} to add your data`);
console.log(`2. Run: npm run seed\n`);