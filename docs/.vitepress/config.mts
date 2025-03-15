import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "个人博客",
  description: "一个使用VitePress构建的个人博客",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '../images/logo.jpg',
    nav: [
      { text: '首页', link: '/' },
      { text: '个人描述', link: '/personal-description' }
    ],
    outlineTitle: '本页目录', // 中文环境
    sidebar: [
      {
        text: '个人描述',
        items: [
          { text: '学习经历', link: '/learning-experience' },
          { text: '联系作者', link: '/personal-description' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/coderwujx/Blong' }
    ]
  }
})
