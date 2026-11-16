(function (root) { (root.OYK = root.OYK || {}).story = root.OYK.story || []; root.OYK.story.push(String.raw`
::ch4
@outfit K riding
@outfit E coat
@outfit R train
@music tense
@fade
@title 4 The Heart Beneath the Palace
@bg pavilion dusk
@cast K:cl:stand:serious E:cr:stand:serious V:ll:stand:smirk
@cam group
- The pavilion at dusk. The lanterns flicker as Vesper steps under the roof.
@cam close V
- A white silk gown. Pearl gloves. A red oath stone at her throat.
V: You have both been unusually troublesome this time.
@pose K guard
- My hand moves toward my dagger. She notices.
V[smirk]: Kill me, and the original contract stays sealed.
> Keep my hand on the dagger. | bold+1
  K[cold]: I can think of worse evenings.
  V: I am sure. You were always the better fighter. Never the better reader.
> Lower my hand. | 
  @pose K stand
  - I lower my hand. Slowly. I want her to see that it is a choice.
> "This time?" | cl+0 clue4=1
  K[serious]: "This time." You remember too.
  V[smile]: I keep the archive, child. I remember everyone's first drafts.
@pose K stand
@prop V letter
@pose V give
- She places an invitation on the stone bench.
V: Come to the eclipse ceremony. Renew the marriage oath willingly, and I will remove its penalties.
@cg vesper4
@prop V none
@pose V stand
@move E c
@act E stepin
E[angry]: No.
@cam close V
- Vesper smiles at me.
V[smirk]: He always answers so quickly when someone asks what you want.
@cam two K E
> "She is right, Ellis." | bd+1
  K[serious]: She is right. That question was mine.
  @act E bowhead
  E[sad]: ...It was. Forgive me. What do you want?
  K: I want to know what she gains. Then I will answer.
> "I can speak, Ellis." | bd+1 cl+1
  K[tease]: I do have a mouth, Commander. You have met it.
  E[shy]: I... yes. Your answer, then.
> Answer Vesper myself. | bold+1
  K[cold]: My answer is the same as his. But you will hear it in my voice. No.
V: Seventeen days are nearly gone. Think quickly. The heart does not wait.
@exit V
K*: "The heart." She did not mean mine.
@fade
@outfit E shirt
@bg hall day
@music warm
@cast K:c:guard:serious::sword R:cl:touch:smile
@cam two K R
- An empty training hall. Afternoon light on scuffed floorboards. Rayan found the shape of the oath seal in the archive. I have to learn to cut it.
R: Higher. The seal breaks on the upstroke. Your elbow is lying to you.
- He stands behind me and corrects the angle of my sword arm.
> "My elbow never lies." | ry+1
  K[smirk]: My elbow has never lied in its life.
  R[laugh]: Then it is being creative with the truth.
> Let him guide the cut. | ry+1
  @act K slash
  - I let him guide it. The blade sings. The cut is clean.
  R[proud]: There. Again.
> "You enjoy this too much." | ry+1
  K[tease]: You enjoy correcting me far too much.
  R[smile]: I had four years of you correcting me. I am owed.
@enter E:rr:stand:jealous
@cam close E
@act E clench
- Ellis comes in, and stops in the doorway.
@cam group
- Rayan notices him. So do I.
@pose K stand
- I lower my sword.
K[serious]: Say it.
E: I would prefer his hand elsewhere.
@pose R stand
- Rayan takes it away, amused.
R[smirk]: She was about to dislocate her shoulder.
@cam close E
- Ellis looks at me. Only at me.
E[serious]: Are you comfortable?
> "Yes." | cl+1 comf4=yes
  K[neutral]: Yes.
> "Very." | ry+1 comf4=very
  K[tease]: Very.
  R[laugh]: Do not help me, Khadeja. He owns a sword.
> "I would tell you if I were not." | cl+1 bd+1 comf4=tell
  K[serious]: I would tell you if I were not. Out loud. That is how this works now.
@act E clench
- His jaw goes tight. Then he nods.
E: Continue.
@cg hall4
@pose R touch
- We continue. He stays by the door, and watches, and says nothing. It costs him. I can see exactly how much.
@pose R stand
R[soft]: I will check the palace entrance. Khadeja. Whatever you choose at the end of this, choose it awake.
> "Thank you, Rayan." | ry+1
  K[soft]: Thank you. For asking nothing.
  R[smile]: I am asking plenty. I am only asking it quietly.
> "And if I choose no one?" | ry+1 bold+1
  K[smirk]: And if I choose no one?
  R[soft]: Then I will have the honor of being turned down by the best. Twice.
> Clasp his arm. | ry+2
  @hold K R
  - I clasp his arm, the way we did before tournaments. He holds on a second longer than a comrade would. Then he lets go first.
  @apart
@exit R
@prop K none
@cast K:cl:stand:smirk E:cr:stand:neutral
@cam two K E
@act K tilt
- I circle Ellis.
K[tease]: That looked painful.
E: It was.
K: You survived.
E[shy]: Barely.
@act K laugh
@x K laugh
- I laugh. He looks at me as though I have put something precious in his hands.
> Catch his shirt. Pull him down. | cl+1 | ->c4kiss
> "Good. Keep practicing." | bd+1
  K[smirk]: Good. Keep practicing. You are improving.
  E[soft]: I had a strict teacher.
  @go c4chamber
> Hand him a practice sword. | cl+1 spar4=1
  @prop E sword
  @pose E guard
  @prop K sword
  @pose K guard
  K[tease]: Then spar with me. You used to enjoy losing.
  @act K slash
  @act E stepback
  - Three passes. I disarm him on the fourth. He is smiling when his sword hits the floor. I had forgotten he could.
  @prop E none
  @prop K none
  @pose E stand
  @pose K stand
  @go c4chamber

::c4kiss
@near K E
@cam tight K E
- I catch the front of his shirt and pull him down. He stops a breath away.
E[shy]: Are you teasing me?
K[tease]: A little.
E: Cruel woman.
K: You used to enjoy losing to me.
E[soft]: I enjoyed having your attention.
> Kiss him. | kiss4=1 cl+2
  @kiss K E
  @act E stepback
  - I kiss him. He backs into the practice table, surprised, and I smile against his mouth.
  - When he reaches for my waist, he stops. I take his hands and put them there myself.
  @cg kiss4
  @near K E
  @x K love E love
> Let him go. Smiling. | cl+1
  @apart
  K[tease]: Not today. I only wanted to see your face.
  E[laugh]: Cruel. I said it. I stand by it.
@apart
@go c4chamber

::c4chamber
@fade
@outfit K officer
@outfit E armor
@outfit R cream
@bg chamber night
@music tense
@cast K:cl:stand:serious E:cr:stand:serious V:rr:stand:smirk::blade
@cam high
- Beneath the palace. A vast mechanical heart hangs over a pit. Hundreds of red oath threads run into it from the city above.
@cam close V
V: The crown requires power. Marriage makes an excellent conduit.
@cam close K
- I look up at the threads. Hundreds. Every one, a wedding.
K[hurt]: How many people?
- Vesper says nothing.
> "Answer me." | bold+1
  K[angry]: Answer me!
  V: Enough to keep the lamps lit. You have enjoyed the lamps.
> Listen to the threads. | clue4b=1
  @fx K aura
  - I listen. Each thread has a rhythm. Each one is a heart, beating for two. Some are very faint.
  @fx K aura off
> Look at Ellis. | cl+1
  - I look at him. He is counting them too. His face is white.
@sfx door
- Behind us, the chamber doors open. Rayan, with royal witnesses.
@sfx sting
@act V slash
@flash
- Vesper seizes the ceremonial blade, and cuts Ellis's oath thread.
@fx E shadow
@pose E fall
@shake
@cam two K E
- Shadows explode across the ceiling. He falls.
@act K stepin
- I move toward him.
E[fear]: Don't.
@flash
- Broken glass. Blood. My ring, falling.
E[cry]: Don't save me the same way.
@act K stepback
- I stop.
@cam close K
- Then I look past him. At the machine.
> "I wasn't planning to." | 
  K[smirk]: I wasn't planning to.
> "Trust me this time." | cl+1
  K[serious]: Then trust me this time.
> Say nothing. Draw my sword. | bold+1
  - I say nothing. My sword says it for me.
@prop K sword
@pose K strike
@act K slash
@flash
@shake
@cg heart4
- I drive my sword into the palace heart.
@fade
@go ch5
`); })(typeof window !== 'undefined' ? window : globalThis);
