import { Plus, Check } from 'lucide-react';
import { clsx } from 'clsx';
import { useFinance } from '../../hooks/useFinance';

export function MemberSelector() {
    const { members, filters, setSelectedMemberId } = useFinance();
    const { selectedMemberId } = filters;

    const handleMemberClick = (memberId: string) => {
        if (selectedMemberId === memberId) {
            setSelectedMemberId(null); // Deselect
        } else {
            setSelectedMemberId(memberId);
        }
    };

    return (
        <div className="flex items-center -space-x-3">
            {members.map((member) => {
                const isSelected = selectedMemberId === member.id;

                return (
                    <button
                        key={member.id}
                        onClick={() => handleMemberClick(member.id)}
                        className={clsx(
                            "relative w-10 h-10 rounded-full bg-neutral-200 border-2 transition-all duration-300 hover:scale-110 hover:z-10 focus:outline-none",
                            isSelected
                                ? "border-secondary-900 z-20 scale-105"
                                : "border-white"
                        )}
                    >
                        <img
                            src={member.avatar || "https://github.com/shadcn.png"}
                            alt={member.name}
                            className="w-full h-full rounded-full object-cover"
                        />

                        {isSelected && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-lime-500 rounded-full border-2 border-white flex items-center justify-center animate-in zoom-in spin-in-180">
                                <Check size={8} className="text-secondary-900 stroke-[3]" />
                            </div>
                        )}
                    </button>
                );
            })}

            <button className="w-10 h-10 rounded-full bg-secondary-50 border-2 border-white flex items-center justify-center hover:bg-neutral-200 transition-colors z-0">
                <Plus size={16} className="text-secondary-900" />
            </button>
        </div>
    );
}
