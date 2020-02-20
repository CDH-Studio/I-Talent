import React from "react";
import { Row } from "antd";
import SiderLayout from "../components/layout/SiderLayout";
import { Button } from "antd";
import moment from "moment";
import ChangeLanguage from "../components/changeLanguage/ChangeLanguage";
import { FormattedMessage, injectIntl } from "react-intl";

class Home extends React.Component {
  goto = link => this.props.history.push(link);

  constructor(props) {
    super(props);

    document.title = "Home | UpSkill";
  }

  render() {
    return (
      <SiderLayout>
        <h1>Hi, {localStorage.getItem("name")}</h1>
        <FormattedMessage id="landing.benefit.find.people" />
        <Row>
          <Button
            type="danger"
            onClick={() => {
              this.goto("/");
              this.props.keycloak.logout();
            }}
          >
            {this.props.intl.formatMessage({
              id: "sign.out",
              defaultMessage: "Logout"
            })}
          </Button>
          <p>
            Chapter One A Stop on the Salt Route 1000 B.C. As they rounded a
            bend in the path that ran beside the river, Lara recognized the
            silhouette of a fig tree atop a nearby hill. The weather was hot and
            the days were long. The fig tree was in full leaf, but not yet
            bearing fruit. Soon Lara spotted other landmarks—an outcropping of
            limestone beside the path that had a silhouette like a man’s face, a
            marshy spot beside the river where the waterfowl were easily
            startled, a tall tree that looked like a man with his arms upraised.
            They were drawing near to the place where there was an island in the
            river. The island was a good spot to make camp. They would sleep on
            the island tonight. Lara had been back and forth along the river
            path many times in her short life. Her people had not created the
            path—it had always been there, like the river—but their
            deerskin-shod feet and the wooden wheels of their handcarts kept the
            path well worn. Lara’s people were salt traders, and their
            livelihood took them on a continual journey. At the mouth of the
            river, the little group of half a dozen intermingled families
            gathered salt from the great salt beds beside the sea. They groomed
            and sifted the salt and loaded it into handcarts. When the carts
            were full, most of the group would stay behind, taking shelter amid
            rocks and simple lean-tos, while a band of fifteen or so of the
            heartier members set out on the path that ran alongside the river.
            With their precious cargo of salt, the travelers crossed the coastal
            lowlands and traveled toward the mountains. But Lara’s people never
            reached the mountaintops; they traveled only as far as the
            foothills. Many people lived in the forests and grassy meadows of
            the foothills, gathered in small villages. In return for salt, these
            people would give Lara’s people dried meat, animal skins, cloth spun
            from wool, clay pots, needles and scraping tools carved from bone,
            and little toys made of wood. Their bartering done, Lara and her
            people would travel back down the river path to the sea. The cycle
            would begin again. It had always been like this. Lara knew no other
            life. She traveled back and forth, up and down the river path. No
            single place was home. She liked the seaside, where there was always
            fish to eat, and the gentle lapping of the waves lulled her to sleep
            at night. She was less fond of the foothills, where the path grew
            steep, the nights could be cold, and views of great distances made
            her dizzy. She felt uneasy in the villages, and was often shy around
            strangers. The path itself was where she felt most at home. She
            loved the smell of the river on a hot day, and the croaking of frogs
            at night. Vines grew amid the lush foliage along the river, with
            berries that were good to eat. Even on the hottest day, sundown
            brought a cool breeze off the water, which sighed and sang amid the
            reeds and tall grasses. Of all the places along the path, the area
            they were approaching, with the island in the river, was Lara’s
            favorite. The terrain along this stretch of the river was mostly
            flat, but in the immediate vicinity of the island, the land on the
            sunrise side was like a rumpled cloth, with hills and ridges and
            valleys. Among Lara’s people, there was a wooden baby’s crib,
            suitable for strapping to a cart, that had been passed down for
            generations. The island was shaped like that crib, longer than it
            was wide and pointed at the upriver end, where the flow had eroded
            both banks. The island was like a crib, and the group of hills on
            the sunrise side of the river were like old women mantled in heavy
            cloaks gathered to have a look at the baby in the crib—that was how
            Lara’s father had once described the lay of the land. Larth spoke
            like that all the time, conjuring images of giants and monsters in
            the landscape. He could perceive the spirits, called numina, that
            dwelled in rocks and trees. Sometimes he could speak to them and
            hear what they had to say. The river was his oldest friend and told
            him where the fishing would be best. From whispers in the wind he
            could foretell the next day’s weather. Because of such skills, Larth
            was the leader of the group. “We’re close to the island, aren’t we,
            Papa?” said Lara. “How did you know?” “The hills. First we start to
            see the hills, off to the right. The hills grow bigger. And just
            before we come to the island, we can see the silhouette of that fig
            tree up there, along the crest of that hill.” “Good girl!” said
            Larth, proud of his daughter’s memory and powers of observation. He
            was a strong, handsome man with flecks of gray in his black beard.
            His wife had borne several children, but all had died very young
            except Lara, the last, whom his wife had died bearing. Lara was very
            precious to him. Like her mother, she had golden hair. Now that she
            had reached the age of childbearing, Lara was beginning to display
            the fullness of a woman’s hips and breasts. It was Larth’s greatest
            wish that he might live to see his own grandchildren. Not every man
            lived that long, but Larth was hopeful. He had been healthy all his
            life, partly, he believed, because he had always been careful to
            show respect to the numina he encountered on his journeys.
            Respecting the numina was important. The numen of the river could
            suck a man under and drown him. The numen of a tree could trip a man
            with its roots, or drop a rotten branch on his head. Rocks could
            give way underfoot, chuckling with amusement at their own treachery.
            Even the sky, with a roar of fury, sometimes sent down fingers of
            fire that could roast a man like a rabbit on a spit, or worse, leave
            him alive but robbed of his senses. Larth had heard that the earth
            itself could open and swallow a man; though he had never actually
            seen such a thing, he nevertheless performed a ritual each morning,
            asking the earth’s permission before he went striding across it.
            “There’s something so special about this place,” said Lara, gazing
            at the sparkling river to her left and then at the rocky,
            tree-spotted hills ahead and to her right. “How was it made? Who
            made it?” Larth frowned. The question made no sense to him. A place
            was never made, it simply was. Small features might change over
            time. Uprooted by a storm, a tree might fall into the river. A
            boulder might decide to tumble down the hillside. The numina that
            animated all things went about reshaping the landscape from day to
            day, but the essential things never changed, and had always existed:
            the river, the hills, the sky, the sun, the sea, the salt beds at
            the mouth of the river. He was trying to think of some way to
            express these thoughts to Lara, when a deer, drinking at the river,
            was startled by their approach. The deer bolted up the brushy bank
            and onto the path. Instead of running to safety, the creature stood
            and stared at them. As clearly as if the animal had whispered aloud,
            Larth heard the words “Eat me.” The deer was offering herself. Larth
            turned to shout an order, but the most skilled hunter of the group,
            a youth called Po, was already in motion. Po ran forward, raised the
            sharpened stick he always carried and hurled it whistling through
            the air between Larth and Lara. A heartbeat later, the spear struck
            the deer’s breast with such force that the creature was knocked to
            the ground. Unable to rise, she thrashed her neck and flailed her
            long, slender legs. Po ran past Larth and Lara. When he reached the
            deer, he pulled the spear free and stabbed the creature again. The
            deer released a stifled noise, like a gasp, and stopped moving.
            There was a cheer from the group. Instead of yet another dinner of
            fish from the river, tonight there would be venison. The distance
            from the riverbank to the island was not great, but at this time of
            year—early summer—the river was too high to wade across. Lara’s
            people had long ago made simple rafts of branches lashed together
            with leather thongs, which they left on the riverbanks, repairing
            and replacing them as needed. When they last passed this way, there
            had been three rafts, all in good condition, left on the east bank.
            Two of the rafts were still there, but one was missing. “I see it!
            There—pulled up on the bank of the island, almost hidden among those
            leaves,” said Po, whose eyes were sharp. “Someone must have used it
            to cross over.” “Perhaps they’re still on the island,” said Larth.
            He did not begrudge others the use of the rafts, and the island was
            large enough to share. Nonetheless, the situation required caution.
            He cupped his hands to his mouth and gave a shout. It was not long
            before a man appeared on the bank of the island. The man waved. “Do
            we know him?” said Larth, squinting. “I don’t think so,” said Po.
            “He’s young—my age or younger, I’d say. He looks strong.” “Very
            strong!” said Lara. Even from this distance, the young stranger’s
            brawniness was impressive. He wore a short tunic without sleeves,
            and Lara had never seen such arms on a man. Po, who was small and
            wiry, looked at Lara sidelong and frowned. “I’m not sure I like the
            look of this stranger.” “Why not?” said Lara. “He’s smiling at us.”
            In fact, the young man was smiling at Lara, and Lara alone. His name
            was Tarketios. Much more than that, Larth could not tell, for the
            stranger spoke a language which Larth did not recognize, in which
            each word seemed as long and convoluted as the man’s name.
            Understanding the deer had been easier than understanding the
            strange noises uttered by this man and his two companions! Even so,
            they seemed friendly, and the three of them presented no threat to
            the more numerous salt traders. Tarketios and his two older
            companions were skilled metalworkers from a region some two hundred
            miles to the north, where the hills were rich with iron, copper, and
            lead. They had been on a trading journey to the south and were
            returning home. Just as the river path carried Larth’s people from
            the seashore to the hills, so another path, perpendicular to the
            river, traversed the long coastal plain. Because the island provided
            an easy place to ford the river, it was here that the two paths
            intersected. On this occasion, the salt traders and the metal
            traders happened to arrive at the island on the same day. Now they
            met for the first time. The two groups made separate camps at
            opposite ends of the island. As a gesture of friendship, speaking
            with his hands, Larth invited Tarketios and the others to share the
            venison that night. As the hosts and their guests feasted around the
            roasting fire, Tarketios tried to explain something of his craft.
            Firelight glittered in Lara’s eyes as she watched Tarketios point at
            the flames and mime the act of hammering. Firelight danced across
            the flexing muscles of his arms and shoulders. When he smiled at
            her, his grin was like a boast. She had never seen teeth so white
            and so perfect. Po saw the looks the two exchanged and frowned.
            Lara’s father saw the same looks and smiled. The meal was over. The
            metal traders, after many gestures of gratitude for the venison,
            withdrew to their camp at the far side of the island. Before he
            disappeared into the shadows, Tarketios looked over his shoulder and
            gave Lara a parting grin. While the others settled down to sleep,
            Larth stayed awake a while longer, as was his habit. He liked to
            watch the fire. Like all other things, fire possessed a numen that
            sometimes communicated with him, showing him visions. As the last of
            the embers faded into darkness, Larth fell asleep. Larth blinked.
            The flames, which had dwindled to almost nothing, suddenly shot up
            again. Hot air rushed over his face. His eyes were seared by white
            flames brighter than the sun. Amid the dazzling brightness, he
            perceived a thing that levitated above the flames. It was a
            masculine member, disembodied but nonetheless rampant and upright.
            It bore wings, like a bird, and hovered in midair. Though it seemed
            to be made of flesh, it was impervious to the flames. Larth had seen
            the winged phallus before, always in such circumstances, when he
            stared at a fire and entered a dream state. He had even given it a
            name, or more precisely, the thing had planted its name in his mind:
            Fascinus. Fascinus was not like the numina that animated trees,
            stones, or rivers. Those numina existed without names. Each was
            bound to the object in which it resided, and there was little to
            differentiate one from another. When such numina spoke, they could
            not always be trusted. Sometimes they were friendly, but at other
            times they were mischievous or even hostile. Fascinus was different.
            It was unique. It existed in and of itself, without beginning or
            end. Clearly, from its form, it had something to do with life and
            the origin of life, yet it seemed to come from a place beyond this
            world, slipping for a few moments through a breach opened by the
            heat of the dancing flames. An appearance by Fascinus was always
            significant. The winged phallus never appeared without giving Larth
            an answer to a dilemma that had been troubling him, or planting an
            important new thought in his mind. The guidance given to him by
            Fascinus had never led Larth astray. Elsewhere, in distant
            lands—Greece, Israel, Egypt—men and women worshiped gods and
            goddesses. Those people made images of their gods, told stories
            about them, and worshiped them in temples. Larth had never met such
            people. He had never even heard of the lands where they lived, and
            he had never encountered or conceived of a god. The very concept of
            a deity such as those other men worshiped was unknown to Larth, but
            the closest thing to a god in his imagination and experience was
            Fascinus. With a start, he blinked again. The flames had died. In
            place of intolerable brightness there was only the darkness of a
            warm summer night lit by the faintest sliver of a moon. The air on
            his face was no longer hot but fresh and cool. Fascinus had
            vanished—but not without planting a thought in Larth’s mind. He
            hurried to the leafy bower beside the river where Lara liked to
            sleep, thinking to himself, It must be made so, because Fascinus
            says it must! He knelt beside her, but there was no need to wake
            her. She was already awake. “Papa? What is it?” “Go to him!” She did
            not need to ask for an explanation. It was what she had been
            yearning to do, lying restless and eager in the dark. “Are you sure,
            Papa?” “Fascinus . . . ,” He did not finish the thought, but she
            understood. She had never seen Fascinus, but he had told her about
            it. Many times in the past, Fascinus had given guidance to her
            father. Now, once again, Fascinus had made its will known. The
            darkness did not deter her. She knew every twist and turn of every
            path on the little island. When she came to the metal trader’s camp,
            she found Tarketios lying in a leafy nook secluded from the others;
            she recognized him by his brawny silhouette. He was awake and
            waiting, just as she had been lying awake, waiting, when her father
            came to her. At her approach, Tarketios rose onto his elbows. He
            spoke her name in a whisper. There was a quiver of something like
            desperation in his voice; his neediness made her smile. She sighed
            and lowered herself beside him. By the faint moonlight, she saw that
            he wore an amulet of some sort, suspended from a strap of leather
            around his neck. Nestled amid the hair on his chest, the bit of
            shapeless metal seemed to capture and concentrate the faint
            moonlight, casting back a radiance brighter than the moon itself.
            His arms—the arms she had so admired earlier—reached out and closed
            around her in a surprisingly gentle embrace. His body was as warm
            and naked as her own, but much bigger and much harder. She wondered
            if Fascinus was with them in the darkness, for she seemed to feel
            the beating of wings between their legs as she was entered by the
            thing that gave origin to life. Copyright © 2007 by Steven Saylor.
            All rights reserved.
          </p>
        </Row>
        <Row>{moment().format("LL")}</Row>
        <ChangeLanguage changeLanguage={this.props.changeLanguage} />
      </SiderLayout>
    );
  }
}

//Needed when using this,props.intl
export default injectIntl(Home);
