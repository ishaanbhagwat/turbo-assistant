import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export const findByGoogleId = async (googleId: string): Promise<User | null> => {
    return prisma.user.findUnique({ where: {googleId} });
};

export const getUserById = async (id: string) => {
    return prisma.user.findUnique({where: { id }});
};

export const createUser = async(profile: {
    email: string, 
    name: string,
    picture?: string,
    googleId: string,
}): Promise<User> => {
    if(!profile.email || !profile.name || profile.googleId){
        throw new Error('Missing required user profile information');
    }
    return prisma.user.create({ data: profile });
}
