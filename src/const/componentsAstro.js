export const AccordionAstro = `---
interface Props {
  items: Array<Item>
  multiple?: boolean
  styleVariant?: 'default' | 'light' | 'bordered' | 'complete'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  accordionId?: string
}

interface Item {
  title: string
  subtitle?: string
  content: string
}

const {
  items,
  multiple = false,
  styleVariant = 'default',
  color = 'default',
  accordionId = \`accordion-\${Math.random().toString(36).slice(2, 11)}\`
} = Astro.props

const variants = {
  default: 'border-0 shadow-lg backdrop-blur-md',
  light: 'border-b-2',
  bordered: 'border rounded-sm',
  complete: 'border backdrop-blur-sm shadow-lg'
}

const bodyVariants = {
  default: 'backdrop-blur-md',
  light: 'bg-transparent dark:bg-transparent',
  bordered: 'border-x-[1px]',
  complete: 'backdrop-blur-sm border-x-[1px]'
}

const colors = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-neutral-100/5',
  primary: 'bg-blue-500/40 dark:shadow-blue-500/20',
  secondary: 'bg-indigo-500/40 dark:shadow-indigo-500/20',
  success: 'bg-green-400/50 dark:shadow-green-500/20',
  warning: 'bg-yellow-500/40 dark:shadow-yellow-500/20',
  danger: 'bg-red-500/40 dark:shadow-red-500/20'
}

const hoverColors = {
  default: 'hover:bg-white/50 dark:hover:bg-zinc-800',
  primary: 'hover:bg-blue-500/30 dark:hover:bg-blue-500/10',
  secondary: 'hover:bg-indigo-500/30 dark:hover:bg-indigo-500/20',
  success: 'hover:bg-green-500/60 dark:hover:bg-green-500/30',
  warning: 'hover:bg-yellow-500/60 dark:hover:bg-yellow-500/30',
  danger: 'hover:bg-red-500/30 dark:hover:bg-red-500/10'
}

const borderColors = {
  default: 'border-zinc-700/20 dark:border-neutral-100/30',
  primary: 'border-blue-800 dark:border-blue-500',
  secondary: 'border-indigo-800 dark:border-indigo-500',
  success: 'border-green-800 dark:border-green-500',
  warning: 'border-yellow-800 dark:border-yellow-500',
  danger: 'border-red-800 dark:border-red-500'
}

const variantClass = variants[styleVariant]
const bodyVariantClass = bodyVariants[styleVariant]
const colorClass =
  styleVariant !== 'light' && styleVariant !== 'bordered' ? colors[color] : ''
const borderColorClass = styleVariant !== 'default' ? borderColors[color] : ''
const hoverColorClass = hoverColors[color]

const scriptContent = \`
(() => {
  const accordion = document.getElementById('\${accordionId}');
  if (!accordion) return;
  
  const multiple = \${multiple};
  
  const toggleAccordion = (button) => {
    const contentId = button.getAttribute('aria-controls');
    const content = document.getElementById(contentId);
    const isActive = content.style.maxHeight !== '0px';
    const icon = button.querySelector('[data-accordion-icon]');

    if (!multiple) {
      const allButtons = accordion.querySelectorAll('[data-accordion-button]');
      allButtons.forEach(otherButton => {
        if (otherButton !== button) {
          const otherContent = document.getElementById(otherButton.getAttribute('aria-controls'));
          const otherIcon = otherButton.querySelector('[data-accordion-icon]');
          otherContent.style.maxHeight = '0px';
          otherIcon.classList.remove('rotate-180');
          otherButton.setAttribute('aria-expanded', 'false');
        }
      });
    }

    content.style.maxHeight = isActive ? '0px' : content.scrollHeight + 'px';
    icon.classList.toggle('rotate-180', !isActive);
    button.setAttribute('aria-expanded', String(!isActive));
  };

  accordion.querySelectorAll('[data-accordion-button]').forEach(button => {
    button.addEventListener('click', () => toggleAccordion(button));
    
    // Inicializar estado
    const content = document.getElementById(button.getAttribute('aria-controls'));
    content.style.maxHeight = button.getAttribute('aria-expanded') === 'true' 
      ? content.scrollHeight + 'px' 
      : '0px';
  });
})();
\`
---

<div
  id={accordionId}
  class='w-full'
  role='tablist'
  aria-multiselectable={multiple}
>
  {
    items.map((item, index) => (
      <div role='region' aria-labelledby={\`\${accordionId}-heading-\${index}\`}>
        <h2 id={\`\${accordionId}-heading-\${index}\`}>
          <button
            type='button'
            class={\`flex items-center justify-between w-full py-2 px-3 font-medium gap-3 transition duration-300 text-zinc-800 dark:text-neutral-100 \${variantClass} \${colorClass} \${borderColorClass} \${hoverColorClass}\`}
            aria-expanded='false'
            aria-controls={\`\${accordionId}-body-\${index}\`}
            data-accordion-button
          >
            <div class='w-full max-w-full'>
              <span class='flex justify-start items-center max-w-full'>
                {item.title}
              </span>
              {item.subtitle && (
                <p class='text-left text-sm font-light text-zinc-700 dark:text-neutral-200'>
                  {item.subtitle}
                </p>
              )}
            </div>
            <svg
              data-accordion-icon
              class='w-3 h-3 shrink-0 transition duration-300 ease-in'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 10 6'
            >
              <path
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M9 5 5 1 1 5'
              />
            </svg>
          </button>
        </h2>
        <div
          id={\`\${accordionId}-body-\${index}\`}
          class={\`overflow-hidden transition-all duration-300 ease-in-out \${bodyVariantClass} \${colorClass} \${borderColorClass}\`}
          style='max-height: 0px'
        >
          <div class='p-5'>
            <p class='mb-2 text-zinc-700/70 dark:text-neutral-100/70'>
              {item.content}
            </p>
          </div>
        </div>
      </div>
    ))
  }
</div>

<script is:inline set:html={scriptContent} />
`

export const BreadcrumbItemAstro = `---
const {
  label,
  href,
  icon,
  sizeClass = '',
  roundedClass = '',
  colorClass = '',
  instanceId
} = Astro.props

const Tag = href ? 'a' : 'button'
const classes = [
  'inline-flex items-center gap-1 cursor-pointer',
  sizeClass,
  roundedClass,
  colorClass,
  'transition duration-300 hover:text-opacity-50 dark:hover:text-opacity-50'
].join(' ')
---

<Tag
  {...href && { href }}
  class={classes}
  aria-current='false'
  data-breadcrumb={instanceId}
>
  {
    icon && (
      <span class='inline-block' aria-hidden='true'>
        {icon}
      </span>
    )
  }
  {label}
</Tag>
`

export const BreadcrumbSeparatorAstro = `---
const { separator, colorClass } = Astro.props
---

<span
  class={\`mx-1 \${colorClass}\`}
  role='separator'
  aria-label='breadcrumb separator'
>
  {separator}
</span>
`

export const BreadcrumbsAstro = `---
import BreadcrumbItem from './BreadcrumbItem.astro'
import BreadcrumbSeparator from './BreadcrumbSeparator.astro'

interface BreadcrumbsProps {
  items: Array<BreadcrumbItemProps>
  variant?: 'default' | 'bordered' | 'light'
  size?: 'sm' | 'md' | 'lg'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  separator?: string
  collapsible?: boolean
  instanceId?: string
}

interface BreadcrumbItemProps {
  label: string
  href?: string
  icon?: string
}
const {
  items = [],
  variant = 'default',
  size = 'md',
  color = 'default',
  rounded = 'md',
  separator = '/',
  collapsible = false,
  instanceId = Math.random().toString(36).substring(2, 9)
} = Astro.props as BreadcrumbsProps

const variants = {
  default: 'border-0 shadow-lg backdrop-blur-sm',
  bordered: 'border shadow-lg bg-transparent',
  light: 'border-0 bg-transparent'
}

const sizes = {
  sm: 'text-xs px-2 py-1',
  md: 'text-sm px-3 py-1.5',
  lg: 'text-base px-4 py-2'
}

const roundeds = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}

const colors = {
  default: 'bg-neutral-200/30 dark:bg-zinc-700/30 dark:shadow-zinc-700/20',
  primary: 'bg-blue-500/20 dark:shadow-blue-500/20',
  secondary: 'bg-indigo-500/20 dark:shadow-indigo-500/20',
  success: 'bg-green-500/20 dark:shadow-green-500/20',
  warning: 'bg-yellow-500/10 dark:bg-yellow-500/20 dark:shadow-yellow-500/20',
  danger: 'bg-red-500/20 dark:shadow-red-500/20'
}

const textColors = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
}

const borderColors = {
  default: 'border-neutral-100/40 dark:border-zinc-700/60',
  primary: 'border-blue-500',
  secondary: 'border-indigo-500',
  success: 'border-green-500',
  warning: 'border-yellow-500',
  danger: 'border-red-500'
}

const sizeClass = sizes[size]
const roundedClass = roundeds[rounded]
const colorClass = colors[color]
const variantClass = variants[variant]
const textcolorClass = textColors[color]
const borderClass = borderColors[color]

const containerClasses = [
  'flex mx-auto items-center gap-2 px-2',
  variantClass,
  roundedClass,
  variant === 'bordered' ? borderClass : colorClass
].join(' ')

const initialSelected = items[0]?.label
---

<nav
  class='flex flex-row mx-auto p-2'
  aria-label='Breadcrumb'
  data-breadcrumb-instance={instanceId}
>
  <ul class={containerClasses} role='list'>
    {
      collapsible && items.length > 2 ? (
        <>
          <BreadcrumbItem
            {...items[0]}
            selected={items[0].label === initialSelected}
            {sizeClass}
            {roundedClass}
            colorClass={textcolorClass}
            instanceId={instanceId}
          />
          <span class={\`mx-2 \${textcolorClass}\`}>...</span>
          <BreadcrumbItem
            {...items[items.length - 1]}
            selected={items[items.length - 1].label === initialSelected}
            {sizeClass}
            {roundedClass}
            colorClass={textcolorClass}
            instanceId={instanceId}
          />
        </>
      ) : (
        items.map((item, index) => (
          <li class='flex items-center'>
            <BreadcrumbItem
              {...item}
              selected={item.label === initialSelected}
              {sizeClass}
              {roundedClass}
              colorClass={textcolorClass}
              instanceId={instanceId}
            />
            {index !== items.length - 1 && (
              <BreadcrumbSeparator {separator} colorClass={textcolorClass} />
            )}
          </li>
        ))
      )
    }
  </ul>
</nav>

<script is:inline>
  document
    .querySelectorAll('[data-breadcrumb-instance]')
    .forEach((container) => {
      const instanceId = container.dataset.breadcrumbInstance

      container.addEventListener('click', (e) => {
        const item = e.target.closest(\`[data-breadcrumb="\${instanceId}"]\`)
        if (!item) return

        container.querySelectorAll('[data-breadcrumb]').forEach((el) => {
          el.classList.remove('font-bold')
          el.setAttribute('aria-current', 'false')
        })

        item.classList.add('font-bold')
        item.setAttribute('aria-current', 'page')
      })
    })
</script>
`

export const CardAstro = `---
interface CardProps {
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  imgBackground?: string
  isLink?: boolean
  href?: string
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  border?: boolean
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  maxWidth?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | 'xxl'
    | 'xxxl'
    | 'ivxl'
    | 'vxl'
    | 'vixl'
  padding?:
    | 'none'
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | 'xxl'
    | 'xxxl'
    | 'ivxl'
    | 'vxl'
    | 'vixl'
  height?: 'auto' | 'screen' | 'fit' | 'full' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  ariaLabel?: string
}
const {
  color = 'default',
  imgBackground,
  isLink = false,
  href,
  rounded = 'md',
  border = false,
  shadow = 'md',
  maxWidth = 'sm',
  padding = 'none',
  height = 'auto',
  className = '',
  ariaLabel = ''
} = Astro.props as CardProps

const colors = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/30',
  warning: 'bg-yellow-500/20',
  danger: 'bg-red-500/20'
}

const hoverColors = {
  default: 'hover:bg-neutral-100/50 dark:hover:bg-zinc-700/10',
  primary: 'hover:bg-blue-500/30 dark:hover:bg-blue-500/10',
  secondary: 'hover:bg-indigo-500/30 dark:hover:bg-indigo-500/20',
  success: 'hover:bg-green-500/60 dark:hover:bg-green-500/30',
  warning: 'hover:bg-yellow-500/60 dark:hover:bg-yellow-500/30',
  danger: 'hover:bg-red-500/30 dark:hover:bg-red-500/10'
}

const shadowSizes = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  xxl: 'shadow-2xl'
}

const borderColors = {
  default: 'border-neutral-100/40 dark:border-zinc-700/60',
  primary: 'border-blue-500',
  secondary: 'border-indigo-500',
  success: 'border-green-500',
  warning: 'border-yellow-500',
  danger: 'border-red-500'
}

const roundeds = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}

const maxWidths = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  xxl: 'max-w-2xl',
  xxxl: 'max-w-3xl',
  ivxl: 'max-w-4xl',
  vxl: 'max-w-5xl',
  vixl: 'max-w-6xl'
}

const paddings = {
  none: 'p-0',
  xs: 'p-1',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
  xxl: 'p-12',
  xxxl: 'p-16',
  ivxl: 'p-20',
  vxl: 'p-24',
  vixl: 'p-28'
}

const heights = {
  auto: 'h-auto',
  screen: 'h-screen',
  fit: 'h-fit',
  full: 'h-full',
  sm: 'h-20',
  md: 'h-60',
  lg: 'h-80',
  xl: 'h-96'
}

const Component = isLink ? 'a' : 'div'
const classes = [
  'w-full overflow-hidden backdrop-blur-sm',
  heights[height],
  paddings[padding],
  isLink ? hoverColors[color] : '',
  shadowSizes[shadow],
  roundeds[rounded],
  border ? \`border \${borderColors[color]}\` : '',
  maxWidths[maxWidth],
  !imgBackground && colors[color],
  className
]
  .filter(Boolean)
  .join(' ')
---

<Component
  href={isLink ? href : undefined}
  role={isLink ? 'link' : 'region'}
  aria-label={ariaLabel || (isLink ? 'Link card' : 'Card')}
  tabindex={isLink ? 0 : undefined}
  class={classes}
  style={imgBackground
    ? \`
    background-image: url('\${imgBackground}');
    background-size: cover;
    background-position: center;
  \`
    : null}
>
  <slot />
</Component>
`

export const CardContentAstro = `---
interface CardContentProps {
  textColor?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
  font?: 'bold' | 'semibold' | 'medium' | 'normal' | 'light' | 'extrabold'
  textSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  textAlign?: 'left' | 'center' | 'right'
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  role?: string | null | undefined
  ariaLabel?: string
}

const {
  textColor = 'default',
  font,
  textSize = 'sm',
  textAlign = 'left',
  padding = 'md',
  className = '',
  role = null,
  ariaLabel = ''
} = Astro.props as CardContentProps

const textColors = {
  default: 'text-zinc-700/80 dark:text-neutral-100/70',
  primary: 'text-blue-500/80',
  secondary: 'text-indigo-500/80',
  success: 'text-green-500/80',
  warning: 'text-yellow-500/80',
  danger: 'text-red-500/80'
}

const fonts = {
  bold: 'font-bold',
  semibold: 'font-semibold',
  medium: 'font-medium',
  normal: 'font-normal',
  light: 'font-light',
  extrabold: 'font-extrabold'
}

const textSizes = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  xxl: 'text-2xl'
}

const textAligns = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right'
}

const paddings = {
  none: 'p-0',
  xs: 'p-1',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8'
}

const classes = [
  textColors[textColor],
  font && fonts[font],
  textSizes[textSize],
  textAligns[textAlign],
  paddings[padding],
  className
]
  .filter(Boolean)
  .join(' ')
---

<div aria-label={ariaLabel} class={classes}>
  <slot />
</div>
`

export const CardHeaderAstro = `---
interface CardHeaderProps {
  textColor?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
  textHoverColor?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
  font?: 'bold' | 'semibold' | 'medium' | 'normal' | 'light' | 'extrabold'
  textSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  textAlign?: 'left' | 'center' | 'right'
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  isLink?: boolean
  href?: string
  className?: string
  ariaLabel?: string
  role?: string
}
const {
  textColor = 'default',
  textHoverColor,
  font = 'bold',
  textSize = 'lg',
  textAlign = 'left',
  padding = 'md',
  isLink = false,
  href = '#',
  className = '',
  ariaLabel = '',
  role = ''
} = Astro.props as CardHeaderProps

const textColors = {
  default: 'text-zinc-700 dark:text-neutral-100/80',
  primary: 'text-blue-500',
  secondary: 'text-indigo-500',
  success: 'text-green-500',
  warning: 'text-yellow-500',
  danger: 'text-red-500'
}

const textHoverColors = {
  default: 'hover:text-zinc-900 dark:hover:text-neutral-100',
  primary: 'hover:text-blue-600 dark:hover:text-blue-500',
  secondary: 'hover:text-indigo-600 dark:hover:text-indigo-500',
  success: 'hover:text-green-600 dark:hover:text-green-500',
  warning: 'hover:text-yellow-600 dark:hover:text-yellow-500',
  danger: 'hover:text-red-600 dark:hover:text-red-500'
}

const fonts = {
  bold: 'font-bold',
  semibold: 'font-semibold',
  medium: 'font-medium',
  normal: 'font-normal',
  light: 'font-light',
  extrabold: 'font-extrabold'
}

const textSizes = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  xxl: 'text-2xl'
}

const textAligns = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right'
}

const paddings = {
  none: 'p-0',
  xs: 'p-1',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8'
}

const Component = isLink ? 'a' : 'div'
const classes = [
  textColors[textColor],
  textHoverColor && textHoverColors[textHoverColor],
  fonts[font],
  textSizes[textSize],
  textAligns[textAlign],
  paddings[padding],
  className
]
  .filter(Boolean)
  .join(' ')
---

<Component
  href={isLink ? href : undefined}
  aria-label={ariaLabel}
  class={classes}
>
  <slot />
</Component>
`

export const DrawerAstro = `---
export interface Props {
  isDismissable?: boolean
  position?: 'right' | 'left' | 'top' | 'bottom'
  effect?: 'opaque' | 'blur' | 'transparent'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  labelledBy?: string
  describedBy?: string
  id?: string
}

const {
  isDismissable = true,
  position = 'right',
  effect = 'opaque',
  size = 'md',
  color = 'default',
  labelledBy,
  describedBy,
  id = \`drawer-\${Math.random().toString(36).slice(2, 9)}\`
} = Astro.props

const colorClasses = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/20',
  warning: 'bg-yellow-500/20 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
}

const textColorClasses = {
  default: \`\${effect === 'opaque' ? 'text-gray-200' : 'text-gray-800'} dark:text-gray-300\`,
  primary: 'text-blue-400 dark:text-blue-500',
  secondary: 'text-indigo-400 dark:text-indigo-500',
  success: 'text-green-400 dark:text-green-500',
  warning: 'text-yellow-400 dark:text-yellow-500',
  danger: 'text-red-400 dark:text-red-500'
}

const backdropEffects = {
  opaque: 'bg-black/50',
  blur: 'backdrop-blur-sm',
  transparent: 'bg-transparent'
}

const sizeClasses = {
  w: {
    sm: 'w-1/4',
    md: 'w-1/3',
    lg: 'w-1/2',
    xl: 'w-3/4',
    full: 'w-full'
  },
  h: {
    sm: 'h-1/4',
    md: 'h-1/3',
    lg: 'h-1/2',
    xl: 'h-3/4',
    full: 'h-full'
  }
}

const positionClasses = {
  top: 'top-0 left-0 right-0 w-full',
  bottom: 'bottom-0 left-0 right-0 w-full',
  left: 'left-0 top-0 bottom-0 h-full',
  right: 'right-0 top-0 bottom-0 h-full'
}
---

<div
  id={id}
  class='drawer fixed inset-0 z-50 hidden'
  role='dialog'
  aria-modal='true'
  aria-labelledby={labelledBy}
  aria-describedby={describedBy}
  data-dismissable={isDismissable}
>
  <div
    class={\`drawer-backdrop fixed inset-0 \${backdropEffects[effect]}\`}
    aria-hidden='true'
  >
  </div>
  <div
    class={\`border-0 shadow-lg backdrop-blur-sm \${positionClasses[position]} \${
      ['top', 'bottom'].includes(position)
        ? sizeClasses.h[size]
        : sizeClasses.w[size]
    } \${colorClasses[color]} fixed \${textColorClasses[color]}\`}
  >
    <div class='flex flex-col h-full'>
      <slot />
    </div>
  </div>
</div>

<script is:inline define:vars={{ id }}>
  document.addEventListener('DOMContentLoaded', () => {
    const drawerId = id
    const drawer = document.getElementById(drawerId)
    if (!drawer) return

    window.drawerInstances = window.drawerInstances || {}
    let lastFocusedElement = null
    const isDismissable = drawer.dataset.dismissable === 'true'

    const handleEscape = (e) => {
      if (e.key === 'Escape' && !drawer.classList.contains('hidden')) {
        window.drawerInstances[drawerId].close()
      }
    }

    const handleClickOutside = (e) => {
      if (!isDismissable || drawer.classList.contains('hidden')) return

      const isBackdrop = e.target === drawer.firstElementChild
      const isOutside = !drawer.contains(e.target)

      if (isBackdrop || isOutside) {
        window.drawerInstances[drawerId].close()
      }
    }

    const toggleDrawer = (open) => {
      if (open) {
        lastFocusedElement = document.activeElement
        drawer.classList.remove('hidden')
        document.body.style.overflow = 'hidden'
        drawer.focus()

        if (isDismissable) {
          document.addEventListener('keydown', handleEscape)
          document.addEventListener('click', handleClickOutside)
        }
      } else {
        document.body.style.overflow = 'auto'
        drawer.classList.add('hidden')
        lastFocusedElement?.focus()

        document.removeEventListener('keydown', handleEscape)
        document.removeEventListener('click', handleClickOutside)
      }
    }

    window.drawerInstances[drawerId] = {
      open: () => toggleDrawer(true),
      close: () => toggleDrawer(false)
    }

    drawer.addEventListener('astro:unmount', () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('click', handleClickOutside)
      delete window.drawerInstances[drawerId]
    })
  })
</script>
`

export const DrawerBodyAstro = `<div
  class='flex-1 overflow-y-auto p-2'
  role='region'
  aria-label='Drawer Content'
>
  <slot />
</div>
`

export const DrawerContentAstro = `<div
  class='flex-1 flex flex-col overflow-hidden'
  role='region'
  aria-label='Drawer Content'
>
  <slot />
</div>
`

export const DrawerFooterAstro = `<div class='flex-shrink-0 p-2' role='contentinfo' aria-label='Drawer Footer'>
  <slot />
</div>
`

export const DrawerHeaderAstro = `---
export interface Props {
  closeButton?: boolean
  drawerId: string
}

const { closeButton = true, drawerId } = Astro.props
---

<div class='flex-shrink-0 flex items-center justify-between p-2' role='banner'>
  <div><slot /></div>
  {
    closeButton && (
      <button
        data-drawer-close
        onclick={\`window.drawerInstances?.['\${drawerId}']?.close()\`}
        class='p-2 transition duration-300 ease-in-out hover:text-red-700'
        aria-label='Close Drawer'
        title='Close Drawer'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='currentColor'
          class='icon icon-tabler icons-tabler-filled icon-tabler-square-rounded-x'
          role='img'
          aria-hidden='true'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path
            d='M12 2l.324 .001l.318 .004l.616 .017l.299 .013l.579 .034l.553 .046c4.785 .464 6.732 2.411 7.196 7.196l.046 .553l.034 .579c.005 .098 .01 .198 .013 .299l.017 .616l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.464 4.785 -2.411 6.732 -7.196 7.196l-.553 .046l-.579 .034c-.098 .005 -.198 .01 -.299 .013l-.616 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785 -.464 -6.732 -2.411 -7.196 -7.196l-.046 -.553l-.034 -.579a28.058 28.058 0 0 1 -.013 -.299l-.017 -.616c-.003 -.21 -.005 -.424 -.005 -.642l.001 -.324l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.464 -4.785 2.411 -6.732 7.196 -7.196l.553 -.046l.579 -.034c.098 -.005 .198 -.01 .299 -.013l.616 -.017c.21 -.003 .424 -.005 .642 -.005zm-1.489 7.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z'
            fill='currentColor'
            stroke-width='0'
          />
        </svg>
      </button>
    )
  }
</div>
`

export const DropdownAstro = `---
const { class: userClass, ...props } = Astro.props

const uniqueId = \`dropdown-\${Math.random().toString(36).substring(2, 9)}\`
---

<div
  class:list={['relative inline-block', userClass]}
  data-dropdown-id={uniqueId}
  role='none'
  {...props}
>
  <slot />
</div>

<script define:vars={{ uniqueId }}>
  document.addEventListener('astro:page-load', () => {
    const dropdownContainer = document.querySelector(
      \`[data-dropdown-id="\${uniqueId}"]\`
    )
    if (!dropdownContainer) {
      console.error(\`Dropdown container with ID \${uniqueId} not found.\`)
      return
    }

    const trigger = dropdownContainer.querySelector('[data-dropdown-trigger]')
    const menu = dropdownContainer.querySelector('[data-dropdown-menu]')

    if (!trigger || !menu) {
      console.warn(
        \`Dropdown con ID \${uniqueId} necesita un [data-dropdown-trigger] y un [data-dropdown-menu].\`
      )
      return
    }

    const setDropdownState = (isOpen) => {
      trigger.setAttribute('aria-expanded', String(isOpen))
      menu.setAttribute('aria-hidden', String(!isOpen))
      if (isOpen) {
        menu.classList.remove('hidden')
        menu.classList.add('block')
      } else {
        menu.classList.remove('block')
        menu.classList.add('hidden')
      }
    }

    setDropdownState(false)
    trigger.setAttribute('aria-haspopup', 'true')

    const toggleDropdown = (event) => {
      event.stopPropagation()
      const currentState = trigger.getAttribute('aria-expanded') === 'true'
      setDropdownState(!currentState)
    }

    trigger.addEventListener('click', toggleDropdown)

    document.addEventListener('click', (event) => {
      if (
        trigger.getAttribute('aria-expanded') === 'true' &&
        !dropdownContainer.contains(event.target)
      ) {
        setDropdownState(false)
      }
    })

    dropdownContainer.addEventListener('keydown', (event) => {
      if (
        event.key === 'Escape' &&
        trigger.getAttribute('aria-expanded') === 'true'
      ) {
        setDropdownState(false)
        trigger.focus()
      }
    })

    menu.addEventListener('click', (event) => {
      if (
        event.target.closest('button[role="menuitem"]') ||
        event.target.closest('a[role="menuitem"]')
      ) {
        if (trigger.getAttribute('aria-expanded') === 'true') {
          setTimeout(() => {
            setDropdownState(false)
            trigger.focus()
          }, 0)
        }
      }
    })
  })
</script>
`

export const DropdownItemAstro = `---
interface Props {
  title?: string
  description?: string
  selected?: boolean
  variant?: 'default' | 'bordered' | 'light'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  rounded?: 'none' | 'sm' | 'md' | 'lg'
  disabled?: boolean
  class?: string
  href?: string
}

const {
  title,
  description,
  selected = false,
  variant = 'light',
  color = 'default',
  rounded = 'md',
  disabled = false,
  class: userClass,
  href,
  ...props
} = Astro.props

const variants = {
  default: 'border-0 shadow-lg backdrop-blur-sm',
  bordered: 'border shadow-md',
  light: ''
}

const colors = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/20 ',
  secondary: 'bg-indigo-500/20 ',
  success: 'bg-green-500/20 ',
  warning: 'bg-yellow-500/20 dark:bg-yellow-500/20 ',
  danger: 'bg-red-500/20 '
}

const selectedColors = {
  default: 'bg-neutral-100/50 dark:bg-zinc-700/60 ',
  primary: 'bg-blue-500/40 dark:bg-blue-500/40',
  secondary: 'bg-indigo-500/40 dark:bg-indigo-500/40',
  success: 'bg-green-500/40 dark:bg-green-500/40',
  warning: 'bg-yellow-500/40 dark:bg-yellow-500/40',
  danger: 'bg-red-500/40 dark:bg-red-500/40'
}

const textColors = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
}

const borderColors = {
  default: 'border-gray-800 dark:border-gray-300',
  primary: 'border-blue-800 dark:border-blue-500',
  secondary: 'border-indigo-800 dark:border-indigo-500',
  success: 'border-green-800 dark:border-green-500',
  warning: 'border-yellow-800 dark:border-yellow-500',
  danger: 'border-red-800 dark:border-red-500'
}

const hoverColors = {
  default: 'hover:bg-neutral-100/30 dark:hover:bg-zinc-700/50 ',
  primary: 'hover:bg-blue-500/30 dark:hover:bg-blue-500/10',
  secondary: 'hover:bg-indigo-500/30 dark:hover:bg-indigo-500/10',
  success: 'hover:bg-green-500/30 dark:hover:bg-green-500/10',
  warning: 'hover:bg-yellow-500/30 dark:hover:bg-yellow-500/10',
  danger: 'hover:bg-red-500/30 dark:hover:bg-red-500/10'
}

const roundeds = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg'
}

const baseItemClasses = 'flex w-full px-4 py-2 text-sm text-left items-center'
const classList = [
  baseItemClasses,
  disabled ? 'opacity-50 cursor-not-allowed' : '',
  roundeds[rounded],
  variants[variant],
  textColors[color],
  variant === 'default' && !selected && !disabled && colors[color],
  variant === 'bordered' && !disabled && borderColors[color],
  !disabled && hoverColors[color],
  selected && !disabled && selectedColors[color],
  userClass
].filter(Boolean)

const Tag = href ? 'a' : 'button'
const commonProps = {
  class: classList.join(' '),
  disabled: Tag === 'button' ? disabled : undefined,
  'aria-disabled': disabled,
  'aria-pressed': Tag === 'button' ? selected : undefined,
  'aria-current': Tag === 'a' && selected ? 'page' : undefined,
  role: 'menuitem',
  ...props
}
---

<Tag {...commonProps} href={href}>
  <div class='flex flex-col flex-grow'>
    {title && <span class='text-sm font-medium'>{title}</span>}
    {description && <p class='text-xs'>{description}</p>}
  </div>
  <slot name='icon-after' />
  <slot />
</Tag>
`

export const DropdownMenuAstro = `---
interface Props {
  variant?: 'default' | 'bordered' | 'light'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  rounded?: 'none' | 'sm' | 'md' | 'lg'
  id?: string
  class?: string
}

const {
  variant = 'default',
  color = 'default',
  rounded = 'md',
  id,
  class: userClass,
  ...props
} = Astro.props

const variants = {
  default: 'border-0 shadow-lg backdrop-blur-sm saturate-100',
  bordered: 'border shadow-md',
  light: ''
}

const colors = {
  default: 'bg-neutral-100/70 dark:bg-zinc-700/70 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/70 ',
  secondary: 'bg-indigo-500/70 ',
  success: 'bg-green-500/70 ',
  warning: 'bg-yellow-500/70 dark:bg-yellow-500/70 ',
  danger: 'bg-red-500/70 '
}

const borderColors = {
  default: 'border-gray-800 dark:border-gray-300',
  primary: 'border-blue-800 dark:border-blue-500',
  secondary: 'border-indigo-800 dark:border-indigo-500',
  success: 'border-green-800 dark:border-green-500',
  warning: 'border-yellow-800 dark:border-yellow-500',
  danger: 'border-red-800 dark:border-red-500'
}

const roundeds = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg'
}

const baseClasses =
  'origin-top-right flex flex-col right-0 mt-2 w-full absolute z-99999'
const classList = [
  baseClasses,
  'hidden',
  variants[variant],
  variant === 'default' && colors[color],
  variant === 'bordered' && borderColors[color],
  roundeds[rounded],
  userClass
].filter(Boolean)
---

<div
  id={id || 'dropdown-menu'}
  data-dropdown-menu
  role='menu'
  aria-hidden='true'
  class:list={classList}
  {...props}
>
  <slot />
</div>
`

export const DropdownSectionAstro = `---
interface Props {
  heading?: string
  showDivider?: boolean
  variant?: 'default' | 'bordered' | 'light'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  font?: 'sm' | 'md' | 'lg' | 'xl'
  rounded?: 'none' | 'sm' | 'md' | 'lg'
  class?: string
}

const {
  heading,
  showDivider = false,
  variant = 'light',
  color = 'default',
  font = 'md',
  rounded = 'md',
  class: userClass,
  ...props
} = Astro.props

const variants = {
  default: 'border-0 shadow-lg backdrop-blur-sm',
  bordered: 'border shadow-md',
  light: ''
}

const colors = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/5 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/20 ',
  secondary: 'bg-indigo-500/20 ',
  success: 'bg-green-500/20 ',
  warning: 'bg-yellow-500/20 dark:bg-yellow-500/20 ',
  danger: 'bg-red-500/20 '
}

const textColors = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
}

const borderColors = {
  default: 'border-gray-800 dark:border-gray-300',
  primary: 'border-blue-800 dark:border-blue-500',
  secondary: 'border-indigo-800 dark:border-indigo-500',
  success: 'border-green-800 dark:border-green-500',
  warning: 'border-yellow-800 dark:border-yellow-500',
  danger: 'border-red-800 dark:border-red-500'
}

const fonts = {
  sm: 'font-normal',
  md: 'font-medium',
  lg: 'font-semibold',
  xl: 'font-bold'
}

const dividerColors = {
  default: 'bg-zinc-700 dark:bg-neutral-100/70',
  primary: 'bg-blue-500',
  secondary: 'bg-indigo-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger: 'bg-red-500'
}

const roundeds = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg'
}

const headingClasses = [
  'px-4 pt-2 pb-1 text-xs uppercase tracking-wider',
  variants[variant],
  fonts[font],
  variant !== 'light' && roundeds[rounded],
  textColors[color],
  variant === 'default' && colors[color],
  variant === 'bordered' && borderColors[color]
]
  .filter(Boolean)
  .join(' ')

const containerClasses = ['flex flex-col', userClass].filter(Boolean).join(' ')
const uniqueIdSection = \`section-\${Math.random().toString(36).substring(2, 9)}\`
---

<div
  class={containerClasses}
  role='group'
  aria-labelledby={heading
    ? \`dropdown-section-heading-\${uniqueIdSection}\`
    : undefined}
  {...props}
>
  {
    heading && (
      <h3
        id={heading ? \`dropdown-section-heading-\${uniqueIdSection}\` : undefined}
        class={headingClasses}
      >
        {heading}
      </h3>
    )
  }
  <div role='none'>
    <slot />
  </div>
  {
    showDivider && (
      <div class:list={['my-1 h-px', dividerColors[color]]} role='separator' />
    )
  }
</div>
`

export const DropdownTriggerAstro = `---
interface Props {
  variant?: 'default' | 'bordered' | 'light'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  size?: 'sm' | 'md' | 'lg'
  class?: string
}

const {
  variant = 'default',
  color = 'default',
  rounded = 'md',
  size = 'md',
  class: userClass,
  ...props
} = Astro.props

const variants = {
  default: 'border-0 shadow-lg backdrop-blur-sm',
  bordered: 'border shadow-md',
  light: ''
}

const colors = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/20 ',
  secondary: 'bg-indigo-500/20 ',
  success: 'bg-green-500/20 ',
  warning: 'bg-yellow-500/20 dark:bg-yellow-500/20 ',
  danger: 'bg-red-500/20 '
}

const textColors = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
}

const borderColors = {
  default: 'border-gray-800 dark:border-gray-300',
  primary: 'border-blue-800 dark:border-blue-500',
  secondary: 'border-indigo-800 dark:border-indigo-500',
  success: 'border-green-800 dark:border-green-500',
  warning: 'border-yellow-800 dark:border-yellow-500',
  danger: 'border-red-800 dark:border-red-500'
}

const hoverColors = {
  default: 'hover:bg-neutral-100/30 dark:hover:bg-zinc-700/50 ',
  primary: 'hover:bg-blue-500/30 dark:hover:bg-blue-500/10',
  secondary: 'hover:bg-indigo-500/30 dark:hover:bg-indigo-500/10',
  success: 'hover:bg-green-500/30 dark:hover:bg-green-500/10',
  warning: 'hover:bg-yellow-500/30 dark:hover:bg-yellow-500/10',
  danger: 'hover:bg-red-500/30 dark:hover:bg-red-500/10'
}

const sizes = {
  sm: 'font-light text-xs px-2 py-1.5',
  md: 'font-medium text-sm px-4 py-2',
  lg: 'font-medium text-base px-8 py-2.5'
}

const roundeds = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}

// Lógica de clases copiada de tu componente JSX
const baseClasses = 'inline-flex justify-center items-center'
const classList = [
  baseClasses,
  variants[variant],
  sizes[size],
  textColors[color],
  variant === 'bordered' && borderColors[color],
  variant === 'default' && colors[color],
  roundeds[rounded],
  hoverColors[color],
  userClass
].filter(Boolean)
---

<button
  class:list={classList}
  data-dropdown-trigger
  aria-haspopup='menu'
  aria-expanded='false'
  role='button'
  type='button'
  {...props}
>
  <slot />
</button>
`

export const InputAstro = `---
interface InputProps {
  label: string
  placeholder: string
  type?: 'text' | 'email' | 'number' | 'password' | 'tel'
  isRequired?: boolean
  isClearable?: boolean
  isInvalid?: boolean
  errorMessage?: string
  description?: string
  value?: string
  onValueChange?: (value: string) => void
  minLength?: number
  maxLength?: number
  pattern?: string
  isReadOnly?: boolean
  isDisabled?: boolean
  variant?: 'default' | 'bordered' | 'light'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  size?: 'sm' | 'md' | 'lg'
  id?: string
}

const {
  label,
  placeholder,
  type = 'text',
  isRequired = false,
  isClearable = false,
  isInvalid = false,
  errorMessage = '',
  description = '',
  value = '',
  minLength,
  maxLength,
  pattern,
  isReadOnly = false,
  isDisabled = false,
  variant = 'default',
  color = 'default',
  rounded = 'md',
  size = 'md',
  id = \`input-\${crypto.randomUUID()}\`
} = Astro.props as InputProps

const variants = {
  default: 'border-0 shadow-lg backdrop-blur-sm',
  bordered: 'border shadow-md',
  light: ''
}

const colors = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/30',
  warning: 'bg-yellow-500/40 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
}

const textColors = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
}

const borderColors = {
  default: 'border-gray-600',
  primary: 'border-blue-600',
  secondary: 'border-indigo-600',
  success: 'border-green-600',
  warning: 'border-yellow-600',
  danger: 'border-red-600'
}

const sizes = {
  sm: 'text-xs px-2 py-1.5',
  md: 'text-sm px-3 py-2',
  lg: 'text-base px-4 py-2.5'
}

const roundeds = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}
---

<div class={\`flex flex-col space-y-2 \${textColors[color]}\`}>
  {
    label && (
      <label for={id} class='text-sm font-medium'>
        {label}
        {isRequired && <span class='text-red-500'> *</span>}
      </label>
    )
  }

  <div class='relative'>
    <div
      class={\`flex items-center \${variants[variant]} \${roundeds[rounded]} \${
        variant === 'default' && colors[color]
      } \${borderColors[color]}\`}
    >
      <div class='flex-1 relative'>
        <input
          id={id}
          type={type}
          value={value}
          required={isRequired}
          minlength={minLength}
          maxlength={maxLength}
          pattern={pattern}
          readonly={isReadOnly}
          disabled={isDisabled}
          placeholder={placeholder}
          aria-invalid={isInvalid}
          aria-describedby={description ? \`\${id}-description\` : undefined}
          class={\`w-full focus:outline-none \${
            variant === 'light' && 'border-b-2'
          } \${
            roundeds[rounded]
          } \${sizes[size]} \${isInvalid && 'border-2 border-red-500'}\`}
        />

        {
          type !== 'password' && isClearable && (
            <button
              type='button'
              class={\`absolute inset-y-0 right-0 pr-3 flex items-center \${!value ? 'opacity-0 invisible' : ''}\`}
              aria-label='Clear input'
              data-clear-button
            >
              <span class='text-gray-500 hover:text-gray-700'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path
                    d='M12 2l.324 .001l.318 .004l.616 .017l.299 .013l.579 .034l.553 .046c4.785 .464 6.732 2.411 7.196 7.196l.046 .553l.034 .579c.005 .098 .01 .198 .013 .299l.017 .616l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.464 4.785 -2.411 6.732 -7.196 7.196l-.553 .046l-.579 .034c-.098 .005 -.198 .01 -.299 .013l-.616 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785 -.464 -6.732 -2.411 -7.196 -7.196l-.046 -.553l-.034 -.579a28.058 28.058 0 0 1 -.013 -.299l-.017 -.616c-.003 -.21 -.005 -.424 -.005 -.642l.001 -.324l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.464 -4.785 2.411 -6.732 7.196 -7.196l.553 -.046l.579 -.034c.098 -.005 .198 -.01 .299 -.013l.616 -.017c.21 -.003 .424 -.005 .642 -.005zm-1.489 7.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z'
                    fill='currentColor'
                    stroke-width='0'
                  />
                </svg>
              </span>
            </button>
          )
        }
      </div>
    </div>
    {
      isInvalid && errorMessage && (
        <p
          id={\`\${id}-error\`}
          class='text-red-500 text-sm absolute top-full left-0 w-full mt-1'
        >
          {errorMessage}
        </p>
      )
    }
  </div>

  <div class='text-sm'>
    {
      description && (
        <p id={\`\${id}-description\`} class='font-normal'>
          {description}
        </p>
      )
    }
  </div>
</div>

<script is:inline define:vars={{ id }}>
  const inputElement = document.getElementById(id)
  const clearButton = inputElement
    ?.closest('.relative')
    ?.querySelector('[data-clear-button]')

  if (clearButton) {
    clearButton.addEventListener('click', () => {
      inputElement.value = ''
      const event = new Event('input', { bubbles: true })
      inputElement.dispatchEvent(event)
    })
  }

  if (inputElement && clearButton) {
    const updateClearButton = () => {
      const hasValue = inputElement.value !== ''
      clearButton.classList.toggle('opacity-0', !hasValue)
      clearButton.classList.toggle('invisible', !hasValue)
    }

    inputElement.addEventListener('input', updateClearButton)
    updateClearButton()
  }

  if (inputElement) {
    inputElement.addEventListener('input', (e) => {
      const event = new CustomEvent('valueChange', {
        detail: { value: e.target.value }
      })
      inputElement.dispatchEvent(event)
    })
  }

  if (inputElement) {
    inputElement.addEventListener('updateValidation', (e) => {
      // Actualizar estado visual
      inputElement.classList.toggle('border-red-500', e.detail.invalid)
      inputElement.classList.toggle('border-2', e.detail.invalid)

      const errorMessageElement = document.getElementById(\`\${id}-error\`)
      if (errorMessageElement) {
        errorMessageElement.style.display = e.detail.invalid ? 'block' : 'none'
      }
    })
  }
</script>
`

export const ModalAstro = `---
export interface Props {
  isOpen?: boolean
  isDismissable?: boolean
  effect?: 'opaque' | 'blur' | 'transparent'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  modalId: string
  closeEventName?: string
}

const {
  isOpen = false,
  isDismissable = true,
  effect = 'opaque',
  color = 'default',
  rounded = 'md',
  size = 'md',
  modalId = crypto.randomUUID(),
  closeEventName = 'closemodal'
} = Astro.props

const backdropEffects = {
  opaque: 'bg-black/50',
  blur: 'backdrop-blur-sm bg-black/30',
  transparent: 'bg-transparent'
}

const colors = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/20',
  warning: 'bg-yellow-500/30',
  danger: 'bg-red-500/20'
}

const roundeds = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-xl',
  xl: 'rounded-2xl'
}

const sizes = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full min-h-screen sm:min-h-full'
}

const backdropClass = backdropEffects[effect] || backdropEffects.opaque
const colorClass = colors[color] || colors.default
const roundedClass = roundeds[rounded] || roundeds.md
const sizeClass = sizes[size] || sizes.md
const textColorClass = effect === 'opaque' ? 'text-gray-200' : 'text-gray-800'
---

<div
  id={modalId}
  class:list={[
    'fixed inset-0 z-50 flex items-center justify-center',
    backdropClass,
    !isOpen && 'hidden'
  ]}
  role='dialog'
  aria-modal='true'
  aria-labelledby='modal-title'
  aria-describedby='modal-description'
  data-is-dismissable={isDismissable.toString()}
  data-close-event-name={closeEventName}
>
  <div
    id={\`\${modalId}-content\`}
    tabindex='-1'
    class:list={[
      'shadow-lg w-full border-0',
      colorClass,
      roundedClass,
      sizeClass,
      effect === 'blur' && 'backdrop-blur-md',
      textColorClass,
      'dark:text-gray-300'
    ]}
  >
    <slot />
  </div>
</div>

<script define:vars={{ modalId }}>
  function getModalElements(currentModalId) {
    const modalElement = document.getElementById(currentModalId)
    if (!modalElement) return null
    const modalContent = document.getElementById(\`\${currentModalId}-content\`)
    return { modalElement, modalContent }
  }

  function setupModal(currentModalId) {
    const elements = getModalElements(currentModalId)
    if (!elements) return

    const { modalElement, modalContent } = elements
    const isDismissable = modalElement.dataset.isDismissable === 'true'
    const closeEventName = modalElement.dataset.closeEventName

    const dispatchCloseEvent = () => {
      modalElement.dispatchEvent(
        new CustomEvent(closeEventName, { bubbles: true })
      )
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isDismissable) {
        dispatchCloseEvent()
      }
    }

    const handleClickOutside = (event) => {
      if (
        modalContent &&
        !modalContent.contains(event.target) &&
        modalElement.contains(event.target) &&
        isDismissable
      ) {
        dispatchCloseEvent()
      }
    }

    const trapFocus = (event) => {
      if (!modalElement || modalElement.classList.contains('hidden')) return

      const focusableElements = modalContent.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.key === 'Tab') {
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', (event) => {
      if (!modalElement.classList.contains('hidden')) {
        handleKeyDown(event)
        trapFocus(event)
      }
    })
    modalElement.addEventListener('mousedown', (event) => {
      if (!modalElement.classList.contains('hidden')) {
        handleClickOutside(event)
      }
    })

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          const isOpenNow = !modalElement.classList.contains('hidden')
          if (isOpenNow) {
            document.body.style.overflow = 'hidden'
            const focusableElements = modalContent.querySelectorAll(
              'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
            if (focusableElements.length > 0) {
              focusableElements[0].focus()
            } else {
              modalContent.focus()
            }
          } else {
            document.body.style.overflow = 'auto'
          }
        }
      }
    })

    observer.observe(modalElement, { attributes: true })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setupModal(modalId))
  } else {
    setupModal(modalId)
  }
</script>
`

export const ModalBodyAstro = `<div class='mb-4' role='region' aria-label='Modal Content'>
  <slot />
</div>
`

export const ModalContentAstro = `<div class='p-6' role='dialog' aria-modal='true'>
  <slot />
</div>
`

export const ModalFooterAstro = `<div
  class='flex justify-end space-x-2'
  role='contentinfo'
  aria-label='Modal Footer'
>
  <slot />
</div>
`

export const ModalHeaderAstro = `---
export interface Props {
  onClose?: boolean
  closeButtonId?: string
}
const { onClose = true, closeButtonId } = Astro.props
const uniqueId = \`modal-header-title-\${Math.random().toString(36).substring(2, 9)}\`
---

<div class='flex justify-between items-center pb-4 mb-4'>
  <h3 class='text-lg font-semibold' id={uniqueId}>
    <slot />
  </h3>
  {
    onClose && (
      <button
        id={closeButtonId}
        type='button'
        class='p-2 transition duration-300 ease-in-out hover:text-red-700'
        aria-label='Close'
        aria-labelledby={uniqueId}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='currentColor'
          class='icon icon-tabler icons-tabler-filled icon-tabler-square-rounded-x'
          role='img'
          aria-hidden='true'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path
            d='M12 2l.324 .001l.318 .004l.616 .017l.299 .013l.579 .034l.553 .046c4.785 .464 6.732 2.411 7.196 7.196l.046 .553l.034 .579c.005 .098 .01 .198 .013 .299l.017 .616l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.464 4.785 -2.411 6.732 -7.196 7.196l-.553 .046l-.579 .034c-.098 .005 -.198 .01 -.299 .013l-.616 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785 -.464 -6.732 -2.411 -7.196 -7.196l-.046 -.553l-.034 -.579a28.058 28.058 0 0 1 -.013 -.299l-.017 -.616c-.003 -.21 -.005 -.424 -.005 -.642l.001 -.324l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.464 -4.785 2.411 -6.732 7.196 -7.196l.553 -.046l.579 -.034c.098 -.005 .198 -.01 .299 -.013l.616 -.017c.21 -.003 .424 -.005 .642 -.005zm-1.489 7.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z'
            fill='currentColor'
            stroke-width='0'
          />
        </svg>
      </button>
    )
  }
</div>
`

export const PopoverAstro = `---
interface Props {
  backdrop?: 'transparent' | 'opaque' | 'blur'
  placement?: 'top' | 'bottom' | 'left' | 'right'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  id?: string
}
const {
  backdrop = 'transparent',
  placement = 'bottom',
  color = 'default',
  rounded = 'md',
  id = \`popover-\${crypto.randomUUID()}\`
} = Astro.props

const placementStyles = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2'
}

const roundeds = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}

const colors = {
  default: 'bg-neutral-100/80 dark:bg-zinc-800/80',
  primary: 'bg-blue-500/80',
  secondary: 'bg-indigo-500/80',
  success: 'bg-green-500/80 dark:bg-green-600/80',
  warning: 'bg-yellow-500/80',
  danger: 'bg-red-500/80'
}

const backdropClass = {
  transparent: 'bg-transparent',
  opaque: 'bg-gray-200/50 dark:bg-black/50',
  blur: 'backdrop-blur-sm'
}
---

<div class='relative inline-block' role='dialog' id={id}>
  <div data-popover-trigger class='cursor-pointer inline-block' tabindex='0'>
    <slot name='trigger' />
  </div>

  <div
    class={\`fixed inset-0 \${backdropClass[backdrop]} hidden z-[998]\`}
    data-popover-backdrop
  >
  </div>

  <div
    class={\`absolute z-[999] \${placementStyles[placement]} hidden\`}
    data-popover-content
    style='transform: translateZ(0)'
  >
    <div
      class={\`border-0 backdrop-blur-md shadow-lg p-4 whitespace-nowrap text-gray-800 dark:text-gray-300 \${colors[color]} \${roundeds[rounded]}\`}
    >
      <slot name='content' />
    </div>
  </div>
</div>

<script is:inline define:vars={{ id }}>
  document.addEventListener('DOMContentLoaded', () => {
    const popover = document.querySelector(\`#\${id}\`)
    const trigger = popover.querySelector('[data-popover-trigger]')
    const content = popover.querySelector('[data-popover-content]')
    const backdrop = popover.querySelector('[data-popover-backdrop]')

    let isOpen = false

    const togglePopover = (e) => {
      e.stopPropagation()
      isOpen = !isOpen
      content.classList.toggle('hidden', !isOpen)
      backdrop.classList.toggle('hidden', !isOpen)
    }

    trigger.addEventListener('click', togglePopover)

    trigger.addEventListener('keydown', (e) => {
      if (['Enter', ' '].includes(e.key)) togglePopover(e)
    })

    document.addEventListener('click', (e) => {
      if (!popover.contains(e.target)) {
        isOpen = false
        content.classList.add('hidden')
        backdrop.classList.add('hidden')
      }
    })

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        isOpen = false
        content.classList.add('hidden')
        backdrop.classList.add('hidden')
      }
    })
  })
</script>
`

export const RadioAstro = `---
interface Props {
  value: string
  isSelected?: boolean
  isDisabled?: boolean
  isReadOnly?: boolean
  description?: string
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  id?: string
}

const {
  value,
  isSelected = false,
  isDisabled = false,
  isReadOnly = false,
  description,
  color = 'default',
  id = \`radio-\${Math.random().toString(36).substring(2, 9)}\`
} = Astro.props

const colors = {
  default: 'bg-zinc-700/30 dark:bg-neutral-100/50',
  primary: 'bg-blue-500/50',
  secondary: 'bg-indigo-500/50',
  success: 'bg-green-500/60',
  warning: 'bg-yellow-500/60',
  danger: 'bg-red-500/50'
}
---

<div
  id={id}
  class={\`flex items-center gap-2 transition-colors \${
    isDisabled
      ? 'opacity-50 cursor-not-allowed pointer-events-none'
      : 'cursor-pointer'
  }\`}
  role='radio'
  aria-checked={isSelected}
  aria-disabled={isDisabled}
  tabindex={isDisabled ? -1 : 0}
  data-selected={isSelected}
  data-readonly={isReadOnly}
  data-disabled={isDisabled}
  data-pressed='false'
  data-hover='false'
  data-hover-unselected='false'
>
  <input
    type='radio'
    value={value}
    checked={isSelected}
    disabled={isDisabled || isReadOnly}
    class='hidden'
  />

  <div
    class={\`size-5 rounded-full flex items-center justify-center transition-colors
      \${isSelected ? colors[color] : 'border-2 border-zinc-700/50 dark:border-neutral-100/50'}\`}
  >
    <div
      class={\`inner-dot size-3 rounded-full border-2 border-transparent \${colors[color]} opacity-0\`}
    >
    </div>
  </div>

  <div class='flex flex-col'>
    <div class='text-sm font-medium'><slot /></div>
    {description && <p class='text-sm font-light'>{description}</p>}
  </div>
</div>

<script define:vars={{ id, isSelected, isDisabled, isReadOnly, value }}>
  const root = document.getElementById(id)
  const input = root.querySelector('input[type=radio]')
  const dot = root.querySelector('.inner-dot')
  let isPressed = false
  let isHovered = false

  function updateAttrs() {
    root.setAttribute('data-pressed', isPressed)
    root.setAttribute('data-hover', isHovered)
    root.setAttribute(
      'data-hover-unselected',
      isHovered && root.getAttribute('aria-checked') === 'false'
    )
  }

  function updateDot(show) {
    dot.classList.toggle('opacity-100', show)
    dot.classList.toggle('opacity-0', !show)
  }

  function handleChange() {
    if (
      root.getAttribute('aria-disabled') === 'true' ||
      root.getAttribute('data-readonly') === 'true'
    )
      return
    input.checked = true
    root.setAttribute('aria-checked', 'true')
    root.setAttribute('data-selected', 'true')
    root.dispatchEvent(new CustomEvent('change', { detail: value }))
  }

  updateDot(isSelected)

  root.addEventListener('mousedown', () => {
    if (
      root.getAttribute('aria-disabled') === 'false' &&
      root.getAttribute('data-readonly') === 'false'
    ) {
      isPressed = true
      updateAttrs()
    }
  })

  root.addEventListener('mouseup', () => {
    isPressed = false
    updateAttrs()
  })

  root.addEventListener('mouseenter', () => {
    if (
      root.getAttribute('aria-disabled') === 'false' &&
      root.getAttribute('data-readonly') === 'false'
    ) {
      isHovered = true
      updateAttrs()
    }
  })

  root.addEventListener('mouseleave', () => {
    isHovered = false
    updateAttrs()
  })

  root.addEventListener('click', handleChange)
  root.addEventListener('keydown', (e) => {
    if (
      (e.key === 'Enter' || e.key === ' ') &&
      root.getAttribute('aria-disabled') === 'false'
    ) {
      e.preventDefault()
      handleChange()
    }
  })
</script>
`

export const RadioGroupAstro = `---
interface Props {
  orientation?: 'vertical' | 'horizontal'
  label?: string
  description?: string
  errorMessage?: string
  isInvalid?: boolean
  isDisabled?: boolean
  selectedValue?: string | null
  variant?: 'default' | 'bordered' | 'light'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  id?: string
}

const {
  orientation = 'vertical',
  label,
  description,
  errorMessage,
  isInvalid = false,
  isDisabled = false,
  selectedValue,
  variant = 'default',
  color = 'default',
  rounded = 'md',
  id = \`radiogroup-\${Math.random().toString(36).substring(2, 9)}\`
} = Astro.props

const variants = {
  default: 'border-0 backdrop-blur-sm shadow-md',
  bordered: 'border shadow-md',
  light: ''
}
const bgColors = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-neutral-100/10',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/20',
  warning: 'bg-yellow-500/20',
  danger: 'bg-red-500/20'
}
const borderColors = {
  default: 'border-zinc-700/30 dark:border-neutral-100/20',
  primary: 'border-blue-500',
  secondary: 'border-indigo-500',
  success: 'border-green-500',
  warning: 'border-yellow-500',
  danger: 'border-red-500'
}
const textColors = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-600',
  secondary: 'text-indigo-600',
  success: 'text-green-600',
  warning: 'text-yellow-600',
  danger: 'text-red-600'
}
const roundeds = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-xl',
  xl: 'rounded-3xl'
}
---

<div
  id={id}
  class={\`flex flex-col gap-3 px-4 py-3 \${variants[variant]} \${
    variant === 'default' ? bgColors[color] : ''
  } \${roundeds[rounded]} \${variant === 'bordered' ? borderColors[color] : ''}\`}
  data-orientation={orientation}
  role='radiogroup'
  aria-labelledby={label ? \`\${id}-label\` : undefined}
  aria-describedby={description ? \`\${id}-description\` : undefined}
  aria-invalid={isInvalid || undefined}
  aria-disabled={isDisabled || undefined}
>
  {
    label && (
      <span
        id={\`\${id}-label\`}
        class='text-sm font-medium text-gray-600 dark:text-gray-400'
      >
        {label}
      </span>
    )
  }

  <div
    class={\`flex \${orientation === 'horizontal' ? 'flex-row gap-4' : 'flex-col gap-2'} \${textColors[color]}\`}
  >
    <slot />
  </div>

  {
    description && (
      <p id={\`\${id}-description\`} class='text-sm text-gray-500'>
        {description}
      </p>
    )
  }
  {
    isInvalid && errorMessage && (
      <p class='text-sm text-red-600 error-message'>{errorMessage}</p>
    )
  }
</div>

<script define:vars={{ id, selectedValue, isDisabled }}>
  const root = document.getElementById(id)
  const radios = Array.from(root.querySelectorAll('[role=radio]'))

  function updateRadios(value) {
    radios.forEach((r) => {
      const input = r.querySelector('input[type=radio]')
      const dot = r.querySelector('.inner-dot')
      const isSel = input.value === value

      r.setAttribute('aria-checked', isSel)
      r.setAttribute('data-selected', isSel)

      if (isDisabled) {
        r.setAttribute('aria-disabled', 'true')
        r.setAttribute('data-disabled', 'true')
        r.tabIndex = -1
        input.disabled = true
        r.classList.add('opacity-50', 'pointer-events-none')
      } else {
        r.setAttribute('aria-disabled', 'false')
        r.setAttribute('data-disabled', 'false')
        r.tabIndex = 0
        input.disabled = false
        r.classList.remove('opacity-50', 'pointer-events-none')
      }

      if (dot) {
        dot.classList.toggle('opacity-100', isSel)
        dot.classList.toggle('opacity-0', !isSel)
      }
    })
  }

  updateRadios(selectedValue)

  radios.forEach((radioEl) => {
    radioEl.addEventListener('change', (e) => {
      const newVal = e.detail
      updateRadios(newVal)
      root.dispatchEvent(new CustomEvent('change', { detail: newVal }))
    })
  })
</script>
`

export const SelectAstro = `---
interface Props {
  label?: string
  description?: string
  errorMessage?: string
  isInvalid?: boolean
  isDisabled?: boolean
  placeholder?: string
  variant?: 'default' | 'bordered' | 'light'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  selectId?: string
}

const {
  label,
  description,
  errorMessage,
  isInvalid,
  isDisabled = false,
  placeholder = 'Selecciona una opción',
  variant = 'default',
  color = 'default',
  rounded = 'md',
  selectId = Math.random().toString(36).substring(2, 9)
} = Astro.props

const variants = {
  default: 'border-0 backdrop-blur-sm shadow-md',
  bordered: 'border border-current shadow-md',
  light: 'border-b border-current'
}

const colors = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-neutral-100/10',
  primary: 'bg-blue-500/20 ',
  secondary: 'bg-indigo-500/20 ',
  success: 'bg-green-500/30 ',
  warning: 'bg-yellow-500/20 ',
  danger: 'bg-red-500/20 '
}

const textColors = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-600',
  secondary: 'text-indigo-600',
  success: 'text-green-600',
  warning: 'text-yellow-600',
  danger: 'text-red-600'
}

const roundeds = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full'
}
---

<div
  class='relative w-full space-y-2 text-gray-600 dark:text-gray-500'
  data-invalid={isInvalid}
  id={selectId}
>
  {
    label && (
      <label for='select-trigger' class='block text-sm font-medium mb-1'>
        {label}
      </label>
    )
  }

  <div
    id='select-trigger'
    role='button'
    aria-haspopup='listbox'
    aria-disabled={isDisabled}
    class={\`trigger flex items-center justify-between p-2 \${
      variants[variant]
    } \${variant === 'default' && colors[color]} \${textColors[color]} \${
      variant !== 'light' && roundeds[rounded]
    } \${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}\`}
    data-open='false'
  >
    <div class='value' data-value=''>{placeholder}</div>

    <div class='selector-icon' aria-hidden='true'>
      <svg
        class='w-4 h-4 transition-transform'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          stroke-linecap='round'
          stroke-linejoin='round'
          stroke-width='2'
          d='M19 9l-7 7-7-7'></path>
      </svg>
    </div>
  </div>

  <div
    class={\`listbox-wrapper hidden absolute mt-1 w-full border-0 backdrop-blur-xl rounded-md shadow-lg z-10 \${colors[color]}\`}
  >
    <ul class='listbox' role='listbox' aria-labelledby='select-trigger'>
      <slot />
    </ul>
  </div>

  {description && <p class='text-sm mt-1'>{description}</p>}

  {
    isInvalid && errorMessage && (
      <p class='text-sm text-red-500 mt-1 error-message' role='alert'>
        {errorMessage}
      </p>
    )
  }

  <script is:inline define:vars={{ selectId, isInvalid }}>
    ;(function () {
      const select = document.getElementById(selectId)
      const trigger = select.querySelector('.trigger')
      const listbox = select.querySelector('.listbox-wrapper')
      const valueDisplay = select.querySelector('.value')
      const icon = select.querySelector('svg')

      const toggleListbox = () => {
        const isOpen = listbox.classList.toggle('hidden')
        trigger.setAttribute('data-open', !isOpen)
        icon.style.transform = isOpen ? 'rotate(180deg)' : ''
      }

      const closeListbox = () => {
        listbox.classList.add('hidden')
        trigger.setAttribute('data-open', 'false')
        icon.style.transform = ''
      }

      trigger.addEventListener('click', () => {
        if (
          !select
            .querySelector('.trigger')
            .classList.contains('cursor-not-allowed')
        ) {
          toggleListbox()
        }
      })

      document.addEventListener('click', (e) => {
        if (!select.contains(e.target)) closeListbox()
      })

      select.querySelectorAll('li').forEach((item) => {
        item.addEventListener('click', () => {
          if (item.getAttribute('data-disabled') !== 'true') {
            valueDisplay.textContent = item.textContent
            valueDisplay.setAttribute(
              'data-value',
              item.getAttribute('data-value')
            )
            closeListbox()

            const event = new CustomEvent('select-change', {
              detail: { value: item.getAttribute('data-value') }
            })
            select.dispatchEvent(event)
          }
        })
      })

      const updateValidation = () => {
        const errorElement = select.querySelector('.error-message')
        if (errorElement) {
          errorElement.style.display = select.hasAttribute('data-invalid')
            ? 'block'
            : 'none'
        }
      }

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'data-invalid') {
            updateValidation()
          }
        })
      })

      observer.observe(select, {
        attributes: true
      })

      updateValidation()
    })()
  </script>
</div>
`

export const SelectItemAstro = `---
interface Props {
  value: string
  isDisabled?: boolean
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
}

const { value, isDisabled = false, color = 'default' } = Astro.props

const textColors = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-600',
  secondary: 'text-indigo-600',
  success: 'text-green-600',
  warning: 'text-yellow-600',
  danger: 'text-red-600'
}
---

<li
  class={\`p-2 cursor-pointer \${
    textColors[color]
  } \${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-neutral-100/50 dark:hover:bg-zinc-700/50'}\`}
  data-value={value}
  data-disabled={isDisabled}
  role='option'
>
  <slot />
</li>
`

export const SkeletonAstro = `---
export interface Props {
  isLoaded: boolean
  className?: string
}

const { isLoaded, className: customClassesWhenLoading } = Astro.props

const wrapperClasses = [
  'relative',
  'overflow-hidden',
  { 'backdrop-blur-sm shadow-lg animate-pulse': !isLoaded },
  customClassesWhenLoading && !isLoaded ? customClassesWhenLoading : ''
]
---

<div
  class:list={wrapperClasses}
  data-loaded={isLoaded}
  role='status'
  aria-busy={!isLoaded}
  aria-live='polite'
  data-skeleton-wrapper
  data-custom-loading-classes={!isLoaded && customClassesWhenLoading
    ? customClassesWhenLoading
    : ''}
>
  {
    !isLoaded && (
      <div
        class='absolute inset-0 transform bg-zinc-700/30 dark:bg-gray-600 animate-pulse'
        aria-hidden='true'
        data-skeleton-pulse
      />
    )
  }
  <div class:list={[{ 'opacity-0': !isLoaded }]} data-skeleton-content>
    <slot />
  </div>
</div>
`

export const TableAstro = `---
interface Props {
  variant?: 'default' | 'bordered' | 'light'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

const { variant = 'default', color = 'default', rounded = 'md' } = Astro.props

const variants = {
  default: 'border-0 backdrop-blur-sm shadow-lg',
  bordered: 'border shadow-md',
  light: ''
}

const roundeds = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl'
}

const colors = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/30',
  warning: 'bg-yellow-500/40 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
}

const textColors = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-600',
  secondary: 'text-indigo-800 dark:text-indigo-600',
  success: 'text-green-800 dark:text-green-600',
  warning: 'text-yellow-800 dark:text-yellow-600',
  danger: 'text-red-800 dark:text-red-500'
}

const borderColors = {
  default: 'border-gray-800 dark:border-gray-300',
  primary: 'border-blue-800 dark:border-blue-500',
  secondary: 'border-indigo-800 dark:border-indigo-500',
  success: 'border-green-800 dark:border-green-500',
  warning: 'border-yellow-800 dark:border-yellow-500',
  danger: 'border-red-800 dark:border-red-500'
}

const divClasses = [
  'w-full overflow-auto',
  variants[variant],
  roundeds[rounded],
  textColors[color],
  variant === 'bordered' ? borderColors[color] : ''
]
  .join(' ')
  .trim()

const tableClasses = ['w-full', variant === 'default' ? colors[color] : '']
  .join(' ')
  .trim()
---

<div class={divClasses} role='region' aria-label='Data Table'>
  <table class={tableClasses} role='table'>
    <slot />
  </table>
</div>
`

export const TableBodyAstro = `---
interface Props {
  isLoading?: boolean
  loadingContent?: string
  isEmpty?: boolean
  emptyMessage?: string
  divide?: boolean
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
}

const {
  isLoading,
  loadingContent,
  isEmpty,
  emptyMessage = 'No data available.',
  divide = false,
  color = 'default'
} = Astro.props

const divideColors = {
  default: 'divide-gray-800 dark:divide-gray-300',
  primary: 'divide-blue-800 dark:divide-blue-500',
  secondary: 'divide-indigo-800 dark:divide-indigo-500',
  success: 'divide-green-800 dark:divide-green-500',
  warning: 'divide-yellow-800 dark:divide-yellow-500',
  danger: 'divide-red-800 dark:divide-red-500'
}

let tbodyClasses = ''
if (divide) {
  tbodyClasses = \`divide-y \${divideColors[color]}\`
}
---

{
  isLoading ? (
    <tbody aria-busy='true'>
      <tr>
        <td colspan='100%' class='py-6 text-center'>
          {loadingContent ? (
            <Fragment set:html={loadingContent} />
          ) : (
            'Loading...'
          )}
        </td>
      </tr>
    </tbody>
  ) : isEmpty ? (
    <tbody>
      <tr>
        <td
          colspan='100%'
          class='py-6 text-center'
          role='alert'
          aria-live='polite'
        >
          {emptyMessage}
        </td>
      </tr>
    </tbody>
  ) : (
    <tbody class={tbodyClasses.trim()} role='rowgroup'>
      <slot />
    </tbody>
  )
}
`

export const TableCellAstro = `---
import type { AriaRole } from 'react'

interface Props {
  isSelected?: boolean
  isFocusVisible?: boolean
  selectColor?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
  role?: string | AriaRole
  tabIndex?: number
  ariaSelected?: boolean
}

const {
  isSelected,
  isFocusVisible,
  selectColor = 'default',
  role = 'cell',
  tabIndex = 0,
  ariaSelected
} = Astro.props

const selectedColors = {
  default: 'bg-neutral-100/70 dark:bg-zinc-700/80',
  primary: 'bg-blue-500/70',
  secondary: 'bg-indigo-500/70',
  success: 'bg-green-500/80',
  warning: 'bg-yellow-500/90 dark:bg-yellow-500/70',
  danger: 'bg-red-500/70'
}

const cellClasses = [
  'px-6 py-4 whitespace-nowrap text-sm',
  isSelected ? selectedColors[selectColor] : '',
  isFocusVisible ? 'ring-2 ring-blue-500' : ''
]
  .join(' ')
  .trim()
---

<td tabindex={tabIndex} aria-selected={ariaSelected} class={cellClasses}>
  <slot />
</td>
`

export const TableColumnAstro = `<th
  class='px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider'
  scope='col'
  role='columnheader'
>
  <slot />
</th>
`

export const TableHeaderAstro = `---
interface Props {
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
}

const { color = 'default' } = Astro.props

const colors = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/30',
  warning: 'bg-yellow-500/40 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
}

const headerClasses = ['border-0 backdrop-blur-md shadow-md', colors[color]]
  .join(' ')
  .trim()
---

<thead class={headerClasses} role='rowgroup'>
  <tr><slot /></tr>
</thead>
`

export const TableRowAstro = `---
interface Props {
  isSelected?: boolean
  isDisabled?: boolean
  isHovered?: boolean
  isFocusVisible?: boolean
  isFirst?: boolean
  isLast?: boolean
  isOdd?: boolean
  id?: string
  selectedColor?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
  hoverColor?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
  oddColor?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
}

const {
  isSelected,
  isDisabled,
  isHovered,
  isFocusVisible,
  isFirst,
  isLast,
  isOdd,
  id,
  selectedColor = 'default',
  hoverColor = 'default',
  oddColor = 'default'
} = Astro.props

const selectedColors = {
  default: 'bg-neutral-100/60 dark:bg-zinc-700/70',
  primary: 'bg-blue-500/60',
  secondary: 'bg-indigo-500/60',
  success: 'bg-green-500/70',
  warning: 'bg-yellow-500/80 dark:bg-yellow-500/60',
  danger: 'bg-red-500/60'
}

const hoverColors = {
  default: 'hover:bg-neutral-100/40 dark:hover:bg-zinc-700/50',
  primary: 'hover:bg-blue-500/40',
  secondary: 'hover:bg-indigo-500/40',
  success: 'hover:bg-green-500/50',
  warning: 'hover:bg-yellow-500/60 dark:hover:bg-yellow-500/40',
  danger: 'hover:bg-red-500/40'
}

const oddColors = {
  default: 'bg-neutral-200/20 dark:bg-zinc-800/30',
  primary: 'bg-blue-600/20',
  secondary: 'bg-indigo-600/20',
  success: 'bg-green-600/30',
  warning: 'bg-yellow-600/40 dark:bg-yellow-600/20',
  danger: 'bg-red-600/20'
}

const rowClasses = [
  isSelected ? selectedColors[selectedColor] : '',
  isDisabled ? 'opacity-50 cursor-not-allowed' : '',
  isHovered ? hoverColors[hoverColor] : '',
  isFocusVisible ? 'ring-2 ring-blue-500' : '',
  isFirst ? 'rounded-t-lg' : '',
  isLast ? 'rounded-b-lg' : '',
  isOdd ? oddColors[oddColor] : '',
  'transition-colors duration-200'
]
  .join(' ')
  .trim()
  .replace(/\\s+/g, ' ')
---

<tr
  id={id}
  role='row'
  aria-selected={isSelected ? 'true' : 'false'}
  tabindex={isDisabled ? -1 : 0}
  class={rowClasses}
>
  <slot />
</tr>
`

export const TabAstro = `---
export interface Props {
  label: string
  disabled?: boolean
  href?: string
}

const { label, disabled = false, href } = Astro.props
---

<div
  class='astro-tab-source-data'
  data-label={label}
  data-disabled={disabled ? 'true' : undefined}
  data-href={href}
  style='display: none;'
>
</div>
<div class='astro-tab-panel-content'>
  <slot />
</div>
`

export const TabsAstro = `---
export interface Props {
  variant?: 'default' | 'bordered' | 'light'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  placement?: 'top' | 'bottom' | 'left' | 'right'
  orientation?: 'horizontal' | 'vertical'
  disabled?: boolean
  uniqueId?: string
}

const {
  variant = 'default',
  color = 'default',
  size = 'md',
  radius = 'md',
  placement = 'top',
  orientation = 'horizontal',
  disabled = false,
  uniqueId = \`tabs-\${Math.random().toString(36).substring(2, 9)}\`
} = Astro.props

const orientationClass = orientation === 'vertical' ? 'flex-col' : 'flex-row'

const placementClassMap = {
  top: 'flex-col',
  bottom: 'flex-col-reverse',
  left: 'flex-row',
  right: 'flex-row-reverse'
}
const placementClass = placementClassMap[placement]

const variantsMap = {
  default: 'border-0 shadow-lg backdrop-blur-sm',
  bordered: 'border shadow-md',
  light: 'border-b'
}

const activeVariantsMap = {
  default: 'border-0 shadow-lg backdrop-blur-sm',
  bordered: 'border',
  light: 'border-b-2'
}

const colorsMap = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/20',
  warning: 'bg-yellow-500/20',
  danger: 'bg-red-500/20'
}

const textColorsMap = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
}

const noActiveTextColorsMap = {
  default: 'text-gray-800/50 dark:text-gray-300/50',
  primary: 'text-blue-800/50 dark:text-blue-500/50',
  secondary: 'text-indigo-800/50 dark:text-indigo-500/50',
  success: 'text-green-800/50 dark:text-green-500/50',
  warning: 'text-yellow-800/50 dark:text-yellow-500/50',
  danger: 'text-red-800/50 dark:text-red-500/50'
}

const borderColorsMap = {
  default: 'border-gray-800 dark:border-gray-300',
  primary: 'border-blue-800 dark:border-blue-500',
  secondary: 'border-indigo-800 dark:border-indigo-500',
  success: 'border-green-800 dark:border-green-500',
  warning: 'border-yellow-800 dark:border-yellow-500',
  danger: 'border-red-800 dark:border-red-500'
}

const hoverColorsMap = {
  default: 'hover:text-gray-800/80 dark:hover:dark:text-gray-300/80',
  primary: 'hover:text-blue-500/50 dark:hover:text-blue-500/50',
  secondary: 'hover:text-indigo-500/50 dark:hover:text-indigo-500/50',
  success: 'hover:text-green-500/80 dark:hover:text-green-500/60',
  warning: 'hover:text-yellow-500/80 dark:hover:text-yellow-500/50',
  danger: 'hover:text-red-500/50 dark:hover:text-red-500/50'
}

const sizesMap = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base',
  xl: 'px-6 py-3.5 text-lg'
}

const roundedsMap = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}

const tabListClasses = [
  'flex',
  orientationClass,
  variantsMap[variant],
  variant === 'default' && colorsMap[color],
  variant !== 'default' && borderColorsMap[color],
  sizesMap[size],
  variant !== 'light' && roundedsMap[radius]
]
  .filter(Boolean)
  .join(' ')

const tabPanelsContainerClasses = ['p-4', textColorsMap[color]]
  .filter(Boolean)
  .join(' ')
---

<div class:list={[\`flex\`, placementClass, uniqueId]}>
  <div class={tabListClasses} role='tablist' aria-orientation={orientation}>
  </div>

  <div class={tabPanelsContainerClasses}></div>

  <div class='astro-tabs-slot-container' style='display: none;'>
    <slot />
  </div>
</div>

<script
  define:vars={{
    variant,
    color,
    size,
    radius,
    placement,
    orientation,
    disabled,
    variantsMap,
    activeVariantsMap,
    colorsMap,
    textColorsMap,
    noActiveTextColorsMap,
    borderColorsMap,
    hoverColorsMap,
    sizesMap,
    roundedsMap,
    uniqueId,
    allDisabled: disabled
  }}
>
  document.addEventListener('astro:page-load', () => {
    const tabsContainer = document.querySelector(\`.\${uniqueId}\`)
    if (!tabsContainer) return

    const tabList = tabsContainer.querySelector('[role="tablist"]')
    const tabPanelsContainer = tabsContainer.querySelector(
      \`.\${uniqueId} > div:nth-child(2)\`
    )
    const slottedContentContainer = tabsContainer.querySelector(
      '.astro-tabs-slot-container'
    )

    if (!tabList || !tabPanelsContainer || !slottedContentContainer) {
      console.error('Tabs structure not found for ID:', uniqueId)
      return
    }

    const tabSources = Array.from(
      slottedContentContainer.querySelectorAll('.astro-tab-source-data')
    )
    const tabs = []
    const panels = []

    let activeTabIndex = 0

    tabSources.forEach((sourceEl, index) => {
      const label = sourceEl.dataset.label
      const isDisabled = sourceEl.dataset.disabled === 'true'
      const href = sourceEl.dataset.href

      const button = document.createElement(href ? 'a' : 'button')
      button.setAttribute('role', 'tab')
      button.setAttribute('aria-controls', \`\${uniqueId}-tabpanel-\${index}\`)
      button.id = \`\${uniqueId}-tab-\${index}\`
      button.textContent = label
      if (href) {
        button.href = href
        if (isDisabled || allDisabled) {
          button.classList.add('pointer-events-none')
        }
      } else {
        button.type = 'button'
      }

      button.tabIndex = isDisabled || allDisabled ? -1 : 0
      button.disabled = isDisabled || allDisabled

      const panelContentSource = sourceEl.nextElementSibling
      const panel = document.createElement('div')
      panel.id = \`\${uniqueId}-tabpanel-\${index}\`
      panel.setAttribute('role', 'tabpanel')
      panel.setAttribute('aria-labelledby', \`\${uniqueId}-tab-\${index}\`)
      if (
        panelContentSource &&
        panelContentSource.classList.contains('astro-tab-panel-content')
      ) {
        while (panelContentSource.firstChild) {
          panel.appendChild(panelContentSource.firstChild)
        }
      } else {
        panel.textContent = \`Error: Panel content for "\${label}" not found.\`
      }

      tabList.appendChild(button)
      tabPanelsContainer.appendChild(panel)
      tabs.push(button)
      panels.push(panel)

      button.addEventListener('click', (e) => {
        if (isDisabled || allDisabled) {
          e.preventDefault()
          return
        }
        if (!href) e.preventDefault()
        setActiveTab(index)
      })

      button.addEventListener('keydown', (event) => {
        if (isDisabled || allDisabled) return
        handleKeyDown(event, index)
      })
    })

    function applyTabStyles() {
      tabs.forEach((button, index) => {
        const tabIsDisabled = button.disabled
        const tabIsLink = button.tagName === 'A'

        const baseButtonClasses = [
          'px-4',
          'py-2',
          'transition-colors',
          'duration-300',
          'ease-in-out'
        ]
        button.className = ''
        baseButtonClasses.forEach((cls) => button.classList.add(cls))

        if (index === activeTabIndex) {
          button.classList.add(...activeVariantsMap[variant].split(' '))
          button.classList.add(...borderColorsMap[color].split(' '))
          button.classList.add(...textColorsMap[color].split(' '))
          if (variant !== 'light') {
            button.classList.add(...roundedsMap[radius].split(' '))
          }
          button.setAttribute('aria-selected', 'true')
          button.tabIndex = 0
          panels[index].hidden = false
        } else {
          button.classList.add(...noActiveTextColorsMap[color].split(' '))
          button.setAttribute('aria-selected', 'false')
          button.tabIndex = -1
          panels[index].hidden = true
        }

        if (tabIsDisabled) {
          button.classList.add('opacity-50', 'cursor-not-allowed')
          if (tabIsLink) button.classList.add('pointer-events-none')
        } else {
          if (button.tagName !== 'A' || !button.getAttribute('href')) {
            button.classList.add(
              ...hoverColorsMap[color]
                .split(' ')
                .map((c) => c.replace('hover:', ''))
            )
          }
        }
      })
    }

    function setActiveTab(index) {
      if (
        tabs[index] &&
        (tabs[index].disabled ||
          tabs[index].classList.contains('pointer-events-none'))
      )
        return
      activeTabIndex = index
      applyTabStyles()
    }

    function handleKeyDown(event, index) {
      let nextIndex = -1
      const numTabs = tabs.length

      if (orientation === 'horizontal') {
        if (event.key === 'ArrowRight') {
          nextIndex = (index + 1) % numTabs
        } else if (event.key === 'ArrowLeft') {
          nextIndex = (index - 1 + numTabs) % numTabs
        }
      } else {
        // vertical
        if (event.key === 'ArrowDown') {
          nextIndex = (index + 1) % numTabs
        } else if (event.key === 'ArrowUp') {
          nextIndex = (index - 1 + numTabs) % numTabs
        }
      }

      if (nextIndex !== -1) {
        event.preventDefault()
        let attempts = 0
        while (tabs[nextIndex].disabled && attempts < numTabs) {
          if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            nextIndex = (nextIndex + 1) % numTabs
          } else {
            nextIndex = (nextIndex - 1 + numTabs) % numTabs
          }
          attempts++
        }
        if (!tabs[nextIndex].disabled) {
          setActiveTab(nextIndex)
          tabs[nextIndex].focus()
        }
      }
    }

    if (tabs.length > 0) {
      const firstEnabledTabIndex = tabs.findIndex((tab) => !tab.disabled)
      if (firstEnabledTabIndex !== -1) {
        activeTabIndex = firstEnabledTabIndex
      } else {
        activeTabIndex = 0
      }
      applyTabStyles()
    }

    return () => {
      tabs.forEach((button) => {
        const newButton = button.cloneNode(true)
        button.parentNode.replaceChild(newButton, button)
      })
    }
  })
</script>
`

export const AlertAstro = `---
interface AlertProps {
  type?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  styleVariant?: 'default' | 'light' | 'bordered' | 'complete'
  title: string
  content?: string
  icon?: boolean
  dismissible?: boolean
}

const {
  type = 'default',
  styleVariant = 'default',
  title,
  content,
  icon = true,
  dismissible = false
} = Astro.props as AlertProps

const typeAlert = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
} as const

const variants = {
  default: 'border-0 rounded-md shadow-lg backdrop-blur-sm',
  light:
    'border-t-4 border-current rounded-lg shadow-lg bg-transparent dark:bg-transparent',
  bordered:
    'border border-current rounded-lg shadow-md bg-transparent dark:bg-transparent',
  complete: 'border border-current rounded-lg shadow-lg backdrop-blur-md'
} as const

const colorType = {
  default: 'bg-neutral-100/40 dark:bg-zinc-700/60 dark:shadow-neutral-100/5',
  primary: 'bg-blue-500/40 dark:shadow-blue-500/20',
  secondary: 'bg-indigo-500/40 dark:shadow-indigo-500/20',
  success: 'bg-green-400/50 dark:shadow-green-500/20',
  warning: 'bg-yellow-500/40 dark:shadow-yellow-500/20',
  danger: 'bg-red-500/40 dark:shadow-red-500/20'
} as const

const typeClass = typeAlert[type]
const variantClass = variants[styleVariant]
const colorClass = colorType[type]
---

<div
  role='alert'
  aria-live='polite'
  class={\`flex items-center justify-center gap-4 py-2 px-4 my-2 transition-opacity duration-300
    \${typeClass} \${variantClass}
    \${styleVariant === 'default' || styleVariant === 'complete' ? colorClass : ''}\`}
  data-alert-container
  data-visible='true'
>
  {
    icon && (
      <div
        class={\`flex items-center justify-center self-center size-9 rounded-full \${
          styleVariant === 'bordered' ? 'bg-transparent' : colorClass
        }\`}
        aria-hidden='true'
      >
        {type === 'default' && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='currentColor'
            class='fill-white/80'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M12 2l.642 .005l.616 .017l.299 .013l.579 .034l.553 .046c4.687 .455 6.65 2.333 7.166 6.906l.03 .29l.046 .553l.041 .727l.006 .15l.017 .617l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.455 4.687 -2.333 6.65 -6.906 7.166l-.29 .03l-.553 .046l-.727 .041l-.15 .006l-.617 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.687 -.455 -6.65 -2.333 -7.166 -6.906l-.03 -.29l-.046 -.553l-.041 -.727l-.006 -.15l-.017 -.617l-.004 -.318v-.648l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.455 -4.687 2.333 -6.65 6.906 -7.166l.29 -.03l.553 -.046l.727 -.041l.15 -.006l.617 -.017c.21 -.003 .424 -.005 .642 -.005zm.01 13l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -8a1 1 0 0 0 -.993 .883l-.007 .117v4l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z' />
          </svg>
        )}
        {type === 'primary' && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='currentColor'
            class='fill-blue-500/80'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M12 2l.642 .005l.616 .017l.299 .013l.579 .034l.553 .046c4.687 .455 6.65 2.333 7.166 6.906l.03 .29l.046 .553l.041 .727l.006 .15l.017 .617l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.455 4.687 -2.333 6.65 -6.906 7.166l-.29 .03l-.553 .046l-.727 .041l-.15 .006l-.617 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.687 -.455 -6.65 -2.333 -7.166 -6.906l-.03 -.29l-.046 -.553l-.041 -.727l-.006 -.15l-.017 -.617l-.004 -.318v-.648l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.455 -4.687 2.333 -6.65 6.906 -7.166l.29 -.03l.553 -.046l.727 -.041l.15 -.006l.617 -.017c.21 -.003 .424 -.005 .642 -.005zm.01 13l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -8a1 1 0 0 0 -.993 .883l-.007 .117v4l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z' />
          </svg>
        )}
        {type === 'secondary' && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='currentColor'
            class='fill-indigo-500/80'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M12 2l.642 .005l.616 .017l.299 .013l.579 .034l.553 .046c4.687 .455 6.65 2.333 7.166 6.906l.03 .29l.046 .553l.041 .727l.006 .15l.017 .617l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.455 4.687 -2.333 6.65 -6.906 7.166l-.29 .03l-.553 .046l-.727 .041l-.15 .006l-.617 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.687 -.455 -6.65 -2.333 -7.166 -6.906l-.03 -.29l-.046 -.553l-.041 -.727l-.006 -.15l-.017 -.617l-.004 -.318v-.648l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.455 -4.687 2.333 -6.65 6.906 -7.166l.29 -.03l.553 -.046l.727 -.041l.15 -.006l.617 -.017c.21 -.003 .424 -.005 .642 -.005zm.01 13l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -8a1 1 0 0 0 -.993 .883l-.007 .117v4l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z' />
          </svg>
        )}
        {type === 'success' && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='currentColor'
            class='fill-green-600 dark:fill-green-500/80'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944zm3.697 7.282a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z' />
          </svg>
        )}
        {type === 'warning' && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='currentColor'
            class='fill-yellow-600 dark:fill-yellow-500/80'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M12 1.67c.955 0 1.845 .467 2.39 1.247l.105 .16l8.114 13.548a2.914 2.914 0 0 1 -2.307 4.363l-.195 .008h-16.225a2.914 2.914 0 0 1 -2.582 -4.2l.099 -.185l8.11 -13.538a2.914 2.914 0 0 1 2.491 -1.403zm.01 13.33l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -7a1 1 0 0 0 -.993 .883l-.007 .117v4l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z' />
          </svg>
        )}
        {type === 'danger' && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='currentColor'
            class='fill-red-500/80'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M19 4a1 1 0 0 1 .993 .883l.007 .117v9a1 1 0 0 1 -.883 .993l-.117 .007h-13v6a1 1 0 0 1 -.883 .993l-.117 .007a1 1 0 0 1 -.993 -.883l-.007 -.117v-16a1 1 0 0 1 .883 -.993l.117 -.007h14z' />
          </svg>
        )}
      </div>
    )
  }

  <div class='flex-1'>
    <strong class='block text-base font-semibold'>{title}</strong>
    {content && <p class='text-sm font-normal'>{content}</p>}
  </div>

  {
    dismissible && (
      <button
        data-alert-dismiss
        class='p-1 transition duration-200 ease-in hover:bg-inherit'
        aria-label='Cerrar alerta'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M18 6l-12 12' />
          <path d='M6 6l12 12' />
        </svg>
      </button>
    )
  }
</div>

<script is:inline>
  window.addEventListener('load', () => {
    const alertContainers = document.querySelectorAll('[data-alert-container]')

    alertContainers.forEach((container) => {
      let observer = null
      let dismissButton = null
      let dismissHandler = null

      const initAlert = () => {
        dismissButton = container.querySelector('[data-alert-dismiss]')

        dismissHandler = () => {
          container.classList.add('animate-fade-out')

          setTimeout(() => {
            container.remove()
            cleanUpResources()
          }, 300)
        }

        if (dismissButton) {
          dismissButton.addEventListener('click', dismissHandler)
        }
      }

      const cleanUpResources = () => {
        if (dismissButton && dismissHandler) {
          dismissButton.removeEventListener('click', dismissHandler)
        }

        if (observer) {
          observer.disconnect()
        }

        dismissButton = null
        dismissHandler = null
        observer = null
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
              initAlert()
              observer.unobserve(entry.target)
            }
          })
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0.1
        }
      )

      observer.observe(container)
    })
  })
</script>
`

export const AvatarAstro = `---
interface AvatarProps {
  src?: string
  name?: string
  alt?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  bordered?: boolean
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  dot?: boolean
  dotColor?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
  dotPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

const {
  src,
  name = '',
  alt = '',
  size = 'lg',
  rounded = 'full',
  bordered = false,
  color = 'default',
  dot = false,
  dotColor = 'default',
  dotPosition = 'top-right'
} = Astro.props as AvatarProps

const sizes = {
  xs: 'size-6',
  sm: 'size-8',
  md: 'size-10',
  lg: 'size-12',
  xl: 'size-14',
  xxl: 'size-16',
  xxxl: 'size-20'
} as const

const roundeds = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-lg',
  lg: 'rounded-2xl',
  full: 'rounded-full'
} as const

const borderColors = {
  default: 'border-neutral-100 dark:border-zinc-700',
  primary: 'border-blue-500',
  secondary: 'border-indigo-500',
  success: 'border-green-500',
  warning: 'border-yellow-500',
  danger: 'border-red-500'
} as const

const backgroundColors = {
  default: 'bg-neutral-500/20 dark:bg-zinc-700/60 dark:shadow-zinc-700/20',
  primary: 'bg-blue-500/40 dark:shadow-blue-500/20',
  secondary: 'bg-indigo-500/40 dark:shadow-indigo-500/20',
  success: 'bg-green-500/40 dark:shadow-green-500/20',
  warning: 'bg-yellow-500/40 dark:bg-yellow-500/20 dark:shadow-yellow-500/20',
  danger: 'bg-red-500/20 dark:shadow-red-500/20'
} as const

const dotColors = {
  default: 'bg-neutral-500',
  primary: 'bg-blue-500',
  secondary: 'bg-indigo-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger: 'bg-red-500'
} as const

const dotPositions = {
  'top-left': 'top-0 left-0 transform -translate-x-1/4 -translate-y-1/4',
  'top-right': 'top-0 right-0 transform translate-x-1/4 -translate-y-1/4',
  'bottom-left': 'bottom-0 left-0 transform -translate-x-1/4 translate-y-1/4',
  'bottom-right': 'bottom-0 right-0 transform translate-x-1/4 translate-y-1/4'
} as const

const backgroundClass = backgroundColors[color] || backgroundColors.default
const borderClass = borderColors[color] || borderColors.default
const sizeClass = sizes[size] || sizes.lg
const roundedClass = roundeds[rounded] || roundeds.full
const dotPositionClass = dotPositions[dotPosition] || dotPositions['top-right']
const dotColorClass = dotColors[dotColor] || dotColors.default
---

<div class='relative inline-flex'>
  <div
    class={\`inline-flex items-center justify-center overflow-hidden \${
      bordered ? \`border-2 \${borderClass}\` : ''
    } \${sizeClass} \${roundedClass} \${
      src ? '' : \`backdrop-blur-xl shadow-lg \${backgroundClass}\`
    }\`}
    aria-label={alt || \`Avatar of \${name}\`}
    role='img'
  >
    {
      src ? (
        <img
          src={src}
          alt={alt || \`Avatar of \${name}\`}
          class='w-full h-full object-cover'
        />
      ) : name ? (
        <span class='font-medium text-gray-800 dark:text-gray-300 text-center'>
          {name}
        </span>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='currentColor'
          class='icon icon-tabler icons-tabler-filled icon-tabler-user'
          aria-hidden='true'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z' />
          <path d='M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z' />
        </svg>
      )
    }
  </div>
  {
    dot && (
      <span
        class={\`absolute w-3 h-3 \${dotColorClass} \${dotPositionClass} rounded-full\`}
        aria-hidden='true'
      />
    )
  }
</div>
`

export const BadgeAstro = `---
interface BadgeProps {
  type?: 'default' | 'bordered' | 'icon'
  text?: string
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  dot?: boolean
  dotColor?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
  dotPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  dotText?: string
  icon?: any
  ariaLabel?: string
}

const {
  type = 'default',
  text = 'text',
  color = 'default',
  size = 'md',
  rounded = 'full',
  dot = false,
  dotColor = 'default',
  dotPosition = 'top-right',
  dotText,
  icon,
  ariaLabel
} = Astro.props as BadgeProps

const types = {
  default: 'border-0 shadow-lg backdrop-blur-sm',
  bordered: 'border border-current shadow-lg',
  icon: 'p-1 shadow-lg backdrop-blur-sm'
} as const

const sizes = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
  lg: 'text-base px-4 py-1.5'
} as const

const roundeds = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-lg',
  lg: 'rounded-2xl',
  full: 'rounded-full'
} as const

const colors = {
  default: 'bg-neutral-100/20 dark:shadow-zinc-700/30',
  primary: 'bg-blue-500/40 dark:shadow-blue-500/20',
  secondary: 'bg-indigo-500/40 dark:shadow-indigo-500/20',
  success: 'bg-green-500/40 dark:shadow-green-500/20',
  warning: 'bg-yellow-500/40 dark:shadow-yellow-500/20',
  danger: 'bg-red-500/20 dark:shadow-red-500/20'
} as const

const textColors = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
} as const

const dotColors = {
  default: 'bg-neutral-500',
  primary: 'bg-blue-500',
  secondary: 'bg-indigo-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger: 'bg-red-500'
} as const

const dotPositions = {
  'top-left': 'top-0 left-0 transform -translate-x-1/3 -translate-y-1/3',
  'top-right': 'top-0 right-0 transform translate-x-1/3 -translate-y-1/3',
  'bottom-left': 'bottom-0 left-0 transform -translate-x-1/3 translate-y-1/3',
  'bottom-right': 'bottom-0 right-0 transform translate-x-1/3 translate-y-1/3'
} as const

const typeClass = types[type]
const sizeClass = sizes[size]
const roundedClass = roundeds[rounded]
const colorClass = colors[color]
const textColorClass = textColors[color]
const dotPositionClass = dotPositions[dotPosition]
const dotColorClass = dotColors[dotColor]
---

<span
  class={\`relative inline-flex items-center justify-center font-medium 
    \${sizeClass} \${roundedClass} 
    \${type === 'bordered' ? 'bg-transparent' : colorClass} 
    \${textColorClass} \${typeClass}\`}
  role='status'
  aria-label={ariaLabel || text}
>
  {
    type === 'icon' ? (
      icon ? (
        <span class='inline-block' aria-hidden='true'>
          {icon}
        </span>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='currentColor'
          aria-hidden='true'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M14.235 19c.865 0 1.322 1.024 .745 1.668a3.992 3.992 0 0 1 -2.98 1.332a3.992 3.992 0 0 1 -2.98 -1.332c-.552 -.616 -.158 -1.579 .634 -1.661l.11 -.006h4.471z' />
          <path d='M12 2c1.358 0 2.506 .903 2.875 2.141l.046 .171l.008 .043a8.013 8.013 0 0 1 4.024 6.069l.028 .287l.019 .289v2.931l.021 .136a3 3 0 0 0 1.143 1.847l.167 .117l.162 .099c.86 .487 .56 1.766 -.377 1.864l-.116 .006h-16c-1.028 0 -1.387 -1.364 -.493 -1.87a3 3 0 0 0 1.472 -2.063l.021 -.143l.001 -2.97a8 8 0 0 1 3.821 -6.454l.248 -.146l.01 -.043a3.003 3.003 0 0 1 2.562 -2.29l.182 -.017l.176 -.004z' />
        </svg>
      )
    ) : (
      text
    )
  }

  {
    dot && (
      <span
        class={\`absolute 
        \${dotText ? 'px-1 rounded-md' : 'w-2.5 h-2.5 rounded-full'} 
        \${dotColorClass} \${dotPositionClass}\`}
        aria-hidden={!dotText}
      >
        {dotText}
      </span>
    )
  }
</span>
`

export const ButtonAstro = `---
export interface ButtonProps {
  variant?: 'default' | 'bordered' | 'light' | 'complete'
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  isLoading?: boolean
  id?: string
}

const {
  variant = 'default',
  disabled = false,
  size = 'md',
  rounded = 'md',
  color = 'default',
  isLoading = false,
  id = null
} = Astro.props as ButtonProps

const variants = {
  default: 'border-0 shadow-md backdrop-blur-sm',
  bordered: 'border border-current shadow-md',
  light: '',
  complete: 'backdrop-blur-xl'
}

const sizes = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base',
  xl: 'px-6 py-3.5 text-lg'
}

const roundeds = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}

const colors = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-neutral-100/5',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/20',
  warning: 'bg-yellow-500/30',
  danger: 'bg-red-500/20'
}

const shadowColors = {
  default:
    'shadow-lg shadow-zinc-700/30 shadow-current dark:shadow-neutral-100/20',
  primary: 'shadow-lg shadow-blue-500/20',
  secondary: 'shadow-lg shadow-indigo-500/20 shadow-current',
  success: 'shadow-lg shadow-green-500/30 shadow-current ',
  warning: 'shadow-lg shadow-yellow-500/20 shadow-current',
  danger: 'shadow-lg shadow-red-500/20 shadow-current'
}

const textColors = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-600',
  secondary: 'text-indigo-800 dark:text-indigo-600',
  success: 'text-green-800 dark:text-green-600',
  warning: 'text-yellow-800 dark:text-yellow-600',
  danger: 'text-red-800 dark:text-red-500'
}

const iconColors = {
  default: 'fill-gray-800 dark:fill-gray-300',
  primary: 'fill-blue-800 dark:fill-blue-500',
  secondary: 'fill-indigo-800 dark:fill-indigo-500',
  success: 'fill-green-800 dark:fill-green-500',
  warning: 'fill-yellow-800 dark:fill-yellow-500',
  danger: 'fill-red-800 dark:fill-red-500'
}

const hoverColors = {
  default: 'hover:bg-neutral-100/50 dark:hover:bg-zinc-700/10 ',
  primary: 'hover:bg-blue-500/30',
  secondary: 'hover:bg-indigo-500/40',
  success: 'hover:bg-green-500/50',
  warning: 'hover:bg-yellow-500/60',
  danger: 'hover:bg-red-500/30'
}

const buttonClasses = \`
  group inline-flex items-center justify-center font-medium text-center 
  transition duration-300
  \${variants[variant]} 
  \${sizes[size]} 
  \${roundeds[rounded]} 
  \${
    variant === 'bordered' || variant === 'light'
      ? 'bg-transparent'
      : colors[color]
  }
  \${
    variant === 'complete'
      ? \`text-black dark:text-white \${shadowColors[color]}\`
      : textColors[color]
  }
  \${hoverColors[color]}
  \${disabled || isLoading ? 'opacity-50 cursor-not-allowed gap-2' : ''}
\`
---

<button
  id={id}
  disabled={disabled || isLoading}
  class={buttonClasses.trim()}
  aria-disabled={disabled || isLoading}
  role='button'
  aria-busy={isLoading}
  aria-label={isLoading ? 'Loading' : 'button'}
>
  {
    isLoading && (
      <svg
        class={\`animate-spin h-5 w-5 \${iconColors[color]}\`}
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        aria-hidden='true'
      >
        <circle
          class='opacity-25'
          cx='12'
          cy='12'
          r='10'
          stroke='currentColor'
          stroke-width='4'
        />
        <path
          class='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.964 7.964 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    )
  }
  <slot />
</button>
`

export const ButtonGroupAstro = `---
interface ButtonProps {
  label: string
  icon?: boolean
  id?: string
}

interface ButtonGroupProps {
  buttons: ButtonProps[]
  variant?: 'default' | 'bordered' | 'light'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  disabled?: boolean
}

const {
  buttons,
  variant = 'default',
  color = 'default',
  size = 'md',
  rounded = 'md',
  disabled = false
} = Astro.props as ButtonGroupProps

const variants = {
  default: 'border-0 shadow-md backdrop-blur-sm',
  bordered: 'border border-current',
  light: ''
}

const colors = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/30',
  warning: 'bg-yellow-500/20',
  danger: 'bg-red-500/20'
}

const textColors = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
}

const iconColors = {
  default: 'fill-gray-800 dark:fill-gray-300',
  primary: 'fill-blue-800 dark:fill-blue-500',
  secondary: 'fill-indigo-800 dark:fill-indigo-500',
  success: 'fill-green-800 dark:fill-green-500',
  warning: 'fill-yellow-800 dark:fill-yellow-500',
  danger: 'fill-red-800 dark:fill-red-500'
}

const hoverColors = {
  default: 'hover:bg-neutral-100/50 dark:hover:bg-zinc-700/10',
  primary: 'hover:bg-blue-500/30 dark:hover:bg-blue-500/10',
  secondary: 'hover:bg-indigo-500/30 dark:hover:bg-indigo-500/20',
  success: 'hover:bg-green-500/60 dark:hover:bg-green-500/30',
  warning: 'hover:bg-yellow-500/60 dark:hover:bg-yellow-500/30',
  danger: 'hover:bg-red-500/30 dark:hover:bg-red-500/10'
}

const shadowColors = {
  default:
    'shadow-md shadow-zinc-700/30 shadow-current dark:shadow-neutral-100/20',
  primary: 'shadow-md shadow-blue-500/20',
  secondary: 'shadow-md shadow-indigo-500/20',
  success: 'shadow-md shadow-green-500/30',
  warning: 'shadow-md shadow-yellow-500/30',
  danger: 'shadow-md shadow-red-500/20'
}

const sizes = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base',
  xl: 'px-6 py-3.5 text-lg'
}

const roundeds = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}

const roundedS = {
  none: 'rounded-s-none',
  sm: 'rounded-s-sm',
  md: 'rounded-s-md',
  lg: 'rounded-s-lg',
  full: 'rounded-s-full'
}

const roundedE = {
  none: 'rounded-e-none',
  sm: 'rounded-e-sm',
  md: 'rounded-e-md',
  lg: 'rounded-e-lg',
  full: 'rounded-e-full'
}

const groupClass = \`
  \${variants[variant]}
  \${sizes[size]}
  \${variant === 'bordered' || variant === 'light' ? 'bg-transparent' : colors[color]}
  \${variant === 'default' ? shadowColors[color] : ''}
  \${textColors[color]}
  \${hoverColors[color]}
  \${disabled ? 'opacity-50 cursor-not-allowed' : ''}
\`
---

<div
  class={\`inline-flex overflow-hidden \${
    variant === 'default' ? shadowColors[color] : ''
  } \${roundeds[rounded]}\`}
  role='group'
  aria-label='Button group'
>
  {
    buttons.map((button, index) => (
      <button
        id={button.id || \`btn-\${index}\`}
        type='button'
        class={\`inline-flex gap-x-1 items-center font-medium transition duration-300 \${groupClass}
        \${
          index === 0
            ? roundedS[rounded]
            : index === buttons.length - 1
              ? roundedE[rounded]
              : 'border-l-0'
        }\`}
        id={\`btn-\${index}\`}
        aria-label={button.label}
        disabled={disabled}
      >
        {button.icon && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='currentColor'
            class={\`\${iconColors[color]}\`}
            aria-hidden='true'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M15 2a1 1 0 0 1 .117 1.993l-.117 .007c-.693 0 -1.33 .694 -1.691 1.552a5.1 5.1 0 0 1 1.982 -.544l.265 -.008c2.982 0 5.444 3.053 5.444 6.32c0 3.547 -.606 5.862 -2.423 8.578c-1.692 2.251 -4.092 2.753 -6.41 1.234a.31 .31 0 0 0 -.317 -.01c-2.335 1.528 -4.735 1.027 -6.46 -1.27c-1.783 -2.668 -2.39 -4.984 -2.39 -8.532l.004 -.222c.108 -3.181 2.526 -6.098 5.44 -6.098c.94 0 1.852 .291 2.688 .792c.419 -1.95 1.818 -3.792 3.868 -3.792m-7.034 6.154c-1.36 .858 -1.966 2.06 -1.966 3.846a1 1 0 0 0 2 0c0 -1.125 .28 -1.678 1.034 -2.154a1 1 0 1 0 -1.068 -1.692' />
          </svg>
        )}
        {button.label}
      </button>
    ))
  }
</div>
`

export const CheckboxAstro = `---
interface CheckboxProps {
  id: string
  label: string
  variant?: 'default' | 'bordered' | 'light'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  checked?: boolean
  disabled?: boolean
}

const {
  id,
  label,
  variant = 'default',
  color = 'default',
  size = 'md',
  rounded = 'lg',
  checked = false,
  disabled = false
} = Astro.props as CheckboxProps

const variants = {
  default: 'border-0 shadow-lg backdrop-blur-sm saturate-100',
  bordered: 'border shadow-md',
  light: ''
}

const colors = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/30',
  warning: 'bg-yellow-500/40 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
}

const checkColors = {
  default: 'bg-neutral-100/50 dark:bg-zinc-700/50',
  primary: 'bg-blue-500/30 ',
  secondary: 'bg-indigo-500/30 ',
  success: 'bg-green-500/40 ',
  warning: 'bg-yellow-500/50 dark:bg-yellow-500/20 ',
  danger: 'bg-red-500/30 '
}

const borderColors = {
  default: 'border-gray-800 dark:border-gray-300',
  primary: 'border-blue-800 dark:border-blue-500',
  secondary: 'border-indigo-800 dark:border-indigo-500',
  success: 'border-green-800 dark:border-green-500',
  warning: 'border-yellow-800 dark:border-yellow-500',
  danger: 'border-red-800 dark:border-red-500'
}

const textColors = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
}

const hoverColors = {
  default: 'hover:bg-neutral-100 dark:hover:bg-zinc-700/20 ',
  primary: 'hover:bg-blue-500/50 dark:hover:bg-blue-500/50',
  secondary: 'hover:bg-indigo-500/50 dark:hover:bg-indigo-500/50',
  success: 'hover:bg-green-500/80 dark:hover:bg-green-500/60',
  warning: 'hover:bg-yellow-500/80 dark:hover:bg-yellow-500/50',
  danger: 'hover:bg-red-500/50 dark:hover:bg-red-500/50'
}

const sizes = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base',
  xl: 'px-6 py-3.5 text-lg'
}

const roundeds = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}
---

<label
  for={id}
  class={\`flex items-center space-x-2 \${variants[variant]}
    \${variant === 'default' && colors[color]}
    \${variant !== 'light' && sizes[size]}
    \${variant === 'bordered' && borderColors[color]}}
    \${roundeds[rounded]} \${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}\`}
>
  <div
    class={\`relative w-5 h-5
    \${checkColors[color]}
    \${roundeds[rounded]}
    \${hoverColors[color]}
    transition duration-300 ease-in-out
  \`}
  >
    <input
      type='checkbox'
      id={id}
      class='peer absolute inset-0 w-full h-full opacity-0 cursor-pointer'
      checked={checked}
      disabled={disabled}
    />

    <svg
      xmlns='http://www.w3.org/2000/svg'
      class={\`absolute inset-0 m-auto w-4 h-4 transition-opacity duration-300
        opacity-0 peer-checked:opacity-100
        \${textColors[color]}\`}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
      aria-hidden='true'
    >
      <path d='M5 12l5 5l10 -10'></path>
    </svg>
  </div>

  <span class={textColors[color]}> {label} </span>
</label>
`

export const CheckboxGroupAstro = `---
import Checkbox from './Checkbox.astro'

interface CheckboxItem {
  id: string
  label: string
  variant?: 'default' | 'bordered' | 'light'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  checked?: boolean
  disabled?: boolean
}

interface CheckboxGroupProps {
  title?: string
  checkboxes: CheckboxItem[]
  variant?: 'default' | 'bordered' | 'light'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  orientation?: 'horizontal' | 'vertical'
}

const {
  title = '',
  checkboxes = [],
  variant = 'default',
  color = 'default',
  size = 'md',
  rounded = 'md',
  orientation = 'horizontal'
} = Astro.props as CheckboxGroupProps

// Generar ID único
const generateId = (prefix: string) => {
  const random = crypto.getRandomValues(new Uint32Array(1))[0].toString(36)
  return \`\${prefix}-\${random}\`
}

// Configuraciones de estilo
const variants = {
  default: 'border-0 shadow-lg backdrop-blur-sm',
  bordered: 'border shadow-md',
  light: ''
}

const colors = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/30',
  warning: 'bg-yellow-500/40 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
}

const textColors = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
}

const borderColors = {
  default: 'border-gray-800 dark:border-gray-300',
  primary: 'border-blue-800 dark:border-blue-500',
  secondary: 'border-indigo-800 dark:border-indigo-500',
  success: 'border-green-800 dark:border-green-500',
  warning: 'border-yellow-800 dark:border-yellow-500',
  danger: 'border-red-800 dark:border-red-500'
}

const sizes = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base',
  xl: 'px-6 py-3.5 text-lg'
}

const roundeds = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}

// Generar IDs
const groupId = title
  ? generateId(title.replace(/\\s+/g, '-').toLowerCase())
  : undefined
const checkboxGroupId = generateId('checkbox-group')

// Contenido del script
const scriptContent = \`
  (function() {
    const group = document.getElementById('\${checkboxGroupId}');
    if (group) {
      group.addEventListener('change', (e) => {
        if (e.target.type === 'checkbox') {
          const checkboxes = [...group.querySelectorAll('input[type="checkbox"]')]
            .map(input => ({
              id: input.id,
              checked: input.checked
            }));
          
          const event = new CustomEvent('checkbox-change', {
            detail: checkboxes,
            bubbles: true,
            composed: true
          });
          group.dispatchEvent(event);
        }
      });
    }
  })();
\`
---

<div
  class={\`flex flex-col gap-2 \${variants[variant]} \${sizes[size]} \${
    variant === 'default' && colors[color]
  } \${variant === 'bordered' && borderColors[color]} \${textColors[color]} \${
    variant !== 'light' && roundeds[rounded]
  }\`}
  role='group'
  aria-labelledby={groupId}
>
  {
    title && (
      <h3 id={groupId} class='text-lg font-semibold'>
        {title}
      </h3>
    )
  }

  <div
    class={\`flex gap-2 \${orientation === 'vertical' ? 'flex-col' : 'flex-row'}\`}
    id={checkboxGroupId}
  >
    {
      checkboxes.map(({ id, label, checked = false, disabled = false }) => {
        const uniqueId = \`\${checkboxGroupId}-\${id}\`
        return (
          <Checkbox
            id={uniqueId}
            label={label}
            checked={checked}
            disabled={disabled}
            variant='light'
            color={color}
            size={size}
            rounded={rounded}
          />
        )
      })
    }
  </div>
</div>

<script is:inline set:html={scriptContent} />
`

export const CodeAstro = `---
interface CodeProps {
  codeString: string
  language?: string
  variant?: 'default' | 'bordered' | 'light'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
}

const {
  codeString,
  language = 'bash',
  variant = 'default',
  color = 'default',
  size = 'md',
  rounded = 'md'
} = Astro.props as CodeProps

type StyleObject = Record<string, string>

const variants: StyleObject = {
  default: 'border-0 shadow-lg backdrop-blur-sm',
  bordered: 'border shadow-md',
  light: ''
}

const colors: StyleObject = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/30',
  warning: 'bg-yellow-500/40 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
}

const textColors: StyleObject = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
}

const borderColors: StyleObject = {
  default: 'border-gray-800 dark:border-gray-300',
  primary: 'border-blue-800 dark:border-blue-500',
  secondary: 'border-indigo-800 dark:border-indigo-500',
  success: 'border-green-800 dark:border-green-500',
  warning: 'border-yellow-800 dark:border-yellow-500',
  danger: 'border-red-800 dark:border-red-500'
}

const hoverColors: StyleObject = {
  default: 'hover:bg-neutral-100 dark:hover:bg-zinc-700/50',
  primary: 'hover:bg-blue-500/50 dark:hover:bg-blue-500/50',
  secondary: 'hover:bg-indigo-500/50 dark:hover:bg-indigo-500/50',
  success: 'hover:bg-green-500/80 dark:hover:bg-green-500/60',
  warning: 'hover:bg-yellow-500/80 dark:hover:bg-yellow-500/50',
  danger: 'hover:bg-red-500/50 dark:hover:bg-red-500/50'
}

const sizes: StyleObject = {
  sm: 'text-xs px-1 py-1',
  md: 'text-sm px-2 py-1.5',
  lg: 'text-base px-4 py-2',
  xl: 'text-base px-6 py-2.5'
}

const roundeds: StyleObject = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}

const getStyle = (obj: StyleObject, key: string, fallback: string = '') => {
  return key in obj ? obj[key] : fallback
}
---

<div
  class={\`inline-flex justify-around items-center gap-x-4 overflow-auto
    \${getStyle(variants, variant)}
    \${getStyle(sizes, size)}
    \${getStyle(roundeds, rounded)}
    \${variant === 'bordered' ? getStyle(borderColors, color) : ''}
    \${variant === 'default' ? getStyle(colors, color) : ''}
    \${getStyle(textColors, color)}
  \`}
  role='region'
  aria-label='Code block with copy button'
  data-code={codeString}
>
  <pre
    class='flex items-center justify-center'
    aria-live='polite'>
    <code class={\`language-\${language}\`}>{codeString}</code>
  </pre>

  <button
    class={\`copy-button flex text-white px-1.5 py-1 rounded-lg transition duration-300 ease-out \{getStyle(hoverColors, color)}\`}
    aria-label='Copy code to clipboard'
  >
    <div class='inline-flex items-center'>
      <svg
        class='copy-icon absolute right-0 transition-opacity duration-200 size-4'
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
        <path
          d='M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z'
        ></path>
        <path
          d='M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1'
        ></path>
      </svg>

      <svg
        class='check-icon absolute right-0 opacity-0 transition-opacity duration-200 size-4'
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
        <path
          d='M7 9.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z'
        ></path>
        <path
          d='M4.012 16.737a2 2 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1'
        ></path>
        <path d='M11 14l2 2l4 -4'></path>
      </svg>
    </div>
  </button>
</div>

<script is:inline>
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.copy-button').forEach((button) => {
      const copyIcon = button.querySelector('.copy-icon')
      const checkIcon = button.querySelector('.check-icon')
      const code = button.closest('[data-code]').dataset.code

      button.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(code)

          copyIcon.classList.add('opacity-0')
          checkIcon.classList.remove('opacity-0')

          setTimeout(() => {
            checkIcon.classList.add('opacity-0')
            copyIcon.classList.remove('opacity-0')
          }, 2000)
        } catch (err) {
          console.error('Error al copiar:', err)
        }
      })
    })
  })
</script>

<style>
  .copy-button {
    position: relative;
  }

  .copy-icon,
  .check-icon {
    transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: opacity;
  }
</style>
`

export const DateInputAstro = `---
interface DateInputProps {
  label?: string
  value?: string
  variant?: 'default' | 'bordered' | 'light'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  size?: 'sm' | 'md' | 'lg'
  icon?: boolean
  disabled?: boolean
}

const {
  label = '',
  value = '',
  variant = 'default',
  color = 'default',
  rounded = 'md',
  size = 'md',
  icon = true,
  disabled = false
} = Astro.props as DateInputProps

const uuid = crypto.randomUUID()
const inputId = \`date-input-\${uuid}\`
const containerId = \`date-container-\${uuid}\`

const variants = {
  default: 'border-0 shadow-lg backdrop-blur-sm',
  bordered: 'border shadow-md',
  light: ''
}

const colors = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/30',
  warning: 'bg-yellow-500/40 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
}

const textColors = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
}

const borderColors = {
  default: 'border-gray-800 dark:border-gray-300',
  primary: 'border-blue-800 dark:border-blue-500',
  secondary: 'border-indigo-800 dark:border-indigo-500',
  success: 'border-green-800 dark:border-green-500',
  warning: 'border-yellow-800 dark:border-yellow-500',
  danger: 'border-red-800 dark:border-red-500'
}

const hoverColors = {
  default: 'hover:bg-neutral-100/50 dark:hover:bg-zinc-700/50',
  primary: 'hover:bg-blue-500/50 dark:hover:bg-blue-500/50',
  secondary: 'hover:bg-indigo-500/50 dark:hover:bg-indigo-500/50',
  success: 'hover:bg-green-500/80 dark:hover:bg-green-500/60',
  warning: 'hover:bg-yellow-500/80 dark:hover:bg-yellow-500/50',
  danger: 'hover:bg-red-500/50 dark:hover:bg-red-500/50'
}

const sizes = {
  sm: 'text-xs p-2',
  md: 'text-sm p-3',
  lg: 'text-base p-4'
}

const roundeds = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}
---

<div
  class={\`flex flex-col gap-2 
    \${disabled && 'opacity-50 cursor-not-allowed'} 
    \${sizes[size]} 
    \${variants[variant]}
    \${variant === 'default' && colors[color]} 
    \${variant === 'bordered' && borderColors[color]} 
    \${roundeds[rounded]}
    transition duration-300 ease-in 
    \${hoverColors[color]}\`}
>
  {
    label && (
      <label for={inputId} class={\`\${textColors[color]}\`}>
        {label}
      </label>
    )
  }

  <div
    class={\`w-full flex items-center cursor-pointer \${textColors[color]}\`}
    id={containerId}
  >
    <input
      id={inputId}
      type='date'
      value={value}
      aria-label={label || 'Select a date'}
      aria-disabled={disabled}
      class='w-full bg-transparent focus:outline-none custom-date-input cursor-pointer'
      {disabled}
    />

    {
      icon && (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          class='size-5'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          stroke-width='2'
          role='img'
          aria-hidden='true'
        >
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            d='M8 7V3m8 4V3m-9 9h10m-4 8h4a2 2 0 002-2v-7a2 2 0 00-2-2H7a2 2 0 00-2 2v7a2 2 0 002 2h4z'
          />
        </svg>
      )
    }
  </div>
</div>

<script define:vars={{ disabled, inputId, containerId }}>
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById(containerId)
    const dateInput = document.getElementById(inputId)

    if (!disabled && container && dateInput) {
      container.addEventListener('click', () => {
        try {
          dateInput.showPicker()
        } catch (e) {
          console.warn(e)
        }
      })

      dateInput.addEventListener('change', (e) => {
        const selected = e.target.value
        const changeEvent = new CustomEvent('datechange', {
          detail: { value: selected },
          bubbles: true
        })
        dateInput.dispatchEvent(changeEvent)
      })
    }
  })
</script>
`

export const ImageAstro = `---
interface ImageProps {
  imageSrc: string
  alt?: string
  zoomedWrapper?: boolean
  filter?: 'none' | 'blur' | 'grayscale' | 'sepia'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const {
  imageSrc,
  alt = 'img preview',
  zoomedWrapper = false,
  filter = 'none',
  rounded = 'md',
  shadow = 'md',
  className = ''
} = Astro.props as ImageProps

const filters = {
  none: '',
  blur: 'blur-lg',
  grayscale: 'grayscale',
  sepia: 'sepia'
}

const roundeds = {
  none: 'rounded-none',
  sm: 'rounded-md',
  md: 'rounded-lg',
  lg: 'rounded-2xl',
  full: 'rounded-full'
}

const shadows = {
  none: 'shadow-none',
  sm: 'shadow-xs',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl'
}

const zoomed = zoomedWrapper
  ? 'transition-transform duration-500 ease-in-out transform group-hover:scale-110'
  : ''
---

<div class='relative' role='img' aria-label={alt}>
  <div
    class={\`overflow-hidden group \${roundeds[rounded]} \${shadows[shadow]} dark:shadow-neutral-100/20\`}
  >
    <img
      src={imageSrc}
      alt={alt}
      class={\`
        object-cover 
        \${filters[filter]} 
        \${filter !== 'blur' ? zoomed : ''} 
        \${roundeds[rounded]}
        \${className === '' ? 'w-full h-full' : ''}
        \${className}
      \`}
    />

    {
      filter === 'blur' && (
        <div class='absolute inset-0 flex items-center justify-center'>
          <img
            src={imageSrc}
            alt={alt}
            class={\`size-6/7 object-cover shadow-lg \${roundeds[rounded]} \${zoomed}\`}
          />
        </div>
      )
    }
  </div>
</div>
`

export const LinkAstro = `---
interface LinkProps {
  variant?: 'default' | 'bordered' | 'light'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  isDisabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  underline?: 'none' | 'hover' | 'always' | 'active'
  isExternal?: boolean
  defaultIcon?: boolean
  href?: string
  ariaLabel?: string
}

const {
  variant = 'light',
  color = 'default',
  rounded = 'md',
  isDisabled = false,
  size = 'md',
  underline = 'hover',
  isExternal = false,
  defaultIcon = false,
  href = '#',
  ariaLabel = ''
} = Astro.props as LinkProps

const variants = {
  default: 'border-0 shadow-md backdrop-blur-sm px-3 py-1',
  bordered: 'border shadow-lg px-3 py-1',
  light: ''
}

const colors = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-neutral-100/10',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/30',
  warning: 'bg-yellow-500/40 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
}

const textColors = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-600',
  secondary: 'text-indigo-800 dark:text-indigo-600',
  success: 'text-green-800 dark:text-green-600',
  warning: 'text-yellow-800 dark:text-yellow-600',
  danger: 'text-red-800 dark:text-red-500'
}

const borderColors = {
  default: 'border-gray-800 dark:border-gray-300',
  primary: 'border-blue-800 dark:border-blue-500',
  secondary: 'border-indigo-800 dark:border-indigo-500',
  success: 'border-green-800 dark:border-green-500',
  warning: 'border-yellow-800 dark:border-yellow-500',
  danger: 'border-red-800 dark:border-red-500'
}

const sizeStyles = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg'
}

const iconSizeStyles = {
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6'
}

const roundeds = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}

const underlineStyles = {
  none: 'no-underline',
  hover: 'hover:underline',
  always: 'underline',
  active: 'active:underline'
}

const disabledStyles = isDisabled
  ? 'opacity-50 cursor-not-allowed pointer-events-none'
  : ''

const className = \`flex items-center justify-center text-center gap-2 transition-colors duration-200 \${
  variants[variant]
} \${variant === 'default' ? colors[color] : ''} \${sizeStyles[size]} \${
  textColors[color]
} \${variant === 'bordered' ? borderColors[color] : ''} \${
  variant !== 'light' ? roundeds[rounded] : ''
} \${underlineStyles[underline]} \${disabledStyles}\`

const iconSize = iconSizeStyles[size]
---

<a
  class={className}
  href={href}
  aria-label={ariaLabel}
  target={isExternal ? '_blank' : undefined}
  rel={isExternal ? 'noopener noreferrer' : undefined}
>
  <slot />
  {
    defaultIcon && (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
        class={iconSize}
        aria-hidden='true'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M9 15l6 -6' />
        <path d='M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464' />
        <path d='M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463' />
      </svg>
    )
  }
</a>
`

export const SliderAstro = `---
interface SliderProps {
  min?: number
  max?: number
  step?: number
  value?: number
  showValue?: boolean
  label?: string
  startContent?: any
  endContent?: any
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  textColor?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
  size?: 'sm' | 'md' | 'lg'
  sliderLength?: 'sm' | 'md' | 'lg' | 'full'
  thumbRadius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  showThumb?: boolean
  id?: string
}

const {
  min = 0,
  max = 100,
  step = 1,
  value = 0,
  showValue = true,
  label = '',
  disabled = false,
  orientation = 'horizontal',
  color = 'default',
  textColor = 'default',
  size = 'md',
  sliderLength = 'md',
  thumbRadius = 'full',
  showThumb = true,
  startContent = null,
  endContent = null,
  id
} = Astro.props as SliderProps

const textColors = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-600',
  secondary: 'text-indigo-600',
  success: 'text-green-600',
  warning: 'text-yellow-600',
  danger: 'text-red-600'
}

const colors = {
  default: 'bg-neutral-100/90 dark:bg-zinc-700/90',
  primary: 'bg-blue-500/40 ',
  secondary: 'bg-indigo-500/40 ',
  success: 'bg-green-500/40 ',
  warning: 'bg-yellow-500/40',
  danger: 'bg-red-500/40 '
}

const thumbColors = {
  default: 'bg-neutral-100 dark:bg-zinc-700',
  primary: 'bg-blue-500',
  secondary: 'bg-indigo-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger: 'bg-red-500'
}

const thumbSizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-7 h-7'
}

const thumbRadiuses = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}

const verticalBarSizes = {
  sm: 'w-4',
  md: 'w-5',
  lg: 'w-7'
}

const horizontalBarSizes = {
  sm: 'h-4',
  md: 'h-5',
  lg: 'h-7'
}

const sliderWidth = {
  sm: 'w-40',
  md: 'w-64',
  lg: 'w-96',
  full: 'w-full'
}

const sliderHeight = {
  sm: 'h-40',
  md: 'h-64',
  lg: 'h-96',
  full: 'h-full'
}
---

<div
  id={id}
  class={\`slider-container flex items-center justify-center \${
    orientation === 'horizontal' ? 'flex-col' : 'flex-col-reverse gap-y-4'
  } \${textColors[textColor]}\`}
  data-min={min}
  data-max={max}
  data-step={step}
  data-value={value}
  data-orientation={orientation}
  data-disabled={disabled}
>
  <div class='flex items-center'>
    {label && <span class='text-sm mr-2'>{label}</span>}
    {showValue && <span class='slider-value text-sm'>{value}</span>}
  </div>

  <div
    class={\`flex justify-between items-center \${
      orientation === 'horizontal' ? 'flex-row space-x-2' : 'flex-col space-y-2'
    }\`}
  >
    {startContent && <span class='flex items-center'>{startContent}</span>}

    <div
      class={\`slider-track relative \${
        orientation === 'horizontal'
          ? \`\${sliderWidth[sliderLength]} h-10\`
          : \`\${sliderHeight[sliderLength]} w-10\`
      } \${disabled ? 'opacity-50' : ''}\`}
    >
      <div
        class={\`absolute \${
          orientation === 'horizontal'
            ? \`top-1/2 left-0 w-full \${horizontalBarSizes[size]} -translate-y-1/2\`
            : \`left-1/2 top-0 h-full \${verticalBarSizes[size]} -translate-x-1/2\`
        } backdrop-blur-sm shadow-md bg-neutral-100/20 dark:bg-zinc-700/30 rounded-md \${
          disabled ? 'cursor-not-allowed' : 'cursor-pointer'
        }\`}
      >
        <div
          class={\`slider-fill absolute \${
            orientation === 'horizontal'
              ? 'left-0 top-0 h-full'
              : 'bottom-0 left-0 w-full'
          } \${colors[color]} rounded-md\`}
        >
        </div>
      </div>

      <div
        class={\`slider-thumb absolute \${
          orientation === 'horizontal'
            ? 'top-1/2 -translate-y-1/2 -translate-x-1/2 left-0'
            : 'left-1/2 -translate-x-1/2 -translate-y-1/2 top-0'
        } \${thumbSizes[size]} \${thumbRadiuses[thumbRadius]} \${
          showThumb &&
          \`\${thumbColors[color]} border-2 border-zinc-700/30 dark:border-neutral-100/20\`
        } shadow-sm \${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}\`}
        tabindex={disabled ? -1 : 0}
        role='slider'
        aria-valuemin={min}
        aria-valuemax={max}
        aria-orientation={orientation}
        aria-disabled={disabled}
      >
      </div>
    </div>

    {endContent && <span class='flex items-center'>{endContent}</span>}
  </div>
</div>

<script>
  function initializeSlider(container) {
    const track = container.querySelector('.slider-track')
    const thumb = container.querySelector('.slider-thumb')
    const fill = container.querySelector('.slider-fill')
    const valueDisplay = container.querySelector('.slider-value')

    const min = Number(container.dataset.min)
    const max = Number(container.dataset.max)
    const step = Number(container.dataset.step)
    const orientation = container.dataset.orientation
    const disabled = container.dataset.disabled === 'true'
    let value = Number(container.dataset.value) || min

    const dispatchChangeEvent = () => {
      const event = new CustomEvent('slider-change', {
        detail: {
          value: value,
          id: container.id
        },
        bubbles: true
      })
      container.dispatchEvent(event)
    }

    const updateSliderUI = () => {
      const percent = ((value - min) / (max - min)) * 100
      if (orientation === 'horizontal') {
        thumb.style.left = \`\${percent}%\`
        fill.style.width = \`\${percent}%\`
      } else {
        thumb.style.top = \`\${100 - percent}%\`
        fill.style.height = \`\${percent}%\`
      }
      if (valueDisplay) valueDisplay.textContent = value.toString()
      thumb.setAttribute('aria-valuenow', value.toString())
      dispatchChangeEvent()
    }

    const setValueFromPosition = (clientX: number, clientY: number) => {
      const rect = track.getBoundingClientRect()
      let percent
      if (orientation === 'horizontal') {
        percent = (clientX - rect.left) / rect.width
      } else {
        percent = (rect.bottom - clientY) / rect.height
      }
      const rawValue = min + percent * (max - min)
      value = Math.round(rawValue / step) * step
      value = Math.max(min, Math.min(max, value))
      updateSliderUI()
    }

    const onMouseMove = (e: MouseEvent) => {
      if (disabled) return
      setValueFromPosition(e.clientX, e.clientY)
    }

    const onTouchMove = (e: TouchEvent) => {
      if (disabled || !e.touches.length) return
      const touch = e.touches[0]
      setValueFromPosition(touch.clientX, touch.clientY)
    }

    const stopDragging = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', stopDragging)
      document.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('touchend', stopDragging)
    }

    thumb.addEventListener('mousedown', (e: MouseEvent) => {
      if (disabled) return
      e.preventDefault()
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', stopDragging)
    })

    thumb.addEventListener('touchstart', (e: TouchEvent) => {
      if (disabled) return
      document.addEventListener('touchmove', onTouchMove)
      document.addEventListener('touchend', stopDragging)
    })

    track.addEventListener('click', (e: MouseEvent) => {
      if (disabled) return
      setValueFromPosition(e.clientX, e.clientY)
    })

    thumb.addEventListener('keydown', (e: KeyboardEvent) => {
      if (disabled) return
      if (['ArrowRight', 'ArrowUp'].includes(e.key)) {
        value = Math.min(max, value + step)
      } else if (['ArrowLeft', 'ArrowDown'].includes(e.key)) {
        value = Math.max(min, value - step)
      }
      updateSliderUI()
    })

    updateSliderUI()
  }

  document.querySelectorAll('.slider-container').forEach(initializeSlider)
</script>
`

export const SpinnerAstro = `---
interface SpinnerProps {
  label?: string
  variant?: 'default' | 'light'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  textColor?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
}

const {
  label = '',
  variant = 'default',
  size = 'md',
  color = 'default',
  textColor = 'default'
} = Astro.props as SpinnerProps

const variants = {
  default: 'backdrop-blur-sm shadow-lg',
  light: ''
}

const sizes = {
  xs: 'size-4',
  sm: 'size-6',
  md: 'size-8',
  lg: 'size-10',
  xl: 'size-12'
}

const firstCircleColors = {
  default: 'border-zinc-500',
  primary: 'border-blue-500',
  secondary: 'border-indigo-500',
  success: 'border-green-500',
  warning: 'border-yellow-500',
  danger: 'border-red-500'
}

const secondCircleColors = {
  default: 'border-zinc-400',
  primary: 'border-blue-300',
  secondary: 'border-indigo-300',
  success: 'border-green-300',
  warning: 'border-yellow-300',
  danger: 'border-red-300'
}

const textColors = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-600',
  secondary: 'text-indigo-800 dark:text-indigo-600',
  success: 'text-green-800 dark:text-green-600',
  warning: 'text-yellow-800 dark:text-yellow-600',
  danger: 'text-red-800 dark:text-red-500'
}
---

<div
  class='flex flex-col items-center justify-center space-y-2'
  role='status'
  aria-live='polite'
  aria-label={label || 'Loading'}
>
  <div class='relative'>
    <div class={\`relative rounded-full \${variants[variant]} \${sizes[size]}\`}>
      <div
        class={\`absolute w-full h-full rounded-full border-4 border-t-transparent border-r-transparent border-l-transparent \${firstCircleColors[color]} animate-spin\`}
      >
      </div>
      <div
        class={\`absolute w-full h-full rounded-full border-4 border-t-transparent border-b-transparent border-l-transparent \${secondCircleColors[color]} animate-spin\`}
      >
      </div>
    </div>
  </div>
  {label && <span class={\`text-sm \${textColors[textColor]}\`}>{label}</span>}
</div>
`

export const SwitchAstro = `---
interface SwitchProps {
  label?: string
  startContent?: string
  endContent?: string
  thumbIcon?: string
  isSelected?: boolean
  isReadOnly?: boolean
  isDisabled?: boolean
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  textColor?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  id?: string
}

const {
  label,
  isSelected: initialSelected = false,
  isReadOnly = false,
  isDisabled = false,
  color = 'default',
  textColor = 'default',
  rounded = 'full',
  size = 'md',
  id
  // Las props startContent, endContent, thumbIcon se manejan con slots
} = Astro.props as SwitchProps

const colors = {
  default: 'bg-zinc-700/30 dark:bg-neutral-100/20 dark:shadow-zinc-700/20',
  primary: 'bg-blue-500/50',
  secondary: 'bg-indigo-500/50',
  success: 'bg-green-500/50',
  warning: 'bg-yellow-500/50',
  danger: 'bg-red-500/50'
}

const textColors = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-600',
  secondary: 'text-indigo-800 dark:text-indigo-600',
  success: 'text-green-800 dark:text-green-600',
  warning: 'text-yellow-800 dark:text-yellow-600',
  danger: 'text-red-800 dark:text-red-500'
}

const roundeds = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}

const sizes = {
  sm: 'h-6 w-11',
  md: 'h-8 w-16',
  lg: 'h-9 w-16',
  xl: 'h-10 w-20'
}

const textSizes = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl'
}

const circleSizes = {
  sm: 'size-5',
  md: 'size-6',
  lg: 'size-7',
  xl: 'size-9'
}

const circleTranslate = {
  sm: 'translate-x-4',
  md: 'translate-x-8',
  lg: 'translate-x-7',
  xl: 'translate-x-9'
}

const contentSizes = {
  sm: 'text-sm size-5',
  md: 'text-base size-6',
  lg: 'text-lg size-7',
  xl: 'text-xl size-9'
}

const uniqueId = id || \`switch-\${Math.random().toString(36).substring(2, 9)}\`

const wrapperBaseClass = 'flex items-center space-x-2 switch-component-wrapper'
const wrapperCursorClass = isDisabled
  ? 'opacity-50 cursor-not-allowed'
  : 'cursor-pointer'

const switchTrackBaseClass =
  'flex items-center border-0 shadow-xl backdrop-blur-md transition-colors switch-track'
const switchTrackSelectedClass = initialSelected ? colors[color] : 'bg-gray-300'

const thumbBaseClass = \`absolute bg-neutral-100 shadow-lg transform transition-transform switch-thumb \${circleSizes[size]} \${roundeds[rounded]}\`
const thumbTranslateClass = initialSelected
  ? circleTranslate[size]
  : 'translate-x-0'

const hasLabel = !!label
const hasStartContent = Astro.slots.has('startContent')
const hasEndContent = Astro.slots.has('endContent')
const hasThumbIcon = Astro.slots.has('thumbIcon')
---

<div
  class:list={[wrapperBaseClass, wrapperCursorClass]}
  role='switch'
  aria-checked={initialSelected}
  aria-disabled={isDisabled}
  tabindex={isDisabled ? -1 : 0}
  data-color={color}
  data-size={size}
>
  {
    hasLabel && (
      <label
        for={uniqueId}
        class:list={[textSizes[size], textColors[textColor]]}
      >
        {label}
      </label>
    )
  }
  <div
    class:list={[
      switchTrackBaseClass,
      switchTrackSelectedClass,
      roundeds[rounded],
      sizes[size]
    ]}
  >
    <input
      type='checkbox'
      id={uniqueId}
      class='hidden'
      checked={initialSelected}
      readonly={isReadOnly}
      disabled={isDisabled}
      aria-hidden='true'
    />
    <div class='flex items-center justify-between w-full px-1 relative'>
      {
        hasStartContent && (
          <span
            class:list={[
              'flex items-center justify-center',
              contentSizes[size]
            ]}
          >
            <slot name='startContent' />
          </span>
        )
      }
      <div class:list={[thumbBaseClass, thumbTranslateClass]}>
        {
          hasThumbIcon && (
            <span
              class:list={[
                'flex items-center justify-center w-full h-full',
                contentSizes[size]
              ]}
            >
              <slot name='thumbIcon' />
            </span>
          )
        }
      </div>
      {
        hasEndContent && (
          <span
            class:list={[
              'flex items-center justify-center',
              contentSizes[size]
            ]}
          >
            <slot name='endContent' />
          </span>
        )
      }
    </div>
  </div>
</div>

<script
  define:vars={{
    scriptInitialSelected: initialSelected,
    scriptIsReadOnly: isReadOnly,
    scriptIsDisabled: isDisabled,
    scriptColor: color,
    scriptSize: size
  }}
>
  const SCRIPT_COLORS = {
    default: 'bg-zinc-700/30 dark:bg-neutral-100/20 dark:shadow-zinc-700/20',
    primary: 'bg-blue-500/50',
    secondary: 'bg-indigo-500/50',
    success: 'bg-green-500/50',
    warning: 'bg-yellow-500/50',
    danger: 'bg-red-500/50'
  }
  const SCRIPT_CIRCLE_TRANSLATE = {
    sm: 'translate-x-4',
    md: 'translate-x-8',
    lg: 'translate-x-7',
    xl: 'translate-x-9'
  }
  const DEFAULT_BG_CLASS = 'bg-gray-300'

  const switchWrapper = document.currentScript.previousElementSibling

  if (switchWrapper && !scriptIsDisabled) {
    const track = switchWrapper.querySelector('.switch-track')
    const thumb = switchWrapper.querySelector('.switch-thumb')
    const input = switchWrapper.querySelector('input[type="checkbox"]')
    const componentColor = switchWrapper.dataset.color || 'default'
    const componentSize = switchWrapper.dataset.size || 'md'

    let currentIsSelected = scriptInitialSelected

    const applyClassList = (element, classesStr, action = 'add') => {
      const classesArray = classesStr.split(' ').filter((c) => c.length > 0)
      classesArray.forEach((cls) => element.classList[action](cls))
    }

    const updateVisuals = () => {
      switchWrapper.setAttribute('aria-checked', currentIsSelected.toString())

      const currentBgColorKey = scriptColor
      const activeColorClasses = SCRIPT_COLORS[currentBgColorKey]
      const defaultColorClasses = DEFAULT_BG_CLASS

      Object.values(SCRIPT_COLORS).forEach((clsStr) =>
        applyClassList(track, clsStr, 'remove')
      )
      applyClassList(track, defaultColorClasses, 'remove')

      if (switchWrapper.matches(':hover') && !scriptIsReadOnly) {
        applyClassList(track, activeColorClasses, 'add')
      } else {
        if (currentIsSelected) {
          applyClassList(track, activeColorClasses, 'add')
        } else {
          applyClassList(track, defaultColorClasses, 'add')
        }
      }

      const translateClassForSelected = SCRIPT_CIRCLE_TRANSLATE[componentSize]
      const translateClassForUnselected = 'translate-x-0'

      Object.values(SCRIPT_CIRCLE_TRANSLATE).forEach((cls) =>
        applyClassList(thumb, cls, 'remove')
      )
      applyClassList(thumb, translateClassForUnselected, 'remove')

      if (currentIsSelected) {
        applyClassList(thumb, translateClassForSelected, 'add')
      } else {
        applyClassList(thumb, translateClassForUnselected, 'add')
      }

      if (input) {
        input.checked = currentIsSelected
      }
    }

    const handleToggle = () => {
      if (scriptIsReadOnly) return
      currentIsSelected = !currentIsSelected
      updateVisuals()
      const event = new CustomEvent('switch-change', {
        bubbles: true,
        detail: { isSelected: currentIsSelected, id: input ? input.id : null }
      })
      switchWrapper.dispatchEvent(event)
    }

    switchWrapper.addEventListener('click', handleToggle)

    switchWrapper.addEventListener('keydown', (e) => {
      if (scriptIsReadOnly) return
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleToggle()
      }
    })

    if (input) {
      input.addEventListener('change', (e) => {
        if (scriptIsReadOnly) {
          e.target.checked = currentIsSelected
          return
        }
        if (currentIsSelected !== e.target.checked) {
          currentIsSelected = e.target.checked
          updateVisuals()
          const event = new CustomEvent('switch-change', {
            bubbles: true,
            detail: { isSelected: currentIsSelected, id: input.id }
          })
          switchWrapper.dispatchEvent(event)
        }
      })
    }

    switchWrapper.addEventListener('mouseenter', () => {
      if (!scriptIsReadOnly) {
        updateVisuals()
      }
    })

    switchWrapper.addEventListener('mouseleave', () => {
      updateVisuals()
    })
  }
</script>
`

export const TextareaAstro = `---
interface Props {
  label?: string
  placeholder?: string
  description?: string
  errorMessage?: string
  isRequired?: boolean
  isReadOnly?: boolean
  isDisabled?: boolean
  defaultValue?: string
  variant?: 'default' | 'bordered' | 'light'
  id?: string
}

const {
  label,
  placeholder = '',
  description,
  errorMessage,
  isRequired = false,
  isReadOnly = false,
  isDisabled = false,
  defaultValue = '',
  variant = 'default',
  id: customId,
  ...props
} = Astro.props

const uniqueId = customId || \`textarea-\${crypto.randomUUID().slice(0, 8)}\`

const variants = {
  default: 'border-0 shadow-md backdrop-blur-sm',
  bordered: 'border bg-transparent',
  light: 'bg-transparent'
}

const colors = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
  danger: 'bg-red-500/20'
}

const borderColors = {
  default: 'border-gray-800 dark:border-gray-300'
}

const textColors = {
  default:
    'text-zinc-800 dark:text-neutral-100 placeholder-zinc-800/30 dark:placeholder-neutral-100/30',
  danger: 'text-red-800 dark:text-red-500'
}

const baseClasses = \`flex flex-col space-y-2 \${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}\`

const initialInputClasses = [
  'w-full p-2 rounded-lg transition focus:outline-none',
  variants[variant],
  variant === 'default' && colors['default'],
  textColors['default'],
  variant === 'bordered' && borderColors['default'],
  isDisabled ? 'bg-gray-100' : ''
]
  .filter(Boolean)
  .join(' ')

const initialIsInvalid = defaultValue === '' && isRequired

const descriptionId = description ? \`\${uniqueId}-description\` : undefined
const errorMessageId = errorMessage ? \`\${uniqueId}-errorMessage\` : undefined
---

<div class={baseClasses} data-textarea-wrapper>
  {
    label && (
      <label
        for={uniqueId}
        class:list={['label text-sm font-medium', textColors['default']]}
      >
        {label}
        {isRequired && (
          <span class:list={['ml-1', textColors['danger']]}>*</span>
        )}
      </label>
    )
  }

  <div class='inputWrapper relative'>
    <textarea
      id={uniqueId}
      class:list={[initialInputClasses, initialIsInvalid && colors['danger']]}
      role='textbox'
      aria-invalid={initialIsInvalid ? 'true' : 'false'}
      aria-required={isRequired ? 'true' : 'false'}
      aria-readonly={isReadOnly ? 'true' : 'false'}
      aria-disabled={isDisabled ? 'true' : 'false'}
      aria-describedby={descriptionId}
      aria-errormessage={initialIsInvalid && errorMessage
        ? errorMessageId
        : undefined}
      disabled={isDisabled}
      readonly={isReadOnly}
      placeholder={placeholder}
      {...props}>{defaultValue}</textarea
    >
  </div>

  {
    description && (
      <div
        id={descriptionId}
        class:list={['description text-sm', textColors['default']]}
      >
        {description}
      </div>
    )
  }

  {
    errorMessage && (
      <div
        id={errorMessageId}
        class:list={[
          'errorMessage text-sm',
          textColors['danger'],
          !initialIsInvalid && 'hidden'
        ]}
        aria-live='assertive'
      >
        {errorMessage}
      </div>
    )
  }
</div>

<script
  define:vars={{
    uniqueId,
    isRequired,
    errorMessageId,
    dangerBgClass: colors.danger,
    focusRingClass: 'ring-2 ring-blue-500'
  }}
>
  const textareaElement = document.getElementById(uniqueId)
  const errorMessageElement = document.getElementById(errorMessageId)

  if (textareaElement) {
    let isInvalid = textareaElement.getAttribute('aria-invalid') === 'true'

    const handleChange = (e) => {
      const newValue = e.target.value
      const currentlyInvalid = newValue === '' && isRequired

      if (currentlyInvalid !== isInvalid) {
        isInvalid = currentlyInvalid
        textareaElement.setAttribute(
          'aria-invalid',
          isInvalid ? 'true' : 'false'
        )

        if (isInvalid) {
          textareaElement.classList.add(dangerBgClass)
          if (errorMessageElement) {
            textareaElement.setAttribute('aria-errormessage', errorMessageId)
            errorMessageElement.classList.remove('hidden')
          }
        } else {
          textareaElement.classList.remove(dangerBgClass)
          if (errorMessageElement) {
            textareaElement.removeAttribute('aria-errormessage')
            errorMessageElement.classList.add('hidden')
          }
        }
      }
    }

    const handleFocus = (e) => {
      textareaElement.classList.add(...focusRingClass.split(' '))
    }

    const handleBlur = () => {
      textareaElement.classList.remove(...focusRingClass.split(' '))

      handleChange({ target: textareaElement })
    }

    textareaElement.addEventListener('input', handleChange)
    textareaElement.addEventListener('focus', handleFocus)
    textareaElement.addEventListener('blur', handleBlur)
  }
</script>
`

export const TooltipAstro = `---
interface TooltipProps {
  content: string
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  placement?: 'top' | 'bottom' | 'left' | 'right'
  isDisabled?: boolean
  delay?: number
}

const {
  content,
  color = 'default',
  rounded = 'md',
  placement = 'top',
  isDisabled = false,
  delay = 300
} = Astro.props as TooltipProps

const tooltipId = crypto.randomUUID()

const positions = {
  top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 transform -translate-y-1/2 mt-2',
  left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
}

const roundeds = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}

const colors = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/30',
  warning: 'bg-yellow-500/40 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
}

const textColors = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
}

const positionClass = positions[placement]
const roundedClass = roundeds[rounded]
const colorClass = colors[color]
const textColorClass = textColors[color]
---

<div
  class='relative flex items-center'
  id={\`tooltip-\${tooltipId}\`}
  data-delay={delay}
  data-disabled={isDisabled}
  aria-describedby={\`tooltip-content-\${tooltipId}\`}
>
  <div
    id={\`tooltip-content-\${tooltipId}\`}
    role='tooltip'
    class={\`absolute z-9999 border-0 shadow-md backdrop-blur-sm \${positionClass} \${roundedClass} \${colorClass} \${textColorClass} whitespace-nowrap text-sm px-3 py-1 invisible transition-opacity\`}
    aria-hidden='true'
  >
    {content}
  </div>
  <slot />
</div>

<script define:vars={{ clientTooltipId: tooltipId }} is:inline>
  ;(() => {
    const wrapperId = \`tooltip-\${clientTooltipId}\`
    const contentId = \`tooltip-content-\${clientTooltipId}\`

    const tooltipWrapper = document.getElementById(wrapperId)

    if (!tooltipWrapper) {
      return
    }

    const isDisabled = tooltipWrapper.dataset.disabled === 'true'
    const delay = Number(tooltipWrapper.dataset.delay)
    let timeout

    if (isDisabled) return

    const showTooltip = () => {
      const tooltipContent = tooltipWrapper.querySelector(\`#\${contentId}\`)
      if (tooltipContent) {
        tooltipContent.classList.remove('invisible')
        tooltipContent.setAttribute('aria-hidden', 'false')
      } else {
        console.error(
          \`Tooltip content with selector '#\${contentId}' not found within wrapper.\`
        )
      }
    }

    const hideTooltip = () => {
      const tooltipContent = tooltipWrapper.querySelector(\`#\${contentId}\`)
      if (tooltipContent) {
        tooltipContent.classList.add('invisible')
        tooltipContent.setAttribute('aria-hidden', 'true')
      } else {
        console.error(
          \`Tooltip content with selector '#\${contentId}' not found within wrapper.\`
        )
      }
    }

    tooltipWrapper.addEventListener('mouseenter', () => {
      timeout = setTimeout(showTooltip, delay)
    })

    tooltipWrapper.addEventListener('mouseleave', () => {
      clearTimeout(timeout)
      hideTooltip()
    })

    tooltipWrapper.addEventListener('click', (event) => {
      event.stopPropagation()
      if (window.innerWidth < 1024) {
        showTooltip()
        setTimeout(hideTooltip, 2000)
      }
    })
  })()
</script>
`

export const UserAstro = `---
import Avatar from '@/components/astro/Avatar.astro'

interface UserProps {
  avatarSrc?: string
  avatarAlt?: string
  avatarSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  avatarRounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  avatarBordered?: boolean
  avatarColor?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
  avatarDot?: boolean
  avatarDotColor?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
  avatarDotPosition?: 'top' | 'bottom' | 'left' | 'right'
  name?: string
  description?: string
  variant?: 'default' | 'bordered' | 'light'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
}

const {
  avatarSrc,
  avatarAlt,
  avatarSize,
  avatarRounded,
  avatarBordered,
  avatarColor,
  avatarDot,
  avatarDotColor,
  avatarDotPosition,
  name = '',
  description = '',
  variant = 'default',
  color = 'default',
  size = 'md',
  rounded = 'md'
} = Astro.props as UserProps

const variants = {
  default: 'border-0 shadow-md backdrop-blur-sm',
  bordered: 'border border-current',
  light: ''
}

const colors = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/30',
  warning: 'bg-yellow-500/40 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
}

const textColors = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
}

const sizes = {
  xs: 'p-1 space-x-2',
  sm: 'p-2 space-x-3',
  md: 'p-3 space-x-4',
  lg: 'p-4 space-x-5',
  xl: 'p-5 space-x-6'
}

const roundeds = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-lg',
  lg: 'rounded-2xl',
  full: 'rounded-full'
}

const textSizes = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl'
}

const containerClass = [
  'base flex items-center',
  variants[variant],
  sizes[size],
  roundeds[rounded],
  textColors[color],
  variant === 'default' ? colors[color] : '',
  textSizes[size]
].join(' ')
---

<div
  class={containerClass}
  role='group'
  aria-labelledby='user-name'
  aria-describedby='user-description'
>
  <Avatar
    src={avatarSrc}
    name={name}
    alt={avatarAlt || \`Avatar of \${name}\`}
    size={avatarSize}
    rounded={avatarRounded}
    bordered={avatarBordered}
    color={avatarColor}
    dot={avatarDot}
    dotColor={avatarDotColor}
    dotPosition={avatarDotPosition}
  />
  <div class='wrapper'>
    <div id='user-name' class='font-semibold' aria-label='User name'>
      {name}
    </div>
    <div
      id='user-description'
      class='font-normal'
      aria-label='User description'
    >
      {description}
    </div>
  </div>
</div>
`
