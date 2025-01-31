const GRAPH_API_BASE_URL = "https://graph.microsoft.com/v1.0";
async function makeGraphRequest(
    accessToken: string,
    endpoint: string,
    method: string = "GET",
    body?: any,
  ): Promise<Response> {
    const response = await fetch(`${GRAPH_API_BASE_URL}${endpoint}`, {
      method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  
    return response;
  }
  
  export async function fetchUserProfile(accessToken: string): Promise<any> {
    const response = await makeGraphRequest(accessToken, "/me");
    return response.json();
  }
  
  export async function fetchUserManager(accessToken: string): Promise<any> {
    const response = await makeGraphRequest(accessToken, "/me/manager");
    return response.json();
  }
  
  export async function fetchUserProfilePicture(
    accessToken: string,
  ): Promise<Buffer | null> {
    const response = await makeGraphRequest(accessToken, "/me/photo/$value");
  
    if (response.status === 404) {
      console.log("No profile photo found for user.");
      return null;
    }
  
    if (!response.ok) {
      throw new Error(
        `Error fetching profile photo: ${response.status} - ${response.statusText}`,
      );
    }
  
    try {
      const arrayBuffer = await response.arrayBuffer();
      return Buffer.from(arrayBuffer);
    } catch (error) {
      console.error(
        "Unexpected error during fetching profile photo:",
        error instanceof Error ? error.message : "Unknown error",
      );
      throw error;
    }
  }


