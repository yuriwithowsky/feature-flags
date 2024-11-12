```vue
<template>
  <component v-if="canView" :is="wrapperTag">
    <slot></slot>
  </component>
  <component v-else-if="fallback" :is="wrapperTag">
    {{ fallback }}
  </component>
</template>

<script>
import { canViewFeature } from "../libs/featureFlags";
import { getUser } from "../utils/getUser";

export default {
  name: "FeatureFlag",
  props: {
    feature: {
      type: String,
      required: true,
    },
    fallback: {
      type: [String, Number, Object],
      default: null,
    },
    // Prop opcional para definir a tag wrapper
    wrapperTag: {
      type: String,
      default: "div",
    },
  },
  computed: {
    canView() {
      const user = getUser();
      return canViewFeature(this.feature, user);
    },
  },
};
</script>
```

```vuejs
<template>
  <FeatureFlag feature="minhaFeature" fallback="Sem acesso">
    <p>Conteúdo visível apenas para usuários com acesso</p>
  </FeatureFlag>
</template>
```
