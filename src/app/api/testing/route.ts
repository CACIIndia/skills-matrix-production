import { NextResponse } from 'next/server';
import { defaultcontainer } from '@/app/lib/cosmos';

// GET request to fetch users
export async function GET() {
  try {
   
    const { resources: users } = await defaultcontainer.items.readAll().fetchAll();

    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch users' });
  }
}

// POST request to add a new user
export async function POST(req: Request) {
  try {
    // Parse request body to get family data
    const body = await req.json();

  
    // Store the family data in Cosmos DB
    const { resource: createdFamily } = await defaultcontainer.items.create(body);

    // Return success response with created family data
    return NextResponse.json({ success: true, data: createdFamily });
  } catch (error: unknown) {
    console.error('Error creating family data:', error);

    const errorMessage = (error as Error).message || 'An unknown error occurred';

    // Return error response
    return NextResponse.json({ success: false, message: errorMessage });
}
}



// DELETE request to add a new user
export async function DELETE(req: Request) {
  try {
    // Get the id and partitionKey from the request body or URL
    const { id, partitionKey } = await req.json();

    if (!id ) {
      return NextResponse.json({ success: false, message: 'id and partitionKey are required' });
    }

    // Delete the item from Cosmos DB
    const { resource: deletedUser } = await defaultcontainer
      .item(id)
      .delete();

    return NextResponse.json({ success: true, message: 'Item successfully deleted', data: deletedUser });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete user' });
  }
}