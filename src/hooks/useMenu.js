export const traverseMenu = (items) => {
    // Filtramos los elementos que tienen active igual a 1
    return items.reduce((acc, item) => {
        if (item.active == 1) {
            // Si el item es activo, lo agregamos
            acc.push(item);
        } else if (item.children) {
            // Si tiene hijos, los procesamos recursivamente
            const filteredChildren = traverseMenu(item.children);
            if (filteredChildren.length > 0) {
                // Solo añadimos el padre si tiene hijos activos
                acc.push({ ...item, children: filteredChildren });
            }
        }
        return acc;
    }, []);
};

export const traverseRouter = (items) => {
    // Filtramos los elementos que tienen active igual a 1
    return items.reduce((acc, item) => {
        if (item.active == 1) {
            // Si el item es activo, lo agregamos
            acc.push(item?.route);
        } else if (item.children) {
            // Si tiene hijos, los procesamos recursivamente
            const filteredChildren = traverseRouter(item.children);
            if (filteredChildren.length > 0) {
                // Solo añadimos el padre si tiene hijos activos
                for(let i = 0; i<filteredChildren.length; i++){
                    acc.push(filteredChildren[i]);
                }
            }
        }
        return acc;
    }, []);
};