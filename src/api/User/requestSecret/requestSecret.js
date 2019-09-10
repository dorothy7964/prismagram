import { prisma } from '../../../../generated/prisma-client';
import { generatorSecret, sendSecretMail } from '../../../utils';

export default {
    Mutation: {
        requestSecret: async(_, args) => {
            const { email } = args;
            const loginSecret = generatorSecret();
            console.log(loginSecret);
            try {
                await sendSecretMail(email, loginSecret);
                await prisma.updateUser({data: {loginSecret}, where: {email} });
                return true;
            }catch (e) {
                console.log(e);
                return false;
            }
        }
    }
  }