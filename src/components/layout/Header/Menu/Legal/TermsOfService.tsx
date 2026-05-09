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
                        Настоящее Пользовательское соглашение (далее — Соглашение) является публичной офертой в соответствии со ст. 437 ГК РФ и регулирует отношения между ИП Антонов Алексей Олегович (ОГРНИП 326760000001804) (далее — Правообладатель) и любым физическим лицом (далее — Пользователь), использующим мобильное приложение «Гороскоп» (далее — Приложение).
                    </p>
                </section>

                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-fuchsia-400">
                        <Zap size={18} />
                        <h3 className="text-xs font-black uppercase tracking-widest">2. Статус сервиса</h3>
                    </div>
                    <p className="text-[11px] leading-relaxed text-white/60 font-medium">
                        Приложение предоставляет исключительно развлекательный контент. Все гороскопы, прогнозы, расчёты биоритмов и рекомендации генерируются на основе математических алгоритмов и астрологических традиций. Они не являются научными, медицинскими, психологическими, финансовыми или юридическими советами. Пользователь использует информацию исключительно на свой страх и риск.
                    </p>
                </section>

                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-fuchsia-400">
                        <AlertTriangle size={18} />
                        <h3 className="text-xs font-black uppercase tracking-widest">3. Ограничение ответственности</h3>
                    </div>
                    <p className="text-[11px] leading-relaxed text-white/60 font-medium">
                        Правообладатель не несёт ответственности за любые убытки, прямые или косвенные, которые могут возникнуть в результате использования или невозможности использования Приложения, а также за любые решения или действия Пользователя, совершённые на основе информации из Приложения. Астрология не является точной наукой.
                    </p>
                </section>

                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-fuchsia-400">
                        <Coffee size={18} />
                        <h3 className="text-xs font-black uppercase tracking-widest">4. Добровольные пожертвования</h3>
                    </div>
                    <p className="text-[11px] leading-relaxed text-white/60 font-medium">
                        Любые переводы через систему ЮMoney являются добровольными пожертвованиями (донатами) на развитие проекта. Денежные средства не являются оплатой за товары или услуги, не подлежат возврату и не предоставляют каких-либо дополнительных прав или гарантий.
                    </p>
                </section>

                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-fuchsia-400">
                        <Scale size={18} />
                        <h3 className="text-xs font-black uppercase tracking-widest">5. Интеллектуальная собственность</h3>
                    </div>
                    <p className="text-[11px] leading-relaxed text-white/60 font-medium">
                        Все права на Приложение, его дизайн, исходный код, алгоритмы, текстовые и графические материалы принадлежат Правообладателю. Копирование, модификация, декомпиляция, распространение Приложения или его частей без письменного разрешения запрещены.
                    </p>
                </section>

                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-fuchsia-400">
                        <FileText size={18} />
                        <h3 className="text-xs font-black uppercase tracking-widest">6. Персональные данные</h3>
                    </div>
                    <p className="text-[11px] leading-relaxed text-white/60 font-medium">
                        Обработка персональных данных Пользователя осуществляется в соответствии с Политикой конфиденциальности, размещённой в Приложении. Используя Приложение, Пользователь даёт согласие на обработку своих персональных данных в объёме и на условиях, указанных в Политике.
                    </p>
                </section>

                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-fuchsia-400">
                        <FileText size={18} />
                        <h3 className="text-xs font-black uppercase tracking-widest">7. Условия использования</h3>
                    </div>
                    <p className="text-[11px] leading-relaxed text-white/60 font-medium">
                        Использование Приложения возможно только для лиц старше 18 лет. Если вам менее 18 лет, вы можете использовать Приложение исключительно с согласия и под контролем родителей или законных представителей. Нажимая кнопку «Начать путь», вы подтверждаете своё полное согласие с условиями настоящего Соглашения.
                    </p>
                </section>

                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-fuchsia-400">
                        <AlertTriangle size={18} />
                        <h3 className="text-xs font-black uppercase tracking-widest">8. Изменение условий</h3>
                    </div>
                    <p className="text-[11px] leading-relaxed text-white/60 font-medium">
                        Правообладатель вправе в любое время изменять условия настоящего Соглашения. Новая редакция вступает в силу с момента её размещения в Приложении. Продолжение использования Приложения после изменения условий означает согласие с новой редакцией.
                    </p>
                </section>

                <div className="pt-10 border-t border-white/5 text-center text-[10px] text-white/30 space-y-2">
                    <p className="font-bold text-white/50">ИП Антонов Алексей Олегович</p>
                    <p>ОГРНИП 326760000001804</p>
                    <p className="max-w-[240px] mx-auto">Соглашение действует на территории РФ и регулируется законодательством РФ.</p>
                    <p className="text-fuchsia-500/50 pt-2">Дата актуальной редакции: 09.05.2026</p>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;