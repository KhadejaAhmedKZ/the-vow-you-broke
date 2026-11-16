# The Vow You Broke

A dark fantasy romance in five chapters, played in the browser in real-time 3D.

```bash
python3 -m http.server 8797 --directory ~/Desktop/the-vow-you-broke
```

Then open http://localhost:8797 (needs internet the first time, to load Three.js).

- Story text: `js/story/ch1.js` … `ch5.js`
- Characters, gestures, magic effects: `js/chars.js` · locations: `js/sets2.js` · staging and camera: `js/stage.js`
- Check every route: `node tools/test-story.js`
- Add `?profile=test` to the address for a throwaway set of saves.
