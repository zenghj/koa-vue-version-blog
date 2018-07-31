import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/default.css'
marked.setOptions({
  sanitize: true,
  highlight (code) {
    return hljs.highlightAuto(code).value
  }
})

export default marked
