const $console = document.querySelector('.ay-console')

export const log = (...msgs) => {
  $console.innerText = [$console.innerText, '\n', ...msgs].join('')
}

export const clear = (...msgs) => $console.innerText = ''
