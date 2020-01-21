import { prisma } from "../../../generated/prisma-client";

export default {
    Post: {
        files: ({ id }) => prisma.post({ id }).files(),
        comments: ({ id }) => prisma.post({ id }).comments({orderBy:"createdAt_DESC"}),
        user: ({ id }) => prisma.post({ id }).user(),
        likes: ({ id }) => prisma.post({ id }).likes(),
        isLiked: (parent, _, { request }) => {
            const { user } = request;
            const { id } = parent;
            return prisma.$exists.like({
                AND: [
                    {
                        user: {
                            id: user.id
                        }
                    },
                    {
                        post: {
                            id
                        }
                    }
                ]
            });
        },
        likeCount: parent =>
            prisma
            .likesConnection({
                where: { post: { id: parent.id } }
            })
            .aggregate()
            .count(),
        commentCount: parent =>
            prisma
            .commentsConnection({
                where: { post: { id: parent.id } }
            })
            .aggregate()
            .count()
    }
};