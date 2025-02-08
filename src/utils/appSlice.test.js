import appReducer, {
    toggleSidebar,
    setHomeVideo,
    setCategory,
    setSearchSuggestion,
  } from './appSlice'; // Adjust the path according to your project structure
  
  describe('appSlice', () => {
    const initialState = {
      open: true,
      video: [],
      category: 'All',
      searchSuggestion: [],
    };
  
    test('should return the initial state', () => {
      expect(appReducer(undefined, {})).toEqual(initialState);
    });
  
    test('should handle toggleSidebar', () => {
      const previousState = { ...initialState, open: true };
      expect(appReducer(previousState, toggleSidebar())).toEqual({
        ...previousState,
        open: false,
      });
      expect(appReducer({ ...previousState, open: false }, toggleSidebar())).toEqual({
        ...previousState,
        open: true,
      });
    });
  
    test('should handle setHomeVideo', () => {
      const previousState = { ...initialState, video: [] };
      const newVideoData = [{ id: 1, title: 'Test Video' }];
      expect(appReducer(previousState, setHomeVideo(newVideoData))).toEqual({
        ...previousState,
        video: newVideoData,
      });
    });
  
    test('should handle setCategory', () => {
      const previousState = { ...initialState, category: 'All' };
      const newCategory = 'Music';
      expect(appReducer(previousState, setCategory(newCategory))).toEqual({
        ...previousState,
        category: newCategory,
      });
    });
  
    test('should handle setSearchSuggestion', () => {
      const previousState = { ...initialState, searchSuggestion: [] };
      const newSuggestions = ['Suggestion 1', 'Suggestion 2'];
      expect(appReducer(previousState, setSearchSuggestion(newSuggestions))).toEqual({
        ...previousState,
        searchSuggestion: newSuggestions,
      });
    });
  });
  