import fs from "fs";
import path from "path";


export const createFile = (type: string, className: string, outputPath: string): void => {
  // Verificar si el archivo ya existe
  if (fs.existsSync(outputPath)) {
    console.log(`El archivo type ya existe en ${outputPath}`);
    return; // Salir de la función si el archivo existe
  }

  let stubPath = path.join(__dirname, `../stubs/${type}.stub`);
  if (type === 'resource-controller') {
    type = 'controller';
    stubPath = path.join(__dirname, `../stubs/resource-controller.stub`);

  }


  let content = fs.readFileSync(stubPath, 'utf8');
  content = content.replace(/\[CLASS_NAME\]/g, className);
  content = content.replace(/\[FILENAME\]/g, className.toLowerCase());

  fs.writeFileSync(outputPath, content);
  console.log(`Created ${type} at ${outputPath}`);
};

