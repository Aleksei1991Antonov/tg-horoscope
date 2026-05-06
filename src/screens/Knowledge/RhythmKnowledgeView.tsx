import React from 'react';
import { BookOpen, Zap, Users, ShieldCheck, Info, MoonStar, type LucideIcon } from 'lucide-react';

interface Section {
    Icon: LucideIcon;
    title: string;
    description: string;
    fact: string;
    color: string;
}

export const RhythmKnowledgeView: React.FC = () => {
    const sections: Section[] = [
        {
            Icon: Zap,
            title: "Час Силы",
            color: "text-yellow-400",
            description: "Алгоритм рассчитывает динамические Планетарные часы. Мы делим световой день от рассвета до заката на 12 равных интервалов. Каждым периодом управляет планета-септенер. Когда энергия текущего часа входит в резонанс с вашим знаком — наступает пик вашей личной эффективности.",
            fact: "Используется Халдейский ряд управителей: от Сатурна до Луны."
        },
        {
            Icon: Users,
            title: "Синергия",
            color: "text-fuchsia-400",
            description: "Расчет строится на математической модели синастрии. Мы анализируем угловые расстояния (аспекты) между знаками. Гармоничные связи (Тригоны 120° и Секстили 60°) формируют высокий процент совместимости, а напряженные аспекты указывают на зоны возможного трения.",
            fact: "Алгоритм учитывает ежедневное смещение Солнца на 1 градус."
        },
        {
            Icon: MoonStar,
            title: "Прогноз",
            color: "text-indigo-400",
            description: "Ваш гороскоп — это не случайный текст. Система анализирует текущие транзиты планет относительно вашего знака. Мы сопоставляем положение Луны в знаках и фазах с вашей стихией, выявляя наиболее вероятные событийные тренды на ближайшие 24 часа.",
            fact: "Обновление данных происходит в 00:00 по вашему местному времени."
        },
        {
            Icon: ShieldCheck,
            title: "Приватность",
            color: "text-emerald-400",
            description: "AstroApp работает по принципу Edge Computing: все расчеты производятся непосредственно на вашем устройстве. Мы не передаем ваш знак зодиака на внешние сервера. Данные хранятся в зашифрованном облаке Telegram, доступ к которому есть только у вас.",
            fact: "Ваш цифровой след в приложении полностью анонимен."
        }
    ];

    return (
        <div className="flex flex-col pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Заголовок */}
            <div className="px-6 pt-4 mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-2xl bg-fuchsia-500/20 flex items-center justify-center border border-fuchsia-500/30">
                        <BookOpen className="text-fuchsia-400" size={20} />
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tighter uppercase">База знаний</h1>
                </div>
                <p className="text-white/40 text-sm leading-relaxed">
                    Узнайте, как классическая астрология соединяется с современными алгоритмами в нашем приложении.
                </p>
            </div>

            {/* Секции */}
            <div className="px-4 space-y-4">
                {sections.map((section, idx) => {
                    const Icon = section.Icon;
                    return (
                        <div
                            key={idx}
                            className="bg-white/[0.03] border border-white/10 rounded-[32px] p-6 overflow-hidden relative group transition-all duration-500 hover:bg-white/[0.05]"
                        >
                            {/* Фоновая декоративная иконка */}
                            <div className={`absolute -right-4 -top-4 p-4 opacity-[0.03] group-hover:opacity-[0.07] transition-all duration-700 rotate-12 group-hover:rotate-0 ${section.color}`}>
                                <Icon size={120} />
                            </div>

                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                                    <Icon className={section.color} size={20} />
                                </div>
                                <h2 className="text-lg font-bold text-white uppercase tracking-wider">{section.title}</h2>
                            </div>

                            <p className="text-white/60 text-sm leading-relaxed mb-4 relative z-10">
                                {section.description}
                            </p>

                            <div className="flex items-start gap-2 p-3 bg-white/5 rounded-2xl border border-white/5 relative z-10">
                                <Info size={14} className={`${section.color} mt-0.5 shrink-0 opacity-80`} />
                                <span className="text-[11px] font-medium text-white/40 leading-tight italic">
                                    {section.fact}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Футер */}
            <div className="px-8 mt-12 text-center">
                <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] leading-relaxed">
                    Алгоритмы Astro-App носят рекомендательный характер <br />
                    и основаны на классической западной школе астрологии.
                </p>
            </div>
        </div>
    );
};