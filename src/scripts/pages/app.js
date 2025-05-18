import routes from "../routes/routes";
import { getActiveRoute } from "../routes/url-parser";
import {
  subscribeUser,
  unsubscribeUser,
} from "../utils/notification-helper.js";
import {
  generateAuthenticatedNavigationListTemplate,
  generateUnauthenticatedNavigationListTemplate,
  generateSubscribeButtonTemplate,
  generateUnsubscribeButtonTemplate,
} from "../templates";

export default class App {
  #content;
  #drawerButton;
  #navigationDrawer;
  #navList;

  constructor({ navigationDrawer, drawerButton, content, navList }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;
    this.#navList = navList;

    this._setupDrawer();
    this._initAuthState();
  }

  _setupDrawer() {
    this.#drawerButton.addEventListener("click", () => {
      this.#navigationDrawer.classList.toggle("open");
    });
    document.body.addEventListener("click", (event) => {
      if (
        !this.#navigationDrawer.contains(event.target) &&
        !this.#drawerButton.contains(event.target)
      ) {
        this.#navigationDrawer.classList.remove("open");
      }
    });
  }

  _initAuthState() {
    this._setupNavigationList();
    window.addEventListener("auth-change", () => this._setupNavigationList());
  }

  _setupNavigationList() {
    const token = localStorage.getItem("token");
    const isLoggedIn = Boolean(token);

    this.#navList.innerHTML = isLoggedIn
      ? generateAuthenticatedNavigationListTemplate()
      : generateUnauthenticatedNavigationListTemplate();

    if (isLoggedIn) {
      (async () => {
        let registration = await navigator.serviceWorker.ready;
        let subscription = await registration.pushManager.getSubscription();
        let buttonHtml = subscription
          ? generateUnsubscribeButtonTemplate()
          : generateSubscribeButtonTemplate();

        const notifLi = document.getElementById("notification-list");
        if (notifLi) {
          notifLi.innerHTML = buttonHtml;

          if (!subscription) {
            document.getElementById("subscribe-button").onclick = async () => {
              if (Notification.permission !== "granted") {
                const permission = await Notification.requestPermission();
                if (permission !== "granted") {
                  alert("Izin notifikasi dibutuhkan untuk subscribe.");
                  return;
                }
              }
              try {
                await subscribeUser();
                alert("Berhasil subscribe notifikasi!");
                location.reload();
              } catch (err) {
                alert("Gagal subscribe notifikasi.");
              }
            };
          } else {
            document.getElementById("unsubscribe-button").onclick =
              async () => {
                try {
                  await unsubscribeUser();
                  alert("Berhasil unsubscribe notifikasi!");
                  location.reload();
                } catch (err) {
                  alert("Gagal unsubscribe notifikasi.");
                }
              };
          }
        }
      })();

      const btn = document.getElementById("logout-button");
      btn?.addEventListener("click", (e) => {
        e.preventDefault();
        if (confirm("Yakin ingin logout?")) {
          localStorage.removeItem("token");
          window.dispatchEvent(new Event("auth-change"));
          window.location.hash = "#/login";
        }
      });
    }
  }

  async renderPage() {
    const url = getActiveRoute();
    let route = routes[url];

    if (!route) {
      route = routes["/404"];
    }

    const token = localStorage.getItem("token");
    if (route.path !== "/404") {
      if (route.requiresAuth && !token) {
        window.location.hash = "#/login";
        return;
      }
      if (!route.requiresAuth && token) {
        window.location.hash = "#/";
        return;
      }
    }

    if (document.startViewTransition) {
      await document.startViewTransition(async () => {
        this.#content.innerHTML = await route.page.render();
        await route.page.afterRender();
      });
    } else {
      this.#content.innerHTML = await route.page.render();
      await route.page.afterRender();
    }
  }
}
