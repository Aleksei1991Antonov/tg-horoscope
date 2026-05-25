import React from 'react';
import { Shield, Lock, Database, Info, Scale, Mail, Users, BarChart3, CreditCard } from 'lucide-react';

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
                <button onClick={onBack} className="p-2 bg-[var(--c-surface)] rounded-xl text-[var(--c-primary)] active:scale-90 transition-transform">
                    <Shield size={20} />
                </button>
                <div>
                    <h2 className={`${headerTitleSize} font-black text-[var(--c-text)] uppercase italic`}>
                        Политика конфиденциальности
                    </h2>
                    <p className="text-[0.5rem] text-[var(--c-text-20)] uppercase font-bold tracking-widest">Типовая форма платформы MAX</p>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-10 no-scrollbar pb-20">

                {/* 1. Основные понятия */}
                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-[var(--c-primary)]">
                        <Info size={18} />
                        <h3 className={`${sectionTitleSize} font-black uppercase tracking-widest`}>1. Основные понятия</h3>
                    </div>
                    <div className={`${bodyTextSize} leading-relaxed text-[var(--c-text-60)] font-medium space-y-2`}>
                        <p><span className="text-[var(--c-text)]">1.1. Сервис</span> – сервис «MAX», доступный по адресу <button onClick={() => window.WebApp?.openLink('https://web.max.ru')} className="text-[var(--c-primary)] underline">web.max.ru</button>.</p>
                        <p><span className="text-[var(--c-text)]">1.2. Разработчик</span> – ИП Антонов Алексей Олегович (ОГРНИП 326760000001804), разместивший Приложение на Сервисе.</p>
                        <p><span className="text-[var(--c-text)]">1.3. Компания</span> – ООО «MAX» (ИНН: 9714058267, ОГРН: 1247700595230, г. Москва, Ленинградский пр-кт, д. 39, стр. 79).</p>
                        <p><span className="text-[var(--c-text)]">1.4. Приложение</span> – программное обеспечение «Гороскоп», размещенное на Сервисе.</p>
                        <p><span className="text-[var(--c-text)]">1.6. Политика</span> – настоящая Типовая политика конфиденциальности.</p>
                    </div>
                </section>

                {/* 2. Общие положения */}
                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-[var(--c-primary)]">
                        <Scale size={18} />
                        <h3 className={`${sectionTitleSize} font-black uppercase tracking-widest`}>2. Общие положения</h3>
                    </div>
                    <p className={`${bodyTextSize} leading-relaxed text-[var(--c-text-60)] font-medium`}>
                        2.1. Настоящая Политика является официальным документом Разработчика. 2.2. Целью является обеспечение защиты информации о Пользователях от несанкционированного доступа. 2.4. Редакция доступна по ссылке: <button onClick={() => window.WebApp?.openLink('https://dev.max.ru/docs/legal/privacy')} className="text-[var(--c-primary)] underline">dev.max.ru/docs/legal/privacy</button>.
                    </p>
                </section>

                {/* 3. Цели обработки */}
                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-[var(--c-primary)]">
                        <Lock size={18} />
                        <h3 className={`${sectionTitleSize} font-black uppercase tracking-widest`}>3. Цели обработки информации</h3>
                    </div>
                    <p className={`${bodyTextSize} leading-relaxed text-[var(--c-text-60)] font-medium`}>
                        3.1. Разработчик обрабатывает Информацию в целях исполнения соглашения по предоставлению функционала Приложения (персональные прогнозы).
                    </p>
                </section>

                {/* 4. Состав обрабатываемой информации */}
                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-[var(--c-primary)]">
                        <Database size={18} />
                        <h3 className={`${sectionTitleSize} font-black uppercase tracking-widest`}>4. Состав обрабатываемой информации</h3>
                    </div>
                    <div className={`${bodyTextSize} leading-relaxed text-[var(--c-text-60)] font-medium space-y-3`}>
                        <p>4.1. <span className="text-[var(--c-text)]">Данные профиля:</span> имя, фамилия, аватар, ID пользователя в Сервисе.</p>
                        <p>4.2. <span className="text-[var(--c-text)]">Дополнительно:</span> номер телефона (только при явном согласии).</p>
                        <p>4.3. <span className="text-[var(--c-text)]">Иная информация:</span> дата рождения для расчетов, а также обезличенные данные аналитики.</p>
                    </div>
                </section>

                {/* Дополнение: Аналитика и Платежи */}
                <section className="space-y-4 border-l-2 border-[var(--c-primary)]/30 pl-4 py-1">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-[var(--c-primary)]">
                            <BarChart3 size={18} />
                            <h3 className={`${sectionTitleSize} font-black uppercase tracking-widest`}>Аналитические инструменты</h3>
                        </div>
                        <p className={`${bodyTextSize} leading-relaxed text-[var(--c-text-60)] font-medium`}>
                            Для улучшения качества Сервиса Разработчик использует инструмент <span className="text-[var(--c-text)] font-bold">Яндекс Метрика</span>. Обработка данных через данный инструмент носит обезличенный характер и не позволяет идентифицировать личность Пользователя.
                        </p>
                    </div>

                    <div className="space-y-4 pt-4">
                        <div className="flex items-center gap-3 text-[var(--c-primary)]">
                            <CreditCard size={18} />
                            <h3 className={`${sectionTitleSize} font-black uppercase tracking-widest`}>Платежные операции</h3>
                        </div>
                        <p className={`${bodyTextSize} leading-relaxed text-[var(--c-text-60)] font-medium`}>
                            Все финансовые операции (добровольные пожертвования) осуществляются через защищенный шлюз <span className="text-[var(--c-text)] font-bold">ЮMoney</span>. Разработчик не получает доступа к платежным реквизитам и данным банковских карт Пользователя.
                        </p>
                    </div>
                </section>

                {/* 5. Обработка персональных данных */}
                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-[var(--c-primary)]">
                        <Shield size={18} />
                        <h3 className={`${sectionTitleSize} font-black uppercase tracking-widest`}>5. Обработка персональных данных</h3>
                    </div>
                    <div className={`${bodyTextSize} leading-relaxed text-[var(--c-text-60)] font-medium space-y-2`}>
                        <p>5.1.1. Сбор данных п. 4.1 осуществляется через конклюдентное действие при запуске Приложения.</p>
                        <p>5.1.2. Передача данных третьим лицам не осуществляется, за исключением случаев, предусмотренных законом.</p>
                        <p>5.1.3. Хранение Информации осуществляется до достижения цели обработки. Технические настройки сохраняются локально в браузере (LocalStorage).</p>
                    </div>
                </section>

                {/* 6. Права Пользователей */}
                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-[var(--c-primary)]">
                        <Users size={18} />
                        <h3 className={`${sectionTitleSize} font-black uppercase tracking-widest`}>6. Права и обязанности</h3>
                    </div>
                    <p className={`${bodyTextSize} leading-relaxed text-[var(--c-text-60)] font-medium`}>
                        6.1. Пользователи вправе требовать уточнения, блокирования или уничтожения своих персональных данных.
                    </p>
                </section>

                {/* 8. Обращения */}
                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-[var(--c-primary)]">
                        <Mail size={18} />
                        <h3 className={`${sectionTitleSize} font-black uppercase tracking-widest`}>8. Обращения Пользователей</h3>
                    </div>
                    <div className={`${bodyTextSize} leading-relaxed text-[var(--c-text-60)] font-medium space-y-2`}>
                        <p>8.1. Сведения об обрабатываемой Информации предоставляются при обращении.</p>
                        <p>8.2. Запросы направляются по адресу Разработчика или на e-mail: <span className="text-[var(--c-text)] font-bold">rabbithole.help@vk.com</span>.</p>
                    </div>
                </section>

                <div className={`pt-10 border-t border-[var(--c-border)] text-center ${footerTextSize} space-y-1 text-[var(--c-text-30)]`}>
                    <p className="font-bold uppercase tracking-widest text-[var(--c-text-50)] italic">Редакция от 22.05.26</p>
                    <p className="pt-2">ИП Антонов Алексей Олегович</p>
                    <p>ИНН 760407796785</p>
                    <p>ОГРНИП 326760000001804</p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;