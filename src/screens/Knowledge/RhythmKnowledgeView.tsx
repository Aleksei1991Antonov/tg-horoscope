import React from 'react';
import { Zap, Users, ShieldCheck, Info, MoonStar, Sparkles, Heart, type LucideIcon } from 'lucide-react';

interface Section {
    Icon: LucideIcon;
    title: string;
    description: string;
    fact: string;
    color: string;
}

interface Props {
    fontScale?: 'small' | 'medium' | 'large';
}

export const RhythmKnowledgeView: React.FC<Props> = ({ fontScale = 'medium' }) => {
    const sections: Section[] = [
        {
            Icon: Zap,
            title: "Час Силы",
            color: "text-[var(--c-primary)]",
            description: "Алгоритм вычисляет время, когда ваша планета-покровитель максимально активна в небе. В этот час ваш уровень личной удачи достигает пика. Это лучший момент для того, чтобы проявить инициативу, принять важное решение или начать новое дело.",
            fact: "Расчет объединяет древнюю систему планетарных часов и текущую фазу Луны."
        },
        {
            Icon: Heart,
            title: "Любовный радар",
            color: "text-[var(--c-primary)]",
            description: "Система анализирует совместимость вашей стихии и стихии партнера. Мы строим график на неделю, учитывая естественные энергетические циклы. Это помогает заранее увидеть дни, когда ваши чувства будут в полном резонансе, а когда стоит проявить больше чуткости.",
            fact: "Учитываются особые кармические пары и природные колебания энергии в отношениях."
        },
        {
            Icon: Users,
            title: "Синергия дня",
            color: "text-[var(--c-primary)]",
            description: "Ежедневный расчет притяжения со всеми знаками Зодиака. Мы смотрим, в каком знаке сейчас находится Луна и как она влияет на ваш контакт с окружающими. Если Луна входит в стихию другого человека — ваше взаимопонимание усиливается.",
            fact: "Добавляется фактор случайности, чтобы отразить непредсказуемость живого общения."
        },
        {
            Icon: Sparkles,
            title: "Красота и уход",
            color: "text-[var(--c-primary)]",
            description: "Рекомендации по уходу за собой на основе лунных ритмов. Система подскажет идеальное время для стрижки, чтобы волосы росли быстрее, или лучший период для очищения кожи. Мы сопоставляем вашу стихию с положением Луны для лучшего результата.",
            fact: "Для знаков Воды эффект от очищения организма удваивается в определенные фазы."
        },
        {
            Icon: MoonStar,
            title: "Личный прогноз",
            color: "text-[var(--c-secondary)]",
            description: "Это математический расчет связи вашего знака с текущим положением планет. Мы переводим сложные астрологические данные в понятный уровень энергии дня: от спокойного режима накопления сил до максимального драйва и успеха.",
            fact: "Анализируется геометрия неба: от гармоничных связей до напряженных моментов."
        },
        {
            Icon: ShieldCheck,
            title: "Безопасность",
            color: "text-[var(--c-secondary)]",
            description: "Все расчеты происходят только на вашем устройстве. Ваши личные данные, даты и выбранные знаки не передаются в интернет и не хранятся на серверах. Ваша астрологическая карта остается полностью анонимной и доступной только вам.",
            fact: "Ваша приватность защищена технологиями MAX и локальной обработкой данных."
        }
    ];

    const titleSize = fontScale === 'large' ? 'text-3xl' : 'text-2xl';
    const bodySize = fontScale === 'large' ? 'text-base' : 'text-sm';

    return (
        <div className="flex flex-col bg-transparent">
            <div className="max-w-2xl mx-auto w-full">
                {/* Заголовок контента */}
                <div className="px-6 pt-8 mb-8">
                    <h1 className={`${titleSize} font-black text-[var(--c-text)] tracking-tighter uppercase italic leading-none mb-3`}>
                        База знаний
                    </h1>
                    <p className="text-[var(--c-text-40)] text-sm leading-relaxed max-w-[300px]">
                        Узнайте, как ваш персональный ритм синхронизируется с движением планет.
                    </p>
                </div>

                {/* Секции */}
                <div className="px-4 space-y-4 pb-32">
                    {sections.map((section, idx) => {
                        const Icon = section.Icon;
                        return (
                            <div
                                key={idx}
                                className="bg-[var(--c-surface)] border border-[var(--c-border)] rounded-[32px] p-6 overflow-hidden relative card-shadow"
                            >
                                {/* Декор */}
                                <div className={`absolute -right-4 -top-4 p-4 opacity-[0.02] rotate-12 ${section.color}`}>
                                    <Icon size={140} />
                                </div>

                                <div className="flex items-center gap-3 mb-4 relative z-10">
                                    <Icon className={section.color} size="1.25rem" />
                                    <h2 className="text-lg font-bold text-[var(--c-text)] uppercase tracking-wider italic">{section.title}</h2>
                                </div>

                                <p className={`${bodySize} text-[var(--c-text-60)] leading-relaxed mb-5 relative z-10 font-medium`}>
                                    {section.description}
                                </p>

                                <div className="flex items-start gap-3 p-4 bg-[var(--c-surface)] rounded-2xl border border-[var(--c-border)] relative z-10 card-shadow">
                                    <Info size={16} className={`${section.color} mt-0.5 shrink-0 opacity-80`} />
                                    <span className="text-[0.6875rem] font-medium text-[var(--c-text-40)] leading-snug italic">
                                        {section.fact}
                                    </span>
                                </div>
                            </div>
                        );
                    })}

                    {/* Футер */}
                    <div className="px-8 mt-12 text-center opacity-30">
                        <p className="text-[0.5625rem] text-[var(--c-text)] uppercase tracking-[0.2em] leading-relaxed">
                            Алгоритмы приложения основаны на математических моделях <br />
                            и носят рекомендательный характер.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};