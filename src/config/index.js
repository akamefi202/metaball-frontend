export const API_BASE_URL = "http://api.golfmate.jp:5000";
export const TEST_URL = `${API_BASE_URL}/hello`;
export const AUTH_FAILURE_CODE = 401;
export const TOKEN_NAME = "metaball-token-0123";
export const TOKEN_EXPIRE = "metaball-token-0123-expire";
export const TABLE_PAGE_LIMIT = 20;
export const TABLE_PAGE_LIMIT_LARGE = 10;
export const SettingType = {
  LOCATION: "location",
  HIT: "hit",
  EXPERIENCE: "experience",
  THEME: "theme",
  BLOG_THEME: "blog",
};
export const ContentType = {
  ADVERTISING: "advertising",
  NEWS: "news",
  NOTIFICATION: "notification",
  NOTE: "note",
  EVENT: "event",
};
export const ServiceType = {};

export const LanguageOption = {
  en: { id: "en", name: "English", flag: "us" },
  jp: { id: "jp", name: "日本語", flag: "jp" },
};
