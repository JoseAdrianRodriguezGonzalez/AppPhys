function initHeaderMenu() {
    // Botón hamburguesa (menú móvil)
    const toggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');
    if (toggle && menu) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('hidden');
        });
    }
    // Submenús (Members, Products, Others...)
    const toggles = document.querySelectorAll(".toggle-submenu");
    toggles.forEach(t => {
        t.addEventListener("click", (e) => {
            e.stopPropagation();
            const targetId = t.getAttribute("data-target");
            const submenu = document.getElementById(targetId);
            // Cerrar los demás submenús
            document.querySelectorAll(".submenu").forEach(m => {
                if (m !== submenu) m.classList.add("hidden");
            });
            // Alternar el submenú clicado
            submenu.classList.toggle("hidden");
        });
    });
    // Cerrar todo al hacer clic fuera
    document.addEventListener("click", (e) => {
        if (!e.target.closest("nav")) {
            document.querySelectorAll(".submenu").forEach(m => m.classList.add("hidden"));
            menu?.classList.add("hidden");
        }
    });
}

initHeaderMenu();
