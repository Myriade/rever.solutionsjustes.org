export default function connaitreData() { return [
	{
		idUnique: 'sans-statut',
		nom: `Maria`,
		titreCourt: 'Sans statut d’immigration',
		intro: `Bonjour, je suis Maria et je suis une personne `,
		statut: 'sans statut d’immigration',
		presentation: [
			`Cela signifie que <strong>je n'ai pas de statut d'immigration régulier au Canada</strong>. Les personnes im·migrantes peuvent se retrouver dans cette situation pour diverses raisons, comme avoir dépassé la durée de leur visa de résident temporaire, de permis d'études ou de travail, etc.`,
			`Il y a plusieurs raisons pour lesquelles nous, personnes sans statut d’immigration,  n'avons pas quitté le Canada malgré notre situation précaire. Parmi ces raisons : nous n'avons plus de liens avec notre pays d’origine, nous avons construit notre vie au Québec où nous résidons depuis des années et nous voulons rester ici, notre pays d’origine est marqué par la violence et l’insécurité, etc.`
		],
		impactIntro: `<strong>L'absence de statut</strong> d'immigration entraîne que ...`,
		impacts: [
			`On ne me donne pas <strong>accès aux services de santé et aux services sociaux</strong>. Cette situation impacte mon bien-être général et ma santé physique, car je n'ai pas accès aux soins dont j'ai besoin.`,
			`J’ai la <strong>crainte de porter plainte</strong> si je suis victime d’un crime, par exemple, de violence sexuelle.`,
			`<strong>Je vis constamment dans l'angoisse</strong> et l'invisibilité. J'appréhende de marcher dans la rue pour rendre visite à une amie ou d'ouvrir la porte au facteur, craignant d’être arrêtée par la police et de devoir m’identifier.`,
			`Je n’ai pas accès aux services municipaux de Sherbrooke qui nécessitent une pièce d'identité, comme la bibliothèque ou la piscine.`,
			`On ne me permet pas de me projeter dans l’avenir en raison de l'incertitude dans laquelle je vis. Mes aspirations sont restreintes par mon statut d’immigration, ce qui engendre un profond sentiment d’exclusion et de manque d’appartenance à la société où je vis depuis plus de 15 ans.`
		],
		mytheTitre: `Les personnes sans statut sont des ‘illégaux’.`,
		mytheSoustitre: `On ne dit pas que les personnes sont illégales : personne n'est illégal. Certaines personnes peuvent se retrouver sans statut d'immigration régulier en raison de circonstances échappant à leur contrôle.`,
		mytheExplications: [
			`Par exemple, une personne provenant du Mexique a déposé une demande d’asile pour échapper à la violence domestique et conjugale, mais cette demande a été rejetée quatre ans plus tard à cause des mauvais conseils et du manque de connaissance du système. Pendant cette période, la personne a reconstruit sa vie au Québec, créant un réseau de soutien et d’ami·e·s sur lesquels elle compte désormais. Elle craint de retourner au Mexique , où elle risquerait de se retrouver dans le même cercle de violence qu’auparavant. Elle a été convoquée pour être déportée du Canada, mais elle ne s'est pas présentée au rendez-vous. Elle a donc choisi de rester sans statut d’immigration au Québec, malgré les défis liés à l’accès aux services, la peur, la vulnérabilité et l’invisibilité.`,
			`Un étudiant international en génie civil doit renouveler son permis d’études deux ans après le début de ses études, mais il oublie de le faire à temps. En conséquence, il se retrouve sans statut d’immigration valide, son permis d’études étant expiré.`,
		]
	} ,
	{
		idUnique: 'asile-refuse',
		nom: `Hassan`,
		titreCourt: 'Demande d’asile refusée',
		intro: `Bonjour, je m'appelle Hassan et j’ai un statut d’`,
		statut: 'immigration demandeur d’asile refusé',
		presentation: [
			`Cela signifie que j'ai déposé une demande d’asile à mon arrivée au Canada, mais celle-ci a été rejetée.`,
			`Après le refus de la demande d'asile, nous pouvons encore rester sur le territoire en tant que personnes demandeuses d’asile refusées. Cependant, nos droits sont considérablement limités, et nous vivons dans l'angoisse d'être renvoyées à notre pays d'origine, là où nous croyons que nous serions en péril ou en danger de persécution, d'où la raison de notre demande d'asile. Il existe des recours et des démarches pour régulariser notre situation. Cependant, le processus est complexe et long, s'étendant sur plusieurs années, et le résultat demeure incertain, sans aucune garantie.`
		],
		impactIntro: `Mon statut d'immigration est <strong>précaire car ...</strong>`,
		impacts: [
			`On m’a contraint de quitter mon emploi et de vivre de l’aide sociale car je n’ai plus un permis de travail valide.`,
			`Je ne peux faire aucune démarche pour amener mon ou ma conjointe et enfants au Canada, et je ne peux plus leur envoyer de l’argent, car mes revenus sur l’aide sociale sont insuffisants.`,
			`On m’a informé qu'après le refus de ma demande d'asile, on va me renvoyer dans mon pays d’origine. Depuis plusieurs mois, je vis chaque jour dans le stress et la peur constante, ne sachant pas quand je serai forcée de quitter le Canada et de retourner dans mon pays.`,
			`En attendant, je cherche d’autres solutions pour rester ici, parce que j'ai encore peur des menaces et de la torture dans mon pays d’origine`
		],
		mytheTitre: `Les personnes dont la demande d'asile a été rejetée bénéficient des services sociaux et de santé sans y contribuer.`,
		mytheSoustitre: `Cette affirmation est fausse. Le rejet de la demande d'asile arrive après plusieurs années passées sur le territoire canadien en attendant une décision. Pendant cette période, les personnes demandeuses d’asile bénéficient d'un permis de travail et apportent leur contribution à la société d'accueil. `,
		mytheExplications: [
			`Après le refus de la demande d'asile, bien que celle-ci ait été rejetée, <strong>la personne peut encore demeurer sur le territoire</strong> et bénéficie de certains droits, tels que l'accès aux services de santé de base. `,
			`Malheureusement, certaines personnes dont la demande d'asile a été refusée et qui peuvent encore rester sur le territoire ne disposent plus de permis de travail, malgré leur désir de continuer à subvenir à leurs propres besoins et ainsi à l’économie du Québec.`,
			`Par exemple, <a href='https://ici.radio-canada.ca/nouvelle/1941293/rodriguez-flores-liberation-mandat-eglise' target='_blank' rel='noreferrer'>la famille Rodriguez Flores</a> a déposé une demande d’asile en 2019 et vivait à Sherbrooke en attendant une décision. Pendant cette période, la famille s’est bien intégrée, a travaillé dans les commerces locaux, et leur fils est allé à l’école. Après plusieurs années d’attente, la réponse reçue fut négative. En raison d'irrégularités dans leur dossier, ils devaient retourner au Mexique, leur pays d’origine, malgré les craintes pour leur vie là-bas. Pendant un an, en tant que demandeurs d’asile déboutés, ils ont vécu dans la peur et l’inquiétude de devoir rentrer.`
		]
	} ,
	{
		idUnique: 'violence-conjugale',
		nom: `Priya`,
		titreCourt: 'Violence conjugale',
		intro: `Bonjour, je m'appelle Priya et j’ai un statut `,
		statut: 'permis séjour temporaire pour victimes de violence conjugale',
		presentation: [
			`Cela signifie que j'ai dû fuir mon foyer pour échapper à la violence de mon conjoint. L'État canadien m'a accordé un Permis de séjour temporaire pour victimes de violence conjugale. Toutefois, ce permis doit être renouvelé chaque année, sans garantie de prolongation et avec un taux de succès relativement faible.`,
		],
		impactIntro: `Mon statut d'immigration est <strong>précaire car ...</strong>`,
		impacts: [
			`Je vis dans l’angoisse quant à la possibilité de renouveler mon Permis de séjour temporaire l’année prochaine. Si on ne m'accorde pas le renouvellement de mon permis annuel, je devrai quitter le territoire canadien.`,
			`Je vis dans l’incertitude car je ne peux pas me projeter dans l’avenir.`,
			`Je risque de perdre la garde de mes enfants au profit de mon mari violent, car après avoir quitté le foyer où je subissais de la violence conjugale, je réside dans un centre d’hébergement pour femmes victimes de violence et je n’ai pas encore trouvé de logement adéquat où je pourrais vivre avec mes enfants.`
		],
		mytheTitre: `Les femmes im·migrantes qui dénoncent la violence conjugale cherchent à manipuler le système pour obtenir des avantages.`,
		mytheSoustitre: `Au contraire, en dénonçant la violence de leur conjoint, elles risquent de compromettre leur accès au statut permanent.`,
		mytheExplications: [
			`En fait, ces femmes im·migrantes se trouvent souvent dans un processus de parrainage, où leur conjoint canadien dépose une demande pour les parrainer et leur permettre d’obtenir un statut légal et permanent au Canada grâce à lui.`,
			`Cette situation de dépendance est un terreau fertile pour les abus : le processus de parrainage crée une dépendance où la personne im·migrante dépend de son partenaire pour régulariser son statut d’immigration. Étant donné l'importance cruciale du statut d’immigration pour stabiliser et régulariser leur situation au Canada, le partenaire peut exploiter cette position de pouvoir pour exercer des violences.`,
			`En dénonçant une situation de violence conjugale, les personnes im·migrantes mettent fin à leur demande de résidence permanente initiée par le parrainage et se retrouvent souvent sans statut d’immigration, dans une situation particulièrement précaire.`,
			`Par exemple, je suis arrivée au Québec en provenance d’Inde pour rejoindre mon amoureux. Cependant, après quelques années de vie commune, il a commencé à m'isoler de ma famille et de mon réseau social, et, progressivement, à m'exploiter sexuellement. J'ai finalement dû tout abandonner pour me réfugier dans un centre d'hébergement pour femmes, sans statut d'immigration, sans soutien, sans plus de liens avec mon pays d’origine, et avec une incertitude quant à la possibilité de rester au Canada. J'ai obtenu un Permis de séjour temporaire pour victimes de violence conjugale il y a 9 mois, mais je me demande ce qu'il adviendra dans 3 mois, car je ne suis pas certaine de pouvoir obtenir un renouvellement et je ne peux pas rentrer en Inde. `
		]
	} , 
	{
		idUnique: 'permis-travail-ferme',
		nom: `Mohammed`,
		titreCourt: 'permis de travail fermé',
		intro: `Bonjour, je m'appelle Mohammed et j’ai un `,
		statut: 'Permis de travail fermé',
		presentation: [
			`Cela signifie que j’ai un permis de travail temporaire qui me permet de travailler uniquement pour un employeur, me rendant ainsi entièrement dépendant de lui. Par conséquent, ma présence sur le territoire dépend entièrement de cette personne.`,
		],
		impactIntro: `Mon statut d'immigration est <strong>précaire car ...</strong>`,
		impacts: [
			`J’ai peur de faire valoir mes droits et de dénoncer une situation d’exploitation de la part de mon employeur par crainte de perdre mon emploi et, par conséquent, mon statut d’immigration.`,
			`On ne me permet pas de changer de travail ni d'employeur.`,
			`Après un an et demi de travail, je n'ai pas pu encore prendre de vacances, et j'hésite à insister de peur que cela nuise à la possibilité de renouveler mon permis.`,
			`Je n’ai jamais été payé pour les heures supplémentaires, même si je fais plus de 75 heures par semaine et que je suis payé pour 35 heures.`
		],
		mytheTitre: `Les personnes im·migrantes détenant un Permis de travail fermé viennent voler notre travail.`,
		mytheSoustitre: `Cette affirmation est incorrecte. Les personnes im·migrantes avec un permis de travail fermé sont engagées par l'entreprise en raison de besoins spécifiques en main-d'œuvre. `,
		mytheExplications: [
			`Avant de recruter un travailleur ou travailleuse im·migrante, l'entreprise doit soumettre au gouvernement canadien une étude d'impact sur le marché du travail, démontrant ainsi qu'aucun travailleur ou travailleuse canadienne ou résident·e permanent·e n'est disponible pour le poste. Cette procédure est indispensable pour justifier l'embauche d'une personne im·migrante avec ce type de permis.`,
			`Il s'agit d'un type de permis de travail lié à un employeur donné. Cela signifie que les travailleurs et travailleuses im·migrantes ne peuvent pas changer d'employeur, ce qui crée une situation de dépendance vis-à-vis de leur employeur et donc qui peut entraîner des abus ou des situations d’exploitation.`
		]
	} ,
]}