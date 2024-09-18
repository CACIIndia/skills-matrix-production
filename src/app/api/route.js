// src/app/api/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello World' });
}




export async function POST(request) {
  try {
    // Parse the JSON body
    const data = await request.json();

    // Here, you can process the received data, save it to a database, etc.
    // For this example, we'll just log it and send it back in the response
    console.log('Received data:', data);

    return NextResponse.json({
      message: 'Product received successfully!',
      product: data,
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}

  
  export async function PATCH() {
    return NextResponse.json({ message: 'Hello World patch' });
  }
  

  export async function DELETE() {
    return NextResponse.json({ message: 'Hello World delete' });
  }
  