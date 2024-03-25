// FiefAuthProvider.vue

<template>
  <slot></slot>
</template>

<script>
import { onMounted, provide } from "vue";
import { FiefAuthContextSymbol, useAuthStorage } from "../middleware/another"; // Import any necessary functions from your fiefAuth module

export default {
  setup(props, { slots }) {
    const authStorage = useAuthStorage();

    const refresh = async (useCache) => {
      const refreshParam = useCache === undefined ? false : !useCache;
      const response = await window.fetch(`login?refresh=${refreshParam}`);

      console.log(response.text())
      if (response.status === 200) {
        const data = await response.json();
        authStorage.setAccessTokenInfo(data.access_token_info);
        authStorage.setUserinfo(data.userinfo);
      }

      console.log(authStorage.userinfo)
    };

    onMounted(() => {
      refresh();
    });

    provide(FiefAuthContextSymbol, {
      useAuthStorage,
      refresh,
    });

    return () => slots.default?.();
  },
};
</script>