import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        editUser: (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { userName, email, firstName, lastName, bio } = args;
            const { user } = request;
            return prisma.updateUser({
                where: { id: user.id },
                data: { userName, email, firstName, lastName, bio }
            });
        }
    }
};