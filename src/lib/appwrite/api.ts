import { INewUser, IUserDB, IUserLogin } from '@/types';
import { account, appwriteConig, avatars, databases } from './config';
import { ID, Query } from 'appwrite';

export const createNewUser = async (user: INewUser) => {
    try {
        const newAccount = await account.create(ID.unique(), user.email, user.password, user.name);
        if (!newAccount) throw Error;
        const avatarUrl = avatars.getInitials(newAccount.name);
        const userDB = {
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl,
        };
        const newUser = await saveUserInDB(userDB);
        return newUser;
    } catch (error) {
        return error;
    }
};

export const saveUserInDB = async (user: IUserDB) => {
    try {
        const newUser = await databases.createDocument(appwriteConig.databaseId, appwriteConig.usersCollectionId, ID.unique(), user);
        return newUser;
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (user: IUserLogin) => {
    try {
        const session = await account.createEmailSession(user.email, user.password);
        return session;
    } catch (error) {
        throw error;
    }
};

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw Error;
        const users = await databases.listDocuments(appwriteConig.databaseId, appwriteConig.usersCollectionId, [Query.equal('accountId', currentAccount.$id)]);
        if (!users) throw Error;
        return users.documents[0];
    } catch (error) {
        throw error;
    }
};
