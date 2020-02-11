import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeLike: async (_, __, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            return await prisma.likes({ 
                where: {
                    AND: [
                        {
                            post: {
                                user: { id: user.id }
                            }
                        }, {
                            user: {
                                id_not: user.id
                            }
                        }
                    ]
                },
                orderBy: "createdAt_DESC"
            });
        }
    }
};