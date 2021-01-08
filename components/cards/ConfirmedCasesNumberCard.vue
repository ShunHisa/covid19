<template>
  <v-col cols="12" md="6" class="DataCard">
    <time-bar-chart
      :title="$t('陽性患者数')"
      :title-id="'number-of-confirmed-cases'"
      :chart-id="'time-bar-chart-patients'"
      :chart-data="patientsGraph"
      :date="Data.patients.date"
      :unit="$t('人')"
      :url="
        'https://ckan.open-governmentdata.org/dataset/401005_kitakyushu_covid19_patients'
      "
    />
  </v-col>
</template>

<script>
import formatGraphForPatients from '@/utils/formatGraphForPatients'
import Data from '@/data/data.json'
import TimeBarChart from '@/components/TimeBarChart.vue'

export default {
  components: {
    TimeBarChart
  },
  data() {
    // 感染者数グラフ
    const patientsGraph = formatGraphForPatients(Data.patients_summary.data)

    const data = {
      Data,
      patientsGraph
    }
    return data
  }
}
</script>
