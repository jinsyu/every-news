<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          모두의 뉴스
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above content-class="bg-grey-1">
      <q-list bordered>
        <q-item
          clickable
          v-ripple
          class="bg-grey-4 text-h6"
          style="height:100px"
        >
          <q-item-section> 설정</q-item-section>
          <q-item-section avatar>
            <q-icon color="primary" class="eva eva-settings-2-outline" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              class="q-py-md"
              v-model="searchText"
              placeholder="검색"
              @change="onFilterNews"
              dense
            >
              <template v-slot:append>
                <q-icon class="eva eva-search-outline" color="primary" />
              </template>
            </q-input>

            <q-input
              class="q-py-md"
              v-model="excludeText"
              placeholder="검색 제외"
              @change="onExcludeNews"
              dense
            >
              <template v-slot:append>
                <q-icon class="eva eva-search-outline" color="primary" />
              </template>
            </q-input>
            <q-badge
              v-for="excludeText in excludeTextList"
              :key="excludeText"
              :label="excludeText"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "MainLayout",
  data() {
    return {
      searchText: "",
      excludeText: "",
      excludeTextList: [],
      leftDrawerOpen: false,
      menus: [
        {
          title: "모든 뉴스",
          icon: "school",
          link: "https://quasar.dev"
        }
      ]
    };
  },
  methods: {
    // ...mapMutations(["SET_SEARCH_TEXT", "SET_EXCLUDE_TEXT_LIST"]),
    onFilterNews() {
      this.$store.commit("SET_SEARCH_TEXT", this.searchText);
    },
    onExcludeNews() {
      this.excludeTextList.push(this.excludeText);
      this.$store.commmit("SET_EXCLUDE_TEXT_LIST", this.excludeTextList);
    }
  }
};
</script>
<style lang="scss" scoped>
input[placeholder] {
  color: white;
}
input[type="text"]:focus:not([readonly]) {
  box-shadow: none;
  border-bottom: none;
}
</style>
