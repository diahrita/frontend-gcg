import { handleError } from '@/app/hendlererror/server/errorHandler';
import { APIEndpoints } from '@/app/route/apiEndpoints';
import axios from 'axios';

export const getProfile = async (username: string) => {
    const hash = sessionStorage.getItem('hash');

    if (!hash) {
        return;
    }

    try {
        const response = await axios.post(APIEndpoints.TOKEN_API, { username, hash });

        const profileData = response.data.data;
        const email = profileData.email;
        const typeUser = profileData.type_user;

        // Simpan email dan type_user dalam satu objek
        const profile = {
            email: email,
            type_user: typeUser,
        };

        // Simpan objek profile di sessionStorage
        sessionStorage.setItem('profile', JSON.stringify(profile));

        const storedProfile = sessionStorage.getItem('profile');
        console.log('Stored Profile:', storedProfile);

        return profile;
    } catch (err: any) {
        const { message } = handleError(err);
        throw new Error(message);
    }
};