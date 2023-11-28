import { INewUser, IUserLogin } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { createNewUser, loginUser } from '../appwrite/api';

export const useCreateNewUser = () =>
    useMutation({
        mutationFn: (user: INewUser) => createNewUser(user),
    });

export const useLoginUser = () =>
    useMutation({
        mutationFn: (user: IUserLogin) => loginUser(user),
    });
