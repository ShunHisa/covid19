export type SurfaceStyle = {
  strokeColor: string
  fillColor: string
}

const surfaceStyleA: SurfaceStyle = {
  strokeColor: '#24448c',
  fillColor: '#00215d'
}

const surfaceStyleB: SurfaceStyle = {
  strokeColor: '#24448c',
  fillColor: '#0071bc'
}

const surfaceStyleC: SurfaceStyle = {
  strokeColor: '#24448c',
  fillColor: '#8fd0ff'
}

export function getGraphSeriesStyle(seriesLength: number) {
  switch (seriesLength) {
    case 1:
      return [surfaceStyleB]
    case 2:
      return [surfaceStyleA, surfaceStyleC]
    default:
      return [surfaceStyleA, surfaceStyleB, surfaceStyleC]
  }
}
