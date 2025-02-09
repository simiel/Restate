import {
  Client,
  Account,
  ID,
  Databases,
  OAuthProvider,
  Avatars,
  Query,
  Storage,
} from "react-native-appwrite";
import * as linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";

export const config = {
  platform: "com.simiel.restate",
  // endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  endpoint: "https://cloud.appwrite.io/v1",
  // projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  projectId: "67a76452001df269778e",
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform);

export const avatar = new Avatars(client);
export const account = new Account(client);

export async function login() {
  try {
    const redirectUri = linking.createURL("/");
    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );

    if (!response) {
      throw new Error("Failed to login");
    }
    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    );

    if (browserResult.type !== "success") {
      throw new Error("Failed to login in browser");
    }

    const url = new URL(browserResult.url);

    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();
    if (!secret || !userId) {
      throw new Error("Failed to login get id ");
    }

    const session = await account.createSession(userId, secret);

    if (!session) {
      throw new Error("Failed to create a session");
    }

    return true;
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);
    return false;
  }
}

export async function logout() {
  try {
    await account.deleteSession("current");

    return true;
  } catch (error) {
    console.log("🚀 ~ logout ~ error:", error);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    const response = await account.get();

    if (response.$id) {
      const userAvatar = avatar.getInitials(response.name);

      return {
        ...response,
        avatar: userAvatar.toString(),
      };
    }
    return null;
  } catch (error) {
    console.log("🚀 ~ getUser ~ error:", error);
    return null;
  }
}
