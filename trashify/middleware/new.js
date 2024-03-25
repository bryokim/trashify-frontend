// Create a new file in the middleware folder, e.g., middleware/auth.js
import { __awaiter } from "@fief/fief/build/esm/node_modules/tslib/tslib.es6.js";
import { pathToRegexp } from "path-to-regexp";
import {
  FiefAuth as FiefAuth$1,
  cookieGetter,
  FiefAuthUnauthorized,
  FiefAuthForbidden,
} from "@fief/fief/src/server";

const defaultAPIUnauthorizedResponse = async (context) => {
  context.error({ statusCode: 401, message: "Unauthorized" });
};

const defaultAPIForbiddenResponse = async (context) => {
  context.error({ statusCode: 403, message: "Forbidden" });
};

class FiefAuth {
  // ... (Keep the rest of the class definition as it is)
  constructor(parameters) {
    this.client = parameters.client;
    this.fiefAuth = new FiefAuth$1(
      parameters.client,
      cookieGetter(parameters.sessionCookieName),
      parameters.userInfoCache
    );
    this.fiefAuthEdge = new FiefAuth$1(parameters.client, (request) =>
      __awaiter(this, void 0, void 0, function* () {
        var _a;
        return (
          ((_a = request.cookies.get(parameters.sessionCookieName)) === null ||
          _a === void 0
            ? void 0
            : _a.value) || null
        );
      })
    );
    this.sessionCookieName = parameters.sessionCookieName;
    this.loginPath = parameters.loginPath ? parameters.loginPath : "/login";
    this.redirectURI = parameters.redirectURI;
    this.redirectPath = parameters.redirectPath
      ? parameters.redirectPath
      : "/auth-callback";
    this.logoutRedirectURI = parameters.logoutRedirectURI;
    this.logoutPath = parameters.logoutPath ? parameters.logoutPath : "/logout";
    this.returnToCookieName = parameters.returnToCookieName
      ? parameters.returnToCookieName
      : "return_to";
    this.returnToDefault = parameters.returnToDefault
      ? parameters.returnToDefault
      : "/";
    this.forbiddenPath = parameters.forbiddenPath
      ? parameters.forbiddenPath
      : "/forbidden";
    this.apiUnauthorizedResponse = parameters.apiUnauthorizedResponse
      ? parameters.apiUnauthorizedResponse
      : defaultAPIUnauthorizedResponse;
    this.apiForbiddenResponse = parameters.apiForbiddenResponse
      ? parameters.apiForbiddenResponse
      : defaultAPIForbiddenResponse;
    this.userIdHeaderName = parameters.userIdHeaderName
      ? parameters.userIdHeaderName
      : "X-FiefAuth-User-Id";
    this.accessTokenHeaderName = parameters.accessTokenHeaderName
      ? parameters.accessTokenHeaderName
      : "X-FiefAuth-Access-Token";
  }

  middleware(pathsConfig) {
    const compiledPathsAuthenticators = pathsConfig.map(
      ({ matcher, parameters }) => ({
        matcher: pathToRegexp(matcher),
        authenticate: this.fiefAuthEdge.authenticate(parameters),
      })
    );

    return async (context) => {
      const isPrefetchRequest =
        context.req.headers["x-middleware-prefetch"] === "1";

      // Handle login
      if (context.route.path === this.loginPath) {
        if (isPrefetchRequest) {
          return;
        }

        const authURL = await this.client.getAuthURL({
          redirectURI: this.redirectURI,
          scope: ["openid"],
        });
        context.redirect(authURL);
        const returnTo = context.query.return_to;
        if (returnTo) {
          context.app.$cookies.set(this.returnToCookieName, returnTo);
        }
        return;
      }

      // Handle authentication callback
      if (context.route.path === this.redirectPath) {
        if (isPrefetchRequest) {
          return;
        }

        const code = context.query.code;
        const [tokens] = await this.client.authCallback(code, this.redirectURI);
        const returnTo = context.app.$cookies.get(this.returnToCookieName);
        const redirectURL = new URL(
          returnTo || this.returnToDefault,
          context.req.url
        );
        context.redirect(redirectURL);
        context.app.$cookies.set(this.sessionCookieName, tokens.access_token, {
          maxAge: tokens.expires_in,
          httpOnly: true,
          secure: false,
        });
        context.app.$cookies.set(this.returnToCookieName, "", { maxAge: 0 });
        return;
      }

      // Handle logout
      if (context.route.path === this.logoutPath) {
        if (isPrefetchRequest) {
          return;
        }

        const logoutURL = await this.client.getLogoutURL({
          redirectURI: this.logoutRedirectURI,
        });
        context.redirect(logoutURL);
        context.app.$cookies.set(this.sessionCookieName, "", { maxAge: 0 });
        return;
      }

      // Check authentication for configured paths
      const matchingPath = compiledPathsAuthenticators.find(({ matcher }) =>
        matcher.exec(context.route.path)
      );
      if (matchingPath) {
        try {
          const result = await matchingPath.authenticate(context);
          const requestHeaders = { ...context.req.headers };
          if (result.accessTokenInfo) {
            requestHeaders[this.userIdHeaderName] = result.accessTokenInfo.id;
            requestHeaders[this.accessTokenHeaderName] =
              result.accessTokenInfo.access_token;
          }
          context.req.headers = requestHeaders;
          return;
        } catch (err) {
          if (err instanceof FiefAuthUnauthorized) {
            const authURL = await this.client.getAuthURL({
              redirectURI: this.redirectURI,
              scope: ["openid"],
            });
            context.redirect(authURL);
            context.app.$cookies.set(
              this.returnToCookieName,
              `${context.route.path}${context.req.url}`
            );
            return;
          }
          if (err instanceof FiefAuthForbidden) {
            context.redirect(
              new URL(this.forbiddenPath, context.req.url).toString()
            );
            return;
          }
          throw err;
        }
      }

      // Default response
      return;
    };
  }

  // ... (Keep the rest of the class methods as they are)
  authenticated(route, authenticatedParameters = {}) {
    const authenticate = this.fiefAuth.authenticate(authenticatedParameters);
    return (req, res) =>
      __awaiter(this, void 0, void 0, function* () {
        let user = null;
        let accessTokenInfo = null;
        try {
          const result = yield authenticate(req);
          user = result.user;
          accessTokenInfo = result.accessTokenInfo;
        } catch (err) {
          if (err instanceof FiefAuthUnauthorized) {
            return this.apiUnauthorizedResponse(req, res);
          }
          if (err instanceof FiefAuthForbidden) {
            return this.apiForbiddenResponse(req, res);
          }
        }
        req.accessTokenInfo = accessTokenInfo;
        req.user = user;
        return route(req, res);
      });
  }
  /**
   * Return an API route to get the {@link FiefUserInfo} and {@link FiefAccessTokenInfo}
   * of the currently authenticated user.
   *
   * It's mainly useful to get the user information from the React hooks.
   *
   * @returns An API route.
   *
   * @example
   * ```
   * import { fiefAuth } from '../../fief';
   *
   * export default fiefAuth.currentUser();
   * ```
   */
  currentUser() {
    return (req, res) =>
      __awaiter(this, void 0, void 0, function* () {
        const refresh = req.query.refresh === "true";
        return this.authenticated(
          (_req, _res) =>
            __awaiter(this, void 0, void 0, function* () {
              _res.status(200).json({
                userinfo: _req.user,
                access_token_info: _req.accessTokenInfo,
              });
            }),
          { optional: true, refresh }
        )(req, res);
      });
  }
}

export { FiefAuth };
