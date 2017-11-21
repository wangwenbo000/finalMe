<template>
<div>
  <div class="chart">

  </div>
  <div class="line">

  </div>
</div>

</template>
<script>
import Chart from 'frappe-charts/dist/frappe-charts.min.esm'
require('frappe-charts/dist/frappe-charts.min.css')
export default {
  mounted () {
    let heatmapData = {}
    // let currentDate = new Date()
    // let timestamp = currentDate.getTime() / 1000
    // timestamp = Math.floor(timestamp - (timestamp % 86400)).toFixed(1) // convert to midnight
    // for (var i = 0; i < 375; i++) {
    //   heatmapData[parseInt(timestamp)] = Math.floor(Math.random() * 6)
    //   timestamp = Math.floor(timestamp - 86400).toFixed(1)
    // }
    console.log(heatmapData)
    let heatmap = new Chart({
      parent: '.chart',
      data: heatmapData,  // object with date/timestamp-value pairs
      type: 'heatmap',
      height: 115,
      discrete_domains: 0  // default 0
    })
    console.log(heatmap)
    let heatmap2 = new Chart({
      parent: '.line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr',
          'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
        ],
        datasets: [
          {
            title: '测试数据',
            color: 'black',
            values: [25, 40, 30, 35, 8, 52, 17, -4, 20, 33, 80, 20]
          }
        ]
      },  // object with date/timestamp-value pairs
      type: 'line',
      height: 115
    })
    console.log(heatmap2)
  }
}
</script>
<style lang="scss">
  .chart{
    width: 660px;
    margin: 0 auto;
    float: left;
  }
  .line{
    width: 518px;
    float: right;
    .chart-container{
      .title,.sub-title,.uppercase{
        display: none;
      }
      .frappe-chart, .graphics{
        margin-top: 2px;
        padding: 0;
      }
    }
  }
</style>


