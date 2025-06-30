import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import Auth from "../models/Auth.js";

dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.VITE_GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await Auth.findOrCreateUser(profile);
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.usuario_id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await Auth.getUserById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});
