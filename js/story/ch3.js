(function (root) { (root.OYK = root.OYK || {}).story = root.OYK.story || []; root.OYK.story.push(String.raw`
::ch3
@outfit K riding
@outfit E coat
@outfit R cream
@music night
@fade
@title 3 The Room He Kept
@bg archive night
@cast K:c:stand:serious
@cam high
- The forbidden archive. Shelves go down into a round chamber under the palace. Memory crystals glow inside locked brass cages.
@cam close K
- Black riding trousers. A burgundy tunic. My hair in a tight braid. Rayan left the lower door unlocked, and told nobody.
K*: My magic hears the rhythm inside other magic. This room sounds like a hundred sleeping hearts.
- On the floor is a seal of three rings. Above the shelves, three kinds of crystal: blue, violet and gold. The light must fall in the right order.
@go c3p1

::c3p1
K*: The outer ring first. It hums low. Which crystal answers a low note?
> Turn the gold cage. | | ->c3p2
> {!w1a} Turn the violet cage. | tries+1 w1a=1
  @act K reach
  - Violet light crosses the floor. The outer ring stays dark. Wrong note. I turn it back.
  @go c3p1
> {!w1b} Turn the blue cage. | tries+1 w1b=1
  @act K reach
  - Blue light falls on the seal and slides off, like water on glass. Not this one.
  @go c3p1

::c3p2
@act K reach
@sfx chime
- Gold light lands on the outer ring. It holds.
K*: The middle ring. Its rhythm is uneven. Two beats, then a gap.
> Turn the violet cage. | | ->c3p3
> {!w2} Turn the blue cage. | tries+1 w2=1
  @act K reach
  - Too steady. The ring flickers and goes out. I listen again.
  @go c3p2

::c3p3
@act K reach
@sfx chime
- Violet light takes the middle ring. One ring left. It is beating fast, like something afraid.
> Turn the blue cage. | 
  @act K reach
> Sing its rhythm back to it. | bold+1
  @fx K aura
  - I hum the rhythm back, a little slower. The last crystal turns by itself, to listen.
@sfx chime
@flash
@fx K aura off
- The seal opens. An oath record rises out of the floor.
Archive: Contract amendment. Affection expressed by the bearer shall increase extraction from the named spouse.
@x K worried
- I frown. My name appears. Then his.
@fade
@card A memory.
@outfit E shirt
@bg bedroom day
@music sad
@cast E:c:sit:sad::cloth
@cam close E
- An image forms above the crystal. Our old bedroom. I am asleep, with a fever. Ellis sits beside me, holding a cloth to my forehead.
E[sad]: You asked whether I missed you.
@act E bowhead
- His younger face twists.
E: You were only gone until supper.
E[cry]: I missed you before you reached the gate.
@cg memory3
@fade
@outfit E coat
@bg archive night
@cast K:c:reach:hurt
@cam close K
- I reach toward the memory.
@sfx sting
@flash
- The crystal burns red.
Archive: Affection detected. Spousal extraction increased.
@act K flinch
- In the memory, I wince in my sleep. And Ellis pulls his hand away as though it has caught fire.
@pose K stand
K[hurt]*: Every kind word hurt me. So he stopped saying them. And never told me why.
> He should have told me. | bd+1
  K[angry]*: He decided for me. He let me think I was unloved for three years. That is not protection.
> He was trying to save me. | cl+1
  K[sad]*: Every cold dinner. Every closed door. He thought he was keeping me alive.
> Both are true. | cl+1 bd+1
  K[serious]*: He was saving me. He was also choosing for me. I can hold both.
@fade
@bg residence hall
@music sad
@cast K:cl:stand:serious E:r:stand:neutral
@cam wide
- The western residence. Dark wood. Cold fireplaces. Curtains that have not been opened.
@cam two K E
- He lets me inside, and keeps his distance.
E: You found the amendment.
K[serious]: You knew what it was doing.
E: I learned after the wedding.
K[angry]: And decided I could not be trusted with my own life?
@act E bowhead
E[sad]: I thought if you hated me, you might leave before it killed you.
K: You asked me to stay every time I tried.
- A long silence.
E: Yes.
K*: That answer hurts more than an excuse.
> "Why did you ask me to stay?" | cl+1
  K[hurt]: Why? If you wanted me gone?
  E[sad]: Because I am not as good a man as my plan needed.
> "You do not get credit for honesty now." | bd+1
  K[cold]: You do not get credit for being honest three years late.
  E: I am not asking for credit.
> Walk past him. | 
  - I walk past him. He turns his shoulders so that I do not have to touch him.
@fade
@bg residence keep
@cast K:c:stand:surprised E:rr:stand:sad
@cam wide
- A half-open room. Shelves of small things. A cracked practice sword. A tournament ribbon. A chipped blue cup.
- My cup.
@prop K bluecup
@pose K read
@cam close K
- I lift it. The handle has been mended with silver.
K[hurt]: You told me the servants threw this away.
E: You stopped using it when it broke.
K: So you kept it?
@cam close E
E[sad]: I kept everything you stopped reaching for.
@cg cup3
@cam two K E
- I turn.
> "Including me?" | cl+1
  K[hurt]: Including me?
  @act E lookaway
  - He looks away first.
> Put the cup back. | ds+1
  @prop K none
  @pose K stand
  - I put it back on its shelf. It is his now. It has been for a long time.
> Keep the cup. | cl+1 cup=1
  K[serious]: This is mine. I am taking it.
  E[soft]: It was always yours.
@prop K none
@pose K stand
@fade
@bg pavilion rain
@music soft
@cast K:c:stand:neutral E:rr:stand:sad
@cam wide
- A stone pavilion beside the residence. Rain hits the pond hard enough to blur it. I wait under the roof for my carriage.
- Ellis stops at the edge of the steps. In the rain.
@cam close E
E[serious]: About the conservatory. I kissed you to make another man step away. You told me to stop, and I should never have made you need to.
@cam two K E
- I watch the rain collect on his shoulders.
K: Why are you standing out there?
E: You asked for distance.
> Make room under the roof. | cl+1 roof3=1
  @move K cl
  @move E cr
  @cg rain3
  - I move a little. He joins me under the roof, without touching. For a while we listen to the rain.
> "Stand there, then." | ds+1
  K[smirk]: Then stand there. It suits you.
  @act E nod
  - He does. He does not complain. Water runs down his collar. After a minute I cannot bear it, and point at the roof.
  @move K cl
  @move E cr
> "You will catch cold, Commander." | cl+1 roof3=1
  K[tease]: You will catch cold, Commander. Come here. That is not forgiveness. It is weather.
  @move K cl
  @move E cr
  @cg rain3
K[sad]: Was any of it real?
E: The ugly parts were. So were the parts you never saw.
@hold K E
@act E gasp
- I take his hand, and turn it palm upward. His breath catches.
> Kiss his knuckles. | cl+2 held3=1
  - I kiss his knuckles. A small thing. Deliberate. He closes his eyes like it hurts.
> Hold his hand. | cl+1 held3=1
  - I hold it. I let the silence go on. The rain does the talking.
> Let go. | ds+1
  @apart
  K[serious]: I needed the truth. I have not decided what comes next.
  E[soft]: That is more than I had this morning.
  @go c3vesper
> Stop just short of his mouth. | cl+1 | ->c3kiss
- The carriage lamps come through the rain.
@apart
@go c3vesper

::c3kiss
@near K E
@cam tight K E
- I rise onto my toes, and stop just short of his mouth.
K[serious]: This one is my decision.
> Kiss him. | kiss3=1 cl+2
  @kiss K E
  - I kiss him. He stays perfectly still, until my fingers close around his collar. Then his hand settles, very lightly, at my waist.
  @cg kiss3
  @near K E
  @x K soft E love
  - When I draw back, he follows an inch before he catches himself.
  E: May I kiss you again?
> Step down. Not yet. | cl+1
  @apart
  K[soft]: Not yet. But I wanted you to know I thought about it.
  E[soft]: I will think about it enough for two.
  @go c3vesper
- He waits. He does not lean in. He asks, and then he waits.
> "Once." | cl+1 kiss3b=1
  K[tease]: Once.
  @kiss E K
  - He kisses me slowly, as though he has finally understood that I can leave.
  @near K E
> "Not tonight." | bd+1
  K[soft]: Not tonight. One was my limit.
  E[soft]: Then one was enough.
@apart
@go c3vesper

::c3vesper
@cast K:cl:stand:neutral E:cr:stand:neutral
@cam wide
@music tense
- On the pond, our reflections stay close, even after we step apart.
@sfx sting
@enter V:ll:stand:smirk
@cam close V
- Then a third reflection appears behind them.
- Lady Vesper. Keeper of the royal oath archive.
@fade
@go ch4
`); })(typeof window !== 'undefined' ? window : globalThis);
