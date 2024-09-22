<template>
  <div class="custom-code">
    <pre class="bg">
      <code :class="'language'+language" v-html="highlightedCode"></code>
    </pre>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import hljs from 'highlight.js' //代码高亮插件
import 'highlight.js/styles/github.css'

interface IProps {
  language: string
  code: string
}
const props = defineProps<IProps>()

const highlightedCode = ref<any>('')

watchEffect(() => {
  highlightedCode.value = hljs.highlight(props.code, {
    language: props.language
  }).value
})
</script>

<style scoped>
.bg {
  padding: 10px;
  text-align: left;
  background: #f0f0f0;
}
</style>
