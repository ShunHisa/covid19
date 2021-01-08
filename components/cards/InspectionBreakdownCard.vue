<template>
  <v-col cols="12" md="6" class="DataCard">
    <inspector-breakdown-bar-chart
      :title="'検査実施件数内訳'"
      :title-id="'number-of-tested-breakdown'"
      :chart-id="'time-stacked-bar-chart-inspections-breakdown'"
      :chart-data="inspectionsBreakdownGraph"
      :date="inspectionsBreakdown.last_update"
      :items="inspectionsBreakdownItems"
      :labels="inspectionsBreakdownLabels"
      :unit="'件'"
      :data-labels="inspectionsBreakdownDataLabels"
      :url="
        'https://ckan.open-governmentdata.org/dataset/401005_kitakyushu_covid19_test_count_breakdown'
      "
    >
      <!-- 件.tested = 検査数
      <template v-if="$i18n.locale !== 'ja-basic'" v-slot:additionalNotes>
        <br />
        {{ $t('※1: 疑い例・接触者調査') }}
        <br />
        {{ $t('※2: チャーター便・クルーズ船') }}
      </template>
      -->
    </inspector-breakdown-bar-chart>
  </v-col>
</template>

<script>
import inspectionsBreakdown from '@/data/inspections_breakdown.json'
import InspectorBreakdownBarChart from '@/components/InspectorBreakdownBarChart.vue'
export default {
  components: {
    InspectorBreakdownBarChart
  },
  data() {
    // 検査実施日別状況
    const inspectionsBreakdownGraph = [
      inspectionsBreakdown.data['帰国者接触者外来等検査件数'],
      inspectionsBreakdown.data['ＰＣＲ検査センター検査件数'],
      inspectionsBreakdown.data['民間検査機関検査件数']
    ]
    const inspectionsBreakdownItems = [
      '帰国者接触者外来等',
      'ＰＣＲ検査センター',
      '民間検査機関'
    ]
    const inspectionsBreakdownLabels = inspectionsBreakdown.labels
    const inspectionsBreakdownDataLabels = [
      '帰国者接触者外来等',
      'ＰＣＲ検査センター',
      '民間検査機関'
    ]
    const data = {
      inspectionsBreakdown,
      inspectionsBreakdownGraph,
      inspectionsBreakdownItems,
      inspectionsBreakdownLabels,
      inspectionsBreakdownDataLabels
    }
    return data
  }
}
</script>
