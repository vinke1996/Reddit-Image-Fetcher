interface RedditVideo {
  fallback_url: String;
  is_gif: Boolean;
}

interface Media {
  type?: String;
  reddit_video?: RedditVideo;
}

interface SecureMediaEmbed {
  media_domain_url: String;
}

interface ImagePreview {
  source: {
    url: String;
  };
}

/**
 * This interface represents a single submission in a subreddit
 */
export interface Post {
  subreddit: String;
  is_video: Boolean;
  preview?: {
    images: ImagePreview[];
  };
  media?: Media;
  secure_media?: Media;
  secure_media_embed?: SecureMediaEmbed
}

/**
 * A list of submissions from one or multiple subreddits subreddit.
 */
export interface Posts extends Array<{data: Post}>{}

/**
 * This interface represents the object that is returned to the user.
 * It contains information about the subreddit, a link to the fetched media and the media type.
 */
export interface MediaObj {
  subredditName: String;
  imageSource: String;
  mediaType: ''|'gif'|'video'|'image';
}
