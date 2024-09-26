import { CosmosClient } from "@azure/cosmos";

// Load environment variables
const endpoint = process.env.COSMOS_ENDPOINT || "";
const key = process.env.COSMOS_KEY || "";

// Initialize Cosmos Client
const client = new CosmosClient({ endpoint, key });

// Define the database and container
const database = client.database("SchoolDB"); // This creates or selects the database "SchoolDB"
export const Studentcontainer = database.container("Students"); // This selects the "Students" container
const defaultDatabase = client.database("ToDoList");
export const defaultcontainer = defaultDatabase.container("Items"); // This selects the "Students" container