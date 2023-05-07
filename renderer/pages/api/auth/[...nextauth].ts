import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import nodemailer from 'nodemailer';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

// Instantiate Prisma client
const prisma = new PrismaClient();

const options = {
    providers: [
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: Number(process.env.EMAIL_SERVER_PORT),
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
        }),
    ],
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: '/',
        signOut: '/',
        error: '/',
        verifyRequest: '/',
    },
};

// Call and export as default NextAuth to automatically create & handle the API routes for authentication
export default NextAuth(options);