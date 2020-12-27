<template>
  <q-page>
    <pull-to :top-load-method="getNews" :top-config="topConfig">
      <q-table
        flat
        bordered
        :data="newsList"
        :columns="columns"
        row-key="name"
        hide-header
        :filter="filter"
        :pagination.sync="pagination"
        @row-click="rowClicked"
        no-data-label="뉴스를 불러오는 중 입니다"
      >
        <template v-slot:body-cell-title="props">
          <q-td :props="props" style="white-space: normal">
            <span class="text-body1">{{ props.value }}</span>
          </q-td>
        </template>
        <template v-slot:body-cell-pubDate="props">
          <q-td :props="props">
            <span class="text-caption">{{ props.value }}</span>
          </q-td>
        </template>
        <template v-slot:top-right>
          <q-input
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="검색"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </pull-to>
  </q-page>
</template>

<script>
import PullTo from "vue-pull-to";
import { mapState } from "vuex";
import Parser from "rss-parser";
import moment from "moment";
import { QSpinnerFacebook } from "quasar";
moment.locale("ko-kr");
export default {
  name: "PageIndex",
  components: { PullTo },
  data() {
    return {
      loading: false,
      newsList: [],
      columns: [
        {
          name: "title",
          required: true,
          label: "제목",
          align: "left",
          field: (row) => row.title,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "pubDate",
          required: true,
          label: "날짜",
          align: "left",
          field: (row) => row.pubDate,
          format: (val) => `${this.fromNow(val)}`,
          sortable: true,
        },
      ],
      filter: "",
      pagination: {
        rowsPerPage: 20,
      },
      topConfig: {
        pullText: "로딩중",
        loadingText: "로딩중",
        triggerText: "로딩중",
        doneText: "완료",
      },
    };
  },
  created() {
    this.getNews();
  },
  computed: {
    ...mapState([
      "unfilteredNewsList",
      "filteredNewsList",
      "searchText",
      "excludeTextList",
    ]),
  },
  methods: {
    async getNews(loaded) {
      // this.$q.loading.show({
      //   message: "뉴스 불러오는 중",
      //   spinner: QSpinnerFacebook,
      // });
      let parser = new Parser();
      const CORS_PROXY = "https://secret-ocean-49799.herokuapp.com/";

      this.newsList = (
        await parser.parseURL(
          CORS_PROXY +
            "https://news.google.com/rss?pz=1&cf=all&hl=ko&gl=KR&ceid=KR:ko"
        )
      ).items;
      this.newsList = this.orderByPubDate(this.newsList);
      // console.log(this.newsList);
      loaded("done");
      // this.$q.loading.hide();
    },
    fromNow(pubDate) {
      return moment(pubDate).fromNow();
    },
    orderByPubDate(unorderedList) {
      return unorderedList.sort((a, b) => (a.pubDate > b.pubDate ? -1 : 0));
    },
    rowClicked(evt, row, index) {
      window.open(this.newsList[index].link);
    },
  },
};
</script>
