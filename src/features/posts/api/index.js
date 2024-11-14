/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from "config/Env";
import makeApi from "libs/core/configureAxios";

const api = makeApi(`${Env.API_BASE_URL}`);

const POSTS_BASE_URL = `/posts`;

export const getPosts = () => api.get(POSTS_BASE_URL);

export const createPost = (post) => api.post(POSTS_BASE_URL, post);

export const updatePost = (post) =>
  api.put(`${POSTS_BASE_URL}/${post.id}`, post);

export const deletePost = (post) =>
  api.delete(`${POSTS_BASE_URL}/${post.id}`, { data: post });
