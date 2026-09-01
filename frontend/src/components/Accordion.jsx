import { useState } from "react";

export default function Accordion({ items }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="accordion">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`accordion__item ${isOpen ? "is-open" : ""}`}>
            <h3>
              <button
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="accordion__trigger"
              >
                <span>{it.question}</span>
                <span className="accordion__sign" aria-hidden="true">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div className="accordion__panel" hidden={!isOpen}>
              <p>{it.answer}</p>
              {it.category_label && (
                <span className="accordion__tag">{it.category_label}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
