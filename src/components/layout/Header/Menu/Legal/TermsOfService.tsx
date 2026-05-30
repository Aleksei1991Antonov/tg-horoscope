import React from 'react';
import { FileText, Scale, Zap, ShieldAlert, Info, Copyright } from 'lucide-react';

interface TermsOfServiceProps {
    onBack: () => void;
    fontScale: 'small' | 'medium' | 'large';
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ onBack, fontScale }) => {

    // Адаптивные размеры текста
    const bodyTextSize = fontScale === 'small' ? 'text-[0.625rem]' : fontScale === 'medium' ? 'text-[0.6875rem]' : 'text-[0.875rem]';
    const sectionTitleSize = fontScale === 'large' ? 'text-[0.6875rem]' : 'text-[0.625rem]';
    const headerTitleSize = fontScale === 'large' ? 'text-xl' : 'text-lg';
    const footerTextSize = fontScale === 'small' ? 'text-[0.5625rem]' : fontScale === 'medium' ? 'text-[0.625rem]' : 'text-[0.8125rem]';
    return (
        <div className="fixed inset-0 z-[4000] bg-[var(--c-bg)] flex flex-col animate-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="p-6 border-b border-[var(--c-border)] flex items-center gap-4 bg-[var(--c-bg-90)] backdrop-blur-xl sticky top-0 z-10">
                <button onClick={onBack} className="text-[var(--c-primary)] active:scale-90 transition-transform shrink-0">
                    <FileText size="1.25rem" />
                </button>
                <div>
                    <h2 className={`${headerTitleSize} font-black text-[var(--c-text)] uppercase`}>
                        Пользовательское Соглашение
                    </h2>
                    <p className="text-[0.5rem] text-[var(--c-text-20)] uppercase font-bold tracking-widest">Типовая форма платформы MAX</p>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-10 no-scrollbar pb-20">

                {/* 1. Основные понятия */}
                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-[var(--c-primary)]">
                        <Info size="1.25rem" className="shrink-0" />
                        <h3 className={`${sectionTitleSize} font-black uppercase tracking-widest`}>1. Основные понятия</h3>
                    </div>
                    <div className={`${bodyTextSize} leading-relaxed text-[var(--c-text-60)] font-medium space-y-2`}>
                        <p><span className="text-[var(--c-text)]">1.1. Сервис</span> – сервис «MAX», доступный по адресу <button onClick={() => window.WebApp?.openLink('https://web.max.ru')} className="text-[var(--c-primary)] underline">web.max.ru</button>.</p>
                        <p><span className="text-[var(--c-text)]">1.2. Разработчик</span> – ИП Антонов Алексей Олегович (ОГРНИП 326760000001804), разместивший Приложение на Сервисе.</p>
                        <p><span className="text-[var(--c-text)]">1.3. Компания</span> – ООО «MAX» (ИНН: 9714058267, ОГРН: 1247700595230, г. Москва, Ленинградский пр-кт, д. 39, стр. 79).</p>
                        <p><span className="text-[var(--c-text)]">1.4. Приложение</span> – программное обеспечение «Гороскоп», размещенное на Сервисе.</p>
                        <p><span className="text-[var(--c-text)]">1.6. Правила</span> – настоящее Типовое пользовательское соглашение.</p>
                    </div>
                </section>

                {/* 2. Статус Правил */}
                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-[var(--c-primary)]">
                        <Scale size="1.25rem" className="shrink-0" />
                        <h3 className={`${sectionTitleSize} font-black uppercase tracking-widest`}>2. Статус Правил</h3>
                    </div>
                    <div className={`${bodyTextSize} leading-relaxed text-[var(--c-text-60)] font-medium space-y-2`}>
                        <p>2.1. Настоящие Правила регулируют права и обязанности Разработчика и Пользователя в связи с использованием Приложения.</p>
                        <p>2.3. Действующая редакция доступна по ссылке: <button onClick={() => window.WebApp?.openLink('https://dev.max.ru/docs/legal/agreement')} className="text-[var(--c-primary)] underline">dev.max.ru/docs/legal/agreement</button>.</p>
                        <p>2.4. Запуск Приложения Пользователем означает полное и безоговорочное принятие настоящих Правил (ст. 438 ГК РФ).</p>
                    </div>
                </section>

                {/* 3. Права и обязанности Сторон */}
                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-[var(--c-primary)]">
                        <Zap size="1.25rem" className="shrink-0" />
                        <h3 className={`${sectionTitleSize} font-black uppercase tracking-widest`}>3. Права и обязанности</h3>
                    </div>
                    <div className={`${bodyTextSize} leading-relaxed text-[var(--c-text-60)] font-medium space-y-3`}>
                        <p>3.2. Пользователь обязуется использовать Приложение в личных некоммерческих целях. Запрещается использование автоматических скриптов и вредоносных программ.</p>
                        <div className="p-3 bg-[var(--c-primary)]/5 border border-[var(--c-primary)]/20 rounded-xl">
                            <p><span className="text-[var(--c-text)] font-bold">Особое условие:</span> Приложение предоставляет исключительно развлекательный контент. Астрологические прогнозы не являются научными данными. Приложение предназначено для лиц старше 18 лет.</p>
                        </div>
                        <p>3.5. Разработчик обязан обеспечить техническую поддержку через e-mail: <span className="text-[var(--c-text)]">rabbithole.help@vk.com</span>.</p>
                    </div>
                </section>

                {/* 4. Интеллектуальная собственность */}
                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-[var(--c-primary)]">
                        <Copyright size="1.25rem" className="shrink-0" />
                        <h3 className={`${sectionTitleSize} font-black uppercase tracking-widest`}>4. Интеллектуальная собственность</h3>
                    </div>
                    <div className={`${bodyTextSize} leading-relaxed text-[var(--c-text-60)] font-medium space-y-3`}>
                        <p>4.2. Разработчик предоставляет Пользователю неисключительную лицензию на использование Приложения для личных нужд.</p>
                        <p>4.3. Исходный код Приложения является открытым и опубликован на GitHub. Пользователь вправе копировать, изменять и использовать код для любых личных или коммерческих целей без дополнительного согласия Разработчика.</p>
                        <div className="p-3 bg-[var(--c-surface)] border border-[var(--c-border)] rounded-xl">
                            <p><span className="text-[var(--c-text)] font-bold">Финансовые условия:</span> Любые платежи (донаты) через ЮMoney являются добровольными пожертвованиями на развитие проекта, не являются оплатой за услуги и не подлежат возврату.</p>
                        </div>
                    </div>
                </section>

                {/* 5. Гарантии и Ответственность */}
                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-[var(--c-primary)]">
                        <ShieldAlert size="1.25rem" className="shrink-0" />
                        <h3 className={`${sectionTitleSize} font-black uppercase tracking-widest`}>5. Гарантии и Ответственность</h3>
                    </div>
                    <div className={`${bodyTextSize} leading-relaxed text-[var(--c-text-60)] font-medium space-y-3`}>
                        <p>5.1. Приложение предоставляется на условиях «как есть». Разработчик не предоставляет гарантий в отношении последствий использования Приложения.</p>
                        <p>5.3. Разработчик не несёт ответственности за любой косвенный ущерб или упущенную выгоду, возникшие в связи с использованием или невозможностью использования Приложения.</p>
                        <p>5.4. Пользователь самостоятельно несёт ответственность за соблюдение прав третьих лиц и законодательства РФ при использовании Приложения.</p>
                    </div>
                </section>

                {/* 6. Заключительные положения */}
                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-[var(--c-primary)]">
                        <FileText size="1.25rem" className="shrink-0" />
                        <h3 className={`${sectionTitleSize} font-black uppercase tracking-widest`}>6. Заключительные положения</h3>
                    </div>
                    <div className={`${bodyTextSize} leading-relaxed text-[var(--c-text-60)] font-medium space-y-2`}>
                        <p>6.3. Настоящие Правила регулируются законодательством Российской Федерации.</p>
                        <p>6.4. Споры разрешаются путем переговоров, а при недостижении согласия — в судебном порядке согласно законодательству РФ.</p>
                    </div>
                </section>

                <div className={`pt-10 border-t border-[var(--c-border)] text-center ${footerTextSize} space-y-1 text-[var(--c-text-30)]`}>
                    <p className="font-bold uppercase tracking-widest text-[var(--c-text-50)]">Редакция от 22.05.26</p>
                    <p className="pt-2">ИП Антонов Алексей Олегович</p>
                    <p>ИНН 760407796785</p>
                    <p>ОГРНИП 326760000001804</p>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;