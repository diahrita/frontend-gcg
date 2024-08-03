import { Messages } from '@/app/hendlererror/message/messages';
import { handleError } from '@/app/hendlererror/server/errorHandler';
import { APIEndpoints } from '@/app/route/apiEndpoints';
import { DataProfile } from '@/types/profile';
import axios from 'axios';

export const getProfile = async (username: string) => {
    const hash = sessionStorage.getItem('hash');

    if (!hash) {
        throw new Error('Hash not found in sessionStorage.');
    }

    try {
        // Mendapatkan data profil menggunakan hash dan username
        const response = await axios.post(APIEndpoints.TOKEN_API, { username, hash });

        const profileData = response.data.data as DataProfile;
        const email = profileData.email;
        const typeUser = profileData.type_user;

        // Menyimpan data profil dalam objek
        const profile = {
            email: email,
            type_user: typeUser,
        };

       
        sessionStorage.setItem('profile', JSON.stringify(profile));

        const storedProfile = sessionStorage.getItem('profile');
        console.log('Stored Profile:', storedProfile);

        sessionStorage.removeItem(Messages.ERROR);

        return { status: response.status, data: profileData };
    } catch (err: any) {
        const { message } = handleError(err);
        throw new Error(message);
    }
};