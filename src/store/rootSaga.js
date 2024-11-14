import { all, fork } from "redux-saga/effects";

import { postsWatcherSaga } from "features/posts/store/posts.saga";
import { authWatcherSaga } from "features/auth/store/auth.saga";
import { adminWatcherSaga } from "features/admin/store/admin.saga";
import { dashboardWatcherSaga } from "features/dashboard/store/dashboard.saga";
import { memberWatcherSaga } from "features/member/store/member.saga";
import { roundingWatcherSaga } from "features/rounding/store/rounding.saga";
import { messageWatcherSaga } from "features/message/store/message.saga";
import watchAlertActions from "features/alert/store/alert.saga";
import { clubWatcherSaga } from "features/club/store/club.saga";
import { followWatcherSaga } from "features/following/store/follow.saga";
import { settingWatcherSaga } from "features/setting/store/setting.saga";
import { contentWatcherSaga } from "features/content/store/content.saga";
import { serviceWatcherSaga } from "features/service/store/service.saga";
import { syslogWatcherSaga } from "features/syslog/store/syslog.saga";
import { blogWatcherSaga } from "features/blog/store/blog.saga";

export function* rootSaga() {
  yield all([fork(postsWatcherSaga)]);
  yield all([fork(authWatcherSaga)]);
  yield all([fork(adminWatcherSaga)]);
  yield all([fork(dashboardWatcherSaga)]);
  yield all([fork(memberWatcherSaga)]);
  yield all([fork(roundingWatcherSaga)]);
  yield all([fork(messageWatcherSaga)]);
  yield all([fork(watchAlertActions)]);
  yield all([fork(clubWatcherSaga)]);
  yield all([fork(followWatcherSaga)]);
  yield all([fork(settingWatcherSaga)]);
  yield all([fork(contentWatcherSaga)]);
  yield all([fork(serviceWatcherSaga)]);
  yield all([fork(syslogWatcherSaga)]);
  yield all([fork(blogWatcherSaga)]);
}

export default rootSaga;
