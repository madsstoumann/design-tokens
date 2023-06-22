const traverse = (node, func) => {
  func(node)
  node = node.firstChild
  while (node) {
    traverse(node, func)
    node = node.nextSibling
  }
}

const htmlToJson = (elm, exclude = []) => {
  if (exclude.includes(elm.tagName.toLowerCase())) return
  const tag = { tag: elm.tagName.toLowerCase() };
  if (elm.children.length) tag.children = [];
  [...elm.children].forEach(child => {
    if (exclude.includes(child.tagName.toLowerCase())) return
    tag.children.push(htmlToJson(child))
  });
  [...elm.attributes].forEach(attr => {
    tag[attr.name] = attr.value
  })
  return tag
}

const createTokens = (elm, properties = [], exclude = []) => {
  if (!elm ) return
  const tokens = {}
  properties.forEach(prop => tokens[prop.key] = new Map())

  traverse(elm, (node) => {
    if (node.nodeType === 1 && !exclude.includes(node.tagName.toLowerCase())) {
      const data = new Set();
      const styles = window.getComputedStyle(node)

      properties.forEach(prop => {
        const value = styles[prop.key]
        if (!value) return
        if (!tokens[prop.key].has(value)) {
          tokens[prop.key].set(value, `${prop.prefix}-${tokens[prop.key].size + 1}`);
        }
        data.add(tokens[prop.key].get(value))
      })
      node.dataset.tokens = [...data].join(' ')
    }
  })
  return tokens
}

const renderTokens = (tokens) => {
  Object.keys(tokens).forEach(key => {
    const token = tokens[key]
    console.groupCollapsed(`%c${key}`, 'background:#3f51b5;color:#fff;padding:.5ch 1ch;')
    token.forEach((value, Key) => console.log(`.${value} { ${key}: ${Key}; }`))
    console.groupEnd()
  })
}

/* Example */
console.clear()
const exclude = ['head', 'html', 'link', 'meta', 'script', 'style',  'title']
const properties = [
  { key: 'background-color', prefix: 'bgc', ignore: ['transparent'] },
  { key: 'background-image', prefix: 'bgi' },
  { key: 'border-radius', prefix: 'bdrs' },
  { key: 'box-shadow', prefix: 'bxsh' },
  { key: 'color', prefix: 'c' },
  { key: 'display', prefix: 'd' },
  { key: 'font-family', prefix: 'ff' },
  { key: 'font-size', prefix: 'fs' },
  { key: 'padding-block-start', prefix: 'pbs' },
  { key: 'padding-block-end', prefix: 'pbe' },
  { key: 'padding-inline-start', prefix: 'pis' },
  { key: 'padding-inline-end', prefix: 'pie' },
]

console.group('%cCSS Tokens', 'background:#000;color:#fff;padding:1ch 2ch;')
console.log(createTokens(document.body, properties, exclude))
console.groupEnd()

console.log(renderTokens(createTokens(document.body, properties, exclude)))
//console.log(htmlToJson(document.body, exclude))