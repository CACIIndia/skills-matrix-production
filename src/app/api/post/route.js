import { NextResponse } from "next/server";
import {getPosts} from "@/app/actions/postAction";
import connectDB from "@/app/config/database";
import postModel from "@/app/models/postModel";

export async function GET() {
  try {
      let data = await getPosts();
    return NextResponse.json(data);
  } catch (error) {                                                   
    console.error('Error fetching data:', error);
    return NextResponse.error();
  }
}
export async function POST(request) {
    try {
      await connectDB(); // Ensure the database is connected
  
      const body = await request.json(); // Parse the request body to JSON
  
      // Validation (optional)
      if (!body.email || !body.name) {
        return NextResponse.json(
          { message: "Email and name are required" },
          { status: 400 }
        );
      }
  
      // Create a new post using the PostModel
      const newPost = new postModel({
        email: body.email,
        name: body.name,
      });
  
      // Save the post to the database
      const savedPost = await newPost.save();
  
      // Return the saved post data
      return NextResponse.json({ message: "Post created successfully", post: savedPost });
    } catch (error) {
      console.error("Error creating post:", error);
      return NextResponse.json(
        { message: "Error creating post", error: error.message },
        { status: 500 }
      );
    }
  }


  export async function DELETE(request) {
    try {
      await connectDB(); // Ensure the database is connected
  
      const { id } = await request.json(); // Parse the request body to get the id
  
      if (!id) {
        return NextResponse.json(
          { message: "ID is required" },
          { status: 400 }
        );
      }
  
      // Find and delete the post by id
      const deletedPost = await postModel.findByIdAndDelete(id);
  
      if (!deletedPost) {
        return NextResponse.json(
          { message: "Post not found" },
          { status: 404 }
        );
      }
  
      // Return a success message
      return NextResponse.json({ message: "Post deleted successfully", post: deletedPost });
    } catch (error) {
      console.error("Error deleting post:", error);
      return NextResponse.json(
        { message: "Error deleting post", error: error.message },
        { status: 500 }
      );
    }
  }

  export async function PUT(request) {
    try {
      await connectDB(); // Ensure the database is connected
  
      const { id, email, name } = await request.json(); // Extract data from the request body
  
      // Validation (optional)
      if (!id || !email || !name) {
        return NextResponse.json(
          { message: "Post ID, email, and name are required" },
          { status: 400 }
        );
      }
  
      // Find the post by ID and update it
      const updatedPost = await postModel.findByIdAndUpdate(
        id,
        { email, name },
        { new: true } // Return the updated document
      );
  
      // Return the updated post data
      return NextResponse.json({
        message: "Post updated successfully",
        post: updatedPost,
      });
    } catch (error) {
      console.error("Error updating post:", error);
      return NextResponse.json(
        { message: "Error updating post", error: error.message },
        { status: 500 }
      );
    }
  }
  