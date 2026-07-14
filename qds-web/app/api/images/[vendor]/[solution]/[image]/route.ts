import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ vendor: string; solution: string; image: string }> }
) {
  try {
    const { vendor, solution, image } = await params;
    
    // Validate image filename to prevent directory traversal
    if (!/^[a-zA-Z0-9_-]+\.(png|jpg|jpeg)$/i.test(image)) {
      return NextResponse.json({ error: 'Invalid image filename' }, { status: 400 });
    }
    
    const baseSolutionsPath = path.join(
      process.cwd(),
      'content',
      'vendors',
      vendor,
      'solutions',
      solution
    );
    const imagePath = path.join(baseSolutionsPath, image);
    
    // Ensure the path is within the solutions directory
    const normalizedBase = path.resolve(baseSolutionsPath);
    const normalizedImagePath = path.resolve(imagePath);
    if (!normalizedImagePath.startsWith(normalizedBase + path.sep) && normalizedImagePath !== normalizedBase) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }
    
    const imageBuffer = await fs.readFile(imagePath);
    const contentType = image.toLowerCase().endsWith('.png') 
      ? 'image/png' 
      : image.toLowerCase().endsWith('.jpg') || image.toLowerCase().endsWith('.jpeg')
      ? 'image/jpeg'
      : 'application/octet-stream';
    
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Image not found' }, { status: 404 });
  }
}
