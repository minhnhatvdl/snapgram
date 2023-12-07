import { INewUser, IUserLogin } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { createNewUser, loginUser, logoutUser } from '../appwrite/api';

export const useCreateNewUser = () =>
    useMutation({
        mutationFn: (user: INewUser) => createNewUser(user),
    });

export const useLoginUser = () =>
    useMutation({
        mutationFn: (user: IUserLogin) => loginUser(user),
    });

export const useLogoutUser = () =>
    useMutation({
        mutationFn: () => logoutUser(),
    });
