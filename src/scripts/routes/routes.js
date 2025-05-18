import HomePage from "../pages/home/home-page";
import AboutPage from "../pages/about/about-page";
import AddStoryPage from "../pages/add-story/add-story-page";
import LoginPage from "../pages/auth/login-page";
import RegisterPage from "../pages/auth/register-page";
import BookmarkPage from "../pages/bookmark/bookmark-page";
import NotFoundPage from "../pages/not-found/not-found-page";

export default {
  "/": {
    page: HomePage,
    requiresAuth: true,
  },
  "/about": {
    page: AboutPage,
    requiresAuth: true,
  },
  "/add-story": {
    page: AddStoryPage,
    requiresAuth: true,
  },
  "/bookmark": {
    page: BookmarkPage,
    requiresAuth: true,
  },
  "/login": {
    page: new LoginPage(),
    requiresAuth: false,
  },
  "/register": {
    page: new RegisterPage(),
    requiresAuth: false,
  },
  "/404": {
    path: "/404",
    page: NotFoundPage,
    requiresAuth: false,
  },
};
