import Vue from 'vue'
import { createImage} from '@nuxt/image/runtime'
import NuxtImg from '@nuxt/image/runtime/components/nuxt-img.vue'
import NuxtPicture from '@nuxt/image/runtime/components/nuxt-picture.vue'

<%=options.providers.map(p => `import * as ${p.importName} from '${p.runtime}'`).join('\n')%>

const imageOptions = <%= JSON.stringify(options.imageOptions, null, 2) %>

imageOptions.providers = {
<%=options.providers.map(p => `  ['${p.name}']: { provider: ${p.importName}, defaults: ${JSON.stringify(p.runtimeOptions)} }`).join(',\n') %>
}


Vue.component(NuxtImg.name, NuxtImg)
Vue.component(NuxtPicture.name, NuxtPicture)
Vue.component('NImg', NuxtImg)
Vue.component('NPicture', NuxtPicture)

export default function (nuxtContext, inject) {
  const $img = createImage(imageOptions, nuxtContext)
  inject('img', $img)
}