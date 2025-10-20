import {source_nix} from '../src/grammar/nix';

const outputFile = 'dist/nix.tmLanguage.json';

console.log('Starting conversion...');

(async () => {
    try {
        const objects = {name: "Nix", ...source_nix}
        // Convert the object to a formatted JSON string (2-space indentation)
        const jsonString = JSON.stringify(objects, null, 2);

        // Use Bun.write to save the string to a file
        await Bun.write(outputFile, jsonString);

        console.log(`✅ Success! Object successfully saved to ${outputFile}`);
    } catch (error) {
        console.error('❌ Error converting or writing file:', error);
    }
})();
