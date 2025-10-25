// generico.js
console.log("Generico script cargado");

async function loadReferences() {
    const section = document.getElementById('collections');
    try {
        const res = await fetch(section.dataset.json);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const container = document.getElementById('references-container');
        container.innerHTML = ""; // limpiar contenido previo
        renderGeneric(data, container);
    } catch(err) {
        console.error("Error cargando el JSON:", err);
    }
}

/**
 * Función genérica para renderizar cualquier tipo de referencia
 * @param {Array} data - Array de objetos de referencia
 * @param {HTMLElement} container - Elemento donde se renderiza
 */
function renderGeneric(data, container) {
    // Agrupar por año si existe
    const years = [...new Set(data.map(item => item.year || "Otros"))].sort((a, b) => b - a);

    years.forEach(year => {
        const title = document.createElement('h2');
        title.innerText = year;
        title.classList.add("text-2xl", "block", "border-b-2", "border-blue-700", "my-4");

        const subContainer = document.createElement('div');
        subContainer.id = `cont-${year}`;
        container.appendChild(title);
        container.appendChild(subContainer);

        const filtered = data.filter(d => (d.year || "Otros") === year);

        filtered.forEach(ref => {
            const article = document.createElement("div");
            article.classList.add("border-l-4","border-indigo-400","bg-[#F0FAFF]",
                "m-2","p-4","rounded-lg","shadow-md","text-black");

            // ====== TÍTULO ======
            const header = document.createElement("h3");
            header.innerHTML = `[${ref.id || ""}] ${ref.title || "Sin título"}`;
            header.classList.add("text-[#023368]","text-xl","font-semibold","mb-2");

            // ====== AUTORES / INVENTORES ======
            const authors = document.createElement("p");
            if(ref.authors) {
                authors.innerHTML = Array.isArray(ref.authors) ? ref.authors.join(", ") : ref.authors;
            } else if(ref.inventors) {
                authors.innerHTML = Array.isArray(ref.inventors) ? ref.inventors.join(", ") : ref.inventors;
            }
            authors.classList.add("text-[#444]","mb-2");

            // ====== DETALLES ======
            const details = document.createElement("p");
            let info = [];

            // --- Artículos JCR ---
            if (ref.journal) info.push(`Journal: ${ref.journal}`);
            if (ref.volume) info.push(`Vol: ${ref.volume}`);
            if (ref.issue) info.push(`Issue: ${ref.issue}`);
            if (ref.pages) info.push(`Pages: ${ref.pages}`);
            if (ref.issn_print) info.push(`ISSN (Print): ${ref.issn_print}`);
            if (ref.issn_online) info.push(`ISSN (Online): ${ref.issn_online}`);
            if (ref.doi || ref.DOI) info.push(`DOI: ${ref.doi || ref.DOI}`);

            // --- Patentes ---
            if (ref.patent_numbers) info.push(`Patent Numbers: ${ref.patent_numbers.join(", ")}`);
            if (ref.assignee) info.push(`Assignee: ${ref.assignee}`);

            // --- Congresos ---
            if (ref.conference) info.push(`Conference: ${ref.conference}`);

            // --- Libros / Capítulos ---
            if (ref.book) info.push(`Book: ${ref.book}`);
            if (ref.editors) info.push(`Editors: ${Array.isArray(ref.editors) ? ref.editors.join(", ") : ref.editors}`);
            if (ref.publisher) info.push(`Publisher: ${ref.publisher}`);
            if (ref.ISBN) info.push(`ISBN: ${Array.isArray(ref.ISBN) ? ref.ISBN.join(", ") : ref.ISBN}`);
            if (ref.ISSN) info.push(`ISSN: ${Array.isArray(ref.ISSN) ? ref.ISSN.join(", ") : ref.ISSN}`);

            details.innerText = info.join(" • ");
            details.classList.add("text-[#333]","mb-2");

            // ====== ENLACE ======
            if(ref.link){
                const link = document.createElement("a");
                link.href = ref.link;
                link.innerText = "Ver PDF";
                link.target = "_blank";
                link.classList.add("text-miguel-blue","underline","hover:text-miguel-gold");
                article.appendChild(link);
            }

            // ====== Ensamblar ======
            article.prepend(header);
            article.appendChild(authors);
            article.appendChild(details);

            subContainer.appendChild(article);
        });
    });
}


// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadReferences);
}
window.addEventListener('JCRLoaded', loadReferences);
