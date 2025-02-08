// Import the constants from the module
import API_KEY, {
    API_KEY as namedAPIKey,
    BASE_URL,
    YOUTUBE_VIDEO_API,
    SEARCH_SUGGESTIONS_API
  } from './constants'; // Adjust the path according to your project structure
  
  describe('API Constants', () => {
    test('API_KEY should be correctly defined and exported as default', () => {
      expect(API_KEY).toBe("AIzaSyDD5BpZSzVz_mh1w079o8sZ2mpvsa6_gt8");
    });
  
    test('API_KEY should be correctly defined and exported as named export', () => {
      expect(namedAPIKey).toBe("AIzaSyDD5BpZSzVz_mh1w079o8sZ2mpvsa6_gt8");
    });
  
    test('BASE_URL should be correctly defined', () => {
      expect(BASE_URL).toBe("https://www.googleapis.com/youtube/v3");
    });
  
    test('YOUTUBE_VIDEO_API should be correctly defined', () => {
      expect(YOUTUBE_VIDEO_API).toBe(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=${API_KEY}`);
    });
  
    test('SEARCH_SUGGESTIONS_API should be correctly defined', () => {
      expect(SEARCH_SUGGESTIONS_API).toBe("http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=");
    });
  });
  