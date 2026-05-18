import React from 'react';
import { ChevronLeft, FileText, AlertTriangle, Scale, Zap, Coffee } from 'lucide-react';

interface TermsOfServiceProps {
    onBack: () => void;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ onBack }) => {
    return (
        <div className="fixed inset-0 z-[4000] bg-[#050510] flex flex-col animate-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center gap-4 bg-[#08081a]/80 backdrop-blur-xl sticky top-0 z-10">
                <button onClick={onBack} className="p-2 bg-white/5 rounded-xl text-fuchsia-500 active:scale-90 transition-transform">
                    <ChevronLeft size={20} />
                </button>
                <div>
                    <h2 className="text-lg font-black text-white uppercase tracking-tighter italic">Пользовательское Соглашение</h2>
                    <p className="text-[8px] text-white/20 uppercase font-bold tracking-widest">Публичная оферта</p>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar pb-20">
                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-fuchsia-400">
                        <Zap size={18} />
                        <h3 className="text-xs font-black uppercase tracking-widest">1. Общие положения</h3>
                    </div>
                    <p className="text-[11px] leading-relaxed text-white/60 font-medium">
                        Настоящее Пользовательское соглашение (далее — Соглашение) является публичной офертой в соответствии со ст. 437 ГК РФ и регулирует отношения между <span className="text-white">ИП Антонов Алексей Олегович</span> (далее — Правообладатель) и Пользователем Приложения в экосистеме MAX.
                    </p>
                </section>

                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-fuchsia-400">
                        <Zap size={18} />
                        <h3 className="text-xs font-black uppercase tracking-widest">2. Статус сервиса</h3>
                    </div>
                    <p className="text-[11px] leading-relaxed text-white/60 font-medium">
                        Приложение предоставляет исключительно <span className="text-white">развлекательный контент</span>. Все гороскопы, прогнозы и расчёты не являются научными или медицинскими данными. Пользователь осознает, что астрология не является точной наукой, и использует информацию Приложения по своему усмотрению.
                    </p>
                </section>

                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-fuchsia-400">
                        <AlertTriangle size={18} />
                        <h3 className="text-xs font-black uppercase tracking-widest">3. Ограничение ответственности</h3>
                    </div>
                    <p className="text-[11px] leading-relaxed text-white/60 font-medium">
                        Правообладатель не несёт ответственности за действия Пользователя, совершенные на основе информации из Приложения. Мы не гарантируем точность прогнозов и не отвечаем за любые последствия (материальные или моральные), возникшие в ходе использования сервиса.
                    </p>
                </section>

                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-fuchsia-400">
                        <Coffee size={18} />
                        <h3 className="text-xs font-black uppercase tracking-widest">4. Добровольные пожертвования</h3>
                    </div>
                    <p className="text-[11px] leading-relaxed text-white/60 font-medium">
                        Любые платежи через систему ЮMoney являются <span className="text-white">добровольными пожертвованиями</span> на развитие и поддержку проекта. Они не являются оплатой за конкретные услуги, не подлежат возврату и не накладывают на Правообладателя дополнительных обязательств.
                    </p>
                </section>

                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-fuchsia-400">
                        <Scale size={18} />
                        <h3 className="text-xs font-black uppercase tracking-widest">5. Интеллектуальная собственность</h3>
                    </div>
                    <p className="text-[11px] leading-relaxed text-white/60 font-medium">
                        Дизайн, программный код и алгоритмы Приложения являются интеллектуальной собственностью ИП Антонова А.О. Любое копирование или использование элементов интерфейса вне мессенджера MAX без согласия автора запрещено.
                    </p>
                </section>

                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-fuchsia-400">
                        <FileText size={18} />
                        <h3 className="text-xs font-black uppercase tracking-widest">6. Использование MAX bridge</h3>
                    </div>
                    <p className="text-[11px] leading-relaxed text-white/60 font-medium">
                        Приложение взаимодействует с платформой через библиотеку <span className="text-white">MAX bridge</span>. Правообладатель не несет ответственности за технические сбои на стороне мессенджера MAX или за некорректную работу API платформы.
                    </p>
                </section>

                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-fuchsia-400">
                        <FileText size={18} />
                        <h3 className="text-xs font-black uppercase tracking-widest">7. Возрастные ограничения</h3>
                    </div>
                    <p className="text-[11px] leading-relaxed text-white/60 font-medium">
                        Приложение предназначено для лиц старше 18 лет. Лица младше указанного возраста могут использовать сервис только под присмотром законных представителей.
                    </p>
                </section>

                <div className="pt-10 border-t border-white/5 text-center text-[10px] text-white/30 space-y-1">
                    <p className="font-bold text-white/50 uppercase tracking-widest mb-1">ИП Антонов Алексей Олегович</p>
                    <p>ИНН: 760407796785</p>
                    <p>ОГРНИП: 326760000001804</p>
                    <p className="max-w-[240px] mx-auto uppercase pt-2 opacity-50">Регулируется законодательством РФ</p>
                    <p className="text-fuchsia-500/50 pt-2">Дата редакции: 10.05.2026</p>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
