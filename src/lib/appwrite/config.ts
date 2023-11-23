import { Client, Account, Databases, Avatars, Storage } from 'appwrite';

export const appwriteConig = {
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    url: import.meta.env.VITE_APPWRITE_URL,
};

export const client = new Client().setEndpoint(appwriteConig.url).setProject(appwriteConig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
