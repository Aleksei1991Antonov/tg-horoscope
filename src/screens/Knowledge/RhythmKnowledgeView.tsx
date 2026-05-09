import React from 'react';
import { BookOpen, Zap, Users, ShieldCheck, Info, MoonStar, Sparkles, Heart, type LucideIcon } from 'lucide-react';

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
            description: "Алгоритм вычисляет время, когда ваша планета-покровитель максимально активна в небе. В этот час ваш уровень личной удачи достигает пика. Это лучший момент для того, чтобы проявить инициативу, принять важное решение или начать новое дело.",
            fact: "Расчет объединяет древнюю систему планетарных часов и текущую фазу Луны."
        },
        {
            Icon: Heart,
            title: "Любовный радар",
            color: "text-rose-400",
            description: "Система анализирует совместимость вашей стихии и стихии партнера. Мы строим график на неделю, учитывая естественные энергетические циклы. Это помогает заранее увидеть дни, когда ваши чувства будут в полном резонансе, а когда стоит проявить больше чуткости.",
            fact: "Учитываются особые кармические пары и природные колебания энергии в отношениях."
        },
        {
            Icon: Users,
            title: "Синергия дня",
            color: "text-fuchsia-400",
            description: "Ежедневный расчет притяжения со всеми знаками Зодиака. Мы смотрим, в каком знаке сейчас находится Луна и как она влияет на ваш контакт с окружающими. Если Луна входит в стихию другого человека — ваше взаимопонимание усиливается.",
            fact: "Добавляется фактор случайности, чтобы отразить непредсказуемость живого общения."
        },
        {
            Icon: Sparkles,
            title: "Красота и уход",
            color: "text-amber-400",
            description: "Рекомендации по уходу за собой на основе лунных ритмов. Система подскажет идеальное время для стрижки, чтобы волосы росли быстрее, или лучший период для очищения кожи. Мы сопоставляем вашу стихию с положением Луны для лучшего результата.",
            fact: "Для знаков Воды эффект от очищения организма удваивается в определенные фазы."
        },
        {
            Icon: MoonStar,
            title: "Личный прогноз",
            color: "text-indigo-400",
            description: "Это математический расчет связи вашего знака с текущим положением планет. Мы переводим сложные астрологические данные в понятный уровень энергии дня: от спокойного режима накопления сил до максимального драйва и успеха.",
            fact: "Анализируется геометрия неба: от гармоничных связей до напряженных моментов."
        },
        {
            Icon: ShieldCheck,
            title: "Безопасность",
            color: "text-emerald-400",
            description: "Все расчеты происходят только на вашем устройстве. Ваши личные данные, даты и выбранные знаки не передаются в интернет и не хранятся на серверах. Ваша астрологическая карта остается полностью анонимной и доступной только вам.",
            fact: "Ваша приватность защищена технологиями MAX и локальной обработкой данных."
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
                    <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">База знаний</h1>
                </div>
                <p className="text-white/40 text-sm leading-relaxed">
                    Узнайте, как мы объединяем классическую астрологию и современные алгоритмы.
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
                                <h2 className="text-lg font-bold text-white uppercase tracking-wider italic">{section.title}</h2>
                            </div>

                            <p className="text-white/60 text-sm leading-relaxed mb-4 relative z-10">
                                {section.description}
                            </p>

                            <div className="flex items-start gap-2 p-3 bg-black/40 rounded-2xl border border-white/5 relative z-10">
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
                    Алгоритмы приложения носят рекомендательный характер <br />
                    и основаны на математических моделях западной школы астрологии.
                </p>
            </div>
        </div>
    );
};