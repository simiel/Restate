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
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

export const config = {
  platform: "com.simiel.restate",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  galleriesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
  reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
  agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
  propertiesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform);

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);

export async function login() {
  try {
    await account.deleteSession("current");
  } catch (err) {
    console.log("No active session or failed to delete:", err);
  }

  try {
    const deepLink = new URL(makeRedirectUri({ preferLocalhost: true }));
    const scheme = `${deepLink.protocol}//`;
    console.log("🚀 ~ login ~ deepLink:", deepLink);
    console.log("🚀 ~ login ~ scheme:", scheme);
    const redirectUri = Linking.createURL(
      "https://fra.cloud.appwrite.io/v1/account/sessions/oauth2/callback/google/67a76452001df269778e"
    );

    const loginUrl = await account.createOAuth2Token(
      OAuthProvider.Google,
      `${deepLink}`,
      `${deepLink}`
    );
    if (!loginUrl) throw new Error("Create OAuth2 token failed");

    const result = await WebBrowser.openAuthSessionAsync(`${loginUrl}`, scheme);

    // Extract credentials from OAuth redirect URL
    const url = new URL(result.url);
    const secret = url.searchParams.get("secret");
    const userId = url.searchParams.get("userId");

    // Create session with OAuth credentials
    // await account.createSession(userId, secret);

    const session = await account.createSession(userId, secret);
    if (!session) throw new Error("Failed to create session");

    return true;
  } catch (error) {
    console.error(error);
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

export async function getLatestProperties() {
  try {
    const results = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      [Query.orderAsc("$createdAt"), Query.limit(5)]
    );

    return results.documents;
  } catch (error) {
    console.log("🚀 ~ getLatestProperties ~ error:", error);
    return [];
  }
}

export async function getProperties({
  filter,
  query,
  limit,
}: {
  filter: string;
  query: string;
  limit?: number;
}) {
  try {
    const buildQuery = [Query.orderDesc("$createdAt")];

    if (filter && filter !== "All") {
      buildQuery.push(Query.equal("type", filter));
    }
    if (query) {
      buildQuery.push(
        Query.or([
          Query.search("name", query),
          Query.search("address", query),
          Query.search("type", query),
        ])
      );
    }

    if (limit) {
      buildQuery.push(Query.limit(limit));
    }
    const results = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      buildQuery
    );

    return results.documents;
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return [];
  }
}

export async function getPropertiesById({ id }: { id: string }) {
  try {
    const result = await databases.getDocument(
      config.databaseId!,
      config.propertiesCollectionId!,
      id
    );
    return result;
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return null;
  }
}
