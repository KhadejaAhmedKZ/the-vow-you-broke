// The Vow You Broke — chapter names, gallery, endings
(function (root) {
  const O = (root.OYK = root.OYK || {}); O.story = O.story || [];
  O.CHAPTERS = ['The Man at My Funeral', 'Jealousy in Gold', 'The Room He Kept', 'The Heart Beneath the Palace', 'Choose Me Awake'];
  O.GALLERY = {
    ring1: ['The ring falls', 'Chapter 1'], door1: ['"May I come in?" "No."', 'Chapter 1'], dance2: ['The winter assembly', 'Chapter 2'], kiss2: ['"Was that for me, or your audience?"', 'Chapter 2'],
    memory3: ['"I missed you before you reached the gate."', 'Chapter 3'], cup3: ['Everything you stopped reaching for', 'Chapter 3'], rain3: ['Under one roof', 'Chapter 3'], kiss3: ['This one is my decision', 'Chapter 3'],
    vesper4: ['The offer', 'Chapter 4'], hall4: ['"Are you comfortable?"', 'Chapter 4'], kiss4: ['Cruel woman', 'Chapter 4'], heart4: ['The palace heart', 'Chapter 4'],
    break5: ['Two heartbeats', 'Chapter 5'], garden5: ['The garden after', 'Chapter 5'], endA: ['Come in', 'Ending'], endB: ['Walk with me', 'Ending'], endC: ['The road', 'Ending']
  };
  O.ENDINGS = {
    A: { title: 'Come In', text: 'She opened the door, and this time he asked before he crossed it. The marriage agreement went into a drawer, unsigned. She took his hand instead.' },
    B: { title: 'Walk With Me', text: 'No vows. No rings. A garden path, and two people learning how to walk at the same speed. Their story continues slowly.' },
    C: { title: 'The Road', text: 'Khadeja rode out through the city gates with her sword at her side and his flowers tied to her saddle. She would decide where when she reached the road.' }
  };
  O.THREAD = '';
  if (typeof module !== 'undefined') module.exports = O;
})(typeof window !== 'undefined' ? window : globalThis);
