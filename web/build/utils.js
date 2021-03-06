'use strict'
const fs = require('fs')
const path = require('path')
const paths = require('./paths')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
const HtmlWebpackPlugin = require('html-webpack-plugin')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
function getAppNames () {
  let apps
  if (!getAppNames._cache) {
    apps = fs.readdirSync(paths.APPS) || []
    getAppNames._cache = apps
  } else {
    apps = getAppNames._cache
  }
  return apps
}

exports.getAppNames = getAppNames

exports.getEntries = () => {
  const apps = getAppNames()
  const entries = {}
  apps.forEach(appName => {
    const appEntryFilePath = path.resolve(paths.APPS, `${appName}/main.js`)
    entries[appName] = appEntryFilePath
  })
  console.log('entries', entries)
  return entries
}

exports.getHtmlWebpackPluginInstances = () => {
  return getAppNames().map(appName => {
    return new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'production'
        ? path.resolve(__dirname, `../dist/${appName}.html`)
        : `${appName}.html`,
      template: path.resolve(paths.APPS, `${appName}/index.html`),
      chunks: ['manifest', 'vendor', appName],
      inject: true,
      minify: {
        removeComments: true,
        // collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
      favicon: path.resolve(__dirname, '../static/julianzeng-blog.ico')
    })
  })
}

exports.generateHistoryFallbackRules = () => {
  return getAppNames().map(appName => {
    return {
      from: new RegExp(`^/blog/${appName}`),
      to: path.posix.join(config.dev.assetsPublicPath, `${appName}.html`)
    }
  })
}
