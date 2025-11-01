 const { createApp, ref, computed } = Vue;
        
        createApp({
            setup() {
                const activeMenu = ref('inicio');
                const contentOpacity = ref(1);
                const isMenuVisible = ref(true);
                const isMenuOpen = ref(false);
                const expandedFaqItem = ref(null);
                const openSubmenus = ref([]); // Para controlar qué submenús están abiertos
                
                const menuItems = [
                    { id: 'inicio', name: 'Inicio' },
                    { id: 'stem', name: 'Objetivos'},
                    { id: 'recursos', name: '¿Cómo usar el recurso?' },
                    { 
                        id: 'capitulo1', 
                        name: 'Capítulo 1 Ciencias (S): Numeración I',
                        submenu: [
                            { id: 'tarea1', name: 'Tarea 1: Análisis de casos' },
                            { id: 'tarea2', name: 'Tarea 2: Investigación sobre diversidad' },
                            { id: 'tarea3', name: 'Tarea 3: Creación de material educativo' }
                        ]
                    },
                    {   id: 'seccion2', 
                        name: 'Capítulo 2 Tecnología (T): Numeración II',
                        submenu: [
                            { id: 'tarea2_1', name: 'Tarea 1: Análisis de casos' },
                            { id: 'tarea2_2', name: 'Tarea 2: Investigación sobre diversidad' },
                            { id: 'tarea2_3', name: 'Tarea 3: Creación de material educativo' }
                        ]
                    },
                    {   id: 'seccion3', 
                        name: 'Capítulo 3 Ingeniería (E): Adición',
                        submenu: [
                            { id: 'tarea3_1', name: 'Tarea 1: Análisis de casos' },
                            { id: 'tarea3_2', name: 'Tarea 2: Investigación sobre diversidad' },
                            { id: 'tarea3_3', name: 'Tarea 3: Creación de material educativo' }
                        ]
                    },
                    {   id: 'seccion4', 
                        name: 'Capítulo 4 Matemáticas (M): Números Primos y Compuestos',
                        submenu: [
                            { id: 'tarea4_1', name: 'Tarea 1: Análisis de casos' },
                            { id: 'tarea4_2', name: 'Tarea 2: Investigación sobre diversidad' },
                            { id: 'tarea4_3', name: 'Tarea 3: Creación de material educativo' }
                        ]
                    },
                    {   id: 'seccion5', 
                        name: 'Capítulo 5   Sociales (M): Máximo Común Divisor',
                        submenu: [
                            { id: 'tarea5_1', name: 'Tarea 1: Análisis de casos' },
                            { id: 'tarea5_2', name: 'Tarea 2: Investigación sobre diversidad' },
                            { id: 'tarea5_3', name: 'Tarea 3: Creación de material educativo' }
                        ]
                    }
                ];
                
                const faqs = [
                    {
                        id: 1,
                        title: '1. Diversos tipos de identidad sexual',
                        content: 'Identificar los diversos tipos de identidad sexual, partiendo de una comprensión amplia de la diversidad, por ejemplo, desde la naturaleza, con el fin de reconocer y respetar la variedad de identidades sexuales presentes en la sociedad, promoviendo así la inclusión y el respeto hacia todas las personas, sin importar su orientación sexual o identidad de género.'
                    },
                    {
                        id: 2,
                        title: '2. La violencia sexual',
                        content: 'Comprender qué es la violencia sexual, sus diferentes manifestaciones y las consecuencias que tiene en las víctimas. Conocer los mecanismos de prevención, denuncia y apoyo disponibles para las personas afectadas.'
                    },
                    {
                        id: 3,
                        title: '3. Material educativo digital interactivo',
                        content: 'Explorar recursos digitales interactivos diseñados para facilitar el aprendizaje sobre educación sexual integral. Estos materiales incluyen videos, infografías, cuestionarios y actividades dinámicas que permiten un aprendizaje más efectivo.'
                    },
                    {
                        id: 4,
                        title: '4. Evaluar el contenido',
                        content: 'Desarrollar habilidades críticas para evaluar la calidad, veracidad y relevancia de la información relacionada con educación sexual. Aprender a identificar fuentes confiables y distinguir entre información científica y mitos o desinformación.'
                    },
                    {
                        id: 5,
                        title: '5. Divulgar',
                        content: 'Promover la difusión de información veraz y científica sobre educación sexual integral. Conocer estrategias efectivas para compartir conocimientos de manera respetuosa y responsable en diferentes contextos y audiencias.'
                    }
                ];
                
                // Título dinámico para el header
                const currentPageTitle = computed(() => {
                    // Buscar en todos los elementos del menú y submenús
                    for (const item of menuItems) {
                        if (item.id === activeMenu.value) {
                            return item.name;
                        }
                        if (item.submenu) {
                            const subItem = item.submenu.find(sub => sub.id === activeMenu.value);
                            if (subItem) {
                                return subItem.name;
                            }
                        }
                    }
                    return 'Tejiendo la Diversidad';
                });
                
                // Verificar si un submenú debe estar abierto
                const isSubmenuOpen = (menuId) => {
                    return openSubmenus.value.includes(menuId);
                };
                
                // Verificar si un elemento del menú está activo (incluyendo submenús)
                const isSubmenuActive = (menuId) => {
                    const item = menuItems.find(item => item.id === menuId);
                    if (item && item.submenu) {
                        return item.submenu.some(subItem => subItem.id === activeMenu.value);
                    }
                    return false;
                };
                
                const selectMenuItem = (item) => {
                    // Animación de transición
                    contentOpacity.value = 0;
                    
                    setTimeout(() => {
                        activeMenu.value = item.id;
                        contentOpacity.value = 1;
                        
                        // Manejo dinámico de submenús
                        openSubmenus.value = [];
                        
                        // Si el elemento tiene submenú, abrirlo automáticamente
                        if (item.submenu && item.submenu.length > 0) {
                            openSubmenus.value.push(item.id);
                        } else {
                            // Si es un elemento de submenú, encontrar el padre y abrirlo
                            const parentItem = menuItems.find(menuItem => 
                                menuItem.submenu && menuItem.submenu.some(sub => sub.id === item.id)
                            );
                            if (parentItem) {
                                openSubmenus.value.push(parentItem.id);
                            }
                        }
                        
                        // Cerrar menú en móviles después de seleccionar
                        if (window.innerWidth <= 768) {
                            isMenuOpen.value = false;
                        }
                    }, 150);
                };
                
                const toggleMenu = () => {
                    if (window.innerWidth <= 768) {
                        // En móviles, usar el sistema de apertura lateral
                        isMenuOpen.value = !isMenuOpen.value;
                    } else {
                        // En escritorio, mostrar/ocultar el menú
                        isMenuVisible.value = !isMenuVisible.value;
                    }
                };
                
                const closeMenu = () => {
                    isMenuOpen.value = false;
                };
                
                const toggleFaqItem = (id) => {
                    expandedFaqItem.value = expandedFaqItem.value === id ? null : id;
                };
                
                // Detectar cambios de tamaño de ventana para ajustar el comportamiento del menú
                const handleResize = () => {
                    if (window.innerWidth > 768) {
                        // En escritorio, asegurarse de que el menú esté visible si no está oculto
                        isMenuOpen.value = false;
                    }
                };
                
                // Agregar listener para cambios de tamaño de ventana
                window.addEventListener('resize', handleResize);
                
                return {
                    activeMenu,
                    contentOpacity,
                    menuItems,
                    currentPageTitle,
                    isMenuVisible,
                    isMenuOpen,
                    expandedFaqItem,
                    openSubmenus,
                    faqs,
                    selectMenuItem,
                    toggleMenu,
                    closeMenu,
                    toggleFaqItem,
                    isSubmenuOpen,
                    isSubmenuActive
                };
            }
        }).mount('#app');