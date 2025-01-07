import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import { createBrowserHistory } from "history";
import { createReduxHistoryContext } from "redux-first-history";
import logger from "redux-logger";

import postsReducer from "features/posts/store/posts.slice";
import authReducer from "features/auth/store/auth.slice";
import adminReducer from "features/admin/store/admin.slice";
import dashboardReducer from "features/dashboard/store/dashboard.slice";
import memberReducer from "features/member/store/member.slice";
import roundingReducer from "features/rounding/store/rounding.slice";
import messageReducer from "features/message/store/message.slice";
import alertReducer from "features/alert/store/alert.slice";
import clubReducer from "features/club/store/club.slice";
import followReducer from "features/following/store/follow.slice";
import settingReducer from "features/setting/store/setting.slice";
import contentReducer from "features/content/store/content.slice";
import serviceReducer from "features/service/store/service.slice";
import syslogReducer from "features/syslog/store/syslog.slice";
import blogReducer from "features/blog/store/blog.slice";
import supportReducer from "features/support/store/support.slice";
import courseReducer from "features/course/store/course.slice";

import { rootSaga } from "store/rootSaga";
import Env from "config/Env";

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: createBrowserHistory(),
    reduxTravelling: Env.isDev(),
    savePreviousLocations: 1,
  });

const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: {
      posts: postsReducer,
      auth: authReducer,
      admin: adminReducer,
      dashboard: dashboardReducer,
      member: memberReducer,
      rounding: roundingReducer,
      message: messageReducer,
      alert: alertReducer,
      club: clubReducer,
      follow: followReducer,
      setting: settingReducer,
      content: contentReducer,
      service: serviceReducer,
      syslog: syslogReducer,
      blog: blogReducer,
      course: courseReducer,
      support: supportReducer,
      router: routerReducer,
    },
    // devTools: Env.isDev(),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: false, serializableCheck: false })
        .concat(sagaMiddleware)
        .concat(routerMiddleware)
        .concat(logger),
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

export const store = makeStore();

export const history = createReduxHistory(store);
