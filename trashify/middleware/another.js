// plugins/fiefAuth.js

import { ref, provide, inject, onMounted } from "vue";

const FiefAuthContextSymbol = Symbol();

const useAuthStorage = () => {
  const userinfo = ref(null);
  const accessTokenInfo = ref(null);

  const setUserinfo = (value) => {
    userinfo.value = value;
  };

  const clearUserinfo = () => {
    userinfo.value = null;
  };

  const setAccessTokenInfo = (value) => {
    accessTokenInfo.value = value;
  };

  const clearAccessTokenInfo = () => {
    accessTokenInfo.value = null;
  };

  return {
    userinfo,
    accessTokenInfo,
    setUserinfo,
    clearUserinfo,
    setAccessTokenInfo,
    clearAccessTokenInfo,
  };
};

const FiefAuthProvider = (props, { slots }) => {
  const authStorage = useAuthStorage();

  const refresh = async (useCache) => {
    const refreshParam = useCache === undefined ? false : !useCache;
    const response = await window.fetch(
      `${props.currentUserPath}?refresh=${refreshParam}`
    );

    if (response.status === 200) {
      const data = await response.json();
      authStorage.setAccessTokenInfo(data.access_token_info);
      authStorage.setUserinfo(data.userinfo);
    }
  };

  onMounted(() => {
    refresh();
  });

  provide(FiefAuthContextSymbol, {
    authStorage,
    refresh,
  });

  return slots.default();
};

const useFiefUserinfo = () => {
  const { authStorage } = inject(FiefAuthContextSymbol);
  return authStorage.userinfo;
};

const useFiefAccessTokenInfo = () => {
  const { authStorage } = inject(FiefAuthContextSymbol);
  return authStorage.accessTokenInfo;
};

const useFiefIsAuthenticated = () => {
  const accessTokenInfo = useFiefAccessTokenInfo();
  return accessTokenInfo !== null;
};

const useFiefRefresh = () => {
  const { refresh } = inject(FiefAuthContextSymbol);
  return refresh;
};

export {
  FiefAuthProvider,
  useFiefUserinfo,
  useFiefAccessTokenInfo,
  useFiefIsAuthenticated,
  useFiefRefresh,
};

export { FiefAuthContextSymbol, useAuthStorage };
