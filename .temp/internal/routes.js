/**
 * Generated by "@vuepress/internal-routes"
 */

import { injectComponentOption, ensureAsyncComponentsLoaded } from '@app/util'
import rootMixins from '@internal/root-mixins'
import GlobalLayout from "D:\\Desktop\\Blog\\myblog\\node_modules\\@vuepress\\core\\lib\\client\\components\\GlobalLayout.vue"

injectComponentOption(GlobalLayout, 'mixins', rootMixins)
export const routes = [
  {
    name: "v-58d8fb0e",
    path: "/TypeScript_docs/%E5%87%BD%E6%95%B0.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-58d8fb0e").then(next)
    },
  },
  {
    path: "/TypeScript_docs/函数.html",
    redirect: "/TypeScript_docs/%E5%87%BD%E6%95%B0.html"
  },
  {
    path: "/TypeScript_docs/函数.html",
    redirect: "/TypeScript_docs/%E5%87%BD%E6%95%B0.html"
  },
  {
    name: "v-d2651d16",
    path: "/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-d2651d16").then(next)
    },
  },
  {
    path: "/index.html",
    redirect: "/"
  },
  {
    name: "v-7865ea98",
    path: "/TypeScript_docs/%E5%9F%BA%E7%A1%80%E7%B1%BB%E5%9E%8B.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-7865ea98").then(next)
    },
  },
  {
    path: "/TypeScript_docs/基础类型.html",
    redirect: "/TypeScript_docs/%E5%9F%BA%E7%A1%80%E7%B1%BB%E5%9E%8B.html"
  },
  {
    path: "/TypeScript_docs/基础类型.html",
    redirect: "/TypeScript_docs/%E5%9F%BA%E7%A1%80%E7%B1%BB%E5%9E%8B.html"
  },
  {
    name: "v-109e7e7c",
    path: "/TypeScript_docs/%E6%B3%9B%E5%9E%8B.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-109e7e7c").then(next)
    },
  },
  {
    path: "/TypeScript_docs/泛型.html",
    redirect: "/TypeScript_docs/%E6%B3%9B%E5%9E%8B.html"
  },
  {
    path: "/TypeScript_docs/泛型.html",
    redirect: "/TypeScript_docs/%E6%B3%9B%E5%9E%8B.html"
  },
  {
    name: "v-7806a9d2",
    path: "/TypeScript_docs/%E6%8E%A5%E5%8F%A3.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-7806a9d2").then(next)
    },
  },
  {
    path: "/TypeScript_docs/接口.html",
    redirect: "/TypeScript_docs/%E6%8E%A5%E5%8F%A3.html"
  },
  {
    path: "/TypeScript_docs/接口.html",
    redirect: "/TypeScript_docs/%E6%8E%A5%E5%8F%A3.html"
  },
  {
    name: "v-5f8c682c",
    path: "/TypeScript_docs/%E7%B1%BB.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-5f8c682c").then(next)
    },
  },
  {
    path: "/TypeScript_docs/类.html",
    redirect: "/TypeScript_docs/%E7%B1%BB.html"
  },
  {
    path: "/TypeScript_docs/类.html",
    redirect: "/TypeScript_docs/%E7%B1%BB.html"
  },
  {
    name: "v-661cd419",
    path: "/Vue3_docs/Pinia.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-661cd419").then(next)
    },
  },
  {
    name: "v-32364cbf",
    path: "/Vue3_docs/Vue3.2.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-32364cbf").then(next)
    },
  },
  {
    path: '*',
    component: GlobalLayout
  }
]