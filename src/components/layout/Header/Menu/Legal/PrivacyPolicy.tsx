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
                        Настоящая Политика конфиденциальности регулирует порядок обработки и защиты персональных данных Пользователей мобильного приложения «Гороскоп» (далее — Приложение).
                        Оператором персональных данных является ИП Антонов Алексей Олегович (ОГРНИП 326760000001804).
                    </p>
                </section>

                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-fuchsia-400">
                        <Users size={18} />
                        <h3 className="text-xs font-black uppercase tracking-widest">2. Персональные данные, которые мы получаем</h3>
                    </div>
                    <p className="text-[11px] leading-relaxed text-white/60 font-medium">
                        При запуске Приложения через мессенджер MAX мы получаем ваше имя пользователя (username) через библиотеку <span className="text-white">MAX bridge</span>.
                        Эти данные используются исключительно для персонализации интерфейса (приветствие, отображение имени) и не передаются на наши серверы.
                    </p>
                    <p className="text-[11px] leading-relaxed text-white/60 font-medium">
                        Дополнительно Приложение может запрашивать дату рождения для расчёта гороскопа. Эти данные обрабатываются <span className="text-white">локально</span> на вашем устройстве и никогда не отправляются разработчику.
                    </p>
                </section>

                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-fuchsia-400">
                        <Lock size={18} />
                        <h3 className="text-xs font-black uppercase tracking-widest">3. Принцип Zero-Storage</h3>
                    </div>
                    <p className="text-[11px] leading-relaxed text-white/60 font-medium">
                        Мы не храним ваши персональные данные на своих серверах. Все расчёты гороскопов, биоритмов и персонализированный контент выполняются локально на устройстве Пользователя.
                    </p>
                </section>

                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-fuchsia-400">
                        <BarChart3 size={18} />
                        <h3 className="text-xs font-black uppercase tracking-widest">4. Анонимная аналитика</h3>
                    </div>
                    <p className="text-[11px] leading-relaxed text-white/60 font-medium">
                        Для улучшения качества Приложения мы используем <span className="text-white">Яндекс Метрику</span>.
                        Сервис собирает только анонимные статистические данные: технические характеристики устройства, версию приложения, частоту использования функций.
                        Эти данные не позволяют идентифицировать личность Пользователя.
                    </p>
                </section>

                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-fuchsia-400">
                        <CreditCard size={18} />
                        <h3 className="text-xs font-black uppercase tracking-widest">5. Платежи и донаты</h3>
                    </div>
                    <p className="text-[11px] leading-relaxed text-white/60 font-medium">
                        Добровольные пожертвования обрабатываются платёжной системой <span className="text-white">ЮMoney</span>.
                        Мы не получаем, не обрабатываем и не храним данные ваших банковских карт, кошельков или иную платёжную информацию.
                    </p>
                </section>

                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-fuchsia-400">
                        <Database size={18} />
                        <h3 className="text-xs font-black uppercase tracking-widest">6. Локальное хранение данных</h3>
                    </div>
                    <p className="text-[11px] leading-relaxed text-white/60 font-medium">
                        Некоторые технические данные (например, факт принятия Пользовательского соглашения и Политики конфиденциальности) могут сохраняться в LocalStorage мессенджера.
                        Вы в любой момент можете удалить эти данные, очистив кэш приложения.
                    </p>
                </section>

                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-fuchsia-400">
                        <Shield size={18} />
                        <h3 className="text-xs font-black uppercase tracking-widest">7. Удаление аккаунта и данных</h3>
                    </div>
                    <p className="text-[11px] leading-relaxed text-white/60 font-medium">
                        Если вы хотите удалить свой аккаунт и данные, просто удалите бота из списка контактов и перестаньте им пользоваться.
                        Мы не храним вашу информацию на своих серверах и не имеем к ней доступа, поэтому прекращение использования сервиса является окончательным действием по удалению данных.
                    </p>
                </section>


                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-fuchsia-400">
                        <Shield size={18} />
                        <h3 className="text-xs font-black uppercase tracking-widest">8. Изменение Политики</h3>
                    </div>
                    <p className="text-[11px] leading-relaxed text-white/60 font-medium">
                        Мы можем обновлять настоящую Политику по мере необходимости. Актуальная версия всегда доступна в Приложении.
                        Продолжение использования Приложения после публикации новой редакции означает ваше согласие с обновлёнными условиями.
                    </p>
                </section>

                <div className="pt-10 border-t border-white/5 text-center text-[10px] space-y-1 text-white/30">
                    <p className="font-bold">ИП Антонов Алексей Олегович</p>
                    <p>ОГРНИП 326760000001804</p>
                    <p>Дата вступления в силу: 09.05.2026</p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;