import _ from 'lodash';
import axios from 'axios';

import { Post, Posts, MediaObj } from './types';
import {
  getMediaRedditVideo,
  getPreviewImage,
  getPreviewGif,
  getSecureMediaEmbedVideo,
  getSecureMediaRedditVideo,
} from './utils';

const BASE_URL = 'https://www.reddit.com/r/';
const EXTENSION = '.json?raw_json=1&limit=100';

/**
 * Fetch posts from provided subreddits using the reddit api.
 * @param {string} subreddits to fetch from reddit.
 *
 * @returns {Promise<Posts>}
 */
async function fetchPosts(subreddits: String): Promise<Posts> {
  const url = BASE_URL + subreddits + EXTENSION;

  return (async() => {
    let reddit = null;
    try {
      reddit = await axios.get(url);
      const children = reddit.data.data.children;
      return children.length > 1 ? children : [];
    } catch (err) {
      reddit = err.response;
      return [];
    }
  })();

}

/**
 * Check if the post has eiter an image, video or gif.
 * @param {Post} post
 *
 * @returns {Boolean}
 */
function postHasMedia(post: Post): Boolean {
  const hasImage = _.isObject(post.preview) && !_.isEmpty(post.preview);
  const hasMedia = _.isObject(post.media) && !_.isEmpty(post.media);
  const hasSecureMedia = _.isObject(post.secure_media) && !_.isEmpty(post.secure_media);
  const hasSecureMediaEmbed =
  _.isObject(post.secure_media_embed) && !_.isEmpty(post.secure_media_embed);
  const notPinned = !post.stickied;

  return (hasImage || hasMedia || hasSecureMedia || hasSecureMediaEmbed || notPinned);
}

/**
 *  Retrieve media from a post.
 *  The importance of the media is as follows:
 *    1. reddit video/gif
 *    2. embedded video
 *    3. image
 *
 * @param post
 * 
 * @returns {MediaObj} with the subredditname, image source and media type.
 */
function getMediaFromPost(post: Post): MediaObj {
  let response: MediaObj = {
    subredditName: '',
    imageSource: '',
    mediaType: '',
  };

  response = getPreviewImage(post);
  response = getPreviewGif(post);
  // response = getSecureMediaEmbedVideo(post);
  response = getMediaRedditVideo(post);
  // response = getSecureMediaRedditVideo(post);

  return response;
}

/**
 *
 * @param {Posts} posts
 *
 * @returns {Post}
 */
function pickRandomPost(posts: Posts): Post {
  const shuffledPosts = _.shuffle(posts);
  const rndIndex = _.random(shuffledPosts.length - 1);
  return shuffledPosts[rndIndex].data;
}

/**
 * Fetch a random image from the provided subreddits.
 * @param {string | Array<string>} subreddits in which to search for an image.
 *
 * @returns {Promise<MediaObj>} with the type, source and subreddit name.
 */
async function fetch(subreddits: String | String[]): Promise<MediaObj> {
  let subs = subreddits;
  if (_.isArray(subs)) {
    subs = _.join(subreddits, '+');
  }

  const posts = await fetchPosts(subs);
  if(Array.isArray(posts) && !posts.length){
    return {
      subredditName: 'Deze subreddit bestaat niet!',
      imageSource: '',
      mediaType: 'error',
    };
  }

  let post = pickRandomPost(posts);

  while (!postHasMedia(post)) {
    post = pickRandomPost(posts);
  }

  const mediaPost = getMediaFromPost(post);

  return mediaPost;
}

export = fetch;
