import {createSlice} from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app", // Naming the slice 'app'
    initialState: {
        open: true, // Initial state for the sidebar, whether it is open or closed
        video: [], // Initial state for storing video data
        category: "All", // Initial state for the selected category
        searchSuggestion: [], // Initial state for storing search suggestions
    },
    reducers: {
        // Reducer function to toggle the sidebar state
        toggleSidebar: (state) => {
            state.open = !state.open; // Toggles the 'open' state between true and false
        },
        // Reducer function to set home video data
        setHomeVideo: (state, action) => {
            state.video = action.payload; // Updates the 'video' state with the data passed in the action payload
        },
        // Reducer function to set the selected category
        setCategory: (state, action) => {
            state.category = action.payload; // Updates the 'category' state with the data passed in the action payload
        },
        // Reducer function to set search suggestions
        setSearchSuggestion: (state, action) => {
            state.searchSuggestion = action.payload; // Updates the 'searchSuggestion' state with the data passed in the action payload
        }
    }
});

export const {toggleSidebar,setHomeVideo,setCategory,setSearchSuggestion} = appSlice.actions;
export default appSlice.reducer;