import fs from 'fs/promises';
import path from 'path';

export async function POST(request) {    
  try {
    // Read the existing JSON data from the file
    const filePath = path.resolve('src/routes/bo/test.json');
    const data = await request.request.json();

    // Write the updated data back to the file
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');

    return new Response();
  } catch (error) {
    return new Response();
  }
}