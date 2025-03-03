// app/api/upload-image/route.ts
import { BlobServiceClient } from '@azure/storage-blob';
import { NextResponse } from 'next/server';

import db from '@/lib/db';
import { getSession } from '@/lib/auth';
import { uploadUserImageBuffer } from '@/app/actions/utils/uploadUserImageBuffer';


export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'User is not authenticated' }, { status: 401 });
    }
    const { base64Image } = await request.json();
    const userId = session.user.id; 

    if (!base64Image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }
    const imageBuffer = Buffer.from(base64Image, 'base64');

    const profileImageUrl = await uploadUserImageBuffer(imageBuffer, userId || "");

    session.user.image = profileImageUrl;
  

    return NextResponse.json({ message: 'Image uploaded successfully', image_url: session.user.image }, { status: 200 });

  } catch (error) {
    console.error('Error during image upload:', error);
    return NextResponse.json({ error: 'Error occurred during image upload' }, { status: 500 });
  }
}
