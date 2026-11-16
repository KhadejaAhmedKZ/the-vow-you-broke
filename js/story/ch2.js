(function (root) { (root.OYK = root.OYK || {}).story = root.OYK.story || []; root.OYK.story.push(String.raw`
::ch2
@outfit K emerald
@outfit E formal
@outfit R cream
@music warm
@fade
@title 2 Jealousy in Gold
@bg ballroom night
@cast K:c:stand:neutral
@cam high
- The Winter Assembly. A palace ballroom lit by floating candles. Gold balconies. Snow gathering against the glass roof.
@cam close K
- A deep emerald gown. An open back. My hair is pinned up with a small dagger. Conversations go soft as people recognize me.
K*: In my first life I came to this ball on Ellis's arm. Tonight I came alone. On purpose.
@cast K:c:stand:neutral E:rr:cup:neutral
@cam close E
@act E gasp
- Across the room, Ellis stops speaking in the middle of a sentence.
@enter R:l:give:smile
@cam two K R
- A hand appears in front of me. Cream coat. Crooked gold tie.
R: You look like you are deciding which guest to duel.
> "Only three. I am being sociable." | ry+1
  K[smirk]: Only three. I am being sociable.
  R[laugh]: Then I am honored not to be on the list.
> "Your tie is crooked." | ry+1
  K[tease]: Your tie is crooked, Investigator.
  R[smile]: It is always crooked. It is how people know it is me.
> "Starting with you." | bold+1
  K[smirk]: Starting with you.
  R[laugh]: Good. I have missed losing to you.
- Rayan Sol. Royal investigator. My old training partner. Warm. Hard to frighten. In my first life, I stopped answering his letters.
R[soft]: Dance with me? You may say no. I will only sulk a little.
> Take his hand. | ry+2 danceR=1 | ->c2dance
> "One dance." | ry+1 danceR=1 | ->c2dance
> "Not tonight, Rayan." | | ->c2nodance

::c2nodance
K[soft]: Not tonight. Stand with me instead.
R[smile]: Standing. My second best skill.
@cast K:c:stand:soft R:cl:stand:smile E:rr:cup:jealous
@cam group
- We watch the dancers. He tells me which lord cheats at cards. I laugh. I did not mean to.
@act K laugh
@cam close E
- Across the ballroom, Ellis's thumb presses against the edge of his glass.
@go c2after

::c2dance
@cast K:c:stand:smile R:cl:stand:smile E:rr:cup:jealous
@dance K R
@music warm
- He leads me onto the floor. Candles drift over our heads. He turns me under his arm, and my skirt sweeps outward.
@cg dance2
- I miss half a step.
> Laugh at myself. | ry+1
  @x K laugh
  - I laugh. He changes his own step, quietly, to match my mistake. Nobody else sees.
> Step on his foot. On purpose. | ry+1 bold+1
  @x K tease
  - I step on his foot. He winces, grandly, for the whole room. I laugh out loud.
> Glance at Ellis. | cl+1
  @x K neutral
  - Over Rayan's shoulder, I look for a black uniform. I find it at once. He has not looked away once.
R[soft]: There. That laugh. I have not heard it since the academy.
@cam close E
- Across the ballroom, Ellis's thumb presses against the edge of his glass.
@apart
@go c2after

::c2after
@cam close E
@act E clench
- Ellis watches that laugh.
- He remembers a dining table. A wife waiting across from him. All the things he was too frightened to say.
@cam two K R
R: Careful. The Commander is looking at me as if I owe him money.
> "Let him look." | ds+1
  K[smirk]: Let him look. It is the only thing he ever learned to do.
> "He has no right." | 
  K[serious]: He has no right to look at anyone that way. Least of all me.
> "Is he all right?" | cl+1
  K[worried]: ...Does he look ill to you?
  R[soft]: He looks like a man watching his house burn. I am sorry. I should not find that funny.
R[serious]: Khadeja. Something is wrong with the oath archive. Records are missing. Marriage contracts. I may need a spellblade's ears.
K: Then you will have them. Tomorrow. Tonight I need air.
@fade
@bg conservatory night
@music night
@cast K:cl:stand:neutral
@cam wide
- The conservatory. A glass passage full of orange trees and white flowers. The music from the ballroom is distant and soft.
@act K sigh
- I step inside to cool down.
@cast K:cl:stand:serious E:rr:stand:neutral
@cam two K E
- Ellis stands near the opposite door.
> "If you followed me, admit it." | 
  K[serious]: If you followed me, admit it before I waste time asking.
> Turn to leave. | ds+1
  @act K turnaway
  - I turn to go. His voice stops me.
> Wait for him to speak. | cl+1
  - I wait. He has never once spoken first. Let us see if dying taught him anything.
E: I followed you.
@pose K cross
- I fold my arms.
E[serious]: Are you accepting his courtship?
K[smirk]: Would that change your manners?
@act E lookaway
E: He touched your back.
K: We were dancing.
E: I know.
K[serious]: Then why do you sound like he stole something?
@move E cr
- Ellis comes closer. His steps slow when he reaches me.
@pose E touch
@cam close E
- His hand lifts. Stops. Then touches a loose strand of my hair.
> Catch his wrist. | bd+1
  @pose K reach
  - I catch his wrist before he can tuck it away.
> Let him. | cl+1
  - I let him tuck it behind my ear. His fingers are cold. They always were.
> Step back. | ds+1
  @act K stepback
  @pose E stand
  - I step back. His hand stays in the air, holding nothing.
@pose K stand
@pose E stand
K[serious]: Ask.
- His eyes drop to my mouth.
E[sad]: If I ask whether you still think about me, will you answer?
K: You would not like the answer.
@sfx door
- Footsteps outside. Rayan's voice, calling my name.
@x E jealous
@act E clench
- Ellis's face changes.
E: Let him see.
@sfx heart
@pose E touch
@kiss E K
@x K surprised
- Before I understand, he catches my jaw and kisses me.
- One beat. I am frozen. The music goes on beyond the glass.
@apart
@act K shove
@act E stumble
@cast K:cl:stand:angry E:r:stand:hurt
@cam two K E
- I plant both palms on his chest and shove him away.
K[angry]: Don't touch me again.
- He lets go at once.
@act K wipe
- I wipe my mouth with the back of my hand.
@cg kiss2
K[cold]: Was that for me, or your audience?
- He cannot answer quickly enough.
@enter R:ll:stand:serious
@cam group
- The conservatory door opens. Rayan stops.
E[hurt]: Khadeja—
K[angry]: You wanted to show him I was yours.
@move K c
- I step closer. I make him meet my eyes.
K[serious]: I am standing right here, telling you I am not.
@set bd+1
> Leave with Rayan. | left2=R ry+2 | ->c2R
> Leave alone. | left2=alone bold+1 | ->c2alone
> "One sentence. Then you leave." | left2=explain | ->c2explain

::c2R
@cam two K R
@pose R give
- Rayan offers his arm. He does not reach for me. He waits for me to take it.
> Take his arm. | ry+1
  @hold K R
  - I take it. He is warm. He says nothing at all until we reach the stairs.
> Walk beside him. | 
  - I walk beside him, not touching. He lowers his arm without a word, and matches my pace.
R[serious]: I am not going to ask. But if you want a witness statement, I am a very good witness.
K[soft]: Not tonight. Tonight just walk.
@apart
@go c2end

::c2alone
@cam group
@act E stepback
- I walk out between them. Both men move aside.
K[serious]*: Nobody's arm. Nobody's ring. Only my own feet on the marble.
R[soft]: Khadeja. If you need—
K: I know where to find you.
@exit K
@go c2end

::c2explain
@cam two K E
K[cold]: One sentence. Then you leave.
@act E bowhead
E[cry]: I saw someone making you happy, and I wanted to be him so badly that I made you hate me instead.
- It is the longest true thing he has ever said to me.
> "Remember that." | bd+1
  K[serious]: Then remember what you did, when you wonder why I keep my distance.
> "That is not an apology." | bd+1 ds+1
  K[cold]: That is a reason. It is not an apology. Learn the difference.
  E[sad]: I will.
> Say nothing. Go. | cl+1
  - I look at him for a long moment. Then I go. I do not slam the door. He would have found that easier.
@set heard2=1
@exit K
@go c2end

::c2end
@cast E:c:down:sad
@cam close E
@music sad
- Ellis stays in the conservatory after everyone has gone.
@act E bowhead
- In the dark glass, his reflection wears the wedding clothes from our first life.
@fade
@go ch3
`); })(typeof window !== 'undefined' ? window : globalThis);
