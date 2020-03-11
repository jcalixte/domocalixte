module.exports = {
  pwa: {
    themeColor: '#94c1b6',
    msTileColor: '#94c1b6',
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true
    },
    manifestOptions: {
      name: 'Au 72',
      short_name: 'Au 72',
      icons: [
        {
          src: './img/icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: './img/icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ],
      start_url: './index.html',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#94c1b6'
    },
    name: 'Au 72'
  }
}
