// 1) El regex con todos los grupos nombrados
const tokenRegex = new RegExp(
  [
    // comentarios de bloque y de línea
    '(?<comment>\\/\\*[\\s\\S]*?\\*\\/|\\/\\/.*?$)',
    // prolog, doctype, cdata
    '(?<prolog><\\?[\\s\\S]*?\\?>)',
    '(?<doctype><!DOCTYPE[\\s\\S]*?>)',
    '(?<cdata><!\\[CDATA\\[[\\s\\S]*?\\]\\]>)',
    // regex literal
    '(?<regex>\\/[\\w\\s[^\\\\\\/]]*(?:\\\\.[\\w\\s[^\\\\\\/]]*)*\\/[gimy]*)',
    // strings con backticks / comillas
    '(?<string>`[^`]*`|\'[^\'\\n]*\'|"[^"\\n]*")',
    // números (enteros y decimales)
    '(?<number>\\b\\d+\\.?\\d*\\b)',
    // at-rule (CSS, Sass…)
    '(?<atrule>@[\\w-]+)',
    // keywords JS+TS
    '(?<keyword>\\b(?:const|let|var|function|class|extends|if|else|for|while|return|import|from|export|default|new|in|of|instanceof|typeof|void|delete|switch|case|break|continue|this|super)\\b)',
    // booleanos y null/undefined
    '(?<boolean>\\b(?:true|false|null|undefined|NaN|Infinity)\\b)',
    // constantes (MAYÚSCULAS), símbolos (:symbol)
    '(?<constant>\\b[A-Z][A-Z0-9_]*\\b)',
    '(?<symbol>\\:[a-zA-Z_-][\\w-]*)',
    // selectores CSS (.clase, #id)
    '(?<selector>[\\.#][a-zA-Z_-][\\w-]*)',
    // nombres de propiedad CSS antes de “:”
    '(?<property>\\b[a-zA-Z_-][\\w-]*)(?=\\s*:\\s*)',
    // nombres de etiqueta HTML
    '(?<tag></?[A-Za-z][w:-]*(?:s+[A-Za-z:-]+(?:=(?:"[^"]*"|\'[^\']*\'))?)*s*/?>)',
    // atributos HTML antes de =
    '(?<attr_name>[a-zA-Z:-]+)(?=\\=)',
    // valor de atributo entre comillas
    '(?<attr_value>(?<==)"[^"]*"|\'[^\']*\')',
    // operadores
    '(?<operator>[+\\-*/%=&|^!~<>?:]+)',
    // puntuación y paréntesis
    '(?<punctuation>[{}[\\]();.,])',
    // entidades HTML &amp;, &lt;, …
    '(?<entity>&[a-zA-Z]+;)',
    // !important
    '(?<important>!important\\b)',
    // deleted (ej. palabra reservada delete)
    '(?<deleted>\\bdelete\\b)'
  ].join('|'),
  'gm'
)

// 2) El mapeo token → clase Tailwind (definidas en tailwind.config.js)
const tokenClasses = {
  comment: 'text-[#5c6370]', // comment, prolog, doctype, cdata
  prolog: 'text-[#5c6370]',
  doctype: 'text-[#5c6370]',
  cdata: 'text-[#5c6370]',

  regex: 'text-[#e5c07b]', // amarillo
  string: 'text-[#e06c75]', // rojo
  number: 'text-[#d19a66]', // naranja

  atrule: 'text-[#c678dd]', // morado
  keyword: 'text-[#c678dd]',
  boolean: 'text-[#c678dd]',

  constant: 'text-[#56b6c2]', // cian
  symbol: 'text-[#56b6c2]',

  selector: 'text-[#98c379]', // verde
  attr_name: 'text-[#98c379]',

  property: 'text-[#61afef]', // azul
  tag: 'text-[#61afef]',
  operator: 'text-[#61afef]',
  entity: 'text-[#61afef]',

  attr_value: 'text-[#c678dd]', // morado

  punctuation: 'text-[#abb2bf]/[0.7]', // base con 70% de opacidad

  important: 'font-bold', // negrita
  deleted: 'text-[#e06c75]' // mismo rojo de strings
}

// 3) Función de highlight
export function highlightOneDark(code) {
  return code.replace(tokenRegex, (match, ...args) => {
    // el último argumento es el objeto groups
    const groups = args[args.length - 1]
    const type = Object.keys(groups).find((t) => groups[t] !== undefined)
    const cls = tokenClasses[type]
    return cls ? `<span class="${cls}">${match}</span>` : match
  })
}
