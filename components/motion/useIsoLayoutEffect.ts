import { useEffect, useLayoutEffect } from 'react'

/** useLayoutEffect in the browser (runs before paint), useEffect on the server (silences the SSR warning). */
export const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect
