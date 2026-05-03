import { Bell, Shield, Info } from 'lucide-react';

export default function SystemScreen() {
    const menuItems = [
        { icon: Bell, label: 'Уведомления', value: 'On' },
        { icon: Shield, label: 'Приватность', value: '' },
        { icon: Info, label: 'Версия ядра', value: '3.0.1-flash' },
    ];

    return (
        <div className="h-full flex flex-col p-6">
            <h2 className="text-3xl font-black italic tracking-tighter mb-8 mt-4">SYSTEM</h2>

            <div className="space-y-2">
                {menuItems.map((item, i) => (
                    <button key={i} className="w-full p-5 rounded-[24px] bg-white/5 border border-white/5 flex items-center justify-between active:scale-[0.98] transition-all">
                        <div className="flex items-center gap-4">
                            <item.icon size={20} className="opacity-40" />
                            <span className="text-[11px] uppercase font-bold tracking-widest">{item.label}</span>
                        </div>
                        <span className="text-[10px] opacity-30 font-bold uppercase">{item.value}</span>
                    </button>
                ))}
            </div>

            <div className="mt-auto mb-4 p-6 rounded-[32px] bg-gradient-to-br from-white/10 to-transparent border border-white/10">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-50">Статус подписки</div>
                <div className="text-lg font-bold">Neural Pro</div>
                <button className="mt-4 w-full py-3 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest">
                    Управление
                </button>
            </div>
        </div>
    );
}