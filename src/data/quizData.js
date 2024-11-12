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
		choix: [
			{
				text: 'Elle n’a pas de statut d’immigration',
				isRightAnswer: true
			},
			{
				text: 'Elle est une étudiant.e international.e',
				isRightAnswer: false
			},
			{
				text: 'Elle est un.e résident.e permanent.e au Canada',
				isRightAnswer: false
			},
		],
		explications: `<p>Les personnes sans statut d'immigration vivent fréquemment dans l'angoisse et l'invisibilité à cause de leur statut d’immigration.</p> 
		<p>Leurs aspirations sont limitées, et elles peinent à se projeter dans l'avenir en raison de l'incertitude permanente qui les entoure. Cette situation engendre souvent des problèmes de santé mentale.</p>
		<p>Connaissez-vous <a target='_blank' href='/connaitre/#sans-statut'>l'histoire de Maria</a> ? Cliquez pour en savoir plus sur les conséquences du manque de statut et les raisons qui peuvent mener à cette situation.</p>`
	} , 
	{
		id: 'separationfamiliale',
		title: 'Séparation familiale',
		situation: `<p>Un père d'un enfant de 3 ans est toujours ému lorsqu'il parle avec lui en ligne. Son cœur est brisé, car il n'a jamais eu la chance de rencontrer son enfant en personne et de <b>le tenir dans ses bras</b>.</p>`,
		choix: [
			{
				text: 'Elle a un permis de travail fermé au Québec',
				isRightAnswer: false
			},
			{
				text: 'Elle a demandé l’asile au Canada',
				isRightAnswer: false
			},
			{
				text: 'Elle est réfugiée acceptée',
				isRightAnswer: true
			}
		],
		explications: `<p>Elle est également en processus de réunification familiale. Avant de pouvoir entamer le processus de réunification familiale, les personnes doivent d'abord régulariser leur situation en obtenant une réponse positive à leur demande d'asile.</p> <p>Actuellement, en novembre 2024, les personnes demandeuses d'asile doivent souvent attendre plus de trois ans pour recevoir une réponse. Ce n'est qu'après cette étape qu'ils peuvent commencer le processus de réunification familiale, qui peut prendre de nombreuses années supplémentaires.</p>
		<p>Connaissez-vous <a target='_blank' href='/'>l'histoire de Saïd</a>&nbsp;? Dans ce cas, ce père a pris la décision extrêmement difficile de quitter son enfant et sa conjointe pour fuir la violence des gangs dans son pays d'origine. Après avoir affronté de nombreuses difficultés pour régulariser sa situation, il a finalement pu retrouver sa famille presque dix ans après son arrivée au Canada.</p>`
	} , 
	{
		id: 'violenceconjugale',
		title: 'Violence conjugale',
		situation: `<p>Une personne im·migrante est arrivée au Québec pour rejoindre son conjoint canadien dans le cadre d'un processus de parrainage, dans l'espoir de pouvoir vivre ensemble.</p>
		<p>Après quelques mois de vie commune, le conjoint soustrait à sa partenaires ses papiers d’identité, devient violent psychologiquement et physiquement. <b>Il la menace de retirer la demande de parrainage et de la faire déporter</b>, si elle le dénonçait à la police.</p>
		<p>Malgré la crainte de perdre son statut d’immigration, elle décide de quitter son conjoint, afin de fuir ces violences et reprendre du pouvoir sans sa vie. Elle se retrouve alors en situation d'itinérance, sans savoir si la demande de parrainage a été annulée.</p>
		<p>Finalement, elle obtient l'aide d'un organisme communautaire et parvient à régulariser sa situation, mais elle reste dans l'incertitude quant à sa situation l'année prochaine.</p>`,
		choix: [
			{
				text: 'Elle a un permis de séjour temporaire',
				isRightAnswer: true
			},
			{
				text: 'Elle a déposé une demande d’asile au Canada',
				isRightAnswer: false
			},
			{
				text: 'Elle n’a pas de statut d’immigration',
				isRightAnswer: false
			}
		],
		explications: `<p>Elle a actuellement un permis de séjour temporaire après avoir été sans statut d’immigration. Le parrainage crée une situation de dépendance, où les personnes im·migrantes victimes de violence conjugale se retrouvent souvent confrontées à un dilemme : quitter leur foyer et se retrouver sans statut d'immigration, ou rester piégées dans un cycle de violence tout en ayant un statut régulier.</p>
		<p>Actuellement, en cas de violence conjugale, les personnes im·migrantes peuvent déposer une demande pour obtenir un permis de séjour temporaire pour victimes de violence conjugale. C'est un bon dispositif mis en place par le gouvernement pour éviter que les conjoint·e·s ayant entamé un processus de parrainage n'utilisent cette situation de dépendance pour exercer des violences. Cependant, ce permis doit être renouvelé chaque année, sans garantie de prolongation et avec un taux de succès relativement faible pour la prolongation. Ce cas illustre également que les statuts d'immigration sont mouvants et que des personnes, qui se retrouvent sans statut, peuvent se retrouver dans cette situation en raison de facteurs échappant à leur contrôle, malgré le fait qu'elles aient détenu un statut régulier auparavant.</p>
		<p>Connaissez-vous <a target='_blank' href='/connaitre/#violence-conjugale'>l’histoire de Pryia</a>&nbsp;? Elle a dû fuir son foyer au Québec pour échapper à la violence de son conjoint et détient actuellement un permis de séjour temporaire. Cependant, elle fait face à de nombreuses problématiques : après avoir été isolée par son conjoint, elle a perdu tout lien avec son pays d'origine; elle risque de perdre la garde de ses enfants à cause de cette situation; et peine à se projeter dans l'avenir, car elle ne sait pas si elle pourra obtenir un statut d'immigration régulier au Canada.</p>`
	} , 
	{
		id: 'lgbtq',
		title: 'LGBTQ+',
		situation: `<pUne personne trans nouvellement arrivée à Montréal envoie une demande au Directeur de l'état civil du Québec pour changer son nom et la mention de sexe sur ses documents officiels.</p>
		<p>... en attente d'approbation des textes</p>`,
		choix: [
			{
				text: 'Elle est une personne trans sans statut d’immigration',
				isRightAnswer: false
			},
			{
				text: 'Elle est une personne trans demandeuse d’asile',
				isRightAnswer: true
			},
			{
				text: 'Elle est une personne trans résidente permanente au Québec',
				isRightAnswer: false
			}
		],
		explications: `<p>Les personnes im·migrantes font face à de nombreux obstacles et difficultés dans leur vie quotidienne en raison des exigences administratives.</p>
		<p>... en attente d'approbation des textes</p>`
	} , 
	{
		id: 'enceinte',
		title: `Femme enceinte`,
		situation: `<p>Une femme se présente à l'hôpital car elle est à 41 semaine de grossesse et doit se faire "déclencher", tel que l'indique le médecin qui a fait son suivi de grossesse dans une clinique privée. Comme il faut planifier la césarienne, ce soin n'est pas consideré comme une «&nbsp;urgence&nbsp;» aux yeux de l'hôpital et <b>l'équipe refuse de planifier ce soin</b> si la femme ne peut pas payer d'avance.</p>
		<p>En plus du stress de savoir si elle et son bébé vont pouvoir se rendre à terme sain et sauf, elle subit des violences verbales de la part du personnel hospitalier (par exemple : "no money, no baby").</p>
		<p>Après avoir fait plusieurs hôpitaux et passé des heures et des heures aux urgences et dans les services administratifs à expliquer sa situation, muni de son dossier médical, elle trouve enfin un médecin qui accepte de programmer sa césarienne et de prendre une entente de paiement avec elle.</p>
		<p>Comme les personnes im·migrantes sans couverture sont facturées à 200% du prix, elle sera facturée 18 000$, facture qu'elle mettra 10 ans à rembourser (sur une base de 200$ par mois).</p>`,
		choix: [
			{
				text: 'Elle est un.e résident.e permanent.e au Canada',
				isRightAnswer: false
			},
			{
				text: 'Elle n’a pas de statut d’immigration',
				isRightAnswer: true
			},
			{
				text: 'Elle a déposé une demande d’asile au Canada',
				isRightAnswer: false
			}
		],
		explications: `<p>Elle ne peut pas être une personne demandeuse d'asile ou résidente permanente, car ces statuts permettent d'accéder aux soins de santé.</p>
		<p>Les personnes im·migrantes sans statut ou à statut précaire souvent n’ont pas accès aux services de base, notamment les services de santé et juridiques, qui sont essentiels pour vivre en sécurité. De plus, le ministère de la Santé et des Services sociaux (MSSS) impose aux établissements du réseau public une surcharge de 200 % sur les frais facturés aux personnes migrantes sans statut ou à statut précaire pour les services reçus, comme cela est documenté dans <a target='_blank' href='https://medecinsdumonde.ca/uploads/Memoire-Medecins-du-Monde-Sante-sexuelle-et-reproductive-des-femmes-migrantes-a-statut-precaire-vivant-au-Quebec_15avril-2022_2022-06-01-130245_iztv.pdf'>ce mémoire de Médecins du Monde</a>. Cette situation aggrave la précarité des personnes im.migrantes, déjà vulnérables et disposant de peu de ressources.</p>
		<p>Dans le cas des femmes enceintes, elles se retrouvent souvent contraintes de payer des sommes exorbitantes pendant plusieurs années pour pouvoir accoucher dans un hôpital, tout en faisant face à de nombreux obstacles tout au long de leur grossesse, de leur accouchement et de la suite. Par exemple, certains organismes ont documenté des cas où des femmes se voient refuser l’administration de médicaments contre la douleur, comme l’épidurale, ces derniers étant considérés comme une question de « confort » et non comme une nécessité médicale. De plus, il est fréquent que les femmes ayant accouché ne bénéficient pas des suivis médicaux nécessaires en post-partum. Tout cela a été documenté et dénoncé par Médecins du Monde.</p>`
	} , 
	{
		id: 'violencetravail',
		title: 'Violence au travail',
		situation: `<p>Une personne originaire du Guatemala décide de se rendre au Québec pour y travailler dans le secteur agricole, dans l’espoir d’améliorer sa situation financière et d’aider <b>sa famille, qui traverse une grave détresse économique</b> depuis plusieurs mois.</p>
		<p>Afin de réaliser ce projet, elle vend toutes ses possessions et verse 10 000 $ à une agence qui lui promet de faciliter son arrivée au Québec.</p>
		<p>Engagée pour un contrat de 30 heures par semaine, cette personne se retrouve néanmoins à travailler plus de 70 heures. Malgré ces abus flagrants, elle peine à trouver la force et l’énergie de dénoncer sa situation, par crainte de perdre son emploi et d’être contrainte de retourner dans son pays d’origine.</p>`,
		choix: [
			{
				text: 'Elle est une personne demandeuse d’asile',
				isRightAnswer: false
			},
			{
				text: 'Elle a un permis de travail ouvert',
				isRightAnswer: false
			},
			{
				text: 'Elle a un permis de travail fermé',
				isRightAnswer: true
			}
		],
		explications: `<p>Le permis de travail fermé permet aux personnes provenant d’autres pays de venir travailler au Québec pour combler les besoins de main-d'œuvre. Il offre ainsi aux entreprises canadiennes la possibilité de recruter des travailleurs et travailleuses étrangères lorsqu'aucun·e Canadien·ne ou résident·e permanent·e n’est disponible pour occuper un poste. Pour obtenir ce permis, les employeurs doivent soumettre une étude d'impact sur le marché du travail au gouvernement canadien, prouvant l’absence de personnes candidates locales.</p>
		<p>Cependant, ce permis crée une relation inégale entre l’entreprise et la personne migrante, car celle-ci est liée à un seul employeur et ne peut pas changer d’emploi sans perdre son permis de travail. Cette situation peut conduire à des abus et à des conditions d’exploitation, et rendre très difficile le dépôt d’une plainte.</p>
		<p>Connaissez-vous <a target='_blank' href='/connaitre/#permis-travail-ferme'>l'histoire de Mohammed</a> ou celle de <a target='_blank' href='/'>Daniel</a>&nbsp;? Cliquez pour en savoir plus sur les conséquences du manque de statut et les raisons qui peuvent mener à cette situation.</p>`
	}
]}