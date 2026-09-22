import { useEffect } from 'react'
import { BRAND } from '../data/site'

/**
 * Per-route <title> and meta description.
 *
 * This is a client-rendered site, so search engines see index.html first.
 * These values still matter for the browser tab, for shared links once the
 * page has run, and for anything that executes JavaScript before indexing.
 */
export function useMeta(title: string, description: string) {
  useEffect(() => {
    document.title = `${title} | ${BRAND.name}`

    const tag = document.querySelector('meta[name="description"]')
    const previous = tag?.getAttribute('content')
    tag?.setAttribute('content', description)

    return () => {
      if (previous) tag?.setAttribute('content', previous)
    }
  }, [title, description])
}
