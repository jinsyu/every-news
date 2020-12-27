import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      searchText: "",
      excludeTextList: [],
      unfilteredNewsList: [],
      filteredNewsList: []
    },
    mutations: {
      SET_SEARCH_TEXT(state, text) {
        state.searchText = text;
      },
      SET_EXCLUDE_TEXT_LIST(state, textList) {
        state.excludeTextList = textList;
      },
      SET_UNFILTERED_NEWS_LIST(state, newsList) {
        state.unfilteredNewsList = newsList;
      },
      SET_FILTERED_NEWS_LIST(state, newsList) {
        state.filteredNewsList = newsList;
      }
    },
    plugins: [createPersistedState()]
  });

  return Store;
}
