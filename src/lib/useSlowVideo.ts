import { useEffect, type RefObject } from 'react';

/**
 * Holds an ambient background film at a fraction of its real speed.
 *
 * playbackRate is a DOM property, not an attribute, so it cannot be set in
 * JSX, and the element resets it whenever a new source is loaded. Reapplying
 * it on loadedmetadata and on play covers both the initial load and the loop
 * restarts, which is where a rate set only once quietly reverts to 1.
 *
 * A quarter speed turns a twenty second aerial clip into eighty seconds, so
 * the footage drifts behind the copy instead of visibly running out.
 */
export function useSlowVideo(ref: RefObject<HTMLVideoElement | null>, rate = 0.25) {
  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const apply = () => {
      if (v.playbackRate !== rate) v.playbackRate = rate;
    };

    apply();
    v.addEventListener('loadedmetadata', apply);
    v.addEventListener('play', apply);
    return () => {
      v.removeEventListener('loadedmetadata', apply);
      v.removeEventListener('play', apply);
    };
  }, [ref, rate]);
}
