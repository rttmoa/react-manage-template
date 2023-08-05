import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter); // Vue.use 全局router





const routes = [
  {
    path: "/",
    redirect: { name: "index" },
  },
  { 
    path: "/index",
    name: "index",
    component: () =>
      import(/* webpackChunkName: "index" */ "./views/Home/Index.vue"), // TODO: 首页
  },
  { 
    path: "/archives",
    name: "archives",
    component: () =>
      import(/* webpackChunkName: "archives" */ "./views/Archives/Index.vue"), // TODO: 归档
  },
  { 
    path: "/categories",
    name: "categories",
    component: () =>
      import(/* webpackChunkName: "categories" */ "./views/Categories/Index.vue"),  // TODO: 分类
  },
  { 
    path: "/categories/details",
    name: "categoriesDetails",
    component: () =>
      import(/* webpackChunkName: "categories" */ "./views/Categories/Details.vue"), // TODO: 分类详情
  },
  { 
    path: "/tags",
    name: "tags",
    component: () => import(/* webpackChunkName: "tags" */ "./views/Tags/Index.vue"), // TODO: 标签
  },
  { 
    path: "/tags/details",
    name: "tagsDetails",
    component: () => import(/* webpackChunkName: "tags" */ "./views/Tags/Details.vue"), // TODO: 标签详情
  },
  { 
    path: "/about",
    name: "about",
    component: () => import(/* webpackChunkName: "about" */ "./views/About/Index.vue"), // TODO: 关于
  },
  { 
    path: "/articles",
    name: "articles",
    component: () => import(/* webpackChunkName: "articles" */ "./views/Articles/Index.vue"), // TODO: 文章
  },
  { 
    path: "/articles/details",
    name: "articlesDetails",
    component: () => import(/* webpackChunkName: "articles" */ "./views/Articles/Details.vue"), // TODO: 文章详情
  },
  { 
    path: "/user",
    name: "user",
    component: () => import(/* webpackChunkName: "user" */ "./views/User/Index.vue"), // TODO: 用户中心
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
