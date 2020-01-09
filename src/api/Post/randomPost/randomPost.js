import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        randomPost: async (_, __, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const posts = await prisma.posts({
                where: {
                    user: {id_not_in: [user.id] }
                },
                orderBy: "createdAt_DESC"
            });
            const allPostCount = posts.length;
           
            if(allPostCount < 1){
                throw Error("There are no users. - randomUser");
            }else {
                for (let i = allPostCount - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [posts[i], posts[j]] = [posts[j], posts[i]];
                }
            }
            return posts;
        }
    }
};