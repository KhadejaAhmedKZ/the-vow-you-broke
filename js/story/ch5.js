(function (root) { (root.OYK = root.OYK || {}).story = root.OYK.story || []; root.OYK.story.push(String.raw`
::ch5
@outfit K officer
@outfit E armor
@outfit R cream
@music tense
@fade
@title 5 Choose Me Awake
@bg chamber break
@cast K:cl:guard:serious::sword E:cr:kneelreach:hurt
@fx E shadow
@cam high
- The chamber shakes. Red threads whip through the air. Dust falls from the vaulted ceiling.
- Rayan is getting the witnesses out. He has Vesper's wrists behind her back. Ellis holds the machinery apart with his shadows. I cut.
@cam two K E
@go c5s1

::c5s1
- The gears part. A seal shows between them, bright and bare.
> Cut the seal. | | ->c5s2
> {!h1} Wait. | hits+1 h1=1
  @act K flinch
  - I wait too long. The gears close, and a thread lashes my arm. I listen for the gap again.
  @go c5s1

::c5s2
@act K slash
@flash
@sfx chime
- One seal breaks.
E[hurt]: Second one. Not yet. My hold is slipping.
- The gears grind toward each other. The second seal is there, but the gap is closing.
> Wait for his signal. | | ->c5s3
> {!h2} Cut now. | hits+1 h2=1
  @act K slash
  @shake
  - My blade catches between the gears. Ellis shouts, and forces them open again. I pull free. Wait, this time.
  @go c5s2

::c5s3
E: Now!
@act K slash
@flash
@sfx chime
- Two.
- The third seal is high. Too high. A thread wraps my ankle.
> Cut the thread first. | | ->c5s4
> {!h3} Jump for the seal. | hits+1 h3=1
  @act K stumble
  - The thread pulls me down hard. Cut it first. Then the seal.
  @go c5s3
> "Ellis. Lift me." | cl+1 lift5=1 | ->c5s4

::c5s4
@act K slash
{lift5} - His shadows close around my waist, careful as hands, and lift. For once, his magic is not taking from me. It is holding me up.
@flash
@sfx chime
@cam close K
- Three. I reach the final seal. There are words cut into it.
@note One heart must hold the other.
K*: Every lesson I ever had said the same thing. A magical bond needs a master.
@hide
@fx K aura
- I put my hand on the seal, and listen to its rhythm. One beat. Heavy. Owning.
@go c5rhythm

::c5rhythm
K*: I can change the rhythm. To what?
> {!r1} One heartbeat. Stronger. | r1=1
  @shake
  - The seal drinks it, and grows. That is what it was built for. Not this.
  @go c5rhythm
> {!r2} No heartbeat at all. | r2=1
  @act K flinch
  - Silence. The threads go grey. Above us, hundreds of people stop breathing. I let go at once. Not this.
  @go c5rhythm
> Two heartbeats. | | ->c5free

::c5free
@flash
@shake
@sfx chime
- Two heartbeats. Side by side. Neither one leading.
@cg break5
- The seal cracks from edge to edge.
@fx E mark off
@fx E shadow off
@fx K aura off
@prop K none
@cast K:cl:kneel:closed E:cr:kneel:surprised
@cam two K E
@music soft
- Ellis's marriage mark burns away. I drop to my knees, breathing hard.
@pose E read
@cam close E
- Across the chamber, he touches his bare wrist.
- For the first time, he cannot feel where I am.
@x E fear
- He looks frightened.
@cam two K E
@x K soft
@x E soft
- Then he looks at me. Still there.
@fade
@outfit K ecoat
@outfit E shirt
@bg garden dawn
@music soft
@cast K:cl:stand:soft::cloth E:cr:sit:neutral
@near K E
@cam two K E
- Dawn. The palace garden is covered in fallen petals and dust. Birds begin to call from the hedges.
- I am wearing his coat over my ruined uniform. He sits on the edge of the fountain. I stand between his knees, cleaning a cut above his eyebrow.
E: You can go anywhere now.
K: I could before.
@x E closed
- He closes his eyes for a moment.
E[sad]: Yes.
> Press the cloth harder. | 
  @act E flinch
  - I press the cloth a little harder. He winces.
  K[smirk]: Good. I wanted you awake for that answer.
> Clean it gently. | cl+1
  - I clean it gently. He is not used to gentle. He does not know where to look.
  K[soft]: I wanted you to hear it. That is all.
> Kiss the cut. | cl+2
  - I kiss the place above his eyebrow. Quickly. He goes so still that a bird lands on the fountain behind him.
@act E reach
- His hand lifts toward my hip. Then it stops.
- I notice.
> "You may." | cl+2 may5=1
  K[soft]: You may.
  - His palm settles against my side.
> "Not yet." | bd+1
  K[soft]: Not yet. But thank you for stopping.
  E[soft]: I am learning where the edge is.
> Put his hand there myself. | cl+2 may5=1 bold+1
  - I take his wrist, and put his hand on my waist myself. His ears go red.
E: I still want too much.
K[serious]: Then learn what to do with wanting.
{may5} @pose E sitlean
{may5} @cg garden5
{may5} - He leans his forehead against my stomach. I rest my hand in his hair. For once, neither of us speaks.
{!may5} @cg garden5
{!may5} - We stay like that, an arm's length apart, while the sun comes up. For once, neither of us speaks.
@prop K none
@fade
@card Several weeks later.
@outfit K blue
@outfit E coat
@bg drawing summer
@music warm
@cast K:cl:stand:neutral
@cam wide
- The same drawing room where I first refused to let him in. Summer rain taps the windows.
@sfx door
- A knock.
@cast K:cl:stand:smile E:r:give:shy::flowers
@cam two K E
- I open the door. Ellis is standing outside, with flowers. They are slightly crushed.
K[tease]: Did you fight them?
E: Your gardener had opinions.
@act K laugh
@x K laugh
- I laugh. He watches me do it. Then he holds out the flowers.
E[soft]: May I come in?
{hits>=2} K*: My arm still aches where the threads caught it. I like the ache. It is proof.
{rem=='refuse'} K*: The last time he stood here, I gave him a paper and a closed door.
{kiss3 || kiss4} K*: I have kissed this man in the rain, and on purpose. I know exactly what I would be saying yes to.
{!kiss3 && !kiss4} K*: I never did kiss him, in this life. Whatever I say now, I am saying it with clear eyes.
> {cl>=4} "Come in." | | ->endA
> "Walk with me." | | ->endB
> "I am leaving the capital." | | ->endC

::endA
@prop E none
@pose E stand
@prop K flowers
- I take the flowers, and step aside. He comes in.
@move E cr
@sfx door
@prop K none
- I close the door. I catch his sleeve, and pull him back.
@near K E
K[tease]: You forgot something.
- His eyes fall to my mouth.
E[soft]: May I?
> "Yes." | 
  K[soft]: Yes.
  @pose E touch
  @kiss E K
  @cam orbit K E
  - He cups my cheek and kisses me. I rise to meet him. My fingers slide into his hair.
  - He kisses the corner of my mouth, and stops against my forehead.
> Kiss him first. | 
  @kiss K E
  @cam orbit K E
  - I do not wait for the question to finish. He laughs into it, surprised, and then he is not laughing.
@near K E
@x K love E love
E: I love you.
K[soft]: I know.
@act E gasp
- His face flickers. I smile.
K[tease]: You are becoming very obvious.
@act E laugh
- He laughs quietly, and I kiss him again.
@cg endA
- On the writing desk, beside our hands, lies an unsigned marriage agreement. I slide it into a drawer, and take his hand instead.
@fade
@end A

::endB
@prop E none
@pose E stand
- I put the flowers in a vase, and step out to join him.
@fade
@bg garden dawn
@music soft
@cast K:cl:stand:soft E:cr:stand:soft
@cam wide
- We walk through the garden without touching. He keeps to my pace. I notice that he is counting my steps so as not to pass me.
> Tease him about it. | 
  K[tease]: You are counting.
  E[shy]: I am told I walk ahead of people. I am correcting it.
> Walk a little closer. | 
  @move K c
  - I let my shoulder come near his. He does not close the last inch. He leaves it for me.
- At the gate, I offer my hand.
@hold K E
@cg endB
- He takes it.
E[soft]: Slowly?
K[soft]: Slowly.
@fade
@end B

::endC
K[serious]: I am leaving the capital.
@act E clench
- His fingers tighten around the flower stems. Then they loosen.
E: Where will you go?
K: I will decide when I reach the road.
@pose E give
- He nods, and gives me the flowers.
E[sad]: Then I hope the weather is kind.
> "Thank you for asking nothing." | 
  K[soft]: Thank you. For not asking me to stay.
  E[soft]: I asked you to stay for three years. I have used all of mine.
> "Write to me. I may answer." | 
  K[smirk]: Write to me. I may answer. I may not.
  E[soft]: Then I will write for the pleasure of it.
> Take the flowers. Go. | 
  - I take the flowers. I do not look back. That is not cruelty. That is how you leave a place properly.
@fade
@outfit K riding
@bg garden gate
@music warm
@cast K:c:stand:proud
@cam wide
- The city gate, at dawn. My horse. My sword. His flowers, tied carefully to the saddle.
{left2=='R' || ry>=5} @enter R:l:give:smile::paper
{left2=='R' || ry>=5} R: A map. Of every road I could think of. I am not asking to come. I am asking you to write.
{left2=='R' || ry>=5} K[soft]: I will write, Rayan.
{left2=='R' || ry>=5} R[soft]: Then go. Before I say something that needs an answer.
@cg endC
@cam close K
K[proud]*: First in swordsmanship. First in spellcraft. And now, for the first time, first in my own life.
- I ride out beyond the gates.
@fade
@end C
`); })(typeof window !== 'undefined' ? window : globalThis);
