(function (root) { (root.OYK = root.OYK || {}).story = root.OYK.story || []; root.OYK.story.push(String.raw`
::ch1
@outfit K battle
@outfit E armor
@outfit R cream
@music tense
@fade
@title 1 The Man at My Funeral
@bg observatory night
@cast K:l:guard:serious::sword
@cam low
- The observatory. Broken glass covers the marble floor. Beyond the shattered windows, the capital burns beneath a red eclipse.
@act K stumble
- My boots slide through the glass. I brace against a fallen pillar. My breathing shakes. My sword hand does not.
@cam close K
K*: I knew I was exceptional before I knew what loneliness was.
K*: First in swordsmanship. First in spellcraft. First in everything that mattered.
K*: Then Ellis Veyr arrived.
K*: And somehow, beating him became less important than making him look at me.
@cast K:l:guard:serious::sword E:r:fall:fear
@fx E shadow
@cam two K E
@sfx sting
@shake
- Across the room, Ellis drops to one knee. Shadows lash from his shoulders and strike the ceiling.
E: Stay back.
> Step over the beam. | cl+1
  - I step over a broken beam. Glass cracks under my heel.
> Sheathe my sword first. | cl+1
  @prop K none
  @pose K stand
  - I put my sword away. He was never my enemy. That was always the trouble.
> "Make me." | ds+1
  K[smirk]: Make me.
  - He cannot. So I walk to him anyway. Slowly. On my own time.
@prop K none
@pose K stand
@move K cl
K[smirk]: You have said that for three years. Find something else.
@act E gasp
- He looks up. For once, his face holds no coldness. Only terror.
@cast K:c:kneelreach:serious E:cr:fall:fear
@cam tight K E
- I reach him and kneel. My hands close around his bare wrist. The shadows recoil from my touch.
@act E tremble
E: The bond is drawing from your heart.
> "I noticed." | 
  K[smirk]: I noticed.
> "Let it." | cl+1
  K[soft]: Let it.
  @act E shake
> Say nothing. Hold on. | cl+1
  - I say nothing. I hold on.
E[hurt]: Khadeja. Let go.
- My fingers tighten. A faint smile touches my mouth.
K[soft]: Now you want me to leave?
@pose E kneelreach
@act E tremble
- He reaches for my face. His hand trembles so badly that his knuckles brush my cheek before his palm finds it.
@cam close E
E[cry]: I wanted—
- His voice breaks.
> Lean into his hand. | cl+2 lean1=1
  @cam tight K E
  @x K closed
  - I turn my face into his palm. It is the first time in three years that he has touched me without flinching.
> "Say it." | cl+1
  @cam close K
  K[hurt]: Say it. For once. Say it.
  - His mouth opens. Nothing comes. It never did.
> Close my eyes. | 
  @x K closed
  - I close my eyes. I am so tired of winning.
@sfx heart
@cam close K
- The chain around my neck snaps. My wedding ring falls between us.
@flash
@cg ring1
- It falls so slowly. I hear it strike the marble. I hear it long after everything else is gone.
@music none
@fade
@card Morning.
@outfit K night
@bg bedroom day
@music soft
@cast K:cl:chest:fear
@cam close K
@act K gasp
- I wake with a sharp gasp and press both palms to my chest.
- No wound.
@pose K stand
@x K surprised
- Pale green curtains move in the breeze. Sunlight lies across a bed I have not slept in for years. Outside, gardeners trim white roses.
- My hands have no scars.
> Check my hands again. | 
  @pose K read
  - I turn them over. Twice. The sword calluses are there. The burn from the third winter is not.
> Go to the window. | 
  @move K c
  - White roses. My mother's garden. Before I ever married anyone.
> Find my sword. | bold+1
  - It is on its stand, where it always was. No notch in the blade. It has not yet met his.
@pose K read
@prop K paper
- On the bedside table lies an invitation.
@note The Royal Winter Assembly // seventeen days before the eclipse
- I read the date twice.
K[serious]*: Seventeen days before I died.
@hide
@prop K none
@pose K stand
@sfx door
Maid: My lady? Lord Veyr has arrived.
@act K flinch
- My hand goes still.
Maid: He says it concerns your proposed marriage.
> "Tell him to wait." | ds+1
  K[serious]: Tell him to wait. A long time.
> "I will see him." | cl+1
  K[neutral]: I will see him. At the door. No further.
> "Did he say anything else?" | 
  K: Did he say anything else?
  Maid: No, my lady. But his sword belt is on wrong. I did not like to tell him.
@fade
@outfit K blue
@outfit E coat
@bg drawing rain
@music sad
@cast K:cl:stand:serious
@cam wide
- The drawing room. Unopened letters on the writing desk. Rain begins to tap the windows.
- A high-necked blue dress. Silver earrings. No ring.
@sfx door
@cast K:cl:stand:serious E:r:stand:surprised
@cam two K E
@act E stepin
- I open the door. Ellis turns too quickly. His eyes move over my face, my throat, my hands.
@move E cr
@act K stepback
- He takes one step toward me. I take one back. He stops.
@cam close E
E[hurt]: You're alive.
- My fingers tighten on the door handle.
> "That is how people answer doors." | 
  K[smirk]: That is usually how people answer doors.
> "Disappointed?" | ds+1
  K[cold]: Disappointed?
  @act E flinch
> Say nothing. Let him look. | cl+1
  - I say nothing. I let him look. He does it like a man checking a wall for cracks.
- His mouth almost moves into a smile. It fails.
E: Do you remember?
- Silence. The rain. The clock.
> "Every moment." | rem=all cl+1
  K[serious]: Every moment.
  @act E bowhead
  @x E cry
  - I watch him lose the last of his composure. It takes less than a breath.
> "Enough to refuse you." | rem=refuse ds+2
  K[cold]: Enough to refuse you.
  @prop K paper
  @pose K give
  - I hand him the marriage agreement. Unsigned. He takes it as if it were hot.
  @prop K none
  @pose K stand
> "Tell me what you remember first." | rem=first
  K[serious]: Tell me what you remember first.
  - I keep the doorway between us. He notices. He stays on his side of it.
  E[sad]: Glass. The eclipse. Your hands on my wrist. Then nothing I want to say out loud.
@cam two K E
- Ellis looks at the empty space beneath my collarbone.
E[sad]: You wore my ring on a chain.
@pose K chest
- I close my hand over that same place.
K[serious]: I won't be wearing it again.
@act E flinch
- For a moment he looks as though I have struck him. Then he bows his head.
@pose E bow
E: May I come in?
> "No." | 
  K[serious]: No.
> "Not today." | cl+1
  K[neutral]: Not today.
> "Ask me in seventeen days." | bold+1
  K[smirk]: Ask me in seventeen days. If we are both still breathing.
@cg door1
@sfx door
@exit K
@pose E stand
@cam close E
- I close the door.
@act E reach
- On the other side, his hand lifts toward the wood. Slowly, it falls.
@fx E mark
@sfx heart
- Beneath his glove, the marriage mark begins to glow.
- We have not signed the contract in this life. Yet something has already bound us.
@fade
@go ch2
`); })(typeof window !== 'undefined' ? window : globalThis);
