<template>
  <div>
    <confirmed-cases-details-card
      v-if="this.$route.params.card == 'details-of-confirmed-cases'"
    />
    <tested-cases-details-card
      v-else-if="this.$route.params.card == 'details-of-tested-cases'"
    />
    <confirmed-cases-number-card
      v-else-if="this.$route.params.card == 'number-of-confirmed-cases'"
    />
    <confirmed-cases-attributes-card
      v-else-if="this.$route.params.card == 'attributes-of-confirmed-cases'"
    />
    <tested-number-card
      v-else-if="this.$route.params.card == 'number-of-tested'"
    />
    <inspection-breakdown-card
      v-else-if="this.$route.params.card == 'number-of-tested-breakdown'"
    />
    <telephone-advisory-reports-number-card
      v-else-if="
        this.$route.params.card ==
          'number-of-reports-to-covid19-telephone-advisory-center'
      "
    />
  </div>
</template>

<script>
import Data from '@/data/data.json'
import agencyData from '@/data/agency.json'
import ConfirmedCasesDetailsCard from '@/components/cards/ConfirmedCasesDetailsCard.vue'
import TestedCasesDetailsCard from '@/components/cards/TestedCasesDetailsCard.vue'
import ConfirmedCasesNumberCard from '@/components/cards/ConfirmedCasesNumberCard.vue'
import ConfirmedCasesAttributesCard from '@/components/cards/ConfirmedCasesAttributesCard.vue'
import TestedNumberCard from '@/components/cards/TestedNumberCard.vue'
import TelephoneAdvisoryReportsNumberCard from '@/components/cards/TelephoneAdvisoryReportsNumberCard.vue'
import InspectionBreakdownCard from '@/components/cards/InspectionBreakdownCard.vue'

export default {
  components: {
    ConfirmedCasesDetailsCard,
    TestedCasesDetailsCard,
    ConfirmedCasesNumberCard,
    ConfirmedCasesAttributesCard,
    TestedNumberCard,
    InspectionBreakdownCard,
    TelephoneAdvisoryReportsNumberCard
  },
  data() {
    let title, updatedAt
    switch (this.$route.params.card) {
      case 'details-of-confirmed-cases':
        title = '検査陽性者の状況'
        updatedAt = Data.inspections_summary.date
        break
      case 'details-of-tested-cases':
        title = '検査実施状況'
        updatedAt = Data.inspection_status_summary.date
        break
      case 'number-of-confirmed-cases':
        title = '陽性患者数'
        updatedAt = Data.patients.date
        break
      case 'attributes-of-confirmed-cases':
        title = '陽性患者の属性'
        updatedAt = Data.patients.date
        break
      case 'number-of-tested':
        title = '検査実施件数'
        updatedAt = Data.inspections_summary.date
        break
      case 'number-of-reports-to-covid19-telephone-advisory-center':
        title = '新型コロナコールセンター相談件数'
        updatedAt = Data.contacts.date
        break
      case 'number-of-tested-breakdown':
        title = '検査件数内訳'
        updatedAt = agencyData.date
        break
    }

    const data = {
      title,
      updatedAt
    }
    return data
  },
  head() {
    const url = 'https://stopcovid19-kitakyushu.jp'
    const timestamp = new Date().getTime()
    const ogpImage =
      this.$i18n.locale === 'ja'
        ? `${url}/ogp/${this.$route.params.card}.png?t=${timestamp}`
        : `${url}/ogp/${this.$i18n.locale}/${this.$route.params.card}.png?t=${timestamp}`
    const description = `${this.updatedAt} | 
      '当サイトは新型コロナウイルス感染症 (COVID-19) に関する最新情報を提供するために、北九州市が開設したものです。'
    }`

    return {
      title: this.title,
      meta: [
        {
          hid: 'og:url',
          property: 'og:url',
          content: url + this.$route.path + '/'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content:
            this.title +
            ' | ' +
            '北九州市' +
            ' ' +
            '新型コロナウイルス感染症' +
            '情報サイト'
        },
        {
          hid: 'description',
          name: 'description',
          content: description
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: ogpImage
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: ogpImage
        }
      ]
    }
  }
}
</script>
