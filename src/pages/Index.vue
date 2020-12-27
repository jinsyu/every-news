<template>
  <q-page>
    <div class="row">
      <div class="col text-right" align="right"></div>
    </div>

    <q-list separator>
      <q-item
        clickable
        v-ripple
        v-for="news in searchText ? filteredNewsList : newsList"
        :key="news.link"
      >
        <q-item-section>
          <a :href="news.link" target="_blank">{{ news.title }}</a>
        </q-item-section>
        <q-item-section side class="text-caption">{{
          fromNow(news.pubDate)
        }}</q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import Parser from "rss-parser";
import moment from "moment";
import { QSpinnerFacebook } from "quasar";
moment.locale("ko-kr");
export default {
  name: "PageIndex",
  data() {
    return {
      filteredNewsList: [],
      newsList: [],
      excludeList: [],
      searchText: "",
      loading: false
    };
  },
  created() {
    this.getNews();
  },
  methods: {
    async getNews() {
      this.$q.loading.show({
        message: "뉴스 불러오는 중",
        spinner: QSpinnerFacebook
      });
      let parser = new Parser();
      const CORS_PROXY = "https://secret-ocean-49799.herokuapp.com/";
      this.newsList = (
        await parser.parseURL(
          CORS_PROXY +
            "https://news.google.com/rss?pz=1&cf=all&hl=ko&gl=KR&ceid=KR:ko"
        )
      ).items;
      this.orderByPubDate();
      this.$q.loading.hide();
    },
    fromNow(pubDate) {
      return moment(pubDate).fromNow();
    },
    // filterNews() {
    //   if (this.searchText) {
    //     this.filteredNewsList = this.newsList.filter(news =>
    //       news.title.includes(this.searchText)
    //     );
    //   }
    // },
    orderByPubDate() {
      this.newsList = this.newsList.sort((a, b) =>
        a.pubDate > b.pubDate ? -1 : 0
      );
    }
  }
};
</script>
