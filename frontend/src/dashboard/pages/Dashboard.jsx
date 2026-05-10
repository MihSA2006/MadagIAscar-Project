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
        label: "Mpivarotra finday",
        icon: Phone,
        title: "Tabilao fivarotana finday",
        description: "Tahiry isaky ny marika, tombony isaky ny kojakoja, antoka ho an'ny mpanjifa ary hevitra hivarotana indray.",
        modules: ["Tahiry finday", "Vatany", "Tombony", "Antoka", "SAV", "Mpanjifa liana"],
        kpis: [
            { label: "Finday ao anaty tahiry", value: "42", trend: "+8 amin'ity herinandro ity" },
            { label: "Tombony antonony", value: "18%", trend: "+3% amin'ny tanjona" },
            { label: "Antoka mbola manankery", value: "27", trend: "4 ho tapitra tsy ho ela" },
            { label: "Mpanjifa liana", value: "16", trend: "tokony hampahatsiahivina" },
        ],
        focus: ["Ampitahaina ny vidy nividianana sy hivarotana", "Fantaro ny finday mitondra tombony indrindra", "Araho ny SAV sy ny antoka"],
        tasks: ["Zahao ny tahiry iPhone/Samsung", "Ampahatsiahivo ny mpanjifa liana", "Havaozy ny vidiny araka ny tsena"],
        advice: "Ny AI dia manoro hevitra ny hanolotra ireo finday misy tombony be ary hanampy fampandrenesana mialoha ny fahataperan'ny antoka.",
    },
    {
        id: "agriculture",
        label: "Tantsaha",
        icon: Sprout,
        title: "Tabilao momba ny fambolena",
        description: "Fambolena, tetiandro fambolena, fitaovana, toetr'andro, vokatra vinavinaina ary sarany isaky ny tany.",
        modules: ["Tany fambolena", "Vokatra", "Toetr'andro", "Fanondrahana", "Fitaovana", "Fijinjana"],
        kpis: [
            { label: "Tany arahina maso", value: "5", trend: "2 laharam-pahamehana" },
            { label: "Vokatra vinavinaina", value: "1.8 t", trend: "ao anatin'ny 34 andro" },
            { label: "Vola lany amin'ny fitaovana", value: "420k Ar", trend: "voa + zezika" },
            { label: "Loza avy amin'ny toetr'andro", value: "Antonony", trend: "mety hisy orana" },
        ],
        focus: ["Homanina ny famafazana/fijinjana", "Araho ny vola lany isaky ny tany", "Mahazo torohevitra araka ny toetr'andro"],
        tasks: ["Zahao ny hamandoan'ny tany", "Omano ny zezika", "Homanina ny fitaterana ny vokatra"],
        advice: "Ny AI dia afaka mamorona tetiandro isaky ny vokatra sy manitsy ny asa araka ny toetr'andro eo an-toerana.",
    },
    {
        id: "livestock",
        label: "Mpiompy",
        icon: PawPrint,
        title: "Tabilao momba ny fiompiana",
        description: "Biby, fahasalamana, sakafo, fananahana, vaksiny ary varotra vinavinaina.",
        modules: ["Biby", "Fahasalamana", "Vaksiny", "Sakafo", "Fananahana", "Varotra"],
        kpis: [
            { label: "Isan'ny biby", value: "86", trend: "+12 tanora" },
            { label: "Vidin'ny sakafo", value: "310k Ar", trend: "tamin'ity volana ity" },
            { label: "Vaksiny ho avy", value: "9", trend: "7 andro" },
            { label: "Efa azo amidy", value: "14", trend: "tombony vinavinaina" },
        ],
        focus: ["Fanaraha-maso ny fahasalaman'ny biby", "Vinavinao ny sakafo", "Amboary tsara ny fotoana hamarotana"],
        tasks: ["Zahao ny sakafo", "Andaharo ny vaksiny", "Fantaro ny biby efa azo amidy"],
        advice: "Ny AI dia afaka maminavina ny vola holaniana amin'ny sakafo sy mampiseho ny biby manana tombony betsaka hamidy.",
    },
    {
        id: "restaurant",
        label: "Trano fisakaforana / gargote",
        icon: ChefHat,
        title: "Tabilao fandrahoan-tsakafo",
        description: "Sakafo azo isafidianana, sakafo lafo, tahiry kojakoja, vola lany ao an-dakozia ary tombony isan'andro.",
        modules: ["Sakafo azo isafidianana", "Vatany sakafo", "Tahiry kojakoja", "Lakozia", "Hevitry ny mpanjifa", "Fandaminana"],
        kpis: [
            { label: "Varotra anio", value: "238k Ar", trend: "+12%" },
            { label: "Sakafo tian'ny olona", value: "Ravitoto", trend: "31 lafo" },
            { label: "Tahiry kely", value: "6", trend: "kojakoja" },
            { label: "Tombony vinavinaina", value: "74k Ar", trend: "anio" },
        ],
        focus: ["Araho ny sakafo mahazo tombony", "Sorohy ny fahalanian'ny kojakoja", "Omano ny sakafo rahampitso"],
        tasks: ["Vidio ny vary sy hena", "Adihadio ny sakafo mahazo tombony indrindra", "Omano ny fanambarana ny sakafo"],
        advice: "Ny AI dia manoro hevitra ny hanasongadinana ny sakafo lafo indrindra sy hampihenana ny fividianana zavatra tsy dia mahazo tombony.",
    },
    {
        id: "boutique",
        label: "Tsena / épicerie",
        icon: Store,
        title: "Tabilao momba ny tsena",
        description: "Entana, fidiram-bola, tahiry kely, tombony isaky ny entana ary mpanjifa mahazatra.",
        modules: ["Entana", "Caisse", "Tahiry", "Tombony", "Mpanjifa", "Zoma mahafinaritra"],
        kpis: [
            { label: "Entana ao anaty tahiry", value: "312", trend: "24 kely sisa" },
            { label: "CA isan'andro", value: "510k Ar", trend: "+6%" },
            { label: "Tombony antonony", value: "22%", trend: "tsy miova" },
            { label: "Mpanjifa mahazatra", value: "48", trend: "+5" },
        ],
        focus: ["Tantano haingana ny tahiry", "Zahao ny entana mahazo tombony", "Amboary ny fampidinana vidiny"],
        tasks: ["Manafatra entana efa ho lany", "Zahao ny caisse", "Amboary ny fampidinana vidiny ho lany"],
        advice: "Ny AI dia afaka mamantatra ny entana tsy mihetsika sy manolotra fampidinana vidiny mialoha ny hiraingan'ny entana.",
    },
    {
        id: "freelance",
        label: "Freelance / asa tena",
        icon: Lightbulb,
        title: "Tabilao freelance",
        description: "Mpanjifa, vinavina vidiny, tetikasa, fe-potoana, faktiora ary asa miandry.",
        modules: ["Tetikasa", "Vinavina vidiny", "Faktiora", "Mpanjifa", "Fe-potoana", "AI mpanoratra"],
        kpis: [
            { label: "Tetikasa mandeha", value: "7", trend: "2 maika" },
            { label: "Faktiora miandry", value: "1.2M Ar", trend: "tokony hiditra" },
            { label: "Taham-panovana", value: "41%", trend: "+9%" },
            { label: "Enta-mavesatry ny herinandro", value: "32h", trend: "mbola OK" },
        ],
        focus: ["Laharam-pahamehana ny mpanjifa", "Araho ny fandoavam-bola", "Mamorona vinavina vidiny amin'ny alalan'ny AI"],
        tasks: ["Alefaso ny vinavina vidiny", "Ampahatsiahivo ny faktiora", "Vitao ny tetikasa maika"],
        advice: "Ny AI dia afaka manolotra fandaharam-potoana realistika araka ny fe-potoana sy ny lanjan'ny mpanjifa.",
    },
    {
        id: "transport",
        label: "Fitaterana",
        icon: Car,
        title: "Tabilao fitaterana",
        description: "Trais, solika, fikojakojana, fidiram-bola isaky ny dia ary fandaharam-potoana mpamily.",
        modules: ["Trais", "Solika", "Fikojakojana", "Courses", "Fandaharam-potoana", "Tombony"],
        kpis: [
            { label: "Courses", value: "19", trend: "anio" },
            { label: "Solika", value: "96k Ar", trend: "vola lany anio" },
            { label: "Fikojakojana", value: "2", trend: "tokony halamina" },
            { label: "Tombony", value: "184k Ar", trend: "rehefa nanalana solika" },
        ],
        focus: ["Kajio ny tombony isaky ny dia", "Alamino ny fikojakojana", "Ahenao ny dia foana"],
        tasks: ["Zahao ny kodia", "Adihadio ny dia mahazo tombony", "Omano ny faktiora ho an'ny mpanjifa"],
        advice: "Ny AI dia afaka mamantatra ny dia tsy misy tombony ary manoro hevitra ny fotoana tsara indrindra hanaovana course.",
    },
    {
        id: "beauty",
        label: "Hety / hatsarana",
        icon: Scissors,
        title: "Tabilao salon hatsarana",
        description: "Rendez-vous, asa natao, entana, tsy fivadihan'ny mpanjifa ary fandaharam-potoan'ny mpiasa.",
        modules: ["RDV", "Asa natao", "Entana", "Mpanjifa", "Tsy fivadihana", "Fandaharam-potoana"],
        kpis: [
            { label: "RDV herinandro", value: "38", trend: "+11" },
            { label: "Salan'ny fandaniana", value: "34k Ar", trend: "+5%" },
            { label: "Mpanjifa mahatoky", value: "64", trend: "tokony homena valisoa" },
            { label: "Entana efa ho lany", value: "8", trend: "tokony hovidina" },
        ],
        focus: ["Amboary tsara ny fandaharam-potoana", "Vidio ny entana mifameno", "Ampahatsiahivo ny mpanjifa mahatoky"],
        tasks: ["Hamafiso ny RDV rahampitso", "Manafatra entana", "Alefaso ny tolotra manokana"],
        advice: "Ny AI dia afaka manolotra tolotra mifanaraka amin'ny tantaran'ny asa natao isaky ny mpanjifa.",
    },
    {
        id: "tailoring",
        label: "Zaitra",
        icon: Shirt,
        title: "Tabilao trano fanaovan-damba",
        description: "Komandy, refy, lamba, fe-potoana, akon-tanana ary fanaterana.",
        modules: ["Komandy", "Refy", "Lamba", "Akon-tanana", "Fanaterana", "Fandaharam-potoana"],
        kpis: [
            { label: "Komandy", value: "23", trend: "9 maika" },
            { label: "Lamba ao anaty tahiry", value: "47", trend: "12 kely sisa" },
            { label: "Akon-tanana", value: "680k Ar", trend: "voaray" },
            { label: "Fanaterana", value: "6", trend: "amin'ity herinandro ity" },
        ],
        focus: ["Aza tara amin'ny fe-potoana", "Araho ny refy mpanjifa", "Tantano ny lamba isaky ny komandy"],
        tasks: ["Tapaho ny lamba akanjo", "Antsoy ny mpanjifa haka refy", "Omano ny fanaterana ny asabotsy"],
        advice: "Ny AI dia afaka mandahatra ny komandy araka ny fahamaikany sy ny tombony azony mba hialana amin'ny fahatarana.",
    },
    {
        id: "tourism",
        label: "Twrizima / hôtely",
        icon: Hotel,
        title: "Tabilao twrizima",
        description: "Famandrihana, efitrano, fitsidihana, hevitry ny mpanjifa, vanim-potoana ary vola miditra.",
        modules: ["Famandrihana", "Efitrano", "Fitsidihana", "Hevitra", "Vanim-potoana", "Vola miditra"],
        kpis: [
            { label: "Efitrano feno", value: "73%", trend: "+14%" },
            { label: "Famandrihana", value: "18", trend: "7 andro" },
            { label: "Salan'ny hevitra", value: "4.6", trend: "tena tsara" },
            { label: "Vola vinavinaina", value: "3.4M Ar", trend: "volana" },
        ],
        focus: ["Fenoy ny fotoana tsy misy olona", "Araho ny hevitra", "Amboary ny vidiny araka ny vanim-potoana"],
        tasks: ["Hamafiso ny famandrihana", "Valio ny hevitra", "Mamorona tolotra faran'ny herinandro"],
        advice: "Ny AI dia afaka manolotra vidiny araka ny vanim-potoana ary mamorona tolotra mba hamenoana ny daty tsy misy olona.",
    },
    {
        id: "education",
        label: "Fanabeazana / fiofanana",
        icon: GraduationCap,
        title: "Tabilao fiofanana",
        description: "Mpianatra, lesona, fandoavam-bola, fanatrehana, fandrosoana ary votoaty AI.",
        modules: ["Mpianatra", "Lesona", "Fanatrehana", "Fandoavam-bola", "Fandrosoana", "Votoaty AI"],
        kpis: [
            { label: "Mpianatra mavitrika", value: "126", trend: "+18" },
            { label: "Fanatrehana", value: "88%", trend: "herinandro" },
            { label: "Vola mbola tsy voaloa", value: "14", trend: "tokony hampahatsiahivina" },
            { label: "Lesona voaforona", value: "9", trend: "tamin'ity volana ity" },
        ],
        focus: ["Araho ny fandrosoana", "Ampahatsiahivo ny fandoavam-bola", "Mamorona fanazaran-tena amin'ny alalan'ny AI"],
        tasks: ["Omano ny lesona", "Ampahatsiahivo ny fandoavam-bola", "Fantaro ny mpianatra taraiky"],
        advice: "Ny AI dia afaka mamorona fanazaran-tena mifanaraka amin'ny haavon'ny mpianatra ary mampandre momba ny mpianatra mety ho taraiky.",
    },
    {
        id: "construction",
        label: "BTP / mpanao trano",
        icon: Hammer,
        title: "Tabilao fanorenana",
        description: "Toeram-panorenana, fitaovana, mpiasa, vinavina vidiny, vola lany ary fandrosoana.",
        modules: ["Toeram-panorenana", "Fitaovana", "Ekipe", "Vinavina vidiny", "Vola lany", "Fandrosoana"],
        kpis: [
            { label: "Toerana mandeha", value: "4", trend: "1 tara" },
            { label: "Fitaovana", value: "1.8M Ar", trend: "teti-bola" },
            { label: "Fandrosoana", value: "62%", trend: "salany" },
            { label: "Vinavina nalefa", value: "11", trend: "3 nekena" },
        ],
        focus: ["Ampitahaina ny teti-bola sy ny tena lany", "Andaharo ny fitaovana", "Araho ny fandrosoan'ny asa"],
        tasks: ["Manafatra sementa", "Zahao ny fandrosoan'ny asa", "Alefaso ny vinavina vidiny ho an'ny mpanjifa"],
        advice: "Ny AI dia afaka mamantatra ny fihoaran'ny teti-bola mialoha ny hahatonga izany ho olana lehibe.",
    },
    {
        id: "fishing",
        label: "Penty / jono",
        icon: Waves,
        title: "Tabilao fanjonoana",
        description: "Fivoahana an-dranomasina, vokatra azom-pihina, toetr'andro an-dranomasina, varotra, solika ary fitahirizana.",
        modules: ["Fivoahana", "Vokatra azom-pihina", "Toetr'andro", "Varotra", "Solika", "Fitahirizana"],
        kpis: [
            { label: "Vokatra azom-pihina", value: "128 kg", trend: "herinandro" },
            { label: "Varotra", value: "740k Ar", trend: "+10%" },
            { label: "Solika", value: "210k Ar", trend: "tokony hahena" },
            { label: "Loza avy amin'ny toetr'andro", value: "Ambany", trend: "48h" },
        ],
        focus: ["Vinavinao ny fivoahana", "Ampitomboy ny varotra haingana", "Araho ny fitahirizana"],
        tasks: ["Zahao ny ranomandry", "Alamino ny fivoahana", "Ampitahaina ny vidin'ny tsena"],
        advice: "Ny AI dia afaka manoro hevitra ny andro hivoahana sy ny tsena mahazo tombony indrindra arakaraka ny trondro azo.",
    },
];

const commonCases = [
    "Asa rehetra misy tahiry : entana, biby, kojakoja, fitaovana.",
    "Asa rehetra misy rendez-vous : hatsarana, fahasalamana, fiofanana, tolotra.",
    "Asa rehetra misy famokarana : fambolena, fiompiana, jono, zaitra, asa tanana.",
    "Asa rehetra misy tetikasa : freelance, BTP, hetsika, masoivoho.",
    "Asa rehetra misy fiara : fitaterana, fanaterana entana, taxi, logistika.",
    "Asa rehetra misy famandrihana na mpanjifa mahazatra : sekoly, trano fanaovana fanatanjahantena, tolotra isam-bolana.",
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
                                <Bot className="h-4 w-4" /> Sary santionan'ny tabilao IA mavitrika
                            </div>
                            <h1 className="text-3xl font-black tracking-tight md:text-5xl">
                                Tabilao miovaova arakaraka ny asa noforonin'ny mpampiasa
                            </h1>
                            <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-[#1f3b22]/65 md:text-base">
                                Ny AI dia tsy mamorona kaody. Manadihady ny valintenin'ny onboarding izy ary mamokatra fanamafisana JSON: asa, modules, KPIs, asa tokony hatao, torohevitra ary widgets. Ny frontend avy eo dia mampiseho ny tabilao mifanaraka amin'izany.
                            </p>
                        </div>
                        <div className="rounded-[1.6rem] border border-red-500/10 bg-red-50 p-4 text-sm font-bold text-red-600 lg:max-w-sm">
                            Ohatra: mpivarotra finday ≠ mpiompy ≠ tantsaha. Mitovy ny endrika MadagIAscar, saingy hafa ny widgets sy ny angona.
                        </div>
                    </div>
                </section>

                <section className="grid gap-6 xl:grid-cols-[360px_1fr]">
                    <aside className="rounded-[2rem] border border-primary/10 bg-white p-4 shadow-sm xl:max-h-[calc(100vh-7rem)] xl:overflow-auto">
                        <div className="mb-4 px-2">
                            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#1f3b22]/40">Hisafidy asa</p>
                            <h2 className="mt-1 text-xl font-black">Ireo tranga azo atao</h2>
                        </div>
                        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
                            {jobTemplates.map((template) => {
                                const Icon = template.icon;
                                const isActive = template.id === activeId;
                                return (
                                    <button
                                        key={template.id}
                                        onClick={() => setActiveId(template.id)}
                                        className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition-all ${isActive
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
                                        <p className="text-xs font-black uppercase tracking-[0.18em] text-red-500">Tabilao novokarina</p>
                                        <h2 className="mt-1 text-3xl font-black tracking-tight">{activeTemplate.title}</h2>
                                        <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-[#1f3b22]/65">{activeTemplate.description}</p>
                                    </div>
                                </div>
                                <div className="rounded-2xl border border-primary/10 bg-green-50 p-4 text-xs font-bold text-[#1f3b22]/70 lg:w-80">
                                    <p className="mb-2 text-primary">Fikirakirana AI natao santionany</p>
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
                                        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#1f3b22]/40">Modules mavitrika</p>
                                        <h3 className="mt-1 text-2xl font-black">Widgets mipoitra ho azy</h3>
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
                                        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#1f3b22]/40">Asan'ny AI</p>
                                        <h3 className="text-xl font-black">Anio</h3>
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
                                    <h3 className="text-xl font-black">Torohevitra AI mifanaraka tsara</h3>
                                </div>
                                <p className="text-sm font-medium leading-7 text-white/85">{activeTemplate.advice}</p>
                            </div>

                            <div className="rounded-[2rem] border border-primary/10 bg-white p-6 shadow-sm">
                                <div className="mb-4 flex items-center gap-3">
                                    <Wallet className="h-6 w-6 text-primary" />
                                    <h3 className="text-xl font-black">Fandalinana ireo tranga lehibe</h3>
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
                                <h3 className="text-xl font-black">Dingana teknika manaraka</h3>
                            </div>
                            <p className="text-sm font-medium leading-7 text-[#1f3b22]/65">
                                Havaozina amin'ny tena fikirakirana avy amin'ny onboarding ireto bokotra santionany ireto. Isaky ny orinasa noforonin'ny mpampiasa dia hanana ny "dashboardConfig"-ny manokana voatahiry, ary avy eo ity mpampiseho ity dia hamoaka ny widgets mety.
                            </p>
                        </section>
                    </main>
                </section>
            </div>
        </div>
    );
}
