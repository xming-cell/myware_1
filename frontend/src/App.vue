<script setup lang="ts">
import { onMounted, ref } from 'vue'

const status = ref('loading...')

// 浏览器里走同源（开发环境由 vite proxy 转发 /api），测试环境用 jsdom 的 origin 兜底，
// 保证 fetch 拿到的是绝对地址（相对地址在 jsdom/undici 下会抛 ERR_INVALID_URL）。
const apiBase = import.meta.env.VITE_API_BASE || window.location.origin

onMounted(async () => {
  const res = await fetch(new URL('/api/health', apiBase).toString())
  const data = (await res.json()) as { status: string }
  status.value = data.status
})
</script>

<template>
  <p>backend: {{ status }}</p>
</template>