export default function quizData() { return [
	{
		id: 'santementale',
		title: 'Santé mentale',
		situation: `<p>Une personne im·migrante a des symptômes d'anxiété aiguë, et présente un état dépressif (sort peu, mange peu, s'isole...) Elle n’a pas accès aux services du CLSC et pas de sous pour aller au privé.</p> 
			<p>Lors de son évaluation sociale à Médecins du Monde, il apparaît clairement que <b>son état mental est directement en lien avec sa situation sociale et migratoire&nbsp;:</b></p>
			<ul><li>pas de possibilité de se projeter dans l'avenir car trop incertain</li>
			<li>sentiment d'inutilité</l> 
			<li>devoir se cacher pour se protéger</li> 
			<li>peur de se faire arrêter et déporter et d'être séparé·e de ses repères ou de revivre dans le pays d'origine</li> 
			<li>isolement social</li> 
			<li>exploitation par le travail…</li></ul>`,
		question: 'Selon vous, cette personne est ...',
		choix: [
			{
				text: 'en permis de séjour temporaire',
				isRightAnswer: false
			},
			{
				text: 'sans statut d’immigration',
				isRightAnswer: true
			},
			{
				text: 'étudiant·e international·e',
				isRightAnswer: false
			},
		],
		explications: [`Apparaît ici une phrase ou deux d'explications (à rédiger)`]
	} , {
		id: 'enceinte',
		title: `Femme enceinte`,
		situation: `<p>Une femme se présente à l'hôpital car elle est à 41 semaine de grossesse et doit se faire "déclencher", tel que l'indique le médecin qui a fait son suivi de grossesse dans une clinique privée. Comme il faut planifier la césarienne, ce soin n'est pas consideré comme une "urgence" aux yeux de l'hôpital et l'équipe refuse de planifier ce soin si la femme ne peut pas payer d'avance.</p>
		<p>En plus du stress de savoir si elle et son bébé vont pouvoir se rendre à terme sain et sauf, elle subit des violences verbales de la part du personnel hospitalier (par exemple : "no money, no baby").</p>
		<p>Après avoir fait plusieurs hôpitaux et passer des heures et des heures aux urgences et dans les services administratifs à expliquer sa situation, muni de son dossier médical, elle trouve enfin un médecin qui accepte de programmer sa césarienne et de prendre une entente de paiement avec elle.</p>
		<p>Comme les personnes im·migrantes sans couverture sont facturées à 200% du prix, elle sera facturée 18 000$, facture qu'elle mettra 10 ans à rembourser (sur une base de 200$ par mois).</p>`,
		question: 'Selon vous, cette personne est ...',
		choix: [
			{
				text: 'sans statut d’immigration',
				isRightAnswer: true
			},
			{
				text: 'étudiant·e international·e',
				isRightAnswer: false
			},
			{
				text: 'liée à un permis de travail fermé',
				isRightAnswer: false
			}
		],
		explications: [`Apparaît ici une phrase ou deux d'explications (à rédiger) `]
	} , {
		id: 'violenceconjugale',
		title: 'Violence conjugale',
		situation: `<p>Une personne im·migrante est arrivée au Québec pour rejoindre son conjoint canadien dans le cadre d'un processus de parrainage, dans l'espoir de pouvoir vivre ensemble.</p>
		<p>Après quelques mois de vie commune, le conjoint soustrait à sa partenaires ses papiers d’identité, devient violent psychologiquement et physiquement. Il la menace de retirer la demande de parrainage et de la faire déporter, si elle le dénonçait à la police.</p>
		<p>Malgré la crainte de perdre son statut d’immigration, elle décide de quitter son conjoint, afin de fuir ces violences et reprendre du pouvoir sans sa vie. Elle se retrouve alors en situation d'itinérance, sans savoir si la demande de parrainage a été annulée.</p>`,
		question: 'Selon vous, cette personne est ...',
		choix: [
			{
				text: 'en permis de séjour temporaire',
				isRightAnswer: true
			},
			{
				text: 'étudiant·e international·e',
				isRightAnswer: false
			},
			{
				text: 'liée à un permis de travail fermé',
				isRightAnswer: false
			}
		],
		explications: [`Apparaît ici une phrase ou deux d'explications (à rédiger) `]
	}
]}