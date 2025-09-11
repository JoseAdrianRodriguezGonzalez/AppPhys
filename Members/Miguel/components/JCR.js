
// JCR.js - Versión modificada
console.log("JCR script cargado");
async function loadReferences() {
    const section = document.getElementById('collections');   
    try {
        const res = await fetch(section.dataset.json);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        renderReferences(data);
    } catch(err) {
        console.error("Error cargando el JSON:", err);
    }
}
class Reference{
    constructor({ id,title,authors ,journal,volume,issue,pages,year,issn_print,issn_online,doi,link}){
        this.id=id || 0;
        this.title=title || "Sin titulo";
        this.authors=authors || [];
        this.journal=journal || "";
        this.volume=volume|| "";
        this.issue= issue ||"";
        this.pages=pages ||"";
        this.issn_print=issn_print||"";
        this.issn_online=issn_online ||"";
        this.link=link||"";
        this.year=year|| 0;
        this.doi = doi || "";
    }
}
const renderReferences = (data) => {
    //console.log("Datos recibidos:",data);
    const years=[...new Set(data.map(item=>item.year))];
    for(const year of years){
        renderTitles(year);
        renderData(data,year);
    }
}
const renderData=(data,year)=>{
    data.forEach(e => {
            const sub=document.getElementById(`cont-${year}`);
            if(e.year==year){
                const article = document.createElement("div");
                article.classList.add("border-l-4","border-indigo-400","bg-[#F0FAFF]",
                    "m-2","p-4","rounded-lg","shadow-md"
                );

                const header = document.createElement("h3");
                header.innerHTML = `[${e.id || ""}] ${e.title || ""}`;
                header.classList.add('text-[#023368]',"text-xl");

                const authors = document.createElement('p');
                authors.innerHTML = Array.isArray(e.authors) ? e.authors.join(", ") : "";
                authors.classList.add("text-[#444]","m-2");

                const details = document.createElement('p');
                details.innerHTML = `${e.journal || ''}, ${e.issue || ''} ${e.volume || ''} ${year || ''} ${e.pages || ''} ${e.issn_print || ''} ${e.issn_online || ''}`;

                const doi = document.createElement('p');
                doi.innerHTML = e.doi || "";

                const pub = document.createElement('a');
                pub.innerHTML = `ver PDF`;
                pub.href = e.link || "#";
                pub.target = "_blank";

                sub.appendChild(article);
                article.appendChild(header);
                article.appendChild(authors);
                article.appendChild(details);
                article.appendChild(doi);
                article.appendChild(pub);
            }
        });
}
const renderTitles=(year)=>{
    const container = document.getElementById('references-container');
    const title=document.createElement('h2');
    title.innerHTML=year;
    title.classList.add("text-2xl","block","border-b-2","border-blue-700");
    //title.className()
    const subcontainer=document.createElement('div');
    subcontainer.id=`cont-${year}`;
    container.appendChild(title);
    container.appendChild(subcontainer);

}
// Ejecutar cuando el DOM esté listo O cuando se cargue el script después del DOMContentLoaded
if (document.readyState === 'loading') {
    // El DOM aún no se ha cargado completamente, esperar al evento
    document.addEventListener('DOMContentLoaded', loadReferences);
}
window.addEventListener('JCRLoaded', loadReferences);
const renderArticle =(container,json)=>{
    const article=document.createElement('article');
    console.log(json.doi);
}