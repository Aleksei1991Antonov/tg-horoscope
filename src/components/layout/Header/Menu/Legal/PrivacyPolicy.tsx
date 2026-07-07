import React from 'react';
import { Shield, Lock, Database, Info, Scale, Mail, Users, BarChart3 } from 'lucide-react';

interface PrivacyPolicyProps {
    onBack: () => void;
    // Добавляем пропс масштаба
    fontScale: 'small' | 'medium' | 'large';
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack, fontScale }) => {

    // Определяем размеры текста в зависимости от выбранного масштаба
    const bodyTextSize = fontScale === 'small' ? 'text-[0.625rem]' : fontScale === 'medium' ? 'text-[0.6875rem]' : 'text-[0.875rem]';
    const sectionTitleSize = fontScale === 'large' ? 'text-[0.6875rem]' : 'text-[0.625rem]';
    const headerTitleSize = fontScale === 'large' ? 'text-xl' : 'text-lg';
    const footerTextSize = fontScale === 'small' ? 'text-[0.5625rem]' : fontScale === 'medium' ? 'text-[0.625rem]' : 'text-[0.8125rem]';
    return (
        <div className="fixed inset-0 z-[4000] bg-[var(--c-bg)] flex flex-col animate-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="p-6 border-b border-[var(--c-border)] flex items-center gap-4 bg-[var(--c-bg-90)] backdrop-blur-xl sticky top-0 z-10">
                <button onClick={onBack} className="text-[var(--c-primary)] active:scale-90 transition-transform shrink-0">
                    <Shield size="1.25rem" />
                </button>
                <div>
                    <h2 className={`${headerTitleSize} font-black text-[var(--c-text)] uppercase`}>
                        Политика конфиденциальности
                    </h2>
                    <p className="text-[0.5rem] text-[var(--c-text-20)] uppercase font-bold tracking-widest">Политика конфиденциальности приложения «Гороскоп»</p>
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
                        <p><span className="text-[var(--c-text)]">1.1. Сервис</span> – сервис «MAX», доступный по адресу <button onClick={() => window.Telegram?.WebApp?.openLink('https://web.max.ru')} className="text-[var(--c-primary)] underline">web.max.ru</button>.</p>
                        <p><span className="text-[var(--c-text)]">1.2. Разработчик</span> – ИП Антонов Алексей Олегович (ОГРНИП 326760000001804), разместивший Приложение на Сервисе.</p>
                        <p><span className="text-[var(--c-text)]">1.3. Компания</span> – ООО «MAX» (ИНН: 9714058267, ОГРН: 1247700595230, г. Москва, Ленинградский пр-кт, д. 39, стр. 79).</p>
                        <p><span className="text-[var(--c-text)]">1.4. Приложение</span> – программное обеспечение «Гороскоп», размещенное на Сервисе.</p>
                        <p><span className="text-[var(--c-text)]">1.5. Политика</span> – настоящая Политика конфиденциальности приложения «Гороскоп».</p>
                    </div>
                </section>

                {/* 2. Общие положения */}
                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-[var(--c-primary)]">
                        <Scale size="1.25rem" className="shrink-0" />
                        <h3 className={`${sectionTitleSize} font-black uppercase tracking-widest`}>2. Общие положения</h3>
                    </div>
                    <div className={`${bodyTextSize} leading-relaxed text-[var(--c-text-60)] font-medium space-y-2`}>
                        <p>2.1. Настоящая Политика является официальным документом Разработчика.</p>
                        <p>2.2. Целью является обеспечение защиты информации о Пользователях от несанкционированного доступа.</p>
                        <p>2.3. Пользователь, начиная использование Приложения, выражает согласие с настоящей Политикой.</p>
                        <p>2.4. Редакция доступна по ссылке: <button onClick={() => window.Telegram?.WebApp?.openLink('https://dev.max.ru/docs/legal/privacy')} className="text-[var(--c-primary)] underline">dev.max.ru/docs/legal/privacy</button>.</p>
                    </div>
                </section>

                {/* 3. Цели обработки */}
                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-[var(--c-primary)]">
                        <Lock size="1.25rem" className="shrink-0" />
                        <h3 className={`${sectionTitleSize} font-black uppercase tracking-widest`}>3. Цели обработки информации</h3>
                    </div>
                    <p className={`${bodyTextSize} leading-relaxed text-[var(--c-text-60)] font-medium`}>
                        3.1. Разработчик обрабатывает Информацию в целях исполнения соглашения по предоставлению функционала Приложения (персональные прогнозы).
                    </p>
                </section>

                {/* 4. Состав обрабатываемой информации */}
                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-[var(--c-primary)]">
                        <Database size="1.25rem" className="shrink-0" />
                        <h3 className={`${sectionTitleSize} font-black uppercase tracking-widest`}>4. Состав обрабатываемой информации</h3>
                    </div>
                    <div className={`${bodyTextSize} leading-relaxed text-[var(--c-text-60)] font-medium space-y-2`}>
                        <p>4.1. Разработчик может получать от платформы MAX следующие сведения о Пользователе:</p>
                        <ul className="list-disc list-inside space-y-1 pl-2">
                            <li>идентификатор пользователя;</li>
                            <li>имя и фамилию;</li>
                            <li>изображение профиля (аватар);</li>
                            <li>иные данные, передаваемые платформой MAX в рамках предоставленных Пользователем разрешений.</li>
                        </ul>
                        <p>4.2. Для предоставления функциональности Приложения Пользователь может самостоятельно указывать:</p>
                        <ul className="list-disc list-inside space-y-1 pl-2">
                            <li>дату рождения;</li>
                            <li>настройки отображения;</li>
                            <li>иные сведения, необходимые для формирования персонализированного контента.</li>
                        </ul>
                        <p>4.3. Для обеспечения работы Приложения могут обрабатываться технические данные устройства и сведения о настройках Приложения.</p>
                        <p>4.4. Для учёта приобретённой Подписки NOVA Premium могут обрабатываться сведения о факте оплаты, идентификаторе платежа, сроке действия Подписки и технический идентификатор устройства.</p>
                        <p>4.5. Разработчик не получает и не хранит данные банковских карт Пользователей.</p>
                        <p>4.6. При оплате Подписки NOVA Premium обработка платежа осуществляется платёжным сервисом ЮKassa либо иным указанным платёжным оператором. Разработчик может получать сведения о факте совершения платежа, идентификаторе платежа, его статусе и сумме платежа. Данные банковских карт Пользователей Разработчику не передаются.</p>
                    </div>
                </section>

                {/* 5. Обработка персональных данных */}
                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-[var(--c-primary)]">
                        <Shield size="1.25rem" className="shrink-0" />
                        <h3 className={`${sectionTitleSize} font-black uppercase tracking-widest`}>5. Обработка персональных данных</h3>
                    </div>
                    <div className={`${bodyTextSize} leading-relaxed text-[var(--c-text-60)] font-medium space-y-2`}>
                        <p>5.1. Обработка персональных данных осуществляется на основании:</p>
                        <ul className="list-disc list-inside space-y-1 pl-2">
                            <li>согласия Пользователя;</li>
                            <li>необходимости исполнения Пользовательского соглашения;</li>
                            <li>требований законодательства Российской Федерации.</li>
                        </ul>
                        <p>5.2. Передача данных третьим лицам не осуществляется, за исключением случаев, предусмотренных законом.</p>
                        <p>5.3. Технические настройки сохраняются локально в браузере (LocalStorage). Для повышения надёжности хранения данных Приложение также использует механизмы хранения платформы MAX (DeviceStorage, SecureStorage).</p>
                        <p>5.4. Персональные данные обрабатываются и хранятся до достижения целей обработки либо до получения от Пользователя требования об их удалении, если иной срок хранения не установлен законодательством Российской Федерации.</p>
                    </div>
                </section>

                {/* 6. Аналитические инструменты */}
                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-[var(--c-primary)]">
                        <BarChart3 size="1.25rem" className="shrink-0" />
                        <h3 className={`${sectionTitleSize} font-black uppercase tracking-widest`}>6. Аналитические инструменты</h3>
                    </div>
                    <div className={`${bodyTextSize} leading-relaxed text-[var(--c-text-60)] font-medium space-y-2`}>
                        <p>6.1. Для анализа использования Приложения Разработчик может использовать сервис Яндекс Метрика.</p>
                        <p>6.2. Сервис может обрабатывать обезличенные статистические и технические данные Пользователей в соответствии с собственной политикой конфиденциальности.</p>
                    </div>
                </section>

                {/* 7. Права Пользователей */}
                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-[var(--c-primary)]">
                        <Users size="1.25rem" className="shrink-0" />
                        <h3 className={`${sectionTitleSize} font-black uppercase tracking-widest`}>7. Права и обязанности</h3>
                    </div>
                    <div className={`${bodyTextSize} leading-relaxed text-[var(--c-text-60)] font-medium space-y-2`}>
                        <p>7.1. Пользователи вправе требовать уточнения, блокирования или уничтожения своих персональных данных.</p>
                        <p>7.2. В Приложении предусмотрена функция «Удалить аккаунт», доступная в настройках. Удаление аккаунта приводит к удалению пользовательских данных, хранящихся в Приложении и доступных Разработчику средствами платформы MAX. Удаление аккаунта может повлечь утрату доступа к данным о Подписке NOVA Premium и иным пользовательским данным, восстановление которых может оказаться невозможным.</p>
                    </div>
                </section>

                {/* 8. Обращения */}
                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-[var(--c-primary)]">
                        <Mail size="1.25rem" className="shrink-0" />
                        <h3 className={`${sectionTitleSize} font-black uppercase tracking-widest`}>8. Обращения Пользователей</h3>
                    </div>
                    <div className={`${bodyTextSize} leading-relaxed text-[var(--c-text-60)] font-medium space-y-2`}>
                        <p>8.1. Сведения об обрабатываемой Информации предоставляются при обращении.</p>
                        <p>8.2. Запросы направляются по адресу Разработчика или на e-mail: <span className="text-[var(--c-text)] font-bold">rabbithole.help@vk.com</span>.</p>
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

export default PrivacyPolicy;