import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "个人博客",
  description: "一个使用VitePress构建的个人博客",
  head: [
    ['link', { rel: 'icon', href: '/images/logo.jpg' }]
  ],
  themeConfig: {
    logo: '/images/logo.jpg',
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '个人描述', link: '/personal-description' }
    ],
    outlineTitle: '本页目录',
    sidebarMenuLabel: '目录',
    sidebar: [
      {
        text: '个人描述',
        items: [
          { text: '数据结构实现', link: '/data-structures' },
          { text: '学习经历', link: '/learning-experience' },
          { text: '联系作者', link: '/personal-description' },
          { text: '无聊的奖项', link: '/bored-awards' }
        ],
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/coderwujx/Blong' }
    ]
  }
})
