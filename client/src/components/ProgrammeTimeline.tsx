/**
 * Coastal Civic Modernism: programme items form an accessible editorial timeline
 * where the active day connects the visitor to verified session metadata.
 */
import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { programmeData, type ProgrammeItem } from "@/data/conventionData";

const days = ["16 Sept", "17 Sept", "18 Sept", "19 Sept"] as const;

function Item({ item, open, onToggle }: { item: ProgrammeItem; open: boolean; onToggle: () => void }) {
  return <article className={`programme-item ${open ? "open" : ""}`}>
    <button type="button" onClick={onToggle} aria-expanded={open}>
      <time>{item.time}</time><span className="programme-type">{item.type}</span><span className="programme-title">{item.title}</span><ChevronDown size={19} />
    </button>
    <div className="programme-detail"><div>{item.speaker && <p><b>With</b> {item.speaker}</p>}{item.detail && <p>{item.detail}</p>}</div></div>
  </article>;
}

export function ProgrammeTimeline({ limit }: { limit?: number }) {
  const [activeDay, setActiveDay] = useState<(typeof days)[number]>("17 Sept");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = useMemo(() => programmeData.filter((item) => item.day === activeDay), [activeDay]);
  const displayItems = limit ? items.slice(0, limit) : items;
  return <div className="programme-wrap">
    <div className="programme-days" role="tablist" aria-label="Programme days">{days.map((day) => <button key={day} type="button" role="tab" aria-selected={activeDay === day} onClick={() => { setActiveDay(day); setOpenIndex(null); }}><span>{day.split(" ")[0]}</span>{day.split(" ")[1]}</button>)}</div>
    <div className="programme-list">{displayItems.map((item, index) => <Item key={`${item.day}-${item.time}-${item.title}`} item={item} open={openIndex === index} onToggle={() => setOpenIndex(openIndex === index ? null : index)} />)}</div>
  </div>;
}
