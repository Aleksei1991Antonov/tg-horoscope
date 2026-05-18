import React from 'react';
import { ChevronLeft, Shield, Lock, Database, BarChart3, CreditCard, Users } from 'lucide-react';

interface PrivacyPolicyProps {
    onBack: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
    return (
        <div className="fixed inset-0 z-[4000] bg-[#050510] flex flex-col animate-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center gap-4 bg-[#08081a]/80 backdrop-blur-xl sticky top-0 z-10">
                <button onClick={onBack} className="p-2 bg-white/5 rounded-xl text-fuchsia-500 active:scale-90 transition-transform">
                    <ChevronLeft size={20} />
                </button>
                <div>
                    <h2 className="text-lg font-black text-white uppercase tracking-tighter italic">Политика конфиденциальности</h2>
                    <p className="text-[8px] text-white/20 uppercase font-bold tracking-widest">Публичная оферта</p>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar pb-20">
                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-fuchsia-400">
                        <Shield size={18} />
                        <h3 className="text-xs font-black uppercase tracking-widest">1. Общие положения</h3>
                    </div>
                    <p className="text-[11px] leading-relaxed text-white/60 font-medium">
                        Настоящая Политика конфиденциальности регулирует порядок обработки и защиты персональных данных Пользователей мобильного приложения «Гороскоп» (далее — Приложение), функционирующего внутри экосистемы MAX.
                        Оператором персональных данных является <span className="text-white">ИП Антонов Алексей Олегович</span> (ОГРНИП 326760000001804).
                    </p>
                </section>

                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-fuchsia-400">
                        <Users size={18} />
                        <h3 className="text-xs font-black uppercase tracking-widest">2. Персональные данные и MAX bridge</h3>
                    </div>
                    <p className="text-[11px] leading-relaxed text-white/60 font-medium">
                        При запуске Приложения через мессенджер MAX мы получаем доступ к данным через официальный интерфейс <span className="text-white">MAX bridge (window.WebApp)</span>.
                        К обрабатываемым данным относятся:
                    </p>
                    <ul className="text-[11px] leading-relaxed text-white/40 font-medium list-disc pl-5 space-y-1">
                        <li>Имя и фамилия (first_name, last_name);</li>
                        <li>Имя пользователя (username);</li>
                        <li>Языковой код (language_code);</li>
                        <li>Тип платформы устройства (ios, android, desktop, web).</li>
                    </ul>
                    <p className="text-[11px] leading-relaxed text-white/60 font-medium">
                        Эти данные используются исключительно для персонализации интерфейса и корректного технического отображения Приложения на вашем устройстве.
                    </p>
                </section>

                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-fuchsia-400">
                        <Lock size={18} />
                        <h3 className="text-xs font-black uppercase tracking-widest">3. Принцип Zero-Storage</h3>
                    </div>
                    <p className="text-[11px] leading-relaxed text-white/60 font-medium">
                        Мы придерживаемся политики <span className="text-white">Zero-Storage</span>: ваши персональные данные, полученные через MAX bridge, а также вводимые данные о дате рождения для расчёта гороскопов, обрабатываются локально. Мы не храним и не архивируем их на своих серверах.
                    </p>
                </section>

                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-fuchsia-400">
                        <BarChart3 size={18} />
                        <h3 className="text-xs font-black uppercase tracking-widest">4. Анонимная аналитика</h3>
                    </div>
                    <p className="text-[11px] leading-relaxed text-white/60 font-medium">
                        Для улучшения работы сервиса используется <span className="text-white">Яндекс Метрика</span>. Она собирает только обезличенную информацию о взаимодействии с интерфейсом, которая не позволяет идентифицировать конкретного Пользователя.
                    </p>
                </section>

                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-fuchsia-400">
                        <CreditCard size={18} />
                        <h3 className="text-xs font-black uppercase tracking-widest">5. Платежи</h3>
                    </div>
                    <p className="text-[11px] leading-relaxed text-white/60 font-medium">
                        Все финансовые операции по поддержке проекта (донаты) осуществляются через внешний защищенный шлюз <span className="text-white">ЮMoney</span>. Приложение не получает доступ к данным ваших платежных средств.
                    </p>
                </section>

                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-fuchsia-400">
                        <Database size={18} />
                        <h3 className="text-xs font-black uppercase tracking-widest">6. Хранение настроек</h3>
                    </div>
                    <p className="text-[11px] leading-relaxed text-white/60 font-medium">
                        Техническая информация (например, выбранный знак зодиака) сохраняется в <span className="text-white">LocalStorage</span> вашего устройства, чтобы обеспечить сохранение состояния Приложения при повторном входе.
                    </p>
                </section>

                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-fuchsia-400">
                        <Shield size={18} />
                        <h3 className="text-xs font-black uppercase tracking-widest">7. Удаление данных</h3>
                    </div>
                    <p className="text-[11px] leading-relaxed text-white/60 font-medium">
                        Поскольку данные не хранятся на сервере Оператора, для их удаления достаточно прекратить использование Приложения и очистить кэш мессенджера MAX на вашем устройстве.
                    </p>
                </section>

                <div className="pt-10 border-t border-white/5 text-center text-[10px] space-y-1 text-white/30">
                    <p className="font-bold uppercase tracking-widest">Реквизиты оператора:</p>
                    <p>ИП Антонов Алексей Олегович</p>
                    <p>ОГРНИП 326760000001804</p>
                    <p>ИНН 760407796785</p>
                    <p className="pt-2">Дата вступления в силу: 10.05.2026</p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
