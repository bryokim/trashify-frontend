import { FiefAuth } from "../middleware/new";
import { Fief, FiefUserInfo } from "@fief/fief";
import { FiefAuth, IUserInfoCache } from "@fief/fief/nextjs";

export const SESSION_COOKIE_NAME = "user_session";

export const fiefClient = new Fief({
  baseURL: "https://player-one.fief.dev",
  clientId: "JslVzKNu3ei9PjUWAmY3-p9i2JFJbYeQNSiE2gsiO7g",
  clientSecret: "HGW1jDnIxR_yikFUpclw_uJ5z6S35WBZ2_B2q5cC1UI",
});

class MemoryUserInfoCache implements IUserInfoCache {
  private storage: Record<string, any>;

  constructor() {
    this.storage = {};
  }

  async get(id: string): Promise<FiefUserInfo | null> {
    const userinfo = this.storage[id];
    if (userinfo) {
      return userinfo;
    }
    return null;
  }

  async set(id: string, userinfo: FiefUserInfo): Promise<void> {
    this.storage[id] = userinfo;
  }

  async remove(id: string): Promise<void> {
    this.storage[id] = undefined;
  }

  async clear(): Promise<void> {
    this.storage = {};
  }
}

export default defineNuxtPlugin((app) => {
  // Initialize the FiefAuth instance and inject it into the Nuxt.js app
  const fiefAuth = new FiefAuth({
    client: fiefClient,
    sessionCookieName: SESSION_COOKIE_NAME,
    redirectURI: "http://localhost:3000/auth-callback",
    logoutRedirectURI: "http://localhost:3000",
    userInfoCache: new MemoryUserInfoCache(),
  });
  inject("fiefAuth", fiefAuth);

  // Register the middleware with Nuxt.js
  app.router.beforeEach(
    fiefAuth.middleware([
      {
        matcher: "/private",
        parameters: {},
      },
      {
        matcher: "/castles/:path*",
        parameters: {
          permissions: ["castles:read"],
        },
      },
    ])
  );
});
