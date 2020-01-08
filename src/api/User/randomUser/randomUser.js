import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        randomUser: async (_, __, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const users = await prisma.users({
                where: {
                    id_not_in: [user.id]
                },
                orderBy: "createdAt_DESC"
            });
            const allUserCount = users.length;
           
            if(allUserCount < 2){
                throw Error("There are no users or There is 1 user. - randomUser");
            } else {
                for (let i = allUserCount - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [users[i], users[j]] = [users[j], users[i]];
                }
            }
            return users;
        }
    }
};