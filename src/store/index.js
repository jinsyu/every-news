import Vue from "vue";
import Vuex from "vuex";

// import example from './module-example'

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

const Store = new Vuex.Store({
  state: {
    searchText: "",
    excludeTextList: [],
    unfilteredNewsList: [],
    finteredNewsList: []
  },
  mutations: {
    SET_SEARCH_TEXT(state, text) {
      this.state.searchText = text;
    },
    SET_EXCLUDE_TEXT_LIST(state, textList) {
      this.state.excludeTextList = textList;
    },
    SET_UNFILTERED_NEWS_LIST(state, newsList) {
      this.state.unfilteredNewsList = newsList;
    },
    SET_FILTERED_NEWS_LIST(state, newsList) {
      this.state.finteredNewsList = newsList;
    }
  }
});

export default Store;
