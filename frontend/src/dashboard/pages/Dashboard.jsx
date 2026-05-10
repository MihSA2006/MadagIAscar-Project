import { useMemo, useState } from "react";
import {
    Apple,
    Bot,
    CalendarDays,
    Car,
    ChefHat,
    ChevronRight,
    GraduationCap,
    Hammer,
    HeartPulse,
    Hotel,
    Lightbulb,
    Package,
    PawPrint,
    Phone,
    Scissors,
    Shirt,
    ShoppingBag,
    Sprout,
    Store,
    TrendingUp,
    Wallet,
    Waves,
} from "lucide-react";

const jobTemplates = [
    {
        id: "phone_seller",
        label: "Vendeur téléphone",
        icon: Phone,
        title: "Dashboard vente de téléphones",
        description: "Stock par marque, marge par appareil, garantie client et opportunités de revente.",
        modules: ["Stock modèles", "Ventes", "Marge", "Garanties", "SAV", "Clients chauds"],
        kpis: [
            { label: "Téléphones en stock", value: "42", trend: "+8 cette semaine" },
            { label: "Marge moyenne", value: "18%", trend: "+3% vs objectif" },
            { label: "Garanties actives", value: "27", trend: "4 expirent bientôt" },
            { label: "Clients intéressés", value: "16", trend: "à relancer" },
        ],
        focus: ["Comparer prix d'achat/revente", "Identifier modèles les plus rentables", "Suivre SAV et garanties"],
        tasks: ["Vérifier stock iPhone/Samsung", "Relancer clients intéressés", "Mettre à jour prix selon marché"],
        advice: "L’IA recommande de pousser les modèles à marge forte et d’ajouter un rappel automatique avant expiration de garantie.",
    },
    {
        id: "agriculture",
        label: "Agriculteur",
        icon: Sprout,
        title: "Dashboard agriculture",
        description: "Culture, calendrier agricole, intrants, météo, récolte prévue et coûts par parcelle.",
        modules: ["Parcelles", "Cultures", "Météo", "Arrosage", "Intrants", "Récolte"],
        kpis: [
            { label: "Parcelles suivies", value: "5", trend: "2 prioritaires" },
            { label: "Récolte prévue", value: "1.8 t", trend: "dans 34 jours" },
            { label: "Dépenses intrants", value: "420k Ar", trend: "semences + engrais" },
            { label: "Risque météo", value: "Moyen", trend: "pluie probable" },
        ],
        focus: ["Planifier semis/récolte", "Suivre dépenses par terrain", "Recevoir conseils selon météo"],
        tasks: ["Contrôler humidité du sol", "Préparer engrais", "Planifier transport récolte"],
        advice: "L’IA peut créer un calendrier par culture et ajuster les tâches selon la météo locale.",
    },
    {
        id: "livestock",
        label: "Éleveur",
        icon: PawPrint,
        title: "Dashboard élevage",
        description: "Animaux, santé, alimentation, reproduction, vaccins et ventes prévues.",
        modules: ["Animaux", "Santé", "Vaccins", "Alimentation", "Reproduction", "Ventes"],
        kpis: [
            { label: "Animaux", value: "86", trend: "+12 jeunes" },
            { label: "Coût nourriture", value: "310k Ar", trend: "ce mois" },
            { label: "Vaccins à venir", value: "9", trend: "7 jours" },
            { label: "Prêts à vendre", value: "14", trend: "marge estimée" },
        ],
        focus: ["Suivi santé animal", "Prévoir alimentation", "Optimiser vente au bon moment"],
        tasks: ["Vérifier alimentation", "Programmer vaccin", "Identifier animaux prêts à vendre"],
        advice: "L’IA peut anticiper les dépenses nourriture et signaler les animaux à fort potentiel de vente.",
    },
    {
        id: "restaurant",
        label: "Restaurant / gargote",
        icon: ChefHat,
        title: "Dashboard restauration",
        description: "Menu, plats vendus, stock ingrédients, dépenses cuisine et bénéfice journalier.",
        modules: ["Menu", "Ventes plats", "Stock ingrédients", "Cuisine", "Avis clients", "Planning"],
        kpis: [
            { label: "Ventes du jour", value: "238k Ar", trend: "+12%" },
            { label: "Plat populaire", value: "Ravitoto", trend: "31 ventes" },
            { label: "Stock faible", value: "6", trend: "ingrédients" },
            { label: "Bénéfice estimé", value: "74k Ar", trend: "aujourd’hui" },
        ],
        focus: ["Suivre plats rentables", "Éviter rupture ingrédients", "Préparer menu de demain"],
        tasks: ["Acheter riz et viande", "Analyser plat le plus rentable", "Préparer publication du menu"],
        advice: "L’IA recommande de mettre en avant les plats les plus vendus et de réduire les achats peu rentables.",
    },
    {
        id: "boutique",
        label: "Boutique / épicerie",
        icon: Store,
        title: "Dashboard boutique",
        description: "Produits, caisse, stock faible, marge par article et clients réguliers.",
        modules: ["Produits", "Caisse", "Stock", "Marge", "Clients", "Promotions"],
        kpis: [
            { label: "Articles stock", value: "312", trend: "24 faibles" },
            { label: "CA journalier", value: "510k Ar", trend: "+6%" },
            { label: "Marge moyenne", value: "22%", trend: "stable" },
            { label: "Clients réguliers", value: "48", trend: "+5" },
        ],
        focus: ["Gérer stock rapide", "Voir produits rentables", "Créer promotions ciblées"],
        tasks: ["Commander stock faible", "Vérifier caisse", "Créer promo produits lents"],
        advice: "L’IA peut repérer les produits qui dorment et proposer une promotion avant perte de valeur.",
    },
    {
        id: "freelance",
        label: "Freelance / service",
        icon: Lightbulb,
        title: "Dashboard freelance",
        description: "Clients, devis, projets, échéances, factures et charge de travail.",
        modules: ["Projets", "Devis", "Factures", "Clients", "Échéances", "IA rédaction"],
        kpis: [
            { label: "Projets actifs", value: "7", trend: "2 urgents" },
            { label: "Factures ouvertes", value: "1.2M Ar", trend: "à encaisser" },
            { label: "Taux conversion", value: "41%", trend: "+9%" },
            { label: "Charge semaine", value: "32h", trend: "limite OK" },
        ],
        focus: ["Prioriser clients", "Suivre paiements", "Créer devis avec IA"],
        tasks: ["Envoyer devis", "Relancer facture", "Finaliser projet urgent"],
        advice: "L’IA peut proposer un planning de travail réaliste selon les deadlines et la valeur client.",
    },
    {
        id: "transport",
        label: "Transport",
        icon: Car,
        title: "Dashboard transport",
        description: "Trajets, carburant, maintenance, revenus par course et planning chauffeur.",
        modules: ["Trajets", "Carburant", "Maintenance", "Courses", "Planning", "Rentabilité"],
        kpis: [
            { label: "Courses", value: "19", trend: "aujourd’hui" },
            { label: "Carburant", value: "96k Ar", trend: "coût jour" },
            { label: "Maintenance", value: "2", trend: "à planifier" },
            { label: "Bénéfice", value: "184k Ar", trend: "après carburant" },
        ],
        focus: ["Calculer rentabilité par trajet", "Planifier entretien", "Réduire kilomètres à vide"],
        tasks: ["Contrôler pneus", "Analyser trajet rentable", "Préparer facture client"],
        advice: "L’IA peut détecter les trajets non rentables et conseiller les meilleurs créneaux de course.",
    },
    {
        id: "beauty",
        label: "Coiffure / beauté",
        icon: Scissors,
        title: "Dashboard salon beauté",
        description: "Rendez-vous, prestations, produits, fidélité client et planning équipe.",
        modules: ["RDV", "Prestations", "Produits", "Clients", "Fidélité", "Planning"],
        kpis: [
            { label: "RDV semaine", value: "38", trend: "+11" },
            { label: "Panier moyen", value: "34k Ar", trend: "+5%" },
            { label: "Clients fidèles", value: "64", trend: "à récompenser" },
            { label: "Produits faibles", value: "8", trend: "à acheter" },
        ],
        focus: ["Optimiser planning", "Vendre produits complémentaires", "Relancer clients fidèles"],
        tasks: ["Confirmer RDV demain", "Commander produits", "Envoyer offre fidélité"],
        advice: "L’IA peut suggérer des offres selon l’historique de prestation de chaque cliente.",
    },
    {
        id: "tailoring",
        label: "Couture",
        icon: Shirt,
        title: "Dashboard atelier couture",
        description: "Commandes, mesures, tissus, deadlines, acomptes et livraisons.",
        modules: ["Commandes", "Mesures", "Tissus", "Acomptes", "Livraisons", "Planning"],
        kpis: [
            { label: "Commandes", value: "23", trend: "9 urgentes" },
            { label: "Tissus stock", value: "47", trend: "12 faibles" },
            { label: "Acomptes", value: "680k Ar", trend: "encaissés" },
            { label: "Livraisons", value: "6", trend: "cette semaine" },
        ],
        focus: ["Ne pas rater deadlines", "Suivre mesures clients", "Gérer tissus par commande"],
        tasks: ["Couper tissus robe", "Appeler client mesure", "Préparer livraison samedi"],
        advice: "L’IA peut classer les commandes par urgence et marge pour éviter les retards.",
    },
    {
        id: "tourism",
        label: "Tourisme / hôtel",
        icon: Hotel,
        title: "Dashboard tourisme",
        description: "Réservations, chambres, circuits, avis clients, saisonnalité et revenus.",
        modules: ["Réservations", "Chambres", "Circuits", "Avis", "Saison", "Revenus"],
        kpis: [
            { label: "Occupation", value: "73%", trend: "+14%" },
            { label: "Réservations", value: "18", trend: "7 jours" },
            { label: "Avis moyen", value: "4.6", trend: "excellent" },
            { label: "Revenu prévu", value: "3.4M Ar", trend: "mois" },
        ],
        focus: ["Remplir périodes creuses", "Suivre avis", "Optimiser prix par saison"],
        tasks: ["Confirmer réservation", "Répondre aux avis", "Créer offre week-end"],
        advice: "L’IA peut proposer des prix selon la saison et créer des offres pour remplir les dates vides.",
    },
    {
        id: "education",
        label: "Éducation / formation",
        icon: GraduationCap,
        title: "Dashboard formation",
        description: "Élèves, cours, paiements, présence, progression et contenus IA.",
        modules: ["Élèves", "Cours", "Présence", "Paiements", "Progression", "Contenu IA"],
        kpis: [
            { label: "Élèves actifs", value: "126", trend: "+18" },
            { label: "Présence", value: "88%", trend: "semaine" },
            { label: "Paiements dus", value: "14", trend: "à relancer" },
            { label: "Cours créés", value: "9", trend: "ce mois" },
        ],
        focus: ["Suivre progression", "Relancer paiements", "Créer exercices avec IA"],
        tasks: ["Préparer cours", "Relancer paiements", "Identifier élèves en retard"],
        advice: "L’IA peut générer des exercices adaptés au niveau et signaler les élèves à risque.",
    },
    {
        id: "construction",
        label: "BTP / artisan",
        icon: Hammer,
        title: "Dashboard chantier",
        description: "Chantiers, matériaux, main-d’œuvre, devis, dépenses et avancement.",
        modules: ["Chantiers", "Matériaux", "Équipe", "Devis", "Dépenses", "Avancement"],
        kpis: [
            { label: "Chantiers actifs", value: "4", trend: "1 en retard" },
            { label: "Matériaux", value: "1.8M Ar", trend: "budget" },
            { label: "Avancement", value: "62%", trend: "moyenne" },
            { label: "Devis envoyés", value: "11", trend: "3 acceptés" },
        ],
        focus: ["Comparer budget réel/prévu", "Planifier matériaux", "Suivre avancement chantier"],
        tasks: ["Commander ciment", "Contrôler avancement", "Envoyer devis client"],
        advice: "L’IA peut détecter les dépassements de budget avant qu’ils deviennent critiques.",
    },
    {
        id: "fishing",
        label: "Pêche",
        icon: Waves,
        title: "Dashboard pêche",
        description: "Sorties, prises, météo marine, ventes, carburant et conservation.",
        modules: ["Sorties", "Prises", "Météo", "Ventes", "Carburant", "Conservation"],
        kpis: [
            { label: "Prises", value: "128 kg", trend: "semaine" },
            { label: "Ventes", value: "740k Ar", trend: "+10%" },
            { label: "Carburant", value: "210k Ar", trend: "à réduire" },
            { label: "Risque météo", value: "Bas", trend: "48h" },
        ],
        focus: ["Prévoir sorties", "Maximiser vente rapide", "Suivre conservation"],
        tasks: ["Vérifier glace", "Planifier sortie", "Comparer prix marché"],
        advice: "L’IA peut conseiller les jours de sortie et les marchés les plus rentables selon les prises.",
    },
];

const commonCases = [
    "Tout métier avec stock : produits, animaux, ingrédients, matériaux.",
    "Tout métier avec rendez-vous : beauté, santé, formation, service.",
    "Tout métier avec production : agriculture, élevage, pêche, couture, artisanat.",
    "Tout métier avec projets : freelance, BTP, événementiel, agence.",
    "Tout métier avec véhicules : transport, livraison, taxi, logistique.",
    "Tout métier avec abonnements ou clients réguliers : école, salle de sport, service mensuel.",
];

function KpiCard({ item }) {
    return (
        <div className="rounded-[1.6rem] border border-primary/10 bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1f3b22]/45">{item.label}</p>
            <div className="mt-3 flex items-end justify-between gap-3">
                <p className="text-3xl font-black text-[#172018]">{item.value}</p>
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-primary">{item.trend}</span>
            </div>
        </div>
    );
}

function ModulePill({ children }) {
    return <span className="rounded-full border border-primary/15 bg-green-50 px-3 py-1.5 text-xs font-bold text-primary">{children}</span>;
}

export default function Dashboard() {
    const [activeId, setActiveId] = useState("phone_seller");
    const activeTemplate = useMemo(
        () => jobTemplates.find((template) => template.id === activeId) ?? jobTemplates[0],
        [activeId]
    );
    const ActiveIcon = activeTemplate.icon;

    return (
        <div className="min-h-full p-4 md:p-6 lg:p-8 text-[#172018]">
            <div className="mx-auto flex max-w-[1600px] flex-col gap-6">
                <section className="overflow-hidden rounded-[2.2rem] border border-primary/10 bg-white p-6 shadow-sm md:p-8 relative">
                    <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
                    <div className="absolute bottom-0 left-1/2 h-36 w-36 rounded-full bg-red-500/10 blur-3xl" />
                    <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-4xl">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-green-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-primary">
                                <Bot className="h-4 w-4" /> Prototype dashboard IA dynamique
                            </div>
                            <h1 className="text-3xl font-black tracking-tight md:text-5xl">
                                Un dashboard qui change selon le métier créé par l’utilisateur
                            </h1>
                            <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-[#1f3b22]/65 md:text-base">
                                L’IA ne génère pas du code. Elle analyse les réponses de l’onboarding et produit une configuration JSON : métier, modules, KPIs, tâches, conseils et widgets. Le frontend affiche ensuite le dashboard adapté.
                            </p>
                        </div>
                        <div className="rounded-[1.6rem] border border-red-500/10 bg-red-50 p-4 text-sm font-bold text-red-600 lg:max-w-sm">
                            Exemple : vendeur téléphone ≠ éleveur ≠ agriculteur. Même design MadagIAscar, mais widgets et données différents.
                        </div>
                    </div>
                </section>

                <section className="grid gap-6 xl:grid-cols-[360px_1fr]">
                    <aside className="rounded-[2rem] border border-primary/10 bg-white p-4 shadow-sm xl:max-h-[calc(100vh-7rem)] xl:overflow-auto">
                        <div className="mb-4 px-2">
                            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#1f3b22]/40">Choisir un métier</p>
                            <h2 className="mt-1 text-xl font-black">Cas possibles</h2>
                        </div>
                        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
                            {jobTemplates.map((template) => {
                                const Icon = template.icon;
                                const isActive = template.id === activeId;
                                return (
                                    <button
                                        key={template.id}
                                        onClick={() => setActiveId(template.id)}
                                        className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition-all ${
                                            isActive
                                                ? "border-primary bg-green-50 text-primary shadow-sm"
                                                : "border-transparent bg-white text-[#1f3b22]/70 hover:border-primary/20 hover:bg-green-50/60"
                                        }`}
                                    >
                                        <span className="flex min-w-0 items-center gap-3">
                                            <span className={`grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl ${isActive ? "bg-primary text-white" : "bg-green-50 text-primary"}`}>
                                                <Icon className="h-5 w-5" />
                                            </span>
                                            <span className="truncate text-sm font-black">{template.label}</span>
                                        </span>
                                        <ChevronRight className={`h-4 w-4 flex-shrink-0 ${isActive ? "text-primary" : "text-[#1f3b22]/25"}`} />
                                    </button>
                                );
                            })}
                        </div>
                    </aside>

                    <main className="flex flex-col gap-6">
                        <section className="rounded-[2.2rem] border border-primary/10 bg-white p-6 shadow-sm md:p-7">
                            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                                <div className="flex items-start gap-4">
                                    <div className="grid h-16 w-16 flex-shrink-0 place-items-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
                                        <ActiveIcon className="h-8 w-8" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-[0.18em] text-red-500">Dashboard généré</p>
                                        <h2 className="mt-1 text-3xl font-black tracking-tight">{activeTemplate.title}</h2>
                                        <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-[#1f3b22]/65">{activeTemplate.description}</p>
                                    </div>
                                </div>
                                <div className="rounded-2xl border border-primary/10 bg-green-50 p-4 text-xs font-bold text-[#1f3b22]/70 lg:w-80">
                                    <p className="mb-2 text-primary">Config IA simulée</p>
                                    <code className="block whitespace-pre-wrap leading-5">{JSON.stringify({ businessType: activeTemplate.id, modules: activeTemplate.modules.slice(0, 4), version: 1 }, null, 2)}</code>
                                </div>
                            </div>
                        </section>

                        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                            {activeTemplate.kpis.map((item) => <KpiCard key={item.label} item={item} />)}
                        </section>

                        <section className="grid gap-6 lg:grid-cols-[1fr_340px]">
                            <div className="rounded-[2rem] border border-primary/10 bg-white p-6 shadow-sm">
                                <div className="mb-5 flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#1f3b22]/40">Modules actifs</p>
                                        <h3 className="mt-1 text-2xl font-black">Widgets affichés automatiquement</h3>
                                    </div>
                                    <Package className="h-6 w-6 text-primary" />
                                </div>
                                <div className="mb-6 flex flex-wrap gap-2">
                                    {activeTemplate.modules.map((module) => <ModulePill key={module}>{module}</ModulePill>)}
                                </div>
                                <div className="grid gap-4 md:grid-cols-3">
                                    {activeTemplate.focus.map((focus) => (
                                        <div key={focus} className="rounded-2xl border border-primary/10 bg-green-50/70 p-4">
                                            <TrendingUp className="mb-3 h-5 w-5 text-primary" />
                                            <p className="text-sm font-black leading-5">{focus}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-[2rem] border border-red-500/10 bg-white p-6 shadow-sm">
                                <div className="mb-5 flex items-center gap-3">
                                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-red-50 text-red-500">
                                        <CalendarDays className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#1f3b22]/40">Tâches IA</p>
                                        <h3 className="text-xl font-black">Aujourd’hui</h3>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    {activeTemplate.tasks.map((task, index) => (
                                        <div key={task} className="flex items-center gap-3 rounded-2xl bg-green-50/70 p-3">
                                            <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-black text-white">{index + 1}</span>
                                            <p className="text-sm font-bold text-[#1f3b22]/75">{task}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
                            <div className="rounded-[2rem] border border-primary/10 bg-primary p-6 text-white shadow-sm">
                                <div className="mb-4 flex items-center gap-3">
                                    <Lightbulb className="h-6 w-6" />
                                    <h3 className="text-xl font-black">Conseil IA adapté</h3>
                                </div>
                                <p className="text-sm font-medium leading-7 text-white/85">{activeTemplate.advice}</p>
                            </div>

                            <div className="rounded-[2rem] border border-primary/10 bg-white p-6 shadow-sm">
                                <div className="mb-4 flex items-center gap-3">
                                    <Wallet className="h-6 w-6 text-primary" />
                                    <h3 className="text-xl font-black">Étude des grands cas</h3>
                                </div>
                                <div className="grid gap-2">
                                    {commonCases.map((item) => (
                                        <div key={item} className="flex items-start gap-3 rounded-xl bg-green-50/70 px-4 py-3 text-sm font-bold text-[#1f3b22]/70">
                                            <span className="mt-1 h-2 w-2 rounded-full bg-red-500" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <section className="rounded-[2rem] border border-primary/10 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-center gap-3">
                                <ShoppingBag className="h-6 w-6 text-primary" />
                                <h3 className="text-xl font-black">Prochaine étape technique</h3>
                            </div>
                            <p className="text-sm font-medium leading-7 text-[#1f3b22]/65">
                                Remplacer ces boutons prototype par la vraie configuration générée après l’onboarding. Chaque entreprise créée par l’utilisateur aura son propre <strong>dashboardConfig</strong> enregistré, puis ce renderer affichera les bons widgets.
                            </p>
                        </section>
                    </main>
                </section>
            </div>
        </div>
    );
}
