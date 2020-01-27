import _ from 'lodash';
import { Post, MediaObj } from '../types';

const mediaObj: MediaObj = {
  subredditName: '',
  imageSource: '',
  mediaType: '',
};

export function getSecureMediaRedditVideo(post: Post): MediaObj {
  if (_.isObject(post.secure_media) && post.secure_media.reddit_video) {
    mediaObj.subredditName = post.subreddit;
    mediaObj.imageSource = post.secure_media.reddit_video.fallback_url;
    mediaObj.mediaType = post.secure_media.reddit_video.is_gif ? 'gif' : 'video';
  }

  return mediaObj;
}

export function getMediaRedditVideo(post: Post): MediaObj {
  if (_.isObject(post.media) && post.media.reddit_video) {
    mediaObj.subredditName = post.subreddit;
    mediaObj.imageSource = post.media.reddit_video.fallback_url;
    mediaObj.mediaType = post.media.reddit_video.is_gif ? 'gif' : 'video';
  }

  return mediaObj;
}

export function getSecureMediaEmbedVideo(post: Post): MediaObj {
  if (_.isObject(post.secure_media_embed) && !_.isEmpty(post.secure_media_embed)) {
    const secureMediaEmbedPost = post.secure_media_embed;
    mediaObj.subredditName = post.subreddit;
    mediaObj.imageSource = secureMediaEmbedPost.media_domain_url;
    mediaObj.mediaType = 'video';
  }

  return mediaObj;
}

export function getPreviewImage(post: Post): MediaObj {
  if (_.isObject(post.preview)) {
    const imagePreviewPost = post.preview.images[0];
    mediaObj.subredditName = post.subreddit;
    mediaObj.imageSource = imagePreviewPost.source.url;
    mediaObj.mediaType = 'image';
  }

  return mediaObj;
}

export function getPreviewGif(post: Post): MediaObj {
  if (_.isObject(post.preview)) {
    const gifPreviewPost = post.preview.reddit_video_preview;
    mediaObj.subredditName = post.subreddit;
    mediaObj.imageSource = gifPreviewPost.fallback_url;
    mediaObj.mediaType = 'gif';
  }

  return mediaObj;
}
