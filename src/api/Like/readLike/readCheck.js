import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        readLike: async (_, args) => {
            const { likeId } = args;

            try {
                const result = await prisma.updateLike({
                    where: { id: likeId },
                    data: { readCheck: true }
                });
                
                if(result){
                    return true;
                }
                return false;

            } catch (e) {
                console.log(e);
            }

            return false;
        }
    }
}