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
                    <p className="text-[0.5rem] text-[var(--c-text-20)] uppercase font-bold tracking-widest">Пользовательское соглашение приложения «Гороскоп»</p>
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
                        <p><span className="text-[var(--c-text)]">1.1. Telegram</span> – мессенджер Telegram, цифровая платформа, предоставляющая возможность создания и использования Mini Apps, включая Приложение.</p>
                        <p><span className="text-[var(--c-text)]">1.2. Разработчик</span> – ИП Антонов Алексей Олегович (ОГРНИП 326760000001804), создавший Приложение для платформы Telegram.</p>
                        <p><span className="text-[var(--c-text)]">1.3. Приложение</span> – Mini App «Гороскоп», размещённое и функционирующее в мессенджере Telegram.</p>
                        <p><span className="text-[var(--c-text)]">1.4. Пользователь</span> – лицо, использующее Приложение через Telegram.</p>
                        <p><span className="text-[var(--c-text)]">1.5. Соглашение</span> — настоящее Пользовательское соглашение приложения «Гороскоп».</p>
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
                        <p>2.3. Действующая редакция Соглашения всегда доступна через меню Приложения.</p>
                        <p>2.4. Запуск Приложения Пользователем означает полное и безоговорочное принятие настоящих Правил (ст. 438 ГК РФ).</p>
                        <p>2.5. Политика обработки персональных данных является неотъемлемой частью настоящего Соглашения.</p>
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
                            <p><span className="text-[var(--c-text)] font-bold">Особое условие:</span> Приложение предоставляет исключительно развлекательный контент. Астрологические прогнозы не являются научными данными. Приложение рекомендовано для пользователей старше 18 лет.</p>
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
                        <p>4.3. Исходный код Приложения опубликован на GitHub в ознакомительных и образовательных целях. Пользователь вправе изучать код, а также использовать отдельные алгоритмы и фрагменты в собственных некоммерческих проектах при условии указания авторства Разработчика. Запрещается полное или существенное копирование Приложения (включая UI/UX, структуру, контент), создание на его основе аналогов, а также коммерческое использование кода без письменного согласия Разработчика. Все авторские права на Приложение принадлежат Разработчику.</p>
                        <div className="p-3 bg-[var(--c-surface)] border border-[var(--c-border)] rounded-xl">
                            <p><span className="text-[var(--c-text)] font-bold">Финансовые условия:</span> Условия платной подписки NOVA Premium регулируются разделом 6 настоящего Соглашения.</p>
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
                        <p>5.5. Разработчик не гарантирует непрерывную и безошибочную работу Приложения, а также его совместимость со всеми устройствами и версиями программного обеспечения.</p>
                        <p>5.6. Разработчик не несёт ответственности за перебои, ошибки и ограничения в работе платформы Telegram, платёжных сервисов, операторов связи и иных третьих лиц, находящиеся вне разумного контроля Разработчика.</p>
                    </div>
                </section>

                {/* 6. Подписка NOVA Premium */}
                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-[var(--c-primary)]">
                        <ShieldAlert size="1.25rem" className="shrink-0" />
                        <h3 className={`${sectionTitleSize} font-black uppercase tracking-widest`}>6. Подписка NOVA Premium</h3>
                    </div>
                    <div className={`${bodyTextSize} leading-relaxed text-[var(--c-text-60)] font-medium space-y-2`}>
                        <p><span className="text-[var(--c-text)]">6.1.</span> NOVA Premium (далее — «Подписка») представляет собой платную дополнительную функциональность Приложения, предоставляющую Пользователю доступ к дополнительным возможностям, включая:</p>
                        <ul className="list-disc list-inside space-y-1 pl-2">
                            <li>Любовный гороскоп;</li>
                            <li>Премиальные темы оформления (NOVA День / NOVA Ночь);</li>
                            <li>Бэйдж NOVA Premium в профиле Пользователя;</li>
                            <li>Расширенный прогноз совместимости.</li>
                        </ul>
                        <p>Конкретный состав функциональности Подписки может изменяться и дополняться Разработчиком.</p>
                        <p><span className="text-[var(--c-text)]">6.2.</span> Стоимость Подписки составляет 199 (сто девяносто девять) рублей за 30 (тридцать) календарных дней, если иная стоимость не указана в интерфейсе Приложения на момент оформления заказа.</p>
                        <p>Разработчик вправе предоставлять скидки, промокоды, специальные предложения и иные условия приобретения Подписки.</p>
                        <p>Оплата осуществляется единовременным платежом.</p>
                        <p>Автоматическое продление Подписки не осуществляется.</p>
                        <p><span className="text-[var(--c-text)]">6.3.</span> Оплата Подписки производится через платёжный сервис ЮKassa либо иной платёжный сервис, указанный в интерфейсе Приложения.</p>
                        <p>Обработка платежей осуществляется соответствующим оператором платёжного сервиса в соответствии с его правилами и условиями использования.</p>
                        <p>Разработчик не получает и не хранит данные банковских карт Пользователей.</p>
                        <p><span className="text-[var(--c-text)]">6.4.</span> Подписка привязывается к идентификатору Пользователя в Telegram (Telegram ID).</p>
                        <p>Для идентификации Пользователя используются данные, предоставляемые платформой Telegram через Mini Apps API.</p>
                        <p>Перенос Подписки между аккаунтами Telegram не предусмотрен.</p>
                        <p><span className="text-[var(--c-text)]">6.5.</span> Подписка считается предоставленной с момента успешного подтверждения оплаты и активации соответствующего функционала в Приложении.</p>
                        <p>С момента активации Пользователь получает доступ к функциональности Подписки в течение оплаченного периода.</p>
                        <p><span className="text-[var(--c-text)]">6.6.</span> Пользователь соглашается с тем, что Подписка предоставляет доступ к цифровому контенту и дополнительной функциональности Приложения.</p>
                        <p>После активации Подписки услуга считается оказанной.</p>
                        <p>Возврат денежных средств осуществляется в случаях, предусмотренных законодательством Российской Федерации.</p>
                        <p><span className="text-[var(--c-text)]">6.7.</span> Разработчик вправе изменять, улучшать, расширять либо оптимизировать состав функциональности Подписки при условии сохранения её основного назначения.</p>
                        <p>Такие изменения не являются основанием для возврата денежных средств.</p>
                        <p><span className="text-[var(--c-text)]">6.8.</span> В случае существенного нарушения Пользователем условий настоящего Соглашения Разработчик вправе ограничить либо прекратить доступ Пользователя к Подписке без компенсации стоимости неиспользованного периода в случаях, допускаемых законодательством Российской Федерации.</p>
                        <p><span className="text-[var(--c-text)]">6.9.</span> Подписка предназначена исключительно для получения развлекательного контента.</p>
                        <p>Информация, предоставляемая в рамках Подписки, не является медицинской, психологической, финансовой, инвестиционной, юридической либо иной профессиональной консультацией и не может использоваться для принятия значимых решений.</p>
                    </div>
                </section>

                {/* 7. Заключительные положения */}
                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-[var(--c-primary)]">
                        <FileText size="1.25rem" className="shrink-0" />
                        <h3 className={`${sectionTitleSize} font-black uppercase tracking-widest`}>7. Заключительные положения</h3>
                    </div>
                    <div className={`${bodyTextSize} leading-relaxed text-[var(--c-text-60)] font-medium space-y-2`}>
                        <p>7.1. Настоящие Правила регулируются законодательством Российской Федерации.</p>
                        <p>7.2. Споры разрешаются путем переговоров, а при недостижении согласия — в судебном порядке согласно законодательству РФ с соблюдением претензионного порядка (срок ответа на претензию — 30 календарных дней).</p>
                    </div>
                </section>

                <div className={`pt-10 border-t border-[var(--c-border)] text-center ${footerTextSize} space-y-1 text-[var(--c-text-30)]`}>
                    <p className="font-bold uppercase tracking-widest text-[var(--c-text-50)]">Редакция от 17.06.26</p>
                    <p className="pt-2">ИП Антонов Алексей Олегович</p>
                    <p>ИНН 760407796785</p>
                    <p>ОГРНИП 326760000001804</p>
                    <p>E-mail: rabbithole.help@vk.com</p>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;