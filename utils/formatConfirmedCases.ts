type DataType = {
  attr: '検査実施人数'
  value: number
  children: [
    {
      attr: '陽性患者数'
      value: number
      children: [
        {
          attr: '入院中'
          value: number
          children: [
            {
              attr: '無症状'
              value: number
            },
            {
              attr: '軽症・中等症'
              value: number
            },
            {
              attr: '重症'
              value: number
            },
            {
              attr: '確認中'
              value: number
            }
          ]
        },
        {
          attr: '自宅療養'
          value: number
        },
        {
          attr: '入院・療養等調整中'
          value: number
        },
        {
          attr: '死亡'
          value: number
        },
        {
          attr: '退院等 (療養期間経過を含む)'
          value: number
        }
      ]
    }
  ]
}

type ConfirmedCasesType = {
  検査実施人数: number
  陽性者数: number
  入院中: number
  無症状: number
  軽症中等症: number
  重症: number
  確認中: number
  自宅療養: number
  調整中: number
  死亡: number
  退院: number
}

/**
 * Format for *Chart component
 *
 * @param data - Raw data
 */
export default (data: DataType) => {
  const formattedData: ConfirmedCasesType = {
    検査実施人数: data.value,
    陽性者数: data.children[0].value,
    入院中: data.children[0].children[0].value,
    無症状: data.children[0].children[0].children[0].value,
    軽症中等症: data.children[0].children[0].children[1].value,
    重症: data.children[0].children[0].children[2].value,
    確認中: data.children[0].children[0].children[3].value,
    自宅療養: data.children[0].children[1].value,
    調整中: data.children[0].children[2].value,
    死亡: data.children[0].children[3].value,
    退院: data.children[0].children[4].value
  }
  return formattedData
}
