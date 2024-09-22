<template>
  <div class="bar-echart">
    <base-echart :option="option"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import * as echarts from 'echarts'
import BaseEchart from './base-echart.vue'
import type { EChartsOption } from 'echarts'

const props = defineProps<{
  labels: string[]
  values: string[]
}>()

const option = computed<EChartsOption>(() => {
  return {
    title: {
      text: '支持鼠标滚动缩放'
    },
    grid: {
      bottom: '5%'
    },
    xAxis: {
      data: props.labels,

      axisLabel: {
        inside: true,
        color: '#fff',
        //x轴文字的配置
        show: true,
        interval: 0, //使x轴文字显示全
        formatter: function (value: any) {
          var ret = '' //拼接加\n返回的类目项
          var maxLength = 2 //每项显示文字个数
          var valLength = value.length //X轴类目项的文字个数
          var rowN = Math.ceil(valLength / maxLength) //类目项需要换行的行数
          if (rowN > 1) {
            //如果类目项的文字大于2,
            for (var i = 0; i < rowN; i++) {
              var temp = '' //每次截取的字符串
              var start = i * maxLength //开始截取的位置
              var end = start + maxLength //结束截取的位置
              //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
              temp = value.substring(start, end) + '\n'
              ret += temp //凭借最终的字符串
            }
            return ret
          } else {
            return value
          }
        }
      },
      z: 10
    },
    yAxis: {
      axisLabel: {
        color: '#999'
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        type: 'bar',
        showBackground: true,
        // 系列图形的样式(每个item的样式)
        // 可以被放到每一项中,针对每一项设置
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#fad0c4' },
            { offset: 0.5, color: '#ff9a9e' },
            { offset: 1, color: '#ff9a9e' }
          ])
        },
        // 图形的高亮: 鼠标悬浮时候的状态: hover
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#f6d365' },
              { offset: 0.7, color: '#fda085' },
              { offset: 1, color: '#fda085' }
            ])
          }
        },
        data: props.values
      }
    ]
  }
})
</script>

<style scoped></style>
