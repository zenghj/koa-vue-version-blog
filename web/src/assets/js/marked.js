// import marked from 'marked'
// import hljs from 'highlight.js'
// import 'highlight.js/styles/default.css'

// var renderer = new marked.Renderer()

// // Override function
// renderer.heading = function (text, level) {
//   var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

//   return `
//           <h${level}>
//             <a name="${escapedText}" class="anchor" href="#${escapedText}">
//               <span class="header-link"></span>
//             </a>
//             ${text}
//           </h${level}>`
// }

// marked.setOptions({
//   sanitize: true,
//   // smartLists: true,
//   highlight (code) {
//     return hljs.highlightAuto(code).value
//   },
//   // renderer: renderer
// })

// let markedCache
function asyncMarked (str) {
  return Promise.all([
    import(/* webpackChunkName: "marked" */ 'marked'),
    import(/* webpackChunkName: "highlightjs" */ 'highlight.js'),
    import(/* webpackChunkName:"highlightjsCSS" */ 'highlight.js/styles/default.css')
  ]).then(([marked, hljs]) => {
    marked.setOptions({
      sanitize: true,
      highlight (code) {
        return hljs.highlightAuto(code).value
      },
    })
    return marked(str)
  })
}

export default asyncMarked
