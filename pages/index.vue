<template>
  <div class="MainPage">
    <div class="Header mb-3">
      <page-header :icon="headerItem.icon">
        {{ headerItem.title }}
      </page-header>
      <div class="UpdatedAt">
        <span>{{ $t('最終更新') }} </span>
        <time :datetime="updatedAt">{{ lastUpdate }}</time>
      </div>
      <div
        v-show="!['ja', 'ja-basic'].includes($i18n.locale)"
        class="Annotation"
      >
        <span>{{ $t('注釈') }} </span>
      </div>
    </div>
    <whats-new class="mb-4" :items="newsItems" />
    <static-info
      class="mb-4"
      url="https://www.city.kitakyushu.lg.jp/ho-huku/18901203.html"
      :text="$t('自分や家族の症状に不安や心配があればまずは電話相談をどうぞ')"
    />
    <v-row class="DataBlock">
      <!-- 検査陽性者の状況 -->
      <confirmed-cases-details-card />
      <!-- 陽性患者数 -->
      <confirmed-cases-number-card />
      <!-- 検査実施件数 -->
      <tested-number-card />
      <!-- 検査実施件数内訳 -->
      <inspection-breakdown-card />
      <!-- 陽性患者の属性 -->
      <confirmed-cases-attributes-card />
      <!-- コールセンター件数 -->
      <telephone-advisory-reports-number-card />
    </v-row>
    <v-divider />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'
import PageHeader from '@/components/PageHeader.vue'
import WhatsNew from '@/components/WhatsNew.vue'
import StaticInfo from '@/components/StaticInfo.vue'
import Data from '@/data/data.json'
import inspectionsData from '@/data/inspections_summary.json'
import News from '@/data/news.json'
import ConfirmedCasesDetailsCard from '@/components/cards/ConfirmedCasesDetailsCard.vue'
import ConfirmedCasesNumberCard from '@/components/cards/ConfirmedCasesNumberCard.vue'
import ConfirmedCasesAttributesCard from '@/components/cards/ConfirmedCasesAttributesCard.vue'
import TestedNumberCard from '@/components/cards/TestedNumberCard.vue'
import TelephoneAdvisoryReportsNumberCard from '@/components/cards/TelephoneAdvisoryReportsNumberCard.vue'
import { convertDatetimeToISO8601Format } from '@/utils/formatDate'
import InspectionBreakdownCard from '@/components/cards/InspectionBreakdownCard.vue'

export default Vue.extend({
  components: {
    PageHeader,
    WhatsNew,
    StaticInfo,
    ConfirmedCasesDetailsCard,
    ConfirmedCasesNumberCard,
    ConfirmedCasesAttributesCard,
    TestedNumberCard,
    TelephoneAdvisoryReportsNumberCard,
    InspectionBreakdownCard
  },
  data() {
    const lastUpdate =
      Data.lastUpdate > inspectionsData.last_update
        ? Data.lastUpdate
        : inspectionsData.last_update
    const data = {
      Data,
      inspectionsData,
      lastUpdate,
      headerItem: {
        icon: 'mdi-chart-timeline-variant',
        title: '市内の最新感染動向'
      },
      newsItems: News.newsItems
    }
    return data
  },
  computed: {
    updatedAt() {
      return convertDatetimeToISO8601Format(this.$data.Data.lastUpdate)
    }
  },
  head(): MetaInfo {
    return {
      title: '市内の最新感染動向' as string
    }
  }
})
</script>

<style lang="scss" scoped>
.MainPage {
  .Header {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;

    @include lessThan($small) {
      flex-direction: column;
      align-items: baseline;
    }
  }

  .UpdatedAt {
    @include font-size(14);

    color: $gray-3;
    margin-bottom: 0.2rem;
  }

  .Annotation {
    @include font-size(12);

    color: $gray-3;
    @include largerThan($small) {
      margin: 0 0 0 auto;
    }
  }
  .DataBlock {
    margin: 20px -8px;

    .DataCard {
      @include largerThan($medium) {
        padding: 10px;
      }

      @include lessThan($small) {
        padding: 4px 8px;
      }
    }
  }
}
</style>
