import { useState, useEffect } from "react";
import ModernRegisterFlow from "../components/ModernRegisterFlow";
import { getAuthUser } from "../services/api";

function useScrollY() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    let frame;
    const handler = () => setScrollY(window.scrollY || document.scrollingElement?.scrollTop || 0);
    const tick = () => {
      handler();
      frame = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", handler, { passive: true });
    document.addEventListener("scroll", handler, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", handler);
      document.removeEventListener("scroll", handler);
      cancelAnimationFrame(frame);
    };
  }, []);
  return scrollY;
}

const Device = ({ scale = 1, rotate = 0, className = "" }) => {
  return (
    <div
      className={`relative flex-shrink-0 transition-transform duration-500 ease-out ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        width: 140 * scale,
        height: 258 * scale,
      }}
    >
      <img
        src="/madagascar.png"
        alt="Madagascar"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: 70 * scale,
          display: "block",
        }}
      />
    </div>
  );
};

export default function HomePage({ navigate }) {
  const scrollY = useScrollY();
  const [vh, setVh] = useState(800);
  const [windowWidth, setWindowWidth] = useState(1024);

  useEffect(() => {
    setVh(window.innerHeight);
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setVh(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  const p1 = Math.min(Math.max(scrollY / vh, 0), 1);
  const sceneProgress = Math.min(Math.max(scrollY / (4.4 * vh), 0), 1);
  const pSpecs = Math.min(Math.max((scrollY - vh * 0.5) / (3.4 * vh), 0), 1);
  const lerp = (from, to, amount) => from + (to - from) * amount;
  const smooth = (amount) => {
    const t = Math.min(Math.max(amount, 0), 1);
    return t * t * (3 - 2 * t);
  };

  const getSceneX = () => {
    const right = isMobile ? 18 : 30;
    const left = isMobile ? -20 : -30;
    const finalRight = isMobile ? 5 : 9;
    if (sceneProgress < 0.24) return lerp(0, right, smooth(sceneProgress / 0.24));
    if (sceneProgress < 0.48) return lerp(right, left, smooth((sceneProgress - 0.24) / 0.24));
    if (sceneProgress < 0.72) return lerp(left, finalRight, smooth((sceneProgress - 0.48) / 0.24));
    return finalRight;
  };

  const getSceneScale = () => {
    if (isMobile) {
      if (sceneProgress < 0.24) return lerp(1.18, 0.9, smooth(sceneProgress / 0.24));
      if (sceneProgress < 0.48) return lerp(0.9, 1.18, smooth((sceneProgress - 0.24) / 0.24));
      if (sceneProgress < 0.72) return lerp(1.18, 0.98, smooth((sceneProgress - 0.48) / 0.24));
      if (sceneProgress < 0.82) return lerp(0.98, 1.24, smooth((sceneProgress - 0.72) / 0.1));
      return 1.24;
    }
    if (sceneProgress < 0.24) return lerp(2.35, 1.42, smooth(sceneProgress / 0.24));
    if (sceneProgress < 0.48) return lerp(1.42, 2.02, smooth((sceneProgress - 0.24) / 0.24));
    if (sceneProgress < 0.72) return lerp(2.02, 1.55, smooth((sceneProgress - 0.48) / 0.24));
    if (sceneProgress < 0.82) return lerp(1.55, 1.9, smooth((sceneProgress - 0.72) / 0.1));
    return 1.9;
  };

  const titleOpacity = Math.max(1 - p1 * 1.4, 0.18);
  const titleScale = 1 + Math.min(p1, 0.8) * 0.06;
  const rightPanelOpacity = Math.max(1 - p1 * 6, 0);
  const rightPanelX = p1 * 100;

  const deviceX = getSceneX();
  const deviceY = isMobile ? p1 * -5 : 0;
  const deviceScale = getSceneScale();
  const deviceOpacity = isMobile && sceneProgress > 0.18 && sceneProgress < 0.78 ? 0.28 : 1;
  const flagProgress = smooth((sceneProgress - 0.82) / 0.18);
  const textOnRight = sceneProgress >= 0.34 && sceneProgress < 0.58;

  const specsOpacity = Math.max((p1 - 0.25) * 2, 0);
  const finalCtaOpacity = flagProgress;

  const specItems = [
    {
      label: "Fanombohana tetikasa",
      content: (
        <p className="text-base md:text-lg leading-[1.85] text-[#213b26]/75">
          Manangona toerana, teti-bola ary fahaiza-manao.<br />
          Avy eo ny IA mamorona lalana mazava hanombohana.<br />
          Natao ho mora arahina amin'ny finday sy solosaina.
        </p>
      )
    },
    {
      label: "Mpanampy IA",
      content: (
        <p className="text-base md:text-lg leading-[1.85] text-[#213b26]/75">
          Pejy fandraisana mampiseho fiasa fototra: famoronana tetikasa fandraharahana, lisitra asa, tabilao fanaraha-maso, fanaraha-maso vola, ary torohevitra IA isanandro.
        </p>
      ),
      highlight: true
    },
    {
      label: "Fiasa aseho",
      content: (
        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            {[{ icon: "", label: "Drafitra" }, { icon: "", label: "Lisitra asa" }, { icon: "", label: "Tabilao" }].map((item) => (
              <div key={item.label} className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#00843D]/15 bg-[#00843D]/7 text-sm font-semibold text-[#17391f] shadow-sm">
                <span>{item.icon}</span><span>{item.label}</span>
              </div>
            ))}
          </div>
          <p className="text-xs md:text-sm uppercase tracking-[1.5px] text-[#1f3b22]/50">Fandraharahana kely, varotra, asa tanana ary tetikasa eto Madagasikara.</p>
        </div>
      )
    },
    {
      label: "Fanaraha-maso",
      content: <p className="text-base md:text-lg leading-[1.85] text-[#213b26]/75">Manara-maso varotra, fandaniana, tombony, tahiry ary tanjona isanandro.</p>
    },
    {
      label: "Soso-kevitra IA",
      content: <p className="text-base md:text-lg leading-[1.85] text-[#213b26]/75">Manoro asa atao androany, vidiny hatsaraina, mpanjifa harahina ary vokatra tokony andramana.</p>
    }
  ];

  const activeIndex = Math.min(Math.floor(pSpecs * specItems.length), specItems.length - 1);
  const activeSpec = specItems[activeIndex];

  const user = getAuthUser();

  return (
    <div className="bg-white text-[#172018] font-['DM_Sans',sans-serif] selection:bg-red-500/20">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Space+Grotesk:wght@700;800&display=swap');
        ::-webkit-scrollbar { width: 0; }
        * { cursor: default; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div className="h-[520vh]">
        <div className="fixed inset-0 overflow-hidden bg-white px-4 sm:px-6 md:px-10 lg:px-16 pointer-events-none">
          <div className="relative w-full h-full pointer-events-auto">
            <div className="absolute inset-[-100px] bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,_rgba(0,130,60,0.12)_0%,_rgba(252,210,210,0.28)_45%,_transparent_82%)] pointer-events-none" />

            {/* ── NAV ── */}
            <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-2 md:px-16 py-6 z-50">
              <div className="font-['Space_Grotesk'] font-extrabold text-xl md:text-2xl flex items-center gap-1">
                MadagIAscar<span className="text-red-500 text-2xl md:text-3xl leading-none">°</span>
              </div>
              {/* Desktop nav — original inchangé */}
              <div className="hidden md:flex items-center gap-12">
                {["Hevitra", "Fiasa"].map((item) => (
                  <a key={item} href="#" className="text-[#1f3b22]/60 text-[10px] font-bold hover:text-[#00843D] transition-colors uppercase tracking-[0.2em]">{item}</a>
                ))}
                {user ? (
                  <button onClick={() => navigate('dashboard')} className="text-[#00843D] text-[10px] font-bold hover:text-green-800 transition-colors uppercase tracking-[0.2em]">DASHBOARD</button>
                ) : (
                  <button onClick={() => navigate('auth')} className="text-[#1f3b22]/60 text-[10px] font-bold hover:text-[#00843D] transition-colors uppercase tracking-[0.2em]">HIDITRA</button>
                )}
                <div className="w-9 h-9 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-[#1f3b22]/80 hover:bg-green-50 transition-colors cursor-pointer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
              {/* Mobile nav — trois liens compacts */}
              <div className="md:hidden flex items-center gap-5">
                {["Hevitra", "Fiasa"].map((item) => (
                  <a key={item} href="#" className="text-[#1f3b22]/60 text-[9px] font-bold uppercase tracking-[0.15em]">{item}</a>
                ))}
                {user ? (
                  <button onClick={() => navigate('dashboard')} className="text-[#00843D] text-[9px] font-bold uppercase tracking-[0.15em]">DASHBOARD</button>
                ) : (
                  <button onClick={() => navigate('auth')} className="text-[#1f3b22]/60 text-[9px] font-bold uppercase tracking-[0.15em]">HIDITRA </button>
                )}
              </div>
            </nav>

            {/* ── HERO ── */}
            <div className="relative w-full h-full flex items-center">

              {/* TITRE — desktop: 18vw original / mobile: taille contenue */}
              <div
                className="absolute left-0 w-full lg:w-3/4 h-full flex items-center justify-center z-0"
                style={{ opacity: titleOpacity, transform: `scale(${titleScale})` }}
              >
                <h1
                  className="font-['Space_Grotesk'] font-extrabold text-[#00843D]/15 leading-none tracking-tighter select-none pointer-events-none text-center"
                  style={{ fontSize: isMobile ? "clamp(44px, 14vw, 78px)" : "clamp(96px, 12vw, 210px)" }}
                >
                  MadagIAscar
                </h1>
              </div>

              {/* PANEL DROIT — desktop: original inchangé */}
              <div
                className="absolute right-8 lg:right-[8vw] top-1/2 w-[300px] lg:w-[360px] z-10 space-y-6 hidden md:block"
                style={{ opacity: rightPanelOpacity, transform: `translateY(-50%) translateX(${rightPanelX}px)` }}
              >
                <div>
                  <p className="text-[10px] text-[#1f3b22]/55 uppercase tracking-[2px] mb-2 font-medium">IA fandraharahana <span className="text-red-500/55">( ho an'i Madagasikara )</span></p>
                  <p className="font-['Space_Grotesk'] text-4xl lg:text-5xl font-bold tracking-tight text-[#172018]">Mpanampy tetikasa</p>
                </div>
                <p className="text-sm text-[#1f3b22]/65 leading-relaxed font-light">
                  Pejy fandraisana mampiseho fiasa fototra: famoronana tetikasa fandraharahana, lisitra asa, tabilao fanaraha-maso, fanaraha-maso vola, ary torohevitra IA isanandro.
                </p>
                <div className="flex gap-3 items-center pt-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === 1 ? 'w-6 bg-[#00843D]' : i === 2 ? 'w-1.5 bg-red-500/70' : 'w-1.5 bg-[#1f3b22]/15'}`} />
                  ))}
                </div>
                <button className="w-full py-4 mt-4 bg-[#00843D] text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-red-500 transition-colors shadow-[0_18px_40px_rgba(0,132,61,0.22)]">Hijery fiasa</button>
              </div>

              {/* PANEL MOBILE — visible uniquement sur mobile, en bas */}
              <div
                className="md:hidden absolute bottom-7 left-5 right-5 z-30 space-y-3"
                style={{ opacity: rightPanelOpacity }}
              >
                <p className="text-[9px] text-[#1f3b22]/55 uppercase tracking-[2px] font-medium">
                  IA fandraharahana <span className="text-red-500/55">( ho an'i Madagasikara )</span>
                </p>
                <p className="font-['Space_Grotesk'] text-4xl font-extrabold leading-[0.95] tracking-[-0.04em]">Mpanampy tetikasa</p>
                <p className="text-xs text-[#1f3b22]/65 leading-relaxed font-light line-clamp-2">
                  Mampiseho planina, asa tokony hatao, vola miditra sy torohevitra IA.
                </p>
                <button className="w-full py-3.5 bg-[#00843D] text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-red-500 transition-colors">
                  Hijery fiasa
                </button>
              </div>

              {/* DEVICE */}
              <div
                className="absolute left-1/2 top-1/2 z-0 md:z-20 pointer-events-none transition-transform duration-[1200ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                style={{
                  opacity: deviceOpacity,
                  transform: `translate(calc(-50% + ${deviceX}vw), calc(-50% + ${deviceY}vh)) 
                              scale(${deviceScale})`
                }}
              >
                <div
                  className="absolute left-1/2 top-1/2 -z-10 overflow-hidden rounded-[26px] shadow-[0_24px_80px_rgba(0,0,0,0.12)]"
                  style={{
                    width: isMobile ? 220 : 390,
                    height: isMobile ? 132 : 230,
                    opacity: flagProgress,
                    transform: `translate(-18%, -50%) scaleX(${flagProgress})`,
                    transformOrigin: "left center",
                  }}
                >
                  <div className="absolute inset-y-0 left-0 w-[36%] bg-white" />
                  <div className="absolute right-0 top-0 h-1/2 w-[64%] bg-red-600" />
                  <div className="absolute right-0 bottom-0 h-1/2 w-[64%] bg-[#00843D]" />
                </div>
                <Device scale={1} />
              </div>

              {/* ── SPECS ── */}
              <div
                className={`absolute inset-0 flex items-center justify-center ${textOnRight ? "md:justify-end" : "md:justify-start"} z-30 md:z-10 pointer-events-none`}
                style={{ opacity: specsOpacity }}
              >
                {/* Desktop specs — texte moderne sans card */}
                <div className={`hidden md:block w-[40%] max-w-2xl pointer-events-auto transition-opacity duration-500 ${textOnRight ? "pr-[4vw] lg:pr-[7vw]" : "pl-[4vw] lg:pl-[7vw]"}`} style={{ opacity: finalCtaOpacity > 0.08 ? 0 : 1 - flagProgress }}>
                  <div key={activeIndex} className="relative animate-[fadeIn_.45s_ease-out]">
                    <div className="mb-6 flex items-center gap-4">
                      <span className="h-px w-14 bg-red-500/70" />
                      <span className="text-[11px] font-black uppercase tracking-[3px] text-[#00843D]">IA Business · 0{activeIndex + 1}</span>
                    </div>
                    <p className="font-['Space_Grotesk'] text-5xl lg:text-7xl font-extrabold leading-[0.88] tracking-[-0.065em] text-[#172018] drop-shadow-[0_12px_30px_rgba(0,70,35,0.08)]">
                      {activeSpec.label}
                    </p>
                    <div className="mt-6 h-1.5 w-28 rounded-full bg-gradient-to-r from-red-500 via-white to-[#00843D]" />
                    <div className="mt-7 max-w-lg text-[#172018] transition-all duration-500 [&_p]:text-xl [&_p]:leading-[1.75] [&_p]:text-[#213b26]/78">
                      {activeSpec.content}
                    </div>
                  </div>
                </div>

                {/* Mobile specs — texte moderne sans card */}
                <div className="md:hidden w-full px-5 pt-[50vh] pointer-events-auto transition-opacity duration-500" style={{ opacity: finalCtaOpacity > 0.08 ? 0 : 1 - flagProgress }}>
                  <div key={activeIndex} className="relative animate-[fadeIn_.45s_ease-out]">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="h-px w-10 bg-red-500/70" />
                      <span className="text-[9px] font-black uppercase tracking-[2.2px] text-[#00843D]">IA Business · 0{activeIndex + 1}</span>
                    </div>
                    <p className="font-['Space_Grotesk'] text-4xl font-extrabold leading-[0.9] tracking-[-0.055em] text-[#172018] drop-shadow-[0_10px_24px_rgba(0,70,35,0.08)]">
                      {activeSpec.label}
                    </p>
                    <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-red-500 via-white to-[#00843D]" />
                    <div className="mt-4 max-w-[88vw] text-sm leading-relaxed text-[#213b26]/78 transition-all duration-500 [&_p]:text-sm [&_p]:leading-relaxed">
                      {activeSpec.content}
                    </div>
                  </div>
                </div>

                {/* Final register flow */}
                <div
                  className="absolute left-3 right-3 bottom-2 z-40 md:left-[7vw] md:right-auto md:bottom-auto md:top-[58%] md:w-[430px] pointer-events-auto transition-all duration-700"
                  style={{
                    opacity: finalCtaOpacity,
                    transform: isMobile
                      ? `translateY(${(1 - finalCtaOpacity) * 26}px)`
                      : `translateY(calc(-50% - 70px)) translateX(${(1 - finalCtaOpacity) * -28}px)`,
                    pointerEvents: finalCtaOpacity > 0.7 ? 'auto' : 'none',
                  }}
                >
                  <ModernRegisterFlow onDone={() => navigate('onboarding')} />
                </div>

                {/* Dots indicateur vertical */}
                <div className="absolute right-3 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-3 md:gap-4">
                  {specItems.map((_, i) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full border transition-all duration-500 ${i === activeIndex ? 'bg-red-500 border-red-500 scale-150 shadow-[0_0_10px_rgba(239,68,68,0.35)]' : 'border-[#00843D]/30 bg-transparent'}`} />
                  ))}
                </div>
              </div>

              {/* Subtitle bas gauche — desktop uniquement, original */}
              <div className="absolute bottom-8 md:bottom-12 left-6 md:left-12 hidden md:flex items-center gap-4" style={{ opacity: titleOpacity }}>
                <div className="w-12 h-px bg-[#00843D]/30" />
                <span className="text-[10px] text-[#1f3b22]/45 uppercase tracking-[2px] font-medium">Fandraharahana kely, varotra, asa tanana ary tetikasa eto Madagasikara.</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}