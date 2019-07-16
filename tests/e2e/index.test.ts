import rif from '../../src/index';

const TEST_SUBREDDIT = 'funny';
const TEST_SUBREDDITS = ['funny', 'aww'];

test('should return media with one provided subreddit', async () => {
  const response = await rif(TEST_SUBREDDIT);

  expect(response).toHaveProperty('subredditName');
  expect(response).toHaveProperty('imageSource');
  expect(response).toHaveProperty('mediaType');

  expect(response.subredditName).not.toEqual('');
  expect(response.imageSource).not.toEqual('');
  expect(response.mediaType).not.toEqual('');
});

test('should return media with multiple provided subreddits', async () => {
  const response = await rif(TEST_SUBREDDITS);

  expect(response).toHaveProperty('subredditName');
  expect(response).toHaveProperty('imageSource');
  expect(response).toHaveProperty('mediaType');

  expect(response.subredditName).not.toEqual('');
  expect(response.imageSource).not.toEqual('');
  expect(response.mediaType).not.toEqual('');
});